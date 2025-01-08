var massMark = 78;
var heightMark = 1.69;
var massJohn = 92
var heightJohn = 1.95

function massBMI(mass, height){
    return mass/(height*height);
}

var bmiMark = massBMI(massMark,heightMark);
var bmiJohn = massBMI(massJohn, heightJohn);

var markHigherBMI = bmiMark > bmiJohn

console.log(markHigherBMI)
