const axios = require('axios').default;

async function verify(nation, code) {
    const res = await axios.get('https://www.nationstates.net/cgi-bin/api.cgi', {
        params: {
            a: 'verify',
            nation: nation,
            checksum: code,
            token: 'nstoday-auth-proto'
        }
    });

    return res.data === 1;
}

module.exports = verify;
