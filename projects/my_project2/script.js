// Check if Speech Recognition is supported
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;

// Storage for notes
let notes = [];

// Start listening
function startListening() {
    document.getElementById("status").innerText = "Listening...";
    recognition.start();
}

// Process voice commands
recognition.onresult = async function(event) {
    let command = event.results[0][0].transcript.toLowerCase();
    document.getElementById("status").innerText = "You said: " + command;

    if (command.includes("what's the weather")) {
        getWeather();
    } 
    else if (command.includes("what time is it")) {
        tellTime();
    } 
    else if (command.includes("change background to")) {
        changeBackground(command);
    }
    else if (command.includes("open")) {
        openWebsite(command);
    }
    else if (command.includes("save a note")) {
        saveNote();
    } 
    else if (command.includes("show my notes")) {
        showNotes();
    } 
    else if (command.includes("tell me a joke")) {
        tellJoke();
    } 
    else {
        speak("Sorry, I don't understand that command.");
    }
};

// Function to speak responses
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

// 1️⃣ **Get Live Weather** 🌤️
async function getWeather() {
    speak("Fetching the weather...");
    try {
        let response = await fetch("https://api.weatherapi.com/v1/current.json?key=3f64a5cfe10242a1a45185938251603&q=Addis Ababa");
        let data = await response.json();
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;
        speak(`The current temperature is ${temp} degrees Celsius and the weather is ${condition}.`);
    } catch (error) {
        speak("Sorry, I couldn't get the weather.");
    }
}

// 2️⃣ **Tell the Current Time** 🕒
function tellTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;  // Convert 24-hour to 12-hour format
    let timeString = `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
    speak(`The current time is ${timeString}`);
}

// 3️⃣ **Change Background Color** 🎨
function changeBackground(command) {
    let colors = {
        "red": "red",
        "blue": "blue",
        "green": "green",
        "yellow": "yellow",
        "black": "black",
        "white": "white",
        "purple": "purple",
        "orange": "orange"
    };
    let colorName = Object.keys(colors).find(c => command.includes(c));
    if (colorName) {
        document.body.style.backgroundColor = colors[colorName];
        speak(`Changing background to ${colorName}`);
    } else {
        speak("Sorry, I don't know that color.");
    }
}

// 4️⃣ **Open Websites by Voice** 🌐
function openWebsite(command) {
    let sites = {
        "youtube": "https://www.youtube.com",
        "facebook": "https://www.facebook.com",
        "google": "https://www.google.com",
        "github": "https://github.com",
        "twitter": "https://twitter.com"
    };
    let siteName = Object.keys(sites).find(s => command.includes(s));
    if (siteName) {
        speak(`Opening ${siteName}`);
        window.open(sites[siteName], "_blank");
    } else {
        speak("Sorry, I can't open that website.");
    }
}

// 5️⃣ **Save Notes by Voice** 📝
function saveNote() {
    speak("What note would you like to save?");
    recognition.onresult = function(event) {
        let note = event.results[0][0].transcript;
        notes.push(note);
        speak("Note saved: " + note);
    };
    recognition.start();
}

// 6️⃣ **Show Saved Notes** 📖
function showNotes() {
    if (notes.length === 0) {
        speak("You have no saved notes.");
    } else {
        let allNotes = notes.join(", ");
        speak("Here are your notes: " + allNotes);
    }
}

// 7️⃣ **Tell a Random Joke** 😂
function tellJoke() {
    let jokes = [
        "Why don't skeletons fight each other? Because they don't have the guts!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "Why can't your nose be 12 inches long? Because then it would be a foot!"
    ];
    let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    speak(randomJoke);
}