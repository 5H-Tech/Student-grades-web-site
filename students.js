function RegisterStudent() {
    var vUsername = document.getElementById('username').value.trim();
    var vId = document.getElementById('id').value.trim();
    var vPassword = document.getElementById('password').value.trim();
    var val;
    var info;
    var buildVal;

    if (vUsername == '' || vId == '' || vPassword == '') {
        alert("Please enter values");
        return;
    }


    val = localStorage.getItem(vId);

    if (val == null) {
        info = localStorage.getItem("logins");
        buildVal = buildone(vUsername, vId, false);
        if (info == null) {
            val = '{';
            val += buildVal;
            val += '}';
        } else
            val = info.replace("}", "," + buildVal + "}");

        localStorage.setItem("logins", val);

        val = '{';
        val += buildone("username", vUsername, true);
        val += buildone("password", vPassword, false);
        val += '}';
        localStorage.setItem(vId, val);
        alert("You have registered successfully");
    } else
        alert("user exists");
}

/////////////////////////////////////////////////////////////////////////////

function LoginStudent() {
    var val;
    var vUsername = document.getElementById('username').value.trim();
    var vId;
    var vPassword = document.getElementById('password').value.trim();

    if (vUsername == '' || vPassword == '') {
        alert("Please enter values");
        return;
    }

    val = localStorage.getItem("logins");
    val = JSON.parse(val);

    vId = val[vUsername];

    if (vId == null) {
        alert("Username doesn't exist");
        return;
    } else {
        val = localStorage.getItem(vId);
        val = JSON.parse(val);
        if (val["password"] != vPassword) {
            alert("Incorrect password");
            return;
        } else {


            localStorage.setItem("currentid", vId);
            localStorage.setItem("currentusername", vUsername);
            window.location.href = 'StudentPage.html';

        }
    }


}

/////////////////////////////////////////////////////////////////////////////

function SaveStudentMarks() {
    var val = '';
    var info;
    var sub = ["english", "physics", "psychology", "calculus", "intro", "probability", "electronics"];
    var vId = document.getElementById('id').value.trim();

    if (vId == '') {
        alert("Please enter student ID");
        return;
    }



    for (i = 0; i < sub.length; i++)
        val = buildwithid(val, sub[i], i < sub.length - 1);

    info = localStorage.getItem(vId);
    val = info.replace("}", "," + val + "}");
    localStorage.setItem(vId, val);
    alert("The student's marks have been saved");
}


/////////////////////////////////////////////////////////////////////////////

function GetStudentMarks() {
    var val;
    var id;
    var username;
    var sub = ["english", "physics", "psychology", "calculus", "intro", "probability", "electronics"];

    id = localStorage.getItem("currentid");
    username = localStorage.getItem("currentusername");

    val = localStorage.getItem(id);
    val = JSON.parse(val);
    var gpa = 0;


    for (i = 0; i < sub.length; i++) {

        document.getElementById(sub[i]).innerHTML = val[sub[i]] + "/50";
        gpa = gpa + (((val[sub[i]] / 1) * 100) / 350)
    }
    document.getElementById('id').innerHTML = id;
    document.getElementById('username').innerHTML = username;

    document.getElementById('gpa').innerHTML = gpa.toFixed(2) + "%";
}
/////////////////////////////////////////////////////////////////////////////

function buildwithid(all, key, com) {
    all += buildone(key, document.getElementById(key).value, com);

    return all;
}

/////////////////////////////////////////////////////////////////////////////

function buildone(key, val, com) {
    var v;

    v = '"';
    v += key;
    v += '"';
    v += ':';
    v += '"';
    v += val;
    v += '"';

    if (com)
        v += ',';
    return v;
}

function validmarks() {
    var vId = document.getElementById('id').value.trim();
    var idpatt;
    idpatt = /^\d+$/;
    var idb = idpatt.test(vId);
    if (idb == true) {
        var ven = document.getElementById('english').value.trim();
        var vph = document.getElementById('physics').value.trim();
        var vps = document.getElementById('psychology').value.trim();
        var vca = document.getElementById('calculus').value.trim();
        var vin = document.getElementById('intro').value.trim();
        var vpr = document.getElementById('probability').value.trim();
        var vel = document.getElementById('electronics').value.trim();
        var markpatt;
        markpatt = /^[0.0-9.0]+$/;
        var markb;
        var marks = [ven, vph, vps, vca, vin, vpr, vel];
        for (i = 0; i < 7; i++) {
            markb = markpatt.test(marks[i])


            if (markb == false) {
                alert("please enter a valid mark");
                return;
            } else if (marks[i] > 50) {
                alert("please enter a mark that is less than or equal to 50  ");
                return;
            }





        }
        SaveStudentMarks();
    } else if (idb == false) {
        alert("please enter a valid ID ");
        return;
    }

}
////////////////////////////////////////////////////////

var slideIndex = 0;

function moving() {
    var i;
    var slides = document.getElementsByClassName("Slides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(moving, 2000);
}