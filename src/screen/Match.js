import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity, Alert } from 'react-native'

//SCREENS
import { SCREENS } from ".";

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Button, Header, ProgressView, Text, ToolItem } from "../component";

//CONSTANT
import { COLORS, SCALE_SIZE, STRING, FONT_NAME, SHOW_TOAST, SHOW_SUCCESS_TOAST } from "../constant";

//PACKAGES
import Tooltip from "react-native-walkthrough-tooltip";
import DateTimePickerModal from "react-native-modal-datetime-picker";

//CONTEXT
import { AuthContext } from "../context";

//API
import { destination, getCountry, getRegion, getServices } from "../api";

const Match = (props) => {

    const { user } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false);

    const [continents, setContinents] = useState([])
    const [countries, setCountries] = useState([])
    const [regions, setRegion] = useState([])
    const [services, setServices] = useState([])

    const [selectedContinent, setSelectedContinent] = useState(null);
    const [selectedCountries, setSelectedCountries] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedServices, setSelectedServices] = useState(null)

    const [isVisibleContinent, setVisibleContinent] = useState(false)
    const [isVisibleCountry, setVisibleCountry] = useState(false)
    const [isVisibleRegion, setVisibleRegion] = useState(false)
    const [isVisibleService, setVisibleService] = useState(false)

    function onBack() {
        props.navigation.goBack()
    }

    useEffect(() => {
        getDestination()
    }, [])

    async function getDestination() {
        setIsLoading(true)
        const result = await destination()
        setIsLoading(false)

        if (result.status) {
            const res = result?.data?.result ?? []
            const destinationContinent = res.map((e) => {
                return {
                    name: e.cont_english_design,
                    french_name: e.cont_french_design,
                    id: e.cont_id
                }
            })
            setContinents(destinationContinent)
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    async function getCountries() {
        const params = {
            user_id: user?.[0]?.user_id,
            continent: selectedContinent.french_name
        }

        setIsLoading(true)
        const result = await getCountry(params)
        setIsLoading(false)

        if (result.status) {
            const countryArray = result?.data?.result ?? []
            console.log(countryArray)
            const response = countryArray.map((e) => {
                return {
                    id: e.cnt_id,
                    name: e.country,
                }
            })
            setCountries(response)

            setTimeout(() => {
                setVisibleCountry(true)
            }, 300);
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    async function getRegionList() {
        const params = {
            user_id: user?.[0]?.user_id,
            continent: selectedContinent.french_name,
            country: selectedCountries?.name
        }

        setIsLoading(true)
        const result = await getRegion(params)
        setIsLoading(false)

        if (result.status) {
            const regionResponse = result?.data?.result ?? []
            const regionData = regionResponse.map((e) => {
                return {
                    name: e?.reg_english_design,
                    french_name: e?.reg_french_design
                }
            })
            setRegion(regionData)

            setTimeout(() => {
                setVisibleRegion(true)
            }, 300);
        }
        else {
            SHOW_TOAST(result.error)
        }
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
            <ToolTipView
                visible={isVisibleContinent}
                items={continents}
                selectedItem={selectedContinent}
                placeholder={'Which continent attracts you ?'}
                onOpen={() => {
                    if (continents) {
                        setVisibleContinent(true)
                    }
                    else {
                        getDestination()
                    }
                }}
                onClose={() => {
                    setVisibleContinent(false)
                }}
                onSelectItem={(item) => {
                    setSelectedContinent(item)
                }} />
            <ToolTipView
                visible={isVisibleCountry}
                items={countries}
                selectedItem={selectedCountries}
                placeholder={'Which countries would you like to visit ?'}
                onOpen={() => {
                    if (selectedContinent) {
                        getCountries()
                    }
                    else {
                        SHOW_TOAST('Please select continent')
                    }
                }}
                onClose={() => {
                    setVisibleCountry(false)
                }}
                onSelectItem={(item) => {
                    setSelectedCountries(item)
                }} />
            <ToolTipView
                visible={isVisibleRegion}
                items={regions}
                selectedItem={selectedRegion}
                placeholder={'Which countries would you like to visit ?'}
                onOpen={() => {
                    if (selectedContinent) {
                        getRegionList()
                    }
                    else {
                        SHOW_TOAST('Please select continent')
                    }
                }}
                onClose={() => {
                    setVisibleRegion(false)
                }}
                onSelectItem={(item) => {
                    setSelectedRegion(item)
                }} />

            {/* <View>
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
                                <ContinentToolTip item={item}
                                    onItemChange={(items) => {
                                        setSelectedContinent(items)
                                    }} />
                            )
                        }
                        else if (index == 1) {
                            return (
                                <CountriesToolTip item={item}
                                    onItemChange={(items) => {
                                        setSelectedCountries(items)
                                    }} />
                            )
                        }
                        else if (index == 2) {
                            return (
                                <RegionToolTip item={item}
                                    onItemChange={(items) => {
                                        setSelectedRegion(items)
                                    }} />
                            )
                        }
                        else if (index == 3) {
                            return (
                                <ServiceToolTip item={item}
                                    onItemChange={(items) => {
                                        setSelectedServices(items)
                                    }} />
                            )
                        }
                    }}>
                </FlatList>
            </View> */}
            <Button
                onPress={() => {
                    props.navigation.navigate(SCREENS.MatchList.name, {
                        continent: selectedContinent,
                        countries: selectedCountries,
                        region: selectedRegion,
                        services: selectedServices
                    })
                    console.log(selectedContinent, selectedCountries, selectedRegion, selectedServices)
                }}
                style={styles.searchButton}
                title={STRING.search} />
            <SafeAreaView />
            {isLoading && <ProgressView />}
        </View>
    )
}

const ToolTipView = (props) => {

    console.log(props.visible)
    const items = props.items
    const placeholder = props.placeholder
    const selectedItem = props.selectedItem
    return (
        <Tooltip
            isVisible={props.visible}
            contentStyle={styles.tooltipContainer}
            backgroundColor={'transparent'}
            placement='bottom'
            onClose={props.onClose}
            arrowStyle={{ height: 0, width: 0 }}
            arrowSize={{ height: 0, width: 0 }}
            content={
                <ToolItem items={items}
                    selectedItems={[selectedItem]}
                    onPress={(item, index) => {
                        props.onSelectItem(item)
                    }} />
            }>
            <TouchableOpacity style={styles.listContainer}
                onPress={() => props.onOpen()}>
                <Text
                    style={styles.title}
                    size={SCALE_SIZE(12)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {selectedItem ? selectedItem.name : placeholder}
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

    const [visible, setVisible] = useState(false);
    const [selectedFilterItems, setSelectedFilterItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [regionResult, setRegionResult] = useState([])

    useEffect(() => {
        getAllRegions()
    }, [])

    async function getAllRegions() {
        const params = {
            country: regionResult
        }

        setIsLoading(true)
        const result = await getRegion(params)
        setIsLoading(false)

        if (result.status) {
            const regionResponse = result?.data?.result ?? []
            const regionData = regionResponse.map((e) => {
                return {
                    name: e?.reg_english_design
                }
            })
            setRegionResult(regionData)
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

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
            content={
                <ToolItem
                    items={regionResult}
                    selectedItems={selectedFilterItems}
                    onPress={(item, index) => {
                        console.log(selectedFilterItems.includes(item))
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
                        props.onItemChange(array)
                    }} />}
        >
            <TouchableOpacity style={styles.listContainer}
                onPress={() => setVisible(true)}>
                <Text
                    style={styles.title}
                    size={SCALE_SIZE(12)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {selectedFilterItems?.length ? selectedFilterItems.map((e) => e.name).join(' , ') : 'In which region do you want to travel ?'}
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

// const ExperienceToolTip = (props) => {

//     const [visible, setVisible] = useState(false)
//     const [selectedFilterItems, setSelectedFilterItems] = useState([])

//     return (
//         <Tooltip
//             isVisible={visible}
//             contentStyle={[styles.tooltipContainer]}
//             placement='bottom'
//             backgroundColor={'transparent'}
//             onClose={() => {
//                 setVisible(false)
//             }}
//             arrowStyle={{
//                 height: SCALE_SIZE(0), width: SCALE_SIZE(0)
//             }}
//             arrowSize={{
//                 height: 0, width: 0
//             }}
//             content={<ToolItem
//                 items={[{ name: 'Beach' }, { name: 'Tea Route' }, { name: 'Trendy' }, { name: 'Village' }, { name: 'Weddings' }, { name: 'Zen' }]}
//                 selectedItems={selectedFilterItems}
//                 onPress={(item, index) => {
//                     const array = [...selectedFilterItems]
//                     if (selectedFilterItems.includes(item)) {
//                         const arrayIndex = array.indexOf(item)
//                         array.splice(arrayIndex, 1)
//                         setSelectedFilterItems(array)
//                     }
//                     else {
//                         array.push(item)
//                     }
//                     setSelectedFilterItems(array)
//                     console.log('ARRAY', array)
//                     console.log("SELECTED", selectedFilterItems)
//                     console.log('Item', item)
//                 }} />}>
//             <TouchableOpacity style={styles.listContainer}
//                 onPress={() => setVisible(true)}>
//                 <Text
//                     style={styles.title}
//                     size={SCALE_SIZE(12)}
//                     color={COLORS.gray}
//                     family={FONT_NAME.medium}>
//                     {'Which experiences are you looking for the most ?'}
//                 </Text>
//                 <Image
//                     style={styles.image}
//                     resizeMode="contain"
//                     source={IMAGES.ic_down}>
//                 </Image>
//             </TouchableOpacity>
//         </Tooltip>
//     )
// }

const ServiceToolTip = (props) => {

    const [visible, setVisible] = useState(false);
    const [selectedFilterItems, setSelectedFilterItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [serviceResult, setServiceResult] = useState([])

    useEffect(() => {
        services()
    }, [])

    async function services() {
        const params = {
            continent: serviceResult,
            country: '',
            hotel_region: ''
        }

        setIsLoading(true)
        const result = await getServices(params)
        setIsLoading(false)

        if (result.status) {
            if (serviceResult) {
                const response = result?.data?.result?.[0]?.hotel_services ?? []
                const serviceData = response.map((e) => {
                    return {
                        name: e?.services
                    }
                })
                setServiceResult(serviceData)
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
            content={<ToolItem items={serviceResult}
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
                    props.onItemChange(array)
                }} />}>
            <TouchableOpacity style={styles.listContainer}
                onPress={() => setVisible(true)}>
                <Text
                    style={styles.title}
                    size={SCALE_SIZE(12)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {selectedFilterItems?.length ? selectedFilterItems.map((e) => e.name).join(' , ') : 'What services or equipment do you expect ?'}
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

// const EquipmentToolTip = (props) => {

//     const [visible, setVisible] = useState(false)
//     const [selectedFilterItems, setSelectedFilterItems] = useState([])

//     return (
//         <Tooltip
//             isVisible={visible}
//             contentStyle={styles.tooltipContainer}
//             backgroundColor={'transparent'}
//             placement='bottom'
//             onClose={() => {
//                 setVisible(false)
//             }}
//             arrowStyle={{
//                 height: SCALE_SIZE(0), width: SCALE_SIZE(0)
//             }}
//             arrowSize={{
//                 height: 0, width: 0
//             }}
//             content={< ToolItem items={[{ name: 'Swimming Pool' }, { name: 'Restaurant' }, { name: 'Spa' }, { name: 'Library' }, { name: 'Tennis' }, { name: 'Lockers' }]}
//                 selectedItems={selectedFilterItems}
//                 onPress={(item, index) => {
//                     const array = [...selectedFilterItems]
//                     if (selectedFilterItems.includes(index)) {
//                         const arrayIndex = array.indexOf(index)
//                         array.splice(arrayIndex, 1)
//                         setSelectedFilterItems(array)
//                     }
//                     else {
//                         array.push(index)
//                     }
//                     setSelectedFilterItems(array)
//                 }} />}>
//             <TouchableOpacity style={styles.listContainer}
//                 onPress={() => setVisible(true)}>
//                 <Text
//                     style={styles.title}
//                     size={SCALE_SIZE(12)}
//                     color={COLORS.gray}
//                     family={FONT_NAME.medium}>
//                     {'Equipment'}
//                 </Text>
//                 <Image
//                     style={styles.image}
//                     resizeMode="contain"
//                     source={IMAGES.ic_down}>
//                 </Image>
//             </TouchableOpacity >
//         </Tooltip>
//     )
// }

// const DatePicker = (props) => {

//     const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
//     const [selectedDate, setSelectedDate] = useState('')

//     const showDatePicker = () => {
//         setIsDatePickerVisible(true)
//     }

//     const hideDatePicker = () => {
//         setIsDatePickerVisible(false)
//     }

//     const handleConfirm = (date) => {
//         console.log('A date has been picked', date);
//         setSelectedDate(x1)
//         hideDatePicker();
//         const dt = new Date(date);
//         const x = dt.toISOString().split('T');
//         const x1 = x[0].split('_');
//         console.log(x1)
//     }

//     return (
//         <>
//             <TouchableOpacity style={styles.listContainer}
//                 onPress={() => showDatePicker()}>
//                 <Text
//                     style={styles.title}
//                     size={SCALE_SIZE(12)}
//                     color={COLORS.gray}
//                     family={FONT_NAME.medium}>
//                     {'When you want to go ?'}
//                 </Text>
//                 <Image
//                     style={styles.image}
//                     resizeMode="contain"
//                     source={IMAGES.ic_calender}>
//                 </Image>
//             </TouchableOpacity>
//             <DateTimePickerModal
//                 isVisible={isDatePickerVisible}
//                 mode='date'
//                 onConfirm={handleConfirm}
//                 onCancel={hideDatePicker}
//             />
//         </>
//     )
// }

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
        // position: 'absolute',
        // bottom:0,
        // left:0,
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