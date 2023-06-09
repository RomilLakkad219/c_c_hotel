import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_SUCCESS_TOAST, STRING } from "../constant";

//COMPONENT
import { Header, ProgressView, Text } from "../component";

//API
import { blog } from "../api";

//CONTEXT
import { TranslationContext } from "../context";

const Blog = (props) => {

    const translations = useContext(TranslationContext)

    const [isLoading, setIsLoading] = useState(false);
    const [isBlogResponse, setIsBlogResponse] = useState('')

    // useEffect(() => {
    //     getblogData()
    // }, [])

    function onBack() {
        props.navigation.goBack()
    }

    // async function getblogData() {

    //     setIsLoading(true)
    //     const result = await blog()
    //     setIsLoading(false)

    //     if (result.status) {
    //         const response = result?.data?.result
    //         setIsBlogResponse(response)
    //         SHOW_SUCCESS_TOAST('done')
    //     }
    //     else {
    //         SHOW_TOAST(result.error)
    //     }
    // }

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => { onBack() }}
                title={translations.blog} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <Text
                    style={styles.text}
                    size={SCALE_SIZE(18)}
                    color={COLORS.borderGray}
                    family={FONT_NAME.medium}>
                    {isBlogResponse}
                </Text> */}
                <Text
                    style={styles.text}
                    size={SCALE_SIZE(18)}
                    color={COLORS.borderGray}
                    family={FONT_NAME.medium}>
                    {"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error voluptatum neque autem itaque, aspernatur sapiente ullam voluptatem nulla iste unde pariatur perspiciatis fuga explicabo aperiam obcaecati vitae possimus ad modi deserunt nam. Illo, facere."}
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

export default Blog;