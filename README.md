Bitbucket Telegram Bot
======================

This application gets updates from Bitbucket and publishes them into Telegram Channels.

Installation
============

npm install @samiyev/bitbucket-telegram-bot

Usage
=====

No extensive tutorials required because you are a smart developer!
Using this module should be an easy one, so let's make it so! Here's some examples.

Configuration
=============

You must make bot and channel in telegram.
If the channel is public, chatId may contain channel name, like @myPublicChannel.

If the channel is private, then make a channel public, send a test request to the channel from the browser like the following:

```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage?chat_id=@myTemporaryPublicChannel&text=test
https://api.telegram.org/bot258108210:BAFN7INaQc0MP1GlDe9SxCm-cjc0hz-zWdw/sendMessage?chat_id=@myTemporaryPublicChannel&text=test
```

After that you can make channel private again.

Response will contain the channel's numeric ID, like the following:

```json
{
  "ok": true,
  "result": {
    "message_id": 2,
    "chat": {
      "id": -1001072411791,
      "title": "myTemporaryPublicChannel",
      "username": "myTemporaryPublicChannel",
      "type": "channel"
    },
    "date": 1472985422,
    "text": "test"
  }
}

```

In the above example -1001072411791 is the channel ID.
Then you must add your telegram bot into your telegram channel quality Admin.

Shoot-and-forget usage
----------------------

```javascript

const daemon = {
    //interval daemon autoupdate time
    interval: 59 * 1000
};

const bitbucket = {
    team: 'bitbucketTeamName',
    username: 'yourBirbucketUsername',
    password: 'youBitbucketPassword'
};

const telegram = {
    // token make in Botfather telegram.
    token: '417091793:AAFihPEqfWK0OcQRthCMjmTtKkpn4Y6XrmQ',

    // public channel id
    chat_id: -1001072411791
};

import * as BitbucketUpdates from "@samiyev/bitbucket-telegram-bot";

const daemon = new BitbucketUpdates
                    .Daemon(daemon, bitbucket, telegram, counter);

daemon
    .onExecute()
    .then(() => {
        console.log('Daemon is running...');
    })
    .catch((error) => {
        console.log(error);
    });
```

### Thank you for using this module, Good luck!