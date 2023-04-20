import React, { useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Image, FlatList, Dimensions, ScrollView } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Header, Text, ToolItem, HotelCarousel, BottomSheet, BottomMultiSelectionSheet } from "../component";

//CONSTANT
import { COLORS, STRING, SCALE_SIZE, FONT_NAME } from "../constant";

//PACKAGES
import Carousel, { Pagination } from 'react-native-snap-carousel';
import RBSheet from "react-native-raw-bottom-sheet";

const DestinationPlace = (props) => {

    const isCarousel = useRef();
    const destinationRef = useRef()

    const [search, setSearch] = useState('');
    const [selectedFilterItems, setSelectedFilterItems] = useState([]);

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


    function onBack() {
        props.navigation.goBack()
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
                            <TouchableOpacity style={styles.placeContainer} onPress={() => {
                                destinationRef.current.open()
                            }}>
                                <Text
                                    align='center'
                                    size={SCALE_SIZE(16)}
                                    color={COLORS.white}
                                    family={FONT_NAME.medium}>
                                    {item.title}
                                </Text>
                                <Image style={styles.downImage}
                                    resizeMode="contain"
                                    source={IMAGES.ic_down} />
                            </TouchableOpacity>
                        )
                    }}>
                </FlatList>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={[{ title: 'Popular Hotel In Praia' }, { title: 'Popular Hotel In Praia' }, { title: 'Popular Hotel In Praia' }, { title: 'Popular Hotel In Praia' }, { title: 'Popular Hotel In Praia' }, { title: 'Popular Hotel In Praia' }]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                                        <Text style={styles.beachSideHotelText}
                                            size={SCALE_SIZE(20)}
                                            color={COLORS.black}
                                            family={FONT_NAME.medium}>
                                            {item.title}
                                        </Text>
                                        <Image style={styles.forwardImage}
                                            resizeMode='contain'
                                            source={IMAGES.ic_forward} />
                                    </TouchableOpacity>
                                    <Carousel
                                        layout='default'
                                        layoutCardOffset={9}
                                        ref={isCarousel}
                                        data={['', '', '', '', '', '']}
                                        renderItem={() => <HotelCarousel navigation={props.navigation} />}
                                        sliderWidth={Dimensions.get('window').width}
                                        itemWidth={Dimensions.get('window').width - SCALE_SIZE(70)}
                                        useScrollView={true}>
                                    </Carousel>
                                    <Pagination
                                        dotsLength={3}
                                        activeDotIndex={index}
                                        carouselRef={isCarousel}
                                        dotStyle={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: COLORS.blue,
                                        }}
                                        tappableDots={true}
                                        inactiveDotStyle={{
                                            backgroundColor: 'black',
                                            // Define styles for inactive dots here
                                        }}
                                        inactiveDotOpacity={0.4}
                                        inactiveDotScale={0.6}
                                    />
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
        backgroundColor: COLORS.blue,
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
        marginHorizontal: SCALE_SIZE(10),
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