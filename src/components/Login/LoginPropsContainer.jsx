import {connect} from "react-redux";
import Login from "./Login";

const mapStateToProps = (state) => ({
    login: state.login.login,
    password: state.login.password,
    isAuth: state.login.isAuth,
    email: state.login.email,
    regData: state.login.regData,
});

export default connect(mapStateToProps)(Login);