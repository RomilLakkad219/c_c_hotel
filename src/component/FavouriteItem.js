import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE } from "../constant";

//SCREENS
import { SCREENS } from "../screen";

//COMPONENT
import { ProgressView, Text } from "../component"

//CONTEXT
import { AuthContext } from "../context";

//API
import { likeUnlikeHotel } from "../api";

const FavouriteItem = (props) => {

    const { user, profile } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false)

    const item = props.item
    const index = props.index
    const navigation = props.navigation

    async function getLikeUnLikeHotel() {
        const params = {
            fv_user_id: user?.[0]?.user_id,
            user_session: user?.[0]?.user_session,
            fv_hotel_id: item?.hotel_id,
        }

        setIsLoading(true)
        const result = await likeUnlikeHotel(params)
        setIsLoading(false)

        props.onFavouriteStausChanged(item, index)
    }

    const galleryThumbImage = () => {
        if (item) {
            let imagesArray = item?.hotel_galary_photos?.split(',')
            imagesArray = imagesArray.filter((e) => e)
            return imagesArray.length > 0 ? (imagesArray?.[0])?.trim() : null
        }

        return null
    }

    const getNameAsPerLanguage = () => {
        if (profile.user_lang == 'English' || profile.user_lang == 'en') {
            return item?.cont_english_design
        }
        else if (profile.user_lang == 'French') {
            return item?.cont_french_design
        }
        else if (profile.user_lang == 'Spanish') {
            return item?.cont_spanish_design
        }
        else {
            return item?.cont_english_design
        }
    }

    const thumbImage = galleryThumbImage()

    const setCountry = getNameAsPerLanguage()
    
    return (
        <TouchableOpacity style={styles.itemContainer}
            onPress={() => {
                navigation.navigate(SCREENS.HotelDetail.name, {
                    item: item,
                    isSiteUrl: null,
                    isFrom: true
                })
            }}>
            <Image style={styles.imageView}
                resizeMode="cover"
                source={thumbImage ? { uri: thumbImage } : null} />
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
                        getLikeUnLikeHotel()
                    }}>
                        <Image
                            style={styles.heartImage}
                            resizeMode="contain"
                            source={IMAGES.ic_heart} />
                    </TouchableOpacity>
                </View>
                <Text
                    style={styles.southAmerica}
                    size={SCALE_SIZE(16)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {setCountry}
                </Text>
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
        flexDirection: 'row'
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
    heartImage: {
        height: SCALE_SIZE(32),
        width: SCALE_SIZE(32),
        alignSelf: 'center',
    }
})

export default FavouriteItem;