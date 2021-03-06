let BASE_URL = "https://vcardconverter.wl.r.appspot.com"
// let BASE_URL = "http://127.0.0.1:8080"

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

           gtag('event', 'convert', {
               'event_category': 'to_csv',
               'event_label': 'web_conversion_csv',
               'value': data["metadata"]["records_processed"]
           });

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
            gtag('event', 'convert', {
                'event_category': 'to_vcard',
                'event_label': 'web_conversion_vcard',
                'value': data["metadata"]["records_processed"]
            });

            var csvDownloadLink = 'data:' + data['file_type'] + ';base64,' + data['contents']
            $("#downloadHub").attr("href", csvDownloadLink)

            $("#downloadButton").removeClass("outline-gray-button")
            $("#downloadButton").addClass("outline-blue-button")
            $('#downloadButton').prop("disabled", false); 
        }
    });
}