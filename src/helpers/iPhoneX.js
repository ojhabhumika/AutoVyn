import { Platform, Dimensions } from "react-native"

export const isIphoneX = (() => {
    const { height, width } = Dimensions.get('window')
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((height === 812 || width === 812) || (height === 896 || width === 896))
    )
})

export const isSmallDevice = (() => {
    const { height } = Dimensions.get('window')
    return (
        height <= 534
    )
})