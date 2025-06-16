export const cnpjFormat = (cnpj?: string) => {
  if (!cnpj || cnpj.length !== 14) return cnpj;
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
};
