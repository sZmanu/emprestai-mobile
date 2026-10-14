import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import useLivro from '../hooks/useLivro';
import LinearGradient from 'react-native-linear-gradient'
import CardLivro from "../componentes/CardLivro";
import CadastrarLivro from "../componentes/CadastrarLivro";
import VisualizarLivro from '../componentes/VisualizarLivro';

const ListaLivros = () => {
    const { livros, loading, atualizarLivro, cadastrarLivro, excluirLivro } = useLivro();
    const [modalVisible, setModalVisible] = useState(false);
    const [livroEditando, setLivroEditando] = useState(null);
    const [livroVisualizando, setLivroVisualizando] = useState(null);


    const salvarOuAtualizarLivro = async (livro) => {
        if (livroEditando) {
            await atualizarLivro(livroEditando.id, livro);
        } else {
            await cadastrarLivro(livro);
        }
    };

    return(
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#F5F5DC'}} style={{ flex: 1}}>
            <LinearGradient colors={['#F5F5DC', '#3B82F6']} style={styles.container}>
        <View style={{width: '100%', height: 50, backgroundColor: '#1E3A8A', position: 'absolute',top: 0, zIndex: 2}}></View>
            <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', rowGap: 15, marginTop: 50, marginBottom: 30}}>
        <View style={{flexDirection: 'row', top: 20}}>
        <Text style={styles.title1}>Lista d</Text>
        <Text style={styles.title2}>e Livros</Text>
        </View>
        <TouchableOpacity onPress={() => {
                setLivroEditando(null);
                setModalVisible(true);
                }} style={styles.buttonAdicionar}>
            <Text style={styles.textAdicionar}>Adicionar novo livro</Text>
          </TouchableOpacity>
          
          <View style={styles.containerCards}>
          {loading && <ActivityIndicator color="#1E3A8A" />}
          {livros.map((livro) => (
              <CardLivro 
              key={livro.id} 
              livro={livro} 
              onExcluir={() => excluirLivro(livro.id)}
              onVisualizar={() => setLivroVisualizando(livro)}
                onEditar={() => {
                setLivroEditando(livro);
                setModalVisible(true);
              }} />
            ))}
          </View>
          {livroVisualizando && (
                <VisualizarLivro
                livro={livroVisualizando}
                onClose={() => setLivroVisualizando(null)}
                />
            )}
       
        </View>
        </LinearGradient>
        <CadastrarLivro
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSalvar={salvarOuAtualizarLivro}
            livroEditando={livroEditando}
            />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  
    },
    title1: {
        color: '#1E3A8A',
        fontFamily: 'Quicksand SemiBold',
        fontSize: 37
    },
    title2: {
        color: '#3B82F6',
        fontFamily: 'Quicksand SemiBold',
        fontSize: 37
    },
    containerCards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: 10,
        rowGap: 25,
        justifyContent: 'space-between',
        paddingHorizontal: 7,
        marginBottom: 30

    },
    buttonAdicionar: {
      width: 255,
      backgroundColor: '#1E3A8A',
      borderRadius: 10, 
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      shadowColor: 'black',
      borderColor: '#D1D5DB',
      borderWidth: 2,
      marginBottom: 15,
      marginTop: 20
  
  },
   textAdicionar: {
    fontSize: 20,
    color: '#F5F5DC',
    fontFamily: 'Quicksand Medium',
    bottom: 3,
   }
})
export default ListaLivros;
