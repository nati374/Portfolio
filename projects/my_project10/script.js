// API Key (Replace with your own API key from ExchangeRate-API)
const API_KEY = "3eb9095d68954fdf9f65af8a";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

// DOM Elements
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");
const convertBtn = document.getElementById("convert-btn");
const swapBtn = document.getElementById("swap-btn");
const resultText = document.getElementById("result-text");
const updateTime = document.getElementById("update-time");

// Currency and Country Data
const currencies = [
    { code: "USD", name: "United States Dollar", flag: "us" },
    { code: "EUR", name: "Euro", flag: "eu" },
    { code: "GBP", name: "British Pound", flag: "gb" },
    { code: "JPY", name: "Japanese Yen", flag: "jp" },
    { code: "INR", name: "Indian Rupee", flag: "in" },
    { code: "AUD", name: "Australian Dollar", flag: "au" },
    { code: "CAD", name: "Canadian Dollar", flag: "ca" },
    { code: "CHF", name: "Swiss Franc", flag: "ch" },
    { code: "CNY", name: "Chinese Yuan", flag: "cn" },
    { code: "NZD", name: "New Zealand Dollar", flag: "nz" },
];

// Fetch currencies and populate dropdowns
function populateCurrencies() {
    currencies.forEach(currency => {
        const option1 = document.createElement("option");
        option1.value = currency.code;
        option1.textContent = `${currency.code} - ${currency.name}`;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency.code;
        option2.textContent = `${currency.code} - ${currency.name}`;
        toCurrency.appendChild(option2);
    });

    // Set default values
    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
    updateFlags();
}

// Update flags based on selected currencies
function updateFlags() {
    const fromCode = fromCurrency.value.toLowerCase();
    const toCode = toCurrency.value.toLowerCase();
    fromFlag.className = `flag-icon flag-icon-${fromCode}`;
    toFlag.className = `flag-icon flag-icon-${toCode}`;
}

// Convert currency
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount)) {
        resultText.textContent = "Please enter a valid amount.";
        return;
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`);
        const data = await response.json();

        if (data.result === "success") {
            const convertedAmount = data.conversion_result.toFixed(2);
            resultText.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
            updateTime.textContent = new Date(data.time_last_update_utc).toLocaleString();
        } else {
            resultText.textContent = "Conversion failed. Please try again.";
        }
    } catch (error) {
        console.error("Error converting currency:", error);
        resultText.textContent = "Failed to convert currency. Please try again later.";
    }
}

// Swap currencies
function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    updateFlags();
    convertCurrency();
}

// Event Listeners
convertBtn.addEventListener("click", convertCurrency);
swapBtn.addEventListener("click", swapCurrencies);
fromCurrency.addEventListener("change", updateFlags);
toCurrency.addEventListener("change", updateFlags);

// Initialize
populateCurrencies();