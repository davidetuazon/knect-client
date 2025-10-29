import React from "react";
import colors from "../../constants/colors";

type Props = {
    style?: React.CSSProperties,
    children?: any,
}

export default function Container(props: Props) {
    return (
        <div style={ Object.assign({}, styles.container, props.style ) }>
            {props.children}
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        border: `2px solid ${colors.darkBorder}`,
        borderRadius: '12px',
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: colors.surface,
        // margin: 20,
        // padding: 30,
        // backgroundColor: colors.surface,
    },
}