import api from "../../EnderecoApi";

export async function AtualizarUsuario(id, usuario) {
    const res = await api.put(`/usuarios/${id}`, usuario);
    return res.data;
}

export async function AtualizarLivro(id, livro) {
    const res = await api.put(`/livros/${id}`, livro);
    return res.data;
}

export async function AtualizarEmprestimo(id, emprestimoAtualizado) {
    const res = await api.put(`/emprestimos/${id}`, emprestimoAtualizado);
    return res.data;
}
