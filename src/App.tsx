import Main from "./assembler/main/Main";
import Header from "./components/header/Header";
import { useBodyOverflow } from "./hooks/bodyOverflow/bodyOverflow";
import { useGameWatcher } from "./hooks/gameWatcher/_index";

const App = () => {
  useGameWatcher();
  useBodyOverflow();

  return (
    <div className="container">
      <Header />
      <Main />
    </div>
  );
};

export default App;
