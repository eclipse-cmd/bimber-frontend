import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";

import React, { InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

type PasswordFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
  showPasswordToggler?: boolean;
};

const CFaLock = chakra(FaLock);
const CFaShow = chakra(FaEye);
const CFaHide = chakra(FaEyeSlash);

const PasswordField: React.FC<PasswordFieldProps> = ({
  showPasswordToggler = true,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isInvalid={!!error}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300">
          <CFaLock color="gray.300" />
        </InputLeftElement>
        <Input
          type={showPassword ? "text" : "password"}
          {...field}
          id={field.name}
          placeholder={props.placeholder}
        />
        {showPasswordToggler && (
          <InputRightElement width="3.5rem">
            <Button
              h="1.75rem"
              bg="none"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <CFaHide color="gray.500" />
              ) : (
                <CFaShow color="gray.500" />
              )}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default PasswordField;
