import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

const Loading = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View style={{ width: 250, height: 250 }}>
                <LottieView
                    style={{ alignItems: 'center' }}
                    source={require('../../assets/lottie/carLoading.json')}
                    colorFilters={[{
                        keypath: "button",
                        color: "#F00000"
                    }, {
                        keypath: "Sending Loader",
                        color: "#F00000"
                    }]}
                    autoPlay
                    loop
                />
            </View>
        </View>
    )
}

export default Loading