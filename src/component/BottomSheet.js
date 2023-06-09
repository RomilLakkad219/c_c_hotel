import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'

//PACKAGES
import RBSheet from "react-native-raw-bottom-sheet";

//COMPONENT
import { Text } from "../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE } from "../constant";

//PACKAGES
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomSheet = (props) => {

    const data = props.data
    const bottomInsert = useSafeAreaInsets().bottom

    const dataHeight = (data.length * SCALE_SIZE(50)) + SCALE_SIZE(50) + bottomInsert
    const screenHeight = Dimensions.get('screen').height - 100

    return (
        <RBSheet ref={props.onRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            onClose={props.onClose}
            customStyles={{
                container: {
                    backgroundColor: '#FFF',
                    height: Math.min(dataHeight, screenHeight)
                }
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map((e, index) => {
                    return (
                        <TouchableOpacity
                            style={props.selectedItem == e?.name ? styles.optionSelectedBox : styles.optionBox}
                            key={e + index}
                            onPress={() => {
                                props.onPressItem(e, index)
                            }}>
                            <Text
                                size={18}
                                family={FONT_NAME.medium}
                                color={COLORS.headerTitleGray}>
                                {e.name}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </RBSheet>
    )
}

const styles = StyleSheet.create({
    optionBox: {
        height: SCALE_SIZE(50),
        paddingHorizontal: SCALE_SIZE(20),
        marginHorizontal: SCALE_SIZE(20),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: SCALE_SIZE(5)
    },
    optionSelectedBox: {
        height: SCALE_SIZE(50),
        paddingHorizontal: SCALE_SIZE(20),
        marginHorizontal: SCALE_SIZE(20),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.blue_light,
        borderRadius: SCALE_SIZE(5)
    }
})

export default BottomSheet