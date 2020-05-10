import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View } from 'react-native';

import List from './screens/List';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ backgroundColor: '#FAFAFA', flex: 1 }}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator mode="modal" headerMode="float">
          <Stack.Screen
            name="List"
            component={List}
            options={{
              title:
                'Directory - by AtilaDev | easy & quick search to find @expo-google-fonts',
              headerStyle: {
                backgroundColor: '#4A148C',
                borderBottomColor: '#4A148C',
              },
              headerTintColor: '#CCCCCC',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
