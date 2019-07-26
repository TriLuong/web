import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import './styles.scss';

type Props = {
  pages: Number,
  page: Number,
  gotoPage: () => {},
};
class Pagination extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  gotoFirst = () => {
    const { gotoPage } = this.props;
    gotoPage(1);
  };

  gotoNumber = page => {
    const { gotoPage } = this.props;
    gotoPage(page);
  };

  gotoLast = () => {
    const { gotoPage, pages } = this.props;
    gotoPage(pages);
  };

  gotoPrev = () => {
    const { gotoPage, page } = this.props;
    if (page > 1) {
      gotoPage(page - 1);
    }
  };

  gotoNext = () => {
    const { gotoPage, pages, page } = this.props;
    if (page < pages) {
      gotoPage(Number(page) + 1);
    }
  };

  render() {
    const { pages, page } = this.props;
    const pageArr = Array.from(Array(pages).keys());

    const elemtPages = pageArr.map(pageIdx => (
      <li
        key={`${pageIdx} + 1`}
        onClick={() => this.gotoNumber(pageIdx + 1)}
        className={classnames('page-item', { active: pageIdx + 1 === Number(page) })}
      >
        <button className="page-link" type="button">
          {pageIdx + 1}
        </button>
      </li>
    ));

    return (
      <nav className="pagination-wrap">
        <button className="page-link" tabIndex="-1" type="button" onClick={this.gotoFirst}>
          First
        </button>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" tabIndex="-1" type="button" onClick={this.gotoPrev}>
              <FontAwesomeIcon color="#11a6b0" icon={faCaretLeft} />
            </button>
          </li>
          {elemtPages}
          <li className="page-item">
            <button className="page-link" type="button" onClick={this.gotoNext}>
              <FontAwesomeIcon color="#11a6b0" icon={faCaretRight} />
            </button>
          </li>
        </ul>
        <button className="page-link" tabIndex="-1" type="button" onClick={this.gotoLast}>
          Last
        </button>
      </nav>
    );
  }
}
export default Pagination;
