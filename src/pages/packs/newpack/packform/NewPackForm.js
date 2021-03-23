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


class NewPackForm extends React.Component {
  constructor(props) {
    super(props);   
    
    this.state = {
      messagesOpen: false,
    }; 
    this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this)

  }

  toggleMessagesDropdown() {
    this.setState({
      messagesOpen: !this.state.messagesOpen,
    });
  }
  

  //setDropdownOpen(prevState => !prevState);

  render() {
    const { dropdownOpen } = this.state
    return (
      <div className={s.root}>
        <Row>
          <Col>
          <Form >
          <FormGroup row>
            <Label for="itemName" sm={2}>Krājuma nosaukums</Label>
            <Col sm={10}>
              <Input type="select" name="item_name" id="itemName">
                <option>C 2200x1800x50</option>
                <option>C 2500x1800x50</option>
                <option>C 2600x1800x50</option>
                <option>C 2700x1800x50</option>
                <option>B 2200x1800x50</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="count" sm={2}>Skaits</Label>
            <Col sm={10}>
              <Input type="number" name="pack_count" id="count" placeholder="lūdzu ievadiet skaits pakā" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleText" sm={2}>Komentārs</Label>
            <Col sm={10}>
              <Input type="textarea" name="text" id="exampleText" />
            </Col>
          </FormGroup>

          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button>Reģistrēt paku</Button>
            </Col>
          </FormGroup>
              
          </Form>

          </Col>
        </Row>
      </div>
    );
  }
}
export default NewPackForm;
