
// ==========================================
// VYRO — CURRENCY CONVERTER
// ==========================================

// CURRENCIES

const currencies = [
    { code: "USD", name: "US Dollar", flag: "us" },
    { code: "NGN", name: "Nigerian Naira", flag: "ng" },
    { code: "GBP", name: "British Pound", flag: "gb" },
    { code: "EUR", name: "Euro", flag: "eu" },
    { code: "CAD", name: "Canadian Dollar", flag: "ca" },
    { code: "AUD", name: "Australian Dollar", flag: "au" },
    { code: "NZD", name: "New Zealand Dollar", flag: "nz" },
    { code: "JPY", name: "Japanese Yen", flag: "jp" },
    { code: "CNY", name: "Chinese Yuan", flag: "cn" },
    { code: "INR", name: "Indian Rupee", flag: "in" },
    { code: "ZAR", name: "South African Rand", flag: "za" },
    { code: "GHS", name: "Ghanaian Cedi", flag: "gh" },
    { code: "KES", name: "Kenyan Shilling", flag: "ke" },
    { code: "UGX", name: "Ugandan Shilling", flag: "ug" },
    { code: "TZS", name: "Tanzanian Shilling", flag: "tz" },
    { code: "XOF", name: "West African CFA Franc", flag: "sn" },
    { code: "XAF", name: "Central African CFA Franc", flag: "cm" },
    { code: "EGP", name: "Egyptian Pound", flag: "eg" },
    { code: "MAD", name: "Moroccan Dirham", flag: "ma" },
    { code: "AED", name: "UAE Dirham", flag: "ae" },
    { code: "SAR", name: "Saudi Riyal", flag: "sa" },
    { code: "QAR", name: "Qatari Riyal", flag: "qa" },
    { code: "KWD", name: "Kuwaiti Dinar", flag: "kw" },
    { code: "BHD", name: "Bahraini Dinar", flag: "bh" },
    { code: "OMR", name: "Omani Rial", flag: "om" },
    { code: "TRY", name: "Turkish Lira", flag: "tr" },
    { code: "CHF", name: "Swiss Franc", flag: "ch" },
    { code: "SEK", name: "Swedish Krona", flag: "se" },
    { code: "NOK", name: "Norwegian Krone", flag: "no" },
    { code: "DKK", name: "Danish Krone", flag: "dk" },
    { code: "PLN", name: "Polish Zloty", flag: "pl" },
    { code: "CZK", name: "Czech Koruna", flag: "cz" },
    { code: "HUF", name: "Hungarian Forint", flag: "hu" },
    { code: "RON", name: "Romanian Leu", flag: "ro" },
    { code: "BGN", name: "Bulgarian Lev", flag: "bg" },
    { code: "RUB", name: "Russian Ruble", flag: "ru" },
    { code: "UAH", name: "Ukrainian Hryvnia", flag: "ua" },
    { code: "BRL", name: "Brazilian Real", flag: "br" },
    { code: "MXN", name: "Mexican Peso", flag: "mx" },
    { code: "ARS", name: "Argentine Peso", flag: "ar" },
    { code: "CLP", name: "Chilean Peso", flag: "cl" },
    { code: "COP", name: "Colombian Peso", flag: "co" },
    { code: "PEN", name: "Peruvian Sol", flag: "pe" },
    { code: "KRW", name: "South Korean Won", flag: "kr" },
    { code: "SGD", name: "Singapore Dollar", flag: "sg" },
    { code: "HKD", name: "Hong Kong Dollar", flag: "hk" },
    { code: "TWD", name: "Taiwan Dollar", flag: "tw" },
    { code: "THB", name: "Thai Baht", flag: "th" },
    { code: "MYR", name: "Malaysian Ringgit", flag: "my" },
    { code: "IDR", name: "Indonesian Rupiah", flag: "id" },
    { code: "PHP", name: "Philippine Peso", flag: "ph" },
    { code: "VND", name: "Vietnamese Dong", flag: "vn" },
    { code: "PKR", name: "Pakistani Rupee", flag: "pk" },
    { code: "BDT", name: "Bangladeshi Taka", flag: "bd" },
    { code: "LKR", name: "Sri Lankan Rupee", flag: "lk" },
    { code: "NPR", name: "Nepalese Rupee", flag: "np" },
    { code: "ISK", name: "Icelandic Krona", flag: "is" },
    { code: "DZD", name: "Algerian Dinar", flag: "dz" },
    { code: "TND", name: "Tunisian Dinar", flag: "tn" },
    { code: "ETB", name: "Ethiopian Birr", flag: "et" },
    { code: "MUR", name: "Mauritian Rupee", flag: "mu" },
    { code: "BWP", name: "Botswana Pula", flag: "bw" },
    { code: "ZMW", name: "Zambian Kwacha", flag: "zm" },
    { code: "RWF", name: "Rwandan Franc", flag: "rw" },
    { code: "XPF", name: "CFP Franc", flag: "pf" },
    { code: "FJD", name: "Fijian Dollar", flag: "fj" },
    { code: "JMD", name: "Jamaican Dollar", flag: "jm" },
    { code: "DOP", name: "Dominican Peso", flag: "do" },
    { code: "CRC", name: "Costa Rican Colon", flag: "cr" },
    { code: "UYU", name: "Uruguayan Peso", flag: "uy" },
    { code: "ILS", name: "Israeli New Shekel", flag: "il" }
];


// ==========================================
// GLOBAL VARIABLES
// ==========================================

let selectedFrom = "USD";
let selectedTo = "NGN";

let activePicker = "from";
let rateCache = {};

let chartData = [];
let activePeriod = "7D";
let chartPoints = [];

let chartAnimationFrame = null;
let chartRequestId = 0;
let hoveredPoint = null;

// Result animation
let resultAnimationFrame = null;
let displayedResult = 0;


// ==========================================
// ELEMENTS
// ==========================================

const amountInput = document.getElementById("amount");
const resultDisplay = document.getElementById("result");

const fromButton = document.getElementById("fromCurrency");
const toButton = document.getElementById("toCurrency");
const swapButton = document.getElementById("swapButton");

const rateInfo = document.getElementById("rateInfo");
const lastUpdated = document.getElementById("lastUpdated");

const modal = document.getElementById("currencyModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModal = document.getElementById("closeModal");

const currencySearch = document.getElementById("currencySearch");
const currencyList = document.getElementById("currencyList");
// CONVERSION HISTORY

const historyList = document.getElementById("historyList");
const clearHistoryButton = document.getElementById("clearHistory");

const HISTORY_KEY = "vyroConversionHistory";

let historyTimeout = null;


// ==========================================
// HELPERS
// ==========================================

function getCurrency(code) {
    return currencies.find(currency => currency.code === code);
}

function formatNumber(number, maximumDigits = 2) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: maximumDigits
    }).format(number);
}

function getFlag(code) {
    const currency = getCurrency(code);

    if (!currency) return "";

    return `https://flagcdn.com/w40/${currency.flag}.png`;
}

function updateCurrencyButton(button, code) {
    const currency = getCurrency(code);

    if (!currency || !button) return;

    button.innerHTML = `
        <img src="${getFlag(code)}" alt="">
        <span>${currency.code}</span>
        <span class="select-arrow">⌄</span>
    `;
}


// ==========================================
// ANIMATED CONVERSION RESULT
// ==========================================

function animateResult(target) {
    if (resultAnimationFrame) {
        cancelAnimationFrame(resultAnimationFrame);
        resultAnimationFrame = null;
    }

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !Number.isFinite(target)) {
        displayedResult = target;
        resultDisplay.textContent = formatNumber(target, 2);
        return;
    }

    const start = Number.isFinite(displayedResult)
        ? displayedResult
        : target;

    const difference = target - start;

    if (Math.abs(difference) < 0.000001) {
        displayedResult = target;
        resultDisplay.textContent = formatNumber(target, 2);
        return;
    }

    const duration = 500;
    const startTime = performance.now();

    function update(now) {
        const progress = Math.min(
            (now - startTime) / duration,
            1
        );

        const eased = 1 - Math.pow(1 - progress, 4);

        const current = start + difference * eased;

        resultDisplay.textContent = formatNumber(current, 2);

        if (progress < 1) {
            resultAnimationFrame = requestAnimationFrame(update);
        } else {
            displayedResult = target;
            resultDisplay.textContent = formatNumber(target, 2);
            resultAnimationFrame = null;
        }
    }

    resultAnimationFrame = requestAnimationFrame(update);
}

function resetResultAnimation() {
    if (resultAnimationFrame) {
        cancelAnimationFrame(resultAnimationFrame);
        resultAnimationFrame = null;
    }
}


// ==========================================
// EXCHANGE RATE DATA
// ==========================================

async function fetchRates(base) {
    const cached = rateCache[base];

    if (
        cached &&
        Date.now() - cached.time < 30 * 60 * 1000
    ) {
        return cached.rates;
    }

    const response = await fetch(
        `https://open.er-api.com/v6/latest/${base}`
    );

    if (!response.ok) {
        throw new Error("Could not connect to exchange-rate service.");
    }

    const data = await response.json();

    if (data.result !== "success") {
        throw new Error("Exchange-rate data is unavailable.");
    }

    rateCache[base] = {
        rates: data.rates,
        time: Date.now()
    };

    return data.rates;
}


// ==========================================
// CURRENCY CONVERTER
// ==========================================

let conversionRequestId = 0;

async function convertCurrency() {
    const requestId = ++conversionRequestId;
    const amount = Number(amountInput.value);

    if (!Number.isFinite(amount) || amount < 0) {
        resetResultAnimation();
        displayedResult = 0;
        resultDisplay.textContent = "—";
        return;
    }

    if (selectedFrom === selectedTo) {
        animateResult(amount);

        rateInfo.textContent = `1 ${selectedFrom} = 1 ${selectedTo}`;
        lastUpdated.textContent = "Same currency";
        return;
    }

    rateInfo.textContent = "Updating exchange rate...";

    try {
        const rates = await fetchRates(selectedFrom);

        if (requestId !== conversionRequestId) return;

        const rate = rates[selectedTo];

        if (!rate) {
            throw new Error("This currency pair is unavailable.");
        }

        const converted = amount * rate;

        animateResult(converted);

        rateInfo.textContent =
            `1 ${selectedFrom} = ${formatNumber(rate, 4)} ${selectedTo}`;

        lastUpdated.textContent =
            `Updated ${new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })}`;

    } catch (error) {
        if (requestId !== conversionRequestId) return;

        resetResultAnimation();
        resultDisplay.textContent = "Unavailable";

        rateInfo.textContent = error.message;
        lastUpdated.textContent = "Please try again";
    }
}


// ==========================================
// CURRENCY PICKER
// ==========================================

function renderCurrencyList(search = "") {
    const query = search.toLowerCase().trim();

    const filtered = currencies.filter(currency => {
        return (
            currency.code.toLowerCase().includes(query) ||
            currency.name.toLowerCase().includes(query)
        );
    });

    currencyList.innerHTML = "";

    if (filtered.length === 0) {
        currencyList.innerHTML =
            `<p class="market-loading">No currencies found.</p>`;
        return;
    }

    filtered.forEach(currency => {
        const option = document.createElement("button");

        option.className = "currency-option";

        option.innerHTML = `
            <img src="${getFlag(currency.code)}" alt="">
            <strong>${currency.code}</strong>
            <span>${currency.name}</span>
        `;

        option.addEventListener("click", () => {
            if (activePicker === "from") {
                selectedFrom = currency.code;
                updateCurrencyButton(fromButton, selectedFrom);
            } else {
                selectedTo = currency.code;
                updateCurrencyButton(toButton, selectedTo);
            }

            closeCurrencyModal();
            convertCurrency();
        });

        currencyList.appendChild(option);
    });
}

function openCurrencyModal(type) {
    activePicker = type;

    modal.classList.add("active");
    currencySearch.value = "";

    renderCurrencyList();

    setTimeout(() => currencySearch.focus(), 100);
}

function closeCurrencyModal() {
    modal.classList.remove("active");
}

fromButton.addEventListener("click", () => {
    openCurrencyModal("from");
});

toButton.addEventListener("click", () => {
    openCurrencyModal("to");
});

closeModal.addEventListener("click", closeCurrencyModal);
modalBackdrop.addEventListener("click", closeCurrencyModal);

currencySearch.addEventListener("input", () => {
    renderCurrencyList(currencySearch.value);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCurrencyModal();
    }
});


// ==========================================
// SWAP CURRENCIES
// ==========================================

swapButton.addEventListener("click", () => {
    const previousFrom = selectedFrom;

    selectedFrom = selectedTo;
    selectedTo = previousFrom;

    updateCurrencyButton(fromButton, selectedFrom);
    updateCurrencyButton(toButton, selectedTo);

    convertCurrency();
});


// ==========================================
// CONVERTER EVENTS
// ==========================================

amountInput.addEventListener("input", convertCurrency);


// ==========================================
// MARKET DASHBOARD
// ==========================================

const marketGrid = document.getElementById("marketGrid");
const marketBase = document.getElementById("marketBase");

const marketCurrencies = [
    "EUR", "GBP", "NGN",
    "JPY", "CAD", "AUD",
    "CHF", "CNY", "ZAR"
];

async function renderMarkets() {
    const base = marketBase.value;

    marketGrid.innerHTML =
        `<div class="market-loading">Updating market data...</div>`;

    try {
        const rates = await fetchRates(base);

        marketGrid.innerHTML = "";

        marketCurrencies
            .filter(code => code !== base)
            .forEach(code => {
                const currency = getCurrency(code);
                const rate = rates[code];

                if (!currency || !rate) return;

                const card = document.createElement("div");

                card.className = "market-card";

                card.innerHTML = `
                    <div class="market-card-top">
                        <span>${base} / ${code}</span>
                        <img
                            src="${getFlag(code)}"
                            alt=""
                            width="23"
                            height="16"
                        >
                    </div>

                    <h3>${code}</h3>
                    <p>${currency.name}</p>

                    <div class="market-rate">
                        ${formatNumber(rate, 4)}
                    </div>
                `;

                marketGrid.appendChild(card);
            });

        if (!marketGrid.children.length) {
            marketGrid.innerHTML =
                `<div class="market-loading">No market data available.</div>`;
        }

    } catch (error) {
        marketGrid.innerHTML =
            `<div class="market-loading">${error.message}</div>`;
    }
}

marketBase.addEventListener("change", renderMarkets);


// ==========================================
// HISTORICAL CHART ELEMENTS
// ==========================================

const chartCanvas = document.getElementById("rateChart");
const chartContext = chartCanvas.getContext("2d");

const chartBase = document.getElementById("chartBase");
const chartQuote = document.getElementById("chartQuote");

const chartPairTitle = document.getElementById("chartPairTitle");
const chartRate = document.getElementById("chartRate");
const chartLatest = document.getElementById("chartLatest");
const chartHigh = document.getElementById("chartHigh");
const chartLow = document.getElementById("chartLow");

const chartStatus = document.getElementById("chartStatus");
const chartFooterStatus = document.getElementById("chartFooterStatus");

const chartTooltip = document.getElementById("chartTooltip");
const tooltipDate = document.getElementById("tooltipDate");
const tooltipRate = document.getElementById("tooltipRate");

const periodButtons = document.querySelectorAll(".period-button");


// ==========================================
// CHART DATE HELPERS
// ==========================================

function getPeriodStart(period) {
    const date = new Date();

    switch (period) {
        case "7D":
            date.setDate(date.getDate() - 7);
            break;

        case "30D":
            date.setDate(date.getDate() - 30);
            break;

        case "90D":
            date.setDate(date.getDate() - 90);
            break;

        case "1Y":
            date.setFullYear(date.getFullYear() - 1);
            break;
    }

    return date.toISOString().split("T")[0];
}

function formatChartDate(date) {
    return new Date(date + "T00:00:00").toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );
}


// ==========================================
// LOAD HISTORICAL CHART DATA
// ==========================================

async function loadChart() {
    const requestId = ++chartRequestId;

    const base = chartBase.value;
    const quote = chartQuote.value;

    chartPairTitle.textContent = `${base} / ${quote}`;
    chartStatus.textContent = "Loading historical data...";
    chartFooterStatus.textContent = "Fetching data...";

    chartRate.textContent = "—";
    chartLatest.textContent = "—";
    chartHigh.textContent = "—";
    chartLow.textContent = "—";

    chartTooltip.style.display = "none";
    hoveredPoint = null;

    if (base === quote) {
        chartStatus.textContent = "Choose two different currencies.";
        chartFooterStatus.textContent = "Invalid currency pair";
        chartData = [];
        drawChart([]);
        return;
    }

    const start = getPeriodStart(activePeriod);
    const end = new Date().toISOString().split("T")[0];

    try {
        const url =
            `https://api.frankfurter.dev/v1/${start}..${end}?from=${base}&to=${quote}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Historical data is not available for this pair.");
        }

        const data = await response.json();

        if (requestId !== chartRequestId) return;

        if (!data.rates || Object.keys(data.rates).length === 0) {
            throw new Error("No historical data found for this period.");
        }

        const newChartData = Object.entries(data.rates)
            .map(([date, values]) => ({
                date,
                value: values[quote]
            }))
            .filter(point => Number.isFinite(point.value))
            .sort((a, b) => a.date.localeCompare(b.date));

        if (newChartData.length === 0) {
            throw new Error("No usable chart data was returned.");
        }

        chartData = newChartData;

        const values = chartData.map(point => point.value);

        const latest = values[values.length - 1];
        const highest = Math.max(...values);
        const lowest = Math.min(...values);

        chartRate.textContent = formatNumber(latest, 4);
        chartLatest.textContent = formatNumber(latest, 4);
        chartHigh.textContent = formatNumber(highest, 4);
        chartLow.textContent = formatNumber(lowest, 4);

        chartStatus.textContent =
            `${chartData.length} daily observations`;

        chartFooterStatus.textContent =
            `Updated ${formatChartDate(chartData[chartData.length - 1].date)}`;

        drawChart(chartData, true);

    } catch (error) {
        if (requestId !== chartRequestId) return;

        chartData = [];
        drawChart([]);

        chartStatus.textContent = error.message;
        chartFooterStatus.textContent = "Data unavailable";

        if (base === "NGN" || quote === "NGN") {
            chartBase.value = "USD";
            chartQuote.value = "EUR";

            chartPairTitle.textContent = "USD / EUR";
            chartStatus.textContent =
                "Historical NGN data isn't available here. Showing USD / EUR instead.";

            await loadChart();
        }
    }
}


// ==========================================
// CHART DRAWING ENGINE
// ==========================================

function drawChart(data, animate = false) {
    if (chartAnimationFrame) {
        cancelAnimationFrame(chartAnimationFrame);
        chartAnimationFrame = null;
    }

    const canvas = chartCanvas;
    const context = chartContext;

    const rect = canvas.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    if (!width || !height) return;

    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    chartPoints = [];

    if (!data || data.length < 2) {
        context.clearRect(0, 0, width, height);

        context.fillStyle = "#899493";
        context.font = "12px DM Sans";
        context.textAlign = "center";

        context.fillText(
            "Historical chart data will appear here.",
            width / 2,
            height / 2
        );

        return;
    }

    const padding = {
        top: 20,
        right: 15,
        bottom: 30,
        left: 15
    };

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const values = data.map(point => point.value);

    let min = Math.min(...values);
    let max = Math.max(...values);

    const difference = max - min;

    if (difference === 0) {
        min -= min * 0.01 || 1;
        max += max * 0.01 || 1;
    } else {
        min -= difference * 0.15;
        max += difference * 0.15;
    }

    chartPoints = data.map((point, index) => {
        const x = padding.left +
            (index / (data.length - 1)) * chartWidth;

        const y = padding.top +
            chartHeight -
            ((point.value - min) / (max - min)) * chartHeight;

        return {
            x,
            y,
            value: point.value,
            date: point.date
        };
    });

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const duration = animate && !reducedMotion ? 850 : 0;

    const startTime = performance.now();

    function renderFrame(now) {
        let progress = duration === 0
            ? 1
            : Math.min((now - startTime) / duration, 1);

        progress = 1 - Math.pow(1 - progress, 3);

        context.clearRect(0, 0, width, height);

        context.strokeStyle = "rgba(255,255,255,0.07)";
        context.lineWidth = 1;

        for (let i = 0; i < 4; i++) {
            const y = padding.top + (chartHeight / 3) * i;

            context.beginPath();
            context.moveTo(padding.left, y);
            context.lineTo(width - padding.right, y);
            context.stroke();
        }

        const visibleCount = Math.max(
            2,
            Math.ceil(chartPoints.length * progress)
        );

        const visiblePoints = chartPoints.slice(0, visibleCount);

        if (visiblePoints.length < 2) return;

        const lastVisible = visiblePoints[visiblePoints.length - 1];

        const gradient = context.createLinearGradient(
            0,
            padding.top,
            0,
            height
        );

        gradient.addColorStop(0, "rgba(181,245,213,0.23)");
        gradient.addColorStop(1, "rgba(181,245,213,0)");

        context.beginPath();

        context.moveTo(visiblePoints[0].x, height - padding.bottom);

        visiblePoints.forEach(point => {
            context.lineTo(point.x, point.y);
        });

        context.lineTo(lastVisible.x, height - padding.bottom);
        context.closePath();

        context.fillStyle = gradient;
        context.fill();

        context.beginPath();

        visiblePoints.forEach((point, index) => {
            if (index === 0) {
                context.moveTo(point.x, point.y);
            } else {
                context.lineTo(point.x, point.y);
            }
        });

        context.strokeStyle = "#b5f5d5";
        context.lineWidth = 2.5;
        context.lineJoin = "round";
        context.lineCap = "round";

        context.shadowColor = "rgba(181,245,213,0.3)";
        context.shadowBlur = 10;

        context.stroke();

        context.shadowBlur = 0;

        if (progress === 1) {
            const lastPoint = chartPoints[chartPoints.length - 1];

            context.beginPath();
            context.arc(lastPoint.x, lastPoint.y, 4, 0, Math.PI * 2);

            context.fillStyle = "#b5f5d5";
            context.fill();

            context.beginPath();
            context.arc(lastPoint.x, lastPoint.y, 8, 0, Math.PI * 2);

            context.strokeStyle = "rgba(181,245,213,0.35)";
            context.lineWidth = 1.5;
            context.stroke();
        }

        if (hoveredPoint) {
            const point = hoveredPoint;

            context.save();

            context.setLineDash([4, 5]);
            context.strokeStyle = "rgba(255,255,255,0.35)";
            context.lineWidth = 1;

            context.beginPath();
            context.moveTo(point.x, padding.top);
            context.lineTo(point.x, height - padding.bottom);
            context.stroke();

            context.setLineDash([]);

            context.beginPath();
            context.arc(point.x, point.y, 7, 0, Math.PI * 2);

            context.fillStyle = "#ffffff";
            context.fill();

            context.beginPath();
            context.arc(point.x, point.y, 11, 0, Math.PI * 2);

            context.strokeStyle = "rgba(181,245,213,0.45)";
            context.lineWidth = 1.5;
            context.stroke();

            context.restore();
        }

        if (progress < 1) {
            chartAnimationFrame = requestAnimationFrame(renderFrame);
        } else {
            chartAnimationFrame = null;
        }
    }

    if (duration === 0) {
        renderFrame(startTime);
    } else {
        chartAnimationFrame = requestAnimationFrame(renderFrame);
    }
}


// ==========================================
// CHART HOVER + TOUCH INTERACTION
// ==========================================

function handleChartPointer(event) {
    if (!chartPoints.length) return;

    const rect = chartCanvas.getBoundingClientRect();

    const pointerX = event.clientX - rect.left;

    let nearest = null;
    let smallestDistance = Infinity;

    chartPoints.forEach(point => {
        const distance = Math.abs(point.x - pointerX);

        if (distance < smallestDistance) {
            smallestDistance = distance;
            nearest = point;
        }
    });

    if (!nearest || smallestDistance > 40) {
        hoveredPoint = null;
        chartTooltip.style.display = "none";
        drawChart(chartData, false);
        return;
    }

    hoveredPoint = nearest;

    tooltipDate.textContent = formatChartDate(nearest.date);

    tooltipRate.textContent =
        `${formatNumber(nearest.value, 4)} ${chartQuote.value}`;

    chartTooltip.style.display = "block";

    const tooltipWidth = chartTooltip.offsetWidth;
    const tooltipHeight = chartTooltip.offsetHeight;

    let tooltipX = nearest.x + 14;
    let tooltipY = nearest.y - tooltipHeight - 14;

    if (tooltipX + tooltipWidth > rect.width) {
        tooltipX = nearest.x - tooltipWidth - 14;
    }

    if (tooltipY < 0) {
        tooltipY = nearest.y + 14;
    }

    chartTooltip.style.left =
        `${Math.max(0, Math.min(tooltipX, rect.width - tooltipWidth))}px`;

    chartTooltip.style.top =
        `${Math.max(0, Math.min(tooltipY, rect.height - tooltipHeight))}px`;

    drawChart(chartData, false);
}

function clearChartPointer() {
    hoveredPoint = null;
    chartTooltip.style.display = "none";
    drawChart(chartData, false);
}

chartCanvas.addEventListener("pointermove", handleChartPointer);
chartCanvas.addEventListener("pointerleave", clearChartPointer);


// ==========================================
// CHART PERIOD FILTERS
// ==========================================

periodButtons.forEach(button => {
    button.addEventListener("click", () => {
        periodButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        activePeriod = button.dataset.period;

        loadChart();
    });
});

chartBase.addEventListener("change", loadChart);
chartQuote.addEventListener("change", loadChart);


// ==========================================
// INITIALIZE VYRO
// ==========================================

updateCurrencyButton(fromButton, selectedFrom);
updateCurrencyButton(toButton, selectedTo);

convertCurrency();
renderMarkets();

chartBase.value = "USD";
chartQuote.value = "EUR";

loadChart();


// ==========================================
// AUTOMATIC RATE REFRESH
// ==========================================

setInterval(() => {
    rateCache = {};

    convertCurrency();
    renderMarkets();
}, 30 * 60 * 1000);


// ==========================================
// RESPONSIVE CHART
// ==========================================

let resizeTimeout;

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        drawChart(chartData, false);
    }, 120);
});

 
// ==========================================
// VYRO — RECENT CONVERSIONS
// ==========================================

(() => {
    const HISTORY_KEY = "vyroConversionHistory";
    const MAX_HISTORY = 6;

    let historyTimeout = null;

    // CREATE HISTORY PANEL

    const panel = document.createElement("section");
    panel.className = "history-panel";
    panel.id = "conversionHistory";

    panel.innerHTML = `
        <div class="history-header">
            <div>
                <span class="section-label">YOUR ACTIVITY</span>
                <h3>Recent conversions</h3>
                <p>Your latest currency conversions.</p>
            </div>

            <button class="clear-history" type="button">
                Clear history
            </button>
        </div>

        <div class="history-list"></div>
    `;

    const converterCard = document.querySelector(".converter-card");

    if (!converterCard) return;

    converterCard.insertAdjacentElement("afterend", panel);

    const historyList = panel.querySelector(".history-list");
    const clearButton = panel.querySelector(".clear-history");

    // HISTORY STYLING

    const historyStyle = document.createElement("style");

    historyStyle.textContent = `
        .history-panel {
            max-width: 850px;
            margin: 22px auto 0;
            padding: 26px 28px;
            background: linear-gradient(145deg, #131b1d, #0e1315);
            border: 1px solid rgba(255,255,255,.08);
            border-radius: 14px;
        }

        .history-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            margin-bottom: 20px;
        }

        .history-header h3 {
            font-family: "Manrope", sans-serif;
            font-size: 19px;
            margin-top: 9px;
        }

        .history-header p {
            color: #899493;
            font-size: 12px;
            margin-top: 6px;
        }

        .clear-history {
            background: transparent;
            border: 1px solid rgba(255,255,255,.1);
            border-radius: 6px;
            color: #899493;
            padding: 9px 12px;
            font-size: 11px;
            transition: .2s;
        }

        .clear-history:hover {
            color: #b5f5d5;
            border-color: #75cba5;
        }

        .history-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            padding: 16px 0;
            border-top: 1px solid rgba(255,255,255,.07);
            animation: historyEnter .3s ease both;
        }

        @keyframes historyEnter {
            from {
                opacity: 0;
                transform: translateY(8px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .history-currencies,
        .history-flags {
            display: flex;
            align-items: center;
        }

        .history-currencies {
            gap: 13px;
            min-width: 0;
        }

        .history-flags img {
            width: 25px;
            height: 18px;
            object-fit: cover;
            border-radius: 3px;
            border: 1px solid #080b0d;
        }

        .history-flags img + img {
            margin-left: -5px;
        }

        .history-pair,
        .history-amounts {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .history-pair strong,
        .history-amounts strong {
            font-size: 12px;
        }

        .history-pair span,
        .history-amounts span {
            color: #899493;
            font-size: 11px;
        }

        .history-amounts {
            text-align: right;
            overflow-wrap: anywhere;
        }

        .history-amounts span {
            color: #b5f5d5;
        }

        .history-empty {
            padding: 24px 0 5px;
            border-top: 1px solid rgba(255,255,255,.07);
            color: #899493;
            font-size: 12px;
            text-align: center;
        }

        @media (max-width: 650px) {
            .history-panel {
                padding: 20px;
            }

            .history-item {
                gap: 8px;
            }

            .history-pair strong,
            .history-amounts strong {
                font-size: 11px;
            }

            .history-amounts {
                max-width: 48%;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .history-item {
                animation: none;
            }
        }
    `;

    document.head.appendChild(historyStyle);

    // LOAD SAVED HISTORY

    function getHistory() {
        try {
            const saved = JSON.parse(
                localStorage.getItem(HISTORY_KEY) || "[]"
            );

            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    }

    function saveHistory(history) {
        try {
            localStorage.setItem(
                HISTORY_KEY,
                JSON.stringify(history)
            );
        } catch (error) {
            console.warn("VYRO could not save history:", error);
        }
    }

    // RENDER HISTORY

    function renderHistory() {
        const history = getHistory();

        historyList.innerHTML = "";

        if (history.length === 0) {
            const empty = document.createElement("div");
            empty.className = "history-empty";
            empty.textContent =
                "Your conversions will appear here.";

            historyList.appendChild(empty);
            return;
        }

        history.forEach(item => {
            const from = getCurrency(item.from);
            const to = getCurrency(item.to);

            if (
                !from ||
                !to ||
                !Number.isFinite(Number(item.amount)) ||
                !Number.isFinite(Number(item.result))
            ) return;

            const entry = document.createElement("div");
            entry.className = "history-item";

            const currenciesBox = document.createElement("div");
            currenciesBox.className = "history-currencies";

            const flags = document.createElement("div");
            flags.className = "history-flags";

            [item.from, item.to].forEach(code => {
                const image = document.createElement("img");
                image.src = getFlag(code);
                image.alt = "";
                flags.appendChild(image);
            });

            const pair = document.createElement("div");
            pair.className = "history-pair";

            const pairName = document.createElement("strong");
            pairName.textContent =
                `${item.from} → ${item.to}`;

            const date = document.createElement("span");
            date.textContent = new Date(item.time).toLocaleString(
                [],
                {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

            pair.append(pairName, date);
            currenciesBox.append(flags, pair);

            const amounts = document.createElement("div");
            amounts.className = "history-amounts";

            const sent = document.createElement("strong");
            sent.textContent =
                `${formatNumber(item.amount)} ${item.from}`;

            const received = document.createElement("span");
            received.textContent =
                `${formatNumber(item.result)} ${item.to}`;

            amounts.append(sent, received);
            entry.append(currenciesBox, amounts);

            historyList.appendChild(entry);
        });
    }

    // SAVE A CONVERSION

    function recordConversion(amount, result, from, to) {
        if (
            !Number.isFinite(amount) ||
            !Number.isFinite(result) ||
            amount <= 0
        ) return;

        const history = getHistory();

        history.unshift({
            amount,
            result,
            from,
            to,
            time: Date.now()
        });

        saveHistory(history.slice(0, MAX_HISTORY));
        renderHistory();
    }

    // DETECT COMPLETED CONVERSIONS

    function checkConversion() {
        clearTimeout(historyTimeout);

        historyTimeout = setTimeout(() => {
            const amount = Number(amountInput.value);

            const resultText =
                resultDisplay.textContent.replace(/,/g, "").trim();

            const result = Number(resultText);

            if (
                !Number.isFinite(amount) ||
                !Number.isFinite(result) ||
                amount <= 0 ||
                resultDisplay.textContent.includes("Unavailable") ||
                resultDisplay.textContent.includes("—")
            ) return;

            recordConversion(
                amount,
                result,
                selectedFrom,
                selectedTo
            );

        }, 900);
    }

    const historyObserver = new MutationObserver(checkConversion);

    historyObserver.observe(resultDisplay, {
        childList: true,
        characterData: true,
        subtree: true
    });

    // CLEAR HISTORY

    clearButton.addEventListener("click", () => {
        clearTimeout(historyTimeout);

        try {
            localStorage.removeItem(HISTORY_KEY);
        } catch (error) {
            console.warn("Could not clear history:", error);
        }

        renderHistory();
    });

    // INITIAL RENDER

    renderHistory();

})();
