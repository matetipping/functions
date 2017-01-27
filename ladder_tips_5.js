var ladder_data = {
    tips: [
        ["Administrator", "GWS", "WBD", "SYD", "ADE", "GEE", "HAW", "MEL", "STK", "WCE", "CAR", "PTA", "ESS", "COL", "RIC", "GCS", "NTH", "FRE", "BRI"],
        []
    ]
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
