import React from 'react';
import {getAllLogs} from './helper/auth.js'

class IEP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
      studentName: ''
    };
  }

  componentWillMount() {
    getAllLogs()
    .then((resp) => {
      if (this.props.student_id === '') {
        this.setState({
          logs: [],
        });
      } else {
        this.setState({
          logs: resp.data.filter((log) => {return log.types === 1 && log.student_id === this.props.student_id}),          studentName: resp.data.filter((log) => {return log.student_id === this.props.student_id})[0].first_name + ' ' + resp.data.filter((log) => {return log.student_id === this.props.student_id})[0].last_name,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render () {
    return (
      <div id="wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
                  <h1>{this.state.studentName} IEP</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
            <div id="iep">
              <object id="obj" data="http://www.naset.org/fileadmin/user_upload/Forms_Checklist_Etc/IEP/Completed_Sample_IEP.pdf" >IEP cannot be rendered</object>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export {IEP};