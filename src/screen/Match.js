import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'

//SCREENS
import { SCREENS } from ".";

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Button, Header, Text, ToolItem } from "../component";

//CONSTANT
import { COLORS, SCALE_SIZE, STRING, FONT_NAME } from "../constant";

//PACKAGES
import Tooltip from "react-native-walkthrough-tooltip";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Match = (props) => {

    function onBack() {
        props.navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => onBack()} />
            <Text
                style={styles.headerText}
                size={SCALE_SIZE(30)}
                color={COLORS.black}
                family={FONT_NAME.medium}>
                {STRING.letFindYourMatchingHotel}
            </Text>
            <Text
                style={styles.dataFillUpText}
                size={SCALE_SIZE(16)}
                color={COLORS.gray}
                family={FONT_NAME.medium}>
                {STRING.dataFillUp}
            </Text>
            <View>
                <FlatList data={['', '', '', '', '', '', '']}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{ marginTop: SCALE_SIZE(25) }}></View>
                        )
                    }}
                    renderItem={({ item, index }) => {
                        if (index == 0) {
                            return (
                                <ContinentToolTip />
                            )
                        }
                        else if (index == 1) {
                            return (
                                <CountriesToolTip />
                            )
                        }
                        else if (index == 2) {
                            return (
                                <RegionToolTip />
                            )
                        }
                        else if (index == 3) {
                            return (
                                <ExperienceToolTip />
                            )
                        }
                        else if (index == 4) {
                            return (
                                <ServiceToolTip />
                            )
                        }
                        else if (index == 5) {
                            return (
                                <EquipmentToolTip />
                            )
                        }
                        else if (index == 6) {
                            return (
                                <DatePicker />
                            )
                        }
                    }}>
                </FlatList>
            </View>
            <Button
                onPress={() => {
                    props.navigation.navigate(SCREENS.MatchList.name)
                }}
                style={styles.searchButton}
                title={STRING.search} />
            <SafeAreaView />
        </View>
    )
}

const ContinentToolTip = (props) => {

    const [visible, setVisible] = useState(false);
    const [selectedFilterItems, setSelectedFilterItems] = useState([]);
    const item = props.item

    return (
        <Tooltip
            isVisible={visible}
            item={item}
            contentStyle={styles.tooltipContainer}
            placement='bottom'
            onClose={() => {
                setVisible(false)
            }}
            arrowStyle={{
                marginHorizontal: SCALE_SIZE(100)
            }}
            content={<ToolItem items={['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America']}
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
            <TouchableOpacity style={styles.listContainer}
                onPress={() => setVisible(true)}>
                <Text
                    style={styles.title}
                    size={SCALE_SIZE(12)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {'Which continent attracts you ?'}
                </Text>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={IMAGES.ic_down}>
                </Image>
            </TouchableOpacity>
        </Tooltip>
    )
}

const CountriesToolTip = (props) => {

    const [visible, setVisible] = useState(false)
    const [selectedFilterItems, setSelectedFilterItems] = useState([])

    return (
        <Tooltip
            isVisible={visible}
            contentStyle={styles.tooltipContainer}
            placement='bottom'
            onClose={() => {
                setVisible(false)
            }}
            arrowStyle={{
                marginHorizontal: SCALE_SIZE(100)
            }}
            content={<ToolItem items={['India', 'Australia', 'America', 'Russia', 'England', 'France']}
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
            <TouchableOpacity style={styles.listContainer}
                onPress={() => setVisible(true)}>
                <Text
                    style={styles.title}
                    size={SCALE_SIZE(12)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {'Which countries would you like to visit ?'}
                </Text>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={IMAGES.ic_down}>
                </Image>
            </TouchableOpacity>
        </Tooltip>
    )
}

const RegionToolTip = (props) => {

    const [visible, setVisible] = useState(false)
    const [selectedFilterItems, setSelectedFilterItems] = useState([])

    return (
        <Tooltip
            isVisible={visible}
            contentStyle={styles.tooltipContainer}
            placement='bottom'
            onClose={() => {
                setVisible(false)
            }}
            arrowStyle={{
                marginHorizontal: SCALE_SIZE(100)
            }}
            content={<ToolItem items={['Cape Town', 'Biscay', 'Occitanie', 'Pays de la Loire', 'French Brittany', 'Ile-de-France']}
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
            <TouchableOpacity style={styles.listContainer}
                onPress={() => setVisible(true)}>
                <Text
                    style={styles.title}
                    size={SCALE_SIZE(12)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {'In which region do you want to travel ?'}
                </Text>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={IMAGES.ic_down}>
                </Image>
            </TouchableOpacity>
        </Tooltip>
    )
}
const ExperienceToolTip = (props) => {

    const [visible, setVisible] = useState(false)
    const [selectedFilterItems, setSelectedFilterItems] = useState([])

    return (
        <Tooltip
            isVisible={visible}
            contentStyle={[styles.tooltipContainer]}
            placement='bottom'
            onClose={() => {
                setVisible(false)
            }}
            arrowStyle={{
                marginHorizontal: SCALE_SIZE(100)
            }}
            content={<ToolItem items={['Beach', 'Tea Route', 'Trendy', 'Village', 'Weddings', 'Zen']}
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
            <TouchableOpacity style={styles.listContainer}
                onPress={() => setVisible(true)}>
                <Text
                    style={styles.title}
                    size={SCALE_SIZE(12)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {'Which experiences are you looking for the most ?'}
                </Text>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={IMAGES.ic_down}>
                </Image>
            </TouchableOpacity>
        </Tooltip>
    )
}

const ServiceToolTip = (props) => {

    const [visible, setVisible] = useState(false)
    const [selectedFilterItems, setSelectedFilterItems] = useState([])

    return (
        <Tooltip
            isVisible={visible}
            contentStyle={styles.tooltipContainer}
            placement='bottom'
            onClose={() => {
                setVisible(false)
            }}
            arrowStyle={{
                marginHorizontal: SCALE_SIZE(100)
            }}
            content={<ToolItem items={['Bicycle Rental', 'Concierge', 'Daily Press', 'Cooking Lessons', 'Weddings', 'Electric Vehicle']}
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
            <TouchableOpacity style={styles.listContainer}
                onPress={() => setVisible(true)}>
                <Text
                    style={styles.title}
                    size={SCALE_SIZE(12)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {'What services or equipment do you expect ?'}
                </Text>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={IMAGES.ic_down}>
                </Image>
            </TouchableOpacity>
        </Tooltip>
    )
}

const EquipmentToolTip = (props) => {

    const [visible, setVisible] = useState(false)
    const [selectedFilterItems, setSelectedFilterItems] = useState([])

    return (
        <Tooltip
            isVisible={visible}
            contentStyle={styles.tooltipContainer}
            placement='bottom'
            onClose={() => {
                setVisible(false)
            }}
            arrowSize={{
                height: 8,
                width: 16,
            }}
            arrowStyle={{
                marginHorizontal: SCALE_SIZE(100)
            }}
            content={< ToolItem items={['Swimming Pool', 'Restaurant', 'Spa', 'Library', 'Tennis', 'Lockers']}
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
            < TouchableOpacity style={styles.listContainer}
                onPress={() => setVisible(true)}>
                <Text
                    style={styles.title}
                    size={SCALE_SIZE(12)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {'Equipment'}
                </Text>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={IMAGES.ic_down}>
                </Image>
            </TouchableOpacity >
        </Tooltip >
    )
}

const DatePicker = (props) => {

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('')

    const showDatePicker = () => {
        setIsDatePickerVisible(true)
    }

    const hideDatePicker = () => {
        setIsDatePickerVisible(false)
    }

    const handleConfirm = (date) => {
        console.log('A date has been picked', date);
        setSelectedDate(x1)
        hideDatePicker();
        const dt = new Date(date);
        const x = dt.toISOString().split('T');
        const x1 = x[0].split('_');
        console.log(x1)
    }

    return (
        <>
            <TouchableOpacity style={styles.listContainer}
                onPress={() => showDatePicker()}>
                <Text
                    style={styles.title}
                    size={SCALE_SIZE(12)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {'When you want to go ?'}
                </Text>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={IMAGES.ic_calender}>
                </Image>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode='date'
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
    },
    headerText: {
        marginTop: SCALE_SIZE(35),
        marginHorizontal: SCALE_SIZE(35)
    },
    dataFillUpText: {
        marginTop: SCALE_SIZE(10),
        marginHorizontal: SCALE_SIZE(35)
    },
    listContainer: {
        height: SCALE_SIZE(54),
        borderRadius: SCALE_SIZE(25),
        backgroundColor: COLORS.lightgray,
         marginTop: SCALE_SIZE(10),
        marginHorizontal: SCALE_SIZE(35),
        alignSelf: 'center',
        flexDirection: 'row'
    },
    title: {
        paddingVertical: SCALE_SIZE(18),
        paddingLeft: SCALE_SIZE(18),
        flex: 1.0
    },
    image: {
        height: SCALE_SIZE(15),
        width: SCALE_SIZE(9),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(20)
    },
    searchButton: {
        marginTop: SCALE_SIZE(36),
        marginHorizontal: SCALE_SIZE(78),
        marginBottom: SCALE_SIZE(35),
    },
    tooltipContainer: {
        height: SCALE_SIZE(173),
        backgroundColor: COLORS.white,
        width: SCALE_SIZE(205),
        borderColor: COLORS.gray,
        borderWidth: 2,
        borderRadius: SCALE_SIZE(10),
        left: SCALE_SIZE(100)
    },
})

export default Match;