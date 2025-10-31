import React, { useCallback, useEffect, useState } from "react";
import colors from "../constants/colors";

import SideNavBar from "../components/navigation/SideNavBar";
import Container from "../components/commons/Container";
import Text from "../components/commons/Text";
import { useParams } from "react-router-dom";
import { getUser } from "../services/api";

type Props = {
    style?: React.CSSProperties,
}

export default function Profile(props: Props) {
    const { id } = useParams();
    const [user, setUser] = useState<any>({});

    const init = useCallback(async () => {
        if (!id) return;

        try {
            const result = await getUser(id);
            setUser(result.user);
        } catch (e) {
            console.error('Failed to fetch user data: ', e);
        }
    }, [id]);

    useEffect(() => {
        init();
    }, [init]);

    return (
        <div style={styles.root}>
            <div style={styles.body}>
                <div style={styles.sidebar}>
                    <SideNavBar />
                </div>
                <div style={styles.maincard}>
                    <Container style={styles.profileCard}>
                        {user === null || undefined ? (
                            <Text
                                variant="heading"
                            >
                                Loading this user's profile...
                            </Text>
                        ) : (
                            <div style={styles.profile}>
                                <div style={styles.top}>
                                    <img
                                        src={user.profilePhoto}
                                        alt={user.fullName}
                                        style={{
                                            width: '40%',
                                            minWidth: '250px',
                                            border: `3px solid ${colors.background}`,
                                            borderRadius: '12px'
                                        }}
                                    />
                                </div>
                                <div style={styles.bottom} >
                                    <Text 
                                        variant="heading"
                                        style={styles.topText}
                                    >
                                        {user.fullName}, {user.age}
                                    </Text>
                                    {user.bio || user.bio?.trim() === "" ? (
                                        <Text
                                            variant="heading"
                                            style={{ textAlign: 'left', color: colors.textSecondary }}
                                        >
                                            No bio yet.
                                        </Text>
                                    ) : (
                                        <Text
                                            variant="subtitle"
                                            style={{ textAlign: 'left' }}
                                        >
                                            {user.bio}
                                        </Text>
                                    )}
                                </div>
                            </div>
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
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileCard: {
        width: '80%',
        minWidth: '300px',
        height: '80%',
        display: 'flex',
        justifyContent: 'center',
        border: `3px solid ${colors.background}`
    },
    profile: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        borderRadius: '12px',
        padding: 30,
    },
    top: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
    },
    topText: {
        fontSize: 'clamp(1.55rem, 2.5vw, 2.25rem)',
        textAlign: 'left',
        margin: 0,
    },
    bottom: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 0,

    }
}