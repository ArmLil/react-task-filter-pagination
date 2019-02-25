import React, { Component } from "react";
import _ from "lodash";
import Loader from "./Loader/Loader.js";
import ReactPaginate from "react-paginate";
import Table from "./Table/Table.js";
import DetailRowView from "./DetailRowView/DetailRowView.js";
import ModeSelector from "./ModeSelector/ModeSelector.js";
import TableSearch from "./TableSearch/TableSearch.js";

//https://uxcandy.com/~shapoval/test-task-backend/?developer=Name

class App extends Component {
  state = {
    isModeSelected: false,
    isLoading: false,
    data: [],
    sort: "asc", //desc
    sortField: "id",
    row: null,
    currentPage: 0,
    search: ""
  };

  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sortType)
    });

    const _data = this.state.data.map((item, index) => {
      return Object.assign({}, item, { index: index });
    });
    this.setState({ data: _data });
  }

  onSort = sortField => {
    const clonedData = this.state.data.concat();
    const sort = this.state.sort === "asc" ? "desc" : "asc";
    const data = _.orderBy(clonedData, sortField, sort);
    this.setState({ data, sort, sortField });
  };

  onRowSelect = row => {
    this.setState({ row });
  };

  modeSelectHandler = url => {
    this.setState({
      isModeSelected: true,
      isLoading: true
    });

    this.fetchData(url);
  };

  pageChangeHandler = ({ selected }) => {
    this.setState({ currentPage: selected });
  };

  searchHandler = search => {
    this.setState({ search, currentPage: 0 });
  };

  getFilteredData = () => {
    const { data, search } = this.state;
    if (!search) {
      return data;
    }

    return data.filter(item => {
      return (
        item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
        item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
        item["email"].toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  render() {
    if (!this.state.isModeSelected) {
      return (
        <div className="container">
          <ModeSelector onSelect={this.modeSelectHandler} />
        </div>
      );
    }
    const pageSize = 17;
    const filteredData = this.getFilteredData();
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage];
    const pageCount = Math.ceil(filteredData.length / pageSize);

    return (
      <div className="container">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <TableSearch onSearch={this.searchHandler} />
            <Table
              data={displayData}
              onSort={this.onSort}
              sort={this.state.sort}
              sortField={this.state.sortField}
              onRowSelect={this.onRowSelect}
              currentPage={this.state.currentPage}
            />
          </React.Fragment>
        )}

        {this.state.data.length > pageSize ? (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.pageChangeHandler}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            forcePage={this.state.currentPage}

          />
        ) : null}

        {this.state.row ? <DetailRowView person={this.state.row} /> : null}
      </div>
    );
  }
}

export default App;
