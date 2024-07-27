const dayjs = require('dayjs');

function dateFormat(date) {
    return dayjs(date).format('YYYY-MM-DD');
}

module.exports = dateFormat;