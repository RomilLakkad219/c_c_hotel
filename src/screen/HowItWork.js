import React from "react";
import { View, StyleSheet, SafeAreaView } from 'react-native'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constant";

//COMPONENT
import { Header, Text } from "../component";

const HowItWork = (props) => {

    function onBack() {
        props.navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header onBack={() => { onBack() }}
                title={STRING.howItWork} />
            <Text
                style={styles.text}
                size={SCALE_SIZE(18)}
                color={COLORS.borderGray}
                family={FONT_NAME.medium}>
                {`It is a long established fact that a\nreader will be distracted by the\nreadable content of a page when\nlooking at its layout.The point of using\nLorem Ipsum is that it has a more-or-\nless normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`}
            </Text>
            <Text
                style={styles.textTwo}
                size={SCALE_SIZE(18)}
                color={COLORS.borderGray}
                family={FONT_NAME.medium}>
                {`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. `}
            </Text>
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
    textTwo:{
        marginTop:SCALE_SIZE(14),
        marginHorizontal:SCALE_SIZE(35)
    }
})

export default HowItWork;