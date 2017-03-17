function change_scorebreakdowns(direction) {
    var player_name = $("th#playername_a").html();
    var round_no = $("select#tipping_roundno").val();
    var fixture_full = tipping_data.fixtures;
    var i;
    var round_fix = find_round_tips(round_no, fixture_full)[0];
    var len = round_fix.length;
    var player_check = "";
    for (i = 1; i < len; i++) {
        player_check = round_fix[i];
	if (player_check === player_name) {
	    change_breakdown(direction, player_name, round_no, fixture_full);
	    return;
	}
    }
    change_breakdown(direction, round_fix[len - 2], round_no, fixture_full);
}

function change_breakdown(direction, player_name, round_no, fixture_full) {
    var me = get_this_player();
    var i;
    var fixture = find_round_tips(round_no, fixture_full);
    var round_fix = fixture[0];
    var len = round_fix.length;
    var player_chk = "";
    for (i = 1; i < len; i++) {
        player_chk = round_fix[i];
        if (player_chk === player_name) {
	    if (i % 2 == 0) {
	        i--;
	    }
	    if (direction === "backward") {
	        if (i == 1) {
		    var new_player = round_fix[len - 2];
		    var new_opp = round_fix[len - 1];
		} else {
		    var new_player = round_fix[i - 2];
		    var new_opp = round_fix[i - 1];
		}
	    } else {
	        if (i+2 == len) {
		    var new_player = round_fix[1];
		    var new_opp = round_fix[2];
		} else {
		    var new_player = round_fix[i + 2];
		    var new_opp = round_fix[i + 3];
		}
	    }
	    if (new_opp === me) {
	        var temp = new_opp;
		new_opp = new_player;
		new_player = me;
	    }
        }
    }
    set_breakdown(new_player, new_opp);
}

function set_breakdown(me, them) {
    var i;
    var len = afl_data.dates.length;
    var selected_round = $("select#tipping_roundno").val();
    var compare_date;
    var current_date;
    for (i=0; i < len; i++) {
        current_date = afl_data.dates[i];
        if (current_date[0] === selected_round) {
            var compare_date = new Date(current_date[1]);
        }
    }
    var new_date = new Date();

    $("th#playername_a").html(me);
    $("th#playername_b").html(them);

    var player_me = get_this_player();
    var player_tips = find_player_tip_from_round(selected_round, me, tipping_data.tips);

    if (compare_date < new_date) {
        var opponent_tips = find_player_tip_from_round(selected_round, them, tipping_data.tips);
        var results = find_player_tip_from_round(selected_round, tipping_data.admin, tipping_data.tips);

        var total_scores = calculate_scores(me, them, tipping_data.admin, selected_round, tipping_data.tips);
        $("td#totalscore_a").html(total_scores[0]);
        $("td#totalscore_b").html(total_scores[1]);    

        var len = (player_tips.length - 8)/2;
        for(i = 0; i < len; i++) {
            var g_no = i+1;
            $("td#team_" + g_no + "a div.team_block").attr("alt", player_tips[g_no*2].toLowerCase());
            $("td#margin_" + g_no + "a").html(player_tips[g_no*2+1]);
            $("td#team_" + g_no + "b div.team_block").attr("alt", opponent_tips[g_no*2].toLowerCase());
            $("td#margin_" + g_no + "b").html(opponent_tips[g_no*2+1]);
            if (g_no <= (results.length - 8)/2) {
                var comparison = compare_player_tips(player_tips, opponent_tips, results, g_no, 1);
                $("td#score_" + g_no + "a").html(comparison[0]);
                $("td#score_" + g_no + "b").html(comparison[1]);
            }
        }

        $("td#player_1a").html("");
        $("td#player_2a").html("");
        $("td#player_3a").html("");
        $("td#playerscore_1a").html("");
        $("td#playerscore_2a").html("");
        $("td#playerscore_3a").html("");
        $("td#player_1b").html("");
        $("td#player_2b").html("");
        $("td#player_3b").html("");
        $("td#playerscore_1b").html("");
        $("td#playerscore_2b").html("");
        $("td#playerscore_3b").html("");

        len = player_tips.length;
        if (player_tips[len - 6].length > 0) {
            $("td#player_1a").html("D: " + player_tips[len - 6]);
        }
        if (typeof player_tips[len - 5] === "number") {
            $("td#playerscore_1a").html(player_tips[len - 5]);
        }
        if (player_tips[len - 4].length > 0) {
            $("td#player_2a").html("D: " + player_tips[len - 4]);
        }
        if (typeof player_tips[len - 3] === "number") {
            $("td#playerscore_2a").html(player_tips[len - 3]);
        }
        if (player_tips[len - 2].length > 0) {
            $("td#player_3a").html("N: " + player_tips[len - 2]);
        }
        if (typeof player_tips[len - 1] === "number") {
            $("td#playerscore_3a").html(player_tips[len - 1]);
        }    
        len = opponent_tips.length;
        if (opponent_tips[len - 6].length > 0) {
            $("td#player_1b").html("D: " + opponent_tips[len - 6]);
        }
        if (typeof opponent_tips[len - 5] === "number") {
            $("td#playerscore_1b").html(opponent_tips[len - 5]);
        }
        if (opponent_tips[len - 4].length > 0) {
            $("td#player_2b").html("S: " + opponent_tips[len - 4]);
        }
        if (typeof opponent_tips[len - 3] === "number") {
            $("td#playerscore_2b").html(opponent_tips[len - 3]);
        }
        if (opponent_tips[len - 2].length > 0) {
            $("td#player_3b").html("N: " + opponent_tips[len - 2]);
        }
        if (typeof opponent_tips[len - 1] === "number") {
            $("td#playerscore_3b").html(opponent_tips[len - 1]);
        }
    } else if (player_me === me) {
        var len = (player_tips.length - 8)/2;
        for(i = 0; i < len; i++) {
            var g_no = i+1;
            $("td#team_" + g_no + "a div.team_block").attr("alt", player_tips[g_no*2].toLowerCase());
            $("td#margin_" + g_no + "a").html(player_tips[g_no*2+1]);
        }
            
        $("td#player_1a").html("");
        $("td#player_2a").html("");
        $("td#player_3a").html("");
        $("td#playerscore_1a").html("");
        $("td#playerscore_2a").html("");
        $("td#playerscore_3a").html("");

        len = player_tips.length;
        if (player_tips[len - 6].length > 0) {
            $("td#player_1a").html("D: " + player_tips[len - 6]);
        }
        if (player_tips[len - 4].length > 0) {
            $("td#player_2a").html("D: " + player_tips[len - 4]);
        }
        if (player_tips[len - 2].length > 0) {
            $("td#player_3a").html("N: " + player_tips[len - 2]);
        }
    }
}

$(function () {
    var me = get_this_player();
    var them = get_opponent(me, tipping_data.round, tipping_data.fixtures);
    var round_fix = find_round_tips(tipping_data.round, tipping_data.fixtures)[0];
    var len = round_fix.length;
    var player_check = "";
    var found = 0;
    for (i = 1; i < len; i++) {
        player_check = round_fix[i];
	if (player_check === me) {
	    found = 1;
	}
    }
    if (found == 0) {
        me = round_fix[1];
        them = round_fix[2];
    }

    set_breakdown(me, them);
});
