import React from "react";
import { View, StyleSheet, Modal,TouchableOpacity } from 'react-native'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constant";

//COMPONENT
import { Text } from "../component"

//PACKAGES
import { Rating } from 'react-native-ratings'

const RateTheAppPopUp = (props) => {
    return (
        <Modal animationType="fade"
            transparent={true}
            visible={props.visible}>
            <TouchableOpacity style={styles.modalContainer}
                onPress={props.onPress}>
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <Text
                            style={styles.text}
                            size={20}
                            family={FONT_NAME.medium}
                            color={COLORS.headerTitleGray}>
                            {STRING.rateTheApp}
                        </Text>
                        <View style={styles.blueView}>
                            <Rating
                                style={styles.starContainer}
                                type='star'
                                // ratingImage={IMAGES.ic_star}
                                // ratingColor='yellow'
                                ratingBackgroudColor='gray'
                                ratingCount={5}
                                imageSize={43}>
                            </Rating>
                        </View>
                        <TouchableOpacity style={styles.submitButton}>
                            <Text
                                size={16}
                                align='center'
                                family={FONT_NAME.semiBold}
                                color={COLORS.white}>
                                {STRING.submit}
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
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    mainContainer: {
        backgroundColor: COLORS.white,
        height: SCALE_SIZE(193),
        width: SCALE_SIZE(360),
        alignSelf: 'center',
        marginHorizontal: SCALE_SIZE(35),
        borderRadius: SCALE_SIZE(10)
    },
    text: {
        marginTop: SCALE_SIZE(20),
        marginHorizontal: SCALE_SIZE(24)
    },
    blueView: {
        backgroundColor: '#EEF2FF',
        borderRadius: SCALE_SIZE(6),
        alignItems: 'center',
        marginHorizontal: SCALE_SIZE(25),
        marginTop: SCALE_SIZE(12),
        height: SCALE_SIZE(59),
        width: SCALE_SIZE(312),
        marginHorizontal: SCALE_SIZE(24)
    },
    starContainer: {
        alignItems: 'flex-start',
        marginHorizontal: SCALE_SIZE(35),
        marginTop: SCALE_SIZE(5)
    },
    submitButton: {
        backgroundColor: COLORS.blue,
        height: SCALE_SIZE(36),
        width: SCALE_SIZE(125),
        borderRadius: SCALE_SIZE(30),
        marginTop: SCALE_SIZE(12),
        marginHorizontal: SCALE_SIZE(118),
        justifyContent: 'center',
        alignSelf: 'center',
    }

})

export default RateTheAppPopUp;