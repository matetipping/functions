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
}
        
$(function () {
   set_all_matches("R5"); 
});
