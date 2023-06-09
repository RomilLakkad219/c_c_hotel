import React, { useContext, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image, Switch } from 'react-native'

//PACKAGES
import AsyncStorage from "@react-native-async-storage/async-storage";

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { BottomSheet, Header, LogoutPopup, ProgressView, RateTheAppPopUp, Text } from "../component";

//ASSET
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_SUCCESS_TOAST, SHOW_TOAST, STRING } from "../constant";

//SCREENS
import { SCREENS } from ".";

import { CommonActions } from "@react-navigation/native";

//CONTEXT
import { AuthContext, TranslationContext } from "../context";

//API
import { languageChange, subscribe } from "../api";

const Setting = (props) => {

    const languageRef = useRef();

    const translations = useContext(TranslationContext);
    const { user, profile, fetchProfile } = useContext(AuthContext)

    const settingData = [
        {
            title: translations.language,
            key: 'language'
        },
        {
            title: translations.subscribe,
            key: 'subscribe',
            isSwitch: true,
        },
        {
            title: translations.howitworks,
            key: 'how it work'
        },
        {
            title: translations.blog,
            key: 'blog'
        },
        {
            title: translations.ratetheapp,
            key: 'rate the app'
        },
        {
            title: translations.legalnotice,
            key: 'legal notice'
        },
        {
            title: translations.personaldata,
            key: 'personal data'
        },
        {
            title: translations.aboutdeveloper,
            key: 'about developer'
        },
        {
            title: translations.logout,
            key: 'logout'
        },
    ]

    const [selectedLanguage, setSelectedLanguage] = useState(profile?.user_lang == 'en' ? 'English' : profile?.user_lang);

    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubscribe, setIsSubscribe] = useState(false)
    const [isVisibleLanguage, setVisibleLanguage] = useState(false)


    const toggleSwitch = () => {
        setIsSubscribe(!isSubscribe)
        getSubscribe()
    }

    function onBack() {
        props.navigation.goBack()
    }

    async function getSubscribe() {
        const params = {
            user_id: user?.[0]?.user_id,
            user_session: user?.[0]?.user_session,
        }

        setIsLoading(true)
        const result = await subscribe(params)
        setIsLoading(false)

        if (result.status) {
            const subscriberes = result?.data?.sub_status
            if (subscriberes == '1') {
                SHOW_SUCCESS_TOAST(translations.subscribed)
            }
            else {
                SHOW_TOAST(translations.unsubscribe)
            }
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    async function setLanguage(languageName) {
        const params = {
            user_id: user?.[0]?.user_id,
            user_session: user?.[0]?.user_session,
            user_lang: languageName,
        }

        setIsLoading(true)
        const result = await languageChange(params)

        if (result.status) {
            await fetchProfile()
            setIsLoading(false)
        }
        else {
            setIsLoading(false)
            SHOW_TOAST(result.error)
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => onBack()}
                title={translations.settings} />
            <View>
                <FlatList data={settingData}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{ marginTop: SCALE_SIZE(60) }}></View>
                        )
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={styles.mainContainer}
                                activeOpacity={1}
                                onPress={() => {
                                    if (item.key == 'language') {
                                        setVisibleLanguage(true)
                                        languageRef?.current?.open()
                                    }
                                    else if (item.key == 'subscribe') {

                                    }
                                    else if (item.key == 'how it work') {
                                        props.navigation.navigate(SCREENS.HowItWork.name)
                                    }
                                    else if (item.key == 'blog') {
                                        props.navigation.navigate(SCREENS.Blog.name)
                                    }
                                    else if (item.key == 'rate the app') {
                                        setVisible(true)
                                    }
                                    else if (item.key == 'legal notice') {
                                        props.navigation.navigate(SCREENS.LegalNotice.name)
                                    }
                                    else if (item.key == 'personal data') {
                                        props.navigation.navigate(SCREENS.PersonalData.name)
                                    }
                                    else if (item.key == 'about developer') {
                                        props.navigation.navigate(SCREENS.AboutDeveloper.name)
                                    }
                                    else if (item.key == 'logout') {
                                        setModalVisible(true)
                                    }
                                }}>
                                <Text
                                    style={styles.itemTitle}
                                    size={18}
                                    family={FONT_NAME.medium}
                                    color={COLORS.headerTitleGray}>
                                    {item.title}
                                </Text>
                                {item.isSwitch ?
                                    <Switch
                                        onValueChange={toggleSwitch}
                                        value={isSubscribe} />
                                    :
                                    <Image
                                        style={styles.itemImage}
                                        resizeMode='contain'
                                        source={item.key == 'language' ? (isVisibleLanguage ? IMAGES.ic_down : IMAGES.ic_forward) : IMAGES.ic_forward} />
                                }
                            </TouchableOpacity>
                        )
                    }}>
                </FlatList>
            </View>
            <LogoutPopup
                visible={modalVisible}
                onPressYes={async () => {
                    setModalVisible(false)
                    await AsyncStorage.clear()
                    props.navigation.dispatch(CommonActions.reset({
                        index: 0,
                        routes: [{
                            name: SCREENS.Login.name
                        }]
                    }))
                }}
                onPressNo={() => {
                    setModalVisible(false)
                }} />
            <RateTheAppPopUp
                visible={visible}
                onPress={() => {
                    setVisible(false)
                }} />
            <BottomSheet
                onRef={languageRef}
                selectedItem={selectedLanguage}
                data={[{ id: 0, name: STRING.english }, { id: 1, name: STRING.spanish }, { id: 2, name: STRING.french }]}
                onClose={() => {
                    setVisibleLanguage(false)
                }}
                onPressItem={(e) => {
                    setVisibleLanguage(false)
                    languageRef?.current?.close()

                    setTimeout(() => {
                        setSelectedLanguage(e.name)
                        setLanguage(e.name)

                        const language = e?.name
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
                    }, 500);

                }} />
            {isLoading && <ProgressView />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
    },
    mainContainer: {
        flexDirection: 'row',
        marginHorizontal: SCALE_SIZE(35),
        height: SCALE_SIZE(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemTitle: {
        flex: 1.0,
    },
    itemImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        tintColor: COLORS.headerTitleGray
    },
    logOutButton: {
        paddingLeft: SCALE_SIZE(10),
        paddingVertical: SCALE_SIZE(10),
        backgroundColor: '#F5FAFF',
        borderRadius: SCALE_SIZE(6),
        justifyContent: 'center',
        marginTop: SCALE_SIZE(20),
        marginHorizontal: SCALE_SIZE(18)
    },
    englishText: {
        marginHorizontal: SCALE_SIZE(25),
        marginTop: SCALE_SIZE(12),
        paddingLeft: SCALE_SIZE(15)
    },
    blueView: {
        backgroundColor: '#EEF2FF',
        borderRadius: SCALE_SIZE(6),
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SCALE_SIZE(25),
        marginTop: SCALE_SIZE(12),
        height: SCALE_SIZE(32),
        width: SCALE_SIZE(130),
        paddingLeft: SCALE_SIZE(15)
    },
})

export default Setting;