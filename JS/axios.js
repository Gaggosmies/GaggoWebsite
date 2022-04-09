var APIurl = 'https://sheetdb.io/api/v1/vehbaa8eppm85';
const date = new Date();
var dateNow = date.getFullYear().toString() + "/" + ('0' + (date.getMonth() + 1)).slice(-2).toString() + "/" + ('0' + date.getDate()).slice(-2).toString() + "-" + date.getHours().toString() + ':' + date.getMinutes().toString();

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

// axios.patch(APIurl + '/ID/1', {
//     "data": {
//         "Status": "Not done"
//     }
// }).then(response => {
//     console.log(response.data);
// });

// axios.delete(APIurl + '/ID/2')
//     .then(response => {
//         console.log(response.data);
//     });
