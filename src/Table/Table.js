import React from "react";

export default props => {
  const headerCell = (name, text) => {
    return (
      <th onClick={() => props.onSort(name)}>
        {text}
        {props.sortField === name
          ? <small>{props.sort}</small>
          : null}
      </th>
    );
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {headerCell("index", "INDEX")}
          {headerCell("id", "ID")}
          {headerCell("firstName", "First Name")}
          {headerCell("lastName", "Last Name")}
          {headerCell("email", "Email")}
          {headerCell("phone", "Phone")}
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => {
          return (
            <tr
              key={item.id + item.phone}
              onClick={() => props.onRowSelect(item)}
            >
              <td>{`${item.index + 1}`}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
