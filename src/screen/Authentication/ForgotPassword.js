import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground, Image, View } from 'react-native'

//SCREENS
import { SCREENS } from "..";

//ASSET
import { IMAGES } from "../../asset";

//COMPONENT
import { Button, Input, ProgressView, Text } from "../../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST, STRING } from "../../constant";

//API
import { forgotPassword } from "../../api";

const ForgotPassword = (props) => {

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    function onSubmit() {
        if (!email) {
            SHOW_TOAST('Enter Your Email')
        }
        else {
            OnForgotPassword()
        }
    }

    async function OnForgotPassword() {
        const params = {
            user_email: email,
        }

        setIsLoading(true)
        const result = await forgotPassword(params)
        setIsLoading(false)

        if (result.status) {
            props.navigation.navigate(SCREENS.Otp.name)
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    return (
        <ImageBackground style={styles.container} source={IMAGES.login_bg}>
            <SafeAreaView />
            <View style={{ height: SCALE_SIZE(44) }}>
                <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }}>
                    <Image
                        style={styles.backArrow}
                        resizeMode="contain"
                        source={IMAGES.back_arrow} />
                </TouchableOpacity>
            </View>
            <Image
                style={styles.forgotBackground}
                resizeMode="contain"
                source={IMAGES.forgot_bg} />
            <Text
                style={styles.forgotText}
                size={SCALE_SIZE(33)}
                family={FONT_NAME.medium}
                color={COLORS.black}>
                {'Forgot'}
            </Text>
            <Text style={styles.passwordText}
                size={SCALE_SIZE(33)}
                family={FONT_NAME.medium}
                color={COLORS.black}>
                {'Password?'}
            </Text>
            <Text style={styles.emailEnteranceText}
                size={SCALE_SIZE(16)}
                family={FONT_NAME.medium}
                color={COLORS.gray}>
                {STRING.emailEnteranceText}
            </Text>
            <Input
                style={styles.emailInput}
                value={email}
                placeholderTextColor={COLORS.black}
                onChangeText={(text) => {
                    setEmail(text)
                }}
                title={STRING.email}
                icon={IMAGES.ic_email} />
            <Button
                onPress={() => {
                    onSubmit()
                }}
                style={styles.submitButton}
                title={STRING.submit} />
            {isLoading && <ProgressView />}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0
    },
    forgotBackground: {
        height: SCALE_SIZE(234),
        width: SCALE_SIZE(238),
        alignSelf: 'center',
        marginTop: '18%'
    },
    backArrow: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        marginHorizontal: SCALE_SIZE(35),
        marginTop: SCALE_SIZE(35)
    },
    forgotText: {
        marginTop: SCALE_SIZE(37),
        marginHorizontal: SCALE_SIZE(36)
    },
    passwordText: {
        marginHorizontal: SCALE_SIZE(36)
    },
    emailEnteranceText: {
        marginTop: SCALE_SIZE(20),
        marginHorizontal: SCALE_SIZE(35)
    },
    emailInput: {
        marginTop: SCALE_SIZE(40),
        marginHorizontal: SCALE_SIZE(35)
    },
    submitButton: {
        marginTop: SCALE_SIZE(35),
        marginHorizontal: SCALE_SIZE(35)
    }
})

export default ForgotPassword;