//<![CDATA[
var awards = {
    start: function() {
        if (location.href.match(/\/profile\/\d+\/?/)) {
            for (var a = 0; a < t_award.users.length; a++) {
                awards.present(a);
            }
        } else if (location.href.match(/\/topic\/\d+\/?/)){
            for (var a=0; a<t_award.users.length; a++){
                awards.present(a);
            }
        }
	for (var i=0; i<100; i++) {
	    var current = $("marquee#card_marquee").html();
	    $("marquee#card_marquee").html(current + '<img src="http://b3.ifrm.com/30609/91/0/p3009204/card_0_default.png" alt="Default Card" width="' + t_award.thumbnail[0] + 'px" height="' + t_award.thumbnail[1] + 'px" />');
	}
	for (var a=0; a<t_award.users.length; a++){
            awards.marquee(a);
        }
    },
    present: function(a) {
        var award = t_award.users[a];
        if ($("." + award[0] + "-awards").size() === 0 && location.href.indexOf('/profile/' + award[0] + '/') !== -1) {
            $("dl.user_info dd.spacer").before('<dt>' + t_award.name + ':</dt><dd class="' + award[0] + '-awards"><img onmouseover="awards.tooltip.open(event,' + a + ');" onmouseout="awards.tooltip.bye(' + a + ');" id="' + a + '-award" src="' + award[2] + '" alt="' + award[1] + '" width="' + t_award.thumbnail[0] + 'px" height="' + t_award.thumbnail[1] + 'px" /></dd>');
        } else if ($("." + award[0] + "-awards").size() === 0) {
	    $("a.member[href=" + main_url + "profile/" + award[0] + "/]").parent().parent().next().find("dl.user_info dd.spacer").before('<dt>' + t_award.name + ':</dt><dd class="' + award[0] + '-awards"><img onmouseover="awards.tooltip.open(event,' + a + ');" onmouseout="awards.tooltip.bye(' + a + ');" id="' + a + '-award" src="' + award[2] + '" alt="' + award[1] + '" width="' + t_award.thumbnail[0] + 'px" height="' + t_award.thumbnail[1] + 'px" /></dd>');
        } else {
            $("." + award[0] + "-awards").append('<img onmouseover="awards.tooltip.open(event,' + a + ');" onmouseout="awards.tooltip.bye(' + a + ');" id="' + a + '-award" src="' + award[2] + '" alt="' + award[1] + '" width="' + t_award.thumbnail[0] + 'px" height="' + t_award.thumbnail[1] + 'px" />');
        }
    },
    marquee: function(a) {
        var award = t_award.users[a];
	if ($("div#top strong a").attr("href").indexOf('/profile/' + award[0] + '/') !== -1) {
	    var c_num = award[1].split(" ");
	    $("marquee#card_marquee img")[c_num - 1].replaceWith('<img onmouseover="awards.tooltip.open(event,' + a + ');" onmouseout="awards.tooltip.bye(' + a + ');" id="' + a + '-award" src="' + award[2] + '" alt="' + award[1] + '" width="' + t_award.thumbnail[0] + 'px" height="' + t_award.thumbnail[1] + 'px" />');
	}
    },
    tooltip: {
        current: 0,
        open: function(event, a) {
            var award = t_award.users[a];
            var pos = awards.mouse.locate(event);
            awards.tooltip.coords = [pos[0], pos[1]];
            if ($("#" + a + "-tooltip").size() === 0) $("body").append('<div id="' + a + '-tooltip" style="position:absolute;max-width:500px; background: #08141E; border-radius: 20px; box-shadow: 0px 0px 1px #000; border: 1px solid #ED6030; color: #C3C9D7;"><table><tbody><tr><td style="padding: 0px;"><img src="' + award[2] + '" alt="' + award[1] + '" /></td><td>' + award[1] + '<hr />' + award[3] + '<hr /><strong>Received:</strong> ' + award[4] + '</td></tr></tbody></table></div>');
            var elem = document.getElementById(a + "-tooltip");
            elem.style.left = pos[0] + 10 + "px";
            elem.style.top = pos[1] - 250 + "px";
            awards.tooltip.current = a;
            document.onmousemove = awards.tooltip.update;
        },
        update: function(event) {
            var pos = awards.mouse.locate(event);
            var elem = document.getElementById(awards.tooltip.current + "-tooltip");
            if (elem !== null) {
                elem.style.left = pos[0] + 10 + "px";
                elem.style.top = pos[1] - 250 + "px";
            } else {
                document.onmousemove = null;
            }
        },
        bye: function(a) {
            switch (t_award.closeFunction) {
                case "slide":
                    $("#" + a + "-tooltip").slideToggle("fast", function() {
                        $(this).remove();
                    });
                    break;
                case "fade":
                    $("#" + a + "-tooltip").fadeOut("fast", function() {
                        $(this).remove();
                    });
                    break;
                default:
                    $("#" + a + "-tooltip").remove();
                    break;
            }
        }
    },
    mouse: {
        locate: function(event) {
            e = event || window.event;
            coords = [0, 0];
            if (e.pageX || e.pageY) {
                coords = [e.pageX, e.pageY];
            } else {
                var de = document.documentElement;
                var b = document.body;
                coords = [e.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0), e.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0)];
            }
            return coords;
        }
    }
};
awards.start();
//]]>
