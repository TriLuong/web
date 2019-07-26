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
    /* eslint react/prop-types:0 */
    const { pages } = this.props;
    const pageArr = Array.from(Array(pages).keys());

    const elemtPages = pageArr.map(page => (
      <li className="page-item active">
        <button className="page-link" type="button">
          {page + 1}
        </button>
      </li>
    ));

    return (
      <nav className="pagination-wrap">
        <button className="page-link" tabIndex="-1" type="button">
          First
        </button>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" tabIndex="-1" type="button">
              <FontAwesomeIcon color="#11a6b0" icon={faCaretLeft} />
            </button>
          </li>
          {elemtPages}
          <li className="page-item">
            <button className="page-link" type="button">
              <FontAwesomeIcon color="#11a6b0" icon={faCaretRight} />
            </button>
          </li>
        </ul>
        <button className="page-link" tabIndex="-1" type="button">
          Last
        </button>
      </nav>
    );
  }
}
export default Pagination;
