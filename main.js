var alghoritmVC = {};
alghoritmVC.$sizeSelect = $('[data-function="select-size"]');
alghoritmVC.$actionView = $(".action-view");
alghoritmVC.$beginButton = $('[data-function="begin-button"]');

/*
kilka rodzajów pól:
0 - pole puste
1 - pole zajęte (z murem)

2 - być może start
3 - koniec ?
*/

alghoritmVC.options = {
    'size': 11,
    'steps': 16,
    'iterations' : 50
};

alghoritmVC.initView = function() {
    var size = alghoritmVC.options.size;

    $(".menu-item-slider").attr('min', (size-3)*2);
    $(".menu-item-slider").val((size-3)*2);
    $(".menu-item-slider").attr('max', Math.ceil((size-2)/2)*(size-5)+Math.floor((size-2)/2)*2);

    alghoritmVC.$sizeSelect.off('change').on('change', alghoritmVC.onSizeSelect);
    alghoritmVC.$beginButton.off('click').on('click', function(){
        alghoritmVC.beginAlghoritm();

    });

    $(".menu-item-slider").off('input change').on('input change', function(){
        alghoritmVC.options.steps = $(this).val();
    });
};

alghoritmVC.onSizeSelect = function() {
    var size = $(this).val();
    alghoritmVC.options.size = size;
    alghoritmVC.options.steps = (size-3)*2;
    $(".menu-item-slider").attr('min', (size-3)*2);
    $(".menu-item-slider").val((size-3)*2);
    $(".menu-item-slider").attr('max', Math.ceil((size-2)/2)*(size-5)+Math.floor((size-2)/2)*2);


};

alghoritmVC.beginAlghoritm = function() {

    alghoritmVC.$actionView.html("");
    alghoritmVC.fieldArray = [];

    var field = $(alghoritmVC.$fieldTpl);
    field.css({
        'width': (100 / alghoritmVC.options.size) + '%',
        'height': (100 / alghoritmVC.options.size) + '%'
    });

    for (var i = 0; i < alghoritmVC.options.size; i++) {
        var columnArray = [];
        for (var j = 0; j < alghoritmVC.options.size; j++) {
            var newField = field.clone();
            newField.attr('position-x', i);
            newField.attr('position-y', j);
            var typeOfField = 0;
            // if(i === 0 || i === alghoritmVC.options.size-1 || j === 0 || j === alghoritmVC.options.size-1 ){
            newField.addClass("field-item--black");
            typeOfField = 1;
            // }
            columnArray.push(typeOfField);

            alghoritmVC.$actionView.append(newField);
        }
        alghoritmVC.fieldArray.push(columnArray);
    }

    alghoritmVC.buildLabyrinth();
}


alghoritmVC.buildLabyrinth = function() {
    var posX = 1;
    var posY = 1;
    var moves = [];
    alghoritmVC.fieldArray[posX][posY] = 0;
    moves.push(posY + posY * alghoritmVC.options.size);
    var i=1;
    while (i>0) {
        if(moves.length){
            var possibleDirections = "";
            if (posX + 2 > 0 && posX + 2 < alghoritmVC.options.size && alghoritmVC.fieldArray[posX + 2][posY] === 1) {
                possibleDirections += "S";
            }
            if (posX - 2 > 0 && posX - 2 < alghoritmVC.options.size && alghoritmVC.fieldArray[posX - 2][posY] === 1) {
                possibleDirections += "N";
            }
            if (posY - 2 > 0 && posY - 2 < alghoritmVC.options.size && alghoritmVC.fieldArray[posX][posY - 2] === 1) {
                possibleDirections += "W";
            }
            if (posY + 2 > 0 && posY + 2 < alghoritmVC.options.size && alghoritmVC.fieldArray[posX][posY + 2] === 1) {
                possibleDirections += "E";
            }
            if (possibleDirections) {
                var move = alghoritmVC.randomIntFromInterval(0, possibleDirections.length - 1);
                if(possibleDirections[move] === "N"){
                    alghoritmVC.fieldArray[posX - 2][posY] = 0;
                    alghoritmVC.fieldArray[posX - 1][posY] = 0;
                    posX -= 2;
                    alghoritmVC.makeWayOnPosition(posX, posY, "N");
                }
                if(possibleDirections[move] === "S"){
                    alghoritmVC.fieldArray[posX + 2][posY] = 0;
                    alghoritmVC.fieldArray[posX + 1][posY] = 0;
                    posX += 2;
                    alghoritmVC.makeWayOnPosition(posX, posY, "S");
                }
                if(possibleDirections[move] === "W"){
                    alghoritmVC.fieldArray[posX][posY - 2] = 0;
                    alghoritmVC.fieldArray[posX][posY - 1] = 0;
                    posY -= 2;
                    alghoritmVC.makeWayOnPosition(posX, posY, "W");
                }
                if(possibleDirections[move] === "E"){
                    alghoritmVC.fieldArray[posX][posY + 2] = 0;
                    alghoritmVC.fieldArray[posX][posY + 1] = 0;
                    posY += 2;
                    alghoritmVC.makeWayOnPosition(posX, posY, "E");
                }

                moves.push(posY + posX * alghoritmVC.options.size);
            } else {
                var back = moves.pop();
                posX = Math.floor(back / alghoritmVC.options.size);
                posY = back % alghoritmVC.options.size;
                alghoritmVC.makeWayOnPosition(posX, posY);
            }
        }
        else{
            i = -1;
        }

    }
    alghoritmVC.setLabyrinthEnds();
};

alghoritmVC.makeWayOnPosition = function(posX, posY, direction) {
    if(direction){
        if(direction === "N"){
            $('[position-x="' + (posX+1) + '"][position-y="' + posY + '"]').removeClass("field-item--black");
        }
        if(direction === "S"){
            $('[position-x="' + (posX-1) + '"][position-y="' + posY + '"]').removeClass("field-item--black");
        }
        if(direction === "W"){
            $('[position-x="' + (posX) + '"][position-y="' + (posY+1) + '"]').removeClass("field-item--black");
        }
        if(direction === "E"){
            $('[position-x="' + (posX) + '"][position-y="' + (posY-1) + '"]').removeClass("field-item--black");
        }
    }
    $('[position-x="' + posX + '"][position-y="' + posY + '"]').removeClass("field-item--black");
};

alghoritmVC.setLabyrinthEnds = function(){
    alghoritmVC.fieldArray[1][1] = 2;
    $('[position-x="' + 1 + '"][position-y="' + 1 + '"]').addClass("field-item--start");
    alghoritmVC.fieldArray[alghoritmVC.options.size-2][alghoritmVC.options.size-2] = 3;
    $('[position-x="' + (alghoritmVC.options.size-2) + '"][position-y="' + (alghoritmVC.options.size-2) + '"]').addClass("field-item--finish");

    $('[data-function="begin-ga-button"]').off('click').click(function(){
        GA.onBeginGAClick();
        // alghoritmVC.generatePopulation(alghoritmVC.options.steps, 100);
    });

    $('[data-function="begin-astar-button"]').off('click').click(function(){
        AStar.onBeginAStarClick();
    });
};



alghoritmVC.drawPlayerTrace = function(trace, n){
    if(n > 0){
        setTimeout(function(){
            alghoritmVC.addPlayerDot(trace[n][0], trace[n][1]);
            alghoritmVC.drawPlayerTrace(trace, n-1);
        }, 0);
    }
};

alghoritmVC.addPlayerDot = function(playerX, playerY){
    $(".player-dot").remove();
    var $position = $('[position-x="' + (playerX) + '"][position-y="' + (playerY) + '"]');
        $position.append('<div class="trail-dot"></div><div class="player-dot"></div>');
};

alghoritmVC.randomIntFromInterval = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

alghoritmVC.$fieldTpl = [
    '<div class="field-item"></div>'
].join("\n");

alghoritmVC.initView();
