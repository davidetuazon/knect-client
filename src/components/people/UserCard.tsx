import React, { useState } from "react";
import colors from "../../constants/colors";

import Container from "../commons/Container";
import Text from "../commons/Text";
import { Link } from "react-router-dom";

type Props = {
    style?: React.CSSProperties,
    person: any,
}

export default function UserCard(props: Props) {
   const [isHovered, setIsHovered] = useState<string | null>(null);
    const firstName = props.person?.fullName.split(' ')[0];

    return (
        <div 
            style={{
                ...styles.container,
                border: isHovered === firstName ? `4px solid ${colors.surface}` : `4px solid ${colors.primaryLight}`,
            }}
            onMouseEnter={() => setIsHovered(firstName)}
            onMouseLeave={() => setIsHovered(null)}
        >
            <div
            style={{
                ...styles.body,
                backgroundImage: `url(${props.person?.profilePhoto})`,
            }}
            >
                <div style={{ cursor: 'pointer' }}>
                    <Link
                            to={`/discover/profile/${props.person?._id}`}
                            style={styles.profileLink}
                        >
                        <Container style={styles.info}>
                            { props?.person ? (
                                <>
                                    <Text
                                        variant='heading'
                                        style={styles.name}
                                    >
                                        {firstName}, {props.person?.age}
                                    </Text>
                                    <Text
                                        variant='subtitle'
                                        style={styles.bio}
                                    >
                                        {props.person?.bio || 'No bio yet.'}  
                                    </Text>
                                </>
                            ) : (
                                <Text
                                    variant='caption'
                                    style={styles.name}
                                >
                                    Waiting on people who will send you a like...
                                </Text>
                            )}
                        </Container>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.background,
        borderRadius: '13px',
    },
    body: {
        padding: 20,
        margin: 0,
        width: '25dvw',
        minWidth: '300px',
        height: '70vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column-reverse',
    },
    photo: {
        width: '100%',
        height: '50vh',
        objectFit: 'cover',
        borderRadius: '8px',
    },
    profileLink: {
        textDecoration: 'none',
        color: colors.textPrimary,
    },
    info: {
        padding: '20px 20px',
        margin: 0,
        textAlign: 'left',
        border: `2px solid ${colors.background}`,
        borderRadius: '8px',
        gap: 10,
        backgroundColor: colors.surface,
    },
    name: {
        padding: '0px 5px',
        margin: 0,
    },
    bio: {
        padding: '0px 5px',
        margin: 0,
        color: colors.textSecondary,
    },
    footer: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 20,
    }
}