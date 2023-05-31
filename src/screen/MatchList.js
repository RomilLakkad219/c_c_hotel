import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList, Linking } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Header, ProgressView, Text } from "../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST } from "../constant";

//PACKAGES
import { AirbnbRating } from 'react-native-ratings'
import MapView, { Marker } from "react-native-maps";

//SCREENS
import { SCREENS } from ".";

//API
import { matchMakingHotels } from "../api";

//CONTEXT
import { AuthContext, TranslationContext } from "../context";

const MatchList = (props) => {

    const { user } = useContext(AuthContext);

    const translations = useContext(TranslationContext)

    const mapRef = useRef(null)
    const calloutRef = useRef(null)

    const [isLoading, setIsLoading] = useState(false);
    const [hotelResponse, setHotelResponse] = useState(null)
    const [markerCordinates, setMarkerCordinates] = useState(null)
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1)

    const { continent, countries, region, services } = props.route.params

    useEffect(() => {
        getMatchMakingList()
    }, [])

    useEffect(() => {
        if (selectedItemIndex != -1 && hotelResponse) {
            const lat = hotelResponse[selectedItemIndex].hotel_lat ? Number(hotelResponse[selectedItemIndex].hotel_lat) : 0
            const lng = hotelResponse[selectedItemIndex].hotel_long ? Number(hotelResponse[selectedItemIndex].hotel_long) : 0

            setMarkerCordinates({
                latitude: lat,
                longitude: lng,
            })

            mapRef?.current?.animateToRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }, 1000)

            setTimeout(() => {
                calloutRef?.current?.showCallout()
            }, 1200);
        }
    }, [selectedItemIndex, hotelResponse])

    async function getMatchMakingList() {
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
        const result = await matchMakingHotels(params)
        setIsLoading(false)

        if (result.status) {
            const hotelList = result?.data?.result ?? []
            setHotelResponse(hotelList)
            setSelectedItemIndex(0)
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
                <MapView ref={mapRef} style={styles.map}>
                    {markerCordinates &&
                        <Marker
                            key={selectedItemIndex.toString()}
                            coordinate={markerCordinates}
                            image={IMAGES.map_bg}
                            title={hotelResponse?.[selectedItemIndex]?.hotel_trader_name ?? ''}
                            description={hotelResponse?.[selectedItemIndex]?.hotel_city + ', ' + hotelResponse?.[selectedItemIndex]?.hotel_country}
                            onCalloutPress={() => {
                                props.navigation.navigate(SCREENS.HotelDetail.name, {
                                    item: hotelResponse?.[selectedItemIndex]
                                })
                            }}
                            ref={calloutRef}>
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
                    ListFooterComponent={() => {
                        return (
                            <View style={{ marginBottom: SCALE_SIZE(20) }}></View>
                        )
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={[styles.itemContainer, {
                                backgroundColor: selectedItemIndex == index ? COLORS.blue_light : COLORS.white
                            }]}
                                onPress={() => {
                                    setSelectedItemIndex(index)
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
                                        <TouchableOpacity style={styles.discoverButton} onPress={() => {
                                            Linking.openURL(item?.hotel_internet_bookingengine)
                                        }}>
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