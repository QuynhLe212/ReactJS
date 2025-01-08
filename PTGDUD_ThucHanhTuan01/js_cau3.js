function calculateAverage(scores) {
    var total = 0;
    for (var i = 0; i < scores.length; i++) {
        total += scores[i];
    }
    return total / scores.length;
}

function determineWinner(dolphinsScores, koalasScores) {
    var averageDolphins = calculateAverage(dolphinsScores);
    var averageKoalas = calculateAverage(koalasScores);

    if (averageDolphins > averageKoalas && averageDolphins >= 100) {
        console.log("Dolphins win the trophy!");
    } else if (averageKoalas > averageDolphins && averageKoalas >= 100) {
        console.log("Koalas win the trophy!");
    } else if (averageDolphins === averageKoalas && averageDolphins >= 100 && averageKoalas >= 100) {
        console.log("It's a draw!");
    } else {
        console.log("No team wins the trophy.");
    }
}

// Test data 1
var dolphinsScores1 = [96, 108, 89];
var koalasScores1 = [88, 91, 110];
console.log("Test Data 1:");
determineWinner(dolphinsScores1, koalasScores1);

// Data Bonus 1
var dolphinsScores2 = [97, 112, 101];
var koalasScores2 = [109, 95, 123];
console.log("Data Bonus 1:");
determineWinner(dolphinsScores2, koalasScores2);

// Data Bonus 2
var dolphinsScores3 = [97, 112, 101];
var koalasScores3 = [109, 95, 106];
console.log("Data Bonus 2:");
determineWinner(dolphinsScores3, koalasScores3);