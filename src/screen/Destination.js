import React from "react";
import { View, StyleSheet, SafeAreaView, FlatList, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'

//SCREENS
import { SCREENS } from ".";

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Header, Text } from "../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constant";

const Destination = (props) => {

    function onBack() {
        props.navigation.goBack()
    }

    const destinationData = [
        { image: IMAGES.asia_bg, title: 'AFRICA' },
        { image: IMAGES.asia_bg, title: 'ASIA' },
        { image: IMAGES.europe_bg, title: 'EUROPE' },
        { image: IMAGES.northamerica_bg, title: 'NORTH AMERICA' },
        { image: IMAGES.northamerica_bg, title: 'OCEANIA' },
        { image: IMAGES.southamerica_bg, title: 'SOUTH AMERICA' },

    ]

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => { onBack() }}
                title={STRING.destinations} />
            <View>
                <FlatList
                    style={{ marginHorizontal: SCALE_SIZE(35) }}
                    data={destinationData}
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
                                    resizeMode='contain'
                                    source={item.image}>
                                    <View style={styles.transparentView}>
                                        <Text
                                            size={SCALE_SIZE(16)}
                                            align='center'
                                            color={COLORS.white}
                                            family={FONT_NAME.semiBold}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    }}>
                </FlatList>
            </View>
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
        width: (Dimensions.get('window').width - SCALE_SIZE(80)) / 2,
        borderRadius: SCALE_SIZE(10),
        marginTop: SCALE_SIZE(20),
        justifyContent: 'flex-end',
        alignSelf:'center',
        overflow:'hidden'
    },
    transparentView: {
        backgroundColor: 'rgba(0,0,0,0.33)',
        paddingVertical: SCALE_SIZE(10)
    }
})

export default Destination;