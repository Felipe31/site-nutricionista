function calculateImc() {
    document.getElementById("imc-result").value = "123"
    document.getElementById("imc-result").innerHTML
        = (document.getElementById("weight").value
            / (document.getElementById("height").value 
                * document.getElementById("height").value)).toFixed(2);
};

// function from https://stackoverflow.com/questions/2536379/difference-in-months-between-two-dates-in-javascript
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function calculateAge() {
    var birthDate = new Date(Date.parse(document.getElementById('date-birth').value));
    var visitDate = new Date(Date.parse(document.getElementById('date-visit').value));
    var result =  monthDiff(birthDate, visitDate);
    if (result == 1)
        document.getElementById('age-unit').innerHTML = " mês";
    else
        document.getElementById('age-unit').innerHTML = " meses";

    document.getElementById('age-result').innerHTML = result;
}

function fillDateNow() {
    var now = new Date(Date.now());
    var nowString = now.getFullYear();
    nowString += "-";
    if(now.getMonth() < 10)
        nowString += "0"
    nowString += now.getMonth();
    nowString += "-";
    if(now.getDay() < 10)
        nowString += "0"
    nowString += now.getDay();
    console.log(nowString);
    document.getElementById('date-visit').value = nowString;
}