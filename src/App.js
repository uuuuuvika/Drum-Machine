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
	{ sound: Q, pad: "Q", description: "gong" },
	{ sound: W, pad: "W", description: "crunch" },
	{ sound: E, pad: "E", description: "kick" },
	{ sound: A, pad: "A", description: "error" },
	{ sound: S, pad: "S", description: "cev" },
	{ sound: D, pad: "D", description: "robot" },
	{ sound: Z, pad: "Z", description: "clap" },
	{ sound: X, pad: "X", description: "grains" },
	{ sound: C, pad: "C", description: "bomb" }
]

function App() {

	const [pad, setPad] = useState(padObjects);
	const [displayString, setDisplayString] = useState("");
	const [bytesPerMinute, setBytesPerMinute] = useState(0);
	const [clock, setClock] = useState(null);
	const [loopOnSpace, setLoopOnSpace] = useState(false);

	const drumPadsRef = useRef(null);

	useEffect(() => {
		let padsWithLoop;
		padsWithLoop = padObjects.map(obj => Object.assign(obj, { loop: false }));
		function handleKeyDown(event) {
			const key = event.key.toUpperCase();
			if (key === ' ') {
				setLoopOnSpace(!loopOnSpace);
				console.log(loopOnSpace)
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
		const actualInterval = Math.round(1000 / (bytesPerMinute / 60));
		console.log(actualInterval)
		if (clock !== null) {
			clearInterval(clock);
		}
		const newClock = setInterval(() => {
			pad.forEach(p => {
				if (p.loop) {
					let elementToLoop = document.getElementById(`${p.pad}`);
					//elementToLoop.muted=false
					elementToLoop.play();					
					elementToLoop.currentTime = 0;
				}
			});
		}, actualInterval);

		setClock(newClock);

	}, [bytesPerMinute]);


	function handleClick(i, soundCodeKey) {
		if (!loopOnSpace) {
			let singularSound = document.getElementById(`${soundCodeKey}`);
			singularSound.play();
		}
		else {
			pad[i].loop = (!pad[i].loop);
		}
		setPad([...pad]);
		let display = pad[i].description;
		setDisplayString(display);
	}


	return (
		<div id="drum-machine">
			<h6>------ zucchiny 2000 -</h6>
			<div className="working-area">
				<div className="display-with-range">
					<div id="display" className="nes-container">
						<div className="display-inner-text">
							{displayString.length === 0 ? "press space to loop"
								:
								<div>
									{displayString} {bytesPerMinute} b/m
								</div>
							}
						</div>
					</div>
					<div>
						<div className="small-text"><p className="p">30 b/m</p> <p className="press-space-text">tempo</p> <p className="p">200 b/m</p></div>
						<input type="range" className="slider" min="30" max="200" step="20" value={bytesPerMinute} onChange={e => setBytesPerMinute(e.target.value)} />

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
		</div>
	);
}

export default App;
