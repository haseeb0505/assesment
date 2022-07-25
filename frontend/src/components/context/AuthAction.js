export const loginStart = (userCredentials) => ({
    type: "Login_Start"
});
export const loginSuccess = (user) => ({
    type: "Login_Success",
    payload: user
});
export const loginError = (error) => ({
    type: "Login_Error",

});
