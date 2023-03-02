import React, { useRef, useEffect, useState } from "react";
import './App.css';
import DrumPad from './DrumPad';
import Q from './accets/gongdead.wav';
import W from './accets/44click8.wav';
import E from './accets/kick.mp3';
import A from './accets/44gesture1.wav';
import S from './accets/cev.mp3';
import D from './accets/robotstep1.wav';
import Z from './accets/44clickB2.wav';
import X from './accets/44click6.wav';
import C from './accets/explosion2.wav';

const padObjects = [
	{ sound: Q, pad: "Q" },
	{ sound: W, pad: "W" },
	{ sound: E, pad: "E" },
	{ sound: A, pad: "A" },
	{ sound: S, pad: "S" },
	{ sound: D, pad: "D" },
	{ sound: Z, pad: "Z" },
	{ sound: X, pad: "X" },
	{ sound: C, pad: "C" }
]

function App() {

	const [pad, setPad] = useState(padObjects);
	const [displayString, setDisplayString] = useState("press space to loop");
	const [intervalValue, setIntervalValue] = useState(0);
	const [clock, setClock] = useState(null);
	const [loopOnSpace, setLoopOnSpace] = useState(false);

	const drumPadsRef = useRef(null);

	useEffect(() => {
		let padsWithLoop;
		padsWithLoop = padObjects.map(obj => Object.assign(obj, { loop: false }));

		function handleKeyDown(event) {
			const key = event.key.toUpperCase();
			if (key === ' ') {
				setLoopOnSpace(!loopOnSpace)
			}
			else {
				const drumPad = drumPadsRef.current.querySelector(`#${key}`);
				if (drumPad) {
					drumPad.click();
				}
			}
		}
		document.addEventListener("keydown", handleKeyDown);
		setPad(padsWithLoop);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [loopOnSpace]);

	useEffect(() => {

		if (clock !== null) {
			clearInterval(clock);
		}
		const newClock = setInterval(() => {
			pad.forEach(p => {
				if (p.loop) {
					let x = document.getElementById(`${p.pad}`);
					console.log(x);
					x.currentTime = 0;
					x.play();
				}
			});
		}, intervalValue);

		setClock(newClock);

	}, [intervalValue]);


	function handleClick(i, soundCodeKey) {
		if (!loopOnSpace) {
			let singularSound = document.getElementById(`${soundCodeKey}`);
			singularSound.play()
		}
		else {
			pad[i].loop = (!pad[i].loop);
		}
		setPad([...pad]);
		let display = pad[i].pad;
		setDisplayString(display);
	}

	return (
		<div className="App nes-container" id="drum-machine">
			<div className="display-with-range">
				<div id="display" className="nes-container">
					<p>{displayString}</p>
				</div>
				<div>
					<input type="range" className="slider" min="0" max="1000" value={intervalValue} onChange={e => setIntervalValue(e.target.value)} />
					<p className="press-space-text">tempo</p>
				</div>
			</div>
			<div className="drum-pads" ref={drumPadsRef}>
				{pad.map((pad, i) => {
					return (
						<DrumPad
							i={i}
							key={i}
							src={pad}
							onClick={() => { handleClick(i, pad.pad) }}>
						</DrumPad>)
				})}
			</div>
		</div>
	);
}

export default App;
