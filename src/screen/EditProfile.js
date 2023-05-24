import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'

//PACKAGES
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

//ASSET
import { IMAGES } from "../asset";

//COMPONENT
import { BottomSheet, Header, ProgressView, Text } from "../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST } from "../constant";

//API
import { getCountry, updateProfile, updateUserImage } from "../api";

//CONTEXT
import { AuthContext, TranslationContext } from "../context";

const EditProfile = (props) => {

    const mediaRef = useRef();
    const genderRef = useRef();
    const countryRef = useRef();

    const translations = useContext(TranslationContext)

    const { user, profile, fetchProfile } = useContext(AuthContext)

    const [name, setName] = useState(profile?.user_name);
    const [dateOfBirth, setDateOfBirth] = useState(profile?.user_dob);
    const [mobileNumber, setMobileNumber] = useState(profile?.user_mb_no);
    const [gender, setGender] = useState(profile?.user_gender);
    const [address, setAddress] = useState(profile?.user_address);
    const [city, setCity] = useState(profile?.user_city);
    const [country, setCountry] = useState(profile?.user_country);
    const [postalCode, setPostalCode] = useState(profile?.user_postcode);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(profile?.user_imgurl);
    const [countryResult, setCountryResult] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(false)

    useEffect(() => {
        getUserProfile()
        getCountries()
    }, [])

    const showDatePicker = () => {
        setIsDatePickerVisible(true)
    }

    const hideDatePicker = () => {
        setIsDatePickerVisible(false)
    }

    const handleConfirm = (date) => {
        console.log('A date has been picked', date);
        const dateStr = moment(date).format('YYYY-MM-DD')
        setDateOfBirth(dateStr)
        hideDatePicker()
    }

    function onBack() {
        props.navigation.goBack()
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
        const dateFormate = profile?.user_dob
        if (dateFormate && dateFormate != '0000-00-00') {
            setDateOfBirth(dateFormate)
        }
    }

    async function onUpdateProfile() {

        const params = {
            user_id: user?.[0]?.user_id,
            user_session: user?.[0]?.user_session,
            user_cover_img: image,
            user_name: name,
            user_mb_no: mobileNumber,
            user_dob: dateOfBirth,
            user_gender: gender,
            user_address: address,
            user_city: city,
            user_country: country,
            user_postcode: postalCode,
            user_fb_url: '',
            user_twitter_url: '',
            user_instagram_url: '',
            user_linkedin_url: '',
            user_session_id: ''
        }

        setIsLoading(true)
        const result = await updateProfile(params)
        setIsLoading(false)

        if (result.status) {
            if (result?.data?.status == '1') {
                fetchProfile()
                props.navigation.goBack()
            }
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    async function openLibrary() {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            height: 100,
            width: 100,
            videoQuality: 'high'
        })
        setImage(result?.assets?.[0]?.uri)
        uploadImage(result?.assets?.[0]?.uri)
    }

    async function uploadImage(uri) {
        const body = new FormData()
        body.append('user_id', user?.[0]?.user_id,)
        body.append('user_imgurl', {
            uri: uri,
            name: 'image.png',
            fileName: 'image',
            type: 'image/png'
        })

        setIsLoading(true)
        const result = await updateUserImage(body)
        setIsLoading(false)

        if (result.status) {
            if (result?.data?.status == '1') {
                fetchProfile()
            }
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    async function openCamera() {
        const cameraResult = await launchCamera({
            mediaType: 'photo',
            cameraType: 'back',
        })
        console.log(cameraResult)
    }

    async function getCountries() {
        const params = {
            user_id: user?.[0]?.user_id,
            user_session: user?.[0]?.user_session
        }

        setIsLoading(true)
        const result = await getCountry(params)
        setIsLoading(false)

        if (result.status) {
            if (countryResult) {
                fetchProfile()
                const countryResponse = result?.data?.result ?? []
                const array = countryResponse.map((e, index) => {
                    return {
                        id: e.cnt_id,
                        name: e.country
                    }
                })
                setCountryResult(array)
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
                title={translations.editprofile} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => {
                        mediaRef?.current?.open()    
                    }}>
                        <Image
                            style={styles.imageUpload}
                            resizeMode="cover"
                            source={image ? { uri: image } : IMAGES.image_bg} />
                    </TouchableOpacity>
                    <Text
                        style={styles.uploadImageText}
                        size={20}
                        family={FONT_NAME.medium}
                        color={COLORS.headerTitleGray}>
                        {translations.uploadimage}
                    </Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text
                        style={{ width: SCALE_SIZE(140) }}
                        size={SCALE_SIZE(16)}
                        family={FONT_NAME.medium}
                        color={COLORS.black}>
                        {translations.name}
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
                        numberOfLines={1}
                        family={FONT_NAME.medium}
                        color={COLORS.black}>
                        {translations.dob}
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
                        numberOfLines={1}
                        family={FONT_NAME.medium}
                        color={COLORS.black}>
                        {translations.mobilenumber}
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
                        {translations.gender}
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
                        {translations.address}
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
                        {translations.city}
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
                        {translations.country}
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
                        {translations.postalcode}
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
                        size={24}
                        align='center'
                        family={FONT_NAME.semiBold}
                        color={COLORS.white}>
                        {translations.save}
                    </Text>
                </TouchableOpacity>
                <BottomSheet
                    onRef={genderRef}
                    selectedItem={gender}
                    data={[{ id: 0, name: 'Male' }, { id: 1, name: 'Female' }, { id: 2, name: 'Other' }]}
                    onPressItem={(e) => {
                        genderRef?.current?.close()
                        setGender(e?.name)
                    }} />
                <BottomSheet
                    onRef={countryRef}
                    selectedItem={country}
                    data={countryResult}
                    onPressItem={(e) => {
                        countryRef?.current?.close()
                        setCountry(e?.name)
                    }} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    maximumDate={new Date()} />
                <BottomSheet onRef={mediaRef}
                    selectedItem={selectedMedia}
                    data={[{ id: 0, name: 'Camera' }, { id: 1, name: 'Gallery' }]}
                    onPressItem={(e, index) => {
                        mediaRef?.current?.close()
                        if (index == 0) {
                            setTimeout(() => {
                                openCamera()
                                setSelectedMedia(e?.name)
                            }, 500);
                        }
                        else if (index == 1) {
                            setTimeout(() => {
                                openLibrary()
                                setSelectedMedia(e?.name)
                            }, 1000);
                        }
                    }}>
                </BottomSheet>
            </ScrollView>
            {isLoading && <ProgressView />}
        </View >
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
        marginLeft: SCALE_SIZE(35),
        borderRadius: SCALE_SIZE(50),
        backgroundColor: 'rgba(0,0,0,0.1)'
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
        paddingVertical: SCALE_SIZE(14),
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