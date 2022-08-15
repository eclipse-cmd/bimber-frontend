import React from "react";
import DefaultHead from "./Head";

interface AuthWrapper {
  children: React.ReactNode;
  title?: string;
}

const AuthWrapper: React.FC<AuthWrapper> = ({ children, title = "" }) => {
  return (
    <>
      <DefaultHead title={title} />
      {children}
    </>
  );
};

export default AuthWrapper;
