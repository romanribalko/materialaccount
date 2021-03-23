import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import { Sparklines, SparklinesBars } from "react-sparklines";

import Widget from "../../../../components/Widget/Widget";
import s from "./Static.module.scss";
//
import PackQRReader from "../component/PackQRReader"


class ProdWriteOffPackForm extends React.Component {
  constructor(props) {
    super(props);   
    
    this.state = {
      messagesOpen: false,
    }; 
    //this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this)

  }

  //toggleMessagesDropdown() {
  //  this.setState({
  //    messagesOpen: !this.state.messagesOpen,
  //  });
  //}
  
  render() {
    const { dropdownOpen } = this.state
    return (
      <div className={s.root}>
        <Row>

          <Col sm={3}>       
          <Widget
              title={
                <h5>QR kodu nolasīšana
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >    
              <div className="center">      
                <PackQRReader/>
              </div>
            </Widget>            
          </Col>    
          <Col>
            <Form>
              <FormGroup row>
                <Label for="packNum" sm={2}>Pakas numurs</Label>
                <Col sm={10}>
                  <Input type="text" name="pack_num" id="packNum" placeholder="Lūdzu noskenēt pakas QR kods vai ievadīt manuāli pakas numurs">
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleText" sm={2}>Komentārs</Label>
                <Col sm={10}>
                  <Input type="textarea" name="text" id="exampleText" />
                </Col>
              </FormGroup>
              <FormGroup row>
            <Label for="itemName" sm={2}>Darba vieta</Label>
            <Col sm={10}>
              <Input type="select" name="wp_name" id="wpName">
                <option>Taras līnija</option>
                <option>Sagarinašana</option>
                <option>Žavešana</option>
              </Input>
            </Col>
          </FormGroup>
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button color="default" className="mr-2" >Apstiprināt</Button>
                </Col>
              </FormGroup>
                  
            </Form>

          </Col>
        </Row>
      </div>
    );
  }
}
export default ProdWriteOffPackForm;
