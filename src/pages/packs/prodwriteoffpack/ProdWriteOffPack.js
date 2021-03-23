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

import Widget from "../../../components/Widget/Widget";
import s from "./Static.module.scss";
//
import ProdWriteOffPackForm from "./prodwriteoffpackform/ProdWriteOffPackForm";


class ProdWriteOffPack extends React.Component {
  constructor(props) {
    super(props);   
    
    this.state = {
      someprops: 60,
    }; 

  }

  render() {

    return (
      <div className={s.root}>
        <h2 className="page-title">
          Paku - <span className="fw-semi-bold">norakstīšana</span>
        </h2>
        <Row>
          <Col>
            <ProdWriteOffPackForm/>
          </Col>
        </Row>


      </div>
    );
  }
}

export default ProdWriteOffPack;
