import React, { useState, useEffect } from 'react';
import { Alert, Modal, View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, Pressable } from 'react-native';
import CampoData from './CampoData';
import { formatarDataParaFormulario, formatarDataParaISO } from '../utils/dataLivro';


const CadastrarLivro = ({ visible, onClose, onSalvar, livroEditando = null }) => {
  const [form, setForm] = useState({
    titulo: livroEditando?.titulo || '',
    autor: livroEditando?.autor || '',
    dataPublicacao: livroEditando?.dataPublicacao || '',
    sinopse: livroEditando?.sinopse || '',
  });

  const [salvando, setSalvando] = useState(false);
  const alterarCampo = (campo, valor) => {
    setForm(anterior => ({ ...anterior, [campo]: valor }));
  };
  const fechar = () => {
    if (!salvando) { onClose(); }
  };

useEffect(() => {
  setForm({
    titulo: livroEditando?.titulo || '',
    autor: livroEditando?.autor || '',
    dataPublicacao: formatarDataParaFormulario(livroEditando?.dataPublicacao || ''),
    sinopse: livroEditando?.sinopse || '',
  });
}, [livroEditando, visible]);

const salvarLivro = async () => {
  if (salvando) { return; }
  setSalvando(true);
  try {
    if (!form.titulo.trim() || !form.autor.trim()) {
      throw new Error('Preencha o título e o autor.');
    }
    const livro = {
      ...form,
      dataPublicacao: formatarDataParaISO(form.dataPublicacao),
    };

    await onSalvar(livro);
    onClose();
  } catch (error) {
    Alert.alert('Não foi possível salvar o livro', error.response ? 'Verifique os dados e tente novamente.' : error.message);
  } finally {
    setSalvando(false);
  }
  };
    return(
    <Modal visible={visible} transparent animationType="fade" onRequestClose={fechar}>
      <Pressable style={styles.modalBackdrop} onPress={fechar}>
      <View style={styles.CadastrarLivro} onStartShouldSetResponder={() => true}>
      <ScrollView>
        <View style={styles.containerInputs}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Titulo:</Text>
      <TextInput style={styles.input} editable={!salvando} value={form.titulo} onChangeText={texto => alterarCampo('titulo', texto)}/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Autor:</Text>
      <TextInput style={styles.input} editable={!salvando} value={form.autor} onChangeText={texto => alterarCampo('autor', texto)}/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Publicação:</Text>
      <CampoData style={styles.input2} textStyle={styles.textoData} disabled={salvando} visible={visible} value={form.dataPublicacao} onChange={data => alterarCampo('dataPublicacao', data)} label="Data de publicação" />
      </View>
      <View style={styles.inputContainerSipnose}>
        <Text style={styles.label}>Sinopse:</Text>
      <TextInput style={styles.inputSipnose} editable={!salvando} value={form.sinopse} onChangeText={texto => alterarCampo('sinopse', texto)}/>
      </View>
      
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>
        <TouchableOpacity disabled={salvando} onPress={fechar} style={styles.btnCancelar}>
          <Text style={styles.textBtn}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={salvando} onPress={salvarLivro} style={styles.btnSalvar}>
          <Text style={styles.textBtn}>{salvando ? 'Salvando...' : 'Salvar'}</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
      </Pressable>
    </Modal>

    )
}
const styles = StyleSheet.create({
    button: {
      margin: 10,
    },
    CadastrarLivro: {
      paddingVertical: 20,
      width: '78%',
      borderRadius: 10,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },

    input: {
      backgroundColor: '#142f5a',
      borderRadius: 8,
      marginHorizontal: 2,
      color: '#e0e0e0',
      fontFamily: 'Quicksand Medium',
      fontSize: 16,
      width: '80%'
    },
    input2: {
      backgroundColor: '#142f5a3d',
      borderRadius: 8,
      marginHorizontal: 2,
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 8,
      height: 36,
    },
    textoData: {
      color: '#e0e0e0',
      fontFamily: 'Quicksand Medium',
      fontSize: 16,
    },
    inputSipnose: {
      backgroundColor: '#142f5a',
      borderRadius: 8,
      marginHorizontal: 2,
      color: '#e0e0e0',
      fontFamily: 'Quicksand Medium',
      fontSize: 16,
      width: '97%',
      paddingRight: 10
    },
    inputContainerSipnose: {
      backgroundColor: '#142f5a',
      borderRadius: 8,
      marginHorizontal: 5,
      alignItems: 'flex-start',
      paddingLeft: 15,
      height: 150,
      paddingVertical: 10
    },
    containerInputs: {
      rowGap: 15,
      marginBottom: 30
    },
    inputContainer: {
      backgroundColor: '#142f5a',
      borderRadius: 8,
      marginHorizontal: 5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 15,
      height: 42
      
    },
    inputContainerLivro: {
      backgroundColor: '#142f5a',
      borderRadius: 8,
      marginHorizontal: 5,
      alignItems: 'center',
      height:'auto', 
      rowGap: 15,
      paddingVertical: 10,
      paddingLeft: 15,
      
    },
    label: {
      color: '#fffefe',
      fontFamily: 'Quicksand SemiBold',
      fontSize: 16,
    },
    labelLivro: {
      color: 'white',
      fontFamily: 'Quicksand Medium',
      fontSize: 16,
      alignSelf: 'flex-start'
    },
    btnSalvar: {
      height: 35,
      width: '49%',
      backgroundColor: '#1E3A8A',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnCancelar: {
      height: 35,
      width: '49%',
      backgroundColor: '#3B82F6',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'

    },
    textBtn: {
      color: 'white',
      fontFamily: 'Quicksand SemiBold',
      fontSize: 19,

    },
    textPrimary: {
      marginVertical: 20,
      textAlign: 'center',
      fontSize: 20,
    },
    textSecondary: {
      marginBottom: 10,
      textAlign: 'center',
      fontSize: 17,
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
      marginBottom: 15
  
  },
   textAdicionar: {
    fontSize: 20,
    color: '#F5F5DC',
    fontFamily: 'Quicksand Medium',
    bottom: 3,
   }
    });
export default CadastrarLivro;
