import React from "react";
import { Text as RNText } from 'react-native'

//CONSTANT
import { FONT_NAME,COLORS } from "../constant";

const Text = (props) => {
    return (
        <RNText {...props}
            style={[props.style,
            {
                color: props.color,
                textAlign: props.align,
                fontSize: typeof (props.size) == 'string' ? parseInt(props.size) : (props.size),
            },
            props.family != '' && {
                fontFamily: props.family
            }]}>
            {props.children}
        </RNText>
    )
}

Text.defaultProps = {
    style: {},
    align: 'left',
    size: 14,
    family: FONT_NAME.regular,
    color: COLORS.black
};

export default Text;