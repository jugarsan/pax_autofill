/**
 * Created with IntelliJ IDEA.
 * User: jugarsan
 * Date: 9/2/13
 * Time: 8:50 PM
 * To change this template use File | Settings | File Templates.
 */

function fillForms(pax_info_repository){
    var firstName = document.getElementsByName("firstName");
    var lastName = document.getElementsByName("lastName");
    var address = document.getElementsByName("address");
    var city = document.getElementsByName("state");
    var country = document.getElementsByName("country");
    var year = document.getElementsByName("year");
    var month = document.getElementsByName("month");
    var day = document.getElementsByName("day");

    if(firstName.length > 0){
        for(var i = 0; i < firstName.length; i++){
            firstName[i].value = pax_info_repository.pax_names[i][0];
            lastName[i].value = pax_info_repository.pax_names[i][2];
            address[i].value = pax_info_repository.contact_info.address;
            city[i].value = pax_info_repository.contact_info.state;
            country[i].value = pax_info_repository.contact_info.country;
            year[i].selectedIndex = i;
            month[i].selectedIndex = i;
            day[i].selectedIndex = i;
        }
    }
}


chrome.runtime.onMessage.addListener(
    function(request, sender){
        console.log(sender.tab ? "from a content script: " + sender.tab.url : "from the extension");
        if(request.autofill = true){
            fillForms(request.paxs);
        }
    }
);