function DrumPad ({audioCode, className, id, onClick}) {
    return (
        <button className={className} id={id} onClick={onClick}>
            {audioCode}
        </button>

    )
}

export default DrumPad;