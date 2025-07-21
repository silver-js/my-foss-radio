// This module should return various html elements to fill the navigation list

const appendBasicElement = (p, tag, iHTML)=>{
	const x = document.createElement(tag);
	if(iHTML) x.innerHTML = iHTML;
	p.appendChild(x);
	return x;
}



// Favorites

// storage management

const favData = new function(){
	let favData = localStorage.myFavs ? JSON.parse(localStorage.myFavs) : [];
	this.get = ()=>{
		return favData;
	}
	this.save = ()=>{
		localStorage.myFavs = JSON.stringify(favData);
	}
	this.add = (name, url)=>{
		const aItem = favData.findIndex(n=>{
			if(n.url === url){
				return true;
			}
			return false;
		})
		if(aItem >= 0){
			return false;
		}
		favData.push({name, url});
		this.save();
		return true;
	}
	this.remove = (url)=>{
		const rItem = favData.findIndex(n=>{
			if(n.url === url){
				return true;
			}
			return false;
		})
		if(rItem >= 0){
			favData.splice(rItem, 1);
			this.save();
			return true;
		}
		return false;
	}
	this.rename = (name, url)=>{
		const rItem = favData.findIndex(n=>{
			if(n.url === url){
				return true;
			}
			return false;
		})
		if(rItem >= 0){
			favData[rItem].name = name;
			this.save();
			return true;
		}
		return false;
	}
}

favData.add('SpriteLayer Radio' ,'https://spritelayerradio.com/listen/spritelayer_video_game_radio/all');	// just a test value


const favMenu = new function(){
	let activeItem = null;
	const fMenuCheck = document.getElementById('toggle-fav-menu');
	const fMenuList = document.getElementById('fav-menu-list');
	const rename = appendBasicElement(fMenuList, 'li', '&#9998; Rename');
	rename.addEventListener('click', ()=>{
		const newName = prompt('Rename:', activeItem.name)
		if(newName && newName.length){
			favData.rename(newName.replaceAll('<', '&lt'), activeItem.url);
			this.update();
		}
		fMenuCheck.checked = false;
	});
	const del = appendBasicElement(fMenuList, 'li', '&#10008; Delete');
	del.addEventListener('click', ()=>{
		const ok = confirm(`Delete "${activeItem.name}"?`);
		if(ok){
			favData.remove(activeItem.url);
			this.update();
		}
		fMenuCheck.checked = false;
	});
	this.on = (x)=>{
		activeItem = x;
		fMenuCheck.checked = true;
	}
	this.update = ()=>{}
}

export function MyFavs(fDomList, clickFun){
	const refreshList = ()=>{
		fDomList.innerHTML = '';
		favData.get().forEach(fItem=>{
			const fBtn = appendBasicElement(fDomList, 'li');
			fBtn.classList.add('fav-button');
			const title = appendBasicElement(fBtn, 'h3', fItem.name);
			const more = appendBasicElement(fBtn, 'div', '&#9776');
			title.addEventListener('click', ()=>{clickFun(fItem.url)});
			more.addEventListener('click', ()=>{favMenu.on({name: fItem.name, url: fItem.url})})
		});
	}
	favMenu.update = refreshList;
	refreshList();
}

export function SourceSection(){
  
}