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
  const dataLead = (data && data.leads) || [];

  return (
    <div className="table-sort">
      {!status ? (
        <QualifiedTable
          data={dataLead}
          onSchedule={onSchedule}
          onClick={onClick}
          filter={filter}
          onSort={onSort}
        />
      ) : (
        <BroadcastTable
          data={dataLead}
          onSchedule={onSchedule}
          onClick={onClick}
          branches={branches}
          filter={filter}
          onSort={onSort}
        />
      )}
      {data && (
      <div className="table-sort__paginate">
        <Pagination pages={data.pages} page={data.page} gotoPage={gotoPage} />
      </div>
      )}
    </div>
  );
};

export default DatatablePage;
