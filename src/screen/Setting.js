import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native'

//PACKAGES
import RBSheet from "react-native-raw-bottom-sheet";

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Header, LogoutPopup, Text } from "../component";

//ASSET
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constant";

const Setting = (props) => {

    function onBack() {
        props.navigation.goBack()
    }

    const settingData = [
        {
            title: STRING.language,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward
        },
        {
            title: STRING.subscribe,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward
        },
        {
            title: STRING.howItWorks,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward
        },
        {
            title: STRING.blog,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward
        },
        {
            title: STRING.rateTheApp,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward
        },
        {
            title: STRING.legalNotice,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward
        },
        {
            title: STRING.personalData,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward
        },
        {
            title: STRING.aboutDeveloper,
            image: IMAGES.ic_down,
            imageForward: IMAGES.ic_forward
        },
    ]

    const [changable, setChangable] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const languageRef = useRef();
    const [english, setEnglish] = useState('english');
    const [french, setFrench] = useState('french');
    const [spanish, setSpanish] = useState('spanish')

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
                                        source={changable ? item.image : item.imageForward} />
                                </TouchableOpacity>
                            )
                        }
                        else {
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
                }}>
                    <Text style={styles.englishText}
                        size={18}
                        family={FONT_NAME.medium}
                        color={COLORS.headerTitleGray}>
                        {STRING.english}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setFrench(french)
                }}>
                    <Text style={styles.englishText}
                        size={18}
                        family={FONT_NAME.medium}
                        color={COLORS.headerTitleGray}>
                        {STRING.french}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setSpanish(spanish)
                }}>
                    <Text style={styles.englishText}
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
        marginTop: SCALE_SIZE(10),
        height: SCALE_SIZE(50)
    },
})

export default Setting;