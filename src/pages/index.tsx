import TableCryptos from "@/components/TableCryptos";


export default function Home() {
  return (
    <>
      <section
        className={`flex min-h-[89vh] flex-col items-center justify-between p-24 bg-gray-900`}
      >
        <TableCryptos />

      </section>
      <footer className="text-center bg-gray-800 w-full min-h-10 p-10">
        <div>Power by <a href="https://www.binance.com" target="_blank" rel="noopener noreferrer" className="text-yellow-600">Binance</a></div>
      </footer>
    </>
  );
}
