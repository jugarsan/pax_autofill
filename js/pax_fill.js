var paxFormFill = {

    //Title could be required. Since it doesn't have a class assigned, we'll search for it by name.
    lookAndSelectTitle: function(paxNumber){
        ++paxNumber;
        var title = document.getElementsByName("traveler_" + paxNumber + "_title");
        if (title[0] != null) {
            title[0].selectedIndex = 1;
        }
    },

    checkPaxGender: function(paxNumber){
       ++paxNumber;
        var genre = document.getElementsByName("traveler_air_1_" + paxNumber + "_gender");
        if (genre[0] != null){
            genre[0].checked = true;
        } 
    },

    //See if we're collecting PNR owner details. If so, copy lead traveler's info.
    checkAutoFillTraveler: function(){
        var autofill_radio = document.getElementsByClassName("automation-autoFillTraveler");
        if(autofill_radio.length > 0){
            autofill_radio[0].checked = true;
            dispatchMouseEvents(autofill_radio[0], 'click', true, true);
        }
    },

    fillForms: function(pax_info_repository){
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

        var repositoryNameRecord = 0;

        if(firstName.length > 0){
            for(var i = 0; i < firstName.length; i++){
               if(firstName[i].value == ""){
                  this.lookAndSelectTitle(i);
                  firstName[i].value = pax_info_repository.pax_names[repositoryNameRecord][0];
                  lastName[i].value = pax_info_repository.pax_names[repositoryNameRecord][2];
                  lastName[i].focus();

                  if(year[i] != null){
                     year[i].selectedIndex = i + 50;
                     month[i].selectedIndex = i + 1;
                     day[i].selectedIndex = i + 1;
                  }

                  this.checkPaxGender(i);
                  repositoryNameRecord++;
               }
            }
            address[0].value = pax_info_repository.contact_info.address;
            city[0].value = pax_info_repository.contact_info.state;
            zip[0].value = pax_info_repository.contact_info.zip;
        }

        this.checkAutoFillTraveler();
    }
};