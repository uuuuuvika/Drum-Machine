
function DrumPad({ src, onClick, i }) {

    const className = (src.loop ? "drum-pad nes-btn dark" : "nes-btn drum-pad");

    return (
      <button className={className} onClick={onClick} id={i}>
        <audio src={src.sound} className="clip" id={src.pad}></audio>
        {src.pad}
      </button>
    );
  }

export default DrumPad;