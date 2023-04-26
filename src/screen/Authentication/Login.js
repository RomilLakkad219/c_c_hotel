import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'

//SCREENS
import { SCREENS } from "..";

//ASSET
import { IMAGES } from "../../asset";

//COMPONENT
import { Button, Input, ProgressView, Text } from "../../component";

//CONSTANT
import { COLORS, FONT_NAME, REGEX, SCALE_SIZE, SHOW_SUCCESS_TOAST, SHOW_TOAST, STRING } from "../../constant";

//API
import { login } from "../../api";

//PACKAGES
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

//CONTEXT
import { AuthContext } from "../../context";

//API
import { updateUserSocialProfile } from "../../api/user";

//PACKAGES
import { CommonActions } from "@react-navigation/native";

const Login = (props) => {

    const { setUser } = useContext(AuthContext)

    const [isSecurePassword, setSecurePassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '934167333540-3m4c43m7m9r6ni7sdgnsidf90u3b0n5i.apps.googleusercontent.com'
        });
    }, [])

    function onLogin() {
        if (!email) {
            SHOW_TOAST('Enter Your Email')
        }
        else if (REGEX.emailRegex.test(email) == false) {
            SHOW_TOAST('Enter Valid Email')
        }
        else if (!password) {
            SHOW_TOAST('Enter Your Password')
        }
        else if (REGEX.passwordRegex.test(password) == false) {
            SHOW_TOAST('Password must contain 6 characters. 1 Numeric 1 Alphabet, 1 Special')
        }
        else {
            Login()
        }
    }

    async function Login() {
        const params = {
            user_email: email,
            user_password: password,
            user_fcm_key: '',
            user_device_type: ''
        }

        setIsLoading(true)
        const result = await login(params)
        setIsLoading(false)

        if (result.status) {
            if (result?.data?.status == '1') {
                const user = result?.data?.result
                setUser(user)
                await AsyncStorage.setItem('user_details', JSON.stringify(user))
                props.navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [{
                        name: SCREENS.BottomBar.name
                    }]
                }))
            }
            else {
                SHOW_TOAST(result?.data?.msg ?? "Something went wrong!")
            }

        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    async function googleSignin() {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            updateSocialProfileDetails(userInfo)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    async function updateSocialProfileDetails(userInfo) {
        const params = {
            user_id: userInfo?.user?.id
        }
        // const result = await updateUserSocialProfile(params)
    }

    return (
        <ImageBackground style={styles.container} source={IMAGES.login_bg}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    style={styles.ccHotelLogo}
                    resizeMode="contain"
                    source={IMAGES.logo} />
                <Input
                    value={email}
                    style={styles.emailInput}
                    title={STRING.email}
                    keyboardType='email-address'
                    onChangeText={(text) => {
                        setEmail(text)
                    }}
                    icon={IMAGES.ic_email} />
                <Input
                    value={password}
                    style={styles.passwordInput}
                    title={STRING.password}
                    secureTextEntry={isSecurePassword}
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                    icon={isSecurePassword ? IMAGES.ic_eye_password : IMAGES.ic_s_password}
                    onPressIcon={() => {
                        setSecurePassword(!isSecurePassword)
                    }} />
                <Button
                    style={styles.loginButton}
                    title={STRING.login}
                    onPress={() => {
                        onLogin()
                    }} />
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate(SCREENS.ForgotPassword.name)
                }}>
                    <Text
                        style={styles.forgotPasswordText}
                        size={SCALE_SIZE(16)}
                        color={COLORS.blue}
                        align='center'
                        family={FONT_NAME.medium}>
                        {STRING.forgotPassword}
                    </Text>
                </TouchableOpacity>
                <View style={styles.borderView}>
                    <View style={styles.borderPreviousLine}></View>
                    <Text
                        style={styles.orText}
                        size={SCALE_SIZE(16)}
                        color={COLORS.borderGray}
                        align='center'
                        family={FONT_NAME.medium}>
                        {STRING.or}
                    </Text>
                    <View style={styles.borderAfterLine}></View>
                </View>
                <TouchableOpacity style={styles.googleButton}
                    onPress={() => {
                        googleSignin()
                    }}>
                    <Image
                        style={styles.googleLogo}
                        resizeMode="contain"
                        source={IMAGES.ic_google} />
                    <Text style={styles.googleText}
                        size={SCALE_SIZE(20)}
                        color={COLORS.borderGray}
                        align='center'
                        family={FONT_NAME.medium}>
                        {STRING.google}
                    </Text>
                </TouchableOpacity>
                <View style={{ marginVertical: SCALE_SIZE(60) }}>
                    <Text
                        align='center'
                        size={SCALE_SIZE(20)}
                        color={COLORS.borderGray}
                        family={FONT_NAME.medium}>
                        {STRING.dontHaveAnAccount}
                        <Text onPress={() => {
                            props.navigation.navigate(SCREENS.SignUp.name)
                        }}
                            size={SCALE_SIZE(20)}
                            color={COLORS.blue}
                            // align='center'
                            family={FONT_NAME.medium}>
                            {STRING.signUp}
                        </Text>
                    </Text>
                </View>
            </ScrollView>
            {isLoading && <ProgressView />}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0
    },
    roundLoginLogo: {
        height: SCALE_SIZE(200),
        width: SCALE_SIZE(200),
        alignSelf: 'flex-end'
    },
    ccHotelLogo: {
        height: SCALE_SIZE(96),
        width: SCALE_SIZE(178),
        alignSelf: 'center',
        marginTop: SCALE_SIZE(100)
    },
    emailInput: {
        marginTop: SCALE_SIZE(61),
        marginHorizontal: SCALE_SIZE(35)
    },
    passwordInput: {
        marginTop: SCALE_SIZE(35),
        marginHorizontal: SCALE_SIZE(35)
    },
    loginButton: {
        marginTop: SCALE_SIZE(80),
        marginHorizontal: SCALE_SIZE(35)
    },
    forgotPasswordText: {
        marginTop: SCALE_SIZE(40)
    },
    borderView: {
        flexDirection: 'row',
        marginHorizontal: SCALE_SIZE(32)
    },
    borderPreviousLine: {
        height: 1,
        flex: 1.0,
        backgroundColor: COLORS.borderGray,
        marginTop: SCALE_SIZE(50),
    },
    orText: {
        marginTop: SCALE_SIZE(38),
        marginHorizontal: SCALE_SIZE(14)
    },
    borderAfterLine: {
        height: 1,
        flex: 1.0,
        backgroundColor: COLORS.borderGray,
        marginTop: SCALE_SIZE(50)
    },
    googleButton: {
        borderWidth: 1,
        borderColor: COLORS.borderGray,
        alignSelf: 'center',
        marginTop: SCALE_SIZE(32),
        borderRadius: SCALE_SIZE(30),
        height: SCALE_SIZE(72),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: SCALE_SIZE(38)
    },
    googleLogo: {
        height: SCALE_SIZE(36),
        width: SCALE_SIZE(36),
        alignSelf: 'center'
    },
    googleText: {
        marginLeft: SCALE_SIZE(16)
    },
})

export default Login;