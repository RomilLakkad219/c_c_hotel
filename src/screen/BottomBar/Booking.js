import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, TextInput } from 'react-native'

//PACKAGES
import MapView, { Callout, Marker } from 'react-native-maps';

//ASSET
import { IMAGES } from "../../asset";

//COMPONENT
import { BookingSelectionPopup, Header, ProgressView,Text } from "../../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../../constant";
import { BASE_IMAGE_URL } from "../../constant/WebService";

//CONTEXT
import { AuthContext } from "../../context";

//API
import { home } from "../../api";

//PACKAGES
import WebView from "react-native-webview";

//SCREENS
import { SCREENS } from "..";

const Booking = (props) => {

    const { user } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [hotelResult, setHotelResult] = useState([]);

    useEffect(() => {
        getHome()
    }, [])

    function onBack() {
        props.navigation.goBack()
    }

    async function getHome() {
        const params = {
            user_id: user?.[0]?.user_id
        }

        setIsLoading(true)
        const result = await home(params)
        setIsLoading(false)

        console.log(JSON.stringify(result))

        if (result.status) {
            const response = result?.data?.result ?? []
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
                <View
                    style={styles.searchInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        value={search}
                        placeholder={STRING.searchHere}
                        placeholderTextColor={COLORS.gray}
                        onChangeText={(text) => {
                            setSearch(text)
                        }}>
                    </TextInput>
                    <Image
                        style={styles.searchImage}
                        resizeMode="contain"
                        source={IMAGES.ic_search} />
                </View>
            </View>
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    {hotelResult.map((e, index) => {
                        return (
                            <Marker
                                coordinate={{
                                    latitude: e?.hotel_lat,
                                    longitude: e?.hotel_long,
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
    webview:{
        height: SCALE_SIZE(50),
        width: SCALE_SIZE(50)
    }
})

export default Booking;