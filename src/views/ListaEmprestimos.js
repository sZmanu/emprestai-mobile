import React, {useState }from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient'
import CardEmprestimoLivro from "../componentes/CardEmprestimoLivro";
import CadastrarEmprestimo from "../componentes/CadastrarEmprestimo";
import useEmprestimo from "../hooks/useEmprestimo";

const ListaEmprestimos = () => {
  const { emprestimos, cadastrarEmprestimo, atualizarEmprestimo, loading } = useEmprestimo();
  const [modalVisible, setModalVisible] = useState(false);
  const [emprestimoEditando, setEmprestimoEditando] = useState(null);

  const salvarEmprestimo = async (dados) => {
    if (emprestimoEditando) {
      await atualizarEmprestimo(emprestimoEditando.id, dados);
    } else {
      await cadastrarEmprestimo(dados);
    }
  };

    return(
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#F5F5DC'}} style={{ flex: 1}}>
            <LinearGradient colors={['#F5F5DC', '#3B82F6']} style={styles.container}>
        <View style={{width: '100%', height: 50, backgroundColor: '#1E3A8A', position: 'absolute',top: 0}}></View>
            <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', rowGap: 15, marginTop: 50, marginBottom: 30}}>
       
        <View style={{flexDirection: 'row', top: 20}}>
        <Text style={styles.title1}>Lista d</Text>
        <Text style={styles.title2}>e Empréstimos</Text>
        </View>
        <TouchableOpacity
        onPress={() => {
        setEmprestimoEditando(null);
        setModalVisible(true);
    }} style={styles.buttonAdicionar}>
        <Text style={styles.textAdicionar}>Adicionar novo empréstimo</Text>
        </TouchableOpacity>
        
        <CadastrarEmprestimo
        visible={modalVisible}
        setVisible={setModalVisible}
        emprestimoEditando={emprestimoEditando}
        onSalvar={salvarEmprestimo}
        loading={loading}
        />
        <View style={styles.containerCards}>
        {loading && <ActivityIndicator color="#1E3A8A" />}
        {emprestimos.map(emprestimo => (
          <CardEmprestimoLivro
            key={emprestimo.id}
            emprestimo={emprestimo}
            //onDevolver={}
            onEditar={() => {
              setEmprestimoEditando(emprestimo);
              setModalVisible(true);
            }}
          />
        ))}
        </View>
        </View>
       </LinearGradient>
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
      width: 290,
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
export default ListaEmprestimos;
