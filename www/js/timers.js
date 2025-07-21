let timers = [];
export const aniTimer = (fun, step)=>{
  if(step > 0){
    const timer = {
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
    if(timers[i].last + timers[i].step < now){
      timers[i].fun();
      timers[i].last = performance.now();
    }
  }
  requestAnimationFrame(updateTimers);
}
updateTimers();
