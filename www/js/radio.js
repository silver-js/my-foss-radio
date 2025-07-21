const myAudio = new Audio();
myAudio.addEventListener('loadeddata',()=>{
	console.log('loaded');
});
myAudio.volume = .5;
let audioSource  = '';

// Play State
let state = false;
const audioStart = async ()=>{
	myAudio.src = audioSource;
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
	if(myAudio.paused && audioSource.length > 3){
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
const setSource = async (src)=>{
	audioStop();
	audioSource = src;
	await playPause();
}

export default{setSource, setVolume, playPause, state}
