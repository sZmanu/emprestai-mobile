export const formatarDataParaFormulario = (data = '') => {
  const iso = /^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/.exec(data);
  return iso ? `${iso[3]}/${iso[2]}/${iso[1]}` : data;
};

export const formatarDataParaISO = (data, campo = 'publicação') => {
  const partes = /^(\d{2})\/(\d{2})\/(\d{4}|\d{2})$/.exec(data.trim());
  if (!partes) {
    throw new Error(`Informe a data de ${campo} no formato DD/MM/AAAA.`);
  }
  const [, dia, mes, anoInformado] = partes;
  const ano = anoInformado.length === 2 ? `20${anoInformado}` : anoInformado;
  const date = new Date(`${ano}-${mes}-${dia}T00:00:00Z`);
  if (
    date.getUTCFullYear() !== Number(ano) ||
    date.getUTCMonth() + 1 !== Number(mes) ||
    date.getUTCDate() !== Number(dia)
  ) {
    throw new Error(`Informe uma data de ${campo} válida.`);
  }
  return `${ano}-${mes}-${dia}`;
};
