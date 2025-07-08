import './js/radio.js';
import {fetcher, getConfig} from './js/fetcher.js';


const d = document.getElementById('category-search');


const loadAppData = async ()=>{
  const cfgList = await getConfig();
  console.log(cfgList)
  d.innerHTML = 'finished loading'
}
loadAppData();


//updateRadios();
