export default function makeHttpError({ statusCode, errorMessage}) {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode,
        data: JSON.stringify({
            code: statusCode,
            msg: "fail",
            error: errorMessage,
            results: []
        })
    }
}