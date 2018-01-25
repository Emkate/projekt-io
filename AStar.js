var AStar = {};

    AStar.t0 = 0;
    AStar.t1 = 0;

AStar.onBeginAStarClick = function(){
    AStar.t0 = performance.now();
    AStar.runAlghoritm();

};

AStar.runAlghoritm = function(){
    var easystar = new EasyStar.js();
      easystar.setGrid(alghoritmVC.fieldArray);
      easystar.setAcceptableTiles([0,2,3]);
      easystar.findPath(1, 1, alghoritmVC.options.size-2, alghoritmVC.options.size-2, AStar.showPath);
      easystar.calculate();
};

AStar.showPath = function(path){
    console.log(path);
    AStar.t1 = performance.now();
    console.log("Call to doSomething took " + (AStar.t1 - AStar.t0) + " milliseconds.")
    AStar.drawDot(path, 0);


}

AStar.drawDot = function(path, step){
    setTimeout(function(){
        $(".player-dot").remove();
        var $position = $('[position-x="' + path[step].y + '"][position-y="' + path[step].x + '"]');
        $position.append('<div class="trail-dot"></div><div class="player-dot"></div>');


        if(step < path.length - 1){
            step++;
            AStar.drawDot(path, step);
        }

    }, 30);


}

AStar.compare = function(a,b) {
  if (a.points < b.points)
    return 1;
  if (a.points > b.points)
    return -1;
  return 0;
};
