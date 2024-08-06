import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Authusertype = {
  acesstoken: string;
  id: string;
  fullName: string;
  email: string;
  profilepic: string;
  gender: string;
};

const AuthContext = createContext<{
  authuser: Authusertype | null;
  setauthuser: Dispatch<SetStateAction<Authusertype | null>>;
}>({
  authuser: null,
  setauthuser: () => {},
});

export const useAuthcontext = () => {
  return useContext(AuthContext);
};

export const Authcontextprovider = ({ children }: { children: ReactNode }) => {
  const [authuser, setauthuser] = useState<Authusertype | null>(null);

  useEffect(() => {
    const fetchAuthuser = async () => {
      try {
        const res = await fetch(
          "https://backend-for-chat-app-b16y.onrender.com/api/auth/me"
        );

        const data = await res?.json();

        setauthuser(data);
      } catch (error) {
        //console.log(error);
      }
    };
    fetchAuthuser();
  }, []);

  return (
    <AuthContext.Provider value={{ authuser, setauthuser }}>
      {children}
    </AuthContext.Provider>
  );
};
