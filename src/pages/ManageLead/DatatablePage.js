import React from 'react';
import Pagination from 'components/common/pagination';
import QualifiedTable from './QualifiedTable';
import BroadcastTable from './BroadcastTable';

/* eslint react/prop-types: 0 */
const DatatablePage = ({
  data,
  onSchedule,
  gotoPage,
  status,
  filter,
  onClick,
  branches,
  onSort,
}) => {
  if (!data || !data.leads) {
    return null;
  }
  return (
    <div className="table-sort">
      {status === 'qualifiedLeads' ? (
        <QualifiedTable
          data={data.leads}
          onSchedule={onSchedule}
          onClick={onClick}
          filter={filter}
          onSort={onSort}
        />
      ) : (
        <BroadcastTable
          data={data.leads}
          onSchedule={onSchedule}
          onClick={onClick}
          branches={branches}
          filter={filter}
          onSort={onSort}
        />
      )}
      <div className="table-sort__paginate">
        <Pagination pages={data.pages} page={data.page} gotoPage={gotoPage} />
      </div>
    </div>
  );
};

export default DatatablePage;
