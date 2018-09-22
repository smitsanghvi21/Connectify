import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearcurrentprofile } from '../../actions/userprofileAction';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearcurrentprofile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
//adding logout option (navbar for loggedin user)
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
            DASHBOARD
          </Link>
          <a
          //need to add home url after uploading it to cloud
            href="http://localhost:3000/"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            {' '}
            LOGOUT
          </a>
        </li>
      </ul>
    );
//for users who have'nt registered
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Join
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
//(old original navbar)
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Connectify
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/userprofile">
                  {' '}
                  Profiles
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser,clearcurrentprofile })(Navbar);
    