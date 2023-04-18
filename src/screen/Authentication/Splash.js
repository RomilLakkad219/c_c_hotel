import React from "react";
import { View, StyleSheet, SafeAreaView, ImageBackground } from 'react-native'

//ASSET
import { IMAGES } from "../../asset";

//SCREENS
import { SCREENS } from "..";

//COMPONENT
import { Button, Text } from "../../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../../constant";

const Splash = (props) => {

    function moveToLogin() {
        props.navigation.navigate(SCREENS.Login.name)
    }

    return (
        <ImageBackground style={styles.container} source={IMAGES.splash_bg}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.welcomeToText}
                    size={SCALE_SIZE(24)}
                    family={FONT_NAME.medium}
                    color={COLORS.black}>
                    {STRING.welcomeTo}
                </Text>
                <Text style={styles.cAndCHotelsText}
                    size={SCALE_SIZE(40)}
                    family={FONT_NAME.semiBold}
                    color={COLORS.black}>
                    {STRING.cAndCHotels}
                </Text>
                <View style={styles.imgContainer}>
                    <ImageBackground
                        style={styles.image}
                        resizeMode='contain'
                        source={IMAGES.login_img} />
                </View>
                <Button
                    style={styles.buttonStyle}
                    title={STRING.getStarted}
                    isRightImage={true}
                    onPress={() => {
                        moveToLogin()
                    }} />
            </SafeAreaView>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
    },
    welcomeToText: {
        marginTop: SCALE_SIZE(44),
        marginHorizontal: SCALE_SIZE(35)
    },
    cAndCHotelsText: {
        marginHorizontal: SCALE_SIZE(35)
    },
    imgContainer: {
        flex: 1.0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    image: {
        height: '80%',
        width: '80%',
        marginBottom: SCALE_SIZE(20)
    },
    buttonStyle: {
        marginHorizontal: SCALE_SIZE(35),
        marginBottom: '15%'
    }
})

export default Splash;