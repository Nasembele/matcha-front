import React from "react";
import {connect} from "react-redux";
import MainPage from "./MainPage";

const mapStateToProps = (state) => ({
      account: state.mainPage.account,
    // password: state.login.password,
    // isAuth: state.login.isAuth,
    // email: state.login.email,
    // regData: state.login.regData,
});

export default connect(mapStateToProps)(MainPage);
