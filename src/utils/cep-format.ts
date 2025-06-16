export const cepFormat = (cepRaw: string) => {
  if (!cepRaw || cepRaw.length !== 8) return cepRaw;
  return cepRaw.replace(/(\d{5})(\d{3})/, '$1-$2');
};

export const getCepRaw = (cep: string) => {
  return cep ? cep.replace(/[^\d]+/g, '') : cep;
};

export const isCepValid = (cep: string) => {
  return getCepRaw(cep)?.length === 8;
};
