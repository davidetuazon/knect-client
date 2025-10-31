import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import colors from "../../constants/colors";
import profile from '../../assets/icons/profile.svg';
import Cookies from "js-cookie";
import { useAuth } from "../../providers/AuthProvider";

import Container from "../commons/Container";
import Text from "../commons/Text";
import { ACCESS_TOKEN } from "../../utils/constants";

type Props = {
    style?: React.CSSProperties,
}

type PageOptions = 'messages' | 'matches' | 'likes' | 'default';

export default function SideNavBar(props: Props) {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState<string | null>(null);

    const location = useLocation();
    const getActivePage = (): PageOptions => {
        if (location.pathname.startsWith('/messages')) return 'messages';
        if (location.pathname.startsWith('/matches')) return 'matches';
        if (location.pathname.startsWith('/likes')) return 'likes';
        return 'default';
    }
    const [isActive, setIsActive] = useState<PageOptions>(getActivePage());

    const handleLogout = () => {
        Cookies.remove(ACCESS_TOKEN);
        setUser(null);
        navigate('/');
    }

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
                    onClick={() => setIsActive('default')}
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
                            backgroundColor: isActive === 'messages' ? colors.surface : colors.background,
                            border: isActive === 'messages' ? `3px solid ${colors.primaryLight}` : `3px solid ${colors.background}`,
                        }}
                        onClick={() => setIsActive('messages')}
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
                            backgroundColor: isActive === 'matches' ? colors.surface : colors.background,
                            border: isActive === 'matches' ? `3px solid ${colors.primaryLight}` : `3px solid ${colors.background}`,
                        }}
                        onClick={() => setIsActive('matches')}
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
                            backgroundColor: isActive === 'likes' ? colors.surface : colors.background,
                            border: isActive === 'likes' ? `3px solid ${colors.primaryLight}` : `3px solid ${colors.background}`,
                        }}
                        onClick={() => setIsActive('likes')}
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
                    to={'/account'}
                    style={{
                        ...styles.link,
                        backgroundColor: isHovered === 'profile' ? colors.surface : colors.background,
                        border: isHovered === 'profile' ? `3px solid ${colors.primaryLight}` : `3px solid ${colors.surface}`,
                    }}
                    onMouseEnter={() => setIsHovered('profile')}
                    onMouseLeave={() => setIsHovered(null)}
                >
                    <img
                        src={profile}
                        alt="profile-svg"
                        style={styles.avatar}
                    />
                </Link>
                <div
                    style={{
                        ...styles.logout,
                        backgroundColor: isHovered === 'logout' ? colors.surface : colors.background,
                    }}
                    onMouseEnter={() => setIsHovered('logout')}
                    onMouseLeave={() => setIsHovered(null)}
                    onClick={() => handleLogout()}
                >
                    <Text 
                        variant="caption"
                        style={{ margin: 0 }}
                    >
                        Sign out
                    </Text>
                </div>
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
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 10px',
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
    logout: {
        border: `3px solid ${colors.accent}`,
        borderRadius: '12px',
        padding: '5px 15px',
        cursor: 'pointer',
    },
}