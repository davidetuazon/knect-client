import React, { useEffect, useState } from "react";
import { getConversations } from "../services/api";
import colors from "../constants/colors";

import SideNavBar from "../components/navigation/SideNavBar";
import Container from "../components/commons/Container";
import Text from "../components/commons/Text";
import ConversationCard from "../components/conversation/ConversationCard";

type Props = {
    style?: React.CSSProperties,
}

export default function Messages(props: Props) {
    const [messages, setMessages] = useState<any[]>();

    const init = async () => {
        try {
            const msg = await getConversations();
            setMessages(msg.docs);
        } catch (e) {
            console.error('Failed API call: ', e)
        }
    }

    useEffect(() => {
        init();
    }, []);

    if (messages?.length === 0) {
        return (
            <div style={styles.root}>
                <div style={styles.body}>
                    <div style={styles.sidebar}>
                        <SideNavBar />
                    </div>
                    <div style={styles.maincard}>
                        <Container style={styles.messagesCard}>
                            <div
                                style={{
                                    display: 'flex',
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text variant="heading">
                                    Working on it... Keep finding people you like!
                                </Text>
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
                        {messages?.map((msg) => (
                            <div key={msg._id}>
                                <ConversationCard conversation={msg} />
                            </div>
                        ))}
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
        overflowY: 'auto',
    },
}