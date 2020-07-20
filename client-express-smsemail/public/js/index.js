
var url = "http://localhost:3000/api";

var txtEmailTo = document.getElementById("txtEmailTo");
var txtEmailSubj = document.getElementById("txtEmailSubj");
var txtEmailBody = document.getElementById("txtEmailBody");

var txtSmsTo = document.getElementById("txtSmsTo");
var txtSmsBody = document.getElementById("txtSmsBody");

/*-----------------------------FUNCIONES DISPLAY------------------------------------*/
var optSms = () =>{
    document.getElementById("crdSms").className = "sms";
    document.getElementById("crdEmail").className = "email d-none";

    document.getElementById("optSms").className = "nav-link active";
    document.getElementById("optEmail").className = "nav-link";
    
    clearSmsBox();
}

var optEmail = () =>{
    document.getElementById("crdSms").className = "sms d-none";
    document.getElementById("crdEmail").className = "email";

    document.getElementById("optSms").className = "nav-link";
    document.getElementById("optEmail").className = "nav-link active";
    
    clearEmailBox();
}


/*-----------------------------FUNCIONES EMAIL------------------------------------*/
var sendEmail = () => {

    var Email = {
        To: txtEmailTo.value,
        Subject: txtEmailSubj.value,
        Body: txtEmailBody.value
    };

    fetch(url + "/SendMail", {
        method: "POST",
        headers : {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(Email)
    }).then((result) => {
        return result.json();

    }).then((data) => {
        alert(data);
        clearEmailBox();

    }).catch((err) => {
        console.log(err);

    });
}

/*-----------------------------FUNCIONES SMS------------------------------------*/
var sendSms = () => {
    var sms = {
        To: txtSmsTo.value,
        Body: txtSmsBody.value,
    }

    fetch(url + "/SendSms", {
        method: "POST",
        headers : {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(sms)

    }).then((result) => {
        return result.json();

    }).then((data) => {
        alert(data);
        clearSmsBox();

    }).catch((err) => {
        console.log(err);

    })
}

/*-----------------------------FUNCIONES CLEAR------------------------------------*/

var clearEmailBox = () =>{
    txtEmailTo.value = "";
    txtEmailSubj.value = "";
    txtEmailBody.value = ""
}

var clearSmsBox = () =>{
    txtSmsTo.value = "";
    txtSmsBody.value = "";
}
