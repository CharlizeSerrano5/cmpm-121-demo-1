import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My in-progress game to submit!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// create a button
const button = document.createElement('button');
button.innerHTML = "🍨";
button.onclick = () => {
    // event occur
    console.log('is clicked');
};

app.append(button);