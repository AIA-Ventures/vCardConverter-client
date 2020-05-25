// Load JSON text from server hosted file and return JSON parsed object
function loadJSON(filePath) {
  // Load json file;
  var json = loadTextFileAjaxSync(filePath, "application/json");
  // Parse json
  return JSON.parse(json);
}   

// Load text with Ajax synchronously: takes path to file and optional MIME type
function loadTextFileAjaxSync(filePath, mimeType)
{
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET",filePath,false);
  if (mimeType != null) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
  }
  xmlhttp.send();
  return xmlhttp.responseText
}



var mappers = [
  "address",
  "name",
  "name_flat",
  "work",
  "work_flat",
  "phone",
  "email",
  "date",
  "url",
  "social_media",
  "relation",
  "note"
];

ALL_MAPPERS = []


function deep_replace(obj, tgt, rpl) {
  if (typeof obj === "string") {
    return
  }
  for (var key in obj) {
    if (typeof (obj[key]) === "string" && obj[key].includes(tgt)) {
      obj[key] = obj[key].replace(tgt, rpl)
    } else {
      deep_replace(obj[key], tgt, rpl)
    }
  }
}
function deep_copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}


for (mapper of mappers) {
  var data = loadJSON(`script/mappers/${mapper}.json`)

  for (var record of data.records) {
    var template = deep_copy(data._template)
    for (var injection_target in record.inject_map) {
      injection_repl = record.inject_map[injection_target]
      deep_replace(template, `{{${injection_target}}}`, injection_repl)
    }

    template.tags.push(...record.tags)
    template.tags.push('help')

    for (var processor of data.post_processors) {
      var obj = template;
      var path = deep_copy(processor.key_path)
      var last_key = path.pop();
      for (key of path) {
        obj = obj[key]
      }
      var command = `${processor.fn_name}(${obj[last_key]})`;
      obj[last_key] = eval(command);
    }

    ALL_MAPPERS.push(template)
  }

}


for (obj of ALL_MAPPERS) {
  obj.tags.unshift(obj.title);
  obj.tags = obj.tags.join(",");
}


function attach_boxes(global_csv) {
  boxes = document.getElementsByClassName("autoComplete");

  function attachAutoComplete(box_id, box_idx) {
    const input_id = `#${box_id}`;
    const list_id = `#${box_id}_list`;
    const idx = box_idx;

    new autoComplete({
      data: {
        src: ALL_MAPPERS,
        key: ["tags"],
      },
      sort: function (a, b) {
        var a_ui = a.value.ui;
        var b_ui = a.value.ui;

        function compare(x, y) {
          if (x > y) {
            return -1;
          } else if (x < y) {
            return 1;
          } else {
            return 0;
          }
        }

        if (a_ui.type === b_ui.type) {
          return compare(a_ui.order, b_ui.order);
        } else {
          return compare(a_ui.type, b_ui.type);
        }
      },
      trigger: {
        event: ["input", "focusin", "focusout"],
        condition: function (query) {
          return !!query.replace(/ /g, "").length;
        },
      },
      placeHolder: "Select a Field",
      selector: input_id,
      debounce: 0,
      searchEngine: "strict",
      highlight: true,
      maxResults: 100,
      resultsList: {
        render: true,
        container: function (source) {
          source.setAttribute("id", list_id.slice(1));
          source.setAttribute("class", "autoComplete_list");
        },
        element: "ul",
        destination: document.querySelector(input_id),
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
        console.log(list_id);
        document.querySelector(list_id).appendChild(result);
      },
      onSelection: function (feedback) {
        document.querySelector(input_id).blur();
        const selection = feedback.selection.value;
        document.querySelector(input_id).placeholder = selection.title;
        document.querySelector(input_id).classList.add("autoComplete_hasValue")
        document.querySelector(input_id).value = "";

        document.querySelector(`#remove_${box_idx}`).disabled = false;

        global_csv.autocompleteMapped(selection, box_idx)

        // attempt to select the next box
        try {
          document.querySelector(`#autoComplete${box_idx + 1}`).focus()
        } catch {
          console.log("No more boxes to select")
        }
        

      },
    });
  }

  for (var box_idx = 0; box_idx < boxes.length; box_idx++) {
    const box = boxes[box_idx];
    const box_id = `autoComplete${box_idx}`;
    box.id = box_id;
    attachAutoComplete(box_id, box_idx);
  }

}


