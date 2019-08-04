import React, { Component } from 'react';
import './Pagination.scss'
import { pagination } from "../../../actions/fetchAction"
import { connect } from "react-redux";

var FontAwesome = require('react-fontawesome');

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.childDiv = React.createRef()
  }

  paginate = async(item) => {
    await this.props.dispatch(pagination(item))
    window.scrollTo(0, 0)
  }

  renderNum = () => {
      const rows = [];

      if (this.props.totalPages - this.props.pageNum < 8){
        for (let i = this.props.pageNum; i< this.props.totalPages + 1; i ++) {
          rows.push(<div onClick={()=> this.paginate(i)} key={i}>{i}</div>)
        }
      } else {
        for (let i = this.props.pageNum; i< this.props.totalPages; i ++) {
          rows.push(<div onClick={()=> this.paginate(i)} key={i}>{i}</div>)
          if (i === this.props.pageNum + 5){
            break;
          }
        }
        rows.push(<div key={'ellipsis'}>...</div>)
        rows.push(<div key={'last'}>{this.props.totalPages}</div>)
      }

      return (
        <div>
          {this.props.totalPages !== 1 ?
            <div className="container">
              <div>
                {this.props.pageNum ?
                <FontAwesome
                  className='chevron-left'
                  name='chevron-left'
                  onClick={()=> this.paginate(this.props.pageNum - 1)}
                />
                : null
                }
              </div>
              {rows}
              {this.props.pageNum < this.props.totalPages -5 ?
                <div>
                  <FontAwesome
                    className='chevron-right'
                    name='chevron-right'
                    onClick={()=> this.paginate(this.props.pageNum + 1)}
                  />
                </div>
                : null
              } 
            </div>
            :
            null
          }
        </div>
      )
  }
  render() {
    return (
      <div ref={this.childDiv}> 
          {this.renderNum()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    totalPages: state.userData.total_pages,
    pageNum: state.userData.page,
  }
}

export default connect(mapStateToProps)(Pagination);
