"use strict";

//TODO: make these not in the global namespace
function Dice(dieMaker) {
    function fetchDice(sides, count) {
        var range = _.isFinite(count) ? _.range(count) : [1];
        return _.map(range, function(c) {
            return dieMaker(sides);
        });
    }

    function roll() {
        var rollsWithDice =  _.map(_.flatten(arguments), function(die) {
            return [die, die.roll()];
        });

        var rolls = _.map(rollsWithDice, function(roll) {
            return roll[1];
        });

        return {
            rollsWithDice: rollsWithDice,
            rolls: rolls,
            sum: sum(rolls)
        }
    }

    function sum(results) {
        function sum(memo, result) {
            return result + memo;
        }
        return _.reduce(results, sum, 0);
    }

    return {
        fetchDice: fetchDice,
        roll: roll
    }
}

function ordinaryDie(sides) {
    return {
        roll: function() {
            return _.random(1, sides);
        },
        sides: _.constant(sides)
    }
}

/*
results format:
{
    sum: 18,
    rolls: [ [die, 3], [die, 10], [die, 5] ],
    results: [3, 10, 5]
}
*/

var dice = new Dice(ordinaryDie);

var oneD6 = dice.fetchDice(6);
var twoD8 = dice.fetchDice(8, 2);

var results = dice.roll(oneD6, twoD8);
console.log(results.rolls);
console.log(results.rollsWithDice);
console.log(results.sum);
