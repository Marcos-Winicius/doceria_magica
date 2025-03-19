import React, { useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { CarrinhoContexto } from "../context/carrinhoContext";

const doces = [
    { id: "1", nome: "Brigadeiro", preco: 3.50, imagem: require("../assets/brigadeiro.jpg") },
    { id: "2", nome: "Cupcake", preco: 3.00, imagem: require("../assets/cupcake.jpg") },
    { id: "3", nome: "Brownie", preco: 5.00, imagem: require("../assets/brownie.jpg") },
];

export default function HomeScreen() {
    const { carrinho, adicionarAoCarrinho, removerDoCarrinho } = useContext(CarrinhoContexto);
    
    return (
        <View style={styles.container}>
        <FlatList
        data={doces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
            const quantidade = carrinho.find((produto) => produto.id === item.id)?.quantidade || 0;
            
            return (
                <View style={styles.card}>
                <Image source={item.imagem} style={styles.imagem} />
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
                
                <View style={styles.controles}>
                <TouchableOpacity onPress={() => removerDoCarrinho(item.id)} style={styles.botao}>
                <Text style={styles.botaoTexto}>-</Text>
                </TouchableOpacity>
                
                <Text style={styles.quantidade}>{quantidade}</Text>
                
                <TouchableOpacity onPress={() => adicionarAoCarrinho(item)} style={styles.botao}>
                <Text style={styles.botaoTexto}>+</Text>
                </TouchableOpacity>
                </View>
                </View>
            );
        }}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    card: { 
        marginTop: 5,
        alignItems: "center", 
        marginBottom: 20, padding: 10, 
        borderRadius: 10,  
        shadowColor: "#000", // Cor da sombra
        shadowOffset: { width: 0, height: 0 }, // Distância da sombra
        shadowOpacity: 0.25, // Opacidade da sombra
        shadowRadius: 3.5, // Difusão da sombra
        
        // Sombra para Android
        elevation: 5, },
    imagem: { width: '100%', height: 250, marginBottom: 10 },
    text: { fontSize: 16, fontWeight: "bold" },
    botoes: { flexDirection: "row", marginTop: 10 },
    botao: { backgroundColor: "#00B5E2", padding: 10, marginHorizontal: 5, borderRadius: 5 },
    botaoTexto: { color: "#fff", fontSize: 18 },
    controles: {flexDirection: "row", alignItems: "center", padding: 10},
});
