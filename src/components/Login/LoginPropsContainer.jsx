import {connect} from "react-redux";
import Login from "./Login";

const mapStateToProps = (state) => ({
    login: state.login.login,
    password: state.login.password,
    isAuth: state.login.isAuth,
});

export default connect(mapStateToProps)(Login);