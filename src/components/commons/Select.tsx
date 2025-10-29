import React from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";

import Text from "./Text";

type Props = {
    style?: React.CSSProperties,
    selectStyle?: React.CSSProperties,
    value?: string,
    label?: string, 
    options: { value: string; label: string }[];
    onSelect: (value: string) => void,
    textProps?: any,
    error?: string,
    disabled?: boolean;
}

export default function Select(props: Props) {
    return (
        <>
            <div
                style={Object.assign({}, styles.container, props.style, props.disabled && styles.disabled, props.error && styles.error)}
            >
                <select
                    value={props.value ?? ""}
                    disabled={props.disabled}
                    style={Object.assign({}, styles.select, props.selectStyle)}
                    onChange={(event) => props.onSelect(event.target.value)}
                    {...props.textProps}
                >
                    <option
                        value=""
                        style={styles.option}
                    >
                        {props.label}
                    </option>
                    {props.options.map((opt, idx: number) => (
                        <option
                            key={idx}
                            value={opt.value}
                            style={styles.option}
                        >
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
            {
                props.error && 
                <Text 
                variant='caption' 
                style={styles.errorLabel}
                >
                *{props.error}
                </Text>
            }
        </>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
  container: {
    border: `2px solid ${colors.darkBorder}`,
    backgroundColor: colors.background,
    borderRadius: '8px',
    paddingLeft: 15,
    paddingRight: 15,
    height: 30,
    marginBottom: 10,
    marginTop: 10,
  },
  disabled: {
    border: '2px solid lightgray',
  },
  select: {
    // border: '1px solid red',
    width: '100%',
    fontSize: typography.subtitle,
    color: colors.textPrimary,
    fontFamily: 'Poppins-SemiBold',
    backgroundColor: colors.background,
    outline: 'none',
    border: 'none',
    marginTop: 2.5,
  },
  option: {
    color: colors.textPrimary,
    border: 'none',
  },
  error: {
    border: `2px solid ${colors.error}`,
  },
  errorLabel: {
    // border: '1px solid red',
    marginTop: 10,
    color: 'red',
    fontWeight: 'bold',    
  }
}