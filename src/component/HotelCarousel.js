import React from "react";
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constant";

//SCREENS
import { SCREENS } from "../screen";

//COMPONENT
import { Text } from '../component'

const HotelCarousel = (props) => {
    return (
        <ImageBackground style={styles.carouselContainer}
            resizeMode='contain'
            source={IMAGES.carousel_bg}>
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
                props.navigation.navigate(SCREENS.HotelDetail.name)
            }}
                style={{ marginBottom: SCALE_SIZE(27) }}>
                <Text style={styles.auraHouseText}
                    size={SCALE_SIZE(28)}
                    color={COLORS.white}
                    family={FONT_NAME.bold}>
                    {STRING.auraHouse}
                </Text>
                <View style={styles.rateContainer}>
                    <Text style={styles.franceText}
                        size={SCALE_SIZE(20)}
                        color={COLORS.white}
                        family={FONT_NAME.medium}>
                        {STRING.france}
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
    )
}

const styles = StyleSheet.create({
    carouselContainer: {
        marginTop: SCALE_SIZE(29),
        alignSelf: 'center',
        width: Dimensions.get('window').width - SCALE_SIZE(70),
        height: Dimensions.get('window').width - SCALE_SIZE(80),
        bottom: SCALE_SIZE(20)
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

})

export default HotelCarousel;