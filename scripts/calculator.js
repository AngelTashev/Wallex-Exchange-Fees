const fromCurr = document.getElementById('from-curr');
const toCurr = document.getElementById('to-curr');
const feeSelect = document.getElementById('fee-select');
const customRateCheck = document.getElementById('custom-rate-check');
const customRate = document.getElementById('custom-rate');
const amountContainer = document.getElementById('amount');
const resultContainer = document.getElementById('result');
const forRate = document.getElementById('for-rate');
const convertButton = document.getElementById('convert-btn');

const map = {
    'btceur': 'XXBTZEUR',
    'eurbtc': 'XXBTZEUR',
    'btcusd': 'XXBTZUSD',
    'usdbtc': 'XXBTZUSD',

    'bcheur': 'BCHEUR',
    'eurbch': 'BCHEUR',
    'bchusd': 'BCHUSD',
    'usdbch': 'BCHUSD',

    'etheur': 'XETHZEUR',
    'eureth': 'XETHZEUR',
    'ethusd': 'XETHZUSD',
    'usdeth': 'XETHZUSD',

    'etceur': 'XETCZEUR',
    'euretc': 'XETCZEUR',
    'etcusd': 'XETCZUSD',
    'usdetc': 'XETCZUSD',
}

function calculatePrice() {
    let rate = 0;
    let result = 0;
    const fee = feeSelect.value;
    const amount = amountContainer.value;
    const valueToGet = map[fromCurr.value + toCurr.value];

    if(customRateCheck.checked) {
        rate = customRate.value;
    } else {
        rate = exchanges[valueToGet]['exchangePrice'];
    }

    switch (fromCurr.value) {
        case 'eur': case 'usd':
            rate = rate * (1 + fee/100);
            forRate.innerHTML = `${formatCurrency(Number(rate))} ${fromCurr.value.toUpperCase()}`;
            result = (amount / rate).toFixed(8);
            break;
        default:
            rate = rate * (1 - fee/100);
            forRate.innerHTML = `${formatCurrency(Number(rate))} ${toCurr.value.toUpperCase()}`;
            result = formatCurrency(amount * rate);
            break;
    }

    resultContainer.innerHTML = `${result} ${toCurr.value.toUpperCase()}`;
}

function attachListener() {
    convertButton.addEventListener('click', (e) => {
        e.preventDefault();
        calculatePrice();
    });
}

attachListener();