import React from "react";
import HeaderTable from "./headerTable";
import TableBody from "./tableBody";

function Table(props) {
  const { columns, sortColumn, sortChange, data } = props;

  return (
    <table className="table">
      <HeaderTable
        columns={columns}
        sortColumn={sortColumn}
        sortChange={sortChange}
      />
      <TableBody data={data} columns={columns} />
    </table>
  );
}

export default Table;
