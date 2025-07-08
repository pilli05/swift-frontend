import { useContext } from "react";
import AuthLoginContext from "../context/AuthLoginContext";

export const useAuthLogin = () => {
  const context = useContext(AuthLoginContext);
  if (context === undefined) {
    throw new Error("Error");
  }
  return context;
};
