//REQUEST
import { getRequest, postMultipartRequest, postRequest, putRequest } from "./http";

//CONSTANT
import { WEB_SERVICE } from "../constant";

async function signUp(params) {
    let url = WEB_SERVICE.signUp
    const result = await postRequest(url, params)
    return result
}

async function login(params) {
    let url = WEB_SERVICE.login
    const result = await postRequest(url, params)
    return result
}

async function forgotPassword(params) {
    let url = WEB_SERVICE.forgotPassword
    const result = await postRequest(url, params)
    return result
}

async function userProfile(params) {
    try {
        let url = WEB_SERVICE.userProfile
        const result = await postRequest(url, params)
        return result
    }
    catch (error) {
        console.log(error)
    }
}

async function updateProfile(params) {
    let url = WEB_SERVICE.updateProfile
    const result = await postRequest(url, params)
    return result
}

async function updateUserImage(params) {
    let url = WEB_SERVICE.updateProfile
    const result = await postMultipartRequest(url, params)
    return result
}

async function updateUserSocialProfile(params) {
    let url = WEB_SERVICE.updateUserSocialProfile
    const result = await postRequest(url, params)
    return result
}

async function home(params) {
    let url = WEB_SERVICE.home
    const result = await postRequest(url, params)
    return result
}

async function subscribe(params) {
    let url = WEB_SERVICE.subscribe
    const result = await postRequest(url, params)
    return result
}

async function languageChange(params) {
    let url = WEB_SERVICE.languageChange
    const result = await postRequest(url, params)
    return result
}

async function hotelDetail(params) {
    let url = WEB_SERVICE.hotelDetail
    const result = await postRequest(url, params)
    return result
}

async function getCountry(params) {
    let url = WEB_SERVICE.getCountry
    const result = await postRequest(url, params)
    return result
}

async function getDestinationPlace(params) {
    let url = WEB_SERVICE.destinationPlaces
    const result = await postRequest(url, params)
    return result
}

async function destination(params) {
    let url = WEB_SERVICE.destination
    const result = await postRequest(url, params)
    return result
}

async function getRegion(params) {
    let url = WEB_SERVICE.getRegion
    const result = await postRequest(url, params)
    return result
}

async function getServices(params) {
    let url = WEB_SERVICE.getServices
    const result = await postRequest(url, params)
    return result
}

async function howItWork(params) {
    let url = WEB_SERVICE.howItWork
    const result = await postRequest(url, params)
    return result
}

async function legalNotice(params) {
    let url = WEB_SERVICE.legalNotice
    const result = await postRequest(url, params)
    return result
}

async function aboutDeveloper(params) {
    let url = WEB_SERVICE.aboutDeveloper
    const result = await postRequest(url, params)
    return result
}

async function personalData(params) {
    let url = WEB_SERVICE.personalData
    const result = await postRequest(url, params)
    return result
}

async function blog(params) {
    let url = WEB_SERVICE.blog
    const result = await postRequest(url, params)
    return result
}

async function matchMakinghotels(params) {
    let url = WEB_SERVICE.matchMakingHotels
    const result = await postRequest(url, params)
    return result
}

export {
    signUp,
    login,
    forgotPassword,
    userProfile,
    updateProfile,
    updateUserImage,
    updateUserSocialProfile,
    home,
    subscribe,
    languageChange,
    hotelDetail,
    getCountry,
    getDestinationPlace,
    destination,
    getRegion,
    getServices,
    howItWork,
    legalNotice,
    aboutDeveloper,
    personalData,
    blog,
    matchMakinghotels
}