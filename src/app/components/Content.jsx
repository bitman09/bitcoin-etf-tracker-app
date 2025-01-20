'use client'

import {useState} from "react";
import SharesChart from "@/app/components/SharesChart";
import Shares from "@/app/components/Shares";


export default function Content({histories, etfs, btcPrice}) {
    const periods = [
        {
            value: "SEVEN_DAY",
            label: "7d"
        },
        {
            value: "ONE_MONTH",
            label: "1M"
        },
        {
            value: "THREE_MONTHS",
            label: "3M"
        }
    ]

    const [period, setPeriod] = useState(periods[1].value)
    const [data, setData] = useState(histories[period])

    const handleClick = (newPeriod) => {
        setPeriod(newPeriod);
        setData(histories[newPeriod])
    }

    const divider = <span className="border-r border-gray-500 mx-3" key=""></span>

    const intervals = periods
        .map(el =>
            <span className={(el.value === period ? "text-white" : "text-gray-500") + " cursor-pointer"}
                  onClick={() => handleClick(el.value)}
                  key={el.value}>{el.label}</span>)
        .reduce((prev, curr) => [prev, divider, curr])

    return <div className="flex flex-col items-center">
        <div className="flex text-2xl mb-10">
            {intervals}
        </div>
        <div className="flex flex-col xl:flex-row xl:gap-10">
            <SharesChart data={data}/>
            <Shares etfs={etfs} holdings={data.holdings} btcPrice={btcPrice}/>
        </div>
    </div>
}