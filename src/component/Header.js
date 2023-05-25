import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Platform, TouchableOpacity, Image } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Text, ToolItem } from '../component'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constant";

//PACKAGES
import Tooltip from "react-native-walkthrough-tooltip";

//CONTEXT
import { AuthContext, TranslationContext } from "../context";

//API
import { experienceFilter } from "../api";

const Header = (props) => {

    const { profile } = useContext(AuthContext)

    if (props.type == 'home') {

        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.title} onPress={props.onLanguage}>
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
                }}>
                    <Image
                        style={styles.profileView}
                        resizeMode="cover"
                        source={{ uri: profile?.user_imgurl }} />
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
                    numberOfLines={1}
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
                            onPress={() => props.onDashboard()}>
                            <Image
                                style={styles.dashboardImage}
                                resizeMode="contain"
                                source={IMAGES.dashboard_bg} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}

const FilterToolTip = (props) => {

    const [visible, setVisible] = useState(false);
    const [selectedFilterItems, setSelectedFilterItems] = useState([]);
    const [filterResponse, setFilterResponse] = useState([])

    useEffect(() => {
        getExpereienceFilteration()
    }, [])

    async function getExpereienceFilteration() {

        const result = await experienceFilter()

        if (result.status) {
            const filterData = result?.data?.result ?? []

            const experienceData = filterData.map((e, index) => {
                return {
                    name: e?.them_english_design,
                    french_name: e?.them_french_design,
                    spanish_name: e?.them_spanish_design
                }
            })
            setFilterResponse(experienceData)
        }
        else {
            SHOW_TOAST(result?.error)
        }
    }

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
            content={<ToolItem
                items={filterResponse}
                selectedItems={selectedFilterItems}
                onPress={(item, index) => {
                    const array = [...selectedFilterItems]
                    if (selectedFilterItems.includes(item)) {
                        const arrayIndex = array.indexOf(item)
                        array.splice(arrayIndex, 1)
                        setSelectedFilterItems(array)
                    }
                    else {
                        array.push(item)
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
        marginRight: SCALE_SIZE(15),
        borderRadius: SCALE_SIZE(20),
        overflow: 'hidden'
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
    title: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginLeft: 15
    }
})

export default Header;

