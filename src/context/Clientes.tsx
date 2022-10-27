import { createContext, ReactNode, useContext, useEffect } from "react";

type ClienteProviderProps = {
  children: ReactNode;
};

type ContextTypes = {
  oii: string;
}

const ClienteContext = createContext({} as ContextTypes);

export default function Clientes({ children }: ClienteProviderProps) {
  
  const oii = "Oii";

  return (
    <ClienteContext.Provider value={{ oii }}>
      {children}
    </ClienteContext.Provider>
  );
}


export const useCliente = () => {
  const context = useContext(ClienteContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}


