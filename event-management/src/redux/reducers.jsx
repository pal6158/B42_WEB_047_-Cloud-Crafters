let initial = {
    mydata: null,
    loading: false,
    error: null, // Update error to store error messages or specific error states
}

export let DataReducers = (state = initial, { type, payload }) => {
    switch (type) {
        case "FETCH-REQ":
            return {
                ...state,
                loading: true
            }
        case "FETCH-COM":
            return {
                ...state,
                mydata: payload,
                loading: false,
                error: null, // Reset error when data is successfully fetched
            }

        case "FETCH-FAIL":
            return {
                ...state,
                loading: false,
                error: payload || "Something went wrong while fetching data", // Capture error details
            }
        default:
            return state
    }
}
