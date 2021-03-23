import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
 
class PackQRReader extends Component {
  state = {
    result: 'Lūdzu noskenējiet kodu no etiķētes...'
  }

 
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
      //this.props.setPackNum(data); //this.setPackNum(2)
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    //const {setPackNum} =  this.props

    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />

        <p>{this.state.result}</p>
      </div>
    )
  }
}
export default PackQRReader;