import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
} from "reactstrap";
import { Sparklines, SparklinesBars } from "react-sparklines";

import Widget from "../../../components/Widget";
import s from "./Static.module.scss";
//
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import DatePicker from "react-datepicker";
import DataService from "../../../components/Services/dataService";
import "react-datepicker/dist/react-datepicker.css";


class ReportLogPartsByDate extends React.Component {
  constructor(props) {
    super(props);   
    
    this.state = {
      progress: 60,
      colorClass: "success",

      currentPage: 0,
      pageSize : 25,
      pagesCount: 0, 
      startDate : new Date(),
      endDate :  new Date(), 
      
      records: [],
      csvrecords: [],

      btnLoad: false,
      isDateUpdated: false,
      isData: false,
      headValues: null
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

  parseDate(date) {
    /*
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("lv-lv", { month: "long" })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
    */
   return date;
  }
  //
  handleClick(e, index) {
    e.preventDefault();
    this.setState({
      currentPage: index
    });
  }

//
  retrieveRecords = () => {
    //debugger

    let records = DataService.getVolumePocketByDate(this.state.startDate,this.state.endDate)
    .then(response => {
      response.data.sort(function(a, b) { 
        return new Date(a.vMeasDate) - new Date(b.vMeasDate);
      });

      let responsedata = response.data;
      /*
      let headers = {
        'Vidējais diametrs,mm' : calcAvgfDiam(responsedata),
        'Nogriežņu skaits,gab.' : calcSumofLogPartsCount(responsedata),
        'Izlaistie m' : calcSumofCurrentLen(responsedata)
      }
         setHeadvalues(headers);

      */

      this.setState({
        records: response.data
      });
      
      let isdata = false;
      (response.data.length > 0)? (isdata = true):(isdata = false);

      this.setState({
          isData: isdata,
          btnLoad: false,
          isDateUpdated: true,
          pagesCount: Math.ceil(response.data.length / this.state.pageSize),
      }); 

      //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

      this.retrieveCsvData();
  };
 
  refreshData = () => {
    this.setState({
      btnLoad: true,
      isDateUpdated: false,
    });

    this.retrieveRecords();
  };

  retrieveCsvData = () => {
    //debugger
    let csvrecords = DataService.getLogPartsByDate(this.state.startDate,this.state.endDate)
    .then(responselogparts => {
      responselogparts.data.sort(function(a, b) { 
        return new Date(a.lp_datetime_plc) - new Date(b.lp_datetime_plc);
      });

      this.setState({
        csvrecords: responselogparts.data,
      });
  
      }) 

      .catch(e => {
        console.log(e);
      });
  };
  

  handleStartDateChange = (date) => { 
    //debugger
    this.setState({
      isData: false,
      startDate: date,
    }); 
  }
  handleEndDateChange = (date) => { 
    //debugger
    this.setState({
      isData: false,
      endDate: date,
    }); 
  }


  render() {
    const { btnLoad, isDateUpdated, isData, currentPage, pageSize, pagesCount } = this.state;

    return (
            <Widget
              title={
                <h5>
                  Atskaite<span className="fw-semi-bold"> pa zariem</span>
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >
              <Table>
              Datums no: &#8287;
              <DatePicker className="mr-2" size="sm" selected={this.state.startDate} onChange={date => this.handleStartDateChange(date)} />
                   
              &#8287;līdz: &#8287;
              <DatePicker className="mr-2" size="sm" selected={this.state.endDate} onChange={date => this.handleEndDateChange(date)} />
  
              <Button color="default" className="mr-2" size="sm"
                onClick = {this.refreshData}> Ielādēt
              </Button>
              
              {(btnLoad && !isDateUpdated)? (<div>Lūdzu uzgaidiet...</div>) : (<div/>)} 
              
              {(isDateUpdated && !isData)?(<div>Diemžēl par šo datumu diapazonu datus nav</div>): (<div/>)}

              </Table>
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th>Uzmērīšanas datums</th>
                    <th className="hidden-sm-down">Zars</th>
                    <th className="hidden-sm-down">Vidējais koks</th>
                    <th className="hidden-sm-down">Nogriežņu skaits,gab.</th>
                    <th className="hidden-sm-down">Nometieni</th>
                    <th className="hidden-sm-down">Izlaisti metri,m</th>
                    <th className="hidden-sm-down">Normas izpilde</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.records//this.state.tableStyles
                  .slice(
                    currentPage * this.state.pageSize,
                    (currentPage + 1) * this.state.pageSize
                    )
                  .map((row) => (
                    <tr key={row.vlpId}>
                      <td className="text-muted">{this.parseDate(row.sDate)}</td>
                      <td>{row.vPocket} </td>
                      <td>{row.vDiamAVG} </td>
                      <td>{row.vPartsCount} </td>
                      <td>
                        <p className="mb-0">
                          <small>
                            Manuālie:
                            <span className="text-muted fw-semi-bold">
                              &nbsp; {row.vPartsManualCount}
                            </span>
                          </small>
                        </p>
                        <p>
                          <small>
                            Automātiski:
                            <span className="text-muted fw-semi-bold">
                              &nbsp; {row.vPartsAutoCount}
                            </span>
                          </small>
                        </p>
                        </td>
                        <td>
                          {(row.vPartsLenSum*0.1).toFixed(2)}
                        </td>
                      <td className="width-150">
                        <Progress
                          color={this.state.colorClass}
                          value={this.state.progress}
                          className="progress-sm mb-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="clearfix">
                <div className="float-right">
                  <Button color="default" className="mr-2" size="sm">
                    Saglabāt csv...
                  </Button>
                  {/*
                  <UncontrolledButtonDropdown>
                    <DropdownToggle
                      color="inverse"
                      className="mr-xs"
                      size="sm"
                      caret
                    >
                      Clear
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Clear</DropdownItem>
                      <DropdownItem>Move ...</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Separated link</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                  */}
                </div>
                {//<p>Basic table with styled content</p>
                }
                <div>        
                  <Pagination aria-label="Page navigation">
                  <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink
                          onClick={e => this.handleClick(e, 1)}
                          first
                          href="#"
                        />                        
                      </PaginationItem>
                      <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink
                          onClick={e => this.handleClick(e, currentPage - 1)}
                          previous
                          href="#"
                        />                        
                      </PaginationItem>
                      <PaginationItem disabled={currentPage >= pagesCount - 1}>
                        <PaginationLink
                          onClick={e => this.handleClick(e, currentPage + 1)}
                          next
                          href="#"
                        />
                      </PaginationItem>
                      <PaginationItem disabled={currentPage >= pagesCount - 1}>
                        <PaginationLink
                          onClick={e => this.handleClick(e, pagesCount-1)}
                          last
                          href="#"
                        />
                      </PaginationItem>
                    </Pagination>
                </div>

              </div>
            </Widget>
   
    );
  }
}

export default ReportLogPartsByDate;

