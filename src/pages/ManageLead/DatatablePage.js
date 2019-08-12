import React from 'react';
import Pagination from 'components/common/pagination';
import QualifiedTable from './QualifiedTable';
import BroadcastTable from './BroadcastTable';

/* eslint react/prop-types: 0 */
const DatatablePage = ({ data, onSchedule, gotoPage, typeLead, onClick }) => {
  if (!data || !data.leads) {
    return null;
  }
  return (
    <div className="table-sort">
      {typeLead === 'qualifiedLeads' ? (
        <QualifiedTable data={data.leads} onSchedule={onSchedule} onClick={onClick} />
      ) : (
        <BroadcastTable data={data.leads} onSchedule={onSchedule} onClick={onClick} />
      )}
      <div className="table-sort__paginate">
        <Pagination pages={data.pages} page={data.page} gotoPage={gotoPage} />
      </div>
    </div>
  );
};

export default DatatablePage;
