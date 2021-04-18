import { FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};

export const formatDate = (date: any) => {
  let d: any = new Date(date);
  d = `${d.getDate()} Tháng ${d.getMonth()} ${d.getFullYear()}`;
  return d;
};

export const formatDate2 = (text: string) => {
  // if(text.includes())
  let d = text.split('/');
  return [d[2], d[1], d[0]].join('-');
};

