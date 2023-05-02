import "./App.css";

import { useState } from "react";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Container from "./Container.js";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App relative ${darkMode ? "dark" : ""}`}>
      <div className="bg-slate-200 dark:bg-veryDarkBlue min-h-screen">
        {/* background img */}
        <div className="bg-desktop-light dark:bg-desktop-dark bg-no-repeat h-96 z-1 absolute w-full"></div>

        {/* main container */}
        <div className="z-100 relative">
          <DndProvider backend={HTML5Backend}>
            <Container toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          </DndProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
