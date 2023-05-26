import React, { useRef, useState, useContext, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { ExperienceCarousel, Header, ProgressView, Text } from "../component";

//CONSTANT
import { COLORS, SCALE_SIZE, FONT_NAME, SHOW_TOAST } from "../constant";

//PACKAGES
import Carousel from 'react-native-snap-carousel';

//CONTEXT
import { TranslationContext } from "../context";

//API
import { experienceFilter, filterHotel } from "../api";

const Experience = (props) => {

    const translations = useContext(TranslationContext)

    const isCarousel = useRef();

    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filterResponse, setFilterResponse] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [hotelExperienceResult, setHotelExperienceResult] = useState([])

    useEffect(() => {
        getExpereienceFilteration()
        getFilterHotels()
    }, [])

    function onBack() {
        props.navigation.goBack()
    }

    async function getExpereienceFilteration() {

        setIsLoading(true)
        const result = await experienceFilter()
        setIsLoading(false)

        if (result.status) {
            const filterData = result?.data?.result ?? []
            setFilterResponse(filterData)
        }
        else {
            SHOW_TOAST(result?.error)
        }
    }

    function getLocalizationName(item) {

        if (translations.getLanguage() == 'en') {
            return item.them_english_design
        }
        else if (translations.getLanguage() == 'french') {
            return item.them_french_design
        }
        else {
            return item.them_spanish_design
        }
    }

    async function getFilterHotels() {

        setIsLoading(true)
        const result = await filterHotel()
        setIsLoading(false)

        if (result.status) {
            const data = result?.data?.result ?? [] ?? hotel ?? []
            const dataImage = data.slice(0, 5)
            console.log('DATA', JSON.stringify(data))
            setHotelExperienceResult(dataImage)
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
                title={translations.experience}
                onFilter={() => { setVisible(true) }} />
            {/* <View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={filterResponse}
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
                            <TouchableOpacity style={isSelected ? styles.grayContainer : styles.placeContainer}
                                onPress={() => {
                                    setIsSelected(true)
                                }}>
                                <Text
                                    align='center'
                                    size={SCALE_SIZE(16)}
                                    color={isSelected ? COLORS.headerTitleGray : COLORS.white}
                                    family={FONT_NAME.medium}>
                                    {getLocalizationName(item)}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}>
                </FlatList>
            </View> */}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filterResponse}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <Text style={styles.beachSideHotelText}
                                    size={SCALE_SIZE(20)}
                                    color={COLORS.black}
                                    family={FONT_NAME.medium}>
                                    {item.them_english_design + '\n'}
                                    <Text style={styles.beachSideHotelText}
                                        size={SCALE_SIZE(14)}
                                        color={COLORS.black}
                                        family={FONT_NAME.regular}>
                                        {item.them_english_info}
                                    </Text>
                                </Text>
                                <Image style={styles.forwardImage}
                                    resizeMode='contain'
                                    source={IMAGES.ic_forward} />
                            </TouchableOpacity>

                            <Carousel
                                layout='default'
                                layoutCardOffset={9}
                                ref={isCarousel}
                                data={hotelExperienceResult}
                                renderItem={(item, index) =>
                                    <ExperienceCarousel navigation={props.navigation} item={item}></ExperienceCarousel>}
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={Dimensions.get('window').width - SCALE_SIZE(70)}
                                useScrollView={true}>
                            </Carousel>
                        </View>
                    )
                }}>
            </FlatList>
            <SafeAreaView />
            {isLoading && <ProgressView />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
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
    grayContainer: {
        height: SCALE_SIZE(49),
        backgroundColor: '#F3F3F3',
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