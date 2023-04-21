import React, { useState } from "react";
import { View, StyleSheet, Platform, TouchableOpacity, Image } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { BookingSelectionPopup, Text, ToolItem } from '../component'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constant";

//PACKAGES
import Tooltip from "react-native-walkthrough-tooltip";

const Header = (props) => {

    const [ishighLighted, setIsHighlighted] = useState(false);
    const [visible, setVisible] = useState(false)

    if (props.type == 'home') {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'center', marginLeft: 15 }}>
                    <Text
                        size={SCALE_SIZE(22)}
                        family={FONT_NAME.medium}
                        color={COLORS.headerTitleGray}>
                        {props.title}
                    </Text>
                    <Image
                        style={[styles.downImage, { marginHorizontal: SCALE_SIZE(16) }]}
                        resizeMode="contain"
                        source={IMAGES.ic_down} />
                </TouchableOpacity>
                <View style={{ flex: 1.0 }} />
                <TouchableOpacity onPress={() => {
                    setIsHighlighted(!ishighLighted)
                }}>
                    <View style={ishighLighted ? styles.profileHighlight : styles.profileView}>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    else {
        return (
            <View style={[styles.headerContainer, props.style]}>
                <View style={styles.itemContainer}>
                    {props.onBack &&
                        <TouchableOpacity style={styles.backContainer}
                            onPress={props.onBack}>
                            <Image style={styles.backImage}
                                resizeMode="contain"
                                source={IMAGES.back_arrow} />
                        </TouchableOpacity>
                    }
                </View>
                <Text
                    style={{ flex: 1.0 }}
                    align='center'
                    size={SCALE_SIZE(23)}
                    family={FONT_NAME.medium}
                    color={COLORS.headerTitleGray}>
                    {props.title}
                </Text>
                <View style={styles.itemContainer}>
                    {props.onFilter &&
                        <FilterToolTip />
                    }
                    {props.onEditProfile &&
                        <TouchableOpacity
                            style={styles.backContainer}
                            onPress={props.onEditProfile}>
                            <Image
                                style={styles.editProfile}
                                resizeMode="contain"
                                source={IMAGES.edit_bg} />
                        </TouchableOpacity>
                    }
                    {props.onDashboard &&
                        <TouchableOpacity style={styles.backContainer}
                            onPress={() => { setVisible(true) }}>
                            <Image
                                style={styles.dashboardImage}
                                resizeMode="contain"
                                source={IMAGES.dashboard_bg} />
                        </TouchableOpacity>
                    }
                </View>
                <BookingSelectionPopup visible={visible}
                    onPress={() => {
                        setVisible(false)
                    }}>
                </BookingSelectionPopup>
            </View>
        )
    }
}

const FilterToolTip = (props) => {

    const [visible, setVisible] = useState(false)
    const [selectedFilterItems, setSelectedFilterItems] = useState([])

    return (
        <Tooltip
            isVisible={visible}
            contentStyle={styles.tooltipContainer}
            backgroundColor="transparent"
            placement='bottom'
            onClose={() => {
                setVisible(false)
            }}
            arrowStyle={{
                height: SCALE_SIZE(0), width: SCALE_SIZE(0)
            }}
            arrowSize={{
                height: 0, width: 0
            }}
            content={<ToolItem items={[STRING.beach, STRING.village, STRING.cityShopping, STRING.mountainSky, STRING.nature, STRING.waterFront]}
                selectedItems={selectedFilterItems}
                onPress={(item, index) => {
                    const array = [...selectedFilterItems]
                    if (selectedFilterItems.includes(index)) {
                        const arrayIndex = array.indexOf(index)
                        array.splice(arrayIndex, 1)
                        setSelectedFilterItems(array)
                    }
                    else {
                        array.push(index)
                    }
                    setSelectedFilterItems(array)
                }} />}>
            <TouchableOpacity
                onPress={() => setVisible(true)}
                style={styles.backContainer}>
                <Image
                    style={styles.backImage}
                    resizeMode="contain"
                    source={IMAGES.ic_menu} />
            </TouchableOpacity>
        </Tooltip>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: Platform.OS == 'ios' ? 44 : 56,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: SCALE_SIZE(20)
    },
    itemContainer: {
        height: Platform.OS == 'ios' ? 44 : 56,
        width: Platform.OS == 'ios' ? 44 : 56,
    },
    backContainer: {
        height: Platform.OS == 'ios' ? 44 : 56,
        width: Platform.OS == 'ios' ? 44 : 56,
        justifyContent: 'center'
    },
    backImage: {
        height: SCALE_SIZE(25),
        width: SCALE_SIZE(25),
        alignSelf: 'center'
    },
    downImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center'
    },
    profileView: {
        height: SCALE_SIZE(40),
        width: SCALE_SIZE(40),
        backgroundColor: COLORS.gray,
        borderRadius: SCALE_SIZE(20),
        marginRight: SCALE_SIZE(15)
    },
    profileHighlight: {
        height: SCALE_SIZE(40),
        width: SCALE_SIZE(40),
        borderRadius: SCALE_SIZE(20),
        borderWidth: 1,
        borderColor: COLORS.blue,
        backgroundColor: COLORS.gray,
        marginRight: SCALE_SIZE(15)
    },
    tooltipContainer: {
        height: SCALE_SIZE(173),
        backgroundColor: COLORS.white,
        width: SCALE_SIZE(205),
        borderRadius: SCALE_SIZE(10),
        marginHorizontal: SCALE_SIZE(20)
    },
    editProfile: {
        height: SCALE_SIZE(26),
        width: SCALE_SIZE(26),
        alignSelf: 'center'
    },
    dashboardImage: {
        height: SCALE_SIZE(29),
        width: SCALE_SIZE(29),
        alignSelf: 'center'
    },
})

export default Header;

