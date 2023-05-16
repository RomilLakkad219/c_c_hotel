import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Header, ProgressView, Text } from "../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constant";

//PACKAGES
import { Rating } from 'react-native-ratings'
import MapView, { Marker } from "react-native-maps";

//SCREENS
import { SCREENS } from ".";

//API
import { matchMakinghotels } from "../api";

const MatchList = (props) => {

    const [isLoading, setIsLoading] = useState(false)

    const { continent, countries, region, services } = props.route.params

    useEffect(() => {
        getMatchMakingList()
    }, [])

    async function getMatchMakingList() {
        const params = {
            seacrh_string: '',
            avg_price_from: '',
            avg_price_to: '',
            hotel_continent: continent?.map((e) => e.name).join(','),
            hotel_country: countries?.map((e) => e.name).join(','),
            hotel_themes: '',
            hotel_services: services?.map((e) => e.name).join(','),
            hotel_region: region?.map((e) => e.name).join(','),
            hotel_equipment: '',
            user_session: '',
            user_session_id: ''
        }

        console.log('MatchList Params', params)

        setIsLoading(true)
        const result = await matchMakinghotels(params)
        setIsLoading(false)

        console.log(JSON.stringify(result))

    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ backgroundColor: 'rgba(255, 255, 255, 0.28)' }} />
            <View style={styles.headerContainer}>
                <Header
                    title={"Match List(10)"}
                    onBack={() => {
                        props.navigation.goBack()
                    }} />
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
                            <View style={{ marginTop: SCALE_SIZE(52) }}></View>
                        )
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.itemContainer}
                                onPress={() => {
                                    props.navigation.navigate(SCREENS.HotelDetail.name, {
                                        item: item
                                    })
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
                                            type='star'
                                            ratingImage={IMAGES.ic_star}
                                            startingValue={2}
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
            {isLoading && <ProgressView />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
    },
    headerContainer: {
        paddingBottom: SCALE_SIZE(10),
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 3,
        backgroundColor: '#FFF',
        zIndex: 2000
    },
    hotelContainer: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: SCALE_SIZE(36),
        borderTopRightRadius: SCALE_SIZE(36),
        flex: 1.0,
        marginTop: -30
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