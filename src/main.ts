import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Ice Cream Scooping!";
document.title = gameName;

const topSign = document.createElement("div");
topSign.className = "sign";
const header = document.createElement("h1");
header.innerHTML = gameName;
const subheader = document.createElement("h2");
subheader.innerHTML = "Give that a BIG SCOOP of ice cream :))";
topSign.appendChild(header);
topSign.appendChild(subheader);
app.append(topSign);

let totalCount: number = 0;
let totalIncrease: number = 0;
let increaseNum = totalIncrease.toFixed(1);

// statistics + top menu
const counterDisplay = document.createElement("div");
const counter = document.createElement("div");
counterDisplay.className = "counter";

const counterHeader = document.createElement("h2");
counterHeader.innerHTML = "You currently have: ";
counterDisplay.appendChild(counterHeader);

const button = document.createElement("button");
button.className = "main-button";
const image = document.createElement("div");
image.innerHTML = "🥄🍨";
button.appendChild(image);

const growthDisplay = document.createElement("div");
growthDisplay.className = "growth-display";

const growthHeader = document.createElement("h2");
growthHeader.innerHTML = "Freeze Rate: ";
const rate = document.createElement("h2");
rate.className = "rate";

rate.innerHTML = `${increaseNum}`;
const description = document.createTextNode(
  "tea spoons of ice cream cooled per second",
);

growthDisplay.appendChild(growthHeader);
growthDisplay.appendChild(rate);
growthDisplay.appendChild(description);

const shop = document.createElement("div");
shop.className = "shop";

app.append(counterDisplay);
app.append(counter);
app.append(button);
app.append(shop);
app.append(growthDisplay);

button.addEventListener(
  "click",
  (e) => {
    // https://css-tricks.com/restart-css-animation/
    // https://epaz0.github.io/cmpm-121-demo-1/
    // referenced both website and peer code to add animations
    e.preventDefault();
    clickIncrease();
    image.classList.remove("run-animation");
    void image.offsetWidth;

    image.classList.add("run-animation");
  },
  false,
);
const buttons: HTMLButtonElement[] = [];
const displays: HTMLElement[] = [];

class Item {
  name: string;
  image: string;
  cost: number;
  rate: number;
  amount: number;
  desc: string;

  constructor(
    name: string,
    image: string,
    cost: number,
    rate: number,
    amount: number,
    desc: string,
  ) {
    this.name = name;
    this.image = image;
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
// 🥄
const availableItems: Item[] = [
  new Item("Vanilla", "🍦", 10, 0.1, 0, "Pure, plain, simple vanilla."),
  new Item(
    "Strawberry",
    "🍓",
    100,
    2.0,
    0,
    "A little bit more refreshing flavor.",
  ),
  new Item("Banana", "🍌", 250, 15, 0, "Makes the monkeys go faster."),
  new Item(
    "Chocolate",
    "🍫",
    1000,
    50,
    0,
    "A classic, probably don't give to the monkeys.",
  ),
  new Item(
    "Coffee",
    "☕",
    2500,
    200,
    0,
    "Bout to go fast with this flavor town delight.",
  ),
];

availableItems.map((item) => {
  // https://chat.brace.tools/c/38fd3aec-616c-4736-9858-c7d59d586df8
  // I referenced a lot of Brace recommendations for cleaning up divergent code
  // I now separate the button logic and store the displays inside of arrays
  // I used most of the recommendations that Brace offered but I changed where the logic is being used
  // I also did not use some of the functions it offered since they were unneccessary
  const container = document.createElement("div");
  container.className = "container";
  const button = document.createElement("button");
  button.disabled = true;
  const display = document.createElement("div");
  const content = document.createElement("div");
  // https://maozblan.github.io/cmpm-121-demo-1/
  // I vaguely took inspiration from this person's code to organize the items to sell
  container.appendChild(button);
  container.appendChild(display);
  container.appendChild(content);

  buttons.push(button);
  displays.push(display);

  updateItemDisplay(item, button, display);
  content.innerHTML = item.desc;

  shop.append(container);

  button.addEventListener("click", () => {
    item.purchaseUpgrade();
    updateCounter();
    updateDisplay();
    updateItemDisplay(item, button, display);
    image.innerHTML = "🥄" + item.image;
  });
});

function updateItemDisplay(
  item: Item,
  button: HTMLButtonElement,
  display: HTMLElement,
) {
  const costNum = item.cost.toFixed(2);
  button.innerHTML = `Purchase ${item.name} for ${costNum}`;
  display.innerHTML = `${item.amount} Gallons of ${item.name} Milk has been purchased.`;
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
  increaseNum = totalIncrease.toFixed(1);
  rate.innerHTML = `${increaseNum}`;
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

const credit = document.createElement("div");
credit.innerHTML =
  "Credit to https://epaz0.github.io/cmpm-121-demo-1/ for the cool bounce animation!";
app.append(credit);
updateCounter();
