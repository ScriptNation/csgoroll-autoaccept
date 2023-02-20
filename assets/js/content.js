// CONFIG - replace the text in 'webhook' var with your discord webhook link
webhook = 'INSERT_PRIVATE_WEBHOOK_HERE'
autoaccept = true

// DISCORD TEMPLATE
var sendWebHookDiscord = (urlDiscordWebhook = webhook, webhookType, scrapedData = {} ,embeds = []) => {
    const url = urlDiscordWebhook
    const templateWebhook = {
        "areYouReady": {
            "username": `DEPOBOT`,
            "avatar_url": 'https://pbs.twimg.com/profile_images/1610084878720049154/n0j4nld9_400x400.png',
            "content": ``,
            "embeds": [
                {
                    "title": `Ready to deliver!`,
                    "description": `Send the item!
                    @TAG_YOURSELF_HERE`,
                    "color": 0,
                    "fields": [
                        {
                            "name": "ITEM: ",
                            "value": scrapedData.weapon
                        }
                    ]
                }
            ]
        }
    }
    params = templateWebhook[webhookType]

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(params)
    })
}

// AUTO-ACCEPT SCRIPT
intLookForPopup = setInterval(function(){
    if (popup = document.querySelector("body > div.cdk-overlay-container")){
        if (depoReadyBtn = popup.querySelector("cw-deposit-joined-dialog button")){
            if(depoAutoAccept){
                depoReadyBtn.click()

                setTimeout(function (){
                    const lookForScrape = setInterval(function(){
                        if (weaponName = document.querySelector("cw-deposit-processing-dialog > mat-dialog-content > cw-item")) {
                            clearInterval(lookForScrape)
                            itemInfo.weapon =  weaponName.innerText
                            sendWebHookDiscord(webhook,webhookType = 'areYouReady', itemInfo)
                        }
                    },100)
                },2000)
            }
        }
    }
},1000)
