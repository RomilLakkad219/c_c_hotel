import React, { useContext, useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native'

//SCREENS
import { SCREENS } from "..";

//ASSET
import { IMAGES } from "../../asset";

//COMPONENT
import { Header, ProgressView, Text } from "../../component";

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../../constant";

//CONTEXT
import { AuthContext, TranslationContext } from "../../context";

const Profile = (props) => {

    const { profile } = useContext(AuthContext);

    const translations = useContext(TranslationContext);

    const [isLoading, setIsLoading] = useState(false)

    function onBack() {
        props.navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => onBack()}
                title={translations.my_profile} />
            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={styles.profile}
                    resizeMode="cover"
                    source={{ uri: profile?.user_imgurl }} />
                <View style={{ flexDirection: 'column' }}>
                    <Text
                        style={styles.nameText}
                        size={SCALE_SIZE(20)}
                        color={COLORS.headerTitleGray}
                        family={FONT_NAME.medium}>
                        {profile?.user_name ?? "-"}
                    </Text>
                    <Text style={styles.emailText}
                        size={SCALE_SIZE(16)}
                        color={COLORS.gray}
                        family={FONT_NAME.medium}>
                        {profile?.user_email ?? '-'}
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
                    {translations.editprofile}
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
                    {translations.settings}
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
        marginHorizontal: SCALE_SIZE(35),
        overflow: 'hidden',
        borderRadius: SCALE_SIZE(50),
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