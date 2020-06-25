export function detectSwipe(el, swipeCallback) {
  const swipe_det = new Object();
  const velocityThreshhold = 0.4;
  swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  const min_x = 30;  //min x swipe for horizontal swipe
  const max_x = 30;  //max x difference for vertical swipe
  const min_y = 50;  //min y swipe for vertical swipe
  const max_y = 60;  //max y difference for horizontal swipe
  let direction = "";
  let velocity = '';
  let startTouchTime;
  let endTouchTime;

  el.addEventListener('touchstart',function(e){
    startTouchTime = Date.now();

    swipe_det.sX = e.touches[0].screenX; 
    swipe_det.sY = e.touches[0].screenY;
  },false);

  el.addEventListener('touchmove',function(e){
    // e.preventDefault();
    swipe_det.eX = e.touches[0].screenX; 
    swipe_det.eY = e.touches[0].screenY;    
  },false);

  el.addEventListener('touchend',function(e) {
    endTouchTime = Date.now();
    const timeTaken = endTouchTime - startTouchTime;

    //horizontal detection
    if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
      if(swipe_det.eX > swipe_det.sX)
        direction = "r";      
      else 
        direction = "l";

        velocity = (Math.abs(swipe_det.eX - swipe_det.sX)) / timeTaken;
    }
    //vertical detection
    else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
      if(swipe_det.eY > swipe_det.sY) direction = "d";
      else direction = "u";

      velocity = (Math.abs(swipe_det.eY - swipe_det.sY)) / timeTaken;
    }

    if (direction != "" && velocity >= velocityThreshhold)
      swipeCallback(direction)

    velocity = 0;
    direction = "";
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;

    endTouchTime = 0;
    startTouchTime = 0;
  },false);  
}