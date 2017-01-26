var tipping_data = {
    round: "R1",
    admin: "Administrator",
    tips: [
	["R1", "Administrator", "CAR", 2, "", ""],
	["R1", "Daniel Terrington", "CAR", 36, "HAW", 34, "", 23],
	["R1", "ciniboi_12", "RIC", 3, "HAW", 19, "DNT", 5]
    ],
    fixtures: [
        ["R1", "ciniboi_12", "Daniel Terrington", "Administrator", "Daniel Terrington", "ciniboi_12", "Daniel Terrington"],
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
    var scores = [player1_score, player2_score];
    return scores;
}

// returns the player's name
function get_this_player() {
    return $("div#top_info strong a").html ();
}

// returns the name of a given player's opponent in a round
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

function calculate_scores(player_name, opponent, results_name, round_no, tips_full) {
    var player_tips = find_player_tip_from_round(round_no, player_name, tips_full);
    var opponent_tips = find_player_tip_from_round(round_no, opponent, tips_full);
    var results = find_player_tip_from_round(round_no, results_name, tips_full);
    var round_length = (results.length - 4)/2;
    
    // checks if player tipped bonus tips and adds to score.
    if (typeof player_tips[player_tips.length - 2] === "number") {
        var player_total = player_tips[player_tips.length - 2];
    } else {
        var player_total = 0;
    }
    if (typeof player_tips[player_tips.length - 1] === "number") {
        player_total = player_total + player_tips[player_tips.length - 1];
    }

    // checks if opponent tipped bonus tips and adds to score.
    if (typeof opponent_tips[opponent_tips.length - 2] === "number") {
        var opponent_total = opponent_tips[opponent_tips.length - 2];
    } else {
        var opponent_total = 0;
    }
    if (typeof opponent_tips[opponent_tips.length - 1] === "number") {
        opponent_total = opponent_total + opponent_tips[opponent_tips.length - 1];
    }
    
    var comparison = [];
    var i;
    for (i = 1; i <= round_length; i++) {
        comparison = compare_player_tips(player_tips, opponent_tips, results, i, 1);
        player_total = player_total + comparison[0];
        opponent_total = opponent_total + comparison[1];
    }
    var tip_scores = [player_total, opponent_total];
    return tip_scores;
}

function set_scores(player_name, opponent_name) {
    var scores = calculate_scores(player_name, opponent_name, tipping_data.admin, tipping_data.round, tipping_data.tips);
    var score_player = scores[0];
    var score_opponent = scores[1];
    $("span#score_user").html(score_player);
    $("span#score_opponent").html(score_opponent);
}

function set_names(player_name, opponent_name) {
    $("span#name_user").html(player_name);
    $("span#name_opponent").html(opponent_name);
}

function change_match(direction) {
    var current_player = $("span#name_user").html();
    var me = get_this_player();
    var i;
    var len = tipping_data.fixtures.length;
    for (i = 1; i < len; i++) {
        if (tipping_data.fixtures.length[i] === current_player) {
	    if (i%2 == 0) {
	        i--;
	    }
	    if (direction === "forward") {
	        if (i+2 == len) {
	            var new_user = tipping_data.fixtures[1];
		    var new_opp = tipping_data.fixtures[2];
	        } else {
		    var new_user = tipping_data.fixtures[i+2];
		    var new_opp = tipping_data.fixtures[i+3];
	        }
            }
	    if (direction === "backward") {
	        if (i == 1) {
	            var new_user = tipping_data.fixtures[len-2];
		    var new_opp = tipping_data.fixtures[len-1];
	        } else {
		    var new_user = tipping_data.fixtures[i-2];
		    var new_opp = tipping_data.fixtures[i-1];
	        }
	    }
	    if (new_opp === me) {
	        var temp = new_user;
		new_user = me;
		new_opp = temp;
	    }
	    set_scores(new_user, new_opp);
	    set_names(new_user, new_opp);
        }
    }
}

$(function () {
    var me = get_this_player();
    var them = get_opponent(me, tipping_data.round, tipping_data.fixtures);
    set_scores(me, them);
    set_names(me, them);
});
