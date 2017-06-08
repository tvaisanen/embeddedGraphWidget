/**
 * Created by toni on 8.6.2017.
 */

function assert(outcome, description) {
    if (outcome) {
        console.log("%cPASS: " + "%c" + description, "color: green; font-size:15px;", "color: blac; font-size:14px;");
    } else {
        console.log("%cFAIL: " + "%c" + description, "color: red; font-size:15px;", "color: blac; font-size:14px;");
    }
    return outcome
}