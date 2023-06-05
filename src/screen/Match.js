import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native'

//SCREENS
import { SCREENS } from ".";

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { Button, Header, ProgressView, Text, ToolItem } from "../component";

//CONSTANT
import { COLORS, SCALE_SIZE, FONT_NAME, SHOW_TOAST } from "../constant";

//PACKAGES
import Tooltip from "react-native-walkthrough-tooltip";

//CONTEXT
import { AuthContext, TranslationContext } from "../context";

//API
import { destination, getCountry, getRegion, getServices } from "../api";

const Match = (props) => {

    const { user } = useContext(AuthContext)

    const translations = useContext(TranslationContext)

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
            user_session: user?.[0]?.user_session,
            continent: selectedContinent.french_name,
            cont_continent: selectedContinent.french_name,
        }

        setIsLoading(true)
        const result = await getCountry(params)
        setIsLoading(false)

        if (result.status) {
            const countryArray = result?.data?.result ?? []
            const response = countryArray.map((e) => {
                return {
                    id: e.cnt_id,
                    name: e.cont_english_design,
                    french_name: e.cont_french_design,
                    spanish_name: e.cont_spanish_design
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
            user_session: user?.[0]?.user_session,
            continent: selectedContinent?.french_name,
            cont_continent: selectedContinent.french_name,
            country: selectedCountries?.french_name
        }

        setIsLoading(true)
        const result = await getRegion(params)
        setIsLoading(false)

        if (result.status) {
            const regionResponse = result?.data?.result ?? []
            if (regionResponse?.length > 0) {
                const regionData = regionResponse.map((e) => {
                    return {
                        id: e?.reg_id,
                        name: e?.reg_english_design,
                        french_name: e?.reg_french_design,
                        spanish_name: e?.reg_spanish_desgin
                    }
                })
                setRegion(regionData)
            }
            else {
                Alert.alert('', 'No Region found as per your selection')
            }

            setTimeout(() => {
                setVisibleRegion(true)
            }, 300);
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    async function getServicesList() {
        const params = {
            user_id: user?.[0]?.user_id,
            user_session: user?.[0]?.user_session,
            continent: selectedContinent?.french_name,
            cont_continent: selectedContinent.french_name,
            country: selectedCountries?.french_name,
            hotel_region: selectedRegion?.id
        }

        setIsLoading(true)
        const result = await getServices(params)
        setIsLoading(false)

        if (result.status) {
            const response = result?.data?.result?.[0]?.hotel_services ?? []
            if (response.length > 0) {
                const serviceData = response.map((e) => {
                    return {
                        name: e?.services
                    }
                })
                setServices(serviceData)
            }
            else {
                Alert.alert('', 'No Service found as per your selection')
            }
            setTimeout(() => {
                setVisibleService(true)
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
                {translations.letsfindyourmatchinghotels}
            </Text>
            <Text
                style={styles.dataFillUpText}
                size={SCALE_SIZE(16)}
                color={COLORS.gray}
                family={FONT_NAME.medium}>
                {translations.datafillup}
            </Text>
            <View style={{ marginTop: SCALE_SIZE(25) }}></View>
            <ToolTipView
                visible={isVisibleContinent}
                items={continents}
                selectedItem={selectedContinent}
                placeholder={translations.whichcontinentattractyou}
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
                    setSelectedCountries(null)
                    setSelectedRegion(null)
                    setSelectedServices(null)
                }} />
            <ToolTipView
                visible={isVisibleCountry}
                items={countries}
                selectedItem={selectedCountries}
                placeholder={translations.whichcountrywouldyouliketovisit}
                onOpen={() => {
                    if (selectedContinent) {
                        getCountries()
                    }
                    else {
                        SHOW_TOAST(translations.pleaseselectcontinet)
                    }
                }}
                onClose={() => {
                    setVisibleCountry(false)
                }}
                onSelectItem={(item) => {
                    setSelectedCountries(item)
                    setSelectedRegion(null)
                    setSelectedServices(null)
                }} />
            <ToolTipView
                visible={isVisibleRegion}
                items={regions}
                selectedItem={selectedRegion}
                placeholder={translations.inwhichregiondoyouwanttotravel}
                onOpen={() => {
                    if (selectedContinent && selectedCountries) {
                        getRegionList()
                    }
                    else {
                        SHOW_TOAST(translations.continentcountry)
                    }
                }}
                onClose={() => {
                    setVisibleRegion(false)
                }}
                onSelectItem={(item) => {
                    setSelectedRegion(item)
                    setSelectedServices(null)
                }} />
            <ToolTipView visible={isVisibleService}
                items={services}
                selectedItem={selectedServices}
                placeholder={translations.whatservicesorequipmentdoyouexpect}
                onOpen={() => {
                    if (selectedContinent && selectedCountries && selectedRegion) {
                        getServicesList()
                    }
                    else {
                        SHOW_TOAST(translations.continentcountryregion)
                    }
                }}
                onClose={() => {
                    setVisibleService(false)
                }}
                onSelectItem={(item) => {
                    setSelectedServices(item)
                }} />

            <Button
                onPress={() => {
                    props.navigation.navigate(SCREENS.MatchList.name, {
                        continent: selectedContinent,
                        countries: selectedCountries,
                        region: selectedRegion,
                        services: selectedServices
                    })
                }}
                style={styles.searchButton}
                title={translations.search} />
            <SafeAreaView />
            {isLoading && <ProgressView />}
        </View>
    )
}

const ToolTipView = (props) => {

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
                <ToolItem
                    items={items}
                    selectedItems={[selectedItem]}
                    onPress={(item, index) => {
                        props.onSelectItem(item)
                    }} />
            }>
            <TouchableOpacity style={styles.itemContainer}
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
    itemContainer: {
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
        marginBottom: SCALE_SIZE(35)
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