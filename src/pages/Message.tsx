import React, { useEffect, useState, useRef, useCallback } from "react";
import colors from "../constants/colors";
import { useParams } from "react-router-dom";
import { getSocket } from "../services/socket";
import { useAuth } from "../providers/AuthProvider";

import SideNavBar from "../components/navigation/SideNavBar";
import Container from "../components/commons/Container";
import Text from "../components/commons/Text";
import TextInput from "../components/commons/TextInputs";
import Button from "../components/commons/Button";
import typography from "../constants/typography";
import { getMessages } from "../services/api";

type Props = {
    style?: React.CSSProperties,
}

export default function Message(props: Props) {
    const { user } = useAuth();
    const { id: conversationId } = useParams();
    const [messages, setMessages] = useState<any[]>([]);
    const [text, setText] = useState('');
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState<string | null>(null);

    const init = useCallback(async () => {
        if (!conversationId) return;

        try {
            const results = await getMessages(conversationId);
            setMessages(results.docs);
        } catch (e) {
            console.error('Failed API call: ', e)
        }
    }, [conversationId])

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        const socket = getSocket();
        if (!socket || !conversationId) return;

        socket.emit('joinRoom', { conversationId });

        const handleNewMessage = (msg: any) => {
            setMessages(prev => [...prev, msg]);
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        }
    }, [conversationId]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);


    const sendMessage = () => {
        console.log('SendMessage triggered');
        const socket = getSocket();
        console.log('Socket: ', socket);
        if (!socket || !text.trim()) return;

        socket.emit('message', { conversationId, message: text });
        setText('');
    }

    if (messages?.length === 0 ) {
        return (
            <div style={styles.root}>
            <div style={styles.body}>
                <div style={styles.sidebar}>
                    <SideNavBar />
                </div>
                <div style={styles.maincard}>
                    <Container style={styles.messagesCard}>
                        <Text
                            variant="heading"
                            style={{ color: colors.textSecondary }}
                        >
                            Chat
                        </Text>
                       <div
                            ref={chatBoxRef}
                            style={{...styles.chatbox}} 
                        >
                            <Text
                                variant="title"
                                style={{
                                    color: colors.darkBorder,
                                }}
                            >
                            Please be reminded to always be respectful in the chat
                            </Text>
                        </div>
                        <div style={styles.chatInputs}>
                            <TextInput
                                textProps={{
                                    value: text,
                                    onChange: (e) => setText(e.target.value),
                                    onKeyDown: (e) => {
                                    if (e.key === 'Enter') sendMessage();
                                    },
                                    placeholder: 'Send a message...',
                                }}
                                style={styles.fields}
                            />
                            <Button
                                title="Send"
                                style={{
                                    ...styles.sendButton,
                                    backgroundColor:  isHovered === 'send' ? colors.primaryLight: colors.primary,
                                }}
                                titleStyle={{
                                    fontSize: typography.title,
                                    color: colors.surface,
                                }}
                                onMouseEnter={() => setIsHovered('send')}
                                onMouseLeave={() => setIsHovered(null)}
                                onButtonPress={sendMessage}
                            />
                        </div>
                    </Container>
                </div>
            </div>
        </div>
        )
    }

    return (
        <div style={styles.root}>
            <div style={styles.body}>
                <div style={styles.sidebar}>
                    <SideNavBar />
                </div>
                <div style={styles.maincard}>
                    <Container style={styles.messagesCard}>
                        <Text
                            variant="heading"
                            style={{ color: colors.textSecondary }}
                        >
                            Chat
                        </Text>
                       <div
                        ref={chatBoxRef}
                            style={{
                                ...styles.chatbox
                            }} 
                        >
                            {messages.map((m) => (
                                <div
                                    key={m._id}
                                    style={{
                                        ...styles.messageWrapper,
                                        justifyContent: m.senderId === user?._id ? 'flex-end' : 'flex-start',
                                    }}
                                >
                                    <Text
                                        variant="title"
                                        style={{
                                            ...styles.message,
                                            backgroundColor: m.senderId === user?._id ? colors.secondary : colors.accent,
                                        }}
                                    >
                                        {m.content}
                                    </Text>
                                </div>
                                ))
                            }
                        </div>
                        <div style={styles.chatInputs}>
                            <TextInput
                                textProps={{
                                    value: text,
                                    onChange: (e) => setText(e.target.value),
                                    onKeyDown: (e) => {
                                    if (e.key === 'Enter') sendMessage();
                                    },
                                    placeholder: 'Please be reminded to always be respectful in the chat...',
                                }}
                                style={styles.fields}
                            />
                            <Button
                                title="Send"
                                style={{
                                    ...styles.sendButton,
                                    backgroundColor:  isHovered === 'send' ? colors.primaryLight: colors.primary,
                                }}
                                titleStyle={{
                                    fontSize: typography.title,
                                    color: colors.surface,
                                }}
                                onMouseEnter={() => setIsHovered('send')}
                                onMouseLeave={() => setIsHovered(null)}
                                onButtonPress={sendMessage}
                            />
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    )
}

const styles: {[key: string]: React.CSSProperties} = {
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        overflowY: 'auto',
    },
    body: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        width: 'inherit',
        height: 'inherit',
        flexDirection: 'row',
        backgroundColor: colors.primaryLight,

    },
    sidebar: {
        backgroundColor: colors.background,
        width: '20%',
        minWidth: '150px',
        zIndex: 10,
        padding: '0px 20px'
    },
    maincard: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messagesCard: {
        width: '80%',
        height: '80%',
        display: 'flex',
        padding: 10,
    },
    chatbox: {
        border: `3px solid ${colors.background}`,
        borderRadius: '13px',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        overflowY: 'auto',
        padding: 10,
    },
    messageWrapper: {
        // border: '2px solid red',

        display: 'flex',
    },
     message: {
        border: `3px solid ${colors.border}`,
        padding: '5px 20px',
        borderRadius: '12px',
        margin: 3,
        color: colors.surface,
    },
    chatInputs: {
        display: 'flex',
        flexDirection: 'row',
    },
    fields: {
        width: '100%',
    },
    sendButton: {
        margin: '10px 10px',
        padding: '0px 10px',
        alignContent: 'center',
    },
}