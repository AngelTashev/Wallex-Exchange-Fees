const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const krakenEndpoint = 'https://api.kraken.com/0/public/';
const ticker = krakenEndpoint + 'Ticker?pair=XBTEUR,ETHEUR,ETCEUR,BCHEUR,XBTUSD,ETHUSD,ETCUSD,BCHUSD';
const time = krakenEndpoint + 'Time';
const template = document.getElementById('container-template');
const templateHTML = template.innerHTML;
const priceArticlesContainer = document.getElementsByClassName('price-articles')[0];
const refreshBtn = document.getElementById('refresh-btn');
const timeContainer = document.getElementById('last-refresh-text');
let seconds = 0;

let interval;

// exchange prices container
const exchanges = {};

async function displayInfo() {

    clearInterval(interval);
    await loadData();
    seconds = 0;
    interval = setInterval(setTime, 1000);
    setTime();

    priceArticlesContainer.innerHTML = generateHTML();
}

async function loadData() {

    await Promise.all([await fetch(ticker).then(res => res.json())])
        .then(res => {
            let data = res[0].result;

            for (let curr of Object.keys(data)) {
                const exchangePrice = res[0].result[curr].c[0];
                exchanges[curr] = { exchangePrice };
            }
        });

}

function attachRefreshListener() {
    refreshBtn.addEventListener('click', e => {
        e.preventDefault();
        displayInfo();
    });
}

function generateHTML() {

    let map = {
        0: {
            'name': 'Bitcoin (BTC)',
            'eurPrice': exchanges.XXBTZEUR.exchangePrice,
            'usdPrice': exchanges.XXBTZUSD.exchangePrice,
        },
        1: {
            'name': 'Bitcoin Cash (BCH)',
            'eurPrice': exchanges.BCHEUR.exchangePrice,
            'usdPrice': exchanges.BCHUSD.exchangePrice,
        },
        2: {
            'name': 'Ethereum (ETH)',
            'eurPrice': exchanges.XETHZEUR.exchangePrice,
            'usdPrice': exchanges.XETHZUSD.exchangePrice,
        },
        3: {
            'name': 'Eth. Classic (ETC)',
            'eurPrice': exchanges.XETCZEUR.exchangePrice,
            'usdPrice': exchanges.XETCZUSD.exchangePrice,
        },

    }

    let sections = '<section class="price-articles-section">';

    for (let i = 0; i < 4; i++) {
        if (i == 2) {
            sections += '</section><section class="price-articles-section">';
        }
        sections += createArticle(map[i]);
    }
    section = '</section>';

    return sections;
}

function createArticle(currencyObject) {
    let article = templateHTML
            .replace(/{{name}}/g, currencyObject.name)
            .replace(/{{eurPrice}}/g, formatCurrency(currencyObject.eurPrice))
            .replace(/{{usdPrice}}/g, formatCurrency(currencyObject.usdPrice))
    return article;
}

function formatCurrency(number) {
    number = Number(number).toFixed(2);
    return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}

function setTime() {
    let minutes = parseInt(seconds / 60);
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    let displaySeconds = seconds;
    displaySeconds %= 60;
    if (displaySeconds < 10) {
        displaySeconds = '0' + displaySeconds;
    }
    timeContainer.innerHTML = `${minutes}:${displaySeconds}`;
    seconds++;
}

displayInfo();
attachRefreshListener();