import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Modal, Image, TouchableOpacity, Alert } from 'react-native'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST } from "../constant";

//COMPONENT
import { ProgressView, Text, ToolItem } from "../component"

//ASSET
import { IMAGES } from "../asset"

//SCREENS
import { SCREENS } from "../screen";

//PACKAGES
import Tooltip from "react-native-walkthrough-tooltip";

//API
import { destination, getCountry, getRegion } from "../api";

//CONTEXT
import { AuthContext, TranslationContext } from "../context";

const BookingSelectionPopup = (props) => {

    const navigation = props.navigation

    const { user } = useContext(AuthContext)

    const translations = useContext(TranslationContext)

    const [isLoading, setIsLoading] = useState(false)

    const [continents, setContinents] = useState([]);
    const [countries, setCountries] = useState([]);
    const [regions, setRegion] = useState([])

    const [selectedContinent, setSelectedContinent] = useState(null);
    const [selectedCountries, setSelectedCountries] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);

    const [isVisibleContinent, setVisibleContinent] = useState(false)
    const [isVisibleCountry, setVisibleCountry] = useState(false)
    const [isVisibleRegion, setVisibleRegion] = useState(false)

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
                        french_name: e?.reg_french_design
                    }
                })
                setRegion(regionData)
                setTimeout(() => {
                    setVisibleRegion(true)
                }, 300);
            }
            else {
                Alert.alert('', 'No Region found as per your selection')
            }
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    return (
        <Modal transparent={true}
            animationType={'fade'}
            onDismiss={() => {
                setSelectedContinent(null)
                setSelectedCountries(null)
                setSelectedRegion(null)
            }}
            onRequestClose={() => {
                setSelectedContinent(null)
                setSelectedCountries(null)
                setSelectedRegion(null)
            }}
            visible={props.visible}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={{ flex: 1.0 }} onPress={() => {
                    setSelectedContinent(null)
                    setSelectedCountries(null)
                    setSelectedRegion(null)
                    props.onClose()
                }} />
                <View style={styles.container}>
                    <View style={styles.whiteContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <ToolTipView
                                visible={isVisibleContinent}
                                items={continents}
                                selectedItem={selectedContinent}
                                placeholder={translations.selectcontinent}
                                onOpen={() => {
                                    if (continents) {
                                        setVisibleContinent(true)
                                        setSelectedContinent(null)
                                        setSelectedCountries(null)
                                        setSelectedRegion(null)
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
                                    setVisibleContinent(false)
                                }}
                            >
                            </ToolTipView>
                            <View style={{ marginHorizontal: SCALE_SIZE(14) }}></View>
                            <ToolTipView
                                visible={isVisibleCountry}
                                items={countries}
                                selectedItem={selectedCountries}
                                placeholder={translations.selectcountry}
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
                                    setVisibleCountry(false)
                                }}
                            >
                            </ToolTipView>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <ToolTipView
                                visible={isVisibleRegion}
                                items={regions}
                                selectedItem={selectedRegion}
                                placeholder={translations.selectregion}
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
                                    setVisibleRegion(false)
                                }}
                            >
                            </ToolTipView>
                        </View>
                        <TouchableOpacity style={styles.searchButton}
                            onPress={() => {
                                props.onClose()

                                setSelectedContinent(null)
                                setSelectedCountries(null)
                                setSelectedRegion(null)

                                setTimeout(() => {
                                    navigation.navigate(SCREENS.MatchList.name, {
                                        continent: selectedContinent,
                                        countries: selectedCountries,
                                        region: selectedRegion
                                    })
                                }, 500);

                            }}>
                            <Text
                                size={16}
                                align='center'
                                family={FONT_NAME.semiBold}
                                color={COLORS.white}>
                                {translations.search}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={{ flex: 1.0 }} onPress={() => {
                    setSelectedContinent(null)
                    setSelectedCountries(null)
                    setSelectedRegion(null)
                    props.onClose()
                }} />
            </View>
            {isLoading && <ProgressView />}
        </Modal>
    )
}

const ToolTipView = (props) => {

    const items = props.items
    const selectedItem = props.selectedItem
    const placeholder = props.placeholder

    return (
        <Tooltip isVisible={props.visible}
            contentStyle={styles.tooltipContainer}
            backgroundColor="transparent"
            placement="bottom"
            onClose={props.onClose}
            arrowSize={{ height: 0, width: 0 }}
            arrowStyle={{ height: 0, width: 0 }}
            content=
            {
                <ToolItem items={items}
                    selectedItems={[selectedItem]}
                    onPress={(item, index) => {
                        props.onSelectItem(item)
                    }}>
                </ToolItem>
            }>
            <TouchableOpacity style={styles.selectionContainer} onPress={() => {
                props.onOpen()
            }}>
                <Text
                    style={styles.name}
                    numberOfLines={1}
                    size={10}
                    family={FONT_NAME.medium}
                    color={COLORS.gray}>
                    {selectedItem ? selectedItem.name : placeholder}
                </Text>
                <Image
                    style={styles.downImage}
                    resizeMode="contain"
                    source={IMAGES.ic_down} />
            </TouchableOpacity>
        </Tooltip>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        justifyContent: 'center'
    },
    modalContainer: {
        flex: 1.0,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    whiteContainer: {
        alignSelf: 'center',
        backgroundColor: COLORS.white,
        borderRadius: SCALE_SIZE(10),
        marginHorizontal: SCALE_SIZE(35),
        paddingBottom: SCALE_SIZE(23),
        paddingHorizontal: SCALE_SIZE(14)
    },
    selectionContainer: {
        backgroundColor: '#EEEEEE',
        borderRadius: SCALE_SIZE(12),
        flexDirection: 'row',
        marginTop: SCALE_SIZE(21),
        paddingLeft: SCALE_SIZE(16),
        height: SCALE_SIZE(38),
        width: SCALE_SIZE(159),
        alignItems: 'center'
    },
    downImage: {
        height: SCALE_SIZE(15),
        width: SCALE_SIZE(15),
        marginRight: SCALE_SIZE(16)
    },
    searchButton: {
        backgroundColor: COLORS.blue,
        height: SCALE_SIZE(36),
        width: SCALE_SIZE(125),
        borderRadius: SCALE_SIZE(30),
        marginTop: SCALE_SIZE(23),
        marginHorizontal: SCALE_SIZE(118),
        justifyContent: 'center',
        alignSelf: 'center'
    },
    tooltipContainer: {
        height: SCALE_SIZE(173),
        backgroundColor: COLORS.white,
        width: SCALE_SIZE(205),
        borderRadius: SCALE_SIZE(10),
        elevation: 4,
    },
    name: {
        flex: 1,
        right: 5
    }
})

export default BookingSelectionPopup;