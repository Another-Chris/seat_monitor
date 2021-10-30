import { createContext, useEffect, useState } from "react";
import { connectIo, IO_EVENTS } from "../socket";

export const SocketContext = createContext({});

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    async function connect() {
      try {
        const appSocket = await connectIo();

        appSocket.emit(IO_EVENTS.GET_SEATS_INFO);

        setSocket(appSocket);
      } catch (error) {
        console.log(error);
      }
    }

    connect();
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
