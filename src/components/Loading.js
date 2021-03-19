import React from 'react';
import LottieView from 'lottie-react-native';

const Loading = () => {
    return (
        <LottieView
            source={require('../../assets/lottie/carLoading.json')}
            colorFilters={[{
                keypath: "button",
                color: "#F00000"
            }, {
                keypath: "Sending Loader",
                color: "#F00000"
            }]}
            height={100}
            width={100}
            autoPlay
            loop
        />
    )
}

export default Loading