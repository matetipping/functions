var afl_data = {
    fixtures = [
        ["R1", "CAR", "RIC", "MCG - Thursday, March 23 - 7:20 PM"],
        ["R1", "COL", "WBD", "MCG - Friday, March 24 - 7:50 PM"],
        ["R1", "STK", "MEL", "ES - Saturday, March 25 - 4:35 PM"],
        ["R1", "SYD", "PTA", "SCG - Saturday, March 25 - 4:35 PM"],
        ["R1", "GCS", "BRI", "MS - Saturday, March 25 - 6:25 PM"],
        ["R1", "ESS", "HAW", "MCG - Saturday, March 25 - 7:25 PM"],
        ["R1", "NTH", "WCE", "ES - Sunday, March 26 - 1:10 PM"],
        ["R1", "ADE", "GWS", "AO - Sunday, March 26 - 2:50 PM"],
        ["R1", "FRE", "GEE", "DS - Sunday, March 26 - 4:40 PM"],
        ["R2", "RIC", "COL", "MCG - Thursday, March 30 - 7:20 PM"],
        ["R2", "WBD", "SYD", "MCG - Friday, March 31 - 7:50 PM"],
        ["R2", "HAW", "ADE", "MCG - Saturday, April 1 - 1:45 PM"],
        ["R2", "GWS", "GCS", "SPO - Saturday, April 1 - 4:35 PM"],
        ["R2", "BRI", "ESS", "G - Saturday, April 1 - 6:25 PM"],
        ["R2", "WCE", "STK", "DS - Saturday, April 1 - 4:40 PM"],
        ["R2", "GEE", "NTH", "ES - Sunday, April 2 - 1:10 PM"],
        ["R2", "MEL", "CAR", "MCG - Sunday, April 2 - 3:20 PM"],
        ["R2", "PTA", "FRE", "AO - Sunday, April 2 - 4:10 PM"]
    ]
}

function set_match(i, match_details) {
    var round_no = tipping_data.round;
    
}

function set_all_matches(round_no) {
    var round_title = "";
    var is_r = round_no.indexOf("R");
    var is_b = round_no.indexOf("B");
    if (is_r == 0) {
        round_title = "Round ";
        var round_number = round_no.substring(1);
        var round_title = round_title + round_number;
    } else if (is_b == 0) {
        round_title = "Bye Round ";
        var round_number = round_no.substring(1);
        var round_title = round_title + round_number;
    } else if (round_no === "F1") {
        round_title = "Qualifying/Elimination Final";
    } else if (round_no === "F2") {
        round_title = "Semi-Final";
    } else if (round_no === "F3") {
        round_title = "Preliminary Final";
    } else {
        round_title = "Grand Final";
    }
    round_title = round_title + " Tipping";
    
    $("h2#tipping_roundtitle").html(round_title);
}
        
$(function () {
   set_all_matches("R2"); 
});
