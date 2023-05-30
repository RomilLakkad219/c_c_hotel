import React, { useContext, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, SafeAreaView, ImageBackground, ScrollView, View } from 'react-native'

//SCREENS
import { SCREENS } from "..";

//ASSET
import { IMAGES } from "../../asset";

//COMPONENT
import { Button, Input, ProgressView, Text } from "../../component";

//CONSTANT
import { COLORS, FONT_NAME, REGEX, SCALE_SIZE, SHOW_SUCCESS_TOAST, SHOW_TOAST } from "../../constant";

//API
import { signUp } from "../../api";

//CONTEXT
import { TranslationContext } from "../../context";

const SignUp = (props) => {

    const translations = useContext(TranslationContext)

    const [isTermsSelected, setTermsSelected] = useState(false);
    const [isSecurePassword, setSecurePassword] = useState(true);
    const [isVisiblePassword, setIsVisiblePassword] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    function onSignUp() {
        if (!name) {
            SHOW_TOAST(translations.enteryourname)
        }
        else if (!email) {
            SHOW_TOAST(translations.enteryouremail)
        }
        else if (REGEX.emailRegex.test(email) == false) {
            SHOW_TOAST(translations.entervalidemail)
        }
        else if (!password) {
            SHOW_TOAST(translations.enteryourpassword)
        }
        else if (REGEX.passwordRegex.test(password) == false) {
            SHOW_TOAST(translations.passwordmessage)
        }
        else if (!confirmPassword) {
            SHOW_TOAST(translations.enterconfirmpassword)
        }
        else if (confirmPassword != password) {
            SHOW_TOAST(translations.matchpassword)
        }
        else if (!isTermsSelected) {
            SHOW_TOAST(translations.termsandcondition)
        }
        else {
            registerUser()
        }
    }

    async function registerUser() {
        const params = {
            user_name: name,
            user_email: email,
            user_password: password,
            user_fcm_key: '',
            user_device_type: '1',
            user_country: '',
            promo_code: ''
        }

        setIsLoading(true)
        const result = await signUp(params)
        setIsLoading(false)

        if (result.status) {
            if (result?.data?.status == "1") {
                SHOW_SUCCESS_TOAST(translations.signupsuccessfull)
                props.navigation.navigate(SCREENS.Login.name)
            }
            else {
                SHOW_TOAST(result?.data?.msg ?? translations.somethingwentwrong)
            }
        }
        else {
            SHOW_TOAST(result.error)
        }

    }

    return (
        <ImageBackground style={styles.container} source={IMAGES.login_bg}>
            <SafeAreaView />
            <TouchableOpacity onPress={() => {
                props.navigation.goBack()
            }}>
                <Image
                    style={styles.backArrow}
                    resizeMode="contain"
                    source={IMAGES.back_arrow} />
            </TouchableOpacity>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <Text
                    style={styles.signUpText}
                    size={SCALE_SIZE(33)}
                    align='left'
                    family={FONT_NAME.medium}
                    color={COLORS.black}>
                    {translations.signup}
                </Text>
                <Input
                    style={styles.emailInput}
                    value={name}
                    title={translations.name}
                    icon={IMAGES.ic_profile}
                    onChangeText={(text) => {
                        setName(text)
                    }}>
                </Input>
                <Input
                    style={styles.passwordInput}
                    value={email}
                    title={translations.email}
                    icon={IMAGES.ic_email}
                    onChangeText={(text) => {
                        setEmail(text)
                    }}>
                </Input>
                <Input
                    style={styles.passwordInput}
                    value={password}
                    title={translations.password}
                    secureTextEntry={isSecurePassword}
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                    icon={isSecurePassword ? IMAGES.ic_eye_password : IMAGES.ic_s_password}
                    onPressIcon={() => {
                        setSecurePassword(!isSecurePassword)
                    }}>
                </Input>
                <Input
                    style={styles.passwordInput}
                    value={confirmPassword}
                    title={translations.confirmpassword}
                    secureTextEntry={isVisiblePassword}
                    onChangeText={(text) => {
                        setConfirmPassword(text)
                    }}
                    icon={isVisiblePassword ? IMAGES.ic_eye_password : IMAGES.ic_s_password}
                    onPressIcon={() => {
                        setIsVisiblePassword(!isVisiblePassword)
                    }}>
                </Input>
                <TouchableOpacity style={styles.agreeTermConditionView}
                    onPress={() => {
                        setTermsSelected(!isTermsSelected)
                    }}>
                    <View style={styles.squareBox}>
                        {isTermsSelected &&
                            <Image
                                style={styles.right_bg}
                                resizeMode="contain"
                                source={IMAGES.right_bg} />
                        }
                    </View>
                    <Text style={styles.agreeText}
                        size={SCALE_SIZE(16)}
                        family={FONT_NAME.medium}
                        color={COLORS.gray}>
                        {translations.agreeto}
                        <Text
                            size={SCALE_SIZE(16)}
                            family={FONT_NAME.medium}
                            color={COLORS.blue}>
                            {translations.terms}
                        </Text>
                        <Text
                            size={SCALE_SIZE(16)}
                            family={FONT_NAME.medium}
                            color={COLORS.gray}>
                            {'& '}
                        </Text>
                        <Text
                            size={SCALE_SIZE(16)}
                            family={FONT_NAME.medium}
                            color={COLORS.blue}>
                            {translations.conditions}
                        </Text>
                    </Text>
                </TouchableOpacity>
                <Button
                    style={styles.signUpButton}
                    title={translations.signup}
                    onPress={() => {
                        onSignUp()
                    }} />
                <TouchableOpacity style={styles.alreadyHaveAnAccountView}
                    onPress={() => {
                        props.navigation.navigate(SCREENS.Login.name)
                    }}>
                    <Text
                        size={SCALE_SIZE(20)}
                        family={FONT_NAME.semiBold}
                        color={COLORS.gray}>
                        {translations.alreadyhaveanaccount}
                        <Text
                            size={SCALE_SIZE(20)}
                            family={FONT_NAME.semiBold}
                            color={COLORS.blue}>
                            {translations.login}
                        </Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            {isLoading && <ProgressView />}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0
    },
    backArrow: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        marginLeft: SCALE_SIZE(35),
        marginTop: SCALE_SIZE(35)
    },
    roundLoginLogo: {
        alignSelf: 'flex-end'
    },
    signUpText: {
        marginTop: SCALE_SIZE(77),
        marginLeft: SCALE_SIZE(35)
    },
    emailInput: {
        marginTop: SCALE_SIZE(76),
        marginHorizontal: SCALE_SIZE(35)
    },
    passwordInput: {
        marginTop: SCALE_SIZE(35),
        marginHorizontal: SCALE_SIZE(35)
    },
    agreeTermConditionView: {
        flexDirection: 'row',
        marginTop: SCALE_SIZE(56),
        justifyContent: 'center',
        alignSelf: 'center'
    },
    squareBox: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    signUpButton: {
        marginTop: SCALE_SIZE(55),
        marginHorizontal: SCALE_SIZE(35)
    },
    right_bg: {
        height: SCALE_SIZE(10),
        width: SCALE_SIZE(10),
        alignSelf: 'center'
    },
    agreeText: {
        marginLeft: SCALE_SIZE(17)
    },
    alreadyHaveAnAccountView: {
        flexDirection: 'row',
        marginVertical: SCALE_SIZE(40),
        justifyContent: 'center'
    }
})

export default SignUp;