import {connect} from "react-redux";
import ResetPassword from "./ResetPassword";

const mapStateToProps = (state) => ({
    resetPassword: state.login.resetPassword,
});

export default connect(mapStateToProps)(ResetPassword);