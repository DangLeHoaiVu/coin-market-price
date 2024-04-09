import { CRYPTO_CURRENCIES } from "@/config"
import { useCallback, useEffect, useState } from "react"
import { findByValue, getSymbols } from "."

export interface CryptoCurrenciesProps {
    id: string;
    name: string;
    symbol: string;
    iconCode: number;
    price: number;
    prevPrice: number;
    highPrice: number;
    lowPrice: number;
    volume: number;
    priceChangePercent: number;
    quoteVolume: number;
}

const useTicker = () => {
    const [cryptoCurrencies, setCryptoCurrencies] = useState<CryptoCurrenciesProps[]>(CRYPTO_CURRENCIES)

    const fetchCrypto = useCallback(async () => {
        try {
            const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${JSON.stringify(getSymbols())}`, {
                mode: 'cors'
            })

            const data = await response.json()
            setCryptoCurrencies(
                cryptoCurrencies.map((item: CryptoCurrenciesProps) => {
                    const currencyData = findByValue(data, item.symbol)
                    if (currencyData) {
                        return {
                            ...item,
                            id: currencyData.symbol,
                            symbol: currencyData.symbol,
                            price: currencyData.lastPrice,
                            prevPrice: currencyData.prevClosePrice,
                            highPrice: currencyData.highPrice,
                            lowPrice: currencyData.lowPrice,
                            volume: currencyData.volume,
                            priceChangePercent: currencyData.priceChangePercent,
                            quoteVolume: currencyData.quoteVolume,
                        }
                    } else {
                        return item
                    }

                })
            )
        } catch (error) {
            console.log(error);

        }
    }, [cryptoCurrencies])

    // useEffect(() => {
    //     const interval = setInterval(fetchCrypto, 2000)

    //     return () => clearInterval(interval)
    // }, [fetchCrypto])


    useEffect(() => {
        fetchCrypto()
    }, [])

    // Call fetchCrypto at the end of date
    useEffect(() => {
        const fetchCryptoAtEndOfDay = () => {
            const currentDate = new Date();
            const millisecondsUntilEndOfDay = Number(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)) - Number(currentDate);
            setTimeout(fetchCrypto, millisecondsUntilEndOfDay);
        };

        fetchCryptoAtEndOfDay();
        const intervalId = setInterval(fetchCryptoAtEndOfDay, 24 * 60 * 60 * 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return cryptoCurrencies
}

export { useTicker }