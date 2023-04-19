import React from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'

//ASSET
import { IMAGES } from "../asset";

//CONSTANT
import { COLORS, SCALE_SIZE } from "../constant";

const Tabbar = (props) => {

    function onPress(name, index) {
        props.navigation.emit(
            {
                type: 'onPress',
                target: name,
                canPreventDefault: true
            }
        )
        props.navigation.navigate(name)
    }
    return (
        <View style={styles.mainView}>
            <View style={styles.tabContainer}>
                {props.state.routes.map((route, index) => {
                    return (
                        <Item
                            key={index}
                            onPress={() => onPress(route.name, index)}
                            title={route.name}
                            index={index}
                            selected={props.state.index == index}
                            unreadCount={props.unreadCount}
                            image={images[index]} />
                    )
                })}
            </View>
            <SafeAreaView />
        </View>
    )
}

const images = [IMAGES.home_tab, IMAGES.booking_tab, IMAGES.favourite_tab, IMAGES.profile_tab]

const Item = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}
            style={styles.itemContainer}>
            <View style={{ flex: 1.0, justifyContent: 'center' }}>
                <Image style={props.selected ? styles.itemImageSelected : styles.itemImage}
                    resizeMode='contain'
                    source={images[props.index]} />
                {props.unreadCount > 0 && props.index == 1 &&
                    <View style={styles.indicator} />
                }
            </View>
            <View style={{
                height: 5, 
                width: 5, 
                borderRadius: 2.5, 
                backgroundColor: props.selected ? COLORS.blue : 'rgba(0,0,0,0)', 
                marginBottom: 5
            }} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#F9F9F9',
        shadowColor: '#F9F9F9',
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        borderBottomLeftRadius: SCALE_SIZE(30),
        borderBottomRightRadius: SCALE_SIZE(30)
    },
    tabContainer: {
        height: SCALE_SIZE(85),
        flexDirection: 'row'
    },
    itemContainer: {
        flex: 1.0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemImageSelected: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        tintColor: COLORS.blue
    },
    itemImage: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        tintColor: COLORS.gray
    }
})

export default Tabbar;