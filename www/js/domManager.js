const createClickableElement = (tag, value, func)=>{
  const e = document.createElement(tag);
  e.innerHTML = value;
  e.addEventListener('click', func);
  return e;
}

export const favButton = (txt, clickFun)=>{
  const pickElement = createClickableElement('li', txt, clickFun);
  return pickElement;
}