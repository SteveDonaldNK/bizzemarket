import React from 'react'
import Accepted from '../Accepted/Accepted'
import Denied from '../Denied/Denied'
import Pending from '../Pending/Pending'
import Stats from '../Stats/Stats'
import './Main.css'

export default function Main({tab}) {
  const data = {
    options: {
        chart: {
            type: "area",
            height: "auto",
        },
        dropShadow: {
            enabled: false,
            enabledOnSeries: undefined,
            top: 0,
            left: 8,
            blur: 3,
            color: "#000",
            opacity: 0.35,
        },
        fill: {
            colors: ["#0A8DEF"],
            type: "gradient"
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            colors: ["#0A8DEF"],
        },
        tooltip: {
            x: {
                format: "dd/MM/uu HH:mm"
            },
        },
        grid: {
            show: true,
        },
        xaxis: {
            type: "datetime",
            categories: [
                "2018-09-19T00:00:00.00Z",
                "2018-09-19T01:30:00.00Z",
                "2018-09-19T02:30:00.00Z",
                "2018-09-19T03:30:00.00Z",
                "2018-09-19T04:30:00.00Z",
                "2018-09-19T05:30:00.00Z",
                "2018-09-19T06:30:00.00Z",
                "2018-09-19T07:30:00.00Z",
                "2018-09-19T08:30:00.00Z",
                "2018-09-19T09:30:00.00Z",
            ]
        }
    }
}

const series = {
  series: [
    {
        name: "Sales",
        data: [10, 20, 80, 70, 80, 30, 40, 50, 20, 67]
    }
]
}

  return (
    <>
      {tab === 'Analyses' && <Stats series={series} data={data}/>}
      {tab === 'En attente' && <Pending />}
      {tab === 'Accepté' && <Accepted />}
      {tab === 'Rejeté' && <Denied />}
    </>
  )
}
