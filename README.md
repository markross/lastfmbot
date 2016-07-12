# LastFM Slack Bot

A LastFM Slack Bot. Start the server with `npm start`. Create a Slack [slash command](https://api.slack.com/slash-commands)
then create an [incoming web hook](https://api.slack.com/incoming-webhooks). Create `config.json` (you can copy 
`config.json.example`) in the root directory and add your LastFM API key and secret, the Slack slash token and the URL of the
Slack incoming webhook. Now you should be ready to go! 

Just type your slash command followed by your LastFM username e.g.

`/nowplaying joebloggs`

Your most recently played (or currently playing) track should be posted back to the channel. 
Your LastFM username should also be saved so in future you can omit it from the slash command.
