import React from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native'

//COMPONENT
import { FavouriteList, Header } from "../../component";

//CONSTANT
import { COLORS, STRING } from "../../constant";

const Favourite = (props) => {

    function onBack() {
        props.navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => onBack()}
                title={STRING.favourite} />
            <FlatList data={['', '']}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <FavouriteList item={item}
                            navigation={props.navigation} />
                    )
                }}>
            </FlatList>
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