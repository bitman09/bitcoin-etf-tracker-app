import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBitcoinSign, faDollarSign} from "@fortawesome/free-solid-svg-icons";

const sizes = {
    large: {
        btc: "text-7xl",
        usd: "text-lg",
    },
    medium: {
        btc: "text-2xl",
        usd: "text-xs",
    },
    small: {
        btc: "text-sm",
        usd: "text-xs",
    }
}

export default function BitcoinValue({className, size, btc, btcPrice}) {
    const usd = btc * btcPrice;
    const textSize = sizes[size];

    return (
        <div className={className + " flex flex-col text-end"}>
            <span >
                <span className={textSize.btc}>{Math.trunc(btc).toLocaleString()}</span>
                <FontAwesomeIcon className={textSize.btc + " ml-1"} icon={faBitcoinSign}/>
            </span>
            <span className={textSize.usd + " text-green-600"}>
                {Math.trunc(usd).toLocaleString()}
                <FontAwesomeIcon className={textSize.usd + " ml-1"} icon={faDollarSign}/>
            </span>
        </div>
    )
}