import axiosClient from '../api/axios-client'
import AsyncStorage from '@react-native-community/async-storage';

const client = axiosClient()

export const request = async ({ url, method, data }) => {

    method = method.toUpperCase()
    const token = await AsyncStorage.getItem('@token')
    const payload = {
        method, url,
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        data
    }

    return new Promise(async (resolve, reject) => {
        client(payload)
            .then(res => resolve(res))
            .catch(err => {

                if (err.response.status == 401 && err.response.data.message == "TokenExpiredError") {
                    console.log('err', err, err.response.data.message);
                    refresh(token).then(() => {
                        console.log('url', url);
                        request({ url, method, data })
                    }).catch(err => {
                        reject(err)
                    })
                }
                console.log('err :>> ', err);
                reject(err)
            })
    })
};

export const refresh = (token) => {
    const tokenRequest = {
        method: 'GET',
        url: `/auth/refresh-token`,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }
    return new Promise(async (resolve, reject) => {
        client(tokenRequest).then(
            async res => {
                const { token } = res.data;
                await AsyncStorage.setItem('@token', token)
                resolve();
            }
        ).catch(
            err => {
                console.log('error', err);
                reject(err);
            }
        )
    })
}
