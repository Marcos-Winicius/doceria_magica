import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import CarrinhoCompraScreen from "./screens/CarrinhoCompraScreen";
import { CarrinhoProvider } from "./context/carrinhoContext";
import { Ionicons } from "@expo/vector-icons";
import PedidosScreen from "./screens/PedidosScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <CarrinhoProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            // tabBarStyle: {
            //   backgroundColor: '#5A9BD5', // Cor do fundo da tab bar
            // },
            tabBarIcon: ({ color, size }) => {
              let iconName = route.name === "Home" ? "home" : "cart";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Carrinho" component={CarrinhoCompraScreen} />
          <Tab.Screen name="Pedidos" component={PedidosScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </CarrinhoProvider>
  );
}
