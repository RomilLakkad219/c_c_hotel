import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from 'react-native'

//CONSTANT
import { COLORS, SCALE_SIZE, FONT_NAME } from "../constant";
import { BASE_IMAGE_URL } from "../constant/WebService";

//PACKAGES
import MapView, { Callout, Marker } from 'react-native-maps'

//COMPONENT
import { Header, ProgressView, Text } from "../component";

//PACKAGES
import WebView from "react-native-webview";

//API
import { home } from "../api";

//CONTEXT
import { AuthContext } from "../context";

//SCREENS
import { SCREENS } from ".";

const Map = (props) => {

    const { user } = useContext(AuthContext);

    const item = props.route.params

    console.log(item)

    const [hotelResult, setHotelResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
            <View style={styles.transparent}>
                <SafeAreaView />
                <Header
                    style={{ backgroundColor: 'transparent' }}
                    onBack={() => { onBack() }} />
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
                                        props.navigation.navigate(SCREENS.HotelDetail.name, {item:e })
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
                                            {/* <Rating
                                                style={styles.starContainer}
                                                type='star'
                                                startingValue={2}
                                                ratingCount={4}
                                                imageSize={12}>
                                            </Rating> */}
                                        </View>
                                    </View>
                                </Callout>
                            </Marker>
                        )
                    })}
                </MapView>
            </View>
            {isLoading && <ProgressView />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
    },
    map: {
        ...StyleSheet.absoluteFillObject,
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

export default Map;