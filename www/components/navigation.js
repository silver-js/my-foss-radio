/*
const navSection = document.getElementById('nav-section');

// Lists
const list = {
	fav: document.createElement('ul'),
	radio: document.createElement('ul'),
	menu: document.createElement('ul')
};


// Favorites
let favList = [];
if(localStorage.favList){
	favList = JSON.parse(localStorage.favList);
}
const refreshFavList = ()=>{
	list.fav.innerHTML = 'fav list';
	favList.forEach(n=>{
		list.fav.innerHTML = `<li>${JSON.stringify(n)}</li>`;
	})
}
refreshFavList();


// Radios
list.radio.innerHTML = 'radio list';


// Menu
list.menu.innerHTML = 'menu list';


// Buttons
let activeNav = '';
const navClick = (x)=>{
	if(activeNav){
		navSection.removeChild(list[activeNav]);
	}
	navSection.appendChild(list[x]);
	activeNav = x;
}
document.getElementById('fav-nav').addEventListener('click', ()=>{navClick('fav')});
document.getElementById('radio-nav').addEventListener('click', ()=>{navClick('radio')});
document.getElementById('config-nav').addEventListener('click', ()=>{navClick('menu')});
navClick('fav');
*/
