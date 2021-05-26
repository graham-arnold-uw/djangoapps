//Author: Graham Arnold
//Last modified: 4/7/21
//Description: this script pulls btc price data using REST API and updates displayed price
//
//
//
//********************************
//********************************
//********************************
//********************************
//********************************
//********************************
initialize();

//main api loop
//pulls latest btc price
//calculates price change from prev price
//write out price with correct color animation
function apiLoop() {
  fetchPrice().then((response) => {
    curr_price = response.btc_price;
    nextColor = getColorChange(curr_price);
    console.log(nextColor);
    writePrice(curr_price, nextColor);
  })

  setTimeout(apiLoop, 5000);
}

//compares the last btc price with the current btc price
//if the new price is greater the color change is green
//if the new price is lower the color change is red
//if not change occurs the color stays white
function getColorChange(curr_price) {
    var last_price = parseFloat(document.getElementById("btcprice").innerHTML);
    if (last_price < curr_price) {
      return "green";
    } else if (last_price > curr_price) {
      return "red";
    } else {
      return "white";
    }
}

//handles the animation of the color changing price
//adjust the price elements color according to the input
//resets the color to white after a set amount of time
function colorAnimation(color, reset_time) {
  if (color == "green") {
    document.getElementById("btcprice").style.color = "#00ff00";
    //document.getElementById("priceblock").style.border ="10px solid green";
  } else if (color == "red") {
    document.getElementById("btcprice").style.color = "#ff0000";
    //document.getElementById("priceblock").style.border ="10px solid red";
  } else {
    document.getElementById("btcprice").style.color = "#ffffff";
    //document.getElementById("priceblock").style.border ="10px solid white";
  }
  setTimeout(resetColor, reset_time);

}

function resetColor() {
  document.getElementById("btcprice").style.color = "#ffffff";
  //document.getElementById("priceblock").style.border ="10px solid white";
}

//fetches btc_price from REST API
async function fetchPrice() {
  let response = await fetch(CRYPTO_DASH_DOMAIN + BTC_PRICE_ENDPT);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

//writes out price to HTML element
//plays color changing animation
//color based on price going up (green), down (red), or no change (white)
function writePrice(currPrice, color) {
  document.getElementById("btcprice").innerHTML = parseFloat(currPrice).toFixed(2);
  var reset_time = 1000; //milliseconds
  colorAnimation(color, reset_time);
}

//Initialize the first price, don't change any color
//start api loop
function initialize() {
  fetchPrice().then((response) => {
    curr_price = response.btc_price;
    writePrice(curr_price, 'white');
  })

setTimeout(apiLoop, 5000);
}

//********************************
//********************************
//********************************
//deprecated functions
//leaving in for review purposes
//********************************
//********************************
//********************************
function AJ() {
  var req;
  if (window.XMLHttpRequest) {
    // code for modern browsers
    req = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    req = new ActiveXObject("Microsoft.XMLHTTP");
  }
  req.overrideMimeType("application/json");
  req.open('GET', 'http://localhost:8000/pricestream/api/btcusdt/', true);
  //req.open('GET', 'test.txt', true);
  req.onload  = function() {
     //document.getElementById("test").innerHTML =  req.responseText
     //console.log(req.responseText)
     var jsonResponse = JSON.parse(req.responseText);
     document.getElementById("test").innerHTML = jsonResponse.btc_price;
  };
  req.send(null);
}

function makeApiCall_OLD() {
  //do something
  var req;
  if (window.XMLHttpRequest) {
    // code for modern browsers
    req = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    req = new ActiveXObject("Microsoft.XMLHTTP");
  }
  req.overrideMimeType("application/json");
  //var str = window.performance.now();
  req.open('GET', 'http://localhost:8000/pricestream/api/btcusdt/', true);
  //req.open('GET', 'test.txt', true);
  req.onload  = function() {
     //document.getElementById("test").innerHTML =  req.responseText
     //console.log(req.responseText)
     var jsonResponse = JSON.parse(req.responseText);
     var priceFloat = parseFloat(jsonResponse.btc_price).toFixed(2);
     document.getElementById("btcprice").innerHTML = priceFloat;
  };
  //var end = window.performance.now();
  //console.log(`Execution time: ${end - str} ms`);
  req.send(null);
  //window.setTimeout(function() {
  //  makeApiCall()
  //}, 10000);

  window.setTimeout(makeApiCall_OLD, 5000);
}

function updatePrice() {
  //do something
  //test
  var req;
  if (window.XMLHttpRequest) {
    // code for modern browsers
    req = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    req = new ActiveXObject("Microsoft.XMLHTTP");
  }
  req.overrideMimeType("application/json");
  //var str = window.performance.now();
  req.open('GET', 'http://localhost:8000/pricestream/api/btcusdt/', true);
  //req.open('GET', 'test.txt', true);
  req.onload  = function() {
     //document.getElementById("test").innerHTML =  req.responseText
     //console.log(req.responseText)
     var jsonResponse = JSON.parse(req.responseText);
     price = parseFloat(jsonResponse.btc_price).toFixed(2);
     //document.getElementById("btcprice").innerHTML = priceFloat;
  };
  //var end = window.performance.now();
  //console.log(`Execution time: ${end - str} ms`);
  req.send(null);
}
async function initialize_OLD() {
  const result = await updatePrice();
  writePrice(price);
  window.setTimeout(makeApiCall,5000);

}

function initialize_OLD2() {
  var req;
  if (window.XMLHttpRequest) {
    // code for modern browsers
    req = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    req = new ActiveXObject("Microsoft.XMLHTTP");
  }
  req.overrideMimeType("application/json");
  //var str = window.performance.now();
  req.open('GET', 'http://localhost:8000/pricestream/api/btcusdt/', true);
  //req.open('GET', 'test.txt', true);
  req.onload  = function() {
     //document.getElementById("test").innerHTML =  req.responseText
     //console.log(req.responseText)
     var jsonResponse = JSON.parse(req.responseText);
     var priceFloat = parseFloat(jsonResponse.btc_price).toFixed(2);
     document.getElementById("btcprice").innerHTML = priceFloat;
  };
  //var end = window.performance.now();
  //console.log(`Execution time: ${end - str} ms`);
  req.send(null);
  window.setTimeout(makeApiCall_OLD, 5000);
}
//********************************
