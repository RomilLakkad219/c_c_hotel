import React from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native'

//CONSTANT
import { COLORS, SCALE_SIZE, FONT_NAME, STRING } from "../constant";

//COMPONENT
import { Text } from "../component";

const LogoutPopup = (props) => {

    return (
        <Modal
            transparent={true}
            animationType='fade'
            visible={props.visible}>
            <View style={styles.modalContainer}
                onPress={props.onPress}>
                <View style={styles.container}>
                    <View style={styles.logoutContainer}>
                        <Text
                            size={17}
                            family={FONT_NAME.medium}
                            color={COLORS.headerTitleGray}>
                            {STRING.doYouWantToLogout}
                        </Text>
                        <View style={styles.yesNoContainer}>
                            <TouchableOpacity
                                style={styles.yesButton}
                                onPress={props.onPressYes}>
                                <Text
                                    size={18}
                                    family={FONT_NAME.medium}
                                    color={COLORS.headerTitleGray}>
                                    {STRING.yes}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.noButton}
                                onPress={props.onPressNo}>
                                <Text
                                    size={18}
                                    family={FONT_NAME.medium}
                                    color={COLORS.blue}>
                                    {STRING.no}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1.0,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    logoutContainer: {
        backgroundColor: COLORS.white,
        paddingHorizontal: SCALE_SIZE(18),
        paddingVertical: SCALE_SIZE(18),
        borderRadius: SCALE_SIZE(10),
        alignSelf: 'center',
        marginHorizontal: SCALE_SIZE(65)
    },
    yesNoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    yesButton: {
        marginTop: SCALE_SIZE(9),
        marginHorizontal: SCALE_SIZE(16)
    },
    noButton: {
        marginTop: SCALE_SIZE(9),
        marginRight: SCALE_SIZE(9)
    }
})

export default LogoutPopup;