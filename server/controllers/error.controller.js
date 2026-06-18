function handleError(req, res) {
    return res.status(500).json({
        error: 'An unexpected server error occurred.'
    })
}

function getErrorMessage(errMsg) {
    if (errMsg.code && errMsg.code === 11000) {
        return 'A record with this value already exists.'
    }

    let message = 'Something went wrong.'
    if (errMsg.errors) {
        for (const errorField in errMsg.errors) {
            if (Object.hasOwn(errMsg.errors, errorField)) {
                message = errMsg.errors[errorField].message
                break
            }
        }
    } else if (errMsg.message) {
        message = errMsg.message
    }

    console.log(errMsg)
    return message
}

// Export the controller function
export default {
    handleError: handleError,
    getErrorMessage: getErrorMessage
};
