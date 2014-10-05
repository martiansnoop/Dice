"use strict";

//TODO: make these not in the global namespace
function Dice() {
    /**
     *
     * @param {Function} dieMaker -
     * @param {...number} sides - highest side of dice being created.
     * @returns {Array}
     */
    function fetch(dieMaker, sides) {
        var sidesArray = _.tail(arguments);
        return _.map(sidesArray, function(sides) {
            return dieMaker(sides);
        });
    }

    /**
     *
     * @param {...Object} dice - any number of dice or arrays of dice to roll
     * @returns {{rollsWithDice: *, rolls: *, sum: *}}
     */
    function roll(dice) {
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

    /**
     * Returns a die that, when rolled, yields a random result
     * between 1 and the max side count, inclusive
     *
     * @param sides
     * @returns {{roll: Function, sides: number}}
     */
    function fairDie(sides) {
        return {
            roll: function() {
                return _.random(1, sides);
            },
            sides: sides
        }
    }

    /**
     * Returns a die that will always roll the highest number.
     *
     * @param sides
     * @returns {{roll: Function, sides: number}}
     */
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
