import React from "react";
import { Row, Col, Progress, Table, Label, Input } from "reactstrap";

import Widget from "../../components/Widget";

import Calendar from "./components/calendar/Calendar";
import Map from "./components/am4chartMap/am4chartMap";
import Rickshaw from "./components/rickshaw/Rickshaw";

import AnimateNumber from "react-animated-number";

import s from "./Dashboard.module.scss";

import peopleA1 from "../../images/people/a1.jpg";
import peopleA2 from "../../images/people/a2.jpg";
import peopleA5 from "../../images/people/a5.jpg";
import peopleA4 from "../../images/people/a4.jpg";

//
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import { chartData, liveChart, liveChartInterval } from "../components/charts/mock";


class Dashboard extends React.Component {
  //
  stateChart = {
  cd: chartData,
  ld: liveChart,
  initEchartsOptions: {
    renderer: "canvas",
  },
  };
  //

  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      checkedArr: [false, false, false],
    };
   
    this.checkTable = this.checkTable.bind(this);
  }

  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }

  render() {
    const { cd, ld, initEchartsOptions } = this.stateChart;
    
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Vadītāja panelis &nbsp;
          <small>
            <small>Visi dati vienā vietā</small>
          </small>
        </h1>
      {/*}
        <Row>
          <Col lg={7}>
            <Widget className="bg-transparent">
              <Map />
            </Widget>
          </Col>
          <Col lg={1} />

          <Col lg={4}>
            <Widget
              className="bg-transparent"
              title={
                <h5>
                  {" "}
                  Map
                  <span className="fw-semi-bold">&nbsp;Statistics</span>
                </h5>
              }
              settings
              refresh
              close
            >
              <p>
                Status: <strong>Live</strong>
              </p>
              <p>
                <span className="circle bg-default text-white">
                  <i className="fa fa-map-marker" />
                </span>{" "}
                &nbsp; 146 Countries, 2759 Cities
              </p>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Foreign Visits</h6>
                  <p className="description deemphasize mb-xs text-white">
                    Some Cool Text
                  </p>
                  <Progress
                    color="primary"
                    value="60"
                    className="bg-custom-dark progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={75} />%
                    </small>
                  </span>
                </div>
              </div>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Local Visits</h6>
                  <p className="description deemphasize mb-xs text-white">
                    P. to C. Conversion
                  </p>
                  <Progress
                    color="danger"
                    value="39"
                    className="bg-custom-dark progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={84} />%
                    </small>
                  </span>
                </div>
              </div>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Sound Frequencies</h6>
                  <p className="description deemphasize mb-xs text-white">
                    Average Bitrate
                  </p>
                  <Progress
                    color="success"
                    value="80"
                    className="bg-custom-dark progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={92} />%
                    </small>
                  </span>
                </div>
              </div>
              <h6 className="fw-semi-bold mt">Map Distributions</h6>
              <p>
                Tracking: <strong>Active</strong>
              </p>
              <p>
                <span className="circle bg-default text-white">
                  <i className="fa fa-cog" />
                </span>
                &nbsp; 391 elements installed, 84 sets
              </p>
              <div className="input-group mt">
                <input
                  type="text"
                  className="form-control bg-custom-dark border-0"
                  placeholder="Search Map"
                />
                <span className="input-group-btn">
                  <button
                    type="submit"
                    className={`btn btn-subtle-blue ${s.searchBtn}`}
                  >
                    <i className="fa fa-search text-light" />
                  </button>
                </span>
              </div>
            </Widget>
          </Col>
        </Row>
        */}      
        <Row>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> SARAŽOTAIS DAUDZUMS </h6>} close settings>
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name">Saražotais daudzums</h6>
                  <p className="value">76.38%</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">Mēnesi</h6>
                  <p className="value">10.38%</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">24h</h6>
                  <p className="value">3.38%</p>
                </div>
                {/* 
                <div className="stat-item">
                  <h6 className="name">8h</h6>
                  <p className="value">1.5%</p>
                </div>
              */}
              </div>
              <Progress
                color="success"
                value="60"
                className="bg-custom-dark progress-xs"
              />
              <p>
                <small>
                  <span className="circle bg-default text-white mr-2">
                    <i className="fa fa-chevron-up" />
                  </span>
                </small>
                <span className="fw-semi-bold">&nbsp;17% lielāks</span>
                &nbsp;nekā iepriekšējais periods
              </p>
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> MATERIĀLU IZLIETOJUMS </h6>} close settings>
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name">Kopā</h6>
                  <p className="value">14 600</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">Mēnesi</h6>
                  <p className="value">4 500</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">24h</h6>
                  <p className="value">320</p>
                </div>
              </div>
              <Progress
                color="danger"
                value="60"
                className="bg-custom-dark progress-xs"
              />
              <p>
                <small>
                  <span className="circle bg-default text-white mr-2">
                    <i className="fa fa-chevron-down" />
                  </span>
                </small>
                <span className="fw-semi-bold">&nbsp;8% mazāk</span>
                &nbsp;nekā iepriekšēja mēnesi
              </p>
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
          <Widget
                title={
                  <h5>
                    Materiālu <span className="fw-semi-bold">izlietošana</span>
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
            {/* 
            <Widget title={<h6> RANDOM VALUES </h6>} close settings>
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name fs-sm">Overcome T.</h6>
                  <p className="value">104.85%</p>
                </div>
                <div className="stat-item">
                  <h6 className="name fs-sm">Takeoff Angle</h6>
                  <p className="value">14.29&deg;</p>
                </div>
                <div className="stat-item">
                  <h6 className="name fs-sm">World Pop.</h6>
                  <p className="value">7,211M</p>
                </div>
              </div>
              <Progress
                color="bg-primary"
                value="60"
                className="bg-custom-dark progress-xs"
              />
              <p>
                <small>
                  <span className="circle bg-default text-white mr-2">
                    <i className="fa fa-plus" />
                  </span>
                </small>
                <span className="fw-semi-bold">&nbsp;8 734 higher</span>
                &nbsp;than last month
              </p>
            </Widget>
            */}
          </Col>
        </Row>

        <Row>
        
        </Row>
      </div>
    );
  }
}

export default Dashboard;
