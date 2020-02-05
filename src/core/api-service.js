import axios from 'axios';
import qs from 'qs';
import { setupCache } from 'axios-cache-adapter'

// Create `axios-cache-adapter` instance
const cache = setupCache({
    maxAge: 60 * 1000
});

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

export const axiosGet = (api) => {
    const provider = axios.create({ adapter: cache.adapter });
    return provider.get(api)
        .then(res => ({ data: res.data, status: res.status }))
        .catch(err => err.response);
}

export const axiosGetNoCache = (api) => {
    const provider = axios.create({});
    return provider.get(api)
        .then(res => ({ data: res.data, status: res.status }))
        .catch(err => err.response);
}


export const axiosGetWithToken = (api, token) => {
    const provider = axios.create({ adapter: cache.adapter });

    return provider.get(api, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(res => ({ data: res.data, status: res.status })).catch(err => err.response);
}

export const axiosPost = (api, body) => axios.post(api, body)
    .then(res => ({ data: res.data, status: res.status }))
    .catch(err => err.response);

export const axiosPostWithToken = (api, body, token) => axios.post(
    api, body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
).then(res => ({ data: res.data, status: res.status })).catch(function (error) {
    return error.response;
});

export const axiosPostFormData = (api, body) => axios.post(api, qs.stringify(body), config)
    .then(res => ({ data: res.data, status: res.status }))
    .catch(err => err.response);

export const axiosPut = (api, body) => axios.put(api, body)
    .then(res => ({ data: res.data, status: res.status }))
    .catch(err => err.response);

export const axiosDelete = (api) => axios.delete(api)
    .then(res => ({ data: res.data, status: res.status }))
    .catch(err => err.response);


