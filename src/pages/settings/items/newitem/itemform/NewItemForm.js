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

import Widget from "../../../../../components/Widget/Widget";
import s from "./Static.module.scss";
//


class NewItemForm extends React.Component {
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
            <Label for="itemSort" sm={2}>Šķira</Label>
            <Col sm={10}>
              <Input type="select" name="item_sort" id="itemSort">
                <option>I.šķira</option>
                <option>II.šķira</option>
                <option>III.šķira</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="itemLength" sm={2}>Garums</Label>
            <Col sm={10}>
              <Input type="number" name="item_length" id="itemLength">
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="itemWidth" sm={2}>Platums</Label>
            <Col sm={10}>
              <Input type="number" name="item_width" id="itemWidth">
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="itemHeight" sm={2}>Biezums</Label>
            <Col sm={10}>
              <Input type="number" name="item_height" id="itemHeight">
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="itemPrice" sm={2}>Cena, EUR</Label>
            <Col sm={10}>
              <Input type="number" name="item_price" id="itemPrice">
              </Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="count" sm={2}>Skaits pakā, gab.</Label>
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
              <Button color="default" className="mr-2" >Reģistrēt krājums</Button>
            </Col>
          </FormGroup>
              
          </Form>

          </Col>
        </Row>
      </div>
    );
  }
}
export default NewItemForm;
