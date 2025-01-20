import Shares from "@/app/components/Shares";
import SharesChart from "@/app/components/SharesChart";
import {faBitcoinSign, faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import Content from "@/app/components/Content";

async function getCurrentHoldings() {
    const res = await fetch(process.env.BTC_ETF_TRACKER_API_URL + "/holdings/current", {cache: "no-cache"})
    return res.json()
}

async function getHistory(period) {
    const res = await fetch(process.env.BTC_ETF_TRACKER_API_URL + "/holdings?period=" + period, {cache: "no-cache"})
    return res.json();
}

async function getBitcoinPrice() {
    const res = await fetch(process.env.BTC_ETF_TRACKER_API_URL + "/prices/btc", {cache: "no-cache"})
    const data = await res.json()
    return data.bitcoin.usd;
}


export default async function Home() {
    const currentHoldings = await getCurrentHoldings();

    const sum = currentHoldings.etfs.reduce((acc, cur) => acc + cur.shares, 0)
    const orderedEtf = currentHoldings.etfs.sort((etfA, etfB) => etfB.shares - etfA.shares);

    const sevenDayHistory = await getHistory("SEVEN_DAY");
    const oneMonthHistory = await getHistory("ONE_MONTH");
    const threeMonthsHistory = await getHistory("THREE_MONTHS");

    const histories = {
        SEVEN_DAY: sevenDayHistory,
        ONE_MONTH: oneMonthHistory,
        THREE_MONTHS: threeMonthsHistory,
    }

    const btcPrice = await getBitcoinPrice();

    return (
        <main className="flex min-h-screen flex-col items-center pt-20 px-2">
            <div className="absolute text-2xl top-0 right-0 p-1">
                <span>
                    1<FontAwesomeIcon icon={faBitcoinSign}/>
                    {" = " + btcPrice.toLocaleString()}
                    <FontAwesomeIcon icon={faDollarSign}/>
                </span>
            </div>

            <div className="mb-16 flex flex-col text-end">
                <span className="text-7xl font-bold">
                    {Math.trunc(sum).toLocaleString()}
                    <FontAwesomeIcon className="text-7xl ml-1" icon={faBitcoinSign}/>
                </span>
                <span className="text-lg text-green-600">
                    {Math.trunc(sum * btcPrice).toLocaleString()}
                    <FontAwesomeIcon className="text-lg ml-1" icon={faDollarSign}/>
                </span>
            </div>

            <Content histories={histories} etfs={orderedEtf} btcPrice={btcPrice}/>

            <a href="https://github.com/simonpic/btc-etf-tracker" target="_blank" className="hidden xl:block fixed bottom-0 mb-3 text-gray-500">
                <FontAwesomeIcon className="mr-1" icon={faGithub}/>
                Github repo
            </a>
        </main>
    );
}
