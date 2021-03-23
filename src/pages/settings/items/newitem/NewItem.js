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

import s from "./Static.module.scss";
//
import NewItemForm from "./itemform/NewItemForm";


class NewItem extends React.Component {
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
          Jauns - <span className="fw-semi-bold">krājums</span>
        </h2>
        <Row>
          <Col>
            <NewItemForm/>
          </Col>
        </Row>


      </div>
    );
  }
}

export default NewItem;
