import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Image, FlatList, Dimensions, ScrollView, ImageBackground } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Header, Text, BottomMultiSelectionSheet, ProgressView } from "../component";

//CONSTANT
import { COLORS, STRING, SCALE_SIZE, FONT_NAME, SHOW_SUCCESS_TOAST, SHOW_TOAST } from "../constant";

//API
import { getDestinationPlace } from "../api";

const DestinationPlace = (props) => {

    const destinationRef = useRef()

    const { item } = props.route.params

    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [selectedFilterItems, setSelectedFilterItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const placeOption =
        [
            {
                title: 'Cape Verde'
            },
            {
                title: 'Gabon'
            },
            {
                title: 'Ivory Coast'
            },
            {
                title: 'Cape Verde'
            },
            {
                title: 'Gabon'
            },
            {
                title: 'Ivory Coast'
            }
        ]

    useEffect(() => {
        getDestinationPlaces()
    }, [])


    function onBack() {
        props.navigation.goBack()
    }

    async function getDestinationPlaces() {
        const params = {
            hotel_continent: item?.cont_english_design
        }

        setIsLoading(true)
        const result = await getDestinationPlace(params)
        setIsLoading(false)
        console.log(JSON.stringify(result))

        if (result.status) {

            SHOW_SUCCESS_TOAST('get places')
        }
        else {
            SHOW_TOAST(result.error)
        }
    }


    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header
                onBack={() => onBack()}
                title={STRING.destinations}
            />
            <View style={styles.searchInputContainer}>
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
            <View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={placeOption}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{ width: SCALE_SIZE(25) }}></View>
                        )
                    }}
                    ListFooterComponent={() => {
                        return (
                            <View style={{ width: SCALE_SIZE(35) }}></View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={[styles.placeContainer, {
                                backgroundColor: selectedIndex == index ? COLORS.blue : '#f3f3f3'
                            }]} onPress={() => {
                                setSelectedIndex(index)
                                destinationRef.current.open()
                            }}>
                                <Text
                                    align='center'
                                    size={SCALE_SIZE(16)}
                                    color={selectedIndex == index ? COLORS.white : COLORS.headerTitleGray}
                                    family={FONT_NAME.medium}>
                                    {item.title}
                                </Text>
                                <Image style={[styles.downImage, {
                                    tintColor: selectedIndex == index ? COLORS.white : COLORS.headerTitleGray
                                }]}
                                    resizeMode="contain"
                                    source={IMAGES.ic_down} />
                            </TouchableOpacity>
                        )
                    }}>
                </FlatList>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <FlatList data={['', '', '', '', '', '', '', '']}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                                        <Text style={styles.beachSideHotelText}
                                            size={SCALE_SIZE(20)}
                                            color={COLORS.black}
                                            family={FONT_NAME.medium}>
                                            {'Popular Hotel In Praia'}
                                        </Text>
                                        <Image style={styles.forwardImage}
                                            resizeMode='contain'
                                            source={IMAGES.ic_forward} />
                                    </TouchableOpacity>
                                    <ImageBackground style={styles.carouselContainer}
                                        resizeMode='cover'
                                    // source={{ uri: BASE_IMAGE_URL + item?.hotel_galary_photos ?? '' }}
                                    >
                                        <TouchableOpacity>
                                            <Image
                                                style={styles.heartImage}
                                                resizeMode="contain"
                                                source={IMAGES.ic_heart} />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Image
                                                style={styles.shareImage}
                                                resizeMode="contain"
                                                source={IMAGES.ic_share} />
                                        </TouchableOpacity>
                                        <View style={{ flex: 1.0 }} />
                                        <TouchableOpacity onPress={() => {
                                            props.navigation.navigate(SCREENS.HotelDetail.name, {
                                                item: item
                                            })
                                        }}
                                            style={{ marginBottom: SCALE_SIZE(27) }}>
                                            <Text style={styles.auraHouseText}
                                                size={SCALE_SIZE(28)}
                                                color={COLORS.white}
                                                family={FONT_NAME.bold}>
                                                {item?.hotel_trader_name ?? ''}
                                            </Text>
                                            <View style={styles.rateContainer}>
                                                <Text style={styles.franceText}
                                                    size={SCALE_SIZE(20)}
                                                    color={COLORS.white}
                                                    family={FONT_NAME.medium}>
                                                    {item?.hotel_country ?? ''}
                                                </Text>
                                                <Image style={styles.starImage}
                                                    resizeMode='contain'
                                                    source={IMAGES.ic_star} />
                                                <Text style={styles.numberText}
                                                    size={SCALE_SIZE(20)}
                                                    color={COLORS.white}
                                                    family={FONT_NAME.semiBold}>
                                                    {'4.9'}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                            )
                        }}>

                    </FlatList>
                </View>
                <SafeAreaView />
            </ScrollView>
            <BottomMultiSelectionSheet
                onRef={destinationRef}
                selectedItem={selectedFilterItems}
                data={['Praia', 'Mindelo', 'Sal Rei']}
                onClose={() => setSelectedIndex(-1)}
                onPressItem={(e) => {
                    const array = [...selectedFilterItems]
                    if (selectedFilterItems.includes(e)) {
                        const arrayIndex = array.indexOf(e)
                        array.splice(arrayIndex, 1)
                        setSelectedFilterItems(array)
                    }
                    else {
                        array.push(e)
                    }
                    setSelectedFilterItems(array)
                }} />
            {isLoading && <ProgressView />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
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
    placeContainer: {
        height: SCALE_SIZE(49),
        borderRadius: SCALE_SIZE(30),
        justifyContent: 'center',
        marginTop: SCALE_SIZE(33),
        marginLeft: SCALE_SIZE(10),
        paddingHorizontal: SCALE_SIZE(20),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    downImage: {
        height: SCALE_SIZE(15),
        width: SCALE_SIZE(9),
        alignSelf: 'center',
        marginLeft: SCALE_SIZE(10),
        tintColor: COLORS.white
    },
    beachSideHotelText: {
        marginTop: SCALE_SIZE(28),
        marginHorizontal: SCALE_SIZE(35),
        flex: 1.0
    },
    forwardImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        marginTop: SCALE_SIZE(32),
        marginRight: SCALE_SIZE(35)
    },
    carouselContainer: {
        borderRadius: SCALE_SIZE(35),
        backgroundColor: '#000000',
        marginTop: SCALE_SIZE(28),
        alignSelf: 'center',
        width: Dimensions.get('window').width - SCALE_SIZE(70),
        height: Dimensions.get('window').width - SCALE_SIZE(80),
    },
    heartImage: {
        height: SCALE_SIZE(58),
        width: SCALE_SIZE(58),
        alignSelf: 'flex-end',
        marginTop: SCALE_SIZE(22),
        marginRight: SCALE_SIZE(25)
    },
    shareImage: {
        height: SCALE_SIZE(58),
        width: SCALE_SIZE(58),
        alignSelf: 'flex-end',
        marginTop: SCALE_SIZE(22),
        marginRight: SCALE_SIZE(25)
    },
    auraHouseText: {
        marginLeft: SCALE_SIZE(25)
    },
    rateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    franceText: {
        marginLeft: SCALE_SIZE(25),
        flex: 1.0
    },
    starImage: {
        height: SCALE_SIZE(24),
        width: SCALE_SIZE(24),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(9),
    },
    numberText: {
        marginRight: SCALE_SIZE(25),
    },
    tooltipContainer: {
        height: SCALE_SIZE(112),
        backgroundColor: COLORS.white,
        width: SCALE_SIZE(150),
        borderColor: COLORS.gray,
        borderWidth: 2,
        borderRadius: SCALE_SIZE(10)
    },
})

export default DestinationPlace;