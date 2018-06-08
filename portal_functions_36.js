/* Form script by Reid of ZNR (resources.zetaboards.com)
Keep this copyright in place
Feel free to edit/redistribute */

if (form_script.form_id.length) {
    var i;
    var leng = tipping_data.tips;
    var disp_string = "Disposals Used:\n";
    var scorer_string = "Scorers Used:\n";
    for (i = 0; i < leng; i++) {
        if (tipping_data.tips[i][0] == get_this_player() && typeof(tipping_data.tips[i][tipping_data.tips[i].length - 5]) == "number")) {
            disp_string = disp_string + tipping_data.tips[i][tipping_data.tips[i].length - 6] + "\n";
        }
        if (tipping_data.tips[i][0] == get_this_player() && typeof(tipping_data.tips[i][tipping_data.tips[i].length - 3]) == "number")) {
            scorer_string = scorer_string + tipping_data.tips[i][tipping_data.tips[i].length - 4] + "\n";
        }
    }
    $("div.disposals_used").text(disp_string);
    $("div.scorers_used").text(scorer_string);
    form_script.form_id.submit(function (e) {
        e.returnValue = (e.preventDefault && e.preventDefault()) && false;

        var f = form_script, sent = [0, 0], fields_orig = [], logged_in = !!$('#top_info strong a').length, fields,
            sf = f.submission_formatting, username = $('#top_info strong a').text() || "Guest",
            get_data = function (n, d) {
                return $('input[name=' + n + ']', d).val();
            },
            special_tags = function (txt) {
                return txt.replace(/{{user_name}}/gi, username).replace(/{{(\d+)}}/gi, function (t, i) {
                    return fields_orig[(i - 1) + 'a'];
                }).replace(/{{form}}/gi, fields).replace(/{{n}}/gi, "\n");
            };

                
        if (!f.enable_guests && !logged_in) {
            f.status_id.html(f.statuses.not_logged_in);
            return;
        }

        f.status_id.html(f.statuses.first);

        f.specific_id.find('tr').each(function () {
            var t = this.getElementsByTagName('td');
            // The second td should have one child, the element to enter data, and the first should have none -- solely text
            if (t.length === 2 && $(t[1]).children().length === 1 && $(t[0]).children().length === 0) {
                var x = $(t[1]).find(f.possible_elements).val();
                fields_orig[fields_orig.length] = sf.before_question + t[0].innerHTML + sf.after_question + sf.separator + sf.before_response + x + sf.after_response;
                fields_orig[(fields_orig.length - 1) + 'a'] = x;
            }
        });

        fields = sf.before_all + fields_orig.join('\n') + sf.after_all;

        // Take care special tags like {{user_name}}, {{form}}, {{0}}
        for (var i in f) {
            if (f.hasOwnProperty(i)) {
                if (typeof f[i] === 'string') {
                    f[i] = special_tags(f[i]);
                } else if (f[i] instanceof Object) {
                    for (var j in f[i]) {
                        if (f[i].hasOwnProperty(j) && typeof f[i][j] === 'string') {
                            f[i][j] = special_tags(f[i][j]);
                        }
                    }
                }
            }
        }

        if (f.pm.enabled && logged_in) {
            f.status_id.html(f.statuses.first);
            $.get(main_url + 'msg/?c=2', function (d) {
                f.status_id.html(f.statuses.second);
                $.post(main_url + 'msg/?c=3&sd=1', {
                    xc: get_data('xc', d),
                    msg: 0,
                    convo: 0,
                    fwd: 0,
                    draft_edit: 0,
                    secure: get_data('secure', d),
                    name: f.pm.user,
                    title: f.pm.title,
                    post: f.pm.content || fields
                }, function () {
                    // Make sure the topic has sent as well
                    sent[0] = 1;
                    if (sent[1]) {
                        f.status_id.html(f.statuses.done);
                        var rURL = 'http://www.matetipping.com/forum/3204546/';
                        location.href = rURL;
                    }
                });
            });
        } else {
            sent[0] = 1;
        }

        if (f.topic.enabled) {
            f.status_id.html(f.statuses.first);
            $.get(main_url + 'post/?type=1&mode=1&f=' + f.topic.forum_id, function (d) {
                f.status_id.html(f.statuses.second);

                var callback = function (external_options) {
                    $.post(main_url + 'post/', $.extend({
                        xc: get_data('xc', d),
                        ast: get_data('ast', d),
                        mode: 1,
                        type: 1,
                        f: f.topic.forum_id,
                        sd: 1,
                        description: f.topic.description,
                        title: f.topic.title,
                        name: username, // Guest posting
                        post: f.topic.content || fields
                    }, external_options), function (g) {
                        sent[1] = 1;
                        if (sent[0]) {
                            f.status_id.html(f.statuses.done);
                            var rURL = 'http://www.matetipping.com/forum/3204546/';
                            location.href = rURL;
                        }
                    });
                };

                // Make guest posting work; it's quite the chore
                if (logged_in) {
                    callback();
                } else {
                    var opt = {
                        name: username,
                        mode: 1,
                        type: 1,
                        ast: get_data('ast', d),
                        f: f.topic.forum_id,
                        sd: 2,
                        id: get_data('id', d),
                        key: get_data('key', d)
                    };
                    $.post(main_url + 'post/', opt, function (h) {
                        callback($.extend(opt, {
                           meta_time: get_data('meta_time', h),
                           meta_diff: get_data('meta_diff', h),
                           meta_tz: get_data('meta_tz', h),
                           meta_plug: get_data('meta_plug', h),
                           meta_x: get_data('meta_x', h), // screen.width, it seems
                           meta_y: get_data('meta_y', h), // screen.height
                           r2: get_data('r2', h),
                           sd: 1,
                           setskin: get_data('setskin', h)
                        }));
                    });
                }
            });
        } else {
            sent[1] = 1;
        }
    });
}

// sets the number of remaining bonus tips on the portal page.
function set_bonus_remaining(player_name) {
    var round_number = $("select#tipping_roundselector").val();
    if ((round_number === "F1") || (round_number === "F2") || (round_number === "F3")) {
        $("tr.finals").remove();
        $("h4#tipping_remaining_disp").remove();
        $("h4#tipping_remaining_scor").remove();
    } else if (round_number === "F4") {
        $("tr.grandfinal").remove();
        $("h4#tipping_remaining_disp").remove();
        $("h4#tipping_remaining_scor").remove();
        $("label.tipping_checklbl").replaceWith($("label.tipping_checklbl").html());
    } else {
        var bonuses = get_bonus_tip_count(player_name);
        var count_disp = bonuses[0];
        var count_scor = bonuses[1];
        $("h4#tipping_remaining_disp").html(count_disp + "/8 used:");
        $("h4#tipping_remaining_scor").html(count_scor + "/8 used:");
        $("tr.homeaway").remove();
        if (count_disp >= 8) {
            $("input#tipping_player_disposals").parents('tr').hide();
        }
        if (count_scor >= 8) {
            $("input#tipping_player_scorer").parents('tr').hide();
        }
    }
}

// sets a particular match (game i) with match details.
function set_match(i, match_dets) {
    var team_a = match_dets[1];
    var team_b = match_dets[2];
    var low_a = team_a.toLowerCase();
    var low_b = team_b.toLowerCase();
    var long_a = to_longname(team_a);
    var long_b = to_longname(team_b);
    var venue = match_dets[3];
    $("h3#tipping_matchname_" + i).html(team_a + " v " + team_b);
    $("h3#tipping_venue_" + i).html(venue);
    $("option#tipping_teama_" + i).html(long_a);
    $("option#tipping_teamb_" + i).html(long_b);
    $("option#tipping_teama_" + i).val(team_a);
    $("option#tipping_teamb_" + i).val(team_b);
    $("span#tipping_imagea_" + i + " div.team_block").attr("id", low_a);
    $("span#tipping_imageb_" + i + " div.team_block").attr("id", low_b);
}

// converts a given shortname to the full club name.
function to_longname(shortname) {
    var longname = "";
    switch(shortname) {
        case "ADE":
            longname = "Adelaide Crows";
            break;
        case "BRI":
            longname = "Brisbane Lions";
            break;
        case "CAR":
            longname = "Carlton Blues";
            break;
        case "COL":
            longname = "Collingwood Magpies";
            break;
        case "ESS":
            longname = "Essendon Bombers";
            break;
        case "FRE":
            longname = "Fremantle Dockers";
            break;
        case "GEE":
            longname = "Geelong Cats";
            break;
        case "GCS":
            longname = "Gold Coast Suns";
            break;
        case "GWS":
            longname = "GWS Giants";
            break;
        case "HAW":
            longname = "Hawthorn Hawks";
            break;
        case "MEL":
            longname = "Melbourne Demons";
            break;
        case "NTH":
            longname = "North Melbourne";
            break;
        case "PTA":
            longname = "Port Adelaide Power";
            break;
        case "RIC":
            longname = "Richmond Tigers";
            break;
        case "STK":
            longname = "St Kilda Saints";
            break;
        case "SYD":
            longname = "Sydney Swans";
            break;
        case "WCE":
            longname = "West Coast Eagles";
            break;
        default:
            longname = "Western Bulldogs";
    }
    return longname;
}

// sets all match spaces with the data for the round.
function set_all_matches(round_no) {
    var round_title = "";
    var is_r = round_no.indexOf("R");
    var is_b = round_no.indexOf("B");
    if (is_r == 0) {
        round_title = "Round ";
        var round_number = round_no.substring(1);
        var round_title = round_title.concat(round_number);
    } else if (is_b == 0) {
        round_title = "Bye Round ";
        var round_number = round_no.substring(1);
        var round_title = round_title.concat(round_number);
    } else if (round_no === "F1") {
        round_title = "Finals 1";
    } else if (round_no === "F2") {
        round_title = "Semi-Finals";
    } else if (round_no === "F3") {
        round_title = "Preliminary Final";
    } else {
        round_title = "Grand Final";
    }
    round_title = round_title.concat(" Tipping");
    
    $("h2#tipping_roundtitle").html(round_title);
    $("input#tipping_roundname").val(round_title);
    $("input#tipping_roundnum").val(round_no);
    
    var fixtures = find_round_tips(round_no, afl_data.fixtures);
    var i;
    var len = fixtures.length;
    for (i = 0; i < len; i++) {
        set_match(i, fixtures[i]);
    }
}

// changes the players in a match when the round is changed.
function change_game_players(round_no) {
    var me = get_this_player();
    var you = get_opponent(me, round_no, tipping_data.fixtures);
    $("span#tipping_game_players").html(me + " vs " + you);
}
        
// changes the counter when the round is changed.
function change_counter(round_no) {
    change_game_players(round_no);
    var i;
    var dates = afl_data.dates;
    var len = dates.length;
    for (i = 0; i < len; i++) {
        if (dates[i][0] === round_no) {
            var target_date = new Date(dates[i][1]).getTime();
        }
    }
    set_up_countdown(target_date);
}

// sets up a new countdown with a given target date
function set_up_countdown(target_date) {
    clearInterval(afl_data.repeater);
    repeat();
    afl_data.repeater = setInterval(repeat, 1000);
    
    function repeat() {
        if ($('span.countdown').length) {
            $('span.countdown').each(function () {
                var current = new Date().getTime();
                var rem = target_date - current;
                if (rem < 0) {
                    $(this).find('span.count_body').hide();
                    $('div#tipping').hide();
                    $('div#locked_form').show();
                } else {
                    var rem_days = Math.floor(rem / 86400000);
                    rem = rem % 86400000;
                    var rem_hours = Math.floor(rem / 3600000);
                    rem = rem % 3600000;
                    var rem_mins = Math.floor(rem / 60000);
                    rem = rem % 60000;
                    var rem_secs = Math.floor(rem / 1000);
                    
                    $(this).find('span.count_body').show();
                    $('div#tipping').show();
                    $('div#locked_form').hide();
                    
                    $(this).find('span.c_days').html(rem_days);
                    
                    if (rem_hours < 10) {
                        $(this).find('span.c_hours').html('0' + rem_hours);
                    } else {
                        $(this).find('span.c_hours').html(rem_hours);
                    }
                    
                    if (rem_mins < 10) {
                        $(this).find('span.c_minutes').html('0' + rem_mins);
                    } else {
                        $(this).find('span.c_minutes').html(rem_mins);
                    }
                    
                    if (rem_secs < 10) {
                        $(this).find('span.c_seconds').html('0' + rem_secs);
                    } else {
                        $(this).find('span.c_seconds').html(rem_secs);
                    }
                }
            });            
        }
    }
}

$(function () {
    $("select#tipping_roundselector").val(tipping_data.round);
    set_all_matches(tipping_data.round);
    set_bonus_remaining(get_this_player());
    change_counter(tipping_data.round);
});
