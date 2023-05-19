import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native'

//COMPONENT
import { Header, HotelCarousel, ProgressView } from "../component";

//CONSTANT
import { COLORS, STRING, SHOW_TOAST } from "../constant";

//API
import { getDestinationPlace } from "../api";

//CONTEXT
import { AuthContext } from "../context";

const DestinationPlace = (props) => {

    const { item } = props.route.params

    const { user } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false);
    const [destinationResponse, setDestinationResponse] = useState([])

    useEffect(() => {
        getDestinationPlaces()
    }, [])

    function onBack() {
        props.navigation.goBack()
    }

    async function getDestinationPlaces() {
        const params = {
            user_id: user?.[0]?.user_id,
            user_session:user?.[0]?.user_session,
            hotel_continent: item?.cont_french_design,
        }

        setIsLoading(true)
        const result = await getDestinationPlace(params)
        setIsLoading(false)

        if (result.status) {
            const destinationPlaceResult = result?.data?.result ?? []
            setDestinationResponse(destinationPlaceResult)
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header
                onBack={() => onBack()}
                title={STRING.destinations}
            />
            <FlatList data={destinationResponse}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <HotelCarousel navigation={props.navigation} item={item} />
                    )
                }}>
            </FlatList>
            <SafeAreaView />
            {isLoading && <ProgressView />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
    }
})

export default DestinationPlace;