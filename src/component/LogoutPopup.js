import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native'

//CONSTANT
import { COLORS, SCALE_SIZE, FONT_NAME, STRING } from "../constant";

//COMPONENT
import { Text } from "../component";

//CONTEXT
import { TranslationContext } from "../context";

const LogoutPopup = (props) => {

    const translations = useContext(TranslationContext)

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
                            style={styles.doyouwanttologoutText}
                            size={17}
                            family={FONT_NAME.medium}
                            color={COLORS.headerTitleGray}>
                            {translations.doyouwanttologout}
                        </Text>
                        <View style={styles.yesNoContainer}>
                            <TouchableOpacity
                                style={styles.yesButton}
                                onPress={props.onPressYes}>
                                <Text
                                    style={styles.textDirection}
                                    size={18}
                                    family={FONT_NAME.medium}
                                    color={COLORS.headerTitleGray}>
                                    {translations.yes}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.noButton}
                                onPress={props.onPressNo}>
                                <Text
                                    style={styles.textDirection}
                                    size={18}
                                    family={FONT_NAME.medium}
                                    color={COLORS.blue}>
                                    {translations.no}
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
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    logoutContainer: {
        width:'80%',
        backgroundColor: COLORS.white,
        borderRadius: SCALE_SIZE(10),
        alignSelf: 'center',
    },
    yesNoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginEnd: 8
    },
    yesButton: {
        marginTop: SCALE_SIZE(9),
        marginHorizontal: SCALE_SIZE(16)
    },
    noButton: {
        marginTop: SCALE_SIZE(9),
        marginRight: SCALE_SIZE(9)
    },
    doyouwanttologoutText: {
        marginHorizontal: SCALE_SIZE(18),
        marginTop: SCALE_SIZE(18),
    },
    textDirection: {
        marginBottom: SCALE_SIZE(18)
    }
})

export default LogoutPopup;