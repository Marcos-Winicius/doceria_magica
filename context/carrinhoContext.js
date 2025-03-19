import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CarrinhoContexto = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  
  useEffect(() => {
    async function carregarCarrinho() {
      const data = await AsyncStorage.getItem("carrinho");
      if (data) {
        setCarrinho(JSON.parse(data));
      }
    }
    carregarCarrinho();
  }, []);

  
  useEffect(() => {
    AsyncStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  
  function adicionarAoCarrinho(doce) {
    setCarrinho((prev) => {
      const novoCarrinho = [...prev];
      const index = novoCarrinho.findIndex((item) => item.id === doce.id);
      
      if (index !== -1) {
        novoCarrinho[index].quantidade += 1;
      } else {
        novoCarrinho.push({ ...doce, quantidade: 1 });
      }
      
      return novoCarrinho;
    });
  }

  
  function removerDoCarrinho(id) {
    setCarrinho((prev) => {
      const novoCarrinho = prev.map(item => 
        item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
      ).filter(item => item.quantidade > 0);
      
      return novoCarrinho;
    });
  }

  function limparCarrinho() {
    setCarrinho([]); // Zera o carrinho
  }

  return (
    <CarrinhoContexto.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}>
      {children}
    </CarrinhoContexto.Provider>
  );
}
