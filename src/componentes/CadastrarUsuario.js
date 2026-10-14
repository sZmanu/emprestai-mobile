import React, {useState, useEffect} from 'react';
import {
  Alert,
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import CampoData from './CampoData';
import {
  formatarDataParaFormulario,
  formatarDataParaISO,
} from '../utils/dataLivro';

const CadastrarUsuario = ({visible, setVisible, usuarioEditando, onSalvar}) => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
  });
  const [salvando, setSalvando] = useState(false);
  const alterarCampo = (campo, valor) => {
    setForm(anterior => ({...anterior, [campo]: valor}));
  };
  const fechar = () => {
    if (!salvando) {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (usuarioEditando) {
      setForm({
        nome: usuarioEditando.nome || '',
        email: usuarioEditando.email || '',
        telefone: usuarioEditando.telefone || '',
        dataNascimento: formatarDataParaFormulario(
          usuarioEditando.dataNascimento || '',
        ),
      });
    } else {
      setForm({
        nome: '',
        email: '',
        telefone: '',
        dataNascimento: '',
      });
    }
  }, [usuarioEditando, visible]);

  const handleSalvar = async () => {
    if (salvando) {
      return;
    }
    setSalvando(true);
    try {
      if (!form.nome.trim() || !form.email.trim()) {
        throw new Error('Preencha o nome e o e-mail.');
      }
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(form.dataNascimento.trim())) {
        throw new Error(
          'Informe a data de nascimento no formato DD/MM/AAAA, com o ano completo.',
        );
      }
      await onSalvar({
        nome: form.nome.trim(),
        email: form.email.trim(),
        telefone: form.telefone.trim(),
        dataNascimento: formatarDataParaISO(form.dataNascimento, 'nascimento'),
      });
      setVisible(false);
    } catch (error) {
      Alert.alert(
        'Não foi possível salvar o usuário',
        error.response
          ? 'Verifique os dados e tente novamente.'
          : error.message,
      );
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={{marginTop: 40}}>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={fechar}>
        <Pressable style={styles.modalBackdrop} onPress={fechar}>
          <View
            style={styles.CadastrarLivro}
            onStartShouldSetResponder={() => true}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={styles.containerInputs}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Nome:</Text>
                  <TextInput
                    style={styles.input}
                    editable={!salvando}
                    value={form.nome}
                    onChangeText={texto => alterarCampo('nome', texto)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>E-mail:</Text>
                  <TextInput
                    style={styles.input}
                    editable={!salvando}
                    value={form.email}
                    onChangeText={texto => alterarCampo('email', texto)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Telefone:</Text>
                  <TextInput
                    style={styles.input}
                    editable={!salvando}
                    value={form.telefone}
                    onChangeText={texto => alterarCampo('telefone', texto)}
                    keyboardType="phone-pad"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Data de nascimento:</Text>
                  <CampoData
                    style={styles.input2}
                    textStyle={styles.textoData}
                    disabled={salvando}
                    visible={visible}
                    value={form.dataNascimento}
                    onChange={data => alterarCampo('dataNascimento', data)}
                    label="Data de nascimento"
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 5,
                }}>
                <TouchableOpacity
                  accessibilityLabel="Salvar usuário"
                  disabled={salvando}
                  onPress={handleSalvar}
                  style={styles.btnSalvar}>
                  <Text style={styles.textBtn}>
                    {salvando ? 'Salvando...' : 'Salvar'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={salvando}
                  onPress={fechar}
                  style={styles.btnCancelar}>
                  <Text style={styles.textBtn}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  CadastrarLivro: {
    maxHeight: '80%',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 52,
    paddingHorizontal: 8,
    paddingVertical: 10,
    color: 'white',
    fontFamily: 'Quicksand Medium',
    fontSize: 16,
  },
  input2: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
    minHeight: 52,
  },
  textoData: {
    color: 'white',
    fontFamily: 'Quicksand Medium',
    fontSize: 16,
  },
  containerInputs: {
    rowGap: 12,
    marginBottom: 24,
    marginTop: 12,
  },
  inputContainer: {
    backgroundColor: '#142f5a',
    borderRadius: 8,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 8,
    minHeight: 52,
  },
  inputContainerLivro: {
    backgroundColor: '#374151',
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    paddingLeft: 20,
    height: 'auto',
    rowGap: 15,
    paddingVertical: 10,
  },
  label: {
    color: 'white',
    fontFamily: 'Quicksand SemiBold',
    fontSize: 16,
    flexShrink: 1,
    maxWidth: '45%',
    marginRight: 8,
  },
  labelLivro: {
    color: 'white',
    fontFamily: 'Quicksand Medium',
    fontSize: 16,
    alignSelf: 'flex-start',
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
    width: 270,
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
  },
  textAdicionar: {
    fontSize: 20,
    color: '#F5F5DC',
    fontFamily: 'Quicksand Medium',
    bottom: 3,
  },
});
export default CadastrarUsuario;
