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
        alghoritmVC.onBeginGAClick();
        // alghoritmVC.generatePopulation(alghoritmVC.options.steps, 100);
    });
};

alghoritmVC.onBeginGAClick = function(){
    var firstPopulation = alghoritmVC.generatePopulation(alghoritmVC.options.steps, 60);
    var secondPopulation = alghoritmVC.generatePopulation(alghoritmVC.options.steps, 60);

    alghoritmVC.onGAStep(firstPopulation, secondPopulation,  0);
};

alghoritmVC.onGAStep = function(rootPopulation, rootPopulation2, iterations){
    var oldPopulation = rootPopulation.slice(0, rootPopulation.length/2);
    var newPopulation =  rootPopulation2.slice(0, rootPopulation2.length/2); //alghoritmVC.generatePopulation(alghoritmVC.options.steps, 60);
        // newPopulation = newPopulation.slice(0, newPopulation.length/2);

    var possibleDirections = "NSWE";

    var mixedPopulation = [];
    var mixedChromosome1,
        mixedChromosome2,
        rand;

    for(var i=0; i<oldPopulation.length; i++){

            mixedChromosome1 = [];
            mixedChromosome2 = [];

            for(var j=0; j<oldPopulation[i].chromosome.length; j = j+2){
                mixedChromosome1.push(oldPopulation[i].chromosome[j]);
                mixedChromosome1.push(newPopulation[i].chromosome[j+1]);
                mixedChromosome2.push(oldPopulation[i].chromosome[j+1]);
                mixedChromosome2.push(newPopulation[i].chromosome[j]);
            }

        if(alghoritmVC.randomIntFromInterval(1,10) === 10){
            for(var k=0; k<5; k++){
                mixedChromosome1[alghoritmVC.randomIntFromInterval(Math.floor(mixedChromosome1.length/2),mixedChromosome1.length-1)] = possibleDirections[alghoritmVC.randomIntFromInterval(0,possibleDirections.length-1)];
                mixedChromosome2[alghoritmVC.randomIntFromInterval(Math.floor(mixedChromosome1.length/2),mixedChromosome1.length-1)] = possibleDirections[alghoritmVC.randomIntFromInterval(0,possibleDirections.length-1)];

            }
        }


        mixedPopulation.push({
            'fitness' : alghoritmVC.calculateFitness(mixedChromosome1),
            'chromosome' : mixedChromosome1
        });
        mixedPopulation.push({
            'fitness' : alghoritmVC.calculateFitness(mixedChromosome2),
            'chromosome' : mixedChromosome2
        });
    }

    mixedPopulation.sort(alghoritmVC.compare);

    iterations++;

    if(mixedPopulation[0].fitness){
        if(mixedPopulation[0].fitness < 140){
            if(mixedPopulation[0].fitness > 100){
                alghoritmVC.calculateFitness(mixedChromosome1, 1);
            }

            alghoritmVC.onGAStep(mixedPopulation, mixedPopulation, iterations);
            // console.log(iterations);
        }
        else{
            console.log(mixedPopulation[0]);
            console.log(iterations);
        }
    }


    // return mixedPopulation;



}

alghoritmVC.generatePopulation = function(chromosomeLen, populationSize){
    var possibleDirections = "NSWE";
    var populationArray = [];
    var chromosomeArray;
    for(var i=0; i<populationSize; i++){
        chromosomeArray = [];
        for(var j=0; j<chromosomeLen; j++){
            chromosomeArray.push(possibleDirections[alghoritmVC.randomIntFromInterval(0, possibleDirections.length - 1)]);
        }
        populationArray.push({
            'fitness' : alghoritmVC.calculateFitness(chromosomeArray),
            'chromosome' : chromosomeArray
        });
    }

    populationArray.sort(alghoritmVC.compare);

    // alghoritmVC.crossPopulations(populationArray);

    return populationArray;
};

alghoritmVC.crossPopulations = function(population){
    var newPopulation
};

alghoritmVC.compare = function(a,b) {
  if (a.fitness < b.fitness)
    return 1;
  if (a.fitness > b.fitness)
    return -1;
  return 0;
};


alghoritmVC.calculateFitness = function(chromosome, withDrawing){
    var pos_x = 1;
    var pos_y = 1;

    var result = 0;

    var $position;

    for(var i=0; i<chromosome.length; i++){
        if(alghoritmVC.fieldArray[pos_y][pos_x] === 0){
            result = Math.floor(((pos_x/(alghoritmVC.options.size-2))*100) + ((pos_y/(alghoritmVC.options.size-2))*100));
        }
        if(chromosome[i] === "N"){
            pos_y -= 1;
        }
        if(chromosome[i] === "E"){
            pos_x += 1;
        }
        if(chromosome[i] === "S"){
            pos_y += 1;
        }
        if(chromosome[i] === "W"){

            pos_x -= 1;
        }

        if(withDrawing === 1){
            // $position = $('[position-x="' + (pos_y) + '"][position-y="' + (pos_x) + '"]');
            // $(".player-dot").remove();
            // $position.append('<div class="trail-dot"></div><div class="player-dot"></div>');
        }





        if(alghoritmVC.fieldArray[pos_y][pos_x] === 1 || alghoritmVC.fieldArray[pos_y][pos_x] === 2 || alghoritmVC.fieldArray[pos_y][pos_x] === 3){
            if(withDrawing === 1){
                // $(".trail-dot").remove();
            }
            return result;
        }
    }
    if(withDrawing !== 1){
        return result;
    }




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
