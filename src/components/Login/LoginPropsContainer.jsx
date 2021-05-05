import {connect} from "react-redux";
import Login from "./Login";

const mapStateToProps = (state) => ({
    login: state.login.login,
    password: state.login.password,

    // fio: state.registration.fio,
    // email: state.registration.email,
    // password: state.registration.password,
    // gender: state.registration.gender,
    // country: state.registration.country,
});

export default connect(mapStateToProps)(Login);