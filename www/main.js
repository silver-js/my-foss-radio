import './components/navigation.js';
import {getRadioConfig} from './js/fetcher.js';

const updateRadios = async ()=>{
	const radioConf = await getRadioConfig();
	console.log(radioConf);
}
updateRadios();
