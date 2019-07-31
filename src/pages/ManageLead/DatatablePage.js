/* eslint-disable */
import React from 'react';
import Pagination from 'components/common/pagination';
import IconEdit from 'components/common/icon/IconEdit';
import IconSort from 'components/common/icon/IconSort';
import QualifiedTable from './QualifiedTable';
import BroadcastTable from './BroadcastTable';

const DatatablePage = ({ data, params, onSchedule, typeLead }) => {
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
