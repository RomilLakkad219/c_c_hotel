import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, TextInput, Alert, TouchableOpacity } from 'react-native'

//PACKAGES
import MapView, { Callout, Marker } from 'react-native-maps';

//ASSET
import { IMAGES } from "../../asset";   

//COMPONENT
import { BookingSelectionPopup, Header, ProgressView, Text } from "../../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../../constant";
import { BASE_IMAGE_URL } from "../../constant/WebService";

//CONTEXT
import { AuthContext, TranslationContext } from "../../context";

//API
import { home } from "../../api";

//PACKAGES
import WebView from "react-native-webview";
import Geolocation from "@react-native-community/geolocation";

//SCREENS
import { SCREENS } from "..";

const Booking = (props) => {

    const { user } = useContext(AuthContext);

    const translations = useContext(TranslationContext)

    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [hotelResult, setHotelResult] = useState([]);
    const [mapRegion, setMapRegion] = useState(null)

    useEffect(() => {
        getHome()
    }, [])

    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = () => {
        Geolocation.requestAuthorization(() => {
            Geolocation.getCurrentPosition((position) => {
                setMapRegion({
                    latitude: position?.coords?.latitude,
                    longitude: position?.coords?.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                    selectedItemIndex: 0
                })

            })
        }, (error) => {
            Alert.alert('', error.message)
        })
    }

    function onBack() {
        props.navigation.goBack()
    }

    async function getHome() {
        const params = {
            user_id: user?.[0]?.user_id,
            user_session: user?.[0]?.user_session,
        }

        setIsLoading(true)
        const result = await home(params)
        setIsLoading(false)

        if (result.status) {
            const array = result?.data?.result ?? []
            const response = array.slice(0, 10)
            setHotelResult(response)
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.positionView}>
                <SafeAreaView />
                <Header
                    style={{ backgroundColor: 'transparent' }}
                    onBack={() => onBack()}
                    onDashboard={() => {
                        setVisible(true)
                    }} />
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
            </View>
            <View style={styles.container}>
                <MapView style={styles.map}
                    showsUserLocation={true}
                    region={mapRegion}>
                    {hotelResult.map((e, index) => {
                        const lat = Number(e?.hotel_lat ?? 0)
                        const lng = Number(e?.hotel_long ?? 0)

                        return (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: isNaN(lat) ? 0 : lat,
                                    longitude: isNaN(lng) ? 0 : lng,
                                }}>
                                <Callout
                                    onPress={() => {
                                        props.navigation.navigate(SCREENS.HotelDetail.name, { item: e })
                                    }}
                                    key={index}
                                    tooltip={true}
                                    style={{ backgroundColor: "#ffffff" }}>
                                    <View style={styles.hotelView}>
                                        <View>
                                            <WebView style={styles.webview}
                                                source={{ uri: BASE_IMAGE_URL + e?.hotel_galary_photos }}></WebView>
                                        </View>
                                        <View style={styles.textView}>
                                            <Text
                                                size={SCALE_SIZE(14)}
                                                align='left'
                                                family={FONT_NAME.medium}
                                                color={COLORS.black}>
                                                {e?.hotel_trader_name}
                                            </Text>
                                            <Text
                                                size={SCALE_SIZE(9)}
                                                align='left'
                                                family={FONT_NAME.medium}
                                                color={COLORS.borderGray}>
                                                {e?.hotel_city + ', ' + e?.hotel_country}
                                            </Text>
                                        </View>
                                    </View>
                                </Callout>
                            </Marker>
                        )
                    })}
                </MapView>
                {isLoading && <ProgressView />}
            </View>
            <BookingSelectionPopup
                visible={visible}
                navigation={props.navigation}
                onClose={() => {
                    setVisible(false)
                }}>
            </BookingSelectionPopup>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
    },
    positionView: {
        position: 'absolute',
        zIndex: 5000,
        top: 0,
        right: 0,
        left: 0
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        alignItems: 'center',
        paddingHorizontal: SCALE_SIZE(35),
        paddingBottom: SCALE_SIZE(20),
    },
    backArrow: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        alignSelf: 'center',
        backgroundColor: 'red'
    },
    searchInputContainer: {
        height: SCALE_SIZE(70),
        backgroundColor: '#fff',
        borderRadius: SCALE_SIZE(20),
        marginHorizontal: SCALE_SIZE(30),
        marginTop: SCALE_SIZE(35),
        paddingHorizontal: SCALE_SIZE(28),
        flexDirection: 'row',
        marginBottom: SCALE_SIZE(20),
        elevation: 4
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
    hotelView: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SCALE_SIZE(12),
        paddingVertical: SCALE_SIZE(14),
        borderRadius: SCALE_SIZE(13)
    },
    textView: {
        flexDirection: 'column',
        marginHorizontal: SCALE_SIZE(9)
    },
    starContainer: {
        alignItems: 'flex-start',
        marginTop: SCALE_SIZE(5)
    },
    transparent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 5000
    },
    webview: {
        height: SCALE_SIZE(50),
        width: SCALE_SIZE(50)
    }
})

export default Booking;