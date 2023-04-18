import React from "react";
import { View, StyleSheet, Platform, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Header, Text } from "../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constant";

//PACKAGES
import { Rating } from 'react-native-ratings'
import MapView, { Marker } from "react-native-maps";

//SCREENS
import { SCREENS } from ".";

const MatchList = (props) => {

    function onBack() {
        props.navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ backgroundColor: 'rgba(255, 255, 255, 0.28)' }} />
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => {
                        onBack()
                    }}>
                    <Image
                        style={styles.backArrow}
                        resizeMode="contain"
                        source={IMAGES.back_arrow} />
                </TouchableOpacity>
                <Text
                    size={SCALE_SIZE(23)}
                    color={COLORS.gray}
                    align='center'
                    family={FONT_NAME.medium}>
                    {"Match List(10)"}
                </Text>
                <View></View>
            </View>
            <View style={{ flex: 1.0 }}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                        image={IMAGES.map_bg}>
                    </Marker>
                </MapView>
            </View>
            <View style={styles.hotelContainer}>
                <FlatList data={['', '']}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{ marginTop: SCALE_SIZE(51) }}></View>
                        )
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.itemContainer}
                                onPress={() => {
                                    props.navigation.navigate(SCREENS.HotelDetail.name)
                                }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={styles.imageView}
                                        resizeMode="contain"
                                        source={IMAGES.popularhotel_bg} />
                                    <View style={styles.directionView}>
                                        <Text
                                            style={styles.itemText}
                                            size={SCALE_SIZE(18)}
                                            color={COLORS.headerTitleGray}
                                            family={FONT_NAME.medium}>
                                            {"Oberio Hotel"}
                                        </Text>
                                        <Text
                                            style={styles.southAmerica}
                                            size={SCALE_SIZE(16)}
                                            color={COLORS.gray}
                                            family={FONT_NAME.medium}>
                                            {"South America"}
                                        </Text>
                                        <Rating
                                            style={styles.starContainer}
                                            type='custom'
                                            ratingImage={IMAGES.ic_star}
                                            ratingColor='yellow'
                                            ratingCount={4}
                                            imageSize={12}>
                                        </Rating>
                                        <TouchableOpacity style={styles.discoverButton}>
                                            <Text
                                                align='center'
                                                size={SCALE_SIZE(12)}
                                                color={COLORS.white}
                                                family={FONT_NAME.semiBold}>
                                                {STRING.discover}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}>

                </FlatList>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
    },
    headerContainer: {
        height: Platform.OS == 'ios' ? SCALE_SIZE(44) : SCALE_SIZE(54),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.28)',
        alignItems: 'center',
        paddingHorizontal: SCALE_SIZE(35),
        paddingBottom: SCALE_SIZE(20)
    },
    backArrow: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        alignSelf: 'center'
    },
    hotelContainer: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: SCALE_SIZE(36),
        borderTopRightRadius: SCALE_SIZE(36),
        flex: 1.0
    },
    directionView: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#DEDEDE',
        backgroundColor: COLORS.white,
        borderRadius: SCALE_SIZE(10),
        marginTop: SCALE_SIZE(15),
        marginHorizontal: SCALE_SIZE(35),
        paddingBottom: SCALE_SIZE(15)
    },
    imageView: {
        height: SCALE_SIZE(117),
        width: SCALE_SIZE(124),
        alignSelf: 'center',
        marginTop: SCALE_SIZE(16),
        marginLeft: SCALE_SIZE(16),
        paddingBottom: SCALE_SIZE(15)
    },
    itemText: {
        marginTop: SCALE_SIZE(16),
        marginHorizontal: SCALE_SIZE(16)
    },
    southAmerica: {
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(1)
    },
    discoverButton: {
        height: SCALE_SIZE(31),
        width: SCALE_SIZE(77),
        borderRadius: SCALE_SIZE(24),
        backgroundColor: COLORS.black,
        justifyContent: 'center',
        marginTop: SCALE_SIZE(13),
        marginLeft: SCALE_SIZE(13)
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    starContainer: {
        alignItems: 'flex-start',
        marginHorizontal: SCALE_SIZE(17),
        marginTop: SCALE_SIZE(9)
    }
})

export default MatchList;