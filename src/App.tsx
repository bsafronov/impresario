import Main from "./assembler/main/Main";
import Header from "./components/header/Header";
import { useGameWatcher } from "./hooks/gameWatcher/_index";

const App = () => {
  useGameWatcher();

  return (
    <div className="container">
      <Header />
      <Main />
    </div>
  );
};

export default App;
