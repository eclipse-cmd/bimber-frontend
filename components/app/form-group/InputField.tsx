import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useField } from "formik";

import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
  type?: string;
  inputIcon: React.ReactNode;
};

const InputField: React.FC<InputFieldProps> = ({ type = "text", ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          {props.inputIcon}
        </InputLeftElement>
        <Input
          {...field}
          type={type}
          id={field.name}
          placeholder={props.placeholder}
        />
      </InputGroup>
      {error ? (
        <FormErrorMessage className="css-first-1kxonj9">
          {error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default InputField;
