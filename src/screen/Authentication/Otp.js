import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground, Image} from 'react-native'

//ASSET
import { IMAGES } from "../../asset";

//COMPONENT
import { Button, Text } from "../../component";

//PACKAGES
import OTPTextInput from 'react-native-otp-textinput'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST, STRING } from "../../constant";

//SCREENS
import { SCREENS } from "..";

const Otp = (props) => {

    const [selected, setSelected] = useState(false);
    const [otp, setOtp] = useState('')

    function onOtpCheck() {
        if (!otp) {
            SHOW_TOAST('Enter Your Otp')
        }
        else {
            props.navigation.navigate(SCREENS.ResetPassword.name)
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
                style={styles.otpBackground}
                resizeMode="contain"
                source={IMAGES.otp_bg} />
            <Text
                style={styles.enterOtpText}
                size={SCALE_SIZE(33)}
                family={FONT_NAME.medium}
                color={COLORS.black}>
                {STRING.enterOtp}
            </Text>
            <Text style={styles.otpCodeSendText}
                size={SCALE_SIZE(16)}
                family={FONT_NAME.medium}
                color={COLORS.gray}>
                {STRING.otpCodeSend}
            </Text>
            <OTPTextInput
                defaultValue={otp}
                containerStyle={styles.otpContainerStyle}
                textInputStyle={styles.otpSelected}
                inputCount={4}
                handleTextChange={(text) => {
                    setOtp(text)
                    // setSelected(true)
                }}>
            </OTPTextInput>
            <Button
                onPress={() => {
                    onOtpCheck()
                }}
                style={styles.submitButton}
                title={STRING.submit} />
            <SafeAreaView />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
    },
    backArrow: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        marginHorizontal: SCALE_SIZE(35),
        marginTop: SCALE_SIZE(35)
    },
    otpBackground: {
        height: SCALE_SIZE(193),
        width: SCALE_SIZE(218),
        marginTop: '20%',
        alignSelf: 'center'
    },
    enterOtpText: {
        marginTop: SCALE_SIZE(63),
        marginHorizontal: SCALE_SIZE(36)
    },
    otpCodeSendText: {
        marginHorizontal: SCALE_SIZE(35),
        marginTop: SCALE_SIZE(20)
    },
    emailInput: {
        marginTop: SCALE_SIZE(40),
        marginHorizontal: SCALE_SIZE(35)
    },
    otpContainerStyle: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: SCALE_SIZE(35)
    },
    otpSelected: {
        borderRadius: SCALE_SIZE(10),
        borderWidth: 1,
        borderBottomWidth: 1,
        marginTop: SCALE_SIZE(42),
        color: COLORS.blue,
        backgroundColor: '#EEF2FF',
        borderColor:COLORS.blue
    },
    submitButton: {
        marginTop: SCALE_SIZE(80),
        marginHorizontal: SCALE_SIZE(35)
    },
})

export default Otp;