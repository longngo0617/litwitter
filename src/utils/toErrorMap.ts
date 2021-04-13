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

