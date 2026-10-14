import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { buscarEmprestimo as buscarEmprestimoPorId } from '../services/Buscar';
import { CadastrarEmprestimo } from "../services/Cadastrar";
import { listarEmprestimos } from "../services/Listar";
import { AtualizarEmprestimo } from '../services/Atualizar';

const useEmprestimo = () => {
  const [emprestimos, setEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmprestimos = async () => {
      setLoading(true);
      try {
        const data = await listarEmprestimos();
        setEmprestimos(data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os empréstimos.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmprestimos();
  }, []);

  const cadastrarEmprestimo = async (emprestimo) => {
    setLoading(true);
    try{
      const novoEmprestimo = await CadastrarEmprestimo(emprestimo);
      setEmprestimos(anteriores => [...anteriores, novoEmprestimo]);
      return novoEmprestimo;
    } catch (error) {
      console.error("Erro ao cadastrar empréstimo:", error);
      throw error;
    }finally {
      setLoading(false);
    }
  }

  const buscarEmprestimo = async (id) => {
    setLoading(true);
    try {
      return await buscarEmprestimoPorId(id);
    } catch (error) {
      console.error("Erro ao buscar empréstimo:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const atualizarEmprestimo = async (id, emprestimoAtualizado) => {
    setLoading(true);
    try{
      const data = await AtualizarEmprestimo(id, emprestimoAtualizado);
      setEmprestimos(anteriores => anteriores.map(item => item.id === id ? data : item));
      return data;
    }catch (error) {
      console.error("Erro ao atualizar empréstimo:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const atualizarListaEmprestimos = async () => {
    setLoading(true);
    try {
      const data = await listarEmprestimos();
      setEmprestimos(data);
    } catch (error) {
      console.error("Erro ao atualizar lista de empréstimos:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { emprestimos, cadastrarEmprestimo, atualizarListaEmprestimos, atualizarEmprestimo, buscarEmprestimo, loading };
};

export default useEmprestimo;
