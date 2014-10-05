"use strict";

//TODO: make these not in the global namespace
function Dice() {
    function fetch(dieMaker) {
        var sides = _.tail(arguments);
        return _.map(sides, function(sides) {
            return dieMaker(sides);
        });
    }

    function roll() {
        function sum(a, b) {
            return a + b;
        }

        var rollsWithDice =  _.map(_.flatten(arguments), function(die) {
            return [die, die.roll()];
        });

        var rolls = _.map(rollsWithDice, function(roll) {
            return roll[1];
        });

        return {
            rollsWithDice: rollsWithDice,
            rolls: rolls,
            sum: _.foldl(rolls, sum, 0)
        }
    }

    function fairDie(sides) {
        return {
            roll: function() {
                return _.random(1, sides);
            },
            sides: sides
        }
    }

    function loadedDie(sides) {
        return {
            roll: _.constant(sides),
            sides: sides
        }
    }

    return {
        factories: {
            fair: _.bind(fetch, null, fairDie),
            loaded: _.bind(fetch, null, loadedDie)
        },
        roll: roll
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

var dice = Dice();

var makeDice = dice.factories.fair;

var oneD6 = makeDice(6);
var twoD8 = makeDice(8, 8);
var sneakAttackDagger = makeDice(4,6,6,6);

var results = dice.roll(sneakAttackDagger);
console.log(results.rolls);
console.log(results.rollsWithDice);
console.log(results.sum);
