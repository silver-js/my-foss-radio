let timers = [{
  step: 1000,
  fun: ()=>{console.log('meh')},
  last: performance.now()
}];
export const aniTimer = (fun, step)=>{
  if(step > 0){
    timer = {
      fun, step,
      last: performance.now()
    };
    timers.push(timer);
  }
}

const updateTimers = ()=>{
  const now = performance.now();
  for(let i = 0; i < timers.length; i++){
    const t = timers[i];
    while(timers[i].last < now){
      timers[i].fun();
      timers[i].last += timers[i].step;
    }
  }
  requestAnimationFrame(updateTimers);
}
updateTimers();