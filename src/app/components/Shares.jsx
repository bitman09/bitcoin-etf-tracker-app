import BitcoinValue from "@/app/components/BitcoinValue";
import ETF from "../model/ETF"
import Trend from "@/app/components/Trend";

export default function Shares({etfs, holdings, btcPrice}) {
    return (
        <div className="flex flex-col gap-3 self-center">
            {etfs.map(etf => (
                <div className="grid grid-cols-2 gap-3" key={etf.symbol}>
                    <a href={ETF[etf.symbol].url} target="_blank"
                       className="flex justify-between hover:font-bold transition-all">
                        <div className="flex flex-col mr-5">
                            <span className="text-xl">{etf.symbol}</span>
                            <span className="text-sm italic">{ETF[etf.symbol].issuer}</span>
                        </div>
                        <BitcoinValue size="medium" btc={etf.shares} btcPrice={btcPrice}/>
                    </a>
                    <Trend history={Object.values(holdings[etf.symbol])}/>
                </div>
            ))}
        </div>

    )
}