import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My in-progress game to submit!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// create a button
const counter = document.createElement("div");
const button = document.createElement("button");
const purchase = document.createElement("button");

let count: number = 0;
let increase: number = 0;
button.innerHTML = "🍨";
counter.innerHTML = `${count} calories`;
button.addEventListener("click", clickIncrease);

purchase.innerHTML = "PURCHASE";
purchase.disabled = true;
purchase.addEventListener("click", purchaseUpgrade);

function checkPurchase() {
  if (count >= 10) {
    purchase.disabled = false;
  } else {
    purchase.disabled = true;
  }
}

function updateCounter() {
  counter.innerHTML = `${count} calories`;
  checkPurchase();
}

// on click purchase will deduct
function countIncrease() {
  count += increase;
  updateCounter();
}

function clickIncrease() {
  count += 1;
  updateCounter();
}

function purchaseUpgrade() {
  count -= 10;
  increase += 1;
  updateCounter();
  requestAnimationFrame(elapse);
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
// I took reference from requestAnimationFrame() for the elapse function.
// The example function I used was function animate() where they used performance.now()
// Now I am checking if the value has reached 1 to indicate 1000 ms has passed.
// when it passes then the count increases
const zero = performance.now();
let compare = 0;
function elapse(timestamp: number) {
  const value = (timestamp - zero) / 1000;
  // the moment the value turns into the next value 1->2
  const check = value - (value % 1);
  // check becomes a number without a remainder
  if (check > compare) {
    // when the value is greater than the original compare value
    // set compare and then increase the count
    compare = check;
    countIncrease();
    requestAnimationFrame((t) => elapse(t));
    // recall the function and wait till check finally becomes a new value
  } else {
    requestAnimationFrame((t) => elapse(t));
  }
}

app.append(button);
app.append(counter);
app.append(purchase);
