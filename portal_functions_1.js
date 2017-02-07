// sets the number of remaining bonus tips on the portal page.
function set_bonus_remaining(player_name) {
    var bonuses = get_bonus_tip_count(player_name);
    var count_disp = bonuses[0];
    var count_scor = bonuses[1];
    $("h4#tipping_remaining_disp").html(count_disp + "/10 used:");
    $("h4#tipping_remaining_scor").html(count_scor + "/10 used:");
    if (count_disp >= 10) {
        $("input#tipping_player_disposals").parents('tr').hide();
    }
    if (count_scor >= 10) {
        $("input#tipping_player_scorer").parents('tr').hide();
    }
}

$(function () {
    set_bonus_remaining(get_this_player());
});
