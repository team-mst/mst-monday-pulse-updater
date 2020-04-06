import * as core from '@actions/core';

// names of the input parameters
const INPUT_MONDAY_API_KEY = 'monday-api-key';
const INPUT_MONDAY_PULSE_ID = 'monday-pulse-id';
const INPUT_MONDAY_UPDATE_TEXT = 'monday-update-text';

// names of the output parameters
const OUTPUT_MONDAY_UPDATE_ID = 'monday-update-id';

// general constant
const MONDAY_URL = 'https://api.monday.com/v2/'

function run() {
    try {
        const mondayPulseID = core.getInput(INPUT_MONDAY_PULSE_ID);
        const mondayUpdateText = core.getInput(INPUT_MONDAY_UPDATE_TEXT);

        var unirest = require('unirest');
        // prepeare data for the request and send the request
        var req = unirest('POST', MONDAY_URL)
            .headers({
                'Authorization': core.getInput(INPUT_MONDAY_API_KEY),
                'Content-Type': 'application/json'
            })
            .send(JSON.stringify({
                query: `mutation {create_update (item_id: ${mondayPulseID}, body: "${mondayUpdateText}") {id} }`
            }))
            .end(function (res: any) { 
                if (res.error) throw new Error(res.error);
                // in case monday.com returns errors
                // these errors will be in the body of the response
                // and this is checked here and in case that the response
                // does have errors here will be set that action is failed
                if (res.body.errors) {
                    core.setFailed(res.body.errors);
                    return;
                }
                // set value to the output parameter
                core.setOutput(OUTPUT_MONDAY_UPDATE_ID, res.body.data.create_update.id);
            });
    } catch(exception) {
        core.setFailed(exception);
    }
}

run();