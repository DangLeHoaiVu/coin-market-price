import { CRYPTO_CURRENCIES } from "@/config";


function formatPrice(price = 0) {
    const formattedPrice = Math.round(Number(price) * 100) / 100;
    return `$ ${formattedPrice > 0 ? formattedPrice.toLocaleString() : price}`;
}

function formatPricePercentChange(price = 0) {
    const formattedPrice = Number((Math.round(Number(price) * 100) / 100).toFixed(2));
    return `${formattedPrice > 0 ? '+' + formattedPrice.toLocaleString() : formattedPrice > 0 ? '-' + formattedPrice.toLocaleString() : price} %`;
}

function formatVolume(volume = 0) {
    const formattedVolume = Math.round(Number(volume) * 100) / 100;
    return `${formattedVolume > 0 ? formattedVolume.toLocaleString() : volume}`;
}

function extractValues(obj: any[] = [], prop = "") {
    return obj.map((item) => item[prop].replace(/'/g, '"'));
}

function findByValue(obj: any[] = [], value = "", prop = "symbol") {
    return obj.find((item) => item[prop] === value);
}

function getSymbols() {
    return extractValues(CRYPTO_CURRENCIES, "symbol");
}
function getSymbolsForSocketStream(stream: string, fs: string) {
    const streamSocket = String(extractValues(CRYPTO_CURRENCIES, "symbol").map((item) => String(item).toLocaleLowerCase() + '@' + stream + ((stream == 'trade' || stream == 'aggTrade' || stream == 'ticker') ? '' : ('@' + fs)))).replace(/,/g, '/')
    return streamSocket;
}

export { formatPrice, formatPricePercentChange, formatVolume, extractValues, findByValue, getSymbols, getSymbolsForSocketStream };