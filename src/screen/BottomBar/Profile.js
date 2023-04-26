import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native'

//SCREENS
import { SCREENS } from "..";

//ASSET
import { IMAGES } from "../../asset";

//COMPONENT
import { Header, ProgressView, Text } from "../../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_SUCCESS_TOAST, SHOW_TOAST, STRING } from "../../constant";

//CONTEXT
import { AuthContext } from "../../context";

//API
import { userProfile } from "../../api";

const Profile = (props) => {

    const { user } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        getUserProfile()
    }, [])

    function onBack() {
        props.navigation.goBack()
    }

    async function getUserProfile() {
        const params = {
            user_id: user?.[0]?.user_id,
        }

        console.log(user)

        setIsLoading(true)
        const result = await userProfile(params)
        setIsLoading(false)

        if (result.status) {
            if (result?.data?.status == "1") {
                setProfile(result?.data)
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
                title={STRING.myProfile} />
            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={styles.profile}
                    resizeMode="contain"
                    source={IMAGES.ic_profile} />
                <View style={{ flexDirection: 'column' }}>
                    <Text
                        style={styles.nameText}
                        size={SCALE_SIZE(20)}
                        color={COLORS.headerTitleGray}
                        family={FONT_NAME.medium}>
                        {profile?.result?.user?.[0]?.user_name ?? "-"}
                    </Text>
                    <Text style={styles.emailText}
                        size={SCALE_SIZE(16)}
                        color={COLORS.gray}
                        family={FONT_NAME.medium}>
                        {profile?.result?.user?.[0]?.user_email ?? '-'}
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.editProfileContainer}
                onPress={() => {
                    props.navigation.navigate(SCREENS.EditProfile.name)
                }}>
                <Image
                    style={styles.profileImage}
                    resizeMode="contain"
                    source={IMAGES.profile_bg}
                />
                <Text
                    style={styles.editProfileText}
                    size={SCALE_SIZE(16)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {STRING.editProfile}
                </Text>
                <Image
                    style={styles.forwardImage}
                    resizeMode="contain"
                    source={IMAGES.ic_forward}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingContainer}
                onPress={() => {
                    props.navigation.navigate(SCREENS.Setting.name)
                }}>
                <Image
                    style={styles.settingImage}
                    resizeMode="contain"
                    source={IMAGES.setting_bg}
                />
                <Text
                    style={styles.settingText}
                    size={SCALE_SIZE(16)}
                    color={COLORS.gray}
                    family={FONT_NAME.medium}>
                    {STRING.settings}
                </Text>
                <Image
                    style={styles.settingForwardImage}
                    resizeMode="contain"
                    source={IMAGES.ic_forward}
                />
            </TouchableOpacity>
            {isLoading && <ProgressView />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
    },
    profile: {
        height: SCALE_SIZE(100),
        width: SCALE_SIZE(100),
        marginTop: SCALE_SIZE(39),
        marginHorizontal: SCALE_SIZE(35)
    },
    nameText: {
        marginTop: SCALE_SIZE(59)
    },
    emailText: {
        marginTop: SCALE_SIZE(4)
    },
    editProfileContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: SCALE_SIZE(35),
        marginTop: SCALE_SIZE(41),
    },
    profileImage: {
        height: SCALE_SIZE(43),
        width: SCALE_SIZE(43),
    },
    editProfileText: {
        marginHorizontal: SCALE_SIZE(25),
        flex: 1.0
    },
    forwardImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        tintColor: COLORS.headerTitleGray,
    },
    settingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: SCALE_SIZE(35),
        marginTop: SCALE_SIZE(25),
    },
    settingImage: {
        height: SCALE_SIZE(43),
        width: SCALE_SIZE(43),
        alignSelf: 'center'
    },
    settingText: {
        marginHorizontal: SCALE_SIZE(25),
        flex: 1.0
    },
    settingForwardImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        tintColor: COLORS.headerTitleGray
    },

})

export default Profile;