import React, { useContext, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, ImageBackground } from 'react-native'

//ASSET
import { IMAGES } from "../../asset";

//SCREENS
import { SCREENS } from "..";

//COMPONENT
import { Button, Text } from "../../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../../constant";

//PACKAGES
import AsyncStorage from "@react-native-async-storage/async-storage";

//CONTEXT
import { AuthContext } from "../../context";
import { CommonActions } from "@react-navigation/native";

const Splash = (props) => {

    const { setUser } = useContext(AuthContext)

    useEffect(() => {
        checkUser()
    }, [])

    async function checkUser() {
        const result = await AsyncStorage.getItem('user_details')
        if (result) {
            const user = JSON.parse(result)
            setUser(user)
            moveToHome()
        }
    }

    function moveToHome() {
        props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{
                name: SCREENS.BottomBar.name
            }]
        }))
    }

    function moveToLogin() {
        props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{
                name: SCREENS.Login.name
            }]
        }))
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