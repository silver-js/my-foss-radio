export const fetcher = async(url, opt)=>{
  try{
    const res = await fetch(url, opt);
    if(res.ok){
      const data = await res.json();
      return {ok: true, data};
    }
    return {ok: false, data: res};
  }
  catch(data){
    return {ok: false, data};
  }
}

export const getConfig = async ()=>{
  const options = {method: 'GET'};
  
  // getting server list
  let serverList = await fetcher(
	  `https://all.api.radio-browser.info/json/servers`,
		options
  );
	if(!serverList.ok){
	  if(!localStorage.serverList){
	    return serverList;
	  }else{
	    serverList = JSON.parse(localStorage.serverList);
	  }
	}else{
	  localStorage.setItem('serverList', JSON.stringify(serverList));
	}
	
	// getting server configs
	let confList = [];
	for(let i = 0; i < serverList.data.length; i++){
    const cfg = await fetcher(
	    `https://${serverList.data[i].name}/json/config`,
	    options
	  );
		if(cfg.ok){
			confList.push(cfg.data)
		}
	}
	if(!confList.length){
	  if(!localStorage.confList){
	    return {ok: false, data: 'Could not get any server config!'}
	  }
		confList = JSON.parse(localStorage.confList);
	}else{
		localStorage.setItem('confList', JSON.stringify(confList));
	}
	return {ok: true, data: confList};
}


// source fetcher

export const getSourceData = async (sUrl)=>{
	try{
		const res = await fetch(`${sUrl}/status-json.xsl`);
		const data = await res.json();
		return data;
	}
	catch(err){
		console.log(err);
		return false;
	}
}
