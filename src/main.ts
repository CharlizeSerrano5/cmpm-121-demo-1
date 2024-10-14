import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Ice Cream Shop!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

class Item {
    name: string;
    cost: number;
    rate: number;
    amount: number;
    button: HTMLElement;
    display: HTMLElement;
    
    constructor(name: string, cost: number, rate: number, amount: number, button: HTMLElement, display: HTMLElement) {
        this.name = name;
        this.cost = cost;
        this.rate = rate;
        this.amount = amount; // amount will be called
        this.button = button;
        this.display = display;
    }
    increaseAmount() {
        // increase the amount purchased of this item
        this.amount++;
        this.updateAmount();
    }

    purchaseUpgrade() {
        count -= this.cost;
        increase += this.rate; // issue with decimals
        this.increaseAmount();
        updateCounter();
        updateDisplay();
        requestAnimationFrame(elapse);
    }
    updateAmount() {
        console.log('thisdisplay: ', this.display)
        this.display.innerHTML =  `${this.amount} ${this.name} has been purchased.`;
    }

  }


// create a button
const counter = document.createElement("div");
const button = document.createElement("button");
const purchaseA = document.createElement("button");
const purchaseB = document.createElement("button");
const purchaseC = document.createElement("button");
const amountA = document.createElement("div");
const amountB = document.createElement("div");
const amountC = document.createElement("div");
const growthDisplay = document.createElement("div");

const chocolate = new Item('Chocolate', 10, 0.1, 0, purchaseA, amountA);
const strawberry = new Item('Strawberry', 100, 2.0, 0, purchaseB, amountB);
const vanilla = new Item('Vanilla', 1000, 50, 0, purchaseC, amountC);

let count: number = 0;
let increase: number = 0;
button.innerHTML = "🍨";
counter.innerHTML = `${count} calories`;
button.addEventListener("click", clickIncrease);

purchaseA.innerHTML = "PURCHASE -10";
purchaseA.disabled = true;
purchaseA.addEventListener("click", () => {chocolate.purchaseUpgrade()});

purchaseB.innerHTML = "PURCHASE -100";
purchaseB.disabled = true;
purchaseB.addEventListener("click", () => {strawberry.purchaseUpgrade()});

purchaseC.innerHTML = "PURCHASE";
purchaseC.disabled = true;
purchaseC.addEventListener("click", () => {vanilla.purchaseUpgrade()});
function checkPurchase() { // should be refactored
  if (count >= 10) {
    purchaseA.disabled = false;
  } else {
    purchaseA.disabled = true;
  }
  if (count >= 100) {
    purchaseB.disabled = false;
  } else {
    purchaseB.disabled = true;
  }
  if (count >= 1000) {
    purchaseC.disabled = false;
  } else {
    purchaseC.disabled = true;
  }
}

function updateDisplay() {
    let increaseNum = increase.toFixed(1);

    growthDisplay.innerHTML = `Growth Rate: ${increaseNum} calories/sec`;
    checkPurchase();
  }

function updateCounter() {
    let countNum = count.toFixed(1);
  counter.innerHTML = `${countNum} calories`;
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

app.append(growthDisplay);
app.append(button);
app.append(counter);
app.append(purchaseA);
app.append(purchaseB);
app.append(purchaseC);

app.append(amountA);
app.append(amountB);
app.append(amountC);

