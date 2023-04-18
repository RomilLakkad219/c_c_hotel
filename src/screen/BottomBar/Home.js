import React, { useState, useRef } from "react";
import { View, StyleSheet, SafeAreaView, TextInput, Image, FlatList, TouchableOpacity, Dimensions, ImageBackground, ScrollView, Alert } from 'react-native'

//ASSET
import { IMAGES } from "../../asset";

//COMPONENT
import { Header, HotelCarousel, Text } from "../../component";

//CONSTANT
import { COLORS, STRING, SCALE_SIZE, FONT_NAME } from "../../constant";

//PACKAGES
import Carousel, { Pagination } from 'react-native-snap-carousel';

//SCREENS
import { SCREENS } from "..";

const Home = (props) => {

    const [search, setSearch] = useState('');
    const isCarousel = useRef();
    const [isSelected, setIsSelected] = useState(false);
    const [index, setIndex] = useState(0)

    const hotelData =
        [
            {
                image: IMAGES.ic_map,
                title: STRING.map,
                key: 'map'
            },
            {
                image: IMAGES.ic_expereience,
                title: STRING.experience,
                key: 'experience'
            },
            {
                image: IMAGES.ic_destination,
                title: STRING.destinations,
                key: 'destination'
            },
            {
                image: IMAGES.ic_match,
                title: STRING.match,
                key: 'match'
            }
        ]

    const brandData = [
        {
            brandImage: IMAGES.cosyplace_bg
        },
        {
            brandImage: IMAGES.cosylux_bg
        },
        {
            brandImage: IMAGES.generation_bg
        },
        {
            brandImage: IMAGES.harme_bg
        }
    ]

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header
                type={'home'}
                onDown={() => { }}
                onLanguage={() => { }}
                title={'ENG'} />
            <ScrollView showsVerticalScrollIndicator={false}>
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
                        data={hotelData}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={() => <View style={{ width: SCALE_SIZE(25) }} />}
                        ListFooterComponent={() => <View style={{ width: SCALE_SIZE(35) }} />}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={styles.listDirectionView} onPress={() => {
                                    if (item.key == 'map' || index==0) {
                                        setIsSelected(true)
                                        props.navigation.navigate(SCREENS.Map.name)
                                    }
                                    else if (item.key == 'experience' ) {
                                        props.navigation.navigate(SCREENS.Experience.name)
                                    }
                                    else if (item.key == 'destination') {
                                        props.navigation.navigate(SCREENS.Destination.name)
                                    }
                                    else if (item.key == 'match') {
                                        props.navigation.navigate(SCREENS.Match.name)
                                    }
                                }}>
                                    <View style={isSelected ? styles.selected : styles.listContainer}>
                                        <Image
                                            style={isSelected ? styles.whiteImage : styles.itemImage}
                                            resizeMode="contain"
                                            source={item.image} />
                                        <Text
                                            style={styles.title}
                                            size={SCALE_SIZE(16)}
                                            color={isSelected ? COLORS.white : COLORS.headerTitleGray}
                                            family={FONT_NAME.medium}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}>
                    </FlatList>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row' }}
                    onPress={() => {
                        props.navigation.navigate(SCREENS.PopularHotel.name)
                    }}>
                    <Text style={styles.popularHotelText}
                        size={SCALE_SIZE(20)}
                        color={COLORS.black}
                        family={FONT_NAME.medium}>
                        {STRING.popularHotel}
                    </Text>
                    <Image style={styles.forwardImage}
                        resizeMode='contain'
                        source={IMAGES.ic_forward} />
                </TouchableOpacity>
                <Carousel
                    layout='default'
                    layoutCardOffset={9}
                    ref={isCarousel}
                    data={['', '', '', '', '', '', '', '', '']}
                    renderItem={() => <HotelCarousel navigation={props.navigation} />}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width - SCALE_SIZE(70)}
                    useScrollView={true}
                    onSnapToItem={(index) => setIndex(index)}>
                </Carousel>
                <Pagination
                    dotsLength={3}
                    activeDotIndex={index}
                    carouselRef={isCarousel}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        // marginHorizontal: 2,
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
                <Text style={styles.followText}
                    size={SCALE_SIZE(20)}
                    color={COLORS.black}
                    family={FONT_NAME.medium}>
                    {STRING.followOurBrands}
                </Text>
                <View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={() => {
                            return (
                                <View style={{ width: SCALE_SIZE(24) }}></View>
                            )
                        }}
                        data={brandData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.brandContainer}>
                                        <Image
                                            style={styles.brandImage}
                                            resizeMode="contain"
                                            source={item.brandImage} />
                                    </View>
                                </View>
                            )
                        }}>
                    </FlatList>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: '#FFFFFF'
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
    listDirectionView: {
        marginLeft: SCALE_SIZE(10),
        marginTop: SCALE_SIZE(35),
    },
    listContainer: {
        height: SCALE_SIZE(49),
        width: SCALE_SIZE(174),
        backgroundColor: '#F3F3F3',
        borderRadius: SCALE_SIZE(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selected: {
        height: SCALE_SIZE(49),
        width: SCALE_SIZE(174),
        backgroundColor: COLORS.blue,
        borderRadius: SCALE_SIZE(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        tintColor: COLORS.headerTitleGray
    },
    whiteImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        tintColor: COLORS.white
    },
    title: {
        paddingLeft: SCALE_SIZE(16)
    },
    popularHotelText: {
        marginTop: SCALE_SIZE(29),
        marginHorizontal: SCALE_SIZE(35),
        flex: 1.0
    },
    forwardImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        marginTop: SCALE_SIZE(35),
        marginRight: SCALE_SIZE(35)
    },
    followText: {
        marginTop: SCALE_SIZE(20),
        marginHorizontal: SCALE_SIZE(35)
    },
    brandContainer: {
        height: SCALE_SIZE(78),
        width: SCALE_SIZE(82),
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SCALE_SIZE(18),
        marginTop: SCALE_SIZE(20),
        justifyContent: 'center',
        marginLeft: SCALE_SIZE(11),
        marginBottom: SCALE_SIZE(27),
    },
    cosyPlaceContainer: {
        height: SCALE_SIZE(78),
        width: SCALE_SIZE(82),
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SCALE_SIZE(18),
        marginTop: SCALE_SIZE(20),
        marginLeft: SCALE_SIZE(11),
        justifyContent: 'center'
    },
    generationContainer: {
        height: SCALE_SIZE(78),
        width: SCALE_SIZE(82),
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SCALE_SIZE(18),
        marginTop: SCALE_SIZE(20),
        marginLeft: SCALE_SIZE(11),
        justifyContent: 'center'
    },
    harmcarterContainer: {
        height: SCALE_SIZE(78),
        width: SCALE_SIZE(82),
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SCALE_SIZE(18),
        marginTop: SCALE_SIZE(20),
        marginLeft: SCALE_SIZE(11),
        justifyContent: 'center'
    },
    brandImage: {
        height: SCALE_SIZE(52),
        width: SCALE_SIZE(71),
        alignSelf: 'center'
    }
})

export default Home;