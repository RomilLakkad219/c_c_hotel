import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST, STRING } from "../constant";

//COMPONENT
import { Header, ProgressView, Text } from "../component";

//API
import { legalNotice } from "../api";

//CONTEXT
import { TranslationContext } from "../context";

const LegalNotice = (props) => {

    const translations = useContext(TranslationContext)

    const [isLoading, setIsLoading] = useState(false);
    const [isResponse, setIsResponse] = useState('')

    useEffect(() => {
        getLegalNotice()
    }, [])

    function onBack() {
        props.navigation.goBack()
    }

    async function getLegalNotice() {

        setIsLoading(true)
        const result = await legalNotice()
        setIsLoading(false)

        if (result.status) {
            const legalNoticeResponse = result?.data?.result
            setIsResponse(legalNoticeResponse)
        }
        else {
            SHOW_TOAST(result.error)
        }
    }
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => { onBack() }}
                title={translations.legalnotice} />
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

export default LegalNotice;