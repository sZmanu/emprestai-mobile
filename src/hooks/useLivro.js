import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { CadastrarLivro } from '../services/Cadastrar';
import { AtualizarLivro } from '../services/Atualizar';
import { buscarLivro as buscarLivroPorId } from '../services/Buscar';
import { DeletarLivro } from "../services/Deletar";
import { listarLivros } from "../services/Listar";

const useLivro = () => {
    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLivros = async () => {
            try {
                const data = await listarLivros(); 
                setLivros(data);
            } catch (error) {
                console.error("Erro ao buscar livros:", error);
                Alert.alert('Erro', 'Não foi possível carregar os livros.');
            } finally {
                setLoading(false);
            }
        };
        fetchLivros();
    }, []);

    const atualizarLivros = async () => {
        setLoading(true);
        try {
            const data = await listarLivros();
            setLivros(data);
        } catch (error) {
            console.error("Erro ao atualizar livros:", error);
            Alert.alert('Lista desatualizada', 'Não foi possível recarregar a lista de livros.');
        } finally {
            setLoading(false);
        }
    };

    const buscarLivro = async (id) => {
        setLoading(true);
        try {
            return await buscarLivroPorId(id);
        } catch (error) {
            console.error("Erro ao buscar livro:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const cadastrarLivro = async (livro) => {
        setLoading(true);
        try {
            await CadastrarLivro(livro);
            await atualizarLivros();
        } catch (error) {
            console.error("Erro ao cadastrar livro:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const atualizarLivro = async (id, livro) => {
        setLoading(true);
        try {
            await AtualizarLivro(id, livro);
            await atualizarLivros();
        } catch (error) {
            console.error('Erro ao atualizar livro:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const excluirLivro = async (id) => {
        setLoading(true);
        try {
            await DeletarLivro(id);
            await atualizarLivros();
        } catch (error) {
            console.error("Erro ao excluir livro:", error);
            Alert.alert('Erro', 'Não foi possível excluir o livro. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    return { livros, loading, atualizarLivros, atualizarLivro, excluirLivro, cadastrarLivro, buscarLivro };
};
export default useLivro;
