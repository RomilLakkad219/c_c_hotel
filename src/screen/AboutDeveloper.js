import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constant";

//COMPONENT
import { Header, ProgressView, Text } from "../component";

//API
import { aboutDeveloper } from "../api";

//CONTEXT
import { TranslationContext } from "../context";

const AboutDeveloper = (props) => {

    const translations = useContext(TranslationContext)

    const [isLoading, setIsLoading] = useState(false);
    const [isDeveloperResponse, setIsDeveloperResponse] = useState('')

    useEffect(() => {
        getDetailAboutDeveloper()
    }, [])

    function onBack() {
        props.navigation.goBack()
    }

    async function getDetailAboutDeveloper() {

        setIsLoading(true)
        const result = await aboutDeveloper()
        setIsLoading(false)

        if (result.status) {
            const ResponseData = result?.data?.result
            setIsDeveloperResponse(ResponseData)
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => { onBack() }}
                title={translations.aboutdeveloper} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text
                    style={styles.text}
                    size={SCALE_SIZE(18)}
                    color={COLORS.borderGray}
                    family={FONT_NAME.medium}>
                    {isDeveloperResponse}
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

export default AboutDeveloper;