import React, { useContext } from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE } from "../constant";

//COMPONENT
import { Text } from "../component"

//PACKAGES
import { AirbnbRating } from 'react-native-ratings'

//CONTEXT
import { TranslationContext } from "../context";

const RateTheAppPopUp = (props) => {

    const translations = useContext(TranslationContext)

    return (
        <Modal animationType="fade"
            transparent={true}
            visible={props.visible}>
            <TouchableOpacity style={styles.modalContainer}
                onPress={props.onPress}>
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <Text
                            size={20}
                            family={FONT_NAME.medium}
                            color={COLORS.headerTitleGray}>
                            {translations.ratetheapp}
                        </Text>
                        <View style={styles.blueView}>
                            <AirbnbRating
                                defaultRating={0}
                                size={43}
                                isDisabled={true}
                                showRating={false}
                            />
                        </View>
                        <TouchableOpacity style={styles.submitButton}>
                            <Text
                                size={16}
                                align='center'
                                family={FONT_NAME.semiBold}
                                color={COLORS.white}>
                                {translations.submit}
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
        marginHorizontal: SCALE_SIZE(35),
        borderRadius: SCALE_SIZE(10),
        paddingVertical: SCALE_SIZE(20),
        paddingHorizontal: SCALE_SIZE(24)
    },
    blueView: {
        backgroundColor: '#EEF2FF',
        borderRadius: SCALE_SIZE(6),
        paddingVertical: SCALE_SIZE(9),
        marginVertical: SCALE_SIZE(12)
    },
    submitButton: {
        backgroundColor: COLORS.blue,
        height: SCALE_SIZE(36),
        width: SCALE_SIZE(125),
        borderRadius: SCALE_SIZE(30),
        marginHorizontal: SCALE_SIZE(118),
        justifyContent: 'center',
        alignSelf: 'center',
    }
})

export default RateTheAppPopUp;