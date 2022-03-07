export default function makeSearchList({ data }) {
    return Object.freeze({
        findSearchRecords
    });

    async function findSearchRecords({ searchString, page }) {
        if (!searchString.trim()) {
            return data;
        }
        let results = [];
        const n = searchString.length - 1;
        let searchQuery;
        if (searchString[0] === '"' && searchString[n] === '"') {
            searchQuery = [searchString.slice(1, -1)]
        } else {
            searchQuery = searchString.split(' ');
        }
        let newData = Object.values(await data)
        newData.forEach(obj => {
            let matchCount = 0;
            searchQuery.forEach(sval => {
                let indvStringCount = 0;
                for (let key in obj) {
                    if (key != 'name' && key != 'description') {
                        continue;
                    }
                    if (obj[key].toLowerCase().indexOf(sval.toLowerCase()) > -1) {
                        indvStringCount++;
                    }
                }
                if (indvStringCount >= 1) {
                    matchCount++;
                }
            })
            if (matchCount >= 1) {
                results.push(obj);
            }
        });
        results.sort(function(a, b) {
            return a.name.localeCompare(b.name) || (new Date(a.dateLastEdited)).getTime() - (new Date(b.dateLastEdited)).getTime();
        });
        return results;
    }
}