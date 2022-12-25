import React, { Component } from "react";
import "./index.css";
import "./data"
import { availableSeats, post, seats } from "./data";
class Seatbooking1 extends React.Component {
  constructor() {
    super();
    this.state = {
      seat: seats,
      seatAvailable: availableSeats,
      seatReserved: [],
      seatSelected: post
    };
  }

  onClickData(seat) {
    if (this.state.seatReserved.indexOf(seat) > -1) {
      this.setState({
        seatAvailable: this.state.seatAvailable.concat(seat),
        seatReserved: this.state.seatReserved.filter(res => res != seat)
        //seatSelected: this.state.seatSelected.filter(res => res != seat)
      });
    } else {
      this.setState({
        seatReserved: this.state.seatReserved.concat(seat),
        //seatSelected: this.state.seatSelected.concat(seat),
        seatAvailable: this.state.seatAvailable.filter(res => res != seat)
      });
    }
  }
  checktrue(row) {
    if (this.state.seatSelected.indexOf(row) > -1) {
      return false;
    } else {
      return true;
    }
  }

  handleSubmited() {
    this.setState({
      seatSelected: this.state.seatSelected.concat(this.state.seatReserved)
    });
    this.setState({
      seatReserved: []
    });
  }

  render() {
    return (
      <div>
        <h1>Seat Reservation System</h1>
        <DrawGrid
          seat={this.state.seat}
          available={this.state.seatAvailable}
          reserved={this.state.seatReserved}
          selected={this.state.seatSelected}
          onClickData={this.onClickData.bind(this)}
          checktrue={this.checktrue.bind(this)}
          handleSubmited={this.handleSubmited.bind(this)}
        />
      </div>
    );
  }
}

class DrawGrid extends React.Component {
  render() {
    return (
      <div className="container">
  
        <table className="grid">
          <tbody>
            <tr>
              {this.props.seat.map(row => (
                <td
                  className={
                    this.props.selected.indexOf(row) > -1
                      ? "reserved"
                      : this.props.reserved.indexOf(row) > -1
                      ? "selected"
                      : "available"
                  }
                  key={row}
                  onClick={
                    this.props.checktrue(row)
                      ? e => this.onClickSeat(row)
                      : null
                  }
                >
                  {row}{" "}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          className="btn-success btnmargin"
          onClick={() => this.props.handleSubmited()}
        >
          Confirm Booking
        </button>
      </div>
    );
  }

  onClickSeat(seat) {
    this.props.onClickData(seat);
  }
}
export default Seatbooking1;
