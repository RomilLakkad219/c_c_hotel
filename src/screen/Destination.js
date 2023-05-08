import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'

//SCREENS
import { SCREENS } from ".";

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Header, ProgressView, Text } from "../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST, STRING } from "../constant";

//API
import { destination } from "../api";

const Destination = (props) => {


    const [isLoading, setIsLoading] = useState(false);
    const [destinationResult, setDestinationResult] = useState([])

    useEffect(() => {
        getDestination()
    }, [])

    function onBack() {
        props.navigation.goBack()
    }

    async function getDestination() {
        setIsLoading(true)
        const result = await destination()
        setIsLoading(false)

        if (result.status) {
            const res = result?.data?.result ?? []
            setDestinationResult(res)
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => { onBack() }}
                title={STRING.destinations} />
            <View>
                <FlatList
                    style={{ marginHorizontal: SCALE_SIZE(35) }}
                    data={destinationResult}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate(SCREENS.DestinationPlace.name)
                            }}>
                                <ImageBackground style={[styles.listImageContainer, {
                                    marginLeft: index % 2 == 1 ? SCALE_SIZE(20) : 0
                                }]}
                                    resizeMode='cover'
                                    source={{ uri: item?.cont_img_url ?? '' }}>
                                    <View style={styles.transparentView}>
                                        <Text
                                            size={SCALE_SIZE(16)}
                                            align='center'
                                            color={COLORS.white}
                                            family={FONT_NAME.semiBold}>
                                            {item?.cont_english_design ?? ''}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    }}>
                </FlatList>
            </View>
            {isLoading && <ProgressView />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
    },
    listImageContainer: {
        height: Dimensions.get('window').height * 0.25,
        width: (Dimensions.get('window').width - SCALE_SIZE(100)) / 2,
        borderRadius: SCALE_SIZE(10),
        marginTop: SCALE_SIZE(20),
        justifyContent: 'flex-end',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    transparentView: {
        backgroundColor: 'rgba(0,0,0,0.33)',
        paddingVertical: SCALE_SIZE(10)
    }
})

export default Destination;