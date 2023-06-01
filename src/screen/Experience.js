import React, { useRef, useState, useContext, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Dimensions } from 'react-native'

//COMPONENT
import { ExperienceCarousel, Header, ProgressView, Text } from "../component";

//CONSTANT
import { COLORS, SCALE_SIZE, FONT_NAME, SHOW_TOAST } from "../constant";

//PACKAGES
import Carousel from 'react-native-snap-carousel';

//CONTEXT
import { TranslationContext } from "../context";

//API
import { filterHotel } from "../api";

const Experience = (props) => {

    const translations = useContext(TranslationContext)

    const isCarousel = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [hotelExperienceResult, setHotelExperienceResult] = useState([])

    useEffect(() => {
        getFilterHotels()
    }, [])

    async function getFilterHotels() {

        setIsLoading(true)
        const result = await filterHotel()
        setIsLoading(false)

        if (result.status) {
            const data = result?.data?.result ?? []
            setHotelExperienceResult(data)
        }
        else {
            SHOW_TOAST(result.error)
        }
    }


    function onBack() {
        props.navigation.goBack()
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

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header
                onBack={() => onBack()}
                title={translations.experience} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={hotelExperienceResult}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <Text style={styles.beachSideHotelText}
                                    size={SCALE_SIZE(20)}
                                    color={COLORS.black}
                                    family={FONT_NAME.medium}>
                                    {getLocalizationName(item) + '\n'}
                                    <Text style={styles.beachSideHotelText}
                                        size={SCALE_SIZE(14)}
                                        color={COLORS.black}
                                        family={FONT_NAME.regular}>
                                        {item.them_english_info}
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                            <Carousel
                                layout='default'
                                layoutCardOffset={9}
                                ref={isCarousel}
                                data={item.hotel}
                                renderItem={({ item, index }) => {
                                    return (
                                        <ExperienceCarousel navigation={props.navigation} item={item} />
                                    )
                                }}
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
    }
})

export default Experience;