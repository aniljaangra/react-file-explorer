import "./App.css";
import files from "./data/files.json";
import { Explorer } from "./components/Explorer/Explorer";

function App() {
  return (
    <div className="App">
      <h1>File Explorer</h1>
      <div className="file-explorer">
        <Explorer data={files} />
      </div>
    </div>
  );
}

export default App;
