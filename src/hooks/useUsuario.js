import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AtualizarUsuario } from '../services/Atualizar';
import { DeletarUsuario } from '../services/Deletar';
import { buscarUsuario as buscarUsuarioPorId } from '../services/Buscar';
import { CadastrarUsuario } from "../services/Cadastrar";
import { listarUsuarios } from "../services/Listar";

const useUsuario = () => {
    const[usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await listarUsuarios();
                setUsuarios(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                Alert.alert('Erro', 'Não foi possível carregar os usuários.');
            } finally {
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, []);

    const atualizarUsuarios = async () => {
        setLoading(true);
        try {
            const data = await listarUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.error("Erro ao atualizar usuários:", error);
            Alert.alert('Lista desatualizada', 'Não foi possível recarregar a lista de usuários.');
        } finally {
            setLoading(false);
        }
    }; 

    const buscarUsuario = async (id) => {
        setLoading(true);
        try {
            return await buscarUsuarioPorId(id);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const cadastrarUsuario = async (usuario) => {
        setLoading(true);
        try {
            await CadastrarUsuario(usuario);
            await atualizarUsuarios();
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const atualizarUsuario = async (id, usuario) => {
        setLoading(true);
        try {
            await AtualizarUsuario(id, usuario);
            await atualizarUsuarios();
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const excluirUsuario = async (id) => {
        setLoading(true);
        try {
            await DeletarUsuario(id);
            await atualizarUsuarios();
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            Alert.alert('Erro', 'Não foi possível excluir o usuário. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return { usuarios, loading, atualizarUsuarios, cadastrarUsuario, atualizarUsuario, excluirUsuario, buscarUsuario };
};
export default useUsuario;
