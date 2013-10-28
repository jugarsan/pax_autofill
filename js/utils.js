/**
 * Created with IntelliJ IDEA.
 * User: jugarsan
 * Date: 10/27/13
 * Time: 10:47 PM
 * To change this template use File | Settings | File Templates.
 */

var dispatchMouseEvents = function (target, args){
    var e = document.createEvent("MouseEvents");
    e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
    target.dispatchEvent(e);
};

chrome.runtime.onMessage.addListener(
    function(request, sender){
        console.log(sender.tab ? "from a content script: " + sender.tab.url : "from the extension");
        if(request.autofill = true){
            paxFormFill.fillForms(request.paxs);
        }
    }
);