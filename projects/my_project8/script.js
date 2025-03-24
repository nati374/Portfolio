const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const speedInput = document.getElementById("speed");
const pitchInput = document.getElementById("pitch");
const speedValue = document.getElementById("speed-value");
const pitchValue = document.getElementById("pitch-value");
const speakBtn = document.getElementById("speak-btn");
const pauseBtn = document.getElementById("pause-btn");
const resumeBtn = document.getElementById("resume-btn");
const stopBtn = document.getElementById("stop-btn");
const downloadBtn = document.getElementById("download-btn");
const themeToggle = document.getElementById("theme-toggle");
const charCount = document.getElementById("char-count");

let voices = [];
let utterance = new SpeechSynthesisUtterance();

// Load voices
function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";
    
    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

window.speechSynthesis.onvoiceschanged = loadVoices;

// Speak text
function speakText() {
    if (!textInput.value.trim()) return;
    
    utterance.text = textInput.value;
    utterance.voice = voices[voiceSelect.value];
    utterance.rate = parseFloat(speedInput.value);
    utterance.pitch = parseFloat(pitchInput.value);
    
    speechSynthesis.speak(utterance);
}

// Pause speech
function pauseSpeech() {
    speechSynthesis.pause();
}

// Resume speech
function resumeSpeech() {
    speechSynthesis.resume();
}

// Stop speech
function stopSpeech() {
    speechSynthesis.cancel();
}

// Download speech as MP3
function downloadSpeech() {
    const text = textInput.value.trim();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices[voiceSelect.value];

    if (voice) utterance.voice = voice;
    utterance.rate = parseFloat(speedInput.value);
    utterance.pitch = parseFloat(pitchInput.value);

    const audio = new Audio();
    audio.src = `https://api.voicerss.org/?key=25bff35e166e47be9533e69a7a6c547a=en-us&src=${encodeURIComponent(text)}`;
    audio.play();
}

// Auto-save text
textInput.addEventListener("input", () => {
    localStorage.setItem("savedText", textInput.value);
    charCount.textContent = `Characters: ${textInput.value.length}`;
});

// Load saved text
window.addEventListener("load", () => {
    textInput.value = localStorage.getItem("savedText") || "";
    charCount.textContent = `Characters: ${textInput.value.length}`;
});

// Update speed and pitch display
speedInput.addEventListener("input", () => speedValue.textContent = `${speedInput.value}x`);
pitchInput.addEventListener("input", () => pitchValue.textContent = `${pitchInput.value}x`);

// Dark/Light Mode Toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀ Light Mode" : "🌙 Dark Mode";
});

// Button Listeners
speakBtn.addEventListener("click", speakText);
pauseBtn.addEventListener("click", pauseSpeech);
resumeBtn.addEventListener("click", resumeSpeech);
stopBtn.addEventListener("click", stopSpeech);
downloadBtn.addEventListener("click", downloadSpeech);