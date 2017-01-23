var tipping_data = {
    round: "R1",
    admin: "Administrator",
	tips: [
	    ["R1", "Administrator", "CAR", 32, "HAW", 25, 0, 0],
	    ["R1", "Daniel Terrington", "RIC", 3, "HAW", 34, 0, 0],
	    ["R1", "ciniboi_12", "CAR", 10, "HAW", 19, 0, 0]
	],
    fixtures: [
        ["R1", "Administrator", "Daniel Terrington"],
        ["R2"],
        ["R3"]
    ]
}

function find_round_tips (round, a_list) {
    var list = [];
    for (i = 0; i < a_list.length; i++) {
        if (a_list[i][0].equals(round)) {
            list.append(a_list[i]);
        }
    }
    return list;
}

function find_player_tips (id, a_list) {
    var list = [];
    for (i = 0; i < a_list.length; i++) {
        if (a_list[i][1].equals(id)) {
            list.append(a_list[i]);
        }
    }
    return list;
}

function compare_tips(result, player1, player2, game_no, scaling) {
    var result_team = result[game_no*2];
    var result_marg = result[game_no*2 + 1];
    var player1_team = player1[game_no*2];
    var player1_marg = player1[game_no*2 + 1];
    var player2_team = player2[game_no*2];
    var player2_marg = player2[game_no*2 + 1];
    var player1_diff = 0;
    var player2_diff = 0;
    var player1_score = 0;
    var player2_score = 0;
    
    if (result_team.equals(player1_team)) {
        player1_diff = Math.abs(player1_marg - result_marg);
    } else {
        player1_diff = player1_marg + result_marg;
    }
    if (result_team.equals(player2_team)) {
        player2_diff = Math.abs(player2_marg - result_marg);
    } else {
        player2_diff = player2_marg + result_marg;
    }
    
    if (player1_diff > player2_diff) {
        player2_score = player1_diff - player2_diff;
        player1_score = 0;
        if (player1_team.equals(result_team) && !(player2_team.equals(result_team))) {
            player2_score = player2_score / 2;
        }
        if (player2_diff === 0) {
            player2_score = player2_score * 2;
        }
    } else {
        player1_score = player2_diff - player1_diff;
        player2_score = 0;
        if (player2_team.equals(result_team) && !(player1_team.equals(result_team))) {
            player1_score = player1_score / 2;
        }
        if (player1_diff === 0) {
            player1_score = player1_score * 2;
        }
    }
    
    return [Math.ceil(scaling * player1_score - 0.4999), Math.ceil(scaling * player2_score - 0.4999)];
}

function find_opponent(round, id, fixtures) {
    for (i = 0; i < fixtures.length; i++) {
        if (fixtures[i][0].equals(round)) {
            for (j = 0; j < fixtures[i].length; j++) {
                if (fixtures[i][j].equals(id)) {
                    if (j % 2 === 0) {
                        return fixtures[i][j - 1];
                    } else {
                        return fixtures[i][j + 1];
                    }
                }
            }
        }
    }
    return -1;
}

function calculate_scores(round, fixtures, tips, player, admin) {
    var round_tips = find_round_tips(round, tips);
    var round_length = (find_round_tips[0].length - 4)/2;
    var opponent = find_opponent(round, player, fixtures);
    var player_tips = find_player_tips(player, round_tips)[0];
    var opponent_tips = find_player_tips(opponent, round_tips)[0];
    var results = find_player_tips(admin, round_tips)[0];
    var player_total = player_tips[player_tips.length - 2] + player_tips[player_tips.length - 1];
    var opponent_total = opponent_tips[opponent_tips.length - 2] + opponent_tips[opponent_tips.length - 1];
    var tip_scores = [0,0];
    for (i = 1; i <= round_length; i++) {
        tip_scores = compare_tips(results, player_tips, opponent_tips, i, 1);
        player_total = player_total + tip_scores[0];
        opponent_total = opponent_total + tip_scores[1];
    }
    return [player_total, opponent_total];
}

function get_this_id() {
    return $("div#top_info strong a").html ();
}

var round = tipping_data.round;
var fixtures = tipping_data.fixtures;
var tips = tipping_data.tips;
var id = get_this_id();
var admin = tipping_data.admin;
var final_scores = calculate_scores(round, fixtures, tips, id, admin);

$(function () {
    $("span#score_user").html("lol");
    $("span#score_user").html(round);
    $("span#score_opponent").html(final_scores[1]);
});
