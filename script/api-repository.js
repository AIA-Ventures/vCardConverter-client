let BASE_URL = "https://vcardconverter.wl.r.appspot.com"

function postVcardToCsv(data) {
   $.ajax({
        url: BASE_URL + '/convert-to-csv',
        type: 'post',
        processData: false,
        data: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        },
        dataType: 'json',
       success: function (data) {
           
           const ga_payload = {
               hitType: 'event',
               eventCategory: 'to_csv',
               eventAction: 'convert',
               eventLabel: 'web_conversion_csv',
               eventValue: data["metadata"]["records_processed"],
               hitCallback: function () {
                   console.log("SUBMITTED EVENT TO GA")
               }
           }
           if ("ga" in window) {
               tracker = ga.getAll()[0];
               console.log("GOT A TRACKER")
               if (tracker)
                   tracker.send("event", "Test", "Test GA");
           } else {
               console.log("Tracker not properly initialized")
           }

           console.log(ga_payload);
           ga('send', ga_payload);

            var csvDownloadLink = 'data:' + data['file_type'] + ';base64,' + data['contents']

            $("#downloadHub").attr("href", csvDownloadLink) // DOWNLOAD
            $("#downloadButton").removeClass("outline-gray-button")
            $("#downloadButton").addClass("outline-blue-button")
            $('#downloadButton').prop("disabled", false); 
        }
    });
}

function postCsvToVcard(data) {
    $.ajax({
        url: BASE_URL + '/convert-to-vcard',
        type: 'post',
        processData: false,
        data: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        },
        dataType: 'json',
        success: function (data) {
            const ga_payload = {
                hitType: 'event',
                eventCategory: 'to_vcard',
                eventAction: 'convert',
                eventLabel: 'web_conversion_vcard',
                eventValue: data["metadata"]["records_processed"],
                hitCallback: function () {
                    console.log("SUBMITTED EVENT TO GA")
                }
            }
            console.log(ga_payload);
            ga('send', ga_payload);

            var csvDownloadLink = 'data:' + data['file_type'] + ';base64,' + data['contents']
            $("#downloadHub").attr("href", csvDownloadLink)

            $("#downloadButton").removeClass("outline-gray-button")
            $("#downloadButton").addClass("outline-blue-button")
            $('#downloadButton').prop("disabled", false); 
        }
    });
}