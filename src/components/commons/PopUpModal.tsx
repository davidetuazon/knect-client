import React from "react";
import colors from "../../constants/colors";

import Container from "./Container";

type Props = {
    style?: React.CSSProperties,
    containerStyle?: React.CSSProperties,
    isOpen: boolean,
    onClose: () => void,
    children?: any,
}

export default function PopUpModal(props: Props) {

    if (!props.isOpen) return null;

    return (
        <div style={styles.overlay} onClick={() => props.onClose()}>
            <Container style={Object.assign({}, styles.container, props.containerStyle)}>
                <div onClick={(e) => e.stopPropagation()}>
                    {props.children}
                </div>
            </Container>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    overlay: {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backdropFilter: 'blur(3px)',
        zIndex: 20
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative' as const,
        overflowY:'auto',
    },
}