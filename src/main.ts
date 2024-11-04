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
  button: HTMLButtonElement;
  display: HTMLElement;
  content: HTMLElement;
  desc: string;

  constructor(
    name: string,
    cost: number,
    rate: number,
    amount: number,
    desc: string,
    // button: HTMLButtonElement,
    // display: HTMLElement,
  ) {
    this.name = name;
    this.cost = cost;
    this.rate = rate;
    this.amount = amount; // amount will be called
    this.button = document.createElement("button");
    this.display = document.createElement("div");
    this.content = document.createElement("div");
    this.desc = desc;
    this.content.innerHTML = this.desc;
  }
  increaseAmount() {
    // increase the amount purchased of this item
    this.amount++;
    this.updateAmount();
  }

  increaseCost() {
    // exponentially grow the cost
    this.cost = this.cost * 1.15;
    this.updateButton();
  }

  updateButton() {
    const costNum = this.cost.toFixed(2);
    this.button.innerHTML = `Purchase ${this.name} for ${costNum}`;
  }

  purchaseUpgrade() {
    this.updateRate();
    this.updateItem();
    updateCounter();
    updateDisplay();
    requestAnimationFrame(elapse);
  }
  updateAmount() {
    this.display.innerHTML = `${this.amount} Gallons of ${this.name} Milk has been purchased.`;
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

const availableItems: Item[] = [
  new Item("Vanilla", 10, 0.1, 0, "Pure, plain, simple vanilla."),
  new Item("Strawberry", 100, 2.0, 0, "A little bit more refreshing flavor."),
  new Item("Banana", 250, 15, 0, "Makes the monkeys go faster."),
  new Item(
    "Chocolate",
    1000,
    50,
    0,
    "A classic, probably don't give to the monkeys.",
  ),
  new Item(
    "Coffee",
    2500,
    200,
    0,
    "Bout to go fast with this flavor town delight.",
  ),
];

let totalCount: number = 0;
let totalIncrease: number = 0;
button.innerHTML = "🍨";
button.addEventListener("click", clickIncrease);

availableItems.map((item) => {
  item.button.disabled = true;
  item.button.addEventListener("click", () => {
    item.purchaseUpgrade();
  });
});

function checkPurchase() {
  for (const item of availableItems) {
    if (totalCount >= item.cost) {
      item.button.disabled = false;
    } else {
      item.button.disabled = true;
    }
  }
}

function updateDisplay() {
  const increaseNum = totalIncrease.toFixed(1);
  growthDisplay.innerHTML = `Freeze Rate: ${increaseNum} tea spoons of ice cream cooled per second`;
}

function updateCounter() {
  const countNum = totalCount.toFixed(1);
  counter.innerHTML = `${countNum} tea spoons`;
  checkPurchase();
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

for (const item of availableItems) {
  item.updateButton();
}
updateDisplay();
app.append(growthDisplay);
app.append(button);
app.append(counter);
for (const item of availableItems) {
  app.append(item.button);
  app.append(item.desc);
  app.append(item.display);
}
