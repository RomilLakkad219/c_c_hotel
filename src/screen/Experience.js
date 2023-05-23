import React, { useRef, useState,useContext } from "react";
import { View, StyleSheet, SafeAreaView, TextInput, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Header, HotelCarousel, Text } from "../component";

//CONSTANT
import { COLORS, SCALE_SIZE, STRING, FONT_NAME } from "../constant";

//PACKAGES
import Carousel from 'react-native-snap-carousel';

//CONTEXT
import { TranslationContext } from "../context";

const Experience = (props) => {

    const translations =useContext(TranslationContext)

    function onBack() {
        props.navigation.goBack()
    }

    const [search, setSearch] = useState('');
    const isCarousel = useRef();
    const [visible, setVisible] = useState(false);

    const placeOption =
        [
            {
                title: translations.beach
            },
            {
                title: translations.village
            },
            {
                title: translations.cityshopping
            },
            {
                title: translations.mountainsky
            },
            {
                title: translations.nature
            },
            {
                title: translations.waterfront
            }
        ]

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header
                onBack={() => onBack()}
                title={translations.experience}
                onFilter={() => { setVisible(true) }} />
            <View style={styles.searchInputContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={search}
                    placeholder={translations.searchhere}
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
                            <TouchableOpacity style={styles.placeContainer}>
                                <Text
                                    align='center'
                                    size={SCALE_SIZE(16)}
                                    color={COLORS.white}
                                    family={FONT_NAME.medium}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}>
                </FlatList>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[{ title: translations.beachsidehotel }, { title: translations.villagesidehotel }, { title: translations.beachsidehotel }, { title: translations.villagesidehotel }, { title: translations.beachsidehotel }, { title: translations.villagesidehotel }]}
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
                                data={['', '', '', '', '', '', '', '', '']}
                                renderItem={(item,index) => <HotelCarousel navigation={props.navigation} item={item} />}
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={Dimensions.get('window').width - SCALE_SIZE(70)}
                                useScrollView={true}>
                            </Carousel>
                        </View>
                    )
                }}>
            </FlatList>
            <SafeAreaView />
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
        marginTop: 8,
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
        marginBottom: SCALE_SIZE(13)
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
    }
})

export default Experience;