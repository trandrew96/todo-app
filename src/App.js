import "./App.css";
import { useState } from "react";
import { DndProvider } from "react-dnd";
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
        <div className="bg-desktop-light dark:bg-desktop-dark bg-no-repeat bg-cover h-72 z-1 absolute w-full"></div>

        {/* main container */}
        <div className="z-100 relative">
          <DndProvider backend={HTML5Backend}>
            <Container toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          </DndProvider>
        </div>

        <div className="text-center text-gray-500 py-12">
          <span>Drag and drop to reorder list</span>
        </div>
      </div>
    </div>
  );
}

export default App;
