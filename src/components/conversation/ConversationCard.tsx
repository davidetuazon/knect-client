import React, { useEffect, useState } from "react";
import colors from "../../constants/colors";
import profileIcon from '../../assets/icons/profile.svg';
import { Link } from "react-router-dom";

import Text from "../commons/Text";
import typography from "../../constants/typography";

type Props = {
    style?: React.CSSProperties,
    conversation: any,
}

export default function ConversationCard(props: Props) {
    const [isHovered, setIsHovered] = useState<string | null>(null);
    const participant = props?.conversation.participants[0];
    const timeStamp = props?.conversation.lastTimeStamp.split('T')[0];

    return (
        <Link
            to={`/messages/${props.conversation._id}`}
            style={{ textDecoration: 'none', color: colors.textPrimary }}
        >
            <div 
                style={{
                    ...Object.assign({}, styles.container, props.style),
                    border: isHovered === props?.conversation._id ? `3px solid ${colors.border}` : `3px solid ${colors.background}`,
                }}
                onMouseEnter={() => setIsHovered(props?.conversation._id)}
                onMouseLeave={() => setIsHovered(null)}
            >
                <div 
                    style={styles.photoWrapper}
                >
                    <img
                        src={participant.profilePhoto || profileIcon}
                        alt={props?.conversation.fullName}
                        style={styles.photo}
                    />
                </div>
                <div 
                    style={styles.text}
                >
                    <Text variant="heading">
                        {participant.fullName}&nbsp;
                        &nbsp;<span
                            style={{
                                color: colors.textSecondary,
                                fontSize: typography.subtitle,
                            }}
                        >
                            {timeStamp}
                        </span>
                    </Text>
                    <Text variant="heading" style={{ color: colors.textSecondary }}>
                        {props.conversation.lastMessage || 'Start you connection...'}
                    </Text>
                </div>
            </div>
        </Link>
    )
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        display: 'flex',
        msFlexDirection: 'row',
        padding: 10,
        backgroundColor: colors.surface,
        borderRadius: '8px',
    },
    photoWrapper: {
        width: '350px',     
        height: '100px', 
        display: 'flex',
        justifyContent: 'center',
        padding: '5px 0px',
        overflow: 'hidden',
    },
    photo: {
        width: '40%',
        minWidth: '50px',
        border: `3px solid ${colors.background}`,
        borderRadius: '12px',
        objectFit: 'cover', 
    },
    text: {
        // border: '1px solid red',
        width: '100%',
        textAlign: 'left',
        padding: '0px 10px'
    }
}