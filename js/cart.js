cartArray = [];
let shippingPercentage = 15;

let symbolConvert = "$";
let MONEY_PESO_SYMBOL = "$";
let MONEY_DOLLAR_SYMBOL = "U$S";

let currencyConvert = "UYU";
let DOLLAR_SYMBOL = "USD";
let PESO_SYMBOL = "UYU";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";



function convertMoney(coin, quantity, coinOut) {
  const dollarTradingUYU = 40;
  if (coin == coinOut) {
    return quantity;
  }
  switch (coin) {
    case "USD":
      if (coinOut == "UYU") {
        return quantity * dollarTradingUYU;
      }
    case "UYU":
      if (coinOut == "USD") {
        return quantity / dollarTradingUYU;
      }
    default:
      return undefined;
  }
}



function numToPrice(value) {
  let num = value.toString().split(".");

  let price = num[0].toString().split("");
  for (let i = price.length - 3; i > 0; i=i-3) {
    price.splice(i, 0, ".");
  }

  num[0] = price.join("")
  return symbolConvert + "&nbsp;" + num.join();
}



function factor(value){
    let multi = parseInt(value);
    if (!(multi > 0)) {
        multi = 1
    };
    return multi
}



function setShippingPercentage() {
  let shipping = document.getElementsByName("shippingType");
  for (let i = 0; i < shipping.length; i++) {

    if (shipping[i].checked) {
      let value = shipping[i].value;

      if (value == "premium") {
        shippingPercentage = 15;
      } else if (value == "express") {
        shippingPercentage = 7;
      } else if (value == "standard") {
        shippingPercentage = 5;
      }
    }
  }
}



function updCalc() {

    let setCurrency = document.getElementById("productCurrency").value;
  if (setCurrency == DOLLAR_CURRENCY) {
    currencyConvert = DOLLAR_SYMBOL;
    symbolConvert = MONEY_DOLLAR_SYMBOL
  } 
  else if (setCurrency == PESO_CURRENCY) {
    currencyConvert = PESO_SYMBOL;
    symbolConvert = MONEY_PESO_SYMBOL
  }

  let inputQtyName = document.getElementsByName("qty");
  let sumTotal = 0;
  for (let i = 0; i < inputQtyName.length; i++) {
    sumTotal += convertMoney(cartArray[i].currency, cartArray[i].unitCost, currencyConvert) * factor(inputQtyName[i].value);
    
    // Precio por cantidad
    let result = document.getElementsByName("result"+i)[0];
    let price = convertMoney(cartArray[i].currency, cartArray[i].unitCost, currencyConvert);
    result.innerHTML = numToPrice(price * factor(inputQtyName[i].value));
  }
  // Subtotal
  let subtotal = document.getElementById("subtotal");
  subtotal.innerHTML = numToPrice(sumTotal);

  // Costo Subtotal
  let subtotalCost = document.getElementById("subtotalCostText");
  subtotalCost.innerHTML = numToPrice(sumTotal);

  // Costo de Envío
  setShippingPercentage()
  let shippingCost = document.getElementById("shippingCostText");
  let percentagecost = sumTotal * shippingPercentage / 100;
  shippingCost.innerHTML = numToPrice(percentagecost);
  
  // Costo Total
  let totalCost = document.getElementById("totalCostText");
  totalCost.innerHTML = numToPrice(sumTotal + percentagecost);
  
}


function afterCom(qty, singular, plural){
  if(qty == 1){
    return singular;
  } else {
    return plural;
  }
}

function showCartList(){
    let cart = cartArray;
    let listCart = document.getElementById("listCart");
    let htmlContentToAppend = "";
    
    for(let i = 0; i < cart.length; i++){
        let item = cart[i];

        htmlContentToAppend += `
        <li class="list-group-item">
          <div class="row">
              <div class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4 mx-auto">
              <img src="${item.src}" alt="xc" class="img-thumbnail mx-auto d-block">
            </div>
  
            <div class="col-12 col-sm align-self-stretch d-flex flex-column">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="my-1">${item.name}</h5>
                <small class="text-muted">${item.count}&nbsp;${afterCom(item.count, "artículo", "artículos")}</small>
              </div>
              <div class="d-flex w-100">
                <span class="mb-1 mt-2">${item.currency} ${item.unitCost}</span>
              </div>
              <div class="mt-auto">
                <div class="row align-items-center justify-content-between">
                  <div class="col-auto col-sm-7 col-md-7 col-lg-6 col-xl-5 pr-0">
                    <div class="row no-gutters">
                      <div class="col-auto form-inline">
                        <label for="qty${i}" class="pr-2">Cantidad</label>
                      </div>
                      <div class="col-5 col-sm-6 col-md-5 col-lg-6 col-xl-6">
                        <input type="number" class="form-control" id="qty${i}" name="qty" required size="6" value="${item.count}" min="1" max="1000" oninput="updCalc()">
                      </div>
                    </div>
                  </div>
                  <div class="col pl-0  text-right">
                    <span id="productCostText" class="text-muted"><output name="result${i}" for="qty${i}">${numToPrice(convertMoney(item.currency, item.unitCost, currencyConvert))}</output></span>
                  </div>
                </div>
              </div>
            </div>
  
          </div>
        </li>`;

        listCart.innerHTML = htmlContentToAppend;
    }

    let subTotalFor = `qty${Object.keys(cart).join(' qty')}`;

    // Subtotal
    let htmlContentToAppendEnd = `
    <li class="list-group-item d-flex justify-content-between mb-3">
      <span>Subtotal ($)</span>
      <strong><output id="subtotal" name="subtotal" for="${subTotalFor}" title="UYU">-</output></strong>
    </li>`
    listCart.innerHTML += htmlContentToAppendEnd;
    
    // Costo Subtotal
    let subtotalCost = document.getElementById("productsCost");
    subtotalCost.innerHTML = `<output id="subtotalCostText" name="subtotalCostText" for="${subTotalFor}">-</output>`
    
    // Costo de Envío
    let shippingCost = document.getElementById("shippingCost");
    shippingCost.innerHTML = `<output id="shippingCostText" name="shippingCostText" for="${subTotalFor} premiumRadio expressRadio standardRadio">-</output>`
    
    // Costo Total
    let totalCost = document.getElementById("totalCost");
    totalCost.innerHTML = `<output id="totalCostText" name="totalCostText" for="${subTotalFor} premiumRadio expressRadio standardRadio">-</output>`
    
    
    setShippingPercentage()
    updCalc();
}


document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART2_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {

            cartArray = resultObj.data.articles;

            
            showCartList();
        }
    });
});