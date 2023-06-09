import React, {  useEffect } from 'react';
import { View, StyleSheet, Platform, StatusBar, LogBox } from 'react-native'

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

//CONTEXT
import { AuthProvider, TranslationContext, translations } from './src/context';

LogBox.ignoreAllLogs(true)
LogBox.ignoreLogs(["ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package."])

const App = (props) => {


  useEffect(() => {
    if (Platform.OS == 'ios') {
      KeyboardManager.setEnable(true);
      KeyboardManager.setKeyboardDistanceFromTextField(30);
    }
  }, [])

  useEffect(() => {
    translations.setLanguage('en')
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
      <AuthProvider>
        <TranslationContext.Provider value={translations}>
          <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} translucent={false} />
          <NavigationContainer>
            <Navigator
              initialRouteName={SCREENS.Prepare.name}
              screenOptions={{ headerShown: false, gestureEnabled: false }}>
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
        </TranslationContext.Provider>
      </AuthProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0
  }
})

export default App;