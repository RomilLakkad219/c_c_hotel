import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native'

//PACKAGES
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//SCREENS
import { SCREENS } from './src/screen';

//PACKAGES
import _ from 'lodash';
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';
import KeyboardManager from 'react-native-keyboard-manager';

//CONSTANT
import { COLORS, SCALE_SIZE } from './src/constant';

const App = (props) => {

  useEffect(() => {
    if (Platform.OS == 'ios') {
      KeyboardManager.setEnable(true);
      KeyboardManager.setKeyboardDistanceFromTextField(30);
    }
  }, [])

  const { Navigator, Screen } = createStackNavigator()

  const toastConfig = {
    success: (props) => (
      <BaseToast {...props}
        style={{ borderLeftColor: 'green' }}
        contentContainerStyle={{ paddingHorizontal: SCALE_SIZE(15) }}
        text1NumberOfLines={3}
        text1Style={{
          fontSize: SCALE_SIZE(16)
        }}>
      </BaseToast>
    ),
    error: (props) => (
      <ErrorToast  {...props}
        text1NumberOfLines={3}
        text1Style={{
          fontSize: SCALE_SIZE(16)
        }}>
      </ErrorToast>
    ),
    info: (props) => (
      <InfoToast {...props}
        style={{ borderLeftColor: COLORS.gray }}
        text1NumberOfLines={3}
        text1Style={{
          fontSize: SCALE_SIZE(16)
        }}>
      </InfoToast>
    )
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Navigator
          initialRouteName={SCREENS.Splash.name}
          screenOptions={{ headerShown: false, gestureEnabled: false, }}>
          {_.toArray(SCREENS).map((item, index) => {
            return item.component ? (
              <Screen
                key={item.name}
                name={item.name}
                component={item.component}
              />
            ) : null;
          })}
        </Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0
  }
})

export default App;