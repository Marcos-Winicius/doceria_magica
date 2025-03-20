import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PedidosScreen() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const carregarPedidos = async () => {
      try {
        const pedidosSalvos = await AsyncStorage.getItem("pedidos");
        if (pedidosSalvos) {
          setPedidos(JSON.parse(pedidosSalvos));
        }
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      }
    };

    carregarPedidos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🛍️ Meus Pedidos</Text>
      {pedidos.length === 0 ? (
        <Text style={styles.mensagem}>Nenhum pedido encontrado.</Text>
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.data}>📅 {item.data}</Text>
              <Text style={styles.total}>💰 Total: R$ {item.total}</Text>
              <ScrollView>
                {item.itens.map((produto, index) => (
                  <View key={index} style={styles.produtoContainer}>
                    <Text style={styles.produtoNome}>🛒 {produto.nome}</Text>
                    <Text style={styles.quantidade}>Qtd: {produto.quantidade}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f4f4f4" },
  titulo: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 15, color: "#333" },
  mensagem: { textAlign: "center", fontSize: 18, color: "gray" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  data: { fontSize: 14, fontWeight: "bold", color: "#666" },
  total: { fontSize: 18, fontWeight: "bold", color: "#28a745", marginTop: 5 },
  produtoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  produtoNome: { fontSize: 16, color: "#333" },
  quantidade: { fontSize: 16, fontWeight: "bold", color: "#555" },
});
