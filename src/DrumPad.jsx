
function DrumPad({ src, onClick, i }) {

    const className = (src.loop ? "drum-pad nes-btn is-error" : "nes-btn is-warning drum-pad");

    return (
      <button className={className} onClick={onClick} id={i}>
        <audio src={src.sound} className="clip" id={src.pad} autobuffer = "true"></audio>
        {src.pad}
      </button>
    );
  }

export default DrumPad;