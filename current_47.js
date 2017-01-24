var tipping_data = {
    round: "R1",
    admin: "Administrator",
    tips: [
	["R1", "Administrator", "CAR", 2, "HAW", 25, 0, 0],
	["R1", "Daniel Terrington", "CAR", 36, "HAW", 34, 0, 0],
	["R1", "ciniboi_12", "RIC", 3, "HAW", 19, 0, 0]
    ],
    fixtures: [
        ["R1", "ciniboi_12", "Daniel Terrington", "Administrator", "Daniel Terrington"],
        ["R2"],
        ["R3"]
    ]
}

// returns array table of all tips from a round.
function find_round_tips(round_no, a_list) {
    var round_chk = "-"; var len = a_list.length; var a_tip = []; var new_list = [];
    for (var i = 0; i < len; i++) {
	round_chk = a_list[i][0];
	a_tip = a_list[i];
	if (round_chk === round_no) {
	    new_list.push(a_tip);
	}
    }
    return new_list;
}

// returns array table of player's tips from all rounds.
function find_player_tips(player_name, a_list) {
    var name_chk = "-"; var len = a_list.length; var a_tip = []; var new_list = [];
    for (var i = 0; i < len; i++) {
	name_chk = a_list[i][1];
	a_tip = a_list[i];
	if (name_chk === player_name) {
	    new_list.push(a_tip);
	}
    }
    return new_list;
}

// returns array of player's tips from given round OR empty array if no tips found.
function find_player_tip_from_round(round_no, player_name, a_list) {
    var round_chk = "-"; var name_chk = "-"; var len = a_list.length; var a_tip = [];
    for (var i = 0; i < len; i++) {
	round_chk = a_list[i][0];
	name_chk = a_list[i][1];
	a_tip = a_list[i];
	if (name_chk === player_name && round_chk === round_no) {
	    return a_tip;
	}
    }
    return [];
}

// returns 
function compare_player_tips(player1, player2, result, game_no, scaling) {
    var player1_team = player1[game_no*2]; var player1_marg = player1[game_no*2 + 1]; var player1_diff = 0; var player1_score = 0;
    var player2_team = player2[game_no*2]; var player2_marg = player2[game_no*2 + 1]; var player2_diff = 0; var player2_score = 0;
    var result_team = result[game_no*2]; var result_marg = result[game_no*2 + 1];

    // gets player 1's difference
    if (result_team === player1_team) {
        player1_diff = Math.abs(player1_marg - result_marg);
    } else {
        player1_diff = player1_marg + result_marg;
    }

    // gets player 2's difference
    if (result_team === player2_team) {
        player2_diff = Math.abs(player2_marg - result_marg);
    } else {
        player2_diff = player2_marg + result_marg;
    }

    // calculates scores without extra scaling
    if (player1_diff > player2_diff) {
        player2_score = player1_diff - player2_diff;
        player1_score = 0;
        if ((player1_team === result_team) && (player2_team !== result_team)) {
            player2_score = player2_score / 2;
        }
        if (player2_diff === 0) {
            player2_score = player2_score * 2;
        }
    } else {
        player1_score = player2_diff - player1_diff;
        player2_score = 0;
        if ((player2_team === result_team) && (player1_team !== result_team)) {
            player1_score = player1_score / 2;
        }
        if (player1_diff === 0) {
            player1_score = player1_score * 2;
        }
    }

    // scales player scores
    player1_score = Math.floor(player1_score * scaling + 0.5);
    player2_score = Math.floor(player2_score * scaling + 0.5);
	
    return player2_score;
}

// returns the player's name
function get_this_player() {
    return $("div#top_info strong a").html ();
}

function get_opponent(player_name, round_no, fixture_full) {
    var round_fix = find_round_tips(round_no, fixture_full);
    var single_fix = round_fix[0];
    var player_chk = "";
    var i;
    var len = single_fix.length;
    for (i = 1; i < len; i++) {
        player_chk = single_fix[i];
	if (player_chk === player_name) {
	    if (i % 2 == 0) {
	        var opponent = single_fix[i - 1];
	    } else {
	        var opponent = single_fix[i + 1];
	    }
	    return opponent;
	}
    }
    return "";
}

$(function () {
    var tip = find_player_tip_from_round("R1", "Daniel Terrington", tipping_data.tips);
    var next = find_player_tip_from_round("R1", "ciniboi_12", tipping_data.tips);
    var admin = find_player_tip_from_round("R1", "Administrator", tipping_data.tips);
    var diff = compare_player_tips(tip, next, admin, 1, 1);
    var me = get_this_player();
    var get_opp = get_opponent(me, "R1", tipping_data.fixtures);
    $("span#score_user").html(diff);
    $("span#score_opponent").html(get_opp);
});
