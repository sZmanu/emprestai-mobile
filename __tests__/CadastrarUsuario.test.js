import React from 'react';
import {Alert, TextInput, TouchableOpacity} from 'react-native';
import {act, create} from 'react-test-renderer';
import CadastrarUsuario from '../src/componentes/CadastrarUsuario';
import CampoData from '../src/componentes/CampoData';

jest.mock('@react-native-community/datetimepicker', () => ({
  __esModule: true,
  default: () => null,
  DateTimePickerAndroid: {open: jest.fn()},
}));

describe('Cadastro de usuário', () => {
  let tela;
  const usuario = {
    id: 7,
    nome: 'Ana',
    email: 'ana@example.com',
    telefone: '11999999999',
    dataNascimento: '1990-05-20',
  };

  afterEach(async () => {
    if (tela) {
      await act(async () => tela.unmount());
    }
    jest.restoreAllMocks();
  });

  async function montar(onSalvar, setVisible) {
    await act(async () => {
      tela = create(
        <CadastrarUsuario
          visible
          usuarioEditando={usuario}
          onSalvar={onSalvar}
          setVisible={setVisible}
        />,
      );
    });
  }

  it('envia os campos do backend e só fecha após o salvamento', async () => {
    let concluir;
    const onSalvar = jest.fn(() => new Promise(resolve => { concluir = resolve; }));
    const setVisible = jest.fn();
    await montar(onSalvar, setVisible);
    expect(tela.root.findByType(CampoData).props.value).toBe('20/05/1990');
    let envio;
    await act(async () => {
      envio = tela.root.findAllByType(TouchableOpacity).find(botao => botao.props.accessibilityLabel === 'Salvar usuário').props.onPress();
    });
    expect(onSalvar).toHaveBeenCalledWith({
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone,
      dataNascimento: usuario.dataNascimento,
    });
    expect(setVisible).not.toHaveBeenCalled();
    expect(tela.root.findAllByType(TouchableOpacity).find(botao => botao.props.accessibilityLabel === 'Salvar usuário').props.disabled).toBe(true);
    await act(async () => { concluir(); await envio; });
    expect(setVisible).toHaveBeenCalledWith(false);
  });

  it('preserva o formulário quando a requisição falha', async () => {
    const alerta = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const setVisible = jest.fn();
    await montar(jest.fn().mockRejectedValue(new Error('Falha de conexão')), setVisible);
    await act(async () => {
      await tela.root.findAllByType(TouchableOpacity).find(botao => botao.props.accessibilityLabel === 'Salvar usuário').props.onPress();
    });
    expect(setVisible).not.toHaveBeenCalled();
    expect(alerta).toHaveBeenCalled();
    expect(tela.root.findAllByType(TextInput)[0].props.value).toBe('Ana');
    expect(tela.root.findAllByType(TouchableOpacity).find(botao => botao.props.accessibilityLabel === 'Salvar usuário').props.disabled).toBe(false);
  });

  it('bloqueia datas impossíveis e anos incompletos antes da requisição', async () => {
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const onSalvar = jest.fn();
    await montar(onSalvar, jest.fn());
    for (const data of ['31/02/1990', '20/05/90']) {
      await act(async () => {
        tela.root.findByType(CampoData).props.onChange(data);
      });
      await act(async () => {
        await tela.root.findAllByType(TouchableOpacity).find(botao => botao.props.accessibilityLabel === 'Salvar usuário').props.onPress();
      });
    }
    expect(onSalvar).not.toHaveBeenCalled();
  });
});
