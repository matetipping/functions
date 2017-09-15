// gets the replacement ladder tips for a given round.
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
    
    len = afl_data.fixtures.length;
    var number_rounds = 0;
    for (i = 0; i < len; i++) {
        if (afl_data.fixtures[i][0] === tipping_data.round) {
	    number_rounds ++;
	}
    }
    
    var return_tips = [round_no, name];
    var scale_factor = 3;
    
    for (i = 0; i < number_rounds; i++) {
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
    
    // add the bonus tips.
    return_tips.push("");
    return_tips.push("");
    return_tips.push("");
    return_tips.push("");
    return_tips.push("");
    return_tips.push("");
    
    return return_tips;
}

// returns an array with [0] = the number of disposal bonus tips used by player and [1] = the number of scorer bonus tips used.
function get_bonus_tip_count(player_name) {
    var tips = tipping_data.tips;
    var player_tips = find_player_tips(player_name, tips);
    var i;
    var len = player_tips.length;
    var count_disp = 0;
    var count_scor = 0;
    for (i = 0; i < len; i++) {
        var tlen = player_tips[i].length;
	      if (typeof player_tips[i][tlen - 5] === "number") {
	          count_disp ++;
	      }
	      if (typeof player_tips[i][tlen - 3] === "number") {
	          count_scor ++;
	      }
    }
    return [count_disp, count_scor];
}

// returns array table of all tips from a round, with each index a list of tips.
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

// returns array table of player's tips from all rounds, with each index a list of tips.
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

// returns an array with [0] = player 1's score and [1] = player 2's score when 2 tips are being compared.
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

// returns the logged-in player's name
function get_this_player() {
    return $("div#top_info strong").text();
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

// returns the total score when two players are playing against one another.
function calculate_scores(player_name, opponent, results_name, round_no, tips_full) {
    var player_tips = find_player_tip_from_round(round_no, player_name, tips_full);
    if (player_tips.length == 0) {
        player_tips = get_ladder_tips(round_no, player_name);
    }
    var opponent_tips = find_player_tip_from_round(round_no, opponent, tips_full);
    if (opponent_tips.length == 0) {
        opponent_tips = get_ladder_tips(round_no, opponent);
    }
    var results = find_player_tip_from_round(round_no, results_name, tips_full);
    var round_length = (results.length - 8)/2;
    
    // checks if player tipped bonus tips and adds to score.
    if (typeof player_tips[player_tips.length - 5] === "number") {
        var player_total = player_tips[player_tips.length - 5];
    } else {
        var player_total = 0;
    }
    if (typeof player_tips[player_tips.length - 3] === "number") {
        player_total = player_total + player_tips[player_tips.length - 3];
    }
    if (typeof player_tips[player_tips.length - 1] === "number") {
        player_total = player_total + player_tips[player_tips.length - 1];
    }

    // checks if opponent tipped bonus tips and adds to score.
    if (typeof opponent_tips[opponent_tips.length - 5] === "number") {
        var opponent_total = opponent_tips[opponent_tips.length - 5];
    } else {
        var opponent_total = 0;
    }
    if (typeof opponent_tips[opponent_tips.length - 3] === "number") {
        opponent_total = opponent_total + opponent_tips[opponent_tips.length - 3];
    }
    if (typeof opponent_tips[opponent_tips.length - 1] === "number") {
        opponent_total = opponent_total + opponent_tips[opponent_tips.length - 1];
    }
    
    var comparison = [];
    var i;
    var scale_fac = 1;
    for (i = 1; i <= round_length; i++) {
        if (round_no === "F1") {
		if ((i == 1) || (i == 3) || (i == 5) || (i == 7)) {
			scale_fac = 0.75;
		} else if ((i == 2) || (i == 4) || (i == 6) || (i == 8)) {
			scale_fac = 1.5;
		}
	} else if ((round_no === "F2") || (round_no === "F3")) {
		if ((i == 1) || (i == 3) || (i == 5) || (i == 7)) {
			scale_fac = 0.5;
		} else if ((i == 4) || (i == 8)) {
			scale_fac = 2;
		} else {
		        scale_fac = 1;
		}
	} else if (round_no === "F4") {
		if ((i == 1) || (i == 3)) {
			scale_fac = 0.75;
		} else if ((i == 2)) {
			scale_fac = 1.5;
		} else if ((i == 4)) {
			scale_fac = 3;
		}
	}
	comparison = compare_player_tips(player_tips, opponent_tips, results, i, scale_fac);
        player_total = player_total + comparison[0];
        opponent_total = opponent_total + comparison[1];
    }
    var tip_scores = [player_total, opponent_total];
    return tip_scores;
}

// changes the game in the top display on the page.
function change_games(direction, player_name, round_no, fixture_full) {
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
	    set_names(new_player, new_opp);
	    set_scores(new_player, new_opp);
	    set_emblem("emblem_user", new_player, emblem_data.emblems);
	    set_emblem("emblem_opponent", new_opp, emblem_data.emblems);
	    return;
	}
    }
}

// changes the scores in the game on the top menu of the page.
function change_scores(direction) {
    var player_name = $("span#name_user").html();
    var round_no = tipping_data.round;
    var fixture_full = tipping_data.fixtures;
    var i;
    var round_fix = find_round_tips(round_no, fixture_full)[0];
    var len = round_fix.length;
    var player_check = "";
    for (i = 0; i < len; i++) {
        player_check = round_fix[i];
	if (player_check === player_name) {
	    change_games(direction, player_name, round_no, fixture_full);
	    return;
	}
    }
    change_games(direction, round_fix[len - 2], round_no, fixture_full);
}

// sets the scores on the top of the page.
function set_scores(player_name, opponent_name) {
    var scores = calculate_scores(player_name, opponent_name, tipping_data.admin, tipping_data.round, tipping_data.tips);
    var score_player = scores[0];
    var score_opponent = scores[1];
    $("span#score_user").html(score_player);
    $("span#score_opponent").html(score_opponent);
}

// sets the player names on the top of the page.
function set_names(player_name, opponent_name) {
    $("span#name_user").html(player_name);
    $("span#name_opponent").html(opponent_name);
}

// sets emblem background colour.
function set_back_col_scores(id, colour) {
    document.getElementById(id).style.backgroundColor = colour;
}

// sets emblem layer colour.
function set_layer_col_scores(id, pos, colour) {
  document.getElementById(id + "_" + pos).style.backgroundImage = "url('" + colour + "')";
}

// sets emblem layer design.
function set_layer_des_scores(id, pos, design) {
  document.getElementById(id + "_" + pos).style.backgroundPosition = design;
}

// sets emblem layer rotation.
function set_layer_rot_scores(id, pos, no_degrees) {
  document.getElementById(id + "_" + pos).style.transform = "rotate(" + no_degrees + "deg)";
}

// sets an emblem with the given id
function set_emblem(id, name, emblems_all) {
    var name_chk = "";
    var i;
    var len = emblems_all.length;
    for (i = 0; i < len; i++) {
        name_chk = emblems_all[i][0];
        if (name_chk === name) {
            set_back_col_scores(id, emblems_all[i][1]);
            set_layer_col_scores(id, "low", emblems_all[i][2]);
            set_layer_des_scores(id, "low", emblems_all[i][3]);
            set_layer_rot_scores(id, "low", emblems_all[i][4]);
            set_layer_col_scores(id, "top", emblems_all[i][5]);
            set_layer_des_scores(id, "top", emblems_all[i][6]);
            set_layer_rot_scores(id, "top", emblems_all[i][7]);
            return;
        }
    }
    set_back_col_scores(id, "rgb(0, 0, 0)");
    set_layer_col_scores(id, "low", "none");
    set_layer_col_scores(id, "top", "none");
}

// sets emblems in topics.
function set_topic_avatars(emblems) {
    var len = emblems.length;
    var i;
    for (i = 0; i < len; i++) {
        var avatarHTML = '<div class="emblem" style="box-shadow: 0px 0px 1px #000; width: 150px;height: 150px;background: ' + emblems[i][1] + '; z-index: 0; overflow: hidden; display: inline-block;"><div class="low_design" style="background: url(' + emblems[i][2] + ') ' + emblems[i][3] + '; width: 150px; height: 150px; transform:rotate(' + emblems[i][4] + 'deg); position: absolute;"></div><div class="top_design" style="background: url(' + emblems[i][5] + ') ' + emblems[i][6] + '; width: 150px; height: 150px; transform:rotate(' + emblems[i][7] + 'deg); position: absolute;"></div><div class="overlay" style="background: url(http://b3.ifrm.com/30609/91/0/f7005563/emblem_overlay.png); width: 150px; height: 150px; background-size: 150px; position: absolute;"></div></div>';

        if (location.href.indexOf('/profile/') != -1) {
            if ($('th#profile_menuwrap').next('th').html() === emblems[i][0]) {
                $('td.c_mark div.emblem').replaceWith(avatarHTML);
            }
        }
        
        if (location.href.indexOf('/msg/') == -1) {
            $('td.c_username span').each(function() {
                if ($(this).html() === emblems[i][0]) {
                    $(this).parents('tr[id*="post-"]').next('tr').find('div.emblem').replaceWith(avatarHTML);
                }
            });
        } else {
             $('tr.topinfo td.c_username span').each(function() {
                if ($(this).html() === emblems[i][0]) {
                    $('tr.topinfo div.emblem').replaceWith(avatarHTML);
                }
            });
        }
    }
}

$(function () {
    var me = get_this_player();
    var them = get_opponent(me, tipping_data.round, tipping_data.fixtures);
    var i;
    var round_fix = find_round_tips(tipping_data.round, tipping_data.fixtures)[0];
    var len = round_fix.length;
    var player_check = "";
    var found = false;
    for (i = 0; i < len; i++) {
        player_check = round_fix[i];
	if (player_check === me) {
	    found = true;
	}
    }
    if (found == false) {
        me = round_fix[1];
        them = round_fix[2];
    }
    set_scores(me, them);
    set_names(me, them);
    set_emblem("emblem_user", me, emblem_data.emblems);
    set_emblem("emblem_opponent", them, emblem_data.emblems);
    set_topic_avatars(emblem_data.emblems);
});
