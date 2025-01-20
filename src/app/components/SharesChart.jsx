"use client"

import ReactECharts from "echarts-for-react";

export default function SharesChart({data}) {
    const days = data.days
    const axis = days.map(day => day.split("T")[0])

    const holdings = data.holdings;
    const series = Object.keys(holdings).map(etf => ({
        name: etf,
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
            focus: 'series'
        },
        data: Object.values(holdings[etf]).map(btc => Math.trunc(btc))
    })).sort((a, b) => a.data[a.data.length - 1] - b.data[b.data.length - 1])

    const legend = series.map(serie => serie.name)

    const options = {
        darkMode: true,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            backgroundColor: "#343434",
            borderColor: "#000000",
            formatter: params => {
                const sum = params.map(param => param.data).reduce((a, b) => a + b, 0);
                //const header = "<p>" + params[0].axisValueLabel + " <b>" + sum + "</b></p>"

                const header = `<div class="flex mb-2">
                    <span class="italic mr-2">${params[0].axisValueLabel}</span>
                    <span class="font-bold">${sum}</span>
                </div>`

                const etfs = params.sort((a, b) => b.data - a.data).map(param => {
                    const etf = param.seriesName
                    const shares = param.data
                    return `<div class="flex justify-between text-xs">
                        <span>${param.marker}${etf}</span>
                        <span class="font-bold self-end">${shares}</span>
                    </div>`
                }).join("")

                const content = `<div class="flex flex-col">${etfs}</div>`

                return `<div class="text-white">${header}${content}</div>`
            }
        },
        legend: {
            data: legend
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: axis,
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false
                }
            }
        ],
        series
    };

    return <ReactECharts className="hidden md:block" option={options} style={{height: '450px', width: '700px'}} loadingOption={{showSpinner: true}}/>

}