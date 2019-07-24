import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'components/common/pagination';
import IconEdit from 'components/common/icon/IconEdit';

const DatatablePage = () => (
  <div className="table-sort">
    <table entries="10" className="table">
      <thead>
        <tr>
          <th className="sorting">
            Name (A-Z)
            <FontAwesomeIcon color="#fff" icon={faSort} />
          </th>
          <th className="sorting">
            Address
            <FontAwesomeIcon color="#fff" icon={faSort} />
          </th>
          <th className="sorting">
            Contact
            <FontAwesomeIcon color="#fff" icon={faSort} />
          </th>
          <th className="sorting" />
          <th className="sorting" />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tiger Nixon</td>
          <td>12, Random street name Chennai, Tamil Nadu India 600064</td>
          <td>
            +91 8939792845
            <br />
            jayaprasad.mohanan@gmail.com
          </td>
          <td>
            <button type="button" className="btn btn-primary">
              schedule
            </button>
          </td>
          <td>
            <button type="button" className="btn btn-outline-secondary">
              <IconEdit />
            </button>
          </td>
        </tr>
        <tr>
          <td>Tiger Nixon</td>
          <td>12, Random street name Chennai, Tamil Nadu India 600064</td>
          <td>
            +91 8939792845
            <br />
            jayaprasad.mohanan@gmail.com
          </td>
          <td>
            <button type="button" className="btn btn-primary">
              schedule
            </button>
          </td>
          <td>
            <button type="button" className="btn btn-outline-secondary">
              <IconEdit />
            </button>
          </td>
        </tr>
        <tr>
          <td>Tiger Nixon</td>
          <td>12, Random street name Chennai, Tamil Nadu India 600064</td>
          <td>
            +91 8939792845
            <br />
            jayaprasad.mohanan@gmail.com
          </td>
          <td>
            <button type="button" className="btn btn-primary">
              schedule
            </button>
          </td>
          <td>
            <button type="button" className="btn btn-outline-secondary">
              <IconEdit />
            </button>
          </td>
        </tr>
        <tr>
          <td>Tiger Nixon</td>
          <td>12, Random street name Chennai, Tamil Nadu India 600064</td>
          <td>
            +91 8939792845
            <br />
            jayaprasad.mohanan@gmail.com
          </td>
          <td>
            <button type="button" className="btn btn-primary">
              schedule
            </button>
          </td>
          <td>
            <button type="button" className="btn btn-outline-secondary">
              <IconEdit />
            </button>
          </td>
        </tr>

        <tr>
          <td>Tiger Nixon</td>
          <td>12, Random street name Chennai, Tamil Nadu India 600064</td>
          <td>
            +91 8939792845
            <br />
            jayaprasad.mohanan@gmail.com
          </td>
          <td>
            <button type="button" className="btn btn-primary">
              schedule
            </button>
          </td>
          <td>
            <button type="button" className="btn btn-outline-secondary">
              <IconEdit />
            </button>
          </td>
        </tr>
        <tr>
          <td>Tiger Nixon</td>
          <td>12, Random street name Chennai, Tamil Nadu India 600064</td>
          <td>
            +91 8939792845
            <br />
            jayaprasad.mohanan@gmail.com
          </td>
          <td>
            <button type="button" className="btn btn-primary">
              schedule
            </button>
          </td>
          <td>
            <button type="button" className="btn btn-outline-secondary">
              <IconEdit />
            </button>
          </td>
        </tr>
        <tr>
          <td>Tiger Nixon</td>
          <td>12, Random street name Chennai, Tamil Nadu India 600064</td>
          <td>
            +91 8939792845
            <br />
            jayaprasad.mohanan@gmail.com
          </td>
          <td>
            <button type="button" className="btn btn-primary">
              schedule
            </button>
          </td>
          <td>
            <button type="button" className="btn btn-outline-secondary">
              <IconEdit />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div className="table-sort__paginate">
      <Pagination />
    </div>
  </div>
);

export default DatatablePage;
