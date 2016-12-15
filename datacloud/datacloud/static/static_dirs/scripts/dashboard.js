function viewDetails(std) {
    //console.log(std);
    document.getElementById("stdName").innerHTML = std.name;
    document.getElementById("stdBatch").innerHTML = (std.batch)[0];
    document.getElementById("stdContact").innerHTML = std.contact;
    document.getElementById("stdFather").innerHTML = std.father;
    document.getElementById("stdMother").innerHTML = std.mother;
    document.getElementById("stdAge").innerHTML = std.age;
    document.getElementById("stdGender").innerHTML = std.gender;
    document.getElementById("stdAddress").innerHTML = std.address;

    document.getElementById("student"+std.id).style = "background-color:rgb(9, 78, 140)";
    if (highlightedSTD != null && highlightedSTD != std.id) {
        document.getElementById("student" + highlightedSTD).style = "";
    }
    highlightedSTD = std.id;
    // create the update and delete buttons
    btnHTML = "<button class='muli btn btn-success' data-toggle='modal' data-target='#updateStudent'>UPDATE INFO</button> <a href='/services/stddelete?sid=" + std.id + "&bid=" + std.batch + "'><button class='muli pull-right btn btn-danger'>DEREGISTER</button></a>"
    document.getElementById("udbuttons").innerHTML = btnHTML;
    // fill up the update form
    document.getElementById("uid").value = std.id;
    document.getElementById("uname").value = std.name;
    document.getElementById("ufather").value = std.father;
    document.getElementById("umother").value = std.mother;
    document.getElementById("uage").value = std.age;
    document.getElementById("uaddress").value = std.address;
    document.getElementById("ucontact").value = std.contact;

    var genderDropdown = document.getElementById("ugender");
    for (var i = 0; i < genderDropdown.options.length; i++) {
        var option = genderDropdown.options[i];
        if (option.value == std.gender) {
            option.selected = true;
        } else {
            option.selected = false;
        }
    }

    var batchDropdown = document.getElementById("ubatch");
    for (var i = 0; i < batchDropdown.options.length; i++) {
        var option = batchDropdown.options[i];
        if (option.value == std.batch) {
            option.selected = true;
        } else {
            option.selected = false;
        }
    }

}

function getStudents(batchName) {
    //console.log(batchName)
    endpoint = "/services/api?batch=" + batchName;
    document.getElementById("stdlistname").innerText = "STUDENTS IN " + batchName.toUpperCase();
    document.getElementById(batchName).style = "background-color:#666";
    if (highlightedBatch != null) {
        document.getElementById(highlightedBatch).style = "";
    }
    highlightedBatch = batchName;
    highlightedSTD = null;

    var batchDropdown = document.getElementById("ubatch1");
    for (var i = 0; i < batchDropdown.options.length; i++) {
        var option = batchDropdown.options[i];
        if (option.value == batchName) {
            option.selected = true;
        } else {
            option.selected = false;
        }
    }

    // get the data 
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            //console.log(this.responseText);
            students = (JSON.parse(this.responseText)).response;
            //console.log(students);
            if (students.length > 0) {
                $("#studentDetails").show()
                html = "";
                for (i = 0; i < students.length; i++) {
                    html += "<div class='row student' id='student" + students[i].id + "' onclick='viewDetails(" + JSON.stringify(students[i]) + ")'>" + students[i].name + "</div>"; 
                    //console.log(students[i].name);
                }
                //console.log(html);
                document.getElementById("studentList").innerHTML = html;
                viewDetails(students[0]);
            } else {
                document.getElementById("studentList").innerHTML = "";
                $("#studentDetails").hide();
            }
        }
    });
    xhr.open("GET", endpoint);
    xhr.send(data);               
}

function getBatches() {
    endpoint = "/services/getBatchNames"
    // get the data 
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            batches = (JSON.parse(this.responseText)).response;
            //console.log(students);
            html = ""; ddhtml = "";
            for (i = 0; i < batches.length; i++) {
                html += "<div class='row batch' id='" + batches[i] + "' onclick='getStudents(\"" + batches[i] + "\")'>" + batches[i] + "</div>"; 
                ddhtml += "<option>" + batches[i] + "</option>"
                //console.log(students[i].name);
            }
            //console.log(html);
            document.getElementById("batchListCol").innerHTML = html;
            document.getElementById("ubatch1").innerHTML = ddhtml;
            document.getElementById("ubatch").innerHTML = ddhtml;
            console.log("sent batch is " + sentBatch)
            if (sentBatch !=  null && sentBatch != "") {
                console.log("doing getStudents for " + sentBatch);
                getStudents(sentBatch); 
            } else {
                console.log("doing getStudents for else");
                if (batches.length > 0) {
                    getStudents(batches[0]);
                }
            }
        }
    });
    xhr.open("GET", endpoint);
    xhr.send(data);    
}

getBatches();