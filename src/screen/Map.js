import React from "react";
import { View, StyleSheet, SafeAreaView, Image, Text as RNText } from 'react-native'

//CONSTANT
import { COLORS, SCALE_SIZE, FONT_NAME, STRING } from "../constant";

//PACKAGES
import MapView, { Callout, Marker } from 'react-native-maps'
import { Rating } from 'react-native-ratings'

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Header, Text } from "../component";

const Map = (props) => {

    function onBack() {
        props.navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => { onBack() }} />
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                        }}>
                        <Callout
                            tooltip={true}
                            style={{ backgroundColor: "#ffffff" }}>
                            <View style={styles.hotelView}>
                                <View
                                    style={styles.mapHotelBg} />
                                <View style={styles.textView}>
                                    <Text
                                        size={SCALE_SIZE(14)}
                                        align='left'
                                        family={FONT_NAME.medium}
                                        color={COLORS.black}>
                                        {STRING.villaMia}
                                    </Text>
                                    <Text
                                        size={SCALE_SIZE(9)}
                                        align='left'
                                        family={FONT_NAME.medium}
                                        color={COLORS.borderGray}>
                                        {'Abidjan, Ivory Coast'}
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
                </MapView>
            </View>
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
    mapHotelBg: {
        height: SCALE_SIZE(100),
        width: SCALE_SIZE(100),
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    textView: {
        flexDirection: 'column',
        marginHorizontal: SCALE_SIZE(9)
    },
    starContainer: {
        alignItems: 'flex-start',
        marginTop: SCALE_SIZE(5)
    }
})

export default Map;