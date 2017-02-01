var start_dates = {
    dates: [
        ["R1", "March 23, 2017 19:20:00"],
        ["R2", "March 30, 2017 19:20:00"],
        ["R3", "April 7, 2017 19:20:00"],
        ["R4", "4", "13", "19:00"],
        ["R5", "4", "21", "19:00"],
        ["R6", "4", "28", "19:00"],
        ["R7", "5", "5", "19:00"],
        ["R8", "5", "12", "19:00"],
        ["R9", "5", "19", "19:00"],
        ["R10", "5", "26", "19:00"],
        ["B1", "6", "2", "19:00"],
        ["B2", "6", "10", "19:00"],
        ["R14", "6", "22", "19:00"],
        ["R15", "6", "30", "19:00"],
        ["R16", "7", "7", "19:00"],
        ["R17", "7", "14", "19:00"],
        ["R18", "7", "21", "19:00"],
        ["R19", "7", "28", "19:00"],
        ["R20", "8", "4", "19:00"],
        ["R21", "8", "11", "19:00"],
        ["R22", "8", "18", "19:00"]
    ]
}

function change_game_players(round_no) {
    var me = get_this_player();
    var you = get_opponent(me, round_no, tipping_data.fixtures);
    $("span#tipping_game_players").html(me + " vs " + you);
}
        
function change_counter(round_no) {
    change_game_players(round_no);
    var i;
    var dates = start_dates.dates;
    var len = dates.length;
    for (i = 0; i < len; i++) {
        if (dates[i][0] === round_no) {
            var target_date = new Date(dates[i][1]).getTime();
        }
    }
    set_up_countdown(target_date);
}

function set_up_countdown(target_date) {
    var current = new Date().getTime();
    var rem = target_date - current;
    
    clearInterval(window);
    
    function repeat() {
        if ($('span.countdown').length) {
            $('span.countdown').each(function () {
                if (rem <= 0) {
                    $(this).find('span.count_body').html('LOCKED');
                } else {
                    var current = new Date().getTime();
                    var rem = target_date - current;
                    var rem_days = Math.floor(rem / 86400000);
                    rem = rem % 86400000;
                    var rem_hours = Math.floor(rem / 3600000);
                    rem = rem % 3600000;
                    var rem_mins = Math.floor(rem / 60000);
                    rem = rem % 60000;
                    var rem_secs = Math.floor(rem / 1000);
                    
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
        
        if ($('span.count_body:contains(LOCKED)').length) {
            $('div#tipping').hide();
            $('div#locked_form').show();
        } else {
            $('div#tipping').show();
            $('div#locked_form').hide();
        }   
    }

    window.setInterval(repeat, 1000);
}

$(function () {
    change_counter(tipping_data.round);
});
