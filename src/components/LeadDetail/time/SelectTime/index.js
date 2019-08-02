import React, { PureComponent } from 'react';
import './style.scss';

class SelectTime extends PureComponent {
  render() {
    return (
      <div className="selectHour">
        <div className="titleTable">
          <p>Select Hour</p>
        </div>
        <hr />
        <table className="table  table-borderless selectHourTable">
          <tbody>
            <tr>
              <td>10 AM</td>
              <td>11 AM</td>
              <td>12 PM</td>
              <td>1 PM</td>
            </tr>
            <tr>
              <td>2 PM</td>
              <td>3 PM</td>
              <td>4 PM</td>
              <td>5 PM</td>
            </tr>
            <tr>
              <td>6 PM</td>
              <td>7 PM</td>
              <td>8 PM</td>
            </tr>
          </tbody>
        </table>

        <div className="titleTable">
          <p>Select Minutes</p>
        </div>
        <hr />
        <table className="table  table-borderless selectMinute">
          <tbody>
            <tr>
              <td>:00</td>
              <td>:15</td>
              <td>:30</td>
              <td>:45</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default SelectTime;
