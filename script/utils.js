
function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {
        type: mime
    });
}

function appendHtml(view, string) {
    view.html(view.html() + string)
}


function CSVToArray( strData, strDelimiter ){
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );

    var arrData = [[]];

    var arrMatches = null;

    while (arrMatches = objPattern.exec( strData )){

        var strMatchedDelimiter = arrMatches[ 1 ];

        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){
            arrData.push( [] );

        }

        var strMatchedValue;
        if (arrMatches[ 2 ]){
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {
            strMatchedValue = arrMatches[ 3 ];
        }
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    return( arrData );
}

function setAutoComplete(id) {
    var sample_inputs = [
            {
              title: "Address - Home",
              tags: ["live", "home", "address", "place"],
            },
            {
              title: "Address - Work",
              tags: ["live", "work", "address", "place"],
            },
            {
              title: "IM - FB",
              tags: ["im", "facebook", "instant message", "social media", "social"],
            },
          ];
          
          for (obj of sample_inputs) {
            obj.tags.unshift(obj.title);
            obj.tags = obj.tags.join(",");
            console.log(obj);
          }
          

        const autoCompletejs = new autoComplete({
            data: {
              src: sample_inputs,
              key: ["tags"],
            },
            sort: function (a, b) {
              if (a.match < b.match) {
                return -1;
              }
              if (a.match > b.match) {
                return 1;
              }
              return 0;
            },
            query: {
              manipulate: function (query) {
                return query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              },
            },
            trigger: {
              event: ["input", "focusin", "focusout"],
              condition: function (query) {
                return !!query.replace(/ /g, "").length && query !== "hamburger";
              },
            },
            placeHolder: "Select a Field",
            selector: "#" + id,
            debounce: 0,
            searchEngine: "loose",
            highlight: true,
            maxResults: 100,
            resultsList: {
              render: true,
              container: function (source) {
                source.setAttribute("id", "autoComplete_list" + id);
              },
              element: "ul",
              destination: $("#" + id),
              position: "afterend",
            },
            resultItem: {
              // Rendered result item            | (Optional)
              content: (data, source) => {
                // TODO: add highlight around the title if there's a match
                source.innerHTML = data.value.title;
              },
              element: "li",
            },
            noResults: function () {
              const result = document.createElement("li");
              result.setAttribute("class", "no_result");
              result.setAttribute("tabindex", "1");
              result.innerHTML = "No Results";
              document.querySelector("#autoComplete_list" + id).appendChild(result);
            },
            onSelection: function (feedback)  {
              document.querySelector("#" + id).blur();
              const selection = feedback.selection.value.title;
              console.log(feedback)
              // Clear Input
              document.querySelector("#" + id).value = "";
              // Change placeholder with the selected value
              document.querySelector("#" + id).setAttribute("placeholder", selection);
              // Concole log autoComplete data feedback
              console.log(feedback);
            },
          });

}


function CSVToArray( strData, strDelimiter ){
  strDelimiter = (strDelimiter || ",");
  var objPattern = new RegExp(
      (
          "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
          "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
          "([^\"\\" + strDelimiter + "\\r\\n]*))"
      ),
      "gi"
      );

  var arrData = [[]];

  var arrMatches = null;

  while (arrMatches = objPattern.exec( strData )){

      var strMatchedDelimiter = arrMatches[ 1 ];

      if (
          strMatchedDelimiter.length &&
          strMatchedDelimiter !== strDelimiter
          ){
          arrData.push( [] );

      }

      var strMatchedValue;
      if (arrMatches[ 2 ]){
          strMatchedValue = arrMatches[ 2 ].replace(
              new RegExp( "\"\"", "g" ),
              "\""
              );

      } else {
          strMatchedValue = arrMatches[ 3 ];
      }
      arrData[ arrData.length - 1 ].push( strMatchedValue );
  }

  return( arrData );
}

function resetDownloadButton() {
  $("#downloadHub").attr("href", "")
  $("#downloadButton").addClass("outline-gray-button")
  $("#downloadButton").removeClass("outline-blue-button")
  $('#downloadButton').prop("disabled", true); 
}