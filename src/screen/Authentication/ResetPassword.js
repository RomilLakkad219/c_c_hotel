import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground, Image } from 'react-native'

//ASSET
import { IMAGES } from "../../asset";

//COMPONENT
import { Button, Input, Text } from "../../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST, STRING } from "../../constant";

const ResetPassword = (props) => {

    const [isSecurePassword, setSecurePassword] = useState(true);
    const [isVisiblePassword, setIsVisiblePassword] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    function onSubmit() {
        if (!newPassword) {
            SHOW_TOAST('Enter New Password')
        }
        else if (!confirmPassword) {
            SHOW_TOAST('Enter Confirm Password')
        }
        else {
            SHOW_TOAST('Complete')
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
                <Image
                    style={styles.resetPasswordBackground}
                    resizeMode="contain"
                    source={IMAGES.reset_pw_bg} />
                <Text
                    style={styles.resetPasswordText}
                    size={SCALE_SIZE(33)}
                    family={FONT_NAME.medium}
                    color={COLORS.black}>
                    {STRING.reset}
                </Text>
                <Text style={styles.passwordText}
                    size={SCALE_SIZE(33)}
                    family={FONT_NAME.medium}
                    color={COLORS.black}>
                    {STRING.password}
                </Text>
                <Input
                    style={styles.newPasswordInput}
                    value={newPassword}
                    title={STRING.newPassword}
                    secureTextEntry={isSecurePassword}
                    onChangeText={(text) => {
                        setNewPassword(text)
                    }}
                    icon={isSecurePassword ? IMAGES.ic_eye_password : IMAGES.ic_s_password}
                    onPressIcon={() => {
                        setSecurePassword(!isSecurePassword)
                    }} />
                <Input
                    style={styles.confirmPasswordInput}
                    value={confirmPassword}
                    title={STRING.confirmPassword}
                    secureTextEntry={isVisiblePassword}
                    onChangeText={(text) => {
                        setConfirmPassword(text)
                    }}
                    icon={isVisiblePassword ? IMAGES.ic_eye_password : IMAGES.ic_s_password}
                    onPressIcon={() => {
                        setIsVisiblePassword(!isVisiblePassword)
                    }} />
                <Button
                    style={styles.submitButton}
                    onPress={() => {
                        onSubmit()
                    }}
                    title={STRING.submit} />
                <SafeAreaView />
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
        marginHorizontal: SCALE_SIZE(35),
        marginTop: SCALE_SIZE(35)
    },
    resetPasswordBackground: {
        height: SCALE_SIZE(226),
        width: SCALE_SIZE(241),
        alignSelf: 'center',
        marginTop: '20%'
    },
    resetPasswordText: {
        marginTop: SCALE_SIZE(49),
        marginHorizontal: SCALE_SIZE(36)
    },
    passwordText: {
        marginHorizontal: SCALE_SIZE(36)
    },
    newPasswordInput: {
        marginTop: SCALE_SIZE(20),
        marginHorizontal: SCALE_SIZE(35)
    },
    confirmPasswordInput: {
        marginTop: SCALE_SIZE(35),
        marginHorizontal: SCALE_SIZE(35)
    },
    submitButton: {
        marginTop: SCALE_SIZE(45),
        marginHorizontal: SCALE_SIZE(35)
    }
})

export default ResetPassword;