import Registration from "./Registration";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    registration: state.registration,
    // fio: state.registration.fio,
    // email: state.registration.email,
    // password: state.registration.password,
    // gender: state.registration.gender,
    // country: state.registration.country,
});

export default connect(mapStateToProps)(Registration);