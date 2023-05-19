const axios = require('axios');
const config = require('./config.json');
const wait = require('wait');
const ms = require('ms');

(async() => {
    let _0 = 0;
    while(true) {
        const req = await axios("https://discord.com/api/v9/users/@me", {
            "headers": {
                "authorization": config.token,
                "content-type": "application/json",
                "sec-ch-ua": "Google Chrome;v=113, Chromium;v=113, Not-A.Brand;v=24",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "Windows",
                "x-debug-options": "bugReporterEnabled",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "data": { global_name: config.animation[_0] },
            "method": "PATCH"
        });
        if (req.status === 200) {
            if (config.animation[_0 + 1] !== undefined) _0++;
            else _0 = 0;
            console.log('Username change');
        } else if (req?.data?.message.startsWith('401')) {
            console.log('Unauthorized : check the user token');
            return process.exit(0);
        }
        await wait(ms(config.wait));
    }
})();