import Highcharts from "highcharts";
import config from "./config";
const colors = config.chartColors;

let columnColors = [
  colors.blue,
  colors.green,
  colors.orange,
  colors.red,
  colors.default,
  colors.gray,
  colors.teal,
  colors.pink,
];
let lineColors = [colors.blue, colors.green, colors.orange];

export const chartData = dataset =>  ({

  apex: {
    column: {
      series: [
        {
          data: [21, 22, 10, 28, 16, 21, 13, 60],
          data2: [29, 22, 10, 28, 16, 21, 13, 60],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
        },
        colors: columnColors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "JohnTest",
            "Joe",
            "Jake",
            "Amber",
            "Peter",
            "Mary",
            "David",
            "Lily",
          ],
          labels: {
            style: {
              colors: columnColors,
              fontSize: "14px",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            style: {
              color: colors.textColor,
            },
          },
        },
        tooltip: {
          theme: "dark",
        },
        grid: {
          borderColor: colors.gridLineColor,
        },
      },
    },
    pie: {
      series: [25, 15, 44, 55, 41, 17],
      options: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        theme: {
          monochrome: {
            enabled: true,
            color: colors.blue,
          },
        },
        stroke: {
          show: false,
          width: 0,
        },
        legend: false,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    },
  },
 
});

