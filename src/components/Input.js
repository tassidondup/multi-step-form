import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

const Input = (props) => {
  const { name, control, ...props } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={(field, props) => (
        <TextField
          variant="outlined"
          margin="normal"
          // inputRef={ref}
          fullWidth
          {...field}
          {...props}
        />
      )}
    />
  );
};

export default Input;
