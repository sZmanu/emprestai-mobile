import api from "../../EnderecoApi";

export const buscarUsuario = async (id) => {
    const res = await api.get(`/usuarios/${id}`);
    return res.data;
};

export const buscarLivro = async (id) => {
    const res = await api.get(`/livros/${id}`);
    return res.data;
}
export const buscarEmprestimo = async (id) => {
    const res = await api.get(`/emprestimos/${id}`);
    return res.data;
}