import * as path from 'path';
import makeSearchList from '../src/search/search-list.js';
import readDataFile from '../src/helpers/read-file.js';

const filepath = path.resolve('./data.json');
const data = readDataFile(filepath);
const searchList = makeSearchList({ data });

describe('Search Repo', () => {
    it('should list records', async () => {
        const query = {
            "searchString": "\"the king\"",
            "page": 0
        }
        let expectedArr = [
            {
              name: 'Human Web Agent',
              image: 'http://lorempixel.com/640/480',
              description: 'Vitae dolor natus aut aut. Totam dolor porro. Rem est repellendus voluptas eos soluta. The Lord of the Rings: The Return of the King',
              dateLastEdited: '2018-04-16T09:57:36.659Z'
            },
            {
              name: 'The Lord of the Rings: The Return of the King',
              image: 'http://lorempixel.com/640/480',
              description: 'Nihil hic neque dignissimos totam omnis ut aut. Fugiat voluptatem rem quisquam provident est odit. Necessitatibus veniam architecto quia. Rerum deserunt reiciendis velit voluptatem tempora iusto similique. Atque mollitia pariatur quia voluptatem qui laborum laborum rerum molestias.',
              dateLastEdited: '2018-08-06T08:27:26.187Z'
            }
          ]
        const searchRecords = await searchList.findSearchRecords(query);
        expect(searchRecords).toEqual(expectedArr);
    })
    it('should list records', async () => {
        const query = {
            "searchString": "",
            "page": 0
        }
        const searchRecords = await searchList.findSearchRecords(query);
        let newData = Object.values(await data)
        expect(searchRecords).toEqual(newData);
    })
})