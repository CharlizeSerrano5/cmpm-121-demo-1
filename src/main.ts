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
  desc: string;

  constructor(
    name: string,
    cost: number,
    rate: number,
    amount: number,
    desc: string,
  ) {
    this.name = name;
    this.cost = cost;
    this.rate = rate;
    this.amount = amount; // amount will be called
    this.desc = desc;
  }
  increaseAmount() {
    // increase the amount purchased of this item
    this.amount++;
  }

  increaseCost() {
    // exponentially grow the cost
    this.cost = this.cost * 1.15;
  }

  purchaseUpgrade() {
    this.updateRate();
    this.updateItem();
    updateCounter();
    updateDisplay();
    requestAnimationFrame(elapse);
  }

  updateItem() {
    // increase cost + amount existing of item
    this.increaseAmount();
    this.increaseCost();
  }
  updateRate() {
    // deduct from counter and increase the amt of everything
    totalCount -= this.cost;
    totalIncrease += this.rate;
  }
}

// create a button
const counter = document.createElement("div");
const button = document.createElement("button");
const growthDisplay = document.createElement("div");
app.append(growthDisplay);
app.append(button);
app.append(counter);

const availableItems: Item[] = [
  new Item("Vanilla", 10, 0.1, 0, "Pure, plain, simple vanilla."),
  new Item("Strawberry", 100, 2.0, 0, "A little bit more refreshing flavor."),
  new Item("Banana", 250, 15, 0, "Makes the monkeys go faster."),
  new Item("Chocolate",1000,50,0,"A classic, probably don't give to the monkeys.",),
  new Item("Coffee",2500, 200, 0, "Bout to go fast with this flavor town delight.",),
];

let totalCount: number = 0;
let totalIncrease: number = 0;
button.innerHTML = "🍨";
button.addEventListener("click", clickIncrease);
const buttons: HTMLButtonElement[] = [];
const displays: HTMLElement[] = [];
availableItems.map((item) => {
  // https://chat.brace.tools/c/38fd3aec-616c-4736-9858-c7d59d586df8
  // I referenced a lot of Brace recommendations for cleaning up divergent code
  // I now separate the button logic and store the displays inside of arrays
  // I used most of the recommendations that Brace offered but I changed where the logic is being used
  // I also did not use some of the functions it offered since they were unneccessary
  const button = document.createElement("button");
  button.disabled = true;
  const display = document.createElement("div");
  const content = document.createElement("div");
  
  button.classList.add("button");
  display.classList.add("display");
  content.classList.add("content");

  buttons.push(button);
  displays.push(display);

  updateItemDisplay(item, button, display);
  content.innerHTML = item.desc;

  app.append(button);
  app.append(content);
  app.append(display);
  button.addEventListener("click", () => {
    item.purchaseUpgrade();
    updateItemDisplay(item, button, display);
  });
});

function updateItemDisplay(item: Item, button: HTMLButtonElement, display: HTMLElement) {
    const costNum = item.cost.toFixed(2);
    button.innerHTML = `Purchase ${item.name} for ${costNum}`;
    display.innerHTML = `${item.amount} Gallons of ${item.name} Milk has been purchased.`;
    checkPurchase(item, button);
}

function checkAllPurchases(items: Item[], buttons: HTMLButtonElement[]) {
  for (let i = 0; i < items.length; i++) {
    checkPurchase(items[i], buttons[i]);
  }
}

function checkPurchase(item: Item, button: HTMLButtonElement) {
    if (totalCount >= item.cost) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
}


function updateDisplay() {
  const increaseNum = totalIncrease.toFixed(1);
  growthDisplay.innerHTML = `Freeze Rate: ${increaseNum} tea spoons of ice cream cooled per second`;
}

function updateCounter() {
  const countNum = totalCount.toFixed(1);
  counter.innerHTML = `${countNum} tea spoons`;
  checkAllPurchases(availableItems, buttons);
}

// on click purchase will deduct
function countIncrease() {
  totalCount += totalIncrease;
  updateCounter();
}

function clickIncrease() {
  totalCount += 1;
  updateCounter();
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
// I took reference from requestAnimationFrame() for the elapse function.
// The example function I used was function animate() where they used performance.now()
// Now I am checking if the value has reached 1 to indicate 1000 ms has passed.
// when it passes then the count increases
const zero = performance.now();
let currentTime = 0;
function elapse(timestamp: number) {
  const decimalValue = (timestamp - zero) / 1000;
  const elapsedSeconds = decimalValue - (decimalValue % 1);
  increasePerSecond(elapsedSeconds);
  requestAnimationFrame((t) => elapse(t));
}

function increasePerSecond(newTime: number) {
  if (newTime > currentTime) {
    currentTime = newTime;
    countIncrease();
  }
}

updateDisplay();