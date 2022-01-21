const request = require('request-promise');

var options = {
    uri: '<INSERT YOUR CLOUDANT URL/doc_id>',
    port: 443,
    // authentication headers
    headers: {
        'Authorization': 'Basic ' + Buffer.from('<INSERT YOUR CLOUDANT API KEY>' + ':' + '<INSERT YOUR CLOUDANT PASSWORD>').toString('base64')
    }
};

var responseJSON = {};

function myDisplayer(responseJSON) {
    //return responseJSON;
    if (responseJSON.message != "") {
        return responseJSON;
    }
    else {
        return { message: "false" };
    }
}

function getOdmAnswer(myCallback) {
    request(options).then(response => {
        process.stdout.write(response);
        responseJSON = JSON.parse(response);
    });
    if (responseJSON.message != "") {
        return myCallback(responseJSON);
    }
}

function main(params) {
    if (getOdmAnswer(myDisplayer) == undefined || Object.keys(getOdmAnswer(myDisplayer)).length == 0) {
        return { message: "false" };
    }
    else {
        return getOdmAnswer(myDisplayer);
    }
}

exports.main = main;
