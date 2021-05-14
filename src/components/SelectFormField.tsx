import { FieldProps, getIn } from "formik";
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

export const SelectFormField: React.FC<
  FieldProps & {
    label?: string;
    options: Array<any>;
    categories?: boolean;
    typePublic?: boolean;
  }
> = ({ field, form, label, options, categories, typePublic, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  if (categories) {
    return (
      <FormControl fullWidth error={!!errorText}>
        {label && <InputLabel>{label}</InputLabel>}
        <Select fullWidth {...field} {...props}>
          {options.map((op) => (
            <MenuItem key={op.name} value={typePublic ? op.publicc : op.name}>
              {op.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errorText}</FormHelperText>
      </FormControl>
    );
  }
  return (
    <FormControl fullWidth error={!!errorText}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select fullWidth {...field} {...props}>
        {options.map((op) => (
          <MenuItem key={op.location} value={op.location}>
            {op.location}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};
