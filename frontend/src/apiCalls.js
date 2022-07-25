import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: 'Login_Start' });
    try {
        const res = await axios.post("auth/login", userCredentials)
        dispatch({ type: 'Login_Sucess', payload: res.data })
    } catch (error) {
        dispatch({ type: 'Login_Error', payload: error })
    }
}