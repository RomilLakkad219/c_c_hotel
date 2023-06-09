import React, { useState, useRef, useContext, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, TextInput, Image, FlatList, TouchableOpacity, Dimensions, ScrollView, Linking } from 'react-native'

//ASSET
import { IMAGES } from "../../asset";

//COMPONENT
import { BottomSheet, Header, HotelCarousel, ProgressView, Text } from "../../component";

//CONSTANT
import { COLORS, STRING, SCALE_SIZE, FONT_NAME, SHOW_TOAST } from "../../constant";

//PACKAGES
import Carousel from 'react-native-snap-carousel';

//SCREENS
import { SCREENS } from "..";

//CONTEXT
import { AuthContext, TranslationContext } from "../../context";

//API
import { home, languageChange } from "../../api";

const Home = (props) => {

    const { user, fetchProfile, profile } = useContext(AuthContext)

    const translations = useContext(TranslationContext)

    const languageRef = useRef();
    const isCarousel = useRef()

    const [search, setSearch] = useState('');
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(profile?.user_lang == 'en' ? 'English' : profile?.user_lang);
    const [hotel, setHotel] = useState([])

    useEffect(() => {
        getHome()
    }, [])

    useEffect(() => {
        if (profile?.user_lang == "en") {
            setSelectedLanguage('English')
        }
        else {
            setSelectedLanguage(profile?.user_lang ?? '')
        }
    }, [profile])

    const hotelData =
        [
            {
                image: IMAGES.ic_map,
                title: translations.map,
                key: 'map'
            },
            {
                image: IMAGES.ic_expereience,
                title: translations.experience,
                key: 'experience'
            },
            {
                image: IMAGES.ic_destination,
                title: translations.destinations,
                key: 'destination'
            },
            {
                image: IMAGES.ic_match,
                title: translations.match,
                key: 'match'
            }
        ]

    const brandData = [
        {
            brandImage: IMAGES.cosyplace_bg,
            key: 'cosyplace'
        },
        {
            brandImage: IMAGES.cosylux_bg,
            key: 'cosylux'
        },
        {
            brandImage: IMAGES.generation_bg,
            key: 'generation'
        },
        {
            brandImage: IMAGES.harme_bg,
            key: 'harme'
        }
    ]


    async function getHome() {
        const params = {
            user_id: user?.[0]?.user_id,
            user_session: user?.[0]?.user_session,
        }

        setIsLoading(true)
        const result = await home(params)
        setIsLoading(false)

        if (result.status) {
            const imgres = result?.data?.result ?? []
            const response = imgres.slice(0, 10)
            setHotel(response)
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
            <Header
                type={'home'}
                onDown={() => { }}
                onLanguage={() => { languageRef.current.open() }}
                title={selectedLanguage} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.searchInputContainer}
                    onPress={() => {
                        props.navigation.navigate(SCREENS.Search.name)
                    }}>
                    <TextInput
                        style={styles.searchInput}
                        value={search}
                        editable={false}
                        pointerEvents="none"
                        placeholder={translations.searchhere}
                        placeholderTextColor={COLORS.gray}
                        onChangeText={(text) => {
                            setSearch(text)
                        }}>
                    </TextInput>
                    <Image
                        style={styles.searchImage}
                        resizeMode="contain"
                        source={IMAGES.ic_search} />
                </TouchableOpacity>
                <View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={hotelData}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={() => <View style={{ width: SCALE_SIZE(25) }} />}
                        ListFooterComponent={() => <View style={{ width: SCALE_SIZE(35) }} />}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={styles.listDirectionView} onPress={() => {
                                    if (item.key == 'map') {
                                        props.navigation.navigate(SCREENS.Booking.name)
                                    }
                                    else if (item.key == 'experience') {
                                        props.navigation.navigate(SCREENS.Experience.name)
                                    }
                                    else if (item.key == 'destination') {
                                        props.navigation.navigate(SCREENS.Destination.name)
                                    }
                                    else if (item.key == 'match') {
                                        props.navigation.navigate(SCREENS.Match.name)
                                    }
                                }}>
                                    <View style={styles.listContainer}>
                                        <Image
                                            style={styles.itemImage}
                                            resizeMode="contain"
                                            source={item.image} />
                                        <Text
                                            style={styles.title}
                                            size={SCALE_SIZE(16)}
                                            color={COLORS.headerTitleGray}
                                            family={FONT_NAME.medium}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}>
                    </FlatList>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row' }}
                    onPress={() => {
                        props.navigation.navigate(SCREENS.PopularHotel.name)
                    }}>
                    <Text style={styles.popularHotelText}
                        size={SCALE_SIZE(20)}
                        color={COLORS.black}
                        family={FONT_NAME.medium}>
                        {translations.popularhotel}
                    </Text>
                    <Image style={styles.forwardImage}
                        resizeMode='contain'
                        source={IMAGES.ic_forward} />
                </TouchableOpacity>
                <Carousel
                    layout='default'
                    layoutCardOffset={9}
                    ref={isCarousel}
                    data={hotel}
                    renderItem={({ item, index }) =>
                        <HotelCarousel navigation={props.navigation} item={item} />
                    }
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width - SCALE_SIZE(70)}
                    useScrollView={true}
                    onSnapToItem={(index) => setIndex(index)}>
                </Carousel>
                <Text style={styles.followText}
                    size={SCALE_SIZE(20)}
                    color={COLORS.black}
                    family={FONT_NAME.medium}>
                    {translations.followourbrands}
                </Text>
                <View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={() => {
                            return (
                                <View style={{ width: SCALE_SIZE(24) }}></View>
                            )
                        }}
                        data={brandData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={{ flexDirection: 'row' }}
                                    onPress={() => {
                                        if (item.key == 'cosyplace') {
                                            return Linking.openURL('https://cosy-places-luxe.com/')
                                        }
                                        else if (item.key == 'cosylux') {
                                            return Linking.openURL('https://cosy-places.com/')
                                        }
                                        else if (item.key == 'generation') {
                                            return Linking.openURL('https://hostels-generations.xyz/')
                                        }
                                        else if (item.key == 'harme') {
                                            return Linking.openURL('https://charme-caractere.com/')
                                        }
                                    }}>
                                    <View style={styles.brandContainer}>
                                        <Image
                                            style={styles.brandImage}
                                            resizeMode="contain"
                                            source={item.brandImage} />
                                    </View>
                                </TouchableOpacity>
                            )
                        }}>
                    </FlatList>

                </View>
            </ScrollView>
            <BottomSheet
                onRef={languageRef}
                selectedItem={selectedLanguage}
                data={[{ id: 0, name: STRING.english }, { id: 1, name: STRING.spanish }, { id: 2, name: STRING.french }]}
                onPressItem={(e) => {
                    languageRef?.current?.close()

                    setTimeout(() => {
                        setSelectedLanguage(e?.name)
                        setLanguage(e?.name)

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
        backgroundColor: '#FFFFFF'
    },
    searchInputContainer: {
        height: SCALE_SIZE(70),
        backgroundColor: COLORS.lightgray,
        borderRadius: SCALE_SIZE(20),
        marginHorizontal: SCALE_SIZE(30),
        marginTop: SCALE_SIZE(35),
        paddingHorizontal: SCALE_SIZE(28),
        flexDirection: 'row'
    },
    searchInput: {
        fontFamily: FONT_NAME.medium,
        fontSize: SCALE_SIZE(16),
        flex: 1.0
    },
    searchImage: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        alignSelf: 'center'
    },
    listDirectionView: {
        marginLeft: SCALE_SIZE(10),
        marginTop: SCALE_SIZE(35),
    },
    listContainer: {
        height: SCALE_SIZE(49),
        width: SCALE_SIZE(174),
        backgroundColor: '#F3F3F3',
        borderRadius: SCALE_SIZE(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selected: {
        height: SCALE_SIZE(49),
        width: SCALE_SIZE(174),
        backgroundColor: COLORS.blue,
        borderRadius: SCALE_SIZE(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        tintColor: COLORS.headerTitleGray
    },
    whiteImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        tintColor: COLORS.white
    },
    title: {
        paddingLeft: SCALE_SIZE(16)
    },
    popularHotelText: {
        marginTop: SCALE_SIZE(29),
        marginHorizontal: SCALE_SIZE(35),
        flex: 1.0
    },
    forwardImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        marginTop: SCALE_SIZE(35),
        marginRight: SCALE_SIZE(35)
    },
    followText: {
        marginTop: SCALE_SIZE(20),
        marginHorizontal: SCALE_SIZE(35)
    },
    brandContainer: {
        height: SCALE_SIZE(78),
        width: SCALE_SIZE(82),
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SCALE_SIZE(18),
        marginTop: SCALE_SIZE(20),
        justifyContent: 'center',
        marginLeft: SCALE_SIZE(11),
        marginBottom: SCALE_SIZE(27),
    },
    cosyPlaceContainer: {
        height: SCALE_SIZE(78),
        width: SCALE_SIZE(82),
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SCALE_SIZE(18),
        marginTop: SCALE_SIZE(20),
        marginLeft: SCALE_SIZE(11),
        justifyContent: 'center'
    },
    generationContainer: {
        height: SCALE_SIZE(78),
        width: SCALE_SIZE(82),
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SCALE_SIZE(18),
        marginTop: SCALE_SIZE(20),
        marginLeft: SCALE_SIZE(11),
        justifyContent: 'center'
    },
    harmcarterContainer: {
        height: SCALE_SIZE(78),
        width: SCALE_SIZE(82),
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SCALE_SIZE(18),
        marginTop: SCALE_SIZE(20),
        marginLeft: SCALE_SIZE(11),
        justifyContent: 'center'
    },
    brandImage: {
        height: SCALE_SIZE(52),
        width: SCALE_SIZE(71),
        alignSelf: 'center'
    }
})

export default Home;