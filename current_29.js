var tipping_data = {
    round: "R1",
    admin: "Administrator",
    tips: [
	["R1", "Administrator", "CAR", 32, "HAW", 25, 0, 0],
	["R1", "Daniel Terrington", "RIC", 3, "HAW", 34, 0, 0],
	["R1", "ciniboi_12", "CAR", 10, "HAW", 19, 0, 0]
    ],
    fixtures: [
        ["R1", "ciniboi_12", "Daniel Terrington"],
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
    var player_tips = find_player_tips(player_name, a_list);
    var round_tips = find_round_tips(round_no, player_tips);
    var result = [];
    if (round_tips.length > 0) {
	result = round_tips[0]
    }
    return result;
}

$(function () {
    var tip = find_player_tip_from_round("R1", "Daniel Terrington", tipping_data.tips)[4];
    var next = find_player_tip_from_round("R1", "Administrator", tipping_data.tips[3];
    $("span#score_user").html(tip);
    $("span#score_opponent").html(next);
});
