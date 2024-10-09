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
let count: number = 0;
button.innerHTML = "🍨";
counter.innerHTML = `${count} calories`;

// button.onclick = () => {
//   // event occur
//   console.log("is clicked");
//   count += 1;
//   console.log('count: ', count);
// };

button.addEventListener("click", countIncrease);

function countIncrease() {
  console.log("is clicked");
  count += 1;
  console.log("count: ", count);
  counter.innerHTML = `${count} calories`;
}

app.append(button);
app.append(counter);
