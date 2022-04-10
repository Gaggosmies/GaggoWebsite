var APIurl = 'https://sheetdb.io/api/v1/vehbaa8eppm85';


function GetFinishedCommissions() {
    axios.get(APIurl + '/search?Status=Done')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // Always executed
        });
}

function PostFinishedOrder() {
    const date = new Date();
    var dateNow = date.getFullYear().toString() + "/" + ('0' + (date.getMonth() + 1)).slice(-2).toString() + "/" + ('0' + date.getDate()).slice(-2).toString() + "-" + ('0' + date.getHours()).slice(-2).toString() + ':' + ('0' + date.getMinutes()).slice(-2).toString();
    
    axios.post(APIurl, {
        "data": {
            "ID": 1,
            "Username": "Gaggotest",
            "Quality": "Shaded",
            "Character Quantity": "Bad",
            "Background": "Lfol",
            "Price": 0,
            "Date": dateNow,
            "Status": "Done"
        }
    }).then(response => {
        console.log(response.data);
    });
}

function PatchToComplete() {
    axios.patch(APIurl + '/ID/1', {
        "data": {
            "Status": "Done"
        }
    }).then(response => {
        console.log(response.data);
    });

}

function DeleteCertain() {
    axios.delete(APIurl + '/ID/2')
        .then(response => {
            console.log(response.data);
        });
}
