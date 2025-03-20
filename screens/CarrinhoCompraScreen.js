import React, { useContext } from "react";
import { 
  View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, Platform
} from "react-native";
import { CarrinhoContexto } from "../context/carrinhoContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


export default function CarrinhoCompraScreen() {
  const { carrinho, limparCarrinho } = useContext(CarrinhoContexto);
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const navigation = useNavigation();

  const finalizarCompra = async () => {
    if (carrinho.length === 0) {
      if (Platform.OS === "web") {
        window.alert("Carrinho vazio! Adicione itens antes de finalizar a compra.");
      } else {
        Alert.alert("Carrinho vazio", "Adicione itens antes de finalizar a compra!");
      }
      return;
    }
  
    const mensagem = `Deseja finalizar sua compra no valor de R$ ${total.toFixed(2)}?`;

    if (Platform.OS === "web") {
      if (window.confirm(mensagem)) {
        await salvarPedido();
        window.alert("Compra realizada! Seu pedido foi confirmado. 😊");
        navigation.navigate("Home");
      }
    } else {
      Alert.alert("Confirmação", mensagem, [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            await salvarPedido();
            Alert.alert("Compra realizada", "Seu pedido foi confirmado! 😊", [
              { text: "OK", onPress: () => navigation.navigate("Home") },
            ]);
          },
        },
      ]);
    }
  };

  const salvarPedido = async () => {
    try {
      const novoPedido = {
        id: new Date().getTime().toString(),
        itens: carrinho,
        total: total.toFixed(2),
        data: new Date().toLocaleString(),
      };
  
      const pedidosSalvos = await AsyncStorage.getItem("pedidos");
      const pedidos = pedidosSalvos ? JSON.parse(pedidosSalvos) : [];
  
      pedidos.push(novoPedido);
      await AsyncStorage.setItem("pedidos", JSON.stringify(pedidos));
  
      limparCarrinho();
    } catch (error) {
      console.error("Erro ao salvar pedido:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seu Carrinho</Text>

      {carrinho.length === 0 ? (
        <Text style={styles.carrinhoVazio}>Seu carrinho está vazio.</Text>
      ) : (
        <FlatList
          data={carrinho}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.imagem} style={styles.imagem} />
              <View style={styles.info}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.quantidade}>Qtd: {item.quantidade}</Text>
                <Text style={styles.preco}>R$ {(item.preco * item.quantidade).toFixed(2)}</Text>
              </View>
            </View>
          )}
        />
      )}

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <TouchableOpacity style={[styles.botao, styles.botaoFinalizar]} onPress={finalizarCompra}>
        <Text style={styles.botaoTexto}>Finalizar Compra</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botao, styles.botaoLimpar]} onPress={limparCarrinho}>
        <Text style={styles.botaoTexto}>Limpar Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  titulo: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  carrinhoVazio: { fontSize: 18, textAlign: "center", color: "#888", marginTop: 20 },
  card: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#fff", 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 10, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  imagem: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
  info: { flex: 1 },
  nome: { fontSize: 18, fontWeight: "bold" },
  quantidade: { fontSize: 16, color: "#555" },
  preco: { fontSize: 16, fontWeight: "bold", color: "#28a745" },
  total: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginVertical: 15 },
  botao: { padding: 12, borderRadius: 8, alignItems: "center", marginVertical: 5 },
  botaoFinalizar: { backgroundColor: "#28a745" },
  botaoLimpar: { backgroundColor: "#dc3545" },
  botaoTexto: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

