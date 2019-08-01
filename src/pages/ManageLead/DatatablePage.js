import React from 'react';
import Pagination from 'components/common/pagination';
import QualifiedTable from './QualifiedTable';
import BroadcastTable from './BroadcastTable';

/* eslint react/prop-types: 0 */
const DatatablePage = ({ data, onSchedule, typeLead }) => {
  if (!data) {
    return null;
  }
  return (
    <div className="table-sort">
      {typeLead === 'qualifiedLeads' ? (
        <QualifiedTable data={data} onSchedule={onSchedule} />
      ) : (
        <BroadcastTable data={data} onSchedule={onSchedule} />
      )}
      <div className="table-sort__paginate">
        <Pagination />
      </div>
    </div>
  );
};

export default DatatablePage;
