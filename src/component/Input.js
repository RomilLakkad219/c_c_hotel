import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Platform } from 'react-native'

//COMPONENT
import { Text } from '../component'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE } from '../constant';

const Input = (props) => {

    const [enable, setEnable] = useState(false)

    return (
        <TouchableOpacity style=
            {
                [enable ? styles.inputHighlighted : styles.container, props.style]
            }
            onPress={()=>{
                setEnable(!enable)
            }}>
            <View style={styles.detailContainer}>
                <View style={styles.inputContainer}>
                    <Text
                        size={SCALE_SIZE(14)}
                        family={FONT_NAME.medium}
                        color={COLORS.gray}>
                        {props.title}
                    </Text>
                    <TextInput
                        {...props}
                        autoCapitalize='none'
                        style={styles.input}
                        secureTextEntry={props.secureTextEntry}
                        placeholderTextColor={COLORS.gray} />
                </View>
                {props.icon &&
                    <TouchableOpacity style={styles.iconButton} onPress={props.onPressIcon}>
                        <Image style={styles.icon} source={props.icon} />
                    </TouchableOpacity>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderColor: COLORS.blue,
        // borderWidth: 1,
        paddingHorizontal: SCALE_SIZE(25),
        paddingVertical: Platform.OS == 'ios' ? SCALE_SIZE(12) : SCALE_SIZE(5),
        borderRadius: SCALE_SIZE(25),
        height: SCALE_SIZE(74),
        backgroundColor: '#F5FAFF',
        justifyContent: 'center'
    },
    inputHighlighted: {
        borderColor: COLORS.blue,
        borderWidth: 1,
        height: SCALE_SIZE(74),
        paddingHorizontal: SCALE_SIZE(25),
        paddingVertical: Platform.OS == 'ios' ? SCALE_SIZE(12) : SCALE_SIZE(5),
        borderRadius: SCALE_SIZE(25),
    },
    detailContainer: {
        flex: 1.0,
        flexDirection: 'row'
    },
    inputContainer: {
        flex: 1.0
    },
    input: {
        marginTop: Platform.OS == 'ios' ? SCALE_SIZE(5) : 0,
        ...Platform.select({
            android: {
                height: 40
            }
        }),
    },
    iconButton: {
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    icon: {
        height: SCALE_SIZE(24),
        width: SCALE_SIZE(24),
        alignSelf: 'center'
    },
})

export default Input;