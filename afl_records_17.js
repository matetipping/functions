var afl_data = {
    fixtures: [
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
        ["R2", "PTA", "FRE", "AO - Sunday, April 2 - 4:10 PM"],
        ["R3", "SYD", "COL", "SCG - Friday, April 7 - 7:50 PM"],
        ["R3", "NTH", "GWS", "BA - Saturday, April 8 - 1:45 PM"],
        ["R3", "RIC", "WCE", "MCG - Saturday, April 8 - 2:10 PM"],
        ["R3", "GEE", "MEL", "ES - Saturday, April 8 - 4:35 PM"],
        ["R3", "PTA", "ADE", "AO - Saturday, April 8 - 7:10 PM"],
        ["R3", "FRE", "WBD", "DS - Saturday, April 8 - 5:40 PM"],
        ["R3", "STK", "BRI", "ES - Sunday, April 9 - 1:10 PM"],
        ["R3", "CAR", "ESS", "MCG - Sunday, April 9 - 3:20 PM"],
        ["R3", "GCS", "HAW", "MS - Sunday, April 9 - 4:40 PM"],
        ["R4", "WCE", "SYD", "DS - Thursday, April 13 - 6:10 PM"],
        ["R4", "NTH", "WBD", "ES - Friday, April 14 - 4:20 PM"],
        ["R4", "MEL", "FRE", "MCG - Saturday, April 15 - 1:45 PM"],
        ["R4", "GWS", "PTA", "MO - Saturday, April 15 - 4:35 PM"],
        ["R4", "CAR", "GCS", "ES - Saturday, April 15 - 7:25 PM"],
        ["R4", "ADE", "ESS", "AO - Saturday, April 15 - 7:10 PM"],
        ["R4", "COL", "STK", "ES - Sunday, April 16 - 3:20 PM"],
        ["R4", "BRI", "RIC", "G - Sunday, April 16 - 4:40 PM"],
        ["R4", "HAW", "GEE", "MCG - Monday, April 17 - 3:20 PM"],
        ["R5", "PTA", "CAR", "AO - Friday, April 21 - 7:20 PM"],
        ["R5", "WBD", "BRI", "ES - Saturday, April 22 - 1:45 PM"],
        ["R5", "GCS", "ADE", "MS - Saturday, April 22 - 4:35 PM"],
        ["R5", "SYD", "GWS", "SCG - Saturday, April 22 - 7:25 PM"],
        ["R5", "FRE", "NTH", "DS - Saturday, April 22 - 5:40 PM"],
        ["R5", "STK", "GEE", "ES - Sunday, April 23 - 3:20 PM"],
        ["R5", "HAW", "WCE", "MCG - Sunday, April 23 - 4:40 PM"],
        ["R5", "RIC", "MEL", "MCG - Monday, April 24 - 7:25 PM"],
        ["R5", "ESS", "COL", "MCG - Tuesday, April 25 - 3:20 PM"],
        ["R6", "GWS", "WBD", "MO - Friday, April 28 - 7:50 PM"],
        ["R6", "HAW", "STK", "US - Saturday, April 29 - 1:45 PM"],
        ["R6", "CAR", "SYD", "MCG - Saturday, April 29 - 2:10 PM"],
        ["R6", "BRI", "PTA", "G - Saturday, April 29 - 4:35 PM"],
        ["R6", "NTH", "GCS", "ES - Saturday, April 29 - 7:25 PM"],
        ["R6", "WCE", "FRE", "DS - Saturday, April 29 - 6:10 PM"],
        ["R6", "ESS", "MEL", "ES - Sunday, April 30 - 1:10 PM"],
        ["R6", "GEE", "COL", "MCG - Sunday, April 30 - 3:20 PM"],
        ["R6", "ADE", "RIC", "AO - Sunday, April 30 - 4:10 PM"],
    ]
}

function set_match(i, match_dets) {
    var team_a = match_dets[1];
    var team_b = match_dets[2];
    var low_a = team_a.toLowerCase();
    var low_b = team_b.toLowerCase();
    var long_a = to_longname(team_a);
    var long_b = to_longname(team_b);
    var venue = match_dets[3];
    $("h3#tipping_matchname_" + i).html(team_a + " v " + team_b);
    $("h3#tipping_venue_" + i).html(venue);
    $("option#tipping_teama_" + i).html(long_a);
    $("option#tipping_teamb_" + i).html(long_b);
    $("option#tipping_teama_" + i).val(team_a);
    $("option#tipping_teamb_" + i).val(team_b);
    $("span#tipping_imagea_" + i + " div.team_block").attr("id", low_a);
    $("span#tipping_imageb_" + i + " div.team_block").attr("id", low_b);
}

function to_longname(shortname) {
    var longname = "";
    switch(shortname) {
        case "ADE":
            longname = "Adelaide Crows";
            break;
        case "BRI":
            longname = "Brisbane Lions";
            break;
        case "CAR":
            longname = "Carlton Blues";
            break;
        case "COL":
            longname = "Collingwood Magpies";
            break;
        case "ESS":
            longname = "Essendon Bombers";
            break;
        case "FRE":
            longname = "Fremantle Dockers";
            break;
        case "GEE":
            longname = "Geelong Cats";
            break;
        case "GCS":
            longname = "Gold Coast Suns";
            break;
        case "GWS":
            longname = "GWS Giants";
            break;
        case "HAW":
            longname = "Hawthorn Hawks";
            break;
        case "MEL":
            longname = "Melbourne Demons";
            break;
        case "NTH":
            longname = "North Melbourne";
            break;
        case "PTA":
            longname = "Port Adelaide Power";
            break;
        case "RIC":
            longname = "Richmond Tigers";
            break;
        case "STK":
            longname = "St Kilda Saints";
            break;
        case "SYD":
            longname = "Sydney Swans";
            break;
        case "WCE":
            longname = "West Coast Eagles";
            break;
        default:
            longname = "Western Bulldogs";
    }
    return longname;
}

function set_all_matches(round_no) {
    var round_title = "";
    var is_r = round_no.indexOf("R");
    var is_b = round_no.indexOf("B");
    if (is_r == 0) {
        round_title = "Round ";
        var round_number = round_no.substring(1);
        var round_title = round_title.concat(round_number);
    } else if (is_b == 0) {
        round_title = "Bye Round ";
        var round_number = round_no.substring(1);
        var round_title = round_title.concat(round_number);
    } else if (round_no === "F1") {
        round_title = "Qualifying/Elimination Final";
    } else if (round_no === "F2") {
        round_title = "Semi-Final";
    } else if (round_no === "F3") {
        round_title = "Preliminary Final";
    } else {
        round_title = "Grand Final";
    }
    round_title = round_title.concat(" Tipping");
    
    $("h2#tipping_roundtitle").html(round_title);
    $("input#tipping_roundname").val(round_title);
    $("input#tipping_roundnum").val(round_no);
    
    var fixtures = find_round_tips(round_no, afl_data.fixtures);
    var i;
    var len = fixtures.length;
    for (i = 0; i < len; i++) {
        set_match(i, fixtures[i]);
    }
}
        
$(function () {
    $("select#tipping_roundselector").val(tipping_data.round);
    set_all_matches(tipping_data.round)
});
