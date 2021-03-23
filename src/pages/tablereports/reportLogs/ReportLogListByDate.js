import React from "react";

import { Row, Col, Button, Table} from "reactstrap";

import Widget from "../../../components/Widget";
import ApexChart from "react-apexcharts";

import s from "../Static.module.scss";
import { chartData, liveChart, liveChartInterval } from "./mock";
import Sparklines from "../../../components/Sparklines";

import ReactEchartsCore from "echarts-for-react/lib/core";

import echarts from "echarts/lib/echarts";

import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/themeRiver";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

exporting(Highcharts);
exportData(Highcharts);

class ReportLogListByDate extends React.Component {
  constructor(props) {
    super(props);   
    
    this.state = {
      progress: 60,
      colorClass: "success",

      startDate : new Date(),
      endDate :  new Date(), 
      
      records_LengthSumByHourData: {
        series: [
          {
            data: [],
          },
        ],
      },
      records_VolumeByHourData: [],
      records_retrieveCountByDiamData: [],

      //csvrecords: [],

      btnLoad: false,
      isDateUpdated: false,
      isData: false,
    }; 
    //csv header
    this.csvheader = [
      {label: "Uzmērīšanas datums", key:"sDate"},
      {label: "Uzmērīšanas laiks", key:"sTime"},
      {label: "PLC numurs", key:"lp_part_plc_index"},
      {label: "Garums", key:"lp_length"},
      {label: "Diametrs", key:"lp_diam_min"},
      {label: "Kabata", key:"lp_pocket_num"},  
      {label: "Nometieni auto/manual.", key:"lp_pusher_auto"}, 
      {label: "Zāģēšanas režīms", key:"lp_saw_mode"}, 
    ];

  }


  statedef = {
    cd: chartData,
    ld: liveChart,
    initEchartsOptions: {
      renderer: "canvas",
    } ,
    sparklineData: {
      series: [{ data: [1, 7, 3, 5, 7, 8] }],
      options1: {
        colors: ["#db2a34"],
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
      },
      options2: {
        colors: ["#2477ff"],
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
      },
    },
  };


  componentWillUnmount() {
    //clearInterval(liveChartInterval);
  }
 

  render() {
    const { cd, ld, initEchartsOptions, sparklineData } = this.statedef;
    const { btnLoad, isDateUpdated, isData, currentPage, pageSize, pagesCount } = this.state;

    
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Saražotais materiāls <span className="fw-semi-bold">tekošais atlikums</span>
        </h1>
        <div>
        <Table>
              Datums : &#8287;
              <DatePicker className="mr-2" size="sm" selected={this.state.startDate} onChange={date => this.handleStartDateChange(date)} />
  
              <Button color="default" className="mr-2" size="sm"
                onClick = {this.refreshData}> Ielādēt
              </Button>

              </Table>

          <Row>
            <Col lg={7} xs={12}>
              <Widget
                title={
                  <h5>
                    Krājumu <span className="fw-semi-bold">atlikums</span>
                  </h5>
                }
                close
                collapse
              >
                <ApexChart
                  className="sparkline-chart"
                  height={350}
                  series={cd.apex.column.series}
                  options={cd.apex.column.options}
                  type={"bar"}
                />
              </Widget>
            </Col>
            </Row>
            
        </div>
      </div>
    );
  }
}

export default ReportLogListByDate;
