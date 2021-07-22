import {connect} from "react-redux";
import Login from "./Login";
import {IState} from "../../types";

const mapStateToProps = (state: IState) => ({
    //login: state.login,
    // password: state.login.password,
    // isAuth: state.login.isAuth,
    // email: state.login.email,
    // regData: state.login.regData,
});

export default connect(mapStateToProps)(Login);