import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native'

//COMPONENT
import { FavouriteList, Header, ProgressView } from '../component';

//CONSTANT
import { COLORS, STRING } from '../constant';

//CONTEXT
import { AuthContext } from "../context";

//API
import { home } from "../api";

const PopularHotel = (props) => {

    function onBack() {
        props.navigation.goBack()
    }

    const { user } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [hotelData, setHotelData] = useState([])

    useEffect(() => {
        getAllHotel()
    }, [])

    async function getAllHotel() {
        const params = {
            user_id: user?.[0]?.user_id
        }

        setIsLoading(true)
        const result = await home(params)
        setIsLoading(false)

        if (result.status) {
            const response = result?.data?.result ?? []
            setHotelData(response)
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => onBack()}
                title={STRING.popularHotel} />
            <FlatList data={hotelData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <FavouriteList item={item}
                            navigation={props.navigation} />
                    )
                }}>
            </FlatList>
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

export default PopularHotel;