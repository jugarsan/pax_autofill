
var dispatchMouseEvents = function (target, args){
    var e = document.createEvent("MouseEvents");
    e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
    target.dispatchEvent(e);
}

function fillForms(pax_info_repository){


    var firstName = document.getElementsByClassName("automation-firstName");
    var lastName = document.getElementsByClassName("automation-lastName");

    //DOB could be required for any component. Looking for those elements, just in case.
    var year = document.getElementsByClassName("Year");
    var month = document.getElementsByClassName("Month");
    var day = document.getElementsByClassName("Day");

    //The following applies only to Lead Traveler
    var address = document.getElementsByClassName("automation-address");
    var city = document.getElementsByClassName("automation-city");
    var zip = document.getElementsByClassName("automation-zip");


    if(firstName.length > 0){
        for(var i = 0; i < firstName.length; i++){
            firstName[i].value = pax_info_repository.pax_names[i][0];
            lastName[i].value = pax_info_repository.pax_names[i][2];
            lastName[i].focus();

            if(year[i] != null){
                year[i].selectedIndex = i + 1;
                month[i].selectedIndex = i + 1;
                day[i].selectedIndex = i + 1;
            }
        }
        address[0].value = pax_info_repository.contact_info.address;
        city[0].value = pax_info_repository.contact_info.state;
        zip[0].value = pax_info_repository.contact_info.zip;
    }

    checkAutoFillTraveler();
}

function checkAutoFillTraveler(){
    var autofill_radio = document.getElementsByClassName("automation-autoFillTraveler");
    if(autofill_radio.length > 0){
        autofill_radio[0].checked = true;
        dispatchMouseEvents(autofill_radio[0], 'click', true, true);
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