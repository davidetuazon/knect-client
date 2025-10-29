import React, { useState } from "react";
import colors from "../../constants/colors";

import Container from "../commons/Container";
import Text from "../commons/Text";
import Button from "../commons/Button";

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
                backgroundImage: `url(${props.person?.profilePhoto})`
            }}
            >
                <Container style={styles.info}>  
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
                        {props.person?.bio || 'No bio'}  
                    </Text>
                </Container>
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