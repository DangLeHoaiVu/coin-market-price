import { useTicker } from "@/utils/useTicker";
import Crypto from "./Crypto";

function TableCryptos() {
    const cryptoCurrenies = useTicker()

    return (
        <div className="w-full p-4">
            <table className="table min-w-[80%] max-w-full mx-36 text-sm text-left table-fixed">
                <thead>
                    <tr className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <th scope="col" className="px-6 py-3">Pair</th>
                        <th scope="col" className="px-6 py-3">Price</th>
                        <th scope="col" className="px-6 py-3">24h Change</th>
                        <th scope="col" className="px-6 py-3">24h Volume (coin)</th>
                        <th scope="col" className="px-6 py-3"><span>&#8595;</span>24h Volume USD</th>
                    </tr>
                </thead>
                <tbody className="space-y-10">
                    {cryptoCurrenies.map((cpt) => (
                        <Crypto key={cpt.id} cryptoCurrency={cpt} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TableCryptos