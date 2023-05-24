import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native'

//COMPONENT
import { PopularItem, Header, ProgressView } from '../component';

//CONSTANT
import { COLORS } from '../constant';

//CONTEXT
import { AuthContext, TranslationContext } from "../context";

//API
import { home } from "../api";

const PopularHotel = (props) => {

    const translations = useContext(TranslationContext)

    const { user } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [hotelData, setHotelData] = useState([])

    useEffect(() => {
        getAllHotel()
    }, [])

    function onBack() {
        props.navigation.goBack()
    }

    async function getAllHotel() {
        const params = {
            user_id: user?.[0]?.user_id,
            user_session: user?.[0]?.user_session,
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
                title={translations.popularhotel} />
            <FlatList data={hotelData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <PopularItem item={item}
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