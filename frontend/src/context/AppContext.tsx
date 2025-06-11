import { ReactNode } from "react"
import UserContext from "./UserContext"
import AuthProvider from "./AuthContext"

type AppContextProviderProps = {
  children: ReactNode;
};

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  return (
    <AuthProvider>
      <UserContext>
        {children}
      </UserContext>
    </AuthProvider>
  );
};

export default AppContextProvider