import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native'

//COMPONENT
import { Header, ProgressView, FavouriteItem, Text } from "../../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST, STRING } from "../../constant";

//CONTEXT
import { AuthContext } from "../../context";

//API
import { favouriteHotelList } from "../../api";

const Favourite = (props) => {

    const { user } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false);
    const [favouriteList, setFavouriteList] = useState([])

    useEffect(() => {
        getFavouriteHotels()
    }, [])

    function onBack() {
        props.navigation.goBack()
    }

    async function getFavouriteHotels() {
        const params = {
            user_id: user?.[0]?.user_id,
            user_session: user?.[0]?.user_session,
            user_session_id: ''
        }

        setIsLoading(true)
        const result = await favouriteHotelList(params)
        setIsLoading(false)

        console.log(favouriteList?.length ?? 0)

        if (result.status) {
            const favouriteResponse = result?.data?.result?.front_fav ?? []
            setFavouriteList(favouriteResponse)
        }

        else {
            SHOW_TOAST(result?.error)
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => onBack()}
                title={STRING.favourite} />
            {isLoading == false && favouriteList?.length == 0 ?
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text
                        size={SCALE_SIZE(20)}
                        family={FONT_NAME.light}
                        align='center'>
                        {'No Data Found'}
                    </Text>
                </View>
                :
                <FlatList data={favouriteList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <FavouriteItem item={item}
                                navigation={props.navigation}
                                onFavouriteStausChanged={(item, index) => {
                                    const listItems = [...favouriteList]
                                    listItems.splice(index, 1)
                                    setFavouriteList(listItems)
                                }} />
                        )
                    }}>
                </FlatList>
            }
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

export default Favourite;