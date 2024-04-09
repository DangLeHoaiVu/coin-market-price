import { useEffect, useState } from "react";
import { CryptoCurrenciesProps } from "./useTicker";
import { CRYPTO_CURRENCIES } from "@/config";
import { getSymbolsForSocketStream } from ".";

const useStream = () => {
    const stream = 'ticker';
    const fs = '1s';

    const [cryptoStreams, setCryptoStreams] = useState<CryptoCurrenciesProps[]>(CRYPTO_CURRENCIES);

    useEffect(() => {
        const socketStream = async () => {
            const socket = new WebSocket(`wss://fstream.binance.com/stream?streams=${getSymbolsForSocketStream(stream, fs)}`);

            socket.onmessage = function (event) {
                const streamData = JSON.parse(event.data);
                setCryptoStreams(cryptoStreams => cryptoStreams.map(item => {
                    if (streamData && streamData.data.s === item.symbol) {
                        return {
                            ...item,
                            price: Number(streamData.data.c) !== 0 ? Number(streamData.data.c) : item.price,
                            priceChangePercent: Number(streamData.data.P) !== 0 ? Number(streamData.data.P) : item.priceChangePercent,
                            volume: streamData.data.v ? Number(streamData.data.v) : item.volume,
                            quoteVolume: streamData.data.q ? Number(streamData.data.q) : item.quoteVolume,

                        };
                    } else {
                        return item;
                    }
                }));
            };

            return () => {
                socket.close();
            };
        };

        socketStream();
    }, []);

    return cryptoStreams;
};

export { useStream };
