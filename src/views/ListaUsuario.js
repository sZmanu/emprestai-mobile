import React, {useState}from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import useUsuario from '../hooks/useUsuario';
import LinearGradient from 'react-native-linear-gradient'
import CadastrarUsuario from "../componentes/CadastrarUsuario";
import CardUsuario from "../componentes/CardUsuario";

const Usuario = () => {
const { usuarios, loading, atualizarUsuario, cadastrarUsuario, excluirUsuario } = useUsuario();
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const salvarOuAtualizarUsuario = async (usuario) => {
    if (usuarioEditando) {
      await atualizarUsuario(usuarioEditando.id, usuario);
    } else {
      await cadastrarUsuario(usuario);
    }
  };

    return(
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#F5F5DC'}} style={{ flex: 1}}>
            <LinearGradient colors={['#F5F5DC', '#3B82F6']} style={styles.container}>
        <View style={{width: '100%', height: 50, backgroundColor: '#1E3A8A', position: 'absolute',top: 0}}></View>
            <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', rowGap: 15, marginTop: 50, marginBottom: 30}}>
       
        <View style={{flexDirection: 'row', top: 20}}>
        <Text style={styles.title1}>Lista d</Text>
        <Text style={styles.title2}>e Usuários</Text>
        </View>
        <TouchableOpacity onPress={() => {
            setUsuarioEditando(null);
            setModalVisible(true);
          }} style={styles.buttonAdicionar}>
            <Text style={styles.textAdicionar}>Adicionar novo usuário</Text>
          </TouchableOpacity>

         <CadastrarUsuario
            visible={modalVisible}
            setVisible={setModalVisible}
            usuarioEditando={usuarioEditando}
           onSalvar={salvarOuAtualizarUsuario}
          />
        <View style={styles.containerCards}>
        {loading && <ActivityIndicator color="#1E3A8A" />}
        {usuarios.map(usuario => (
            <CardUsuario
            key={usuario.id}
            usuario={usuario}
            onEditar={() => {
                setUsuarioEditando(usuario);
                setModalVisible(true);
            }}
            onExcluir={() => excluirUsuario(usuario.id)}
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
        justifyContent: 'center',
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
export default Usuario;
