import React from "react";
import colors from "../../constants/colors";
import tapIcon from '../../assets/icons/tap-1.svg';
import swipeLeftIcon from '../../assets/icons/swipe-left.svg'
import swipeRightIcon from '../../assets/icons/swipe-right.svg';

import Container from "../commons/Container";
import Text from "../commons/Text";

export default function Instructions() {

    return (
    //   <Container style={styles.instructions}>
        <div style={styles.body}>
           <div style={styles.actions}>
             <img
                src={swipeLeftIcon}
                alt="swipe-left-icon"
                width='20%'
            />
            <Text
                variant="subtitle"
                style={{
                    ...styles.text,
                    color: colors.accent,
                }}
            >
                TO SKIP
            </Text>
           </div>
           <div style={styles.actions}>
             <img
                src={swipeRightIcon}
                alt="swipe-right-icon"
                width='20%'
            />
            <Text
                variant="subtitle"
                style={{
                    ...styles.text,
                    color: colors.secondary,
                }}
            >
                TO LIKE
            </Text>
           </div>
           <div style={styles.actions}>
             <img
                src={tapIcon}
                alt="top-once-icon"
                width='15%'
            />
            <Text
                variant="subtitle"
                style={{
                    ...styles.text,
                    color: colors.primaryLight,
                }}
            >
                NAME CARD TO VIEW
            </Text>
           </div>
        </div>
    //    </Container>
    )
}

const styles: {[key: string]: React.CSSProperties} = {
    instructions: {
        width: '70%',
        height: '20%'
    },
    body: {
        // border: '1px solid red',
        display: 'flex',
        justifyContent: 'center',
        width: '60%',
        border: `2px solid ${colors.border}`,
        borderRadius: '8px',
        backgroundColor: colors.surface,
        padding: '5px 0px'
    },
    actions: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        gap: 10,
    },
    text: {
        // border: '1px solid red',
        margin: 0,
        color: colors.textPrimary,
        fontFamily: 'Poppins-Bold'
    }
}