import React from 'react'
import './Job.scss'
var FontAwesome = require('react-fontawesome');

function diff_hours(dt2, dt1) {
  let diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  let result = Math.abs(Math.round(diff))
  if (result > 24) {
    result /= 24 
    result = Math.floor(result)
    return result > 1 ? result + ' days ago' : result + ' day ago'
  } else {
    return result > 1 ? result + ' hours ago' : result + ' hour ago'
  }
}
 

const Job = (props) => (
  <div className="job-section">
    {/* <div class="fist-row"> */}
    <div className="job-inner">
      <div className="job-title">{props.title}</div>
      <div className="job-salary">₱{props.salaryFrom /1000}k - ₱{props.salaryTo / 1000}k</div>
      <div className="job-location">
        <FontAwesome name='map-marker'/>
        {props.location}
      </div>
      <div className="job-years">
        <FontAwesome name='suitcase'/>
        {props.years}
      </div>
      <div className="job-degree">
        <FontAwesome name='graduation-cap'/>
        {props.degree}
      </div>
      <div className="job-type">
        <FontAwesome name='history'/>
        {props.type}
      </div>
      <div className="job-logo"><img src={props.logo}></img></div>
      <div className="job-company">
        {props.company}
      </div>
      <div className="job-posted">{diff_hours(new Date(),new Date(props.posted))}</div>
      <div className="split-line"></div>
    </div>
    
  </div>
)

export default Job