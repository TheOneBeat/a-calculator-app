let form = document.querySelector('form');//form

let reset = document.querySelector('#Reset');//reset button

let Equals = document.querySelector('#Equals');//equals button

let container = document.querySelector('.container');//container

let circle_selector = document.querySelector('.circle-select');//circle selector

let input = document.querySelector('input');//input

let keys = document.querySelectorAll('.key');//keys

let change_colorCount = 1;//counter for changing color of circle selector


let root = document.styleSheets[0].cssRules[0].style;//root


let tab_root=['--color-bg-body','--color-bg-form','--color-bg-key','--color-text','--color-text-key','--circle-color','--btn-equals-bg-color','--btn-reset-bg-color','--btn-reset-border-bottom','--btn-equals-border-bottom','--btn-hover']//tab root properties

let themeOne=['#3B4664','#181F32','#242C45','#fff','#3B4664','coral','#4b505f','#F96C5B','#384466','#972415','#A2B3E1']//theme one

let themeTwo=['#D2CDCD','#E7E5E1','#A19A91','#242C45','#C35404','#C35404','#C35404','#388187','#C35404','#384466','#972415','#A2B3E1']//theme two

let themeThree=['#17062A','#1E0836','#180C35','#FFE437','#C35404','#00DECF','#56077C','#388187','#331B4D','#384466','#972415','#A2B3E1']//theme three

function colorTheme()//
{
  for(let i=0;i<tab_root.length;i++){//change color of circle selector based on counter change_colorCount
    if (change_colorCount==1)
      root.setProperty(tab_root[i], themeOne[i]);
    else if (change_colorCount==2)
    {
      root.setProperty(tab_root[i], themeTwo[i]);
    }
    else
      root.setProperty(tab_root[i], themeThree[i]); 
  }
}

// Event Listeners
circle_selector.addEventListener('click',()=>{//change color of circle selector every time it is clicked
  change_colorCount++;
  console.log(change_colorCount)
  if (change_colorCount==4)
    change_colorCount=1;
  changeTheme();
  colorTheme();
  

  //change color of circle selector based on counter change_colorCount
},{passive: true});


function changeTheme(){//change color of circle selector
  switch (change_colorCount) {
    case 1:
      circle_selector.style.left= "8%";
      break;
    case 2:
      circle_selector.style.left= "38%";
      break;
    case 3:
      circle_selector.style.left= "65%";
      break;
  }
}

form.addEventListener('submit', function(e) {//prevent form from submitting
  e.preventDefault();
},{passive: true});

keys.forEach(key => {//add event listener to each key
  key.addEventListener('click', () =>{
    addValue(key.textContent);
  },{passive: true});

})

//Copilot, can you simpilfy this code below?
//
function addValue(val){//add value to input
if (val === "DEL")
    Delete();
  else if (val===".")
    input.value += ",";
  else
    input.value += val;
} 

function Delete(){//delete last value of input
  let value = input.value;
  input.value = value.slice(0, -1);
}

function Reset()//reset input
{
  input.value = "";
}

reset.addEventListener('click', () => {//reset input every time reset button is clicked
  Reset();
},{passive: true});

Equals.addEventListener('click', () => {//calculate input
  let result;
  let regexvalidateNumber = /[\+\-]+[^\d*\.?\d+$/]/gi;//we check if the operation is a sign + or - followed by an integer or a number with a comma.

  let regexValidateOpearation = /(^\d+[\x\+\/\-]\d+$)/gi;//we check if the operation is a number followed by an operator and a number

  let regexvalidateError = /^[\x\+\/\-]+$\d$/gi;//we check if the operation is an operator followed by a possible number or not...

  let regexvalidatemultdivErrorEntier = /[\x\/]+[^\d*\.?\d*$/]/gi;//we check if the operation is a sign x or / followed by an integer or a number with a comma.


  let value = input.value;//we get the value of the input
  if (value=="")
    return;
  if (value.includes("/0"))
    printError("Error");
    
  else if ((!regexvalidateNumber.test(value) ||  (regexValidateOpearation.test(value)) ) && (!regexvalidateError.test(value) && !regexvalidatemultdivErrorEntier.test(value)))//if the operation is valid
  {
    try//we try to evaluate the operation
    {
      result = eval(value.replace(/,/gi, ".").replace(/x/gi, "*"));//we replace the comma with a dot and the x with a * and then we evaluate the operation
      if (result.toString().includes("."))//if the result is a float number
        result = result.toFixed(2);//we round it to 2 decimals
      input.value = result;//we print the result
    }
    catch(e)//if the operation is not valid
    {
      printError("No operations...");// we print an error("No operations...") with the printError function
    }
  }
  
},{passive: true});

function printError(msg){//this function prints an error based on the msg parameter, so we can reuse it <ith any error we want
  setTimeout(() => {input.value = msg;}, 10);
    setTimeout(Reset,1000);
}





