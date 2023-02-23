import { useState } from 'react';
import './App.css';
import DrumPad from './DrumPad';

//const buttons = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"]
function App() {
  const [pad, setPad] = useState(["Q", "W", "E", "A", "S", "D", "Z", "X", "C"]);

  return (
    <div className="App" id="drum-machine">
      <div id="display">
      </div>
      <>
        {pad.map((audioCode, i) => {
          return (
            <DrumPad
              className={"drum-pad"}
              key={i}
              id={"" + audioCode}
              audioCode={audioCode}>
            </DrumPad>)
        })}
      </>
    </div>
  );
}

export default App;
