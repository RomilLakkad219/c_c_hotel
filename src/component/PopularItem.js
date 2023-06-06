import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'

//PACKAGES
import LinearGradient from "react-native-linear-gradient";

//SCREENS
import { SCREENS } from "../screen";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE } from "../constant";
import { BASE_IMAGE_URL } from "../constant/WebService";

//COMPONENT
import { ProgressView, Text } from "."

//ASSET
import { IMAGES } from "../asset";

//API
import { likeUnlikeHotel } from "../api";

//CONTEXT
import { AuthContext, TranslationContext } from "../context";

const PopularItem = (props) => {

    const { user } = useContext(AuthContext)

    const translations = useContext(TranslationContext)

    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(item?.fv_status)

    const item = props.item
    const navigation = props.navigation
    const isShowSearchImage = props.isShowSearchImage

    async function getLikeUnLikeHotel() {
        const params = {
            fv_user_id: user?.[0]?.user_id,
            user_session: user?.[0]?.user_session,
            fv_hotel_id: item?.hotel_id,
            user_session_id: ''
        }

        setIsLoading(true)
        const result = await likeUnlikeHotel(params)
        setIsLoading(false)
    }

    return (
        <TouchableOpacity style={styles.itemContainer}
            onPress={() => {
                navigation.navigate(SCREENS.HotelDetail.name, {
                    item: item
                })
            }}>
            <Image
                style={styles.imageView}
                resizeMode="cover"
                source={{ uri: isShowSearchImage ? (item?.hotel_galary_photos.trim()??'') :  (BASE_IMAGE_URL +item?.hotel_galary_photos.trim()?? '') }} />
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
                    <TouchableOpacity style={styles.heartImage} onPress={() => {
                        item.fv_status = item.fv_status == '1' ? '0' : '1'
                        setIsLiked(isLiked == '1' ? '0' : '1')
                        getLikeUnLikeHotel()
                    }}>
                        <Image
                            style={styles.heartImage}
                            resizeMode="contain"
                            source={isLiked == '1' ? IMAGES.ic_heart : IMAGES.ic_heart_white} />
                    </TouchableOpacity>
                </View>
                <Text
                    style={styles.southAmerica}
                    size={SCALE_SIZE(16)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {item?.hotel_country ?? ''}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.discoverButton}
                        onPress={() => {
                            Linking.openURL(item.hotel_internet_bookingengine)
                        }}>
                        <Text
                            align='center'
                            size={SCALE_SIZE(12)}
                            color={COLORS.white}
                            family={FONT_NAME.semiBold}>
                            {translations.discover}
                        </Text>
                    </TouchableOpacity>
                    <LinearGradient colors={['#6EB3FE', '#1377B1']} style={styles.bookButton}>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(item.hotel_internet_bookingengine)
                        }}>
                            <Text
                                align='center'
                                size={SCALE_SIZE(12)}
                                color={COLORS.white}
                                family={FONT_NAME.semiBold}>
                                {translations.book}
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
            {isLoading && <ProgressView />}
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
        overflow: 'hidden',
        backgroundColor: 'gray'
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
        height: SCALE_SIZE(32),
        width: SCALE_SIZE(32),
        alignSelf: 'center',
    }
})

export default PopularItem;