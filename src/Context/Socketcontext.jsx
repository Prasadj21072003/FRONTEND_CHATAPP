import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthcontext } from "./Authcontext";
import io from "socket.io-client";

const SocketContext = createContext(undefined);

export const usesocketcontext = () => {
  return useContext(SocketContext);
};

const socketurl = "https://backend-for-chat-app-b16y.onrender.com";

export const Socketcontextprovider = ({ children }) => {
  var socketstate = null;
  const [onilneusers, setonlineusers] = useState([]);
  const { authuser } = useAuthcontext();

  useEffect(() => {
    const fetchonlineuser = async () => {
      try {
        if (authuser) {
          console.log("authuser :" + authuser.id);
          const socket = io(socketurl, {
            query: {
              userId: authuser.id,
            },
          });

          socketstate = socket;

          socket.on("getOnlineUsers", (users) => {
            setonlineusers(users);
          });

          return () => {
            socket.close();
            socketstate = null;
          };
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchonlineuser();
  }, [authuser]);

  return (
    <SocketContext.Provider value={{ socket: socketstate, onilneusers }}>
      {children}
    </SocketContext.Provider>
  );
};
