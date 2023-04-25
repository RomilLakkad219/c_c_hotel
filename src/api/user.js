//REQUEST
import { getRequest, postRequest, putRequest } from "./http";

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

export {
    signUp,
    login,
    forgotPassword,
    userProfile,
    updateProfile
}