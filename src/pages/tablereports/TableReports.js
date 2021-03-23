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

import Widget from "../../components/Widget/Widget";
import s from "./Static.module.scss";
//
import ReportLogListByDate from "./reportLogs/ReportLogListByDate";
import ReportLogPartsByDate from "./reportLogParts/ReportLogPartsByDate";


class TableReports extends React.Component {
  constructor(props) {
    super(props);   
    
    this.state = {
      someprops: 60,
    }; 

  }

  render() {

    return (
      <div className={s.root}>
        
        <Row>
          <Col>
            <ReportLogListByDate/>
          </Col>
        </Row>

      </div>
    );
  }
}

export default TableReports;
