import React from 'react';
import Pagination from 'components/common/pagination';
import QualifiedTable from './QualifiedTable';
import BroadcastTable from './BroadcastTable';

/* eslint react/prop-types: 0 */
const DatatablePage = ({ data, onSchedule, typeLead, onClick }) => {
  if (!data) {
    return null;
  }
  return (
    <div className="table-sort">
      {typeLead === 'qualifiedLeads' ? (
        <QualifiedTable data={data} onSchedule={onSchedule} onClick={onClick} />
      ) : (
        <BroadcastTable data={data} onSchedule={onSchedule} onClick={onClick} />
      )}
      <div className="table-sort__paginate">
        <Pagination />
      </div>
    </div>
  );
};

export default DatatablePage;
