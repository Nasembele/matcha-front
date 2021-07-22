import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {IState} from "../../types";
import {setServerErrorAC} from "./ErrorWrapperAC";

const ErrorWrapper = () => {

    const dispatch = useDispatch();

    const error = useSelector((state: IState) => state.error);

    const onClickCancelServerError = () => {
        dispatch(setServerErrorAC(false));
    }

    return (
        <div>
            {
                error.isServerError &&
                    <div>
                        Ошибка на сервере
                        <div onClick={onClickCancelServerError}>Назад</div>
                    </div>

            }
        </div>
    )
}

export default ErrorWrapper;