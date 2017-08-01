$(function () {
    var me = get_this_player();
    var access = ["Administrator", "ciniboi_12", "Mann"];
    var i;
    var len = access.length;
    for (i=0; i < len; i++) {
        if (access[i] === me) {
            show_html();
            $("select#player_picker").val(me);
            load_prodata(me);
        }
    }
});

function show_html() {
   $("div.tipping_box#pro").html("<select id='player_picker' onchange='load_prodata(this.value)'><option>Alex Rowland</option><option>Bigbadbrucey</option><option>ciniboi_12</option><option>Craig Terrington</option><option>Dannelboyz</option><option>Flagpies</option><option>Harry Rowland</option><option>jamieling</option><option>Jeanille01</option><option>Jono22</option><option>Kaytley🐐</option><option>Mann</option><option>Shaydog</option><option>Steve</option></select></br><span id='rembonus_disp'></span><span id='rembonus_scor'></span><span id='tip_count'></span><span id='tip_percentage'></span><span id='perfect_tips'></span></br><table style='width: 100%; font-size: 80%'><thead><tr><th colspan='7' style='background: rgba(0, 0, 0, 0.3); text-align: center; font-size: 120%; vertical-align: middle;'>BONUS TIPS</th></tr><tr><th></th><th>Disposal For</th><th>Scorer For</th><th>Total Bonus For</th><th>Disposal Against</th><th>Scorer Against</th><th>Total Against</th></tr></thead><tbody><tr><td>Points</td><td id='bonus_disp'></td><td id='bonus_score'></td><td style='color: #090; font-weight: bold;' id='bonus_tot'></td><td id='bonus_disp_against'></td><td id='bonus_score_against'></td><td style='color: #c33; font-weight: bold;' id='bonus_tot_against'></td></tr><tr><td>Number Used</td><td id='bonus_disp_num'></td><td id='bonus_score_num'></td><td style='color: #090; font-weight: bold;' id='bonus_tot_num'></td><td id='bonus_disp_num_against'></td><td id='bonus_score_num_against'></td><td style='color: #c33; font-weight: bold;' id='bonus_tot_num_against'></td></tr><tr><td>Average</td><td id='bonus_disp_avg'></td><td id='bonus_score_avg'></td><td style='color: #090; font-weight: bold;' id='bonus_tot_avg'></td><td id='bonus_disp_avg_against'></td><td id='bonus_score_avg_against'></td><td style='color: #c33; font-weight: bold;' id='bonus_tot_avg_against'></td></tr><tr><td>Perfect Tips</td><td id='bonus_disp_perf'></td><td id='bonus_score_perf'></td><td style='color: #090; font-weight: bold;' id='bonus_tot_perf'></td><td id='bonus_disp_perf_against'></td><td id='bonus_score_perf_against'></td><td style='color: #c33; font-weight: bold;' id='bonus_tot_perf_against'></td></tr></tbody></table><table style='width: 100%; font-size: 80%' id='tbl_error'><thead><tr><th colspan='6' style='background: rgba(0, 0, 0, 0.3); text-align: center; font-size: 120%; vertical-align: middle;'>ERROR</th></tr><tr><th></th><th>Season</th><th>Last Round</th><th>Last 3</th><th>Last 5</th><th>Against</th></tr></thead><tbody><tr><td>Total Error</td><td id='error_tot_season'></td><td id='error_tot_last1'></td><td id='error_tot_last3'></td><td id='error_tot_last5'></td><td id='error_against_tot_season'></td></tr><tr><td>Round Av.</td><td id='error_rnd_season'></td><td id='error_rnd_last1'></td><td id='error_rnd_last3'></td><td id='error_rnd_last5'></td><td id='error_against_rnd_season'></td></tr><tr><td>Game Av.</td><td id='error_gme_season'></td><td id='error_gme_last1'></td><td id='error_gme_last3'></td><td id='error_gme_last5'></td><td id='error_against_gme_season'></td></tr></tbody></table><table style='width: 100%; font-size: 80%' id='tbl_risk'><thead><tr><th colspan='7' style='background: rgba(0, 0, 0, 0.3); text-align: center; font-size: 120%; vertical-align: middle;'>RISK</th></tr><tr><th></th><th>Season</th><th>Last Round</th><th>Last 3</th><th>Last 5</th><th>Against</th></tr></thead><tbody><tr><td>Total Risk</td><td id='risk_tot_season'></td><td id='risk_tot_last1'></td><td id='risk_tot_last3'></td><td id='risk_tot_last5'></td><td id='risk_against_tot_season'></td></tr><tr><td>Round Av.</td><td id='risk_rnd_season'></td><td id='risk_rnd_last1'></td><td id='risk_rnd_last3'></td><td id='risk_rnd_last5'></td><td id='risk_against_rnd_season'></td></tr><tr><td>Game Av.</td><td id='risk_gme_season'></td><td id='risk_gme_last1'></td><td id='risk_gme_last3'></td><td id='risk_gme_last5'></td><td id='risk_against_gme_season'></td></tr></tbody></table><table style='width: 100%; font-size: 80%' id='tbl_bias'><thead><tr><th colspan='11' style='background: rgba(0, 0, 0, 0.3); text-align: center; font-size: 120%; vertical-align: middle;'>ERROR AND BIAS BY CLUB</th></tr><tr><th></th><th>Average Tip</th><th>S.D.</th><th>%For</th><th>%Right</th><th>Bias</th><th>S.D.</th><th>Error Bias</th><th>S.D.</th><th>Error</th><th>S.D.</th></tr></thead><tbody><tr><td><div id='ade' class='team_icon'></div></td><td id='bias_ade_avtip'></td><td id='bias_ade_avtip_sd'></td><td id='bias_ade_for' class='for'></td><td id='bias_ade_right'></td><td id='bias_ade_bias'></td><td id='bias_ade_bias_sd'></td><td id='bias_ade_error' class='error'></td><td id='bias_ade_error_sd'></td><td id='errorteam_ade'></td><td id='errorteam_ade_sd'></td></tr><tr><td><div id='bri' class='team_icon'></div></td><td id='bias_bri_avtip'></td><td id='bias_bri_avtip_sd'></td><td id='bias_bri_for' class='for'></td><td id='bias_bri_right'></td><td id='bias_bri_bias'></td><td id='bias_bri_bias_sd'></td><td id='bias_bri_error' class='error'></td><td id='bias_bri_error_sd'></td><td id='errorteam_bri'></td><td id='errorteam_bri_sd'></td></tr><tr><td><div id='car' class='team_icon'></div></td><td id='bias_car_avtip'></td><td id='bias_car_avtip_sd'></td><td id='bias_car_for' class='for'></td><td id='bias_car_right'></td><td id='bias_car_bias'></td><td id='bias_car_bias_sd'></td><td id='bias_car_error' class='error'></td><td id='bias_car_error_sd'></td><td id='errorteam_car'></td><td id='errorteam_car_sd'></td></tr><tr><td><div id='col' class='team_icon'></div></td><td id='bias_col_avtip'></td><td id='bias_col_avtip_sd'></td><td id='bias_col_for' class='for'></td><td id='bias_col_right'></td><td id='bias_col_bias'></td><td id='bias_col_bias_sd'></td><td id='bias_col_error' class='error'></td><td id='bias_col_error_sd'></td><td id='errorteam_col'></td><td id='errorteam_col_sd'></td></tr><tr><td><div id='ess' class='team_icon'></div></td><td id='bias_ess_avtip'></td><td id='bias_ess_avtip_sd'></td><td id='bias_ess_for' class='for'></td><td id='bias_ess_right'></td><td id='bias_ess_bias'></td><td id='bias_ess_bias_sd'></td><td id='bias_ess_error' class='error'></td><td id='bias_ess_error_sd'></td><td id='errorteam_ess'></td><td id='errorteam_ess_sd'></td></tr><tr><td><div id='fre' class='team_icon'></div></td><td id='bias_fre_avtip'></td><td id='bias_fre_avtip_sd'></td><td id='bias_fre_for' class='for'></td><td id='bias_fre_right'></td><td id='bias_fre_bias'></td><td id='bias_fre_bias_sd'></td><td id='bias_fre_error' class='error'></td><td id='bias_fre_error_sd'></td><td id='errorteam_fre'></td><td id='errorteam_fre_sd'></td></tr><tr><td><div id='gee' class='team_icon'></div></td><td id='bias_gee_avtip'></td><td id='bias_gee_avtip_sd'></td><td id='bias_gee_for' class='for'></td><td id='bias_gee_right'></td><td id='bias_gee_bias'></td><td id='bias_gee_bias_sd'></td><td id='bias_gee_error' class='error'></td><td id='bias_gee_error_sd'></td><td id='errorteam_gee'></td><td id='errorteam_gee_sd'></td></tr><tr><td><div id='gcs' class='team_icon'></div></td><td id='bias_gcs_avtip'></td><td id='bias_gcs_avtip_sd'></td><td id='bias_gcs_for' class='for'></td><td id='bias_gcs_right'></td><td id='bias_gcs_bias'></td><td id='bias_gcs_bias_sd'></td><td id='bias_gcs_error' class='error'></td><td id='bias_gcs_error_sd'></td><td id='errorteam_gcs'></td><td id='errorteam_gcs_sd'></td></tr><tr><td><div id='gws' class='team_icon'></div></td><td id='bias_gws_avtip'></td><td id='bias_gws_avtip_sd'></td><td id='bias_gws_for' class='for'></td><td id='bias_gws_right'></td><td id='bias_gws_bias'></td><td id='bias_gws_bias_sd'></td><td id='bias_gws_error' class='error'></td><td id='bias_gws_error_sd'></td><td id='errorteam_gws'></td><td id='errorteam_gws_sd'></td></tr><tr><td><div id='haw' class='team_icon'></div></td><td id='bias_haw_avtip'></td><td id='bias_haw_avtip_sd'></td><td id='bias_haw_for' class='for'></td><td id='bias_haw_right'></td><td id='bias_haw_bias'></td><td id='bias_haw_bias_sd'></td><td id='bias_haw_error' class='error'></td><td id='bias_haw_error_sd'></td><td id='errorteam_haw'></td><td id='errorteam_haw_sd'></td></tr><tr><td><div id='mel' class='team_icon'></div></td><td id='bias_mel_avtip'></td><td id='bias_mel_avtip_sd'></td><td id='bias_mel_for' class='for'></td><td id='bias_mel_right'></td><td id='bias_mel_bias'></td><td id='bias_mel_bias_sd'></td><td id='bias_mel_error' class='error'></td><td id='bias_mel_error_sd'></td><td id='errorteam_mel'></td><td id='errorteam_mel_sd'></td></tr><tr><td><div id='nth' class='team_icon'></div></td><td id='bias_nth_avtip'></td><td id='bias_nth_avtip_sd'></td><td id='bias_nth_for' class='for'></td><td id='bias_nth_right'></td><td id='bias_nth_bias'></td><td id='bias_nth_bias_sd'></td><td id='bias_nth_error' class='error'></td><td id='bias_nth_error_sd'></td><td id='errorteam_nth'></td><td id='errorteam_nth_sd'></td></tr><tr><td><div id='pta' class='team_icon'></div></td><td id='bias_pta_avtip'></td><td id='bias_pta_avtip_sd'></td><td id='bias_pta_for' class='for'></td><td id='bias_pta_right'></td><td id='bias_pta_bias'></td><td id='bias_pta_bias_sd'></td><td id='bias_pta_error' class='error'></td><td id='bias_pta_error_sd'></td><td id='errorteam_pta'></td><td id='errorteam_pta_sd'></td></tr><tr><td><div id='ric' class='team_icon'></div></td><td id='bias_ric_avtip'></td><td id='bias_ric_avtip_sd'></td><td id='bias_ric_for' class='for'></td><td id='bias_ric_right'></td><td id='bias_ric_bias'></td><td id='bias_ric_bias_sd'></td><td id='bias_ric_error' class='error'></td><td id='bias_ric_error_sd'></td><td id='errorteam_ric'></td><td id='errorteam_ric_sd'></td></tr><tr><td><div id='stk' class='team_icon'></div></td><td id='bias_stk_avtip'></td><td id='bias_stk_avtip_sd'></td><td id='bias_stk_for' class='for'></td><td id='bias_stk_right'></td><td id='bias_stk_bias'></td><td id='bias_stk_bias_sd'></td><td id='bias_stk_error' class='error'></td><td id='bias_stk_error_sd'></td><td id='errorteam_stk'></td><td id='errorteam_stk_sd'></td></tr><tr><td><div id='syd' class='team_icon'></div></td><td id='bias_syd_avtip'></td><td id='bias_syd_avtip_sd'></td><td id='bias_syd_for' class='for'></td><td id='bias_syd_right'></td><td id='bias_syd_bias'></td><td id='bias_syd_bias_sd'></td><td id='bias_syd_error' class='error'></td><td id='bias_syd_error_sd'></td><td id='errorteam_syd'></td><td id='errorteam_syd_sd'></td></tr><tr><td><div id='wce' class='team_icon'></div></td><td id='bias_wce_avtip'></td><td id='bias_wce_avtip_sd'></td><td id='bias_wce_for' class='for'></td><td id='bias_wce_right'></td><td id='bias_wce_bias'></td><td id='bias_wce_bias_sd'></td><td id='bias_wce_error' class='error'></td><td id='bias_wce_error_sd'></td><td id='errorteam_wce'></td><td id='errorteam_wce_sd'></td></tr><tr><td><div id='wbd' class='team_icon'></div></td><td id='bias_wbd_avtip'></td><td id='bias_wbd_avtip_sd'></td><td id='bias_wbd_for' class='for'></td><td id='bias_wbd_right'></td><td id='bias_wbd_bias'></td><td id='bias_wbd_bias_sd'></td><td id='bias_wbd_error' class='error'></td><td id='bias_wbd_error_sd'></td><td id='errorteam_wbd'></td><td id='errorteam_wbd_sd'></td></tr></tbody></table><table style='width: 100%; font-size: 80%'><thead><tr><th colspan='4' style='background: rgba(0, 0, 0, 0.3); text-align: center; font-size: 120%; vertical-align: middle;'>LADDER PREDICTIONS</th></tr><tr><th>Team</th><th>Position</th><th>Prediction</th><th>Error</th><th>Favouritism</th><th>Error</th><th>Improvement</th></tr></thead><tbody><tr><td><div class='ladder_1 team_icon'></div></td><td id='ladder_position_1'></td><td>1</td><td id='ladder_error_1'></td><td id='ladder_favouritism_1'></td><td id='ladder_favouritism_error_1'></td><td id='ladder_improvement_1'></td></tr><tr><td><div class='ladder_2 team_icon'></div></td><td id='ladder_position_2'></td><td>2</td><td id='ladder_error_2'></td><td id='ladder_favouritism_2'></td><td id='ladder_favouritism_error_2'></td><td id='ladder_improvement_2'></td></tr><tr><td><div class='ladder_3 team_icon'></div></td><td id='ladder_position_3'></td><td>3</td><td id='ladder_error_3'></td><td id='ladder_favouritism_3'></td><td id='ladder_favouritism_error_3'></td><td id='ladder_improvement_3'></td></tr><tr><td><div class='ladder_4 team_icon'></div></td><td id='ladder_position_4'></td><td>4</td><td id='ladder_error_4'></td><td id='ladder_favouritism_4'></td><td id='ladder_favouritism_error_4'></td><td id='ladder_improvement_4'></td></tr><tr><td><div class='ladder_5 team_icon'></div></td><td id='ladder_position_5'></td><td>5</td><td id='ladder_error_5'></td><td id='ladder_favouritism_5'></td><td id='ladder_favouritism_error_5'></td><td id='ladder_improvement_5'></td></tr><tr><td><div class='ladder_6 team_icon'></div></td><td id='ladder_position_6'></td><td>6</td><td id='ladder_error_6'></td><td id='ladder_favouritism_6'></td><td id='ladder_favouritism_error_6'></td><td id='ladder_improvement_6'></td></tr><tr><td><div class='ladder_7 team_icon'></div></td><td id='ladder_position_7'></td><td>7</td><td id='ladder_error_7'></td><td id='ladder_favouritism_7'></td><td id='ladder_favouritism_error_7'></td><td id='ladder_improvement_7'></td></tr><tr><td><div class='ladder_8 team_icon'></div></td><td id='ladder_position_8'></td><td>8</td><td id='ladder_error_8'></td><td id='ladder_favouritism_8'></td><td id='ladder_favouritism_error_8'></td><td id='ladder_improvement_8'></td></tr><tr><td><div class='ladder_9 team_icon'></div></td><td id='ladder_position_9'></td><td>9</td><td id='ladder_error_9'></td><td id='ladder_favouritism_9'></td><td id='ladder_favouritism_error_9'></td><td id='ladder_improvement_9'></td></tr><tr><td><div class='ladder_10 team_icon'></div></td><td id='ladder_position_10'></td><td>10</td><td id='ladder_error_10'></td><td id='ladder_favouritism_10'></td><td id='ladder_favouritism_error_10'></td><td id='ladder_improvement_10'></td></tr><tr><td><div class='ladder_11 team_icon'></div></td><td id='ladder_position_11'></td><td>11</td><td id='ladder_error_11'></td><td id='ladder_favouritism_11'></td><td id='ladder_favouritism_error_11'></td><td id='ladder_improvement_11'></td></tr><tr><td><div class='ladder_12 team_icon'></div></td><td id='ladder_position_12'></td><td>12</td><td id='ladder_error_12'></td><td id='ladder_favouritism_12'></td><td id='ladder_favouritism_error_12'></td><td id='ladder_improvement_12'></td></tr><tr><td><div class='ladder_13 team_icon'></div></td><td id='ladder_position_13'></td><td>13</td><td id='ladder_error_13'></td><td id='ladder_favouritism_13'></td><td id='ladder_favouritism_error_13'></td><td id='ladder_improvement_13'></td></tr><tr><td><div class='ladder_14 team_icon'></div></td><td id='ladder_position_14'></td><td>14</td><td id='ladder_error_14'></td><td id='ladder_favouritism_14'></td><td id='ladder_favouritism_error_14'></td><td id='ladder_improvement_14'></td></tr><tr><td><div class='ladder_15 team_icon'></div></td><td id='ladder_position_15'></td><td>15</td><td id='ladder_error_15'></td><td id='ladder_favouritism_15'></td><td id='ladder_favouritism_error_15'></td><td id='ladder_improvement_15'></td></tr><tr><td><div class='ladder_16 team_icon'></div></td><td id='ladder_position_16'></td><td>16</td><td id='ladder_error_16'></td><td id='ladder_favouritism_16'></td><td id='ladder_favouritism_error_16'></td><td id='ladder_improvement_16'></td></tr><tr><td><div class='ladder_17 team_icon'></div></td><td id='ladder_position_17'></td><td>17</td><td id='ladder_error_17'></td><td id='ladder_favouritism_17'></td><td id='ladder_favouritism_error_17'></td><td id='ladder_improvement_17'></td></tr><tr><td><div class='ladder_18 team_icon'></div></td><td id='ladder_position_18'></td><td>18</td><td id='ladder_error_18'></td><td id='ladder_favouritism_18'></td><td id='ladder_favouritism_error_18'></td><td id='ladder_improvement_18'></td></tr><tr><td>TOTAL</td><td></td><td></td><td id='ladder_error_total'></td><td></td><td id='ladder_favouritism_error_total'></td><td id='ladder_improvement_total'></td></tr></tbody></table><table style='width: 100%; font-size: 80%'><thead><tr><th colspan='8' style='background: rgba(0, 0, 0, 0.3); text-align: center; font-size: 120%; vertical-align: middle;'>SCORING</th></tr><tr><th></th><th>Score</th><th>Average</th><th>W-D-L</th><th>Percentage</th><th>Points</th><th>Highest</th><th>Lowest</th></tr></thead><tbody><tr><td>For</td><td id='total_score'></td><td id='average_score'></td><td id='win-draw-loss'></td><td id='score_percentage'></td><td id='premiership_points'></td><td id='highest_score'></td><td id='lowest_score'></td></tr><tr><td>Against</td><td id='total_score_against'></td><td id='average_score_against'></td><td id='win-draw-loss_against'></td><td id='score_percentage_against'></td><td id='premiership_points_against'></td><td id='highest_score_against'></td><td id='lowest_score_against'></td></tr></tbody></table><select id='player_picker' onchange='load_prodata(this.value)'><option>Alex Rowland</option><option>Bigbadbrucey</option><option>ciniboi_12</option><option>Craig Terrington</option><option>Dannelboyz</option><option>Flagpies</option><option>Harry Rowland</option><option>jamieling</option><option>Jeanille01</option><option>Jono22</option><option>Kaytley🐐</option><option>Mann</option><option>Shaydog</option><option>Steve</option></select>");
}

function load_prodata(player_name) {
    if (player_name !== "--") {
        var current_round = tipping_data.round;
        var rounds = ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "B1", "B2", "R14", "R15", "R16", "R17", "R18", "R19", "R20", "R21", "R22", "R23", "F1", "F2", "F3", "F4"];
        var i;
        var len = rounds.length;
        var access_rounds = [];
        for (i=0; i < len; i++) {
            if (rounds[i] === current_round) {
                break;
            } else {
                access_rounds.push(rounds[i]);
            }
        }
    }
    
    // find no. bonus tips used
    var bonuses = get_bonus_tip_count(player_name);
    var rem_disp = 10 - bonuses[0];
    var rem_scor = 10 - bonuses[1];
    $("span#rembonus_disp").html("Disposal Tips: " + rem_disp + " remaining &#124; ");
    $("span#rembonus_scor").html("Scorer Tips: " + rem_scor + " remaining");

    // find error
    len = access_rounds.length;
    var error_count = 0;
    var error_against = 0;
    var game_count = 0;
    var perfect_count = 0;
    var highest_score = 0;
    var lowest_score = 1000;
    var total_score = 0;
    var highest_score_against = 0;
    var lowest_score_against = 1000;
    var total_score_against = 0;
    var tip_count = 0;
    var win_count = 0;
    var loss_count = 0;
    var draw_count = 0;
    for (i=0; i < len; i++) {
        var current_round = find_player_tip_from_round(access_rounds[i], player_name, tipping_data.tips);
        var results = find_player_tip_from_round(access_rounds[i], tipping_data.admin, tipping_data.tips);
        if (player_name === "Administrator") {
            var opponent = "Administrator";
        } else {
            var opponent = get_opponent(player_name, access_rounds[i], tipping_data.fixtures);
        }
        var opponent_round = find_player_tip_from_round(access_rounds[i], opponent, tipping_data.tips);
        var j;
        var round_no = (results.length - 8)/2;
        var week_scores = calculate_scores(player_name, opponent, tipping_data.admin, access_rounds[i], tipping_data.tips);
        var score_for = week_scores[0];
        var score_against = week_scores[1];
        if (score_for > highest_score) {
            highest_score = score_for;
        }
        if (score_against > highest_score_against) {
            highest_score_against = score_against;
        }
        if (score_for < lowest_score) {
            lowest_score = score_for;
        }
        if (score_against < lowest_score_against) {
            lowest_score_against = score_against;
        }
        total_score = total_score + score_for;
        total_score_against = total_score_against + score_against;
        if (score_for > score_against) {
            win_count ++;
        } else if (score_for < score_against) {
            loss_count ++;
        } else {
            draw_count ++;
        }
        for (j=0; j < round_no; j++) {
            var error_score;
            var error_score_against;
            var game_no = j+1;
            if (current_round[2*game_no] === results[2*game_no]) {
                error_score = Math.abs(current_round[(2*game_no) + 1] - results[(2*game_no) + 1]);
                tip_count ++;
            } else {
                error_score = current_round[(2*game_no) + 1] + results[(2*game_no) + 1];
            }
            if (opponent_round[2*game_no] === results[2*game_no]) {
                error_score_against = Math.abs(opponent_round[(2*game_no) + 1] - results[(2*game_no) + 1]);
            } else {
                error_score_against = opponent_round[(2*game_no) + 1] + results[(2*game_no) + 1];
            }
            if (error_score == 0) {
                perfect_count ++;
            }
            error_count = error_count + error_score;
            error_against = error_against + error_score_against;
            game_count++;
        }
    }
    $("span#perfect_tips").html(" &#124; Perfect Margin Tips: " + perfect_count);
    $("td#error_tot_season").html(error_count);
    $("td#error_rnd_season").html(Math.round(10*(error_count/len))/10);
    $("td#error_gme_season").html(Math.round(10*(error_count/game_count))/10);
    $("td#error_against_tot_season").html(error_against);
    $("td#error_against_rnd_season").html(Math.round(10*(error_against/len))/10);
    $("td#error_against_gme_season").html(Math.round(10*(error_against/game_count))/10);
    $("span#tip_count").html(" &#124; Total Tips: " + tip_count);
    $("span#tip_percentage").html(" &#124; Tip (%): " + Math.round(10*(tip_count/game_count * 100))/10);
    $("td#total_score").html(total_score);
    $("td#total_score_against").html(total_score_against);
    $("td#average_score").html(Math.round(10*(total_score/len))/10);
    $("td#average_score_against").html(Math.round(10*(total_score_against/len))/10);
    $("td#highest_score").html(highest_score);
    $("td#highest_score_against").html(highest_score_against);
    $("td#lowest_score").html(lowest_score);
    $("td#lowest_score_against").html(lowest_score_against);
    $("td#win-draw-loss").html(win_count + "-" + draw_count + "-" + loss_count);
    $("td#win-draw-loss_against").html(loss_count + "-" + draw_count + "-" + win_count);
    $("td#premiership_points").html(4*win_count + 2*draw_count);
    $("td#premiership_points_against").html(4*loss_count + 2*draw_count);
    $("td#score_percentage").html(Math.round(10*(total_score/total_score_against * 100))/10);
    $("td#score_percentage_against").html(Math.round(10*(total_score_against/total_score * 100))/10);

    // find error for last round
    len = access_rounds.length;
    var error_count = 0;
    var game_count = 0;
    for (i=len-1; i < len; i++) {
        var current_round = find_player_tip_from_round(access_rounds[i], player_name, tipping_data.tips);
        var results = find_player_tip_from_round(access_rounds[i], tipping_data.admin, tipping_data.tips);
        var j;
        var round_no = (results.length - 8)/2;
        for (j=0; j < round_no; j++) {
            var error_score;
            var game_no = j+1;
            if (current_round[2*game_no] === results[2*game_no]) {
                error_score = Math.abs(current_round[(2*game_no) + 1] - results[(2*game_no) + 1]);
            } else {
                error_score = current_round[(2*game_no) + 1] + results[(2*game_no) + 1];
            }
            error_count = error_count + error_score;
            game_count++;
        }
    }
    $("td#error_tot_last1").html(error_count);
    $("td#error_rnd_last1").html(Math.round(10*(error_count))/10);
    $("td#error_gme_last1").html(Math.round(10*(error_count/game_count))/10);
    
    // find error for last 3
    var excess = 0;
    len = access_rounds.length;
    var error_count = 0;
    var game_count = 0;
    for (i=len-3; i < len; i++) {
        if (i < 0) {
            excess = i*-1;
            i = 0;
        }
        var current_round = find_player_tip_from_round(access_rounds[i], player_name, tipping_data.tips);
        var results = find_player_tip_from_round(access_rounds[i], tipping_data.admin, tipping_data.tips);
        var j;
        var round_no = (results.length - 8)/2;
        for (j=0; j < round_no; j++) {
            var error_score;
            var game_no = j+1;
            if (current_round[2*game_no] === results[2*game_no]) {
                error_score = Math.abs(current_round[(2*game_no) + 1] - results[(2*game_no) + 1]);
            } else {
                error_score = current_round[(2*game_no) + 1] + results[(2*game_no) + 1];
            }
            error_count = error_count + error_score;
            game_count++;
        }
    }
    $("td#error_tot_last3").html(error_count);
    $("td#error_rnd_last3").html(Math.round(10*(error_count/(3 - excess)))/10);
    $("td#error_gme_last3").html(Math.round(10*(error_count/game_count))/10);

    // find error for last 5
    var excess = 0;
    len = access_rounds.length;
    var error_count = 0;
    var game_count = 0;
    for (i=len-5; i < len; i++) {
        if (i < 0) {
            excess = i*-1;
            i = 0;
        }
        var current_round = find_player_tip_from_round(access_rounds[i], player_name, tipping_data.tips);
        var results = find_player_tip_from_round(access_rounds[i], tipping_data.admin, tipping_data.tips);
        var j;
        var round_no = (results.length - 8)/2;
        for (j=0; j < round_no; j++) {
            var error_score;
            var game_no = j+1;
            if (current_round[2*game_no] === results[2*game_no]) {
                error_score = Math.abs(current_round[(2*game_no) + 1] - results[(2*game_no) + 1]);
            } else {
                error_score = current_round[(2*game_no) + 1] + results[(2*game_no) + 1];
            }
            error_count = error_count + error_score;
            game_count++;
        }
    }
    $("td#error_tot_last5").html(error_count);
    $("td#error_rnd_last5").html(Math.round(10*(error_count/(5-excess)))/10);
    $("td#error_gme_last5").html(Math.round(10*(error_count/game_count))/10);

    // find risk
    len = access_rounds.length;
    var risk_count = 0;
    var risk_against = 0;
    var game_count = 0;
    for (i=0; i < len; i++) {
        var current_round = find_player_tip_from_round(access_rounds[i], player_name, tipping_data.tips);
        var round_tips = find_round_tips(access_rounds[i], tipping_data.tips);
        if (player_name === "Administrator") {
            var opponent = "Administrator";
        } else {
            var opponent = get_opponent(player_name, access_rounds[i], tipping_data.fixtures);
        }
        var opponent_round = find_player_tip_from_round(access_rounds[i], opponent, tipping_data.tips);
        var tippers_no = (round_tips[0].length - 8)/2;
        var j;
        var average_tips = [access_rounds[i], "Average"];
        for (j=0; j < tippers_no; j++) {
            var k;
            var max = round_tips.length;
            game_team = "";
            game_score = 0;
            for (k=1; k < max; k++) {
                var game_no = j+1;
                if (round_tips[k][2*game_no] === game_team) {
                    game_score = game_score + round_tips[k][(2*game_no) + 1];
                } else {
                    game_score = game_score - round_tips[k][(2*game_no) + 1];
                    if (game_score <= 0) {
                        game_team = round_tips[k][2*game_no];
                        game_score = game_score * -1;
                    }
                }
            }
            game_average = Math.round(game_score/(max-1));
            average_tips.push(game_team);
            average_tips.push(game_average);
        }
        var round_no = (average_tips.length - 2)/2;
        for (j=0; j < round_no; j++) {
            var risk_score;
            var risk_score_against;
            var game_no = j+1;
            if (current_round[2*game_no] === average_tips[2*game_no]) {
                risk_score = Math.abs(current_round[(2*game_no) + 1] - average_tips[(2*game_no) + 1]);
            } else {
                risk_score = current_round[(2*game_no) + 1] + average_tips[(2*game_no) + 1];
            }
            if (current_round[2*game_no] === average_tips[2*game_no]) {
                risk_score_against = Math.abs(opponent_round[(2*game_no) + 1] - average_tips[(2*game_no) + 1]);
            } else {
                risk_score_against = opponent_round[(2*game_no) + 1] + average_tips[(2*game_no) + 1];
            }
            risk_count = risk_count + risk_score;
            risk_against = risk_against + risk_score_against;
            game_count++;
        }
    }
    $("td#risk_tot_season").html(risk_count);
    $("td#risk_rnd_season").html(Math.round(10*(risk_count/len))/10);
    $("td#risk_gme_season").html(Math.round(10*(risk_count/game_count))/10);
    $("td#risk_against_tot_season").html(risk_against);
    $("td#risk_against_rnd_season").html(Math.round(10*(risk_against/len))/10);
    $("td#risk_against_gme_season").html(Math.round(10*(risk_against/game_count))/10);

    // find risk for last round
    len = access_rounds.length;
    var risk_count = 0;
    var game_count = 0;
    for (i=len-1; i < len; i++) {
        var current_round = find_player_tip_from_round(access_rounds[i], player_name, tipping_data.tips);
        var round_tips = find_round_tips(access_rounds[i], tipping_data.tips);
        var tippers_no = (round_tips[0].length - 8)/2;
        var j;
        var average_tips = [access_rounds[i], "Average"];
        for (j=0; j < tippers_no; j++) {
            var k;
            var max = round_tips.length;
            game_team = "";
            game_score = 0;
            for (k=1; k < max; k++) {
                var game_no = j+1;
                if (round_tips[k][2*game_no] === game_team) {
                    game_score = game_score + round_tips[k][(2*game_no) + 1];
                } else {
                    game_score = game_score - round_tips[k][(2*game_no) + 1];
                    if (game_score <= 0) {
                        game_team = round_tips[k][2*game_no];
                        game_score = game_score * -1;
                    }
                }
            }
            game_average = Math.round(game_score/(max-1));
            average_tips.push(game_team);
            average_tips.push(game_average);
        }
        var round_no = (average_tips.length - 2)/2;
        for (j=0; j < round_no; j++) {
            var risk_score;
            var game_no = j+1;
            if (current_round[2*game_no] === average_tips[2*game_no]) {
                risk_score = Math.abs(current_round[(2*game_no) + 1] - average_tips[(2*game_no) + 1]);
            } else {
                risk_score = current_round[(2*game_no) + 1] + average_tips[(2*game_no) + 1];
            }
            risk_count = risk_count + risk_score;
            game_count++;
        }
    }
    $("td#risk_tot_last1").html(risk_count);
    $("td#risk_rnd_last1").html(Math.round(10*(risk_count))/10);
    $("td#risk_gme_last1").html(Math.round(10*(risk_count/game_count))/10);

    // find risk for last 3
    var excess = 0;
    len = access_rounds.length;
    var risk_count = 0;
    var game_count = 0;
    for (i=len-3; i < len; i++) {
        if (i < 0) {
            excess = i*-1;
            i = 0;
        }
        var current_round = find_player_tip_from_round(access_rounds[i], player_name, tipping_data.tips);
        var round_tips = find_round_tips(access_rounds[i], tipping_data.tips);
        var tippers_no = (round_tips[0].length - 8)/2;
        var j;
        var average_tips = [access_rounds[i], "Average"];
        for (j=0; j < tippers_no; j++) {
            var k;
            var max = round_tips.length;
            game_team = "";
            game_score = 0;
            for (k=1; k < max; k++) {
                var game_no = j+1;
                if (round_tips[k][2*game_no] === game_team) {
                    game_score = game_score + round_tips[k][(2*game_no) + 1];
                } else {
                    game_score = game_score - round_tips[k][(2*game_no) + 1];
                    if (game_score <= 0) {
                        game_team = round_tips[k][2*game_no];
                        game_score = game_score * -1;
                    }
                }
            }
            game_average = Math.round(game_score/(max-1));
            average_tips.push(game_team);
            average_tips.push(game_average);
        }
        var round_no = (average_tips.length - 2)/2;
        for (j=0; j < round_no; j++) {
            var risk_score;
            var game_no = j+1;
            if (current_round[2*game_no] === average_tips[2*game_no]) {
                risk_score = Math.abs(current_round[(2*game_no) + 1] - average_tips[(2*game_no) + 1]);
            } else {
                risk_score = current_round[(2*game_no) + 1] + average_tips[(2*game_no) + 1];
            }
            risk_count = risk_count + risk_score;
            game_count++;
        }
    }
    $("td#risk_tot_last3").html(risk_count);
    $("td#risk_rnd_last3").html(Math.round(10*(risk_count/(3-excess)))/10);
    $("td#risk_gme_last3").html(Math.round(10*(risk_count/game_count))/10);

    // find risk for last 5
    var excess = 0;
    len = access_rounds.length;
    var risk_count = 0;
    var game_count = 0;
    for (i=len-5; i < len; i++) {
        if (i < 0) {
            excess = i*-1;
            i = 0;
        }
        var current_round = find_player_tip_from_round(access_rounds[i], player_name, tipping_data.tips);
        var round_tips = find_round_tips(access_rounds[i], tipping_data.tips);
        var tippers_no = (round_tips[0].length - 8)/2;
        var j;
        var average_tips = [access_rounds[i], "Average"];
        for (j=0; j < tippers_no; j++) {
            var k;
            var max = round_tips.length;
            game_team = "";
            game_score = 0;
            for (k=1; k < max; k++) {
                var game_no = j+1;
                if (round_tips[k][2*game_no] === game_team) {
                    game_score = game_score + round_tips[k][(2*game_no) + 1];
                } else {
                    game_score = game_score - round_tips[k][(2*game_no) + 1];
                    if (game_score <= 0) {
                        game_team = round_tips[k][2*game_no];
                        game_score = game_score * -1;
                    }
                }
            }
            game_average = Math.round(game_score/(max-1));
            average_tips.push(game_team);
            average_tips.push(game_average);
        }
        var round_no = (average_tips.length - 2)/2;
        for (j=0; j < round_no; j++) {
            var risk_score;
            var game_no = j+1;
            if (current_round[2*game_no] === average_tips[2*game_no]) {
                risk_score = Math.abs(current_round[(2*game_no) + 1] - average_tips[(2*game_no) + 1]);
            } else {
                risk_score = current_round[(2*game_no) + 1] + average_tips[(2*game_no) + 1];
            }
            risk_count = risk_count + risk_score;
            game_count++;
        }
    }
    $("td#risk_tot_last5").html(risk_count);
    $("td#risk_rnd_last5").html(Math.round(10*(risk_count/(5-excess)))/10);
    $("td#risk_gme_last5").html(Math.round(10*(risk_count/game_count))/10);

    // find biases
    $("table#tbl_bias tbody tr").each(function() {
        var team = $(this).find("div.team_icon").attr("id");
        var team_cap = team.toUpperCase();
        len = access_rounds.length;
        var errorteam_tot = 0;
        var tip_tot = 0;
        var for_tot = 0;
        var right_tot = 0;
        var bias_tot = 0;
        var errorbias_tot = 0;
        var count = 0;
        var errorteam_sos = 0;
        var tip_sos = 0;
        var bias_sos = 0;
        var errorbias_sos = 0;
        for (i=0; i < len; i++) {
            var fix_in_round = find_round_tips(access_rounds[i], afl_data.fixtures);
            var current_round = find_player_tip_from_round(access_rounds[i], player_name, tipping_data.tips);
            var results = find_player_tip_from_round(access_rounds[i], tipping_data.admin, tipping_data.tips);
            var round_tips = find_round_tips(access_rounds[i], tipping_data.tips);
            var tippers_no = (round_tips[0].length - 8)/2;
            var j;
            var average_tips = [access_rounds[i], "Average"];
            for (j=0; j < tippers_no; j++) {
                var k;
                var max = round_tips.length;
                game_team = "";
                game_score = 0;
                for (k=1; k < max; k++) {
                    var game_no = j+1;
                    if (round_tips[k][2*game_no] === game_team) {
                        game_score = game_score + round_tips[k][(2*game_no) + 1];
                    } else {
                        game_score = game_score - round_tips[k][(2*game_no) + 1];
                        if (game_score <= 0) {
                            game_team = round_tips[k][2*game_no];
                            game_score = game_score * -1;
                        }
                    }
                }
                game_average = Math.round(game_score/(max-1));
                average_tips.push(game_team);
                average_tips.push(game_average);
            }

            var fix_length = fix_in_round.length;
            for (j=0; j < fix_length; j++) {
                var bool_playing = 0;
                if (team_cap === fix_in_round[j][1]) {
                    bool_playing = 1;
                } else if (team_cap === fix_in_round[j][2]) {
                    bool_playing = 1;
                }
                if (bool_playing == 1) {
                    var result_team = results[j*2+2];
                    var player_team = current_round[j*2+2];
                    var average_team = average_tips[j*2+2];
                    var result_margin = results[j*2+3];
                    var player_margin = current_round[j*2+3];
                    var average_margin = average_tips[j*2+3];
                    if (result_team !== team_cap) {
                        result_margin = result_margin * -1;
                    }
                    if (player_team !== team_cap) {
                        player_margin = player_margin * -1;
                    } else if (player_margin != 0) {
                        for_tot = for_tot + 1;
                    }
                    if (player_margin ==0) {
                        for_tot = for_tot + 0.5;
                    }
                        
                    if (player_team === result_team) {
                        right_tot ++;
                    } else if ((player_margin == 0) && (result_margin == 0)) {
                        right_tot ++;
                    }
                    if (average_team !== team_cap) {
                        average_margin = average_margin * -1;
                    }
                    var error_amount = player_margin - result_margin;
                    if (error_amount < 0) {
                        error_amount = error_amount * -1;
                    }
                    errorteam_tot = errorteam_tot + error_amount;
                    tip_tot = tip_tot + player_margin;
                    bias_tot = bias_tot + (player_margin - average_margin);
                    errorbias_tot = errorbias_tot + (player_margin - result_margin);
                    count++;
                    errorteam_sos = errorteam_sos + (error_amount*error_amount);
                    tip_sos = tip_sos + (player_margin*player_margin);
                    bias_sos = bias_sos + (player_margin - average_margin)*(player_margin - average_margin);
                    errorbias_sos = errorbias_sos + (player_margin - result_margin)*(player_margin - result_margin);  
                }
            }


        }
        $("td#bias_" + team + "_avtip").html(Math.round(tip_tot/count));
        $("td#bias_" + team + "_avtip_sd").html(Math.round(Math.sqrt(tip_sos/count - (tip_tot/count)*(tip_tot/count))*100)/100);
        $("td#bias_" + team + "_for").html(Math.round(for_tot*100/count) + "%");
        $("td#bias_" + team + "_right").html(Math.round(right_tot*100/count) + "%");
        $("td#bias_" + team + "_bias").html(Math.round(bias_tot*10/count)/10);
        $("td#bias_" + team + "_bias_sd").html(Math.round(Math.sqrt(bias_sos/count - (bias_tot/count)*(bias_tot/count))*100)/100);
        $("td#bias_" + team + "_error").html(Math.round(errorbias_tot*10/count)/10);
        $("td#bias_" + team + "_error_sd").html(Math.round(Math.sqrt(errorbias_sos/count - (errorbias_tot/count)*(errorbias_tot/count))*100)/100);
        $("td#errorteam_" + team).html(Math.round(errorteam_tot*10/count)/10);
        $("td#errorteam_" + team + "_sd").html(Math.round(Math.sqrt(errorteam_sos/count - (errorteam_tot/count)*(errorteam_tot/count))*100)/100);
    });

    // find risk
    len = access_rounds.length;
    var bonus_disp = 0;
    var bonus_disp_against = 0;
    var bonus_score = 0;
    var bonus_score_against = 0;
    var bonus_disp_count = 0;
    var bonus_disp_count_against = 0;
    var bonus_score_count = 0;
    var bonus_score_count_against = 0;
    var perfect_disp = 0;
    var perfect_disp_against = 0;
    var perfect_score = 0;
    var perfect_score_against = 0;
    var game_count = 0;
    for (i=0; i < len; i++) {
        var current_round = find_player_tip_from_round(access_rounds[i], player_name, tipping_data.tips);
        var current_admin = find_player_tip_from_round(access_rounds[i], tipping_data.admin, tipping_data.tips);
        if (player_name === "Administrator") {
            var opponent = "Administrator";
        } else {
            var opponent = get_opponent(player_name, access_rounds[i], tipping_data.fixtures);
        }
        var opponent_round = find_player_tip_from_round(access_rounds[i], opponent, tipping_data.tips);
        var round_disp = current_round[current_round.length - 5];
        var admin_disp = current_admin[current_admin.length - 5];
        var opp_disp = opponent_round[opponent_round.length - 5];
        if (Number.isInteger(round_disp)) {
            bonus_disp = bonus_disp + round_disp;
            bonus_disp_count ++;
            if (round_disp === admin_disp) {
                perfect_disp ++;
            }
        }
        if (Number.isInteger(opp_disp)) {
            bonus_disp_against = bonus_disp_against + opp_disp;
            bonus_disp_count_against ++;
            if (opp_disp === admin_disp) {
                perfect_disp_against ++;
            }
        }
        var round_score = current_round[current_round.length - 3];
        var admin_score = current_admin[current_round.length - 3];
        var opp_score = opponent_round[opponent_round.length - 3];
        if (Number.isInteger(round_score)) {
            bonus_score = bonus_score + round_score;
            bonus_score_count ++;
            if (round_score === admin_score) {
                perfect_score ++;
            }
        }
        if (Number.isInteger(opp_score)) {
            bonus_score_against = bonus_score_against + opp_score;
            bonus_score_count_against ++;
            if (opp_score === admin_score) {
                perfect_score_against ++;
            }
        }
    }
    $("td#bonus_tot").html(bonus_disp + bonus_score);
    $("td#bonus_disp").html(bonus_disp);
    $("td#bonus_score").html(bonus_score);
    $("td#bonus_tot_num").html(bonus_disp_count + bonus_score_count);
    $("td#bonus_disp_num").html(bonus_disp_count);
    $("td#bonus_score_num").html(bonus_score_count);
    $("td#bonus_tot_avg").html(Math.round((bonus_disp + bonus_score)*100/(bonus_disp_count + bonus_score_count))/100);
    $("td#bonus_disp_avg").html(Math.round(bonus_disp*100/bonus_disp_count)/100);
    $("td#bonus_score_avg").html(Math.round(bonus_score*100/bonus_score_count)/100);
    $("td#bonus_tot_perf").html(perfect_disp + perfect_score);
    $("td#bonus_disp_perf").html(perfect_disp);
    $("td#bonus_score_perf").html(perfect_score);
    $("td#bonus_tot_against").html(bonus_disp_against + bonus_score_against);
    $("td#bonus_disp_against").html(bonus_disp_against);
    $("td#bonus_score_against").html(bonus_score_against);
    $("td#bonus_tot_num_against").html(bonus_disp_count_against + bonus_score_count_against);
    $("td#bonus_disp_num_against").html(bonus_disp_count_against);
    $("td#bonus_score_num_against").html(bonus_score_count_against);
    $("td#bonus_tot_avg_against").html(Math.round((bonus_disp_against + bonus_score_against)*100/(bonus_disp_count_against + bonus_score_count_against))/100);
    $("td#bonus_disp_avg_against").html(Math.round(bonus_disp_against*100/bonus_disp_count_against)/100);
    $("td#bonus_score_avg_against").html(Math.round(bonus_score_against*100/bonus_score_count_against)/100);
    $("td#bonus_tot_perf_against").html(perfect_disp_against + perfect_score_against);
    $("td#bonus_disp_perf_against").html(perfect_disp_against);
    $("td#bonus_score_perf_against").html(perfect_score_against);

    // ladder predictions
    var len = ladder_data.tips.length;
    var ladder_error = 0;
    var ladder_improvement = 0;
    var ladder_favouritism_error = 0;
    var admin_ladder = ladder_data.tips[0];
    for (i=0; i < len; i++) {
        if (ladder_data.tips[i][0] === player_name) {
            var ladder = ladder_data.tips[i];
            var leng = ladder.length;
            for (j=1; j < leng; j++) {
                var current_team = ladder[j];
                var team_lower = current_team.toLowerCase();
                $("td div.ladder_" + j).attr("id", team_lower);
                var k;
                var current_error = 0;
                var team_position = 0;
                for (k=1; k < leng; k++) {
                    if (admin_ladder[k] === current_team) {
                        current_error = k-j;
                        if (current_error > 0) {
                            current_error = "+" + current_error;
                        }
                        team_position = k;
                    }
                }
                var for_value = Number($("td#bias_" + team_lower + "_for").text().replace("%", ""));
                var avtip_value = Number($("td#bias_" + team_lower + "_avtip").text());
                var favouritism = 1;
                $("td.for").each(function() {
                    var compare = Number($(this).text().replace("%", ""));
                    if (compare > for_value) {
                        favouritism ++;
                    } else if (compare == for_value) {
                        var average_tip = Number($(this).parent().children('td').eq(1).text());
                        if (average_tip > avtip_value) {
                            favouritism ++;
                        }
                    }
                });
                var favouritism_error = team_position - favouritism;
                var improvement = Math.abs(current_error) - Math.abs(favouritism_error);
                if (favouritism_error > 0) {
                    favouritism_error = "+" + favouritism_error;
                }
                if (improvement > 0) {
                    improvement = "+" + improvement;
                }
                ladder_error = ladder_error + Math.abs(current_error);
                ladder_favouritism_error = ladder_favouritism_error + Math.abs(favouritism_error);
                ladder_improvement = ladder_improvement + improvement;
                $("td#ladder_error_" + j).html(current_error);
                $("td#ladder_position_" + j).html(team_position);
                $("td#ladder_favouritism_" + j).html(favouritism);
                $("td#ladder_favouritism_error_" + j).html(favouritism_error);
                $("td#ladder_improvement_" + j).html(improvement);
            }
        }
    }
    $("td#ladder_error_total").html(ladder_error);
    $("td#ladder_favouritism_error_total").html(ladder_favouritism_error);
    $("td#ladder_improvement_total").html(ladder_improvement);

}
