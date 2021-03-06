import React from 'react';
import {Link} from 'react-router';
import {getStudentByName, logout} from '../helper/auth.js';
import NavTop from './NavTop.jsx';
import NavSide from './NavSide.jsx';


class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentName: '',
      studentPic: '../llama.png'
    };

    //binding all the method to this context before pass down to components.
    this.searchStudent = this.searchStudent.bind(this);
    this.logOut = this.logOut.bind(this);
  };

  // ----------------------------------------------
  // Component Lifecycle Functions
  // ----------------------------------------------
  shouldComponentUpdate(nextState) {
  if (this.props.studentObj !== nextState) {
    return true;
  }
  return false
  }

  // ----------------------------------------------
  // Axios calls
  // ----------------------------------------------
  searchStudent (name) {
    let context = this;
    getStudentByName(name)
    .then((resp) => {
      if (typeof resp.data === 'string') {
      } else {
        context.setState({
          studentName: resp.data.first_name + ' ' + resp.data.last_name,
          studentPic: resp.data.pic,
        });
        this.props.handleSearchInputChange(resp.data.id);
      }
    })
    .catch((err) => {
      console.log('sorry could not get student');
    })
  };


  logOut() {
    logout()
    .then((resp) => {
      console.log('logged out');
    })
    .catch((err) => {
      console.log(err);
    });
  };

  render () {
    return(
      <div className="navbar navbar-inverse navbar-fixed-top">
        <NavTop logOut={this.logOut} searchStudent={this.searchStudent}/>
        <NavSide list={this.props.sideBarLinks}
                 />
      </div>
    );
  }
}

export default Nav;
