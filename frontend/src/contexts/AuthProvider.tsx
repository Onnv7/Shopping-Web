import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { IAuth } from "../interface/models/auth.models";

type AuthType = {
  auth: IAuth;
  setAuth: Dispatch<SetStateAction<IAuth>>;
};

type Props = {
  children: ReactNode;
};

const defaultState = {
  auth: {
    username: null,
    accessToken: null,
  },
  setAuth: (auth: IAuth) => {},
} as AuthType;

export const AuthContext = createContext(defaultState);

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<IAuth>({
    userId: null,
    username: null,
    accessToken: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
