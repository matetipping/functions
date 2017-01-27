function get_error(player_name, round_tips, results) {
    var player_team = "";
    var result_team = "";
    var player_margin;
    var result_margin;
    var i;
    var len = results.length - 2;
    var player_error = 0;
    for (i = 2; i < len; i = i + 2) {
        player_team = round_tips[i];
        result_team = results[i];
        player_margin = round_tips[i + 1];
        result_margin = round_tips[i + 1];
        if (result_team === player_team) {
            player_error = player_error + Math.abs(player_margin - result_margin);
        } else {
            player_error = player_error + player_marg + result_marg;
        }
    }
    return player_error;
}

function get_total_error(player_name) {
    var results = find_player_tips(tipping_data.admin, tipping_data.tips) {
    var total_error = 0;
    var i;
    var len = results.length;
    for (i = 0; i < len; i++) {
        var results_tips = results[i];
        var round_tips = find_player_tip_from_round(results_tips[0], player_name, tipping_data.tips);
        total_error = total_error + get_error(player_name, round_tips, results_tips);
    }
    return total_error;
}

function load_page_details(player_name) {
    var total_error = get_total_error(player_name);
    $("span#total_player_error").html(total_error);
}

$(function () {
    load_page_details("Daniel Terrington");
});
