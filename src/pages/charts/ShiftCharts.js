import React from "react";

import { Row, Col, Button, Table} from "reactstrap";

import Widget from "../../components/Widget";
import ApexChart from "react-apexcharts";

import s from "./ShiftCharts.module.scss";
import { chartData, liveChart, liveChartInterval } from "./mock";
import Sparklines from "../../components/Sparklines";

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
import DataService from "../../components/Services/dataService";
import "react-datepicker/dist/react-datepicker.css";

exporting(Highcharts);
exportData(Highcharts);

class ShiftCharts extends React.Component {
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
  
  retrieveRecords = () => {
    //debugger
    this.retrieveLengthSumByHourData(this.state.startDate);
    this.retrieveVolumeByHourData(this.state.startDate);
    this.retrieveCountByDiamData(this.state.startDate);

      
      let isdata = false;
      (this.state.records_LengthSumByHourData.length > 0)? (isdata = true):(isdata = false);

      this.setState({
          isData: isdata,
          btnLoad: false,
          isDateUpdated: true,
      }); 

      //this.retrieveCsvData();
  };
 
  refreshData = () => {
    this.setState({
      btnLoad: true,
      isDateUpdated: false,
    });

    this.retrieveRecords();
  };

 retrieveLengthSumByHourData = (dateDateFrom) => {
    let outretrieveRecords = DataService.getLengthSumByHour(dateDateFrom)
            .then(response => {        
              response.data.sort(function(a, b) { 
              return +(a.hg_name) - +(b.hg_name);
            });

            let responsedata = response.data;
            let ydata = response.data.map(function(responsedata){
              return responsedata.vHourSumL
            });

            let ydataseries = 
            [
              {
                data: ydata,
              },
            ];


           let isdata = false;
           (this.state.records_LengthSumByHourData.length > 0)? (isdata = true):(isdata = false);
     
           this.setState({
               isData: isdata,
               btnLoad: false,
               isDateUpdated: true,
           }); 

            this.setState({
              records_LengthSumByHourData : {series: ydataseries},

              //records_VolumeByHourData: retrieveVolumeByHourData_rec,
              //records_retrieveCountByDiamData: retrieveCountByDiamData_rec,
            });            }) 
            .catch(e => {
            console.log(e);
    });
    return outretrieveRecords;
  }
  retrieveVolumeByHourData = (dateDateFrom) => {
    let outretrieveRecords = DataService.getVolumeByHour(dateDateFrom)
            .then(response => {        
              response.data.sort(function(a, b) { 
              return +(a.hg_name) - +(b.hg_name);
            });
            this.setState({
              records_VolumeByHourData: response.data,
            });
            }) 
            .catch(e => {
            console.log(e);
    });
    return outretrieveRecords;
  }
  retrieveCountByDiamData = (dateDateFrom) => {
    let outretrieveRecords = DataService.getLogCountByDiam(dateDateFrom)
            .then(response => {        
              response.data.sort(function(a, b) { 
              return +(a.dg_name) - +(b.dg_name);
            });
            this.setState({
              records_retrieveCountByDiamData: response.data,
            });
            }) 
            .catch(e => {
            console.log(e);
    });
    return outretrieveRecords;
  }

  handleStartDateChange = (date) => { 
    //debugger
    this.setState({
      isData: false,
      startDate: date,
    }); 
  }
  

  render() {
    const { cd, ld, initEchartsOptions, sparklineData } = this.statedef;
    const { btnLoad, isDateUpdated, isData, currentPage, pageSize, pagesCount } = this.state;

    
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Grafiki - <span className="fw-semi-bold">Maiņas produktivitāte</span>
        </h1>
        <div>
        <Table>
              Datums : &#8287;
              <DatePicker className="mr-2" size="sm" selected={this.state.startDate} onChange={date => this.handleStartDateChange(date)} />
  
              <Button color="default" className="mr-2" size="sm"
                onClick = {this.refreshData}> Ielādēt
              </Button>
              
              {(btnLoad && !isDateUpdated)? (<div>Lūdzu uzgaidiet...</div>) : (<div/>)} 
              
              {(isDateUpdated && !isData)?(<div>Diemžēl par šo datumu diapazonu datus nav</div>): (<div/>)}

              </Table>

          <Row>
            <Col lg={7} xs={12}>
              <Widget
                title={
                  <h5>
                    Izlaistie metri <span className="fw-semi-bold">pa stundām</span>
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
            <Row>
            <Col lg={7} xs={12}>
              <Widget
                title={
                  <h5>
                    Tilpums <span className="fw-semi-bold">pa stundām</span>
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
            
            <Row>
            <Col lg={5} xs={12}>
              <Widget
                title={
                  <h5>
                    Materiālu <span className="fw-semi-bold">izlietojums</span>
                  </h5>
                }
                close
                collapse
              >
                <ReactEchartsCore
                  echarts={echarts}
                  option={cd.echarts.line}
                  opts={initEchartsOptions}
                  style={{ height: "365px" }}
                />
              </Widget>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ShiftCharts;
