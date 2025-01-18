import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { resetErrAction } from "../../redux/slices/globalActions/globalActions";

const ErrorMsg = ({ message }) => {
    const dispatch = useDispatch();
    Swal.fire({
        icon: 'error',
        text: message,
        title: 'Oops'
    })
    dispatch(resetErrAction());
}

export default ErrorMsg;