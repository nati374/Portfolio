// Get DOM elements
const textInput = document.getElementById('text-input');
const speakButton = document.getElementById('speak-button');
const stopButton = document.getElementById('stop-button');

// Initialize speech synthesis
const synth = window.speechSynthesis;
let utterance;

// Speak function
speakButton.addEventListener('click', () => {
  if (textInput.value.trim() !== '') {
    utterance = new SpeechSynthesisUtterance(textInput.value);
    synth.speak(utterance);
  } else {
    alert('Please enter some text to convert to speech.');
  }
});

// Stop function
stopButton.addEventListener('click', () => {
  if (synth.speaking) {
    synth.cancel();
  }
});