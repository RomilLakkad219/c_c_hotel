import React from "react";
import { View, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constant";

//COMPONENT
import { Text } from "../component"

//ASSET
import { IMAGES } from "../asset"

const BookingSelectionPopup = (props) => {

    return (
        <Modal transparent={true}
            animationType={'fade'}
            visible={props.visible}>
            <TouchableOpacity style={styles.modalContainer}
                onPress={props.onPress}>
                <View style={styles.container}>
                    <View style={styles.whiteContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.selectionContainer}>
                                <Text
                                    style={{
                                        flex: 1.0
                                    }}
                                    size={10}
                                    family={FONT_NAME.medium}
                                    color={COLORS.gray}>
                                    {STRING.selectContinent}
                                </Text>
                                <Image
                                    style={styles.downImage}
                                    resizeMode="contain"
                                    source={IMAGES.ic_down} />
                            </TouchableOpacity>
                            <View style={{ marginHorizontal: SCALE_SIZE(14) }}></View>
                            <TouchableOpacity style={styles.selectionContainer}>
                                <Text
                                    style={{ flex: 1.0 }}
                                    size={10}
                                    family={FONT_NAME.medium}
                                    color={COLORS.gray}>
                                    {STRING.selectCountry}
                                </Text>
                                <Image
                                    style={styles.downImage}
                                    resizeMode="contain"
                                    source={IMAGES.ic_down} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.selectionContainer}>
                                <Text style={{ flex: 1.0 }}
                                    size={10}
                                    family={FONT_NAME.medium}
                                    color={COLORS.gray}>
                                    {STRING.selectRegion}
                                </Text>
                                <Image
                                    style={styles.downImage}
                                    resizeMode="contain"
                                    source={IMAGES.ic_down} />
                            </TouchableOpacity>
                            <View style={{ marginHorizontal: SCALE_SIZE(14) }}></View>
                            <TouchableOpacity style={styles.selectionContainer}>
                                <Text
                                    style={{ flex: 1.0 }}
                                    size={10}
                                    family={FONT_NAME.medium}
                                    color={COLORS.gray}>
                                    {STRING.selectDate}
                                </Text>
                                <Image
                                    style={styles.downImage}
                                    resizeMode="contain"
                                    source={IMAGES.ic_calender} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.searchButton}>
                            <Text
                                size={16}
                                align='center'
                                family={FONT_NAME.semiBold}
                                color={COLORS.white}>
                                {STRING.search}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        justifyContent: 'center'
    },
    modalContainer: {
        flex: 1.0,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    whiteContainer: {
        alignSelf: 'center',
        backgroundColor: COLORS.white,
        borderRadius: SCALE_SIZE(10),
        marginHorizontal: SCALE_SIZE(35),
        paddingBottom: SCALE_SIZE(23),
        paddingHorizontal: SCALE_SIZE(14)
    },
    selectionContainer: {
        backgroundColor: '#EEEEEE',
        borderRadius: SCALE_SIZE(12),
        paddingVertical: SCALE_SIZE(12),
        flexDirection: 'row',
        marginTop: SCALE_SIZE(21),
        flex: 1.0,
        borderRadius: SCALE_SIZE(12),
        paddingLeft: SCALE_SIZE(16)
    },
    downImage: {
        height: SCALE_SIZE(15),
        width: SCALE_SIZE(15),
        marginRight: SCALE_SIZE(16)
    },
    searchButton: {
        backgroundColor: COLORS.blue,
        height: SCALE_SIZE(36),
        width: SCALE_SIZE(125),
        borderRadius: SCALE_SIZE(30),
        marginTop: SCALE_SIZE(23),
        marginHorizontal: SCALE_SIZE(118),
        justifyContent: 'center',
        alignSelf: 'center'
    }
})

export default BookingSelectionPopup;