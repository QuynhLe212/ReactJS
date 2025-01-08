var dolphinsScores = [96, 108, 89]
var koalasScores = [88, 91, 110]

function calculateAverage(scores){
    var total = 0
    for (var i = 0; i < scores.length; i++){
        total += scores[i]
    }
    return total / scores.length
}

var averageDolphins = calculateAverage(dolphinsScores)
var averageKoalas = calculateAverage(koalasScores)

if(averageDolphins > averageKoalas && averageDolphins >= 100){
    console.log("Dolphins win the trophy!")
}else if(averageKoalas > averageDolphins){
    console.log("Koalas win the trophy!")
}else if(averageDolphins == averageKoalas){
    console.log("It's a draw!")
}else{
    console.log("No team wins the trophy.")
}