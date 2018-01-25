var GA = {}

GA.onBeginGAClick = function(){
    var firstPopulation = GA.generatePopulation(alghoritmVC.options.steps, 60);

    GA.onGAStep(firstPopulation,  0);
};



GA.onGAStep = function(rootPopulation, iterations){
    var oldPopulation = rootPopulation.slice(0, rootPopulation.length/2);
    var newPopulation = GA.generatePopulation(alghoritmVC.options.steps, 60);
        newPopulation = newPopulation.slice(0, newPopulation.length/2);

    var possibleDirections = "NSWE";

    var mixedPopulation = [];
    var mixedChromosome1,
        mixedChromosome2,
        rand,
        oldChromo1,
        oldChromo2;

    for(var i=0; i<oldPopulation.length; i++){

            mixedChromosome1 = [];
            mixedChromosome2 = [];
            if(i%2 === 0){
                oldChromo1 = oldPopulation[i].chromosome;
                oldChromo2 = newPopulation[i].chromosome;

                mixedChromosome1 = oldChromo1.slice(0,Math.floor(oldChromo1.length/3)).concat(oldChromo2.slice(Math.floor(oldChromo1.length/3)));
                mixedChromosome2 = oldChromo2.slice(0,Math.floor(oldChromo1.length/3)).concat(oldChromo1.slice(Math.floor(oldChromo1.length/3)));
            }
            else{
                for(var j=0; j<oldPopulation[i].chromosome.length; j = j+2){
                    mixedChromosome1.push(oldPopulation[i].chromosome[j]);
                    mixedChromosome1.push(newPopulation[i].chromosome[j+1]);
                    mixedChromosome2.push(oldPopulation[i].chromosome[j+1]);
                    mixedChromosome2.push(newPopulation[i].chromosome[j]);
                }
            }





        if(alghoritmVC.randomIntFromInterval(1,33) === 1){
            for(var k=0; k<10; k++){
                mixedChromosome1[alghoritmVC.randomIntFromInterval(Math.floor(mixedChromosome1.length/2),mixedChromosome1.length-1)] = possibleDirections[alghoritmVC.randomIntFromInterval(0,possibleDirections.length-1)];
                mixedChromosome2[alghoritmVC.randomIntFromInterval(Math.floor(mixedChromosome1.length/2),mixedChromosome1.length-1)] = possibleDirections[alghoritmVC.randomIntFromInterval(0,possibleDirections.length-1)];

            }
        }


        mixedPopulation.push({
            'fitness' : GA.calculateFitness(mixedChromosome1),
            'chromosome' : mixedChromosome1
        });
        mixedPopulation.push({
            'fitness' : GA.calculateFitness(mixedChromosome2),
            'chromosome' : mixedChromosome2
        });
    }

    mixedPopulation.sort(GA.compare);

    iterations++;

    if(mixedPopulation[0].fitness){
        if(iterations < 5000){

            if(mixedPopulation[0].fitness < 0.6){
                console.log(mixedPopulation[0]);
                console.log(iterations);
            }
            else{
                if(mixedPopulation[0].fitness < 1){

                }
                GA.onGAStep(mixedPopulation, iterations);
            }

        }
        else{

        }

        // if(mixedPopulation[0].fitness < 60){
        //     // if(mixedPopulation[0].fitness > 120){
        //     //     console.log(mixedPopulation[0]);
        //     //     console.log(iterations);
        //     // }
        //
        //     GA.onGAStep(mixedPopulation, iterations);
        //     // console.log(iterations);
        // }
        // else{
        //     console.log(mixedPopulation[0]);
        //     console.log(iterations);
        // }
    }


    // return mixedPopulation;



}

GA.generatePopulation = function(chromosomeLen, populationSize){
    var possibleDirections = "NSWE";
    var populationArray = [];
    var chromosomeArray;
    for(var i=0; i<populationSize; i++){
        chromosomeArray = [];
        for(var j=0; j<chromosomeLen; j++){
            chromosomeArray.push(possibleDirections[alghoritmVC.randomIntFromInterval(0, possibleDirections.length - 1)]);
        }
        populationArray.push({
            'fitness' : GA.calculateFitness(chromosomeArray),
            'chromosome' : chromosomeArray
        });
    }

    populationArray.sort(GA.compare);

    // GA.crossPopulations(populationArray);

    return populationArray;
};

GA.crossPopulations = function(population){
    var newPopulation
};

GA.compare = function(a,b) {
  if (a.fitness > b.fitness)
    return 1;
  if (a.fitness < b.fitness)
    return -1;
  return 0;
};


GA.calculateFitness = function(chromosome){
    var pos_x = 1;
    var pos_y = 1;

    var result = 1;

    var $position;

    for(var i=0; i<chromosome.length; i++){
        if(alghoritmVC.fieldArray[pos_y][pos_x] === 0){
            // result = Math.floor(((pos_x/(alghoritmVC.options.size-2))*100) + ((pos_y/(alghoritmVC.options.size-2))*100)) - i*5;

            result = (1 - pos_x/(alghoritmVC.options.size-2)) + (1 - pos_y/(alghoritmVC.options.size-2));
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

        if(alghoritmVC.fieldArray[pos_y][pos_x] === 1){
            return result + 0.1;
        }

        if(alghoritmVC.fieldArray[pos_y][pos_x] === 2 || alghoritmVC.fieldArray[pos_y][pos_x] === 3){
            return result;
        }


    }


    return result;




};
