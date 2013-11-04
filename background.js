
var sendMessage = function(paxRepository){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {autofill: true, paxs: paxRepository});
    });
};

function sendPaxsToContentScript(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", chrome.extension.getURL('data/pax_info.json'), true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            sendMessage(JSON.parse(xhr.response));
        }
    };
    xhr.send();
}


chrome.browserAction.onClicked.addListener(sendPaxsToContentScript);

chrome.commands.onCommand.addListener(sendPaxsToContentScript);