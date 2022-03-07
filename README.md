# KODO-programming-challenge

## Starting the server
    * npm install
    * npm start
    * npm install --only=dev (intsall dev depedency locally)

### Adding the einviorements variable for running the server

    * Create a `.env` file and add some of the secret variable in it.
    ```
        PORT=3000
    ``` 

## Run Test
    * Just run `npm test`.

## API

    `Base Route: localhost:${PORT}`

    * Route `/`, Base Route which may be encountered first time when any testing the APP.
        Method: GET
        Response: "kodo Task, This app is running, please request to correct endpoint"
    
    * Route `/search`
        Method: POST
        Body: {
            "searchString": "the king", // string
            "page": 0, // integer (starts with 0)
        }
        StatusCode: 200
        Response: {
            "code": 200,
            "msg": "Success",
            "totalMatchCount": 1,
            "page": 1
            "results": [
                {
                    "name": 'Human Web Agent',
                    "image": 'http://lorempixel.com/640/480',
                    "description": 'Vitae dolor natus aut aut. Totam dolor porro. Rem est repellendus voluptas eos soluta. The Lord of the Rings: The Return of the King',
                    "dateLastEdited": '2018-04-16T09:57:36.659Z'
                }
            ]
        }
    
    * Route `/*`, Any Request except above two request
        Method: Any
        Response: "Not found, Please request to correct endpoints"