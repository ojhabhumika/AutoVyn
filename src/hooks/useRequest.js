import { request } from "../helpers/Network"
import { Alert } from 'react-native';

export default () => {
    const makeRequest = async ({ url, method, body, onSuccess, onFailure }) => {
        try {
            
            const response = await request({
                url, 
                method,
                data: body
            })

            if (onSuccess) {
                onSuccess(response.data)
            }

            return response.data

        } catch (err) {
            
            console.log('error', err);
            if (onFailure) {
                onFailure(err)
            }
            // if (err.response.status >= 500) {
            //     Alert.alert('Something went wrong')
            // }
        }
    }

    return { makeRequest }
}