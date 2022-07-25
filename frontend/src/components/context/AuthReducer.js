const AuthReducer = (state, action) => {

    switch (action.type) {

        case "Login_Start":
            return {
                user: null,
                isFetching: true,
                error: false
            };
        case "Login_Sucess":
            return {
                user: action.payload,
                isFetching: true,
                error: false
            };
        case "Login_Error":
            return {
                user: null,
                isFetching: false,
                error: true
            };


        default:
            return state;
    }
}

export default AuthReducer;