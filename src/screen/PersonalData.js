import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constant";

//COMPONENT
import { Header, ProgressView, Text } from "../component";

//API
import { personalData } from "../api";

const PersonalData = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isPersonalDataResponse, setIsPersonalDataResponse] = useState('')

    useEffect(() => {
        getPersonalData()
    }, [])

    function onBack() {
        props.navigation.goBack()
    }

    async function getPersonalData() {

        setIsLoading(true)
        const result = await personalData()
        setIsLoading(false)

        console.log(JSON.stringify(result))

        if (result.status) {
            const response = result?.data?.result
            setIsPersonalDataResponse(response)
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => { onBack() }}
                title={STRING.personalData} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text
                    style={styles.text}
                    size={SCALE_SIZE(18)}
                    color={COLORS.borderGray}
                    family={FONT_NAME.medium}>
                    {isPersonalDataResponse}
                </Text>
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
    text: {
        marginTop: SCALE_SIZE(24),
        marginHorizontal: SCALE_SIZE(35)
    },
    textTwo: {
        marginTop: SCALE_SIZE(14),
        marginHorizontal: SCALE_SIZE(35)
    }
})

export default PersonalData;