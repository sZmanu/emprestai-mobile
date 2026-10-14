import api from '../../EnderecoApi';

export async function listarEmprestimos() {
    const res = await api.get('/emprestimos');
    return res.data;
}

export async function listarLivros () {
    const res = await api.get('/livros');
    return res.data;
}

export async function listarUsuarios () {
    const res = await api.get('/usuarios');
    return res.data;
}