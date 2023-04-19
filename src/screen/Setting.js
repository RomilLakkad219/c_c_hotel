import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image, Switch} from 'react-native'

//PACKAGES
import RBSheet from "react-native-raw-bottom-sheet";

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Header, LogoutPopup, RateTheAppPopUp, Text } from "../component";

//ASSET
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constant";

//SCREENS
import { SCREENS } from ".";

const Setting = (props) => {

    function onBack() {
        props.navigation.goBack()
    }

    const settingData = [
        {
            title: STRING.language,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward,
            key: 'language'
        },
        {
            title: STRING.subscribe,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward,
            key: 'subscribe'
        },
        {
            title: STRING.howItWorks,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward,
            key: 'how it work'
        },
        {
            title: STRING.blog,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward,
            key: 'blog'
        },
        {
            title: STRING.rateTheApp,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward,
            key: 'rate the app'
        },
        {
            title: STRING.legalNotice,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward,
            key: 'legal notice'
        },
        {
            title: STRING.personalData,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward,
            key: 'personal data'
        },
        {
            title: STRING.aboutDeveloper,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward,
            key: 'about developer'
        },
    ]

    const [changable, setChangable] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const languageRef = useRef();
    const [english, setEnglish] = useState('english');
    const [french, setFrench] = useState('french');
    const [spanish, setSpanish] = useState('spanish');
    const [englishSelected, setEnglishSelected] = useState(false);
    const [frenchSelected, setFrenchSelected] = useState(false);
    const [spanishSelected, setSpanishSelected] = useState(false);
    const [visible, setVisible] = useState(false)

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => onBack()}
                title={STRING.settings} />
            <View>
                <FlatList data={settingData}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{ marginTop: SCALE_SIZE(60) }}></View>
                        )
                    }}
                    renderItem={({ item, index }) => {
                        if (index == 0) {
                            return (
                                <TouchableOpacity style={styles.mainContainer}
                                    onPress={() => {
                                        setChangable(!changable)
                                        languageRef.current.open()
                                    }}>
                                    <Text
                                        style={styles.itemTitle}
                                        size={18}
                                        family={FONT_NAME.medium}
                                        color={COLORS.headerTitleGray}>
                                        {item.title}
                                    </Text>
                                    <Image
                                        style={styles.itemImage}
                                        resizeMode='contain'
                                        source={item.image} />
                                </TouchableOpacity>
                            )
                        }
                        else if (index == 1) {
                            return (
                                <TouchableOpacity style={styles.mainContainer}
                                    onPress={() => {
                                    }}>
                                    <Text
                                        style={styles.itemTitle}
                                        size={18}
                                        family={FONT_NAME.medium}
                                        color={COLORS.headerTitleGray}>
                                        {item.title}
                                    </Text>
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                </TouchableOpacity>
                            )
                        }
                        else {
                            return (
                                <TouchableOpacity style={styles.mainContainer}
                                    onPress={() => {
                                        if (item.key == 'how it work') {
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
                                    }}>
                                    <Text
                                        style={styles.itemTitle}
                                        size={18}
                                        family={FONT_NAME.medium}
                                        color={COLORS.headerTitleGray}>
                                        {item.title}
                                    </Text>
                                    <Image
                                        style={styles.itemImage}
                                        resizeMode='contain'
                                        source={item.imageForward} />
                                </TouchableOpacity>
                            )
                        }
                    }}>
                </FlatList>
            </View>
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true)
                }}
                style={styles.logOutButton}>
                <Text
                    size={18}
                    family={FONT_NAME.medium}
                    color={COLORS.blue}>
                    {STRING.logOut}
                </Text>
            </TouchableOpacity>
            <LogoutPopup
                visible={modalVisible}
                onPressYes={() => { setModalVisible(false) }}
                onPressNo={() => { setModalVisible(false) }} />
            <RateTheAppPopUp visible={visible}
                onPress={() => {
                    setVisible(false)
                }} />
            <RBSheet ref={languageRef}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    container: {
                        backgroundColor: '#FFF',
                        height: SCALE_SIZE(300)
                    }
                }}>
                <TouchableOpacity onPress={() => {
                    setEnglish(english)
                    setEnglishSelected(!englishSelected)
                }}>
                    <Text style={englishSelected ? styles.blueView : styles.englishText}
                        size={18}
                        family={FONT_NAME.medium}
                        color={COLORS.headerTitleGray}>
                        {STRING.english}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setFrench(french)
                    setFrenchSelected(!frenchSelected)
                }}>
                    <Text style={frenchSelected ? styles.blueView : styles.englishText}
                        size={18}
                        family={FONT_NAME.medium}
                        color={COLORS.headerTitleGray}>
                        {STRING.french}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setSpanish(spanish)
                    setSpanishSelected(!spanishSelected)
                }}>
                    <Text style={spanishSelected ? styles.blueView : styles.englishText}
                        size={18}
                        family={FONT_NAME.medium}
                        color={COLORS.headerTitleGray}>
                        {STRING.spanish}
                    </Text>
                </TouchableOpacity>
            </RBSheet>
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTitle: {
        flex: 1.0,
        marginTop: SCALE_SIZE(18)
    },
    itemImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        marginTop: SCALE_SIZE(10),
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