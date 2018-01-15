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
    'size': '11'
};

alghoritmVC.initView = function() {
    alghoritmVC.$sizeSelect.off('change').on('change', alghoritmVC.onSizeSelect);
    alghoritmVC.$beginButton.off('click').on('click', alghoritmVC.beginAlghoritm);
};

alghoritmVC.onSizeSelect = function() {
    alghoritmVC.options.size = $(this).val();
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
            console.log(posX, posY)
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

alghoritmVC.randomIntFromInterval = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

alghoritmVC.$fieldTpl = [
    '<div class="field-item"></div>'
].join("\n");

alghoritmVC.initView();
