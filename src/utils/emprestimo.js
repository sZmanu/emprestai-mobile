import {formatarDataParaISO} from './dataLivro';

export function montarEmprestimo(form, hoje = new Date()) {
  if (!Number.isSafeInteger(form.usuarioId) || form.usuarioId <= 0 ||
      !Number.isSafeInteger(form.livroId) || form.livroId <= 0) {
    throw new Error('Selecione um livro e um usuário.');
  }
  const dataEmprestimo = formatarDataParaISO(form.dataEmprestimo, 'empréstimo');
  const dataDevolucao = formatarDataParaISO(form.dataDevolucao, 'devolução');
  const diaAtual = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
  if (dataDevolucao <= diaAtual) {
    throw new Error('A data de devolução deve ser posterior a hoje.');
  }
  return {usuarioId: form.usuarioId, livroId: form.livroId, dataEmprestimo, dataDevolucao};
}
