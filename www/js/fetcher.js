const headers = {
	'User-Agent': 'github.com/silver-js/my-foss-radio', 'Access-Control-Allow-Origin': '*'
}
const getBaseUrls = async ()=>{
	try{
		const res = await fetch(`https://all.api.radio-browser.info/json/servers`, {
			method: "GET",
  			headers: {
    			"Content-Type": "application/json",
				  "Access-Control-Allow-Origin": "*"
  			}
		});
		if(res.ok){
			const data = await res.json();
			return data;
		}
		console.log('Could not fetch radio Urls', res);
		return false
	}
	catch(err){
		console.log('Error on getRadioUrls: ', err);
		return false;
	}
}

const getServerConfig = async (baseUrl)=>{
	try{
		const res = await fetch(`https://${baseUrl}/json/config`, {method: 'GET', headers});
		if(res.ok){
			const data = await res.json();
			return data;
		}
		console.log('Could not fetch config: ', res);
		return false;
	}
	catch(err){
		console.log('Error on getServerConfig', err);
		return false;
	}
}


export const getRadioConfig = async ()=>{
	let serverUrlList = await getBaseUrls();
	if(serverUrlList){
		localStorage.setItem('serverUrlList', JSON.stringify(serverUrlList));
	}else if(localStorage.serverUrlList){
		serverUrlList = JSON.parse(localStorage.serverUrlList);
	}
	let serverConfList = [];
	if(serverUrlList){
		for(let i = 0; i < serverUrlList.length; i++){
			const cfg = await getServerConfig(serverUrlList[i].name);
			if(cfg){
				serverConfList.push(cfg)
			}
		}
	}
	if(serverConfList.length > 0){
		localStorage.setItem('serverConfList', JSON.stringify(serverConfList));
	}else if(localStorage.serverConfList){
		serverConfList = JSON.parse(localStorage.serverConfList);
	}
	if(serverConfList.length){
		return serverConfList;
	}
	return false;
}
