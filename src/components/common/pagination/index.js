import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

class Pagination extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav className="pagination-wrap">
        <button className="page-link" tabIndex="-1">
          First
        </button>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" tabIndex="-1">
              <FontAwesomeIcon color="#11a6b0" icon={faCaretLeft} />
            </button>
          </li>
          <li className="page-item active">
            <button className="page-link">1</button>
          </li>
          <li className="page-item">
            <button className="page-link">2</button>
          </li>
          <li className="page-item">
            <button className="page-link">3</button>
          </li>
          <li className="page-item">
            <button className="page-link">4</button>
          </li>
          <li className="page-item">
            <button className="page-link"><FontAwesomeIcon color="#11a6b0" icon={faCaretRight} /></button>
          </li>
        </ul>
        <button className="page-link" tabIndex="-1">
          Last
        </button>
      </nav>
    );
  }
}
export default Pagination;
