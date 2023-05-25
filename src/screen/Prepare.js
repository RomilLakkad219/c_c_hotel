import React, { useContext, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from 'react-native'

//PACKAGES
import AsyncStorage from "@react-native-async-storage/async-storage";

//CONTEXT
import { CommonActions } from "@react-navigation/native";

//CONTEXT
import { AuthContext, TranslationContext } from "../context";

//SCREENS
import { SCREENS } from ".";

//API
import { userProfile } from "../api";

const Prepare = (props) => {

    const translations = useContext(TranslationContext)

    const { setUser, setProfile } = useContext(AuthContext)

    useEffect(() => {
        checkUser()
    }, [])

    async function checkUser() {
        const result = await AsyncStorage.getItem('user_details')
        if (result) {
            const user = JSON.parse(result)
            setUser(user)
            getUserProfile(user)
        }
        else {
            moveToLogin()
        }
    }

    async function getUserProfile(user) {
        const params = {
            user_id: user?.[0]?.user_id,
            user_session: user?.[0]?.user_session,
        }

        const result = await userProfile(params)

        if (result.status) {
            if (result?.data?.status == "1") {
                const profile = result?.data?.result?.user?.[0]
                setProfile(profile)

                const language = profile?.user_lang
                if (language?.toLowerCase() == 'english') {
                    translations.setLanguage('en')
                }
                else if (language?.toLowerCase() == 'spanish') {
                    translations.setLanguage('spanish')
                }
                else if (language?.toLowerCase() == 'french') {
                    translations.setLanguage('french')
                }
                else {
                    translations.setLanguage('en')
                }
                moveToHome()   
            }
            else {
                moveToLogin()
            }
        }
        else {
            moveToLogin()
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
                name: SCREENS.Splash.name
            }]
        }))
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        justifyContent: 'center'
    }
})

export default Prepare;