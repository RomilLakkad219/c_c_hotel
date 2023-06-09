import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST } from "../constant";

//COMPONENT
import { Header, ProgressView, Text } from "../component";

//API
import { howItWork } from "../api";

//CONTEXT
import { TranslationContext } from "../context";

const HowItWork = (props) => {

    const translations = useContext(TranslationContext)

    const [isLoading, setIsLoading] = useState(false);
    const [isResponse, setIsResponse] = useState('')

    useEffect(() => {
        getHowItWorkData()
    }, [])

    function onBack() {
        props.navigation.goBack()
    }

    async function getHowItWorkData() {

        setIsLoading(true)
        const result = await howItWork()
        setIsLoading(false)

        if (result.status) {
            const data = result?.data?.result
            setIsResponse(data)
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => { onBack() }}
                title={translations.howitworks} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text
                    style={styles.text}
                    size={SCALE_SIZE(18)}
                    color={COLORS.borderGray}
                    family={FONT_NAME.medium}>
                    {isResponse}
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

export default HowItWork;