import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Header, ProgressView, Text } from "../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST, STRING } from "../constant";

//PACKAGES
import { AirbnbRating } from 'react-native-ratings'
import MapView, { Callout, Marker } from "react-native-maps";

//SCREENS
import { SCREENS } from ".";

//API
import { matchMakinghotels } from "../api";

//PACKAGES
import WebView from "react-native-webview";

//CONTEXT
import { AuthContext, TranslationContext } from "../context";

const MatchList = (props) => {

    const { user } = useContext(AuthContext);

    const translations = useContext(TranslationContext)

    const calloutRef = useRef(null)

    const [isLoading, setIsLoading] = useState(false);
    const [hotelResponse, setHotelResponse] = useState([])
    const [mapRegion, setMapRegion] = useState(null)

    const { continent, countries, region, services } = props.route.params

    useEffect(() => {
        getMatchMakingList()
    }, [])

    async function getMatchMakingList() {
        console.log(continent)
        const params = {
            user_session: user?.[0]?.user_session,
            seacrh_string: '',
            avg_price_from: '',
            avg_price_to: '',
            hotel_continent: continent?.name ?? '',
            hotel_country: countries?.name ?? '',
            hotel_themes: '',
            hotel_services: services?.id ?? '',
            hotel_region: region?.id ?? '',
            hotel_equipment: '',
            user_session_id: ''
        }

        setIsLoading(true)
        const result = await matchMakinghotels(params)
        setIsLoading(false)

        if (result.status) {
            const hotelList = result?.data?.result ?? []
            setHotelResponse(hotelList)

            if (hotelList?.length > 0) {
                const lat = hotelList[0].hotel_lat
                const lng = hotelList[0].hotel_long   

                setMapRegion({
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                    selectedItemIndex: 0
                })

                setTimeout(() => {
                    calloutRef.current.showCallout()
                }, 1000);
            }
        }
        else {
            SHOW_TOAST(result?.error)
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ backgroundColor: 'rgba(255, 255, 255, 0.28)' }} />
            <View style={styles.headerContainer}>
                <Header
                    title={`${translations.matchlist}(${hotelResponse?.length ?? 0})`}
                    onBack={() => {
                        props.navigation.goBack()
                    }} />
            </View>
            <View style={{ flex: 1.0 }}>
                <MapView style={styles.map} region={mapRegion}>
                    {mapRegion &&
                        <Marker coordinate={{
                            latitude: mapRegion.latitude,
                            longitude: mapRegion.longitude,
                        }}
                            image={IMAGES.map_bg}
                            ref={calloutRef}>
                            <Callout
                                onPress={() => {
                                    props.navigation.navigate(SCREENS.HotelDetail.name, { item: hotelResponse[mapRegion.selectedItemIndex] })
                                }}
                                key={mapRegion?.selectedItemIndex}
                                tooltip={true}
                                style={{ backgroundColor: "#ffffff" }}>
                                <View style={styles.hotelView}>
                                    <View>
                                        <WebView style={styles.webview}
                                            source={{ uri: hotelResponse[mapRegion.selectedItemIndex]?.hotel_galary_photos?.trim() }}></WebView>
                                    </View>
                                    <View style={styles.textView}>
                                        <Text
                                            size={SCALE_SIZE(14)}
                                            align='left'
                                            family={FONT_NAME.medium}
                                            color={COLORS.black}>
                                            {hotelResponse[mapRegion.selectedItemIndex]?.hotel_trader_name}
                                        </Text>
                                        <Text
                                            size={SCALE_SIZE(9)}
                                            align='left'
                                            family={FONT_NAME.medium}
                                            color={COLORS.borderGray}>
                                            {hotelResponse[mapRegion.selectedItemIndex]?.hotel_city + ', ' + hotelResponse[mapRegion.selectedItemIndex]?.hotel_country}
                                        </Text>
                                    </View>
                                </View>
                            </Callout>
                        </Marker>
                    }
                </MapView>
            </View>
            <View style={styles.hotelContainer}>
                <FlatList data={hotelResponse}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{ marginTop: SCALE_SIZE(52) }}></View>
                        )
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={[styles.itemContainer, {
                                backgroundColor: mapRegion?.selectedItemIndex == index ? COLORS.blue_light : COLORS.white
                            }]}
                                onPress={() => {
                                    const lat = item.hotel_lat
                                    const lng = item.hotel_long

                                    calloutRef.current.hideCallout()

                                    setTimeout(() => {
                                        setMapRegion({
                                            latitude: lat,
                                            longitude: lng,
                                            latitudeDelta: 0.1,
                                            longitudeDelta: 0.1,
                                            selectedItemIndex: index
                                        })

                                        setTimeout(() => {
                                            calloutRef.current.showCallout()
                                        }, 300);
                                    }, 300);

                                }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {item?.hotel_galary_photos?.trim() ?
                                        <Image style={styles.imageView}
                                            resizeMode="cover"
                                            source={{ uri: item?.hotel_galary_photos?.trim() }} />
                                        :
                                        <View style={styles.imageView} />
                                    }
                                    <View style={styles.directionView}>
                                        <Text
                                            style={styles.itemText}
                                            numberOfLines={1}
                                            size={SCALE_SIZE(18)}
                                            color={COLORS.headerTitleGray}
                                            family={FONT_NAME.medium}>
                                            {item?.hotel_trader_name ?? ''}
                                        </Text>
                                        <Text
                                            style={styles.southAmerica}
                                            size={SCALE_SIZE(16)}
                                            color={COLORS.gray}
                                            family={FONT_NAME.medium}>
                                            {item?.hotel_country ?? ''}
                                        </Text>
                                        <AirbnbRating starContainerStyle={styles.starContainer}
                                            defaultRating={0}
                                            size={12}
                                            isDisabled={true}
                                            showRating={false}
                                        />
                                        <TouchableOpacity style={styles.discoverButton}>
                                            <Text
                                                align='center'
                                                size={SCALE_SIZE(12)}
                                                color={COLORS.white}
                                                family={FONT_NAME.semiBold}>
                                                {translations.discover}
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
        flex: 1.0,
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
        paddingBottom: SCALE_SIZE(15),
        borderRadius: SCALE_SIZE(20),
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    itemText: {
        marginTop: SCALE_SIZE(16),
        marginHorizontal: SCALE_SIZE(16),
        flex: 1.0
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
        alignSelf: 'flex-start',
        marginLeft: SCALE_SIZE(17),
        marginTop: SCALE_SIZE(9)
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
    webview: {
        height: SCALE_SIZE(50),
        width: SCALE_SIZE(50)
    }
})

export default MatchList;