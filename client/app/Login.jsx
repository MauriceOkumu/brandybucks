import React from 'react';
import {Link} from 'react-router';

class Login extends React.Component {
  render () {
    return (
      <div id="wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
                  <h1>Login</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
            <form action="/login" method="post">
                  <b>Username:</b> &nbsp;
                  <input id="username" type="text" name="username" /> &nbsp;
                  <b>Password:</b> &nbsp;
                  <input id="password" type="password" name="password" /> &nbsp;
                  <input type="submit" className="btn login-btn" value="&nbsp;Login&nbsp;" />
            </form>
            <p />
              <Link to="/signup">Create an Account &rarr;</Link>
            <p />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export {Login};