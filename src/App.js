import React, { Component } from 'react';
import './App.scss';
import { connect } from "react-redux";
import { firstMount, thunkFilter } from "./actions/fetchAction"
import Header from './shared/components/Header'
import Filter from './shared/components/Filter'
import Job from './shared/components/Job'
import Pagination from './shared/components/Pagination'

class App extends Component {

  handleChange = (e) => {
    this.props.dispatch(thunkFilter(e.target.value))
  }

 
  componentDidMount(){
    this.props.dispatch(firstMount())
  }


  render() {
    return (
      <div className="App">
        <div className="App-Wrapper">
          <Header />
          <Filter onChange={this.handleChange}/>
          
          {this.props.isFetching ? <h3>Loading...</h3> : null}
          {this.props.isError ? (
            <h3 className="error">No data exists.</h3>
          ) : null} 
          {this.props.userData.jobs ? (
            <div className="found">{this.props.totalJobs} jobs found</div>
          ) : null}
{/* 
          {this.props.userData.jobs && this.props.filterValue !== '' ? (
            <div className="found">{this.props.filtered.length} jobs found</div>
          ) : null} */}
          {this.props.userData.jobs ? 
          this.props.userData.jobs.map(job => (
            <Job key={job.id}
              title={job.job_title}
              salaryFrom={job.salary_range_from}
              salaryTo={job.salary_range_to}
              location={job.job_location}
              years={job.xp_lvl}
              degree={job.degree}
              type={job.job_type}
              logo={job.company_logo}
              company={job.company_name}
              posted={job.updated_at}
            />
          )): null}

          <Pagination/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filterValue: state.filterValue,
    filtered: state.filtered,
    isError: state.isError,
    isFetching: state.isFetching,
    userData: state.userData,
    totalJobs: state.userData.total_num
  }
}

export default connect(mapStateToProps)(App);
