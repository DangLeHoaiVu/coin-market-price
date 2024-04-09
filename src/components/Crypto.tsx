import { CryptoCurrenciesProps } from "@/utils/useTicker"
import Image from "next/legacy/image";
import { formatPrice, formatPricePercentChange, formatVolume } from "@/utils";
import { useStream } from "@/utils/useStream";



function Crypto({ cryptoCurrency }: { cryptoCurrency: CryptoCurrenciesProps }) {
    const cryptoStream = useStream()

    const cryptoChange = cryptoStream.find((item) => {
        return item.price != 0 && item.id === cryptoCurrency.id && (item.price !== cryptoCurrency.price || item.priceChangePercent != cryptoCurrency.priceChangePercent || item.volume != cryptoCurrency.volume || item.quoteVolume != cryptoCurrency.quoteVolume)
    })

    const textColor = cryptoCurrency.priceChangePercent > 0 || (cryptoChange?.priceChangePercent ?? 0) > 0 ? "text-green-500" : cryptoCurrency.priceChangePercent < 0 || (cryptoChange?.priceChangePercent ?? 0) < 0 ? "text-red-500" : "text-yellow-500"

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <Image src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${cryptoCurrency.iconCode}.png`} alt={`${cryptoCurrency.id}_img`}
                        width={20} height={20} />
                    <p className={`${cryptoChange?.id == cryptoCurrency.id ? 'text-blue-500' : ''} font-bold`}>{cryptoCurrency.name}</p>
                </div>
            </th>
            <td className="px-6 py-4">{formatPrice(cryptoChange?.price && cryptoChange?.price != 0 ? cryptoChange?.price : cryptoCurrency.price)}</td>
            <td className={`px-6 py-4 ${textColor}`}>{formatPricePercentChange(cryptoChange?.priceChangePercent && cryptoChange?.priceChangePercent != 0 ? cryptoChange?.priceChangePercent : cryptoCurrency.priceChangePercent)}</td>
            <td className="px-6 py-4">{formatVolume(cryptoChange?.volume && cryptoChange?.volume != 0 ? cryptoChange?.volume : cryptoCurrency.volume)}</td>
            <td className="px-6 py-4">$ {formatVolume(cryptoChange?.quoteVolume && cryptoChange?.quoteVolume != 0 ? cryptoChange?.quoteVolume : cryptoCurrency.quoteVolume)}</td>
        </tr>
    )
}
export default Crypto