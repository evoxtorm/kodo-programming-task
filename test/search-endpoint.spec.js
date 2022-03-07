import handle from '../src/search';

describe('Search Repo', () => {
    it('give error if searchString is not string', async () => {
        const result  = await handle({
            'method': 'POST',
            'body': JSON.stringify({
                "searchString": 1,
                "page": 1
            })
        })
        expect(result.statusCode).toEqual(500);
    })
    it('give error if searchString is not present', async () => {
        const result  = await handle({
            'method': 'POST',
            'body': JSON.stringify({
                "page": 1
            })
        })
        expect(result.statusCode).toEqual(500);
    })
    it('give error if page is not integer type', async () => {
        const result = await handle({
            'method': 'POST',
            'body': JSON.stringify({
                "searchString": "hdhd",
                "page": "dggd"
            })
        })
        expect(result.statusCode).toEqual(500);
    })
    it('give error if page  integer is negative', async () => {
        const result = await handle({
            'method': 'POST',
            'body': JSON.stringify({
                "searchString": "hdhd",
                "page": -1
            })
        })
        expect(result.statusCode).toEqual(500);
    })
})