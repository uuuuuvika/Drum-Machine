import React, { useRef } from "react";

function DrumPad({ src, id }) {

    const audioRef = useRef(null);
    
    function playSound() {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  
    return (
      <button className="drum-pad" onClick={playSound} id={id}>
        <audio src={src} className="clip" ref={audioRef} id={id}></audio>
        {id}
      </button>
    );
  }

export default DrumPad;