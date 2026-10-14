import api from "../../EnderecoApi";

export async function DeletarUsuario(id) {
    const res = await api.delete(`/usuarios/${id}`);
    return res.data;
}

export  async function DeletarLivro(id) {
    const res = await api.delete(`/livros/${id}`);
    return res.data;
}
