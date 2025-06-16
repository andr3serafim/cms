import { monthDictionary } from '@/components/shared/dias-uteis';
import { format, isValid, parse } from 'date-fns';

export const ISODateFormat = 'yyyy-MM-dd' as const;
export const PtBrDateFormat = 'dd/MM/yyyy' as const;

type ValidDateFormats = typeof ISODateFormat | typeof PtBrDateFormat;

export const dateFormatIso = (date: string | Date | undefined) => {
  if (!date) return undefined;
  const dateToFormat = typeof date === 'string' ? parse(date, PtBrDateFormat, new Date(0)) : date;
  return format(dateToFormat, ISODateFormat);
};

export const dateFormatPtBr = (date: string | Date | undefined) => {
  if (!date) return undefined;
  const dateToFormat = typeof date === 'string' ? parse(date, ISODateFormat, new Date(0)) : date;
  return format(dateToFormat, PtBrDateFormat);
};

export const isDateValid = (date: string | Date | undefined, format: ValidDateFormats = PtBrDateFormat) => {
  if (!date) return false;
  const dateToValidate = typeof date === 'string' ? parse(date, format, new Date(0)) : date;
  return isValid(dateToValidate);
};

export const parseDate = (date: string | undefined, format: ValidDateFormats = PtBrDateFormat) => {
  if (!date) return undefined;
  return parse(date, format, new Date(0));
};

export const mesAnoFormat = (date: string, nameMonth: boolean = false) => {
  const dateToFormat = parse(date, ISODateFormat, new Date(0));

  let month: number | string = dateToFormat.getMonth() + 1
  month = nameMonth ? monthDictionary[month] : month
  return `${month}/${dateToFormat.getFullYear()}`
}

export default function getMesAno(defineDay: boolean = false) {

  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month < 10 ? `0${month}` : month}${defineDay ? '-01' : ''}`
}

export function formatDateTime(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
