/*
monto: 142.55, percentage: 15%, people: 5
bill total: monto / people => 28.51
tip amount: (monto * percentage) / people => 4.27
total: bill total + tip amount => 32.79
*/

const log = console.log;

let billMonto = document.querySelector('#bill_number');
let peopleCount = document.querySelector('#number__people');
let percents = document.querySelectorAll('.perItem');  
let priceTotal = document.querySelector('#priceTotal');
let priceAmount = document.querySelector('#priceAmount');
let numberCustom = document.querySelector('#number__custom');
let btnReset = document.querySelector('#btnReset');
var monto = "", percentage = "", people = "";

function billCalculate(monto, percentage, people) {
  // parse string to int / float
  monto = parseFloat(monto);
  people = parseInt(people);
  percentage = parseInt(percentage);

  document.querySelectorAll('.perItem').forEach(item => {
    if(item.classList.contains('percent--active') === false) {
      let grandParent = item.parentNode.parentNode;
      let info = document.querySelector('#infoPercent');
      info.style.opacity = "1";
    }
  });

  // calculating...
  if(!isNaN(people) && !isNaN(monto) && !isNaN(percentage) && people != undefined && monto != undefined && monto > 0 && people > 0) {
    let billTotal = monto / people,
        tipAmount = (monto * (percentage / 100)) / people,
        total = billTotal + parseFloat(tipAmount);

    // delete class when user input wrong answer
    billMonto.classList.remove('inputs--danger');
    peopleCount.classList.remove('inputs--danger');
    document.getElementById('infoPeople').style.opacity = "0";
        
    //render
    priceAmount.textContent = `$${tipAmount.toFixed(2)}`;
    priceTotal.textContent = `$${total.toFixed(2)}`;
        
    return {
      tipAmount,
      total
    }
  }
  else if(people <= 0) {
    //alert("El número de personas debe ser mayor a 0");
    peopleCount.value = "";
    peopleCount.classList.add('inputs--danger');
    document.getElementById('infoPeople').style.opacity = "1";
  }
  else if(monto <= 0) {
    //alert("El monto debe ser mayor a 0");
    billMonto.value = "";
    billMonto.classList.add('inputs--danger');
  }
}

billMonto.addEventListener('input', (e) => {
  monto = e.target.value;
  
  // calculate bill
  billCalculate(monto,percentage,people);
});

peopleCount.addEventListener('input', (e) => {
  people = e.target.value;

  // calculate bill
  billCalculate(monto,percentage,people)
});

numberCustom.addEventListener('input', (e) => {
   if(e.target.value > 0) {
    percentage = e.target.value;

    e.target.style.border = '2px solid var(--color-primary)';

    // clean info
    document.querySelector('#infoPercent').style.display = 'none';

    // remove active percents
    document.querySelectorAll('.percent--active').forEach(perActive => {
      perActive.classList.remove('percent--active');
    });

    // calculate bill
    billCalculate(monto,percentage,people);
  }
  else if (e.target.value < 0) {
    alert('El porcentaje debe ser mayor a cero');
    e.target.style.border = '2px solid rgb(228, 43, 19)';
  }
});

// event percentages
percents.forEach(elem => {
  elem.addEventListener('click', () => {
    percentage = elem.getAttribute('data-per');

    // reset active
    document.querySelectorAll('.percent--active').forEach(perActive => {
      perActive.classList.remove('percent--active');
    });

    // add active
    elem.classList.add('percent--active')
    document.querySelector('#infoPercent').style.display = 'none';

    // calculate Bill
    billCalculate(monto,percentage,people);
  });
});

btnReset.addEventListener('click', () => {
  billMonto.value = "";
  peopleCount.value = "";
  priceAmount.textContent = "$0.00";
  priceTotal.textContent = "$0.00";
  numberCustom.value = "";

  document.querySelector('#infoPercent').style.opacity = "0";

  // reset percentages
  document.querySelectorAll('.percent--active').forEach(item => {
    item.classList.remove('percent--active');
  });

  monto = ""; percentage = ""; people = "";
});
