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

function main(params) {
    new Promise((resolve, reject) => {
        request(options).then(response => {
            process.stdout.write(response);
            responseJSON = JSON.parse(response);
            resolve();
        });
        try {
            return responseJSON;
        } catch (e) {
            process.stdout.write(e);
            reject(e);  // <-- this also terminates the execution, but reports the failure back to the runtime
        }
    });
    return responseJSON;
}

exports.main = main;
