import axios from "axios";


async function getToken() {
    return ''
}

async function getHeaders() {
    const token = ''
    return {
        // Authorization:''+token;
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
}

export async function getRequest(url, params) {
    let headers = await getHeaders();
    try {
        const config = {
            method: 'GET',
            url: url,
            data: params,
            headers: headers
        };
        const response = await axios(config);
        return getResponse(response);
    }
    catch (err) {
        return getError(err);
    }
}

export async function postRequest(url, params) {
    let headers = await getHeaders();
    try {
        const config = {
            method: 'POST',
            url: url,
            data: params,
            headers: headers
        };
        const response = await axios(config);
        return getResponse(response);
    } catch (err) {
        return getError(err)
    }
}

export async function putRequest(url, params) {
    let headers = await getHeaders();
    try {
        const config = {
            method: 'PUT',
            url: url,
            data: params,
            headers: headers,
        };

        const response = await axios(config);
        return getResponse(response);
    } catch (err) {
        return getError(err);
    }
}

const getResponse = async (response) => {
    if (response.status == 200) {
        let result = {
            status: true,
            data: response?.data ?? null,
            error: response?.data?.message ?? '',
        };
        return result;
    } else {
        let result = {
            status: false,
            data: response?.data ?? null,
            error: response?.data?.message ?? 'Something went wrong',
        };
        return result;
    }
};

const getError = (error) => {
    var message = '';
    var obj = null;
    if (error.response) {
        if (error.response.data) {
            obj = error.response.data;
            if (error.response.data.message) {
                message = error.response.data.message;
            } else {
                message = JSON.stringify(error.response.data.message);
            }
        } else {
            obj = error.response;
            message = 'Something went wrong';
        }
    } else {
        obj = error;
        message = error.message;
    }

    let data = {
        status: false,
        data: obj,
        error: message,
        status_code: error?.response?.status ?? '',
    };
    return data;
};