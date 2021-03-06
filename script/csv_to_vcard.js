// todo (aakash) make view model to store all UI interfacing
//      global_csv stored here to work for select Listeners
var global_csv = null

$(document).ready(function() {

    $("#uploadButton").click(() => {
        if (!global_csv) {
            alert("Upload a CSV file first!")
            return
        }
        global_csv.postResponse()
    })

});

function reset() {
    global_csv = null
    $("#mapContainer").html("")
    $("#contact-card-container").html("")

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

        var csv = new CSVtoVcard(reader.result, 'data.csv')
        global_csv = csv
        setUpUI(csv)

    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function addRowToContactCard(key, type, name) {
    var id = global_csv.fieldMapKeyToId(key)
    var appendString = '<div class="row" id="' + id + '_div">' +
        '<div id="firstname" class="col-md-5 label">' + key + '</div>' +
        '<div id="' + id + '">' + key + '</div>' +
    '</div>'

    appendHtml($("#contact-card-" + type), appendString)

    $("#" + id + "_div").hide()
}

function setUpUI(csv) {

    var headers = csv.headers

    for (var i = 0; i < headers.length; i++) {
    
        var title = headers[i]
        if (title == "" || title == null) {
            title = "[NO-HEADER]"
        }
        var appendString = '<tr><td>' + title + '</td><td>' + '<input class="autoComplete" type="search" tabindex="1">' + '</td><td>' + removeButton(i) + '</td></tr>'
        
        appendHtml($("#mapContainer"), appendString)

        attach_boxes(global_csv)
          
    }

    for (var i = 0; i < headers.length; i++) {
        setRemoveButtonListener(i, headers[i])
    }

    for (var i = 0; i < headers.length; i++) {
        setAutoComplete('autocomplete' + headers[i])
    }

}

function removeButton(id) {
    return '<button disabled id="remove_' + id + '" class="remove-button"><img src="assets/cancel.png" style="width: 30px; height: 30px;"/></button>'
}

function setRemoveButtonListener(i, csvAttr) {
    $("#remove_" + i).click(() => {
        global_csv.removeAttr(csvAttr, i)
    })
}

//   Utilities

function fieldMapSelector(id) {
    var options = ""
    var keys = Object.keys(field_map)
    keys.forEach(elem => {
        options += '<option value="' + elem + '">' + elem + '</option>'
    })

    return '<select name="' + id + '" id="' + id + '" onchange="selectChangeListener(this)">' +
        '<option value="">Select</option>' +
        options +
        '</select>'
}

function selectChangeListener(e) {
    global_csv.setMapAttr(csvheader = e.id, vcardattr = e.value)
}

//   Data Classes
class CSVtoVcard {

    constructor(dataurl, filename) {
        this.dataurl = dataurl
        this.filename = filename
        this.bstr = this.initBstr(dataurl)
        this.csv_arr = this.csvArr(this.bstr)
        this.headers = this.initHeaders(this.bstr)
        this.mapping = {}
        this.uimapping = {}
        this.fieldMap = JSON.parse(JSON.stringify(field_map))
    }

    initBstr(dataurl) {
        var arr = dataurl.split(','),
            bstr = atob(arr[1])
        return bstr
    }

    csvArr(csvString) {
        var arr = CSVToArray(csvString)
        console.log(arr)
        return arr
    }

    samplefield(id) {
        return this.csv_arr[1][this.headers.indexOf(id)]
    }

    initHeaders(csvString) {
        this.csv_arr[0] = csvString.split("\n")[0].split(",")
        return this.csv_arr[0]
    }

    setMapAttr(csvheader, vcardattr) {
        if (this.fieldMap[vcardattr]) {
            this.mapping[csvheader] = this.fieldMap[vcardattr]["vcard"]
            this.mapping[csvheader].attr = vcardattr
        } else {
            delete this.mapping[csvheader]
        }
       
        this.updateContactCardUI()
    }

    fieldMapKeyToId(key) {
        if (this.fieldMap[key] == null) {
            return null
        }

        return this.fieldMap[key]['ui']['id']
    }

    setTypeIdxInMapping() {

        var import_type_map_count = {}
        Object.keys(this.mapping).forEach(key => {
            var count_key = JSON.stringify(this.mapping[key]['import_type'])
            
            if (Object.keys(import_type_map_count).includes(count_key)) {
                import_type_map_count[count_key] = import_type_map_count[count_key] + 1
            } else {
                import_type_map_count[count_key] = 0
            }
            
            this.mapping[key]['type_idx'] = import_type_map_count[count_key]
        })

    }


    postResponse() {
        this.setTypeIdxInMapping()

        var data = {
            file: this.dataurl,
            mapping: JSON.stringify(this.mapping)
        }

        console.log("POSTING= ")
        console.log(this.mapping)

        postCsvToVcard(data)
    }

    updateContactCardUI() {

        var processed = {}

        // set up dictionary of section label : [list of objects]
            // each object is {title : {ordering, sampledata} }
        Object.keys(this.uimapping).forEach(key => {
            var data = this.uimapping[key]

            var obj = {
                "title": data.title,
                "order": data.order,
                "section_label": data.section_label,
                "sample": this.samplefield(key)
            }

           if (processed[data.type] == null) {
                processed[data.type] = []
           }
           processed[data.type].push(obj)

        });

        // sort based on ordering
        Object.keys(processed).forEach(sectionLabel => {
            console.log(sectionLabel)
            processed[sectionLabel] = processed[sectionLabel].sort((a, b) => {
                return a.order > b.order
            })
        })

        
        // populate $("#contact-card-container")
        var container = $("#contact-card-container")
        $("#contact-card-container").html("")

        Object.keys(processed).forEach(sectionLabel => {
            appendHtml(container, '<hr><b style="color: #5894f5">' + sectionLabel.toUpperCase() + '</b><div id="' + sectionLabel + '"></div>')
            var subContainer = $("#" + sectionLabel)

            processed[sectionLabel].forEach( 
                elem => {
                    appendHtml(subContainer, '<div class="row"><div class="col-md-4" style="color: gray;">' + elem.section_label + '</div>' + '<div class="col-md-8">' + elem.sample + '</div></div>')
                }
            )
        })
        
    }


    autocompleteMapped(selection, box_idx) {
        this.mapping[this.headers[box_idx]] = selection.vcard
        this.uimapping[this.headers[box_idx]] = selection.ui
        this.uimapping[this.headers[box_idx]].title = selection.title

        console.log(this.mapping)

        this.updateContactCardUI()
    }

    removeAttr(attr, i) {
        delete this.mapping[attr]
        delete this.uimapping[this.headers[i]]

        var input_id = `#autoComplete${i}`
        document.querySelector(input_id).placeholder = "Select a Field"
        document.querySelector(input_id).classList.remove("autoComplete_hasValue")
        
        document.querySelector(`#remove_${i}`).disabled = true;

        this.updateContactCardUI()
    }
  



}
