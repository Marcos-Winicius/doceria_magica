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
                                <TouchableOpacity onPress={() => removerDoCarrinho(item.id)} style={styles.botaoMenos}>
                                    <Text style={styles.botaoTexto}>−</Text>
                                </TouchableOpacity>

                                <Text style={styles.quantidade}>{quantidade}</Text>

                                <TouchableOpacity onPress={() => adicionarAoCarrinho(item)} style={styles.botaoMais}>
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
    container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: "#f8f9fa", 
    },

    card: { 
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5, // Sombra para Android
    },

    imagem: { 
        width: "100%", 
        height: 200, 
        borderRadius: 10, 
        marginBottom: 10 
    },

    nome: { 
        fontSize: 20, 
        fontWeight: "bold", 
        color: "#333", 
        marginBottom: 5 
    },

    preco: { 
        fontSize: 18, 
        color: "#27ae60", 
        fontWeight: "bold",
        marginBottom: 10 
    },

    controles: { 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center",
        width: "100%",
        padding: 10 
    },

    botaoMenos: { 
        backgroundColor: "#e74c3c",
        padding: 10,
        borderRadius: 8,
        marginRight: 10,
        minWidth: 40,
        alignItems: "center",
    },

    botaoMais: { 
        backgroundColor: "#2ecc71",
        padding: 10,
        borderRadius: 8,
        marginLeft: 10,
        minWidth: 40,
        alignItems: "center",
    },

    botaoTexto: { 
        color: "#fff", 
        fontSize: 18, 
        fontWeight: "bold" 
    },

    quantidade: { 
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#34495e", 
        minWidth: 40,
        textAlign: "center",
    },
});

