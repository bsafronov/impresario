import Header from "./components/header/Header";
import Main from "./components/main/_index/Main";
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
