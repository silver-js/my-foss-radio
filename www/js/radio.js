const myAudio = new Audio();
let activeRadio = null;

myAudio.addEventListener('loadeddata',()=>{
	console.log('loaded');
});

myAudio.volume = .5;

// Play State
let state = false;
const audioStart = async ()=>{
	myAudio.src = activeRadio.listenurl;
	await myAudio.load();
	await myAudio.play();
	state = !myAudio.paused;
}
const audioStop = ()=>{
	myAudio.pause();
	myAudio.src = '';
	state = false;
}
const playPause = async ()=>{
	if(myAudio.paused && activeRadio.listenurl){
		await audioStart();
	}else{
		audioStop();
	}
	return !myAudio.paused
}

// Volume Control
const setVolume = (volume)=>{
	if(!volume){
		audioStop();
		myAudio.volume = 0;
	}else{
	  if(myAudio.paused){
		  audioStart();
	  }
		const step = 1 - volume * .1;
		myAudio.volume = step ** 2 - step * 2 + 1;
	}
	console.log(myAudio.volume);
}

// Audio Source

const getRadioData = async (url)=>{
	const urlArr = url.split('/');
	if(urlArr[0] === 'http:'){
		urlArr[0] = 'https:';
	}
	// icecast
	try{
		console.log(urlArr);
		const iceUrl = urlArr.slice(0,-1).join('/');
		const res = await fetch(`${iceUrl}/status-json.xsl`);
		const data = await res.json();
		const radioData = data.icestats.source[0] ? data.icestats.source[0] : data.icestats.source;
		radioData.type = 'icecast';
		return radioData;
	}
	catch(err){
		console.log(err);
	}
	// shoutcast
	

	// plain
	return {listenurl: url}
}

const setSource = async (sData)=>{
	const src = sData.split(',');
	if(src[0].length > 3){
		const rData = await getRadioData(src[0]);
		activeRadio = rData;
		audioStop();
		await playPause();
	}
}

const data = ()=>{
	return {
		activeRadio,
		state
	}
}

export default{setSource, setVolume, playPause, data}
