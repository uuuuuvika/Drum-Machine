function DrumPad ({audioCode, className, id}) {
    return (
        <button className={className} id={id}>
            {audioCode}
        </button>

    )
}

export default DrumPad;