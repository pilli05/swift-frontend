import React from "react";

interface IAddress {
  street: string;
  suite: string;
  city: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  address: IAddress;
  phone: number;
}

interface AuthLoginContextProps {
  userDetails: IUser;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
}

const AuthLoginContext = React.createContext<AuthLoginContextProps | undefined>(
  undefined
);

export const AuthLoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userDetails, setUserDetails] = React.useState<IUser>({
    name: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
    },
    phone: 0,
    id: 0,
  });

  return (
    <AuthLoginContext.Provider
      value={{
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </AuthLoginContext.Provider>
  );
};

export default AuthLoginContext;
