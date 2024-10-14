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
    // 10 * 1.15 = 11.5 - second one
    this.cost = this.cost * 1.15;
    this.updateButton();
  }

  updateButton() {
    const costNum = this.cost.toFixed(2);
    this.button.innerHTML = `Purchase ${this.name} for ${costNum}`;
  }

  purchaseUpgrade() {
    count -= this.cost;
    increase += this.rate; // issue with decimals
    this.increaseAmount();
    updateCounter();
    updateDisplay();
    this.increaseCost();
    requestAnimationFrame(elapse);
  }
  updateAmount() {
    this.display.innerHTML = `${this.amount} Gallons of ${this.name} Milk has been purchased.`;
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

let count: number = 0;
let increase: number = 0;
button.innerHTML = "🍨";
button.addEventListener("click", clickIncrease);

availableItems.map((item) => {
  console.log(item);
  item.button.disabled = true;
  item.button.addEventListener("click", () => {
    item.purchaseUpgrade();
  });
});

function checkPurchase() {
  for (const item of availableItems) {
    if (count >= item.cost) {
      item.button.disabled = false;
    } else {
      item.button.disabled = true;
    }
  }
}

function updateDisplay() {
  const increaseNum = increase.toFixed(1);
  growthDisplay.innerHTML = `Freeze Rate: ${increaseNum} tea spoons of ice cream cooled per second`;
}

function updateCounter() {
  const countNum = count.toFixed(1);
  counter.innerHTML = `${countNum} tea spoons`;
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

// -- Initialization
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
