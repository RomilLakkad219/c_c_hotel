import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, TextInput } from 'react-native'

//PACKAGES
import MapView, { Marker } from 'react-native-maps';

//ASSET
import { IMAGES } from "../../asset";

//COMPONENT
import { BookingSelectionPopup, Header } from "../../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../../constant";

const Booking = (props) => {

    function onBack() {
        props.navigation.goBack()
    }

    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.positionView}>
                <SafeAreaView />
                <Header
                    style={{ backgroundColor: 'transparent' }}
                    onBack={() => onBack()}
                    onDashboard={() => {
                        setVisible(true)
                    }} />
                <View
                    style={styles.searchInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        value={search}
                        placeholder={STRING.searchHere}
                        placeholderTextColor={COLORS.gray}
                        onChangeText={(text) => {
                            setSearch(text)
                        }}>
                    </TextInput>
                    <Image
                        style={styles.searchImage}
                        resizeMode="contain"
                        source={IMAGES.ic_search} />
                </View>
            </View>
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                        image={IMAGES.map_bg}>
                    </Marker>
                </MapView>
            </View>
            <BookingSelectionPopup
                visible={visible}
                navigation={props.navigation}
                onPress={() => {
                    setVisible(false)
                }}>
            </BookingSelectionPopup>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
    },
    positionView: {
        position: 'absolute',
        zIndex: 5000,
        top: 0,
        right: 0,
        left: 0
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        alignItems: 'center',
        paddingHorizontal: SCALE_SIZE(35),
        paddingBottom: SCALE_SIZE(20),
    },
    backArrow: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        alignSelf: 'center',
        backgroundColor: 'red'
    },
    searchInputContainer: {
        height: SCALE_SIZE(70),
        backgroundColor: '#fff',
        borderRadius: SCALE_SIZE(20),
        marginHorizontal: SCALE_SIZE(30),
        marginTop: SCALE_SIZE(35),
        paddingHorizontal: SCALE_SIZE(28),
        flexDirection: 'row',
        marginBottom: SCALE_SIZE(20),
        elevation: 4
    },
    searchInput: {
        fontFamily: FONT_NAME.medium,
        fontSize: SCALE_SIZE(16),
        flex: 1.0
    },
    searchImage: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        alignSelf: 'center'
    }
})

export default Booking;