import Navbar from "./components/Navbar/Navbar";
import Seats from "./components/Seats/Seats";

import SocketContextProvider from "./context/socketContext";

function App() {
  return (
    <SocketContextProvider>
      <Navbar />
      <Seats />
    </SocketContextProvider>
  );
}

export default App;
