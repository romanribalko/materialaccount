import React from "react";
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

import Widget from "../../../../components/Widget/Widget";
import s from "./Static.module.scss";

class PackInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableStyles: [
        {
          id: 1,
          pack_number: "KRZ010301",
          sortiment: {
            name: "C šķira",
            sort: "CC",
            dimensions: "1200x2500x50",
          }, 
          count: 150,
          volume: {
            colorClass: "success",
            percent: 100
          },
          creation_date: new Date("September 14, 2021") ,
          pack_user: "Grigorjevs V.",
          description: "",
          writting_date : null ,
          status :{
            colorClass: "primary",
            text: "Jauna"
          }
        },
        {
          id: 2,
          pack_number: "KRZ010302",
          sortiment: {
            name: "C šķira",
            sort: "CC",
            dimensions: "1200x2500x50",
          }, 
          count: 150,
          volume: {
            colorClass: "success",
            percent: 100
          },
          creation_date: new Date("September 14, 2021") ,
          pack_user: "Palejs V.",
          description: "Bija daudz izbrāķets",
          writting_date : null,
          status :{
            colorClass: "primary",
            text: "Jauna"
          }
        },
        {
          id: 3,
          pack_number: "KRZ010303",
          sortiment: {
            name: "B šķira",
            sort: "BC",
            dimensions: "1200x2500x50",
          }, 
          count: 60,
          volume: {
            colorClass: "danger",
            percent: 40
          },
          creation_date: new Date("September 15, 2021") ,
          pack_user: "Davidenko N.",
          description: "Puspaka",
          writting_date : null,
          status :{
            colorClass: "primary",
            text: "Jauna"
          }
        },
        {
          id: 4,
          pack_number: "KRZ010304",
          sortiment: {
            name: "B šķira",
            sort: "BC",
            dimensions: "1200x2500x50",
          }, 
          count: 80,
          volume: {
            colorClass: "secondary",
            percent: 60
          },
          creation_date: new Date("September 15, 2021") ,
          pack_user: "Davidenko N.",
          description: "",
          writting_date : new Date("September 16, 2021"),
          status :{
            colorClass: "success",
            text: "Norakstīta"
          }
        },

      ],
      checkboxes1: [false, true, false, false],
      checkboxes2: [false, false, false, false, false, false],
      checkboxes3: [false, false, false, false, false, false],
    };

    this.checkAll = this.checkAll.bind(this);
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
  }

  checkAll(ev, checkbox) {
    const checkboxArr = new Array(this.state[checkbox].length).fill(
      ev.target.checked
    );
    this.setState({
      [checkbox]: checkboxArr,
    });
  }

  changeCheck(ev, checkbox, id) {
    //eslint-disable-next-line
    this.state[checkbox][id] = ev.target.checked;
    if (!ev.target.checked) {
      //eslint-disable-next-line
      this.state[checkbox][0] = false;
    }
    this.setState({
      [checkbox]: this.state[checkbox],
    });
  }

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">#</th>
                    <th>Numurs</th>
                    <th>Sortiments</th>
                    <th>Izmēri</th>                    
                    <th className="hidden-sm-down">Skaits,gab.</th>
                    <th className="hidden-sm-down">Tilpums</th>                    
                    <th className="hidden-sm-down">Izveidošanas datums</th>
                    <th className="hidden-sm-down">Darbinieks</th>
                    <th className="hidden-sm-down">Komentārs</th>
                    <th className="hidden-sm-down">Status</th>

                  </tr>
                </thead>
                <tbody>
                  {this.state.tableStyles.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.pack_number}</td>
                      <td>{row.sortiment.name}</td>
                      <td>
                        <p className="mb-0">
                          <small>
                            Šķira:
                            <span className="text-muted fw-semi-bold">
                              &nbsp; {row.sortiment.sort}
                            </span>
                          </small>
                        </p>
                        <p>
                          <small>
                            Izmēri:
                            <span className="text-muted fw-semi-bold">
                              &nbsp; {row.sortiment.dimensions}
                            </span>
                          </small>
                        </p>
                      </td>
                      <td>
                        {row.count}
                      </td>
                      <td className="width-150">
                        <Progress
                          color={row.volume.colorClass}
                          value={row.volume.percent}
                          className="progress-sm mb-xs"
                        />
                      </td>

                      <td className="text-muted">{this.parseDate(row.creation_date)}</td> 
                      <td className="text-muted">{row.pack_user}</td>
                      <td className="text-muted">{row.description}</td>
                      <td>
                        {
                          <div>
                            <Badge color={row.status.colorClass}>
                              {row.status.text}
                            </Badge>
                          </div>
                        }
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
                  </div>
                  </div>

            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PackInfo;
