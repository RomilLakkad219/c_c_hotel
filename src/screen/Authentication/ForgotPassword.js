import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground, Image, View, ScrollView } from 'react-native'

//SCREENS
import { SCREENS } from "..";

//ASSET
import { IMAGES } from "../../asset";

//COMPONENT
import { Button, Input, ProgressView, Text } from "../../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST } from "../../constant";

//API
import { forgotPassword } from "../../api";

//CONTEXT
import { TranslationContext } from "../../context";

const ForgotPassword = (props) => {

    const translations = useContext(TranslationContext)

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    function onSubmit() {
        if (!email) {
            SHOW_TOAST(translations.enteryouremail)
        }
        else {
            onForgotPassword()
        }
    }

    async function onForgotPassword() {
        const params = {
            user_email: email,
        }

        setIsLoading(true)
        const result = await forgotPassword(params)
        setIsLoading(false)

        if (result.status) {
            if (result?.data?.status == "0") {
                SHOW_TOAST('Email is invalid')
            }
            else {
                const userId = result.data.result?.[0]?.user_id
                props.navigation.navigate(SCREENS.Otp.name, {
                    id: userId
                })
            }
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    style={styles.forgotBackground}
                    resizeMode="contain"
                    source={IMAGES.forgot_bg} />
                <Text
                    style={styles.forgotText}
                    size={SCALE_SIZE(33)}
                    family={FONT_NAME.medium}
                    color={COLORS.black}>
                    {translations.forgot}
                </Text>
                <Text style={styles.passwordText}
                    size={SCALE_SIZE(33)}
                    family={FONT_NAME.medium}
                    color={COLORS.black}>
                    {translations.passwordquestionmark}
                </Text>
                <Text style={styles.emailEnteranceText}
                    size={SCALE_SIZE(16)}
                    family={FONT_NAME.medium}
                    color={COLORS.gray}>
                    {translations.emailtext}
                </Text>
                <Input
                    style={styles.emailInput}
                    value={email}
                    placeholderTextColor={COLORS.black}
                    onChangeText={(text) => {
                        setEmail(text)
                    }}
                    title={translations.email}
                    icon={IMAGES.ic_email} />
                <Button
                    onPress={() => {
                        onSubmit()
                    }}
                    style={styles.submitButton}
                    title={translations.submit} />
                {isLoading && <ProgressView />}
            </ScrollView>
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