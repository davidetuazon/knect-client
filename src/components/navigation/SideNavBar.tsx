import React, { useState } from "react";
import { Link } from "react-router-dom";
import colors from "../../constants/colors";
import profile from '../../assets/icons/profile.svg';

import Container from "../commons/Container";
import Text from "../commons/Text";

type Props = {
    style?: React.CSSProperties,
}

export default function SideNavBar(props: Props) {
    const [isHovered, setIsHovered] = useState<string | null>(null)

    return (
        <div style={styles.sidebar}>
            <Container style={Object.assign({}, styles.container, props.style)}>
                <Link
                    to={'/'}
                    style={{
                        ...styles.appName,
                        color: isHovered === 'appName' ? colors.secondary : colors.primary,
                    }}
                    onMouseEnter={() => setIsHovered('appName')}
                    onMouseLeave={() => setIsHovered(null)}
                >
                    <Text
                        variant="heading"
                        textStyle={styles.appNameText}
                    >
                        Knect
                    </Text>
                </Link>
                <div style={styles.navigation}>
                    <Link
                        to={'/messages'}
                        style={{
                            ...styles.appName,
                            backgroundColor: isHovered === 'messages' ? colors.surface : colors.background,
                            border: isHovered === 'messages' ? `2px solid ${colors.primaryLight}` : `2px solid ${colors.background}`,
                        }}
                        onMouseEnter={() => setIsHovered('messages')}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <Text
                            variant="heading"
                            textStyle={styles.messages}
                        >
                            Messages
                        </Text>
                    </Link>
                    <Link
                        to={'/matches'}
                         style={{
                            ...styles.appName,
                            backgroundColor: isHovered === 'matches' ? colors.surface : colors.background,
                            border: isHovered === 'matches' ? `2px solid ${colors.primaryLight}` : `2px solid ${colors.background}`,
                        }}
                        onMouseEnter={() => setIsHovered('matches')}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <Text
                            variant="heading"
                            textStyle={styles.matches}
                        >
                            Matches
                        </Text>
                    </Link>
                    <Link
                        to={'/likes'}
                        style={{
                            ...styles.appName,
                            backgroundColor: isHovered === 'likes' ? colors.surface : colors.background,
                            border: isHovered === 'likes' ? `2px solid ${colors.primaryLight}` : `2px solid ${colors.background}`,
                        }}
                        onMouseEnter={() => setIsHovered('likes')}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <Text
                            variant="heading"
                            textStyle={styles.likes}
                        >
                            Likes
                        </Text>
                    </Link>
                </div>              
            </Container>
            <div style={styles.footer}>
                <Link
                    to={'/profile'}
                    style={{
                        ...styles.link,
                        backgroundColor: isHovered === 'profile' ? colors.surface : colors.background,
                        border: isHovered === 'profile' ? `2px solid ${colors.primaryLight}` : `2px solid ${colors.surface}`,
                    }}
                    onMouseEnter={() => setIsHovered('profile')}
                    onMouseLeave={() => setIsHovered(null)}
                >
                    <img
                        src={profile}
                        style={styles.avatar}
                    />
                </Link>
            </div>
        </div>
    )
}

const styles: {[key: string]: React.CSSProperties} = {
    sidebar: {
        // border: '1px solid red',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: colors.background,
    },
    container: {
        display: 'flex',
        border: 'none',
        padding: 10,
        backgroundColor: colors.background,
        gap: 40,
    },
    appName: {
        color: colors.primary,
        textDecoration: 'none',
        borderRadius: '8px',
    },
    appNameText: {
        // border: '1px solid black',
        margin: '5px 0px',
        fontSize: 'clamp(2.05rem, 2.5vw, 2.35rem)',
    },
    messages: {
        color: colors.secondary,
        margin: 5,
        padding: '5px 15px',
        borderRadius: '8px',
    },
    matches: {
        color: colors.secondary,
        margin: 5,
        padding: '5px 15px',
        borderRadius: '8px',
    },
    likes: {
        color: colors.secondary,
        margin: 5,
        padding: '5px 15px',
        borderRadius: '8px',
    },
    navigation: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'end',
        padding: '0px 10px',
        height: '10%',
    },
    link: {
        borderRadius: '8px',
        width: '25%',
        height: '50%',
        cursor: 'pointer',
        padding: '2%',
    },
     avatar: {
       objectFit: 'contain',
       width: '100%',
       height: '100%',
    },
}