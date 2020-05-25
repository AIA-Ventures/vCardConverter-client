// todo (aakash) make view model to store all UI interfacing
//      global_csv stored here to work for select Listeners
var global_vcard = null

$(document).ready(function() {

    $("#uploadButton").click(() => {
        if (!global_vcard) {
            alert("Upload a CSV file first!")
            return
        }
        global_vcard.postResponse()
    })

});

function reset() {
    global_vcard = null
    resetDownloadButton()
}

function processFile() {
    const preview = $("#preview");
    preview.html("")
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function() {
        reset()

        preview.attr("src", reader.result); // base 64 ENCODE

        var vcard = new VcardtoCSV(reader.result, 'data.csv')
        global_vcard = vcard

    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function setUpContactCardUI() {
    Object.keys(field_map).forEach(function (key) {
        var type = field_map[key]["ui"]["type"];
        var name = field_map[key]["ui"]["id"];
        addRowToContactCard(key, type, name)
    });
}

function addRowToContactCard(key, type, name) {
    var appendString = '<div class="row">' +
        '<div id="firstname" class="col-md-5 label">' + key + '</div>' +
        '<div id="lastname">' + key + '</div>' +
    '</div>'

    appendHtml($("#contact-card-" + type), appendString)
}

//   Data Classes
class VcardtoCSV {

    constructor(dataurl, filename) {
        this.dataurl = dataurl
        this.filename = filename
    }

    postResponse() {
        var data = {
            "payload": this.dataurl
        }

        postVcardToCsv(data) 
    }

}

