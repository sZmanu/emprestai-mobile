import api from '../../EnderecoApi';

export async function CadastrarEmprestimo(emprestimo) {
    const res = await api.post('/emprestimos', emprestimo);
    return res.data;
}

export  async function CadastrarLivro(livro) {
    const res = await api.post('/livros', livro);
    return res.data;
}

export async function CadastrarUsuario(usuario) {
    const res = await api.post('/usuarios', usuario);
    return res.data;
}