import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'

//PACKAGES
import { AirbnbRating } from 'react-native-ratings'
import LinearGradient from "react-native-linear-gradient";

//SCREENS
import { SCREENS } from "../screen";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST, STRING } from "../constant";
import { BASE_IMAGE_URL } from "../constant/WebService";

//COMPONENT
import { Text } from "../component"

//ASSET
import { IMAGES } from "../asset";

const FavouriteList = (props) => {

    const item = props.item
    const navigation = props.navigation

    return (
        <TouchableOpacity style={styles.itemContainer}
            onPress={() => {
                navigation.navigate(SCREENS.HotelDetail.name, {
                    item: item
                })
            }}>
            <Image style={styles.imageView}
                resizeMode="cover"
                source={{ uri: BASE_IMAGE_URL + item?.hotel_galary_photos ?? '' }} />
            <View style={{ flex: 1.0 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        style={styles.itemText}
                        size={SCALE_SIZE(18)}
                        numberOfLines={1}
                        color={COLORS.headerTitleGray}
                        family={FONT_NAME.medium}>
                        {item?.hotel_trader_name ?? ''}
                    </Text>
                    <TouchableOpacity style={styles.heartImage}>
                        <Image
                            style={styles.heartImage}
                            resizeMode="contain"
                            source={IMAGES.ic_heart_white} />
                    </TouchableOpacity>
                </View>
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
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.discoverButton}>
                        <Text
                            align='center'
                            size={SCALE_SIZE(12)}
                            color={COLORS.white}
                            family={FONT_NAME.semiBold}>
                            {STRING.discover}
                        </Text>
                    </TouchableOpacity>
                    <LinearGradient colors={['#6EB3FE', '#1377B1']} style={styles.bookButton}>
                        <TouchableOpacity onPress={() => { }}>
                            <Text
                                align='center'
                                size={SCALE_SIZE(12)}
                                color={COLORS.white}
                                family={FONT_NAME.semiBold}>
                                {STRING.book}
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        borderWidth: 1,
        borderColor: '#DEDEDE',
        backgroundColor: COLORS.white,
        borderRadius: SCALE_SIZE(10),
        marginTop: SCALE_SIZE(35),
        marginHorizontal: SCALE_SIZE(35),
        padding: SCALE_SIZE(16),
        flexDirection: 'row',
    },
    imageView: {
        height: SCALE_SIZE(117),
        width: SCALE_SIZE(124),
        alignSelf: 'center',
        borderRadius: SCALE_SIZE(20),
        overflow: 'hidden'
    },
    itemText: {
        flex: 1.0,
        marginHorizontal: SCALE_SIZE(16)
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
    bookButton: {
        height: SCALE_SIZE(31),
        width: SCALE_SIZE(77),
        borderRadius: SCALE_SIZE(24),
        justifyContent: 'center',
        marginTop: SCALE_SIZE(13),
        marginLeft: SCALE_SIZE(13)
    },
    heartImage: {
        height: SCALE_SIZE(29),
        width: SCALE_SIZE(29),
        alignSelf: 'center',
    },
    starContainer: {
        alignSelf: 'flex-start',
        marginLeft: SCALE_SIZE(17),
        marginTop: SCALE_SIZE(5)
    }
})

export default FavouriteList;