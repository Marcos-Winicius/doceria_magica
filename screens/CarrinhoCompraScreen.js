import React, { useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { CarrinhoContexto } from "../context/carrinhoContext";

export default function CarrinhoCompraScreen() {
  const { carrinho, limparCarrinho } = useContext(CarrinhoContexto);
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);


  return (
    <View style={styles.container}>
      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.imagem} style={styles.imagem} />
            <Text style={styles.nome}>{item.nome} (x{item.quantidade})</Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Finalizar Compra</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={limparCarrinho}>
        <Text style={styles.botaoTexto}>Limpar Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { flexDirection: "row", alignItems: "center", padding: 10 },
  imagem: { width: 50, height: 50, marginRight: 10 },
  nome: { fontSize: 18 },
  total: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  botao: { backgroundColor: "#28a745", padding: 10, borderRadius: 5, alignItems: "center" },
  botaoTexto: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
