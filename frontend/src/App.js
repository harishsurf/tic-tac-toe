import React from "react";
import io from "socket.io-client";
import { Layout } from "./components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
const ENDPOINT = "localhost:4000";

function App() {
  const socket = io(ENDPOINT);
  console.log(socket);

  socket.on("message", (msg) => console.log(msg));

  React.useEffect(() => {
    socket.on("message", (msg) => console.log(msg));
  });

  const [startGame, setStartGame] = React.useState(true);

  const initializeGame = () => {
    setStartGame(!startGame);
    socket.on("message", (msg) => console.log(msg));

    // socket.emit("create-session");
  };

  return (
    <div>
      {startGame && (
        <button className="btn btn-success" onClick={() => initializeGame()}>
          Start Game
        </button>
      )}
      {!startGame && <Layout socket={socket}></Layout>}
    </div>
  );
}

export default App;
