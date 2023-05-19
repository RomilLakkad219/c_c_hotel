import React from "react";
import { View, StyleSheet, ActivityIndicator, Modal } from 'react-native'

//CONSTANT
import { COLORS, SCALE_SIZE } from "../constant";

const ProgressView = () => {
    return (
        <Modal transparent={true}
            visible={true}>
            <View style={styles.mainView}>
                <View style={styles.indicatorView}>
                    <ActivityIndicator color={COLORS.blue}>
                    </ActivityIndicator>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1.0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicatorView: {
        height: SCALE_SIZE(70),
        width: SCALE_SIZE(70),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.white,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOffset:
        {
            height: 5,
            width: 0
        },
        shadowOpacity: 0.2
    }
})

export default ProgressView;