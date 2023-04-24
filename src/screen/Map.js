import React from "react";
import { View, StyleSheet, SafeAreaView } from 'react-native'

//CONSTANT
import { COLORS, SCALE_SIZE, FONT_NAME, STRING } from "../constant";

//PACKAGES
import MapView, { Callout, Marker } from 'react-native-maps'

//COMPONENT
import { Header, Text } from "../component";

//PACKAGES
import WebView from "react-native-webview";

const Map = (props) => {

    function onBack() {
        props.navigation.goBack()
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
                    <Marker
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                        }}>
                        <Callout
                            tooltip={true}
                            style={{ backgroundColor: "#ffffff" }}>
                            <View style={styles.hotelView}>
                                <View>
                                    <WebView style={{ height: SCALE_SIZE(50), width: SCALE_SIZE(50) }}
                                        source={{ uri: 'https://media-cdn.tripadvisor.com/media/photo-s/14/60/4e/ef/image-hotel-resto.jpg' }}></WebView>
                                </View>
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
    }
})

export default Map;