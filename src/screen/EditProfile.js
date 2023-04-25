import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'

//PACKAGES
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { BottomSheet, Header, ProgressView, Text } from "../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST, STRING } from "../constant";

//API
import { updateProfile, userProfile } from "../api";

//CONTEXT
import { AuthContext } from "../context";

const EditProfile = (props) => {

    function onBack() {
        props.navigation.goBack()
    }

    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const genderRef = useRef();
    const countryRef = useRef();
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useContext(AuthContext)

    useEffect(() => {
        getUserProfile()
    }, [])

    const showDatePicker = () => {
        setIsDatePickerVisible(true)
    }

    const hideDatePicker = () => {
        setIsDatePickerVisible(false)
    }

    const handleConfirm = (date) => {
        console.log('A date has been picked', date);

        const dateStr = moment(date).format('YYYY MM DD')
        setDateOfBirth(dateStr)
        hideDatePicker()
    }

    function onSave() {
        if (!name) {
            SHOW_TOAST('Enter Your Name')
        }
        else if (!dateOfBirth) {
            SHOW_TOAST('Enter Your Date Of Birth')
        }
        else if (!mobileNumber) {
            SHOW_TOAST('Enter Your Mobile Number')
        }
        else if (!gender) {
            SHOW_TOAST('Select Your Gender')
        }
        else if (!address) {
            SHOW_TOAST('Enter Your Address')
        }
        else if (!city) {
            SHOW_TOAST('Enter Your City')
        }
        else if (!country) {
            SHOW_TOAST('Select Your Country')
        }
        else if (!postalCode) {
            SHOW_TOAST('Enter Your Postal Code')
        }
        else {
            onUpdateProfile()
        }
    }

    async function getUserProfile() {
        const params = {
            user_id: user?.[0]?.user_id
        }

        setIsLoading(true)
        const result = await userProfile(params)
        setIsLoading(false)

        if (result.status) {
            if (result?.data?.status == "1") {
                setName(result?.data?.result?.user?.[0]?.user_name ?? '-')
                setDateOfBirth(result?.data?.result?.user?.[0]?.user_dob ?? '-')
                setMobileNumber(result?.data?.result?.user?.[0]?.user_mb_no ?? '-')
                setGender(result?.data?.result?.user?.[0]?.user_gender ?? '-')
                setAddress(result?.data?.result?.user?.[0]?.user_address ?? '-')
                setCity(result?.data?.result?.user?.[0]?.user_city ?? '-')
                setCountry(result?.data?.result?.user?.[0]?.user_country ?? '-')
                setPostalCode(result?.data?.result?.user?.[0]?.user_postcode ?? '-')
            }
        }
        else {
            SHOW_TOAST(result.error)
        }

    }

    async function onUpdateProfile() {
        const params = {
            user_id: user?.[0]?.user_id,
            user_name: name,
            user_mb_no: mobileNumber,
            user_dob: `${dateOfBirth}/${moment(date).format('YYYY MM DD')}`,
            user_gender: gender,
            user_address: address,
            user_city: city,
            user_country: country,
            user_postcode: postalCode,
            user_fb_url: '',
            user_twitter_url: '',
            user_instagram_url: '',
            user_linkedin_url: '',
            user_session: '',
            user_session_id: ''
        }

        setIsLoading(true)
        const result = await updateProfile(params)
        setIsLoading(false)

        if (result.status) {
            if (result?.data?.status == '1') {
                console.log(JSON.stringify(result))
            }
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => onBack()}
                onEditProfile={() => { }}
                title={STRING.editProfile} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity>
                        <Image
                            style={styles.imageUpload}
                            resizeMode="contain"
                            source={IMAGES.image_bg} />
                    </TouchableOpacity>
                    <Text
                        style={styles.uploadImageText}
                        size={20}
                        family={FONT_NAME.medium}
                        color={COLORS.headerTitleGray}>
                        {STRING.uploadImage}
                    </Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text
                        style={{ width: SCALE_SIZE(140) }}
                        size={SCALE_SIZE(16)}
                        family={FONT_NAME.medium}
                        color={COLORS.black}>
                        {STRING.name}
                    </Text>
                    <TextInput style={styles.input}
                        placeholderTextColor={COLORS.black}
                        value={name}
                        onChangeText={(text) => {
                            setName(text)
                        }}>
                    </TextInput>
                </View>
                <View style={styles.nameContainer}>
                    <Text
                        style={{ width: SCALE_SIZE(140) }}
                        size={SCALE_SIZE(16)}
                        family={FONT_NAME.medium}
                        color={COLORS.black}>
                        {STRING.dob}
                    </Text>
                    <TouchableOpacity style={styles.directionContainer}
                        onPress={() => {
                            showDatePicker()
                        }}>
                        <View style={styles.input}
                            pointerEvents='none'>
                            <TextInput style={{ flex: 1.0 }}
                                value={dateOfBirth}
                                onChangeText={(text) => {
                                    setDateOfBirth(text)
                                }}>
                            </TextInput>
                        </View>
                        <Image
                            style={styles.calender}
                            resizeMode="contain"
                            source={IMAGES.ic_calender} />
                    </TouchableOpacity>
                </View>
                <View style={styles.nameContainer}>
                    <Text
                        style={{ width: SCALE_SIZE(140) }}
                        size={SCALE_SIZE(16)}
                        family={FONT_NAME.medium}
                        color={COLORS.black}>
                        {STRING.mobileNumber}
                    </Text>
                    <TextInput style={styles.input}
                        value={mobileNumber}
                        onChangeText={(text) => {
                            setMobileNumber(text)
                        }}>
                    </TextInput>
                </View>
                <View style={styles.nameContainer}>
                    <Text
                        style={{ width: SCALE_SIZE(140) }}
                        size={SCALE_SIZE(16)}
                        family={FONT_NAME.medium}
                        color={COLORS.black}>
                        {STRING.gender}
                    </Text>
                    <TouchableOpacity style={styles.directionContainer}
                        onPress={() => {
                            genderRef.current.open()
                        }}>
                        <View style={styles.input}
                            pointerEvents='none'>
                            <TextInput style={{ flex: 1.0 }}
                                value={gender}
                                onChangeText={(text) => {
                                    setGender(text)
                                }}>
                            </TextInput>
                        </View>
                        <Image
                            style={styles.calender}
                            resizeMode="contain"
                            source={IMAGES.ic_down} />
                    </TouchableOpacity>
                </View>
                <View style={styles.nameContainer}>
                    <Text
                        style={{ width: SCALE_SIZE(140) }}
                        size={SCALE_SIZE(16)}
                        family={FONT_NAME.medium}
                        color={COLORS.black}>
                        {STRING.address}
                    </Text>
                    <TextInput style={styles.input}
                        value={address}
                        onChangeText={(text) => {
                            setAddress(text)
                        }}>
                    </TextInput>
                </View>
                <View style={styles.nameContainer}>
                    <Text
                        style={{ width: SCALE_SIZE(140) }}
                        size={SCALE_SIZE(16)}
                        family={FONT_NAME.medium}
                        color={COLORS.black}>
                        {STRING.city}
                    </Text>
                    <TextInput style={styles.input}
                        value={city}
                        onChangeText={(text) => {
                            setCity(text)
                        }}>
                    </TextInput>
                </View>
                <View style={styles.nameContainer}>
                    <Text
                        style={{ width: SCALE_SIZE(140) }}
                        size={SCALE_SIZE(16)}
                        family={FONT_NAME.medium}
                        color={COLORS.black}>
                        {STRING.country}
                    </Text>
                    <TouchableOpacity style={styles.directionContainer}
                        onPress={() => {
                            countryRef.current.open()
                        }}>
                        <View style={styles.input}
                            pointerEvents='none'>
                            <TextInput
                                style={{ flex: 1.0 }}
                                value={country}
                                onChangeText={(text) => {
                                    setCountry(text)
                                }}>
                            </TextInput>
                        </View>
                        <Image
                            style={styles.calender}
                            resizeMode="contain"
                            source={IMAGES.ic_down} />
                    </TouchableOpacity>
                </View>
                <View style={styles.nameContainer}>
                    <Text
                        style={{ width: SCALE_SIZE(140) }}
                        size={SCALE_SIZE(16)}
                        family={FONT_NAME.medium}
                        color={COLORS.black}>
                        {STRING.postalCode}
                    </Text>
                    <TextInput style={styles.input}
                        value={postalCode}
                        onChangeText={(text) => {
                            setPostalCode(text)
                        }}>
                    </TextInput>
                </View>
                <TouchableOpacity style={styles.saveButton}
                    onPress={() => {
                        onSave()
                    }}>
                    <Text
                        style={{ width: SCALE_SIZE(100) }}
                        size={24}
                        align='center'
                        family={FONT_NAME.semiBold}
                        color={COLORS.white}>
                        {STRING.save}
                    </Text>
                </TouchableOpacity>
                <BottomSheet
                    onRef={genderRef}
                    selectedItem={gender}
                    data={['Male', 'Female', 'Other']}
                    onPressItem={(e) => {
                        genderRef?.current?.close()
                        setGender(e)
                    }} />
                <BottomSheet
                    onRef={countryRef}
                    selectedItem={country}
                    data={['France', 'Finland', 'Fiji Island']}
                    onPressItem={(e) => {
                        countryRef?.current?.close()
                        setCountry(e)
                    }} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    maximumDate={new Date()} />
            </ScrollView>
            {isLoading && <ProgressView />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
    },
    imageUpload: {
        height: SCALE_SIZE(100),
        width: SCALE_SIZE(100),
        alignSelf: 'center',
        marginTop: SCALE_SIZE(39),
        marginLeft: SCALE_SIZE(35)
    },
    uploadImageText: {
        marginTop: SCALE_SIZE(74),
        marginLeft: SCALE_SIZE(27)
    },
    nameContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: SCALE_SIZE(10),
        marginHorizontal: SCALE_SIZE(35),
    },
    input: {
        flex: 1.0,
        fontFamily: FONT_NAME.medium,
        fontSize: SCALE_SIZE(16),
        backgroundColor: '#F6F6F6',
        height: SCALE_SIZE(50),
        padding: 0,
        borderRadius: SCALE_SIZE(4),
        paddingHorizontal: SCALE_SIZE(10),
    },
    calender: {
        height: SCALE_SIZE(15),
        width: SCALE_SIZE(15),
        alignSelf: 'center'
    },
    downImage: {
        height: SCALE_SIZE(15),
        width: SCALE_SIZE(8),
        alignSelf: 'flex-end'
    },
    saveButton: {
        backgroundColor: COLORS.blue,
        marginTop: SCALE_SIZE(37),
        marginHorizontal: SCALE_SIZE(78),
        justifyContent: 'center',
        paddingHorizontal: SCALE_SIZE(107),
        paddingVertical: SCALE_SIZE(14),
        alignSelf: 'center',
        borderwidth: 1,
        borderRadius: SCALE_SIZE(30),
        marginBottom: SCALE_SIZE(50)
    },
    maleText: {
        marginHorizontal: SCALE_SIZE(15),
        marginTop: SCALE_SIZE(10)
    },
    femaleText: {
        marginHorizontal: SCALE_SIZE(15),
        marginTop: SCALE_SIZE(12)
    },
    otherText: {
        marginHorizontal: SCALE_SIZE(15),
        marginTop: SCALE_SIZE(12)
    },
    blueView: {
        backgroundColor: '#EEF2FF',
        borderRadius: SCALE_SIZE(6),
        flexDirection: 'row',
        marginHorizontal: SCALE_SIZE(15),
        marginTop: SCALE_SIZE(20),
        height: SCALE_SIZE(32),
        width: SCALE_SIZE(130),
        paddingLeft: SCALE_SIZE(15)
    },
    directionContainer: {
        flex: 1.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        borderRadius: SCALE_SIZE(4),
        paddingRight: SCALE_SIZE(10)
    }
})

export default EditProfile;