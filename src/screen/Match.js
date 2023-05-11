import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'

//SCREENS
import { SCREENS } from ".";

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Button, Header, ProgressView, Text, ToolItem } from "../component";

//CONSTANT
import { COLORS, SCALE_SIZE, STRING, FONT_NAME, SHOW_TOAST } from "../constant";

//PACKAGES
import Tooltip from "react-native-walkthrough-tooltip";
import DateTimePickerModal from "react-native-modal-datetime-picker";

//CONTEXT
import { AuthContext } from "../context";

//API
import { destination, getCountry } from "../api";

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
    const [isLoading, setIsLoading] = useState(false);
    const [destinationResult, setDestinationResult] = useState([])
    const item = props.item

    useEffect(() => {
        getDestination()
    }, [])

    async function getDestination() {
        setIsLoading(true)
        const result = await destination()
        setIsLoading(false)

        if (result.status) {
            if (destinationResult) {
                const res = result?.data?.result ?? []
                const destinationContinent = res.map((e) => {
                    return {
                        name: e.cont_english_design
                    }
                })
                setDestinationResult(destinationContinent)
            }
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    return (
        <Tooltip
            isVisible={visible}
            item={item}
            contentStyle={styles.tooltipContainer}
            backgroundColor={'transparent'}
            placement='bottom'
            onClose={() => {
                setVisible(false)
            }}
            arrowStyle={{
                height: 0, width: 0
            }}
            arrowSize={{
                height: 0, width: 0
            }}
            content={<ToolItem items={destinationResult}
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
            <TouchableOpacity style={styles.listContainer}
                onPress={() => setVisible(true)}>
                <Text
                    style={styles.title}
                    size={SCALE_SIZE(12)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {selectedFilterItems.length ? selectedFilterItems.map((e) => e.name).join(' , ') : 'Which continent attracts you ?'}
                </Text>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={IMAGES.ic_down}>
                </Image>
            </TouchableOpacity>
            {isLoading && <ProgressView />}
        </Tooltip>
    )
}

const CountriesToolTip = (props) => {

    const [visible, setVisible] = useState(false)
    const [selectedFilterItems, setSelectedFilterItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [countryResult, setCountryResult] = useState([]);

    const { user } = useContext(AuthContext)

    useEffect(() => {
        getCountries()
    }, [])

    async function getCountries() {
        const params = {
            user_id: user?.[0]?.user_id,
        }

        setIsLoading(true)
        const result = await getCountry(params)
        setIsLoading(false)

        if (result.status) {
            if (countryResult) {
                const countryArray = result?.data?.result ?? []
                const response = countryArray.map((e) => {
                    return {
                        id: e.cnt_id,
                        name: e.country
                    }
                })
                setCountryResult(response)
            }
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    return (
        <Tooltip
            isVisible={visible}
            contentStyle={styles.tooltipContainer}
            backgroundColor={'transparent'}
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
                items={countryResult}
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
            <TouchableOpacity style={styles.listContainer}
                onPress={() => setVisible(true)}>
                <Text
                    style={styles.title}
                    size={SCALE_SIZE(12)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {selectedFilterItems.length ? selectedFilterItems.map((e) => e.name).join(' , ') : 'Which countries would you like to visit ?'}
                </Text>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={IMAGES.ic_down}>
                </Image>
            </TouchableOpacity>
            {isLoading && <ProgressView />}
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
            backgroundColor={'transparent'}
            onClose={() => {
                setVisible(false)
            }}
            arrowStyle={{
                height: SCALE_SIZE(0), width: SCALE_SIZE(0)
            }}
            arrowSize={{
                height: 0, width: 0
            }}
            content={<ToolItem items={[{ name: 'Cape Town' }, { name: 'Biscay' }, { name: 'Occitanie' }, { name: 'Pays de la Loire' }, { name: 'French Brittany' }, { name: 'Ile-de-France' }]}
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
            backgroundColor={'transparent'}
            onClose={() => {
                setVisible(false)
            }}
            arrowStyle={{
                height: SCALE_SIZE(0), width: SCALE_SIZE(0)
            }}
            arrowSize={{
                height: 0, width: 0
            }}
            content={<ToolItem items={[{ name: 'Beach' }, { name: 'Tea Route' }, { name: 'Trendy' }, { name: 'Village' }, { name: 'Weddings' }, { name: 'Zen' }]}
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
            backgroundColor={'transparent'}
            onClose={() => {
                setVisible(false)
            }}
            arrowStyle={{
                height: SCALE_SIZE(0), width: SCALE_SIZE(0)
            }}
            arrowSize={{
                height: 0, width: 0
            }}
            content={<ToolItem items={[{ name: 'Bicycle Rental' }, { name: 'Concierge' }, { name: 'Daily Press' }, { name: 'Cooking Lessons' }, { name: 'Weddings' }, { name: 'Electric Vehicle' }]}
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
            backgroundColor={'transparent'}
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
            content={< ToolItem items={[{ name: 'Swimming Pool' }, { name: 'Restaurant' }, { name: 'Spa' }, { name: 'Library' }, { name: 'Tennis' }, { name: 'Lockers' }]}
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
        borderRadius: SCALE_SIZE(10),
        left: SCALE_SIZE(100),
        elevation: 4,
    }
})

export default Match;