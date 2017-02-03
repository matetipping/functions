var ladder_data = {
    tips: [
        ["Administrator", "GWS", "WBD", "SYD", "ADE", "GEE", "HAW", "MEL", "STK", "WCE", "CAR", "PTA", "ESS", "COL", "RIC", "GCS", "NTH", "FRE", "BRI"],
        []
    ]
}

function get_ladder_tips(round_no, name) {
    var tips = ladder_data.tips;
    var fixtures = afl_data.fixtures;
    var round_fixtures = find_round_tips(round_no, fixtures);
    var results = find_player_tip_from_round(round_no, tipping_data.admin, tipping_data.tips);
    var i;
    var len = tips.length;
    
    for (i = 0; i < len; i++) {
        if (tips[i][0] === name) {
            var ladder_tips = tips[i];
            i = len;
        }
    }
    
    var return_tips = [round_no, name];
    var scale_factor = 3;
    
    for (i = 0; i < 9; i++) {
        var first_team = round_fixtures[i][1];
        var second_team = round_fixtures[i][2];
        var first_pos = ladder_tips.indexOf(first_team);
        var second_pos = ladder_tips.indexOf(second_team);
        var diff = Math.abs(first_pos - second_pos);
        var margin = diff*scale_factor;
        if (first_pos > second_pos) {
            var winning_team = second_pos;
        } else {
            var winning_team = first_pos;
        }
        
        return_tips.push(winning_team);
        return_tips.push(scale_factor);
    }
    
    return_tips.push(0);
    return_tips.push(0);
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

function show_remaining_teams() {
    $("div.team_block[alt]").each(function() {
        $(this).show();
    });
    var i;
    for (i = 0; i < 18; i++) {
         var img_id = $("span#ladderimg_" + i + " div.team_block").attr("id");
         $("div.team_block[alt='" + img_id + "']").hide();
    }
}

function set_next_free(team_id) {
    var i;
    for (i = 0; i < 18; i++) {
        var position_val = $("select#ladder_team_" + i).val();
        if (position_val === "") {
            $("select#ladder_team_" + i).val(team_id.toUpperCase());
            $("span#ladderimg_" + i + " div.team_block").attr("id", team_id);
            show_submit();
            show_remaining_teams();
            return;
        }
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

function ladder_change(id, value) {
    remove_team(value);
    set_image(id, value);
    show_submit();
    show_remaining_teams();
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
