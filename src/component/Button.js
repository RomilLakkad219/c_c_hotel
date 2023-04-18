import React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native'

//COMPONENT
import { Text } from "../component";

//PACKAGES
import LinearGradient from "react-native-linear-gradient";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE } from "../constant";

//ASSET
import { IMAGES } from "../asset";

const Button = (props) => {

    return (
        <TouchableOpacity
            style={props.style}
            onPress={props.onPress}>
            <LinearGradient
                style={styles.buttonContainer}
                colors={['#6EB3FE', '#1377B1']}>
                <Text
                    style={{ flex: 1.0 }}
                    size={SCALE_SIZE(24)}
                    align='center'
                    color={COLORS.white}
                    family={FONT_NAME.semiBold}>
                    {props.title}
                </Text>
                {props.isRightImage &&
                    <Image
                        style={styles.rightArrow}
                        resizeMode="contain"
                        source={IMAGES.right_button} />
                }
            </LinearGradient>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: SCALE_SIZE(64),
        borderRadius: SCALE_SIZE(32),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightArrow: {
        height: SCALE_SIZE(50),
        width: SCALE_SIZE(50),
        marginRight: SCALE_SIZE(8)
    }
})

export default Button;

