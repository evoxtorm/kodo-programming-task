import makeHttpError from "../helpers/http-error.js";
import makeSearchParamters from "./search-v.js";

export default function makeSearchEndpointHandler({ searchList }) {
    return async function handle(httprequest) {
        switch (httprequest.method) {
            case 'POST':
                return postSearchRecords(httprequest);
            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                });
        }
    }

    async function postSearchRecords(httpRequest){
        let searchBodyInfo = httpRequest.body;
        if (!searchBodyInfo) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: "No Body Parameters"
            });
        }
        if (typeof searchBodyInfo === 'string') {
            try {
                searchBodyInfo = JSON.parse(searchBodyInfo);
            } catch (error) {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: error.message
                });
            }
        }
        try {
            const searchInfo = makeSearchParamters(searchBodyInfo);
            const result = await searchList.findSearchRecords(searchInfo);
            let start, end;
            if (searchInfo.page === 0) {
                start = 0;
                end = 10
            } else {
                start = searchInfo.page * 10
                end = start + 10
            }
            if (result) {
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    data: JSON.stringify({
                        "code": 200,
                        "msg": "Success",
                        "results": result.slice(start, end),
                        "totalMatchCount": result.length,
                        "page": searchInfo.page + 1
                    })
                }
            }
        } catch (error) {
            return makeHttpError({
                errorMessage: error.message,
                statusCode: 500
            })
        }
    }
}