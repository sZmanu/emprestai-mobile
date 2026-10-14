import React, {useEffect, useRef, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  ActivityIndicator,
  Alert,
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import CampoData from './CampoData';
import {listarLivros, listarUsuarios} from '../services/Listar';
import {formatarDataParaFormulario} from '../utils/dataLivro';
import {montarEmprestimo} from '../utils/emprestimo';

const vazio = {
  usuarioId: null,
  livroId: null,
  dataEmprestimo: '',
  dataDevolucao: '',
};

export default function CadastrarEmprestimo({
  visible,
  setVisible,
  onSalvar,
  emprestimoEditando,
  loading = false,
}) {
  const [form, setForm] = useState(vazio);
  const [livros, setLivros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [carregandoListas, setCarregandoListas] = useState(false);
  const enviando = useRef(false);
  const bloqueado = loading || carregandoListas;
  const alterar = (campo, valor) =>
    setForm(anterior => ({...anterior, [campo]: valor}));
  const fechar = () => {
    if (!loading && !enviando.current) {
      setVisible(false);
    }
  };

  useEffect(() => {
    setForm(
      emprestimoEditando
        ? {
            usuarioId: emprestimoEditando.usuario?.id ?? null,
            livroId: emprestimoEditando.livro?.id ?? null,
            dataEmprestimo: formatarDataParaFormulario(
              emprestimoEditando.dataEmprestimo,
            ),
            dataDevolucao: formatarDataParaFormulario(
              emprestimoEditando.dataDevolucao,
            ),
          }
        : {...vazio},
    );
  }, [emprestimoEditando, visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }
    let ativo = true;
    setCarregandoListas(true);
    setLivros([]);
    setUsuarios([]);
    async function carregarListas() {
      try {
        const [listaLivros, listaUsuarios] = await Promise.all([
          listarLivros(),
          listarUsuarios(),
        ]);
        if (ativo) {
          setLivros(listaLivros);
          setUsuarios(listaUsuarios);
        }
      } catch (error) {
        if (ativo) {
          Alert.alert(
            'Erro ao carregar',
            'Não foi possível carregar livros e usuários. Feche e abra o formulário para tentar novamente.',
          );
        }
      } finally {
        if (ativo) {
          setCarregandoListas(false);
        }
      }
    }
    carregarListas();
    return () => {
      ativo = false;
    };
  }, [visible]);

  async function handleSalvar() {
    if (bloqueado || enviando.current) {
      return;
    }
    enviando.current = true;
    try {
      const dados = montarEmprestimo(form);
      if (
        !livros.some(livro => livro.id === dados.livroId) ||
        !usuarios.some(usuario => usuario.id === dados.usuarioId)
      ) {
        throw new Error(
          'Selecione um livro e um usuário disponíveis na lista.',
        );
      }
      await onSalvar(dados);
      setVisible(false);
    } catch (error) {
      Alert.alert(
        'Não foi possível salvar o empréstimo',
        error.response
          ? 'Verifique o livro, o usuário e as datas. A devolução deve ser futura.'
          : error.message,
      );
    } finally {
      enviando.current = false;
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={fechar}>
      <Pressable style={styles.fundo} onPress={fechar}>
        <View style={styles.modal} onStartShouldSetResponder={() => true}>
          <ScrollView keyboardShouldPersistTaps="handled">
            {carregandoListas && <ActivityIndicator color="#1E3A8A" />}
            {!carregandoListas && (!livros.length || !usuarios.length) && (
              <Text>
                É necessário ter livros e usuários disponíveis para seleção.
              </Text>
            )}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Livro:</Text>
              <View
                style={styles.seletor}
                pointerEvents={bloqueado ? 'none' : 'auto'}>
                <Picker
                  accessibilityLabel="Livro"
                  selectedValue={form.livroId}
                  onValueChange={valor => alterar('livroId', valor)}
                  enabled={!bloqueado}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  dropdownIconColor="white">
                  <Picker.Item label="Selecione um livro..." value={null} />
                  {livros.map(livro => (
                    <Picker.Item
                      key={livro.id}
                      label={`${livro.titulo} - ${livro.autor}`}
                      value={livro.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Usuário:</Text>
              <View
                style={styles.seletor}
                pointerEvents={bloqueado ? 'none' : 'auto'}>
                <Picker
                  accessibilityLabel="Usuário"
                  selectedValue={form.usuarioId}
                  onValueChange={valor => alterar('usuarioId', valor)}
                  enabled={!bloqueado}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  dropdownIconColor="white">
                  <Picker.Item label="Selecione um usuário..." value={null} />
                  {usuarios.map(usuario => (
                    <Picker.Item
                      key={usuario.id}
                      label={`${usuario.nome} - ${usuario.email}`}
                      value={usuario.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Data de empréstimo:</Text>
              <CampoData
                label="Data de empréstimo"
                style={styles.input}
                textStyle={styles.texto}
                disabled={bloqueado}
                visible={visible}
                value={form.dataEmprestimo}
                onChange={data => alterar('dataEmprestimo', data)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Data de devolução:</Text>
              <CampoData
                label="Data de devolução"
                style={styles.input}
                textStyle={styles.texto}
                disabled={bloqueado}
                visible={visible}
                value={form.dataDevolucao}
                onChange={data => alterar('dataDevolucao', data)}
              />
            </View>
            <View style={styles.botoes}>
              <TouchableOpacity
                disabled={loading}
                onPress={fechar}
                style={styles.btnCancelar}>
                <Text style={styles.textBtn}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityLabel="Salvar empréstimo"
                disabled={bloqueado || !livros.length || !usuarios.length}
                onPress={handleSalvar}
                style={styles.btnSalvar}>
                <Text style={styles.textBtn}>
                  {loading ? 'Aguarde...' : 'Salvar'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    maxHeight: '80%',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Quicksand SemiBold',
    flexShrink: 1,
    maxWidth: '45%',
    marginRight: 8,
  },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  texto: {color: 'white', fontSize: 16, fontFamily: 'Quicksand Medium'},
  seletor: {flex: 1, minWidth: 0},
  picker: {color: 'white', width: '100%', minHeight: 52},
  pickerItem: {color: 'white', fontSize: 16},
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  btnSalvar: {
    height: 35,
    width: '49%',
    backgroundColor: '#1E3A8A',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCancelar: {
    height: 35,
    width: '49%',
    backgroundColor: '#3B82F6',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    color: 'white',
    fontFamily: 'Quicksand SemiBold',
    fontSize: 19,
  },
  inputContainer: {
    backgroundColor: '#142f5a',
    borderRadius: 8,
    marginHorizontal: 5,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 8,
    minHeight: 52,
  },
});
