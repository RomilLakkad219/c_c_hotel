import { Dimensions } from 'react-native'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

const { width, height } = Dimensions.get('window');

const baseWidth = 430
const baseHeight = 932;

const scaleWidth = width  / baseWidth;
const scaleHeight = (height - (StaticSafeAreaInsets.safeAreaInsetsTop + StaticSafeAreaInsets.safeAreaInsetsBottom)) / baseHeight
const scale = Math.min(scaleWidth, scaleHeight);

const SCALE_SIZE = (size) => {
    return Math.ceil((size * scale))
}

export {
    SCALE_SIZE
}