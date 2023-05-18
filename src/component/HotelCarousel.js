import React from "react";
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE } from "../constant";
import { BASE_IMAGE_URL } from "../constant/WebService";

//SCREENS
import { SCREENS } from "../screen";

//COMPONENT
import { Text } from '../component'

const HotelCarousel = (props) => {

    const item = props.item
    
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
                props.navigation.navigate(SCREENS.HotelDetail.name, {
                    item: item
                })
            }}>
            <ImageBackground style={styles.carouselContainer}
                resizeMode='cover'
                source={{ uri: BASE_IMAGE_URL + item?.hotel_galary_photos ?? '' }}
            >
                <TouchableOpacity style={styles.heartImageContainer}>
                    <Image
                        style={styles.heartImage}
                        resizeMode="contain"
                        source={item?.fv_status == '1' ? IMAGES.ic_heart : IMAGES.ic_heart_white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.heartImageContainer}>
                    <Image
                        style={styles.heartImage}
                        resizeMode="contain"
                        source={IMAGES.ic_share} />
                </TouchableOpacity>
                <View style={{ flex: 1.0 }} />
                <View
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
                        {/* <Image style={styles.starImage}
                        resizeMode='contain'
                        source={IMAGES.ic_star} />
                    <Text style={styles.numberText}
                        size={SCALE_SIZE(20)}
                        color={COLORS.white}
                        family={FONT_NAME.semiBold}>
                        {'4.9'}
                    </Text> */}
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    carouselContainer: {
        borderRadius: SCALE_SIZE(35),
        backgroundColor: '#000000',
        marginTop: SCALE_SIZE(28),   
        alignSelf: 'center',
        width: Dimensions.get('window').width - SCALE_SIZE(70),
        height: Dimensions.get('window').width - SCALE_SIZE(80),
        overflow: 'hidden',
        borderRadius: SCALE_SIZE(20)
    },
    heartImageContainer: {
        height: SCALE_SIZE(58),
        width: SCALE_SIZE(58),
        alignSelf: 'flex-end',
        marginTop: SCALE_SIZE(22),
        marginRight: SCALE_SIZE(25)
    },
    heartImage: {
        height: SCALE_SIZE(58),
        width: SCALE_SIZE(58),
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

export default HotelCarousel;