import "./App.css";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Container from "./Container.js";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </div>
  );
}

export default App;
