import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Image, TextInput, FlatList } from 'react-native'

//CONSTANT
import { COLORS, SCALE_SIZE, STRING, FONT_NAME, SHOW_TOAST } from "../constant";

//COMPONENT
import { Header, ProgressView, PopularItem } from "../component";

//ASSET
import { IMAGES } from "../asset";

//CONTEXT
import { AuthContext, TranslationContext } from "../context";

//API
import { matchMakingHotels } from "../api";

const Search = (props) => {

    const { user } = useContext(AuthContext)

    const translations = useContext(TranslationContext)

    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchResponse, setIsSearchResponse] = useState([]);

    useEffect(() => {
        if (search.length > 5) {
            getSearchFilter()
        }
    }, [search])

    function onBack() {
        props.navigation.goBack()
    }

    async function getSearchFilter() {
        const params = {
            user_id: user?.[0]?.user_id,
            user_session: user?.[0]?.user_session,
            user_session_id: '',
            seacrh_string: search,
        }

        setIsLoading(true)
        const result = await matchMakingHotels(params)
        setIsLoading(false)

        if (result.status) {
            const searchResult = result?.data?.result ?? []
            setIsSearchResponse(searchResult)
        }
        else {
            SHOW_TOAST(result.error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.transparent}>
                <SafeAreaView />
                <Header
                    style={{ backgroundColor: 'transparent' }}
                    onBack={() => onBack()}
                    title={STRING.search} />
                <View style={styles.searchInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        value={search}
                        placeholder={translations.searchhere}
                        placeholderTextColor={COLORS.gray}
                        onChangeText={(text) => {
                            setSearch(text)
                        }}>
                    </TextInput>
                    <Image
                        style={styles.searchImage}
                        resizeMode="contain"
                        source={IMAGES.ic_search} />
                </View>
                    <FlatList data={isSearchResponse}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <PopularItem item={item}
                                    isShowSearchImage={true}
                                    navigation={props.navigation} />
                            )
                        }}>
                    </FlatList>
            </View>
            {isLoading && <ProgressView />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
    },
    searchInputContainer: {
        height: SCALE_SIZE(70),
        backgroundColor: COLORS.lightgray,
        borderRadius: SCALE_SIZE(20),
        marginHorizontal: SCALE_SIZE(30),
        marginTop: SCALE_SIZE(35),
        paddingHorizontal: SCALE_SIZE(28),
        flexDirection: 'row'
    },
    searchInput: {
        fontFamily: FONT_NAME.medium,
        fontSize: SCALE_SIZE(16),
        flex: 1.0
    },
    searchImage: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        alignSelf: 'center'
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#DEDEDE',
        backgroundColor: COLORS.white,
        borderRadius: SCALE_SIZE(10),
        marginTop: SCALE_SIZE(35),
        marginHorizontal: SCALE_SIZE(35),
        padding: SCALE_SIZE(16),
        flexDirection: 'row',
    },
    imageView: {
        height: SCALE_SIZE(117),
        width: SCALE_SIZE(124),
        alignSelf: 'center',
        borderRadius: SCALE_SIZE(20),
        overflow: 'hidden'
    },
    itemText: {
        flex: 1.0,
        marginHorizontal: SCALE_SIZE(16)
    },
    southAmerica: {
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(1)
    },
    discoverButton: {
        height: SCALE_SIZE(31),
        width: SCALE_SIZE(77),
        borderRadius: SCALE_SIZE(24),
        backgroundColor: COLORS.black,
        justifyContent: 'center',
        marginTop: SCALE_SIZE(13),
        marginLeft: SCALE_SIZE(13)
    },
    bookButton: {
        height: SCALE_SIZE(31),
        width: SCALE_SIZE(77),
        borderRadius: SCALE_SIZE(24),
        justifyContent: 'center',
        marginTop: SCALE_SIZE(13),
        marginLeft: SCALE_SIZE(13)
    },
    heartImage: {
        height: SCALE_SIZE(29),
        width: SCALE_SIZE(29),
        alignSelf: 'center',
    },
    starContainer: {
        alignSelf: 'flex-start',
        marginLeft: SCALE_SIZE(17),
        marginTop: SCALE_SIZE(5)
    }
})

export default Search;