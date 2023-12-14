import 'react-native-get-random-values';
import Home from './src/Screens/Home';
import store from './src/store/store';
import MapScreen from './src/Screens/MapScreen';
import LoginScreen from './src/Screens/LoginScreen';
import CommentsScreen from './src/Screens/CommentsScreen';
import RegistrationScreen from './src/Screens/RegistrationScreen';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastProvider } from 'react-native-toast-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import { LoggedContext } from './src/context';

const MainStack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
    'Roboto': require('./src/assets/fonts/Roboto-Regular.ttf'),
    // prettier-ignore
  });

  if (!fontsLoaded) return null;

  return (
    <LoggedContext.Provider value={{ setIsLoggedIn }}>
      <ToastProvider>
        <Provider store={store.store}>
          <PersistGate
            loading={<Text>Loading...</Text>}
            persistor={store.persistor}
          >
            <NavigationContainer>
              <MainStack.Navigator initialRouteName={Home}>
                {!isLoggedIn && (
                  <MainStack.Screen
                    name="Register"
                    component={RegistrationScreen}
                    options={{ headerShown: false }}
                  />
                )}
                {!isLoggedIn && (
                  <MainStack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                  />
                )}
                {isLoggedIn && (
                  <MainStack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                  />
                )}
                {isLoggedIn && (
                  <MainStack.Screen
                    name="Comments"
                    component={CommentsScreen}
                    options={{ title: 'Коментарі', headerTitleAlign: 'center' }}
                  />
                )}
                {isLoggedIn && (
                  <MainStack.Screen
                    name="Map"
                    component={MapScreen}
                    options={{ headerShown: false }}
                  />
                )}
              </MainStack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </ToastProvider>
    </LoggedContext.Provider>
  );
}
