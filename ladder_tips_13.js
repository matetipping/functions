var ladder_data = {
    tips: [
        ["Administrator", "GWS", "WBD", "SYD", "ADE", "GEE", "HAW", "MEL", "STK", "WCE", "CAR", "PTA", "ESS", "COL", "RIC", "GCS", "NTH", "FRE", "BRI"],
        []
    ]
}

function swap_teams(idA, idB) {
    if ($("span#ladderimg_" + idA + " div.team_block").is('[id]')) {
        var tempA = $("span#ladderimg_" + idA + " div.team_block").attr("id");
        remove_team(tempA);
    } else {
        var tempA = "";
    }
    if ($("span#ladderimg_" + idB + " div.team_block").is('[id]')) {
        var tempB = $("span#ladderimg_" + idB + " div.team_block").attr("id");
        remove_team(tempB);
    } else {
        var tempB = "";
    }
    $("span#ladderimg_" + idA + " div.team_block").attr("id", tempB);
    $("span#ladderimg_" + idB + " div.team_block").attr("id", tempA);
    $("select#ladder_team_" + idA).val(tempB.toUpperCase());
    $("select#ladder_team_" + idB).val(tempA.toUpperCase());
}

function show_remaining() {
    var i;
    $("td.remaining_teams div.team_block").each() {
        $(this).show();
    };
    for (i = 0; i < 18; i++) {
        var img_id = $("select#ladder_team_" + i).val().toLowerCase();
        $("span#ladderimg_" + i + " div.team_block").removeAttr("id");
    }
}

function set_image(id, value) {
    var low_val = value.toLowerCase();
    $("span#ladderimg_" + id + " div.team_block").attr("id", low_val);
}

function remove_team(value) {
    var low_val = value.toLowerCase();
    var i;
    for (i = 0; i < 18; i++) {
         var img_id = $("span#ladderimg_" + i + " div.team_block").attr("id");
         if (img_id === low_val) {
             $("span#ladderimg_" + i + " div.team_block").removeAttr("id");
             $("select#ladder_team_" + i).val("");
         }
    }
}

function show_submit() {
    var i;
    var noComplete = 0;
    for (i = 0; i < 18; i++) {
        var position_val = $("select#ladder_team_" + i).val();
        if (position_val !== "") {
            noComplete++;
        }
    }
    if (noComplete == 18) {
        document.getElementById("btn_ladderform").style.display = "inline-block";
    } else {
        document.getElementById("btn_ladderform").style.display = "none";
    }
}