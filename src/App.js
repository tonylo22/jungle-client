import { useState, useEffect } from 'react';
import Board from './components/board/board.component';
import Panel from './components/panel/panel.component';
import MobilePanel from './components/mobile-panel/mobile-panel.component';
import './App.css';

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 600;

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div>
      {width <= breakpoint && <MobilePanel />}
      <div className="main-wrapper">
        <Board />
        {width > breakpoint && <Panel />}
      </div>
    </div>
  );
}

export default App;
