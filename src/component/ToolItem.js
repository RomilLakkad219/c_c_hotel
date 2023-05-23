import React, { useContext } from "react";
import { View, TouchableOpacity, FlatList, Image, ImageBackground, StyleSheet } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Text } from '../component'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE } from "../constant";

//CONTEXT
import { TranslationContext } from "../context";

export default function ToolItem(props) {

    const items = props.items
    const selectedItems = props.selectedItems
    const onItemChange = props.onItemChange

    const translations = useContext(TranslationContext)

    console.log('testing_items====>', items)

    function getLocalization(item) {
        if (translations.getLanguage() == 'en') {
            return item.name
        }
        else if (translations.getLanguage() == 'french') {
            return item.french_name
        }
        else {
            return item.name
        }
    }

    return (
        <FlatList
            data={items}
            onItemChange={onItemChange}
            showsVerticalScrollIndicator={false}
            extraData={selectedItems}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity onPress={() => props.onPress(item, index)} style={props.style}>
                        <View style={styles.container}>
                            <View style={selectedItems.includes(item) ? styles.blueView : styles.normalView}>
                                <ImageBackground style={selectedItems.includes(item) ? styles.selectedBox : styles.squareBox}
                                    resizeMode='contain'>
                                    <Image
                                        style={styles.right_bg}
                                        resizeMode="contain"
                                        source={IMAGES.right_bg} />
                                </ImageBackground>
                                <Text style={styles.tooltipText}
                                    size={SCALE_SIZE(12)}
                                    family={FONT_NAME.medium}
                                    color={COLORS.headerTitleGray}>
                                    {getLocalization(item)}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }} />
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: SCALE_SIZE(10)
    },
    blueView: {
        backgroundColor: '#EEF2FF',
        borderRadius: SCALE_SIZE(6),
        height: SCALE_SIZE(32),
        width: SCALE_SIZE(152),
        flexDirection: 'row',
        marginHorizontal: SCALE_SIZE(10),
        alignItems: 'center'
    },
    normalView: {
        borderRadius: SCALE_SIZE(6),
        height: SCALE_SIZE(32),
        width: SCALE_SIZE(152),
        flexDirection: 'row',
        marginHorizontal: SCALE_SIZE(10),
        backgroundColor: '#FFFFFF',
        borderRadius: SCALE_SIZE(6),
        alignItems: 'center'
    },
    squareBox: {
        height: SCALE_SIZE(18),
        width: SCALE_SIZE(18),
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SCALE_SIZE(4),
        justifyContent: 'center',
        marginLeft: SCALE_SIZE(10)
    },
    selectedBox: {
        backgroundColor: COLORS.blue,
        height: SCALE_SIZE(18),
        width: SCALE_SIZE(18),
        borderWidth: 1,
        borderRadius: SCALE_SIZE(4),
        justifyContent: 'center',
        borderColor: COLORS.white,
        marginLeft: SCALE_SIZE(10)
    },
    right_bg: {
        height: SCALE_SIZE(10),
        width: SCALE_SIZE(10),
        alignSelf: 'center',
        tintColor: 'white'
    },
    tooltipText: {
        marginHorizontal: SCALE_SIZE(14)
    }
})
