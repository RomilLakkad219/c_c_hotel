import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Dimensions, Image, SafeAreaView, FlatList, Modal } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Button, ProgressView, Text } from '../component'

//CONSTANT
import { COLORS, SCALE_SIZE, FONT_NAME, STRING, SHOW_TOAST } from "../constant";
import { BASE_IMAGE_URL } from "../constant/WebService";

//CONTEXT
import { AuthContext } from "../context";

//API
import { hotelDetail } from "../api";

//PACKAGES
import ImageViewer from 'react-native-image-zoom-viewer';

const HotelDetail = (props) => {

    const { user } = useContext(AuthContext);

    const { item } = props.route.params

    const [isLoading, setIsLoading] = useState(false);
    const [hotelDetailResult, sethotelDetailResult] = useState(null);
    const [imageViewerVisible, setImageViewerVisible] = useState(false)

    useEffect(() => {
        getHotelDetails()
    }, [])

    async function getHotelDetails() {
        const params = {
            hotel_id: item?.hotel_id,
            user_id: user?.[0]?.user_id
        }

        setIsLoading(true)
        const result = await hotelDetail(params)
        setIsLoading(false)
        console.log(JSON.stringify(result))

        if (result.status) {
            const res = result?.data?.result?.hotel?.[0]
            sethotelDetailResult(res)
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    const galleryThumbImage = () => {
        if (hotelDetailResult) {
            const imagesArray = hotelDetailResult?.hotel_galary_photos?.split(',')
            return imagesArray
        }

        return []
    }

    const galleryViewerImage = () => {
        if (hotelDetailResult) {
            const imagesArray = hotelDetailResult?.hotel_galary_photos?.split(',')
            const newArray = imagesArray.map((e) => {
                return {
                    url: e.trim()
                }
            })
            return newArray
        }

        return []
    }

    const galleryImage = galleryThumbImage()

    const images = galleryViewerImage()

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.headerContainer}
                resizeMode='cover'
                source={{ uri: BASE_IMAGE_URL + item?.hotel_galary_photos }}>
                <View style={styles.transparent}>
                    <SafeAreaView />
                    <View style={styles.imageContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.goBack()
                            }}>
                            <Image
                                style={styles.backArrow}
                                resizeMode="contain"
                                source={IMAGES.back_arrow} />
                        </TouchableOpacity>
                        <View style={{ flex: 1.0 }}></View>
                        <TouchableOpacity>
                            <Image
                                style={styles.heartImage}
                                resizeMode="contain"
                                source={item?.favourite??[0]?.fv_status=='1'?IMAGES.ic_heart:IMAGES.ic_heart_white}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Image
                            style={styles.shareImage}
                            resizeMode="contain"
                            source={IMAGES.ic_share} />
                    </TouchableOpacity>
                    <View style={{ flex: 1.0 }}></View>
                    <View style={styles.rateContainer}>
                        {/* <Image style={styles.starImage}
                            resizeMode='contain'
                            source={IMAGES.ic_star} />
                        <Text style={styles.numberText}
                            size={SCALE_SIZE(20)}
                            color={COLORS.white}
                            family={FONT_NAME.semiBold}>
                            {'4.9'}
                        </Text> */}
                        <View style={{flex:1.0}}></View>
                        <Text 
                            size={SCALE_SIZE(22)}
                            color={COLORS.white}
                            family={FONT_NAME.semiBold}>
                            {'$' + item?.hotel_avg_price  + ' /Person'}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={galleryImage}
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
                                <TouchableOpacity style={styles.itemContainer}
                                    onPress={() => {
                                        setImageViewerVisible(true)
                                    }}>
                                    <Image
                                        style={styles.itemImage}
                                        resizeMode="cover"
                                        source={{ uri: item.trim() }} />
                                </TouchableOpacity>
                            )
                        }}>
                    </FlatList>
                </View>
                <Text
                    style={styles.villaMiaText}
                    size={SCALE_SIZE(28)}
                    color={COLORS.black}
                    family={FONT_NAME.medium}>
                    {hotelDetailResult?.hotel_continent ?? ''}
                </Text>
                <View style={styles.directionView}>
                    <Text style={styles.coastText}
                        size={SCALE_SIZE(22)}
                        color={COLORS.gray}
                        family={FONT_NAME.medium}>
                        {(hotelDetailResult?.hotel_city ?? '') + ' , ' + (hotelDetailResult?.hotel_country ?? '')}
                    </Text>
                    <TouchableOpacity style={styles.websiteButton}>
                        <Text
                            size={SCALE_SIZE(17)}
                            color={COLORS.white}
                            align='center'
                            family={FONT_NAME.semiBold}>
                            {STRING.webSite}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.factEstablishText}
                    size={SCALE_SIZE(22)}
                    color={COLORS.lightBlack}
                    family={FONT_NAME.regular}>
                    {hotelDetailResult?.hotel_english_presentation ?? ''}
                </Text>
                <Button
                    onPress={() => {
                    }}
                    style={styles.bookNowButton}
                    title={STRING.bookNow} />
            </ScrollView>
            <Modal visible={imageViewerVisible}
                transparent={true}>
                <SafeAreaView style={styles.safeAreaViewStyle}>
                    <ImageViewer imageUrls={images}
                        enableSwipeDown={true}
                        onSwipeDown={() => {
                            setImageViewerVisible(false)
                        }}
                        onClick={() => {
                            setImageViewerVisible(false)
                        }}>
                    </ImageViewer>
                </SafeAreaView>
            </Modal>
            {isLoading && <ProgressView />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
    },
    headerContainer: {
        height: Dimensions.get('screen').width,
        width: Dimensions.get('screen').width,
        overflow: 'hidden',
        borderBottomLeftRadius: SCALE_SIZE(30),
        borderBottomRightRadius: SCALE_SIZE(30),
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    imageContainer: {
        flexDirection: 'row',
        marginHorizontal: SCALE_SIZE(35),
        alignItems: 'center',
        marginTop: SCALE_SIZE(5)
    },
    backArrow: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        tintColor: COLORS.white,
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
        marginRight: SCALE_SIZE(35)
    },
    rateContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginHorizontal: SCALE_SIZE(41),
        bottom: SCALE_SIZE(18)
    },
    starImage: {
        height: SCALE_SIZE(24),
        width: SCALE_SIZE(24),
        alignSelf: 'center'
    },
    numberText: {
        flex: 1.0,
        marginHorizontal: SCALE_SIZE(9)
    },
    itemContainer: {
        marginLeft: SCALE_SIZE(10),
        marginTop: SCALE_SIZE(35)
    },
    itemImage: {
        height: SCALE_SIZE(122),
        width: SCALE_SIZE(126),
        alignSelf: 'center',
        borderRadius: SCALE_SIZE(20),
        overflow: 'hidden'
    },
    villaMiaText: {
        marginTop: SCALE_SIZE(35),
        marginHorizontal: SCALE_SIZE(35)
    },
    directionView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    coastText: {
        flex: 1.0,
        marginHorizontal: SCALE_SIZE(35)
    },
    websiteButton: {
        backgroundColor: COLORS.black,
        height: SCALE_SIZE(44),
        width: SCALE_SIZE(105),
        borderRadius: SCALE_SIZE(24),
        justifyContent: 'center',
        alignSelf: 'center',
        marginRight: SCALE_SIZE(35)
    },
    factEstablishText: {
        marginTop: SCALE_SIZE(13),
        marginHorizontal: SCALE_SIZE(36)
    },
    bookNowButton: {
        marginHorizontal: SCALE_SIZE(77),
        marginTop: SCALE_SIZE(24),
        marginBottom: SCALE_SIZE(34)
    },
    safeAreaViewStyle: {
        flex: 1.0,
        backgroundColor: '#000'
    },
    transparent: {
        flex: 1.0,
        backgroundColor: 'rgba(0,0,0,0.3)'
    }
})

export default HotelDetail;