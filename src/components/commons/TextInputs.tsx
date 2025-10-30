import React from "react";
import Text from "./Text";
import colors from "../../constants/colors";
import typography from "../../constants/typography";

type Props = {
    style?: React.CSSProperties,
    textStyle?: React.CSSProperties,
    textProps?: any,
    error?: string,
}

export default function TextInput(props: Props) {
    
    return (
        <>
            <div style={ Object.assign({},
                    styles.container,
                    props.error ?
                    styles.errorContainer : {},
                    props.style
            ) }>
                <input
                    style={Object.assign({}, styles.textInput, props.textStyle)}
                    {...props.textProps}
                />
            </div>
            { props.error &&
                <Text variant="subtitle" style={styles.errorLabel} >
                    *{props.error}
                </Text>
            }
        </>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        backgroundColor: colors.surface,
        border: `3px solid ${colors.darkBorder}`,
        borderRadius: 12,
        paddingLeft: 15,
        paddingRight: 15,
        height: 45,
        marginBottom: 10,
        marginTop: 10,
    },
    errorContainer: {
        border: `3px solid ${colors.error}`,
    },
    textInput: {
        border: 'none',
        backgroundColor: 'transparent',
        width: '100%',
        outline: 'none',
        height: 'inherit',
        fontFamily: 'Poppins-SemiBold',
        fontSize: typography.subtitle,
        color: colors.textPrimary,
    },
    errorLabel: {
        // border: '1px solid red',
        marginTop: 10,
        color: colors.error,
        fontSize: typography.caption,  
    }
}