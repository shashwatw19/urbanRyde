import { ReactNode } from "react"
import UserContext from "./UserContext"
import AuthProvider from "./AuthContext"
import SocketProvider from "./socketContext";
import RideProvider from "./RideContext";
type AppContextProviderProps = {
  children: ReactNode;
};

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  return (
    <AuthProvider>
      <UserContext>
       <SocketProvider>
          <RideProvider>
            {children}
          </RideProvider>
        </SocketProvider>
      </UserContext>
    </AuthProvider>
  );
};

export default AppContextProvider