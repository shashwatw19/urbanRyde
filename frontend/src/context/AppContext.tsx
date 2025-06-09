import { ReactNode } from "react"
import UserContext from "./UserContext"
import AuthContext from "./AuthContext"

type AppContextProviderProps = {
  children: ReactNode;
};

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  return (
    <AuthContext>
      <UserContext>
        {children}
      </UserContext>
    </AuthContext>
  );
};

export default AppContextProvider