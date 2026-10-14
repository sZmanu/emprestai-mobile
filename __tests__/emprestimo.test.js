import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {act, create} from 'react-test-renderer';
import {montarEmprestimo} from '../src/utils/emprestimo';
import useEmprestimo from '../src/hooks/useEmprestimo';
import {listarEmprestimos, listarLivros, listarUsuarios} from '../src/services/Listar';
import {Alert, TouchableOpacity} from 'react-native';
import CampoData from '../src/componentes/CampoData';
import CadastrarEmprestimoModal from '../src/componentes/CadastrarEmprestimo';
import {CadastrarEmprestimo} from '../src/services/Cadastrar';
import {AtualizarEmprestimo} from '../src/services/Atualizar';

jest.mock('../src/services/Listar', () => ({listarEmprestimos: jest.fn(), listarLivros: jest.fn(), listarUsuarios: jest.fn()}));
jest.mock('../src/services/Cadastrar', () => ({CadastrarEmprestimo: jest.fn()}));
jest.mock('../src/services/Atualizar', () => ({AtualizarEmprestimo: jest.fn()}));
jest.mock('../src/services/Buscar', () => ({buscarEmprestimo: jest.fn()}));
jest.mock('@react-native-community/datetimepicker', () => ({
  __esModule: true,
  default: () => null,
  DateTimePickerAndroid: {open: jest.fn()},
}));

const form = {usuarioId: 1, livroId: 2, dataEmprestimo: '25/09/2026', dataDevolucao: '26/09/2026'};
const hoje = new Date(2026, 8, 25, 12);

it('preenche a edição, mantém o modal na falha e envia o contrato correto', async () => {
  const usuario = {id: 1, nome: 'Ana'};
  const livro = {id: 2, titulo: 'Livro'};
  listarLivros.mockResolvedValue([livro, {id: 4, titulo: 'Outro livro', autor: 'Autor'}]);
  listarUsuarios.mockResolvedValue([usuario, {id: 5, nome: 'Bia', email: 'bia@example.com'}]);
  const alerta = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  const onSalvar = jest.fn().mockRejectedValueOnce(new Error('Sem conexão')).mockResolvedValueOnce({});
  const setVisible = jest.fn();
  let tela;
  await act(async () => {
    tela = create(<CadastrarEmprestimoModal visible setVisible={setVisible} onSalvar={onSalvar}
      emprestimoEditando={{id: 3, usuario, livro, dataEmprestimo: '2099-01-01', dataDevolucao: '2099-01-02'}} />);
  });
  expect(tela.root.findAllByType(CampoData)[0].props.value).toBe('01/01/2099');
  expect(tela.root.findAllByType(Picker).map(item => item.props.selectedValue)).toEqual([2, 1]);
  await act(async () => {
    const seletores = tela.root.findAllByType(Picker);
    seletores[0].props.onValueChange(4);
    seletores[1].props.onValueChange(5);
  });
  const salvar = () => tela.root.findAllByType(TouchableOpacity).find(item => item.props.accessibilityLabel === 'Salvar empréstimo').props.onPress();
  await act(async () => {await salvar();});
  expect(setVisible).not.toHaveBeenCalled();
  expect(alerta).toHaveBeenCalled();
  await act(async () => {await salvar();});
  expect(onSalvar).toHaveBeenLastCalledWith({usuarioId: 5, livroId: 4, dataEmprestimo: '2099-01-01', dataDevolucao: '2099-01-02'});
  expect(setVisible).toHaveBeenCalledWith(false);
  await act(async () => {tela.unmount();});
  alerta.mockRestore();
});

it('envia IDs e datas conforme o contrato do backend', () => {
  expect(montarEmprestimo(form, hoje)).toEqual({usuarioId: 1, livroId: 2, dataEmprestimo: '2026-09-25', dataDevolucao: '2026-09-26'});
});

it.each(['24/09/2026', '25/09/2026', '31/02/2027'])(
  'rejeita devolução inválida: %s', dataDevolucao => {
    expect(() => montarEmprestimo({...form, dataDevolucao}, hoje)).toThrow();
  },
);

it('exige uma seleção com IDs numéricos', () => {
  expect(() => montarEmprestimo({...form, usuarioId: null}, hoje)).toThrow();
  expect(() => montarEmprestimo({...form, livroId: 'Título'}, hoje)).toThrow();
});

it('atualiza a lista compartilhada após cadastrar e editar', async () => {
  listarEmprestimos.mockResolvedValue([]);
  const novo = {id: 3, usuario: {id: 1, nome: 'Ana'}, livro: {id: 2, titulo: 'Livro'}};
  CadastrarEmprestimo.mockResolvedValue(novo);
  AtualizarEmprestimo.mockResolvedValue({...novo, dataDevolucao: '2026-10-01'});
  let hook;
  let tela;
  function Tela() {hook = useEmprestimo(); return null;}
  await act(async () => {tela = create(<Tela />);});
  expect(hook.loading).toBe(false);
  const dados = montarEmprestimo(form, hoje);
  await act(async () => {await hook.cadastrarEmprestimo(dados);});
  expect(CadastrarEmprestimo).toHaveBeenCalledWith(dados);
  expect(hook.emprestimos).toEqual([novo]);
  const edicao = {...dados, dataDevolucao: '2026-10-01'};
  await act(async () => {await hook.atualizarEmprestimo(3, edicao);});
  expect(AtualizarEmprestimo).toHaveBeenCalledWith(3, edicao);
  expect(hook.emprestimos).toHaveLength(1);
  expect(hook.emprestimos[0].dataDevolucao).toBe('2026-10-01');
  expect(hook.loading).toBe(false);
  await act(async () => {tela.unmount();});
});
