import React from "react";
import {connect} from "react-redux";
import MainPage from "./MainPage";
import {IState} from "../../types";

const mapStateToProps = (state: IState) => ({
      // account: state.mainPage?.account,
      // users: state.mainPage?.users,
      // likeUsers: state?.mainPage?.likeUsers,
    // password: state.login.password,
    // isAuth: state.login.isAuth,
    // email: state.login.email,
    // regData: state.login.regData,
});

export default connect(mapStateToProps)(MainPage);
