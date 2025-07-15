import {MyFavs} from './components/elements.js';


import audio from './js/radio.js';
import {getConfig, getSourceData} from './js/fetcher.js';


const d = document.getElementById('category-search');


const loadAppData = async ()=>{
  const cfgList = await getConfig();
  console.log('Finished loading config:', cfgList);
}
loadAppData();


//updateRadios();
/*
//UI Elements
const controls = document.querySelectorAll('#audio-controls li');

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








*/
// Radio UI

// Fav List
const favDomList = document.getElementById('fav-list');
const favList = new MyFavs(favDomList, audio.setSource);





const infoTag = document.getElementById('audio-info');



const playBtn = document.getElementById('play-btn');
const handlePlay = async ()=>{
	console.log('play clicked');
	const d = await getSourceData('https://spritelayerradio.com:8010');
	if(d){
		audio.setSource(d.icestats.source.listenurl);
		console.log(d.icestats.source.listenurl);
	}
	console.log(d, audio.state);
}
playBtn.addEventListener('click', handlePlay);



