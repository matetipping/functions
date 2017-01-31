// By Cory
// http://s1.zetaboards.com/Cory/index/

function set_up_countdown() {
    $('div.countdown_div').each(function () {
        $(this).html($(this).html().replace(/\[countdown=(.+?), (\d+)\/(\d+)\/(\d+):(\d+)\]/gi, '<span class="countdown"><em style="display: none">$1: <span class="month"><span class="zero">0</span><span class="num">$2</span></span>/<span class="date"><span class="zero">0</span><span class="num">$3</span></span> <span class="hours"><span class="zero">0</span><span class="num$4">$4</span></span>:<span class="minutes"><span class="zero">0</span><span class="num">$5</span></span> <span class="period">AM</span></em><span class="count_body"><span class="c_date"></span><br>DAYS<br><span class="c_hours"></span><span class="sep">:</span><span class="c_minutes"></span><span class="sep">:</span><span class="c_seconds"></span></span></span>'));
    });

    function repeat() {
        if ($('span.countdown').length) {
            $('span.countdown').each(function () {
                if ($(this).find('span.c_hours span.num').text() === '0' && $(this).find('span.c_date span.num').text() === '0' && $(this).find('span.c_minutes span.num').text() === '0') {
                    $(this).find('span.count_body').html('<em>This countdown has ended</em>');
                } else {
                    var d = new Date();
                    var gm = d.getMonth() + 2;
                    var gd = d.getDate();
                    var gh = d.getHours();
                    var gmin = d.getMinutes();
                    var gs = 60 - d.getSeconds();
                    var emW = $(this).find('em').width();
                    var month = parseInt($(this).find('span.month span.num').text(), 10);
                    var date = parseInt($(this).find('span.date span.num').text() - gd, 10);
                    var pDate = parseInt($(this).find('span.date span.num').text(), 10);
                    var hours = parseInt($(this).find('span.hours span[class*="num"]').attr('class').split('num')[1], 10);
                    var minutes = parseInt($(this).find('span.minutes span.num').text(), 10);
                    var nMinutes = '0';
                    var nHours = '0';
                    var period;

                    $(this).find('span.sep').css({
                        'color': $(this).find('hr').css('color'),
                        'font-weight': '700'
                    });

                    var cHours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
                    var tHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

                    for (var x = 0; x < cHours.length; x++) {
                        if (gh === cHours[x]) {
                            nHours = (hours / 2) * 2 - (gh + 1);
                            nMinutes = parseInt((minutes - gmin), 10);

                            if (tHours[x] && gd < pDate || month !== gm - 1) {
                                nHours = (24 - gh) + (hours - 1);
                            }

                            if (gmin > minutes) {
                                nMinutes = (60 - gmin) + minutes;
                            }

                            if (tHours[x] >= hours - 1 && hours) {
                                nHours = '0';
                                if (gmin > minutes) {
                                    nMinutes = '0';
                                }
                            }

                            if (tHours[x] > hours && gd === pDate) {
                                nMinutes = '0';
                            }

                            if (gm - 1 === month && gd > pDate || month < gm - 1) {
                                nHours = '0';
                                nMinutes = '0';
                            }

                            if (nHours >= 24) {
                                nHours = nHours - 24;
                            }
                        }
                    }

                    if (hours >= 12) {
                        period = 'PM';
                    }

                    $(this).find('span.period').text(period);
                    $(this).find('hr').width(emW);
                    $(this).find('span.c_date').html('<span class="zero">0</span>' + '<span class="num">' + date + '</span>');
                    $(this).find('span.c_hours').html('<span class="zero">0</span>' + '<span class="num">' + nHours + '</span>');
                    $(this).find('span.c_minutes').html('<span class="zero">0</span>' + '<span class="num">' + nMinutes + '</span>');
                    $(this).find('span.c_seconds').html('<span class="zero">0</span>' + '<span class="num">' + gs + '</span>');

                    if ($(this).find('span.c_minutes span.num').text() === 0) {
                        var nHour = parseInt($(this).find('span.c_hours span.num').text() + 1, 10);
                        $(this).find('span.c_hours span.num').text(nHour);
                    }

                    if ($(this).find('span.month span.num').text() !== gm - 1) {
                        var mDiff = parseInt($(this).find('span.month span.num').text() - gm, 10);
                        var tDays = parseInt(30.4368 * mDiff, 10);
                        var dDays = parseInt(30.4368 - gd, 10);
                        var cDays = parseInt($(this).find('span.date span.num').text(), 10);
                        var tDate = parseInt(cDays + tDays + dDays, 10);
                        $(this).find('span.c_date').html('<span class="zero">0</span>' + '<span class="num">' + tDate + '</span>');
                    }

                    if (hours === 0 || hours === 12 && $(this).find('span.c_date span.num').text() > '0') {
                        var cDate = parseInt($(this).find('span.c_date').text(), 10);
                        var nDate = cDate - 1;
                        $(this).find('span.c_date').text(nDate);
                    }

                    $('span.zero').each(function () {
                        if ($(this).next('span[class*="num"]').text().length > 1) {
                            $(this).hide();
                        }

                        if (parseInt($(this).next('span[class*="num"]').text(), 10) < 0) {
                            $(this).next('span[class*="num"]').text('0');
                        }
                    });
                }
            });
        }    
        if ($('span.count_body:contains(This countdown has ended)').length && $('select#tipping_roundselector').val() === tipping_data.round) {
            $('div#tipping').hide();
            $('div#locked_form').show();
        } else {
            $('div#tipping').show();
            $('div#locked_form').hide();
        }   
    }

    window.setInterval(repeat, 1000);
    
    function changeText(className, number) {
        $('span.countdown').each(function () {
            if ($(this).find('span.hours span[class*="num"]').attr('class') === className) {
                $(this).find('span.hours span[class*="num"]').text(number);
            }
        });
    }

    changeText('num13', '1');
    changeText('num14', '2');
    changeText('num15', '3');
    changeText('num16', '4');
    changeText('num17', '5');
    changeText('num18', '6');
    changeText('num19', '7');
    changeText('num20', '8');
    changeText('num21', '9');
    changeText('num22', '10');
    changeText('num23', '11');
    changeText('num0', '12');
}

$(function () {
    set_up_countdown();
});
