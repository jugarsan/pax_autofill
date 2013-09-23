/**
 * Created with IntelliJ IDEA.
 * User: jugarsan
 * Date: 9/22/13
 * Time: 3:43 PM
 * To change this template use File | Settings | File Templates.
 */

var sendMessage = function(paxRepository){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {autofill: true, paxs: paxRepository});
    });
};

function sendPaxsToContentScript(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", chrome.extension.getURL('pax_info.json'), true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            console.log(xhr.response);
            sendMessage(JSON.parse(xhr.response));
        }
    };
    xhr.send();
}


chrome.browserAction.onClicked.addListener(sendPaxsToContentScript);