import Header from "./components/header/Header";
import Main from "./components/main/_index/Main";
import { useGameLogic } from "./hooks/gameLogic";

const App = () => {
  useGameLogic();

  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};

export default App;
