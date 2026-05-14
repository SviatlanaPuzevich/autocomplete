function createAutoComplete(data) {
    const sortedData = [...data].sort((a, b) =>
        a > b
    );
    const normalized = sortedData.map(item => item.toLowerCase());

    return function (str) {
        if (!str) return [];

        const search = str.toLowerCase();
        const left = binarySearchLeft(normalized, search);

        if (left === -1) return [];

        const result = [];
        for (let i = left; i < normalized.length; i++) {
            if (!normalized[i].startsWith(search)) break;
            result.push(sortedData[i]);
        }

        return result;
    };
}

function binarySearchLeft(data, str) {
    let left = 0;
    let right = data.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (data[mid].startsWith(str)) {
            result = mid;
            right = mid - 1;
        } else if (data[mid] < str) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}

module.exports = {createAutoComplete};