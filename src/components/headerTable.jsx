import React from "react";

function HeaderTable(props) {
  const { columns, sortChange, sortColumn } = props;

  function sortIconRender(column) {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order == "asc") return <i className="fa fa-sort-asc"></i>;
    else return <i className="fa fa-sort-desc"></i>;
  }
  return (
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={index} onClick={() => sortChange(col.path)}>
            {col.lable}
            {sortIconRender(col)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default HeaderTable;
