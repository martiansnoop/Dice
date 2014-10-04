"use strict";

//TODO: make these not in the global namespace
function Dice(dieMaker) {
    function fetch(sides) {
        return _.map(arguments, function(sides) {
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
        fetch: fetch,
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

var oneD6 = dice.fetch(6);
var twoD8 = dice.fetch(8, 8);
var sneakAttackDagger = dice.fetch(4,6,6,6);

var results = dice.roll(sneakAttackDagger);
console.log(results.rolls);
console.log(results.rollsWithDice);
console.log(results.sum);
