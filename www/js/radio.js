// UI Elements

const elementTag = document.getElementById('audio-element');
const controls = document.querySelectorAll('#audio-controls li');
const infoTag = document.getElementById('audio-info');

// audio methods

let volume = 5;
let audioSource  = '';

const setVolume = ()=>{
	const step = 1 - volume / 10;
	elementTag.volume = step ** 2 - step * 2 + 1;
}

const playPause = (f)=>{
	if(elementTag.paused) f = true;
	elementTag.pause();
	elementTag.src = '';
	if(f && audioSource.length > 3){
		elementTag.src = audioSource;
		elementTag.load();
		elementTag.play();
	}
	return !elementTag.paused
}

// UI

function ctrlClick(id){
	volume = Math.max(0, Math.min(volume + this.value, 10));
	if(this.value == 0){
		this.innerText = playPause() ? 'Stop' : 'Play';		
	}
	setVolume();
	console.log(volume);
}

controls.forEach((ctrl, id)=>{
	ctrl.addEventListener('click', ctrlClick);
})



let radioUrl = 'https://spritelayerradio.com:8010'




let activeRadio = null;
let activeSong = '';
let infoText = '';

const refreshNowPlaying = async ()=>{
	if(radioUrl.length > 3){
		try{
			const res = await fetch(`${radioUrl}/status-json.xsl`);
			const data = await res.json();
			const song = data.icestats.source.yp_currently_playing;
			
			if(song.length > 0 && activeSong !== song){
				activeSong = song;
				infoText = '';
				while(infoText.length < 100){
					infoText += song + '  |  ';
				}
			}
		}
		catch(err){
			console.log(err);
		}
	}
	setTimeout(refreshNowPlaying, 5000);
}
refreshNowPlaying();

let nextInfoUpdate = performance.now() + 300;
const refreshInfo = ()=>{
	const t = performance.now();
	if(t > nextInfoUpdate){
		while (t > nextInfoUpdate){
			nextInfoUpdate +=  300;
		}
		infoText = infoText.slice(1) + infoText.slice(0, 1);
		infoTag.innerText = `Playing: ${infoText}`;
	}
	requestAnimationFrame(refreshInfo);
}
refreshInfo();

const getRadioData = async ()=>{
	try{
		const res = await fetch(`${radioUrl}/status-json.xsl`);
		const data = await res.json();
		activeRadio = data.icestats.source;
		audioSource = activeRadio.listenurl;
		refreshNowPlaying(true);
	}
	catch(err){
		console.log(err);
	}
}
getRadioData()






