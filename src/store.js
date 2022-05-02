import { createContext } from "react";
import create from "zustand";

export const ZustandContext = createContext({
  isLogin: false,
  userID: null,
  userPW: null,
  login: () => {}
});

export const useStore = create((set) => ({
  isLogin: false,
  userID: null,
  userPW: null,
  login: (id, pw) => set((state) => ({ isLogin: !state.isLogin }))
}));

export const ZustandProvider = ({ children }) => {
  const { isLogin, login } = useStore();

  return (
    <ZustandContext.Provider
      value={{
        isLogin,
        login
      }}
    >
      {children}
    </ZustandContext.Provider>
  );
};