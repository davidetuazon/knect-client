import React, { useEffect, useState } from "react";
import { getAllMessage } from "../services/api";
import colors from "../constants/colors";

import SideNavBar from "../components/navigation/SideNavBar";
import Container from "../components/commons/Container";
import Text from "../components/commons/Text";

type Props = {
    style?: React.CSSProperties,
}

export default function Messages(props: Props) {
    const [messages, setMessages] = useState<any[]>();

    const init = async () => {
        try {
            const msg = await getAllMessage();
            setMessages(msg.docs);
        } catch (e) {
            console.error('Failed API call: ', e)
        }
    }

    useEffect(() => {
        console.log('Mounted');
        init();
    }, []);

    return (
        <div style={styles.root}>
            <div style={styles.body}>
                <div style={styles.sidebar}>
                    <SideNavBar />
                </div>
                <div style={styles.maincard}>
                    <Container style={styles.messagesCard}>
                        {messages?.length === 0 ? (
                            <Text
                                variant="heading"
                            >
                                No messages yet.
                            </Text>
                        ) : (
                            messages?.map((msg) => (
                                <div key={msg._id}>
                                    <Text
                                        variant="title"
                                    >
                                        {msg._id}
                                    </Text>
                                </div>
                            ))
                        )}
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
        border: '1px solid black',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messagesCard: {
        width: '80%',
        height: '80%',
    },
}