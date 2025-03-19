import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';

// Navegação interna
// const Stack = createStackNavigator();
// const stackNav = ()=>{
//   return (
//     <Stack.Navigator initialRouteName='Marcar_Consulta'>
      
//     </Stack.Navigator>
//   )
// }

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Início" 
        component={HomeScreen} 
        options={{ tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        )}}
      />
      {/* <Tab.Screen 
        name="Marcar Consulta" 
        component={stackNav} 
        options={{ tabBarIcon: ({ color, size }) => (
          <Ionicons name="checkmark-circle-outline" color={color} size={size} />
        )}}
      />
      <Tab.Screen 
        name="Contato" 
        component={ContatoScreen} 
        options={{ tabBarIcon: ({ color, size }) => (
          <Ionicons name="call" color={color} size={size} />
        )}}
      /> */}
      
    </Tab.Navigator>
  );
}
