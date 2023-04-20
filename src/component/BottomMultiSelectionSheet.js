import React from "react";
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'

//PACKAGES
import RBSheet from "react-native-raw-bottom-sheet";

//COMPONENT
import { Text } from ".";

//ASSET
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constant";

//PACKAGES
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IMAGES } from "../asset";

const BottomMultiSelectionSheet = (props) => {

    const data = props.data
    const bottomInsert = useSafeAreaInsets().bottom
    return (
        <RBSheet ref={props.onRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
                container: {
                    backgroundColor: '#FFF',
                    height: (data.length * SCALE_SIZE(50)) + SCALE_SIZE(50) + bottomInsert
                }
            }}>
            {data.map((e, index) => {
                return (
                    <TouchableOpacity
                        style={props.selectedItem.includes(e) ? styles.optionSelectedBox : styles.optionBox}
                        key={e + index}
                        onPress={() => {
                            props.onPressItem(e)
                        }}>
                        <View style={props.selectedItem.includes(e) ? styles.selectedBox : styles.squareBox}>
                            <Image
                                style={styles.right_bg}
                                resizeMode="contain"
                                source={IMAGES.right_bg} />
                        </View>
                        <Text
                            size={18}
                            family={FONT_NAME.medium}
                            color={COLORS.headerTitleGray}>
                            {e}
                        </Text>
                    </TouchableOpacity>
                )
            })}
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
        borderRadius: SCALE_SIZE(5),
        marginTop: SCALE_SIZE(5)
    },
    optionSelectedBox: {
        height: SCALE_SIZE(50),
        paddingHorizontal: SCALE_SIZE(20),
        marginHorizontal: SCALE_SIZE(20),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.blue_light,
        borderRadius: SCALE_SIZE(5),
        marginTop: SCALE_SIZE(5)
    },
    squareBox: {
        height: SCALE_SIZE(18),
        width: SCALE_SIZE(18),
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SCALE_SIZE(4),
        justifyContent: 'center',
        marginHorizontal: SCALE_SIZE(10)
    },
    selectedBox: {
        backgroundColor: COLORS.blue,
        height: SCALE_SIZE(18),
        width: SCALE_SIZE(18),
        borderWidth: 1,
        borderRadius: SCALE_SIZE(4),
        justifyContent: 'center',
        borderColor: COLORS.white,
        marginHorizontal: SCALE_SIZE(10)
    },
    right_bg: {
        height: SCALE_SIZE(10),
        width: SCALE_SIZE(10),
        alignSelf: 'center',
        tintColor: 'white'
    },
})

export default BottomMultiSelectionSheet