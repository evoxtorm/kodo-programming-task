import * as path from 'path'
import makeSearchList from './search-list.js';
import makeSearchEndpointHandler from './search-endpoint.js';
import readDataFile from '../helpers/read-file.js';

const filepath = path.resolve('./data.json');
const data = readDataFile(filepath);
const searchList = makeSearchList({ data });
const searcEndpointHandler = makeSearchEndpointHandler({ searchList });

export default searcEndpointHandler;


