// Created by Viral of Viral's Modifications - http://viralsmods.com
(function() {
	var awards = {
		start : function(){
			if(location.href.match(/\/topic\/\d+\/?/)){
				for(var a=0;a<t_award.users.length;a++){
					awards.present(a);
				}
			}
      if (location.href.match(/\/profile\/\d+\/?/)) {
            for (var a = 0; a < t_award.users.length; a++) {
                awards.present(a);
            }
        }
    },
		present : function(a){
			var award = t_award.users[a];
      if ($("." + award[0] + "-awards").size() === 0 && location.href.indexOf('/profile/' + award[0] + '/') !== -1) {
          $("dl.user_info dd.spacer").before('<dt>' + t_award.name + ':</dt><dd class="' + award[0] + '-awards"><img onmouseover="awards.tooltip.open(event,' + a + ');" onmouseout="awards.tooltip.bye(' + a + ');" id="' + a + '-award" src="' + award[2] + '" alt="' + award[1] + '" width="' + t_award.thumbnail[0] + 'px" height="' + t_award.thumbnail[1] + 'px" /></dd>');
      } else if($("."+award[0]+"-awards").size() == 0){
				  $("a.member[href="+main_url+"profile/"+award[0]+"/]").parent().parent().next().find("dl.user_info dd.spacer").before('<dt>'+t_award.name+':</dt><dd class="'+award[0]+'-awards"><img onmouseover="awards.tooltip.open(event,'+a+');" onmouseout="awards.tooltip.bye('+a+');" id="'+a+'-award" src="'+award[2]+'" alt="'+award[1]+'" width="'+t_award.thumbnail[0]+'px" height="'+t_award.thumbnail[1]+'px" /></dd>');
		  } else {
				  $("."+award[0]+"-awards").append('<img onmouseover="awards.tooltip.open(event,'+a+');" onmouseout="awards.tooltip.bye('+a+');" id="'+a+'-award" src="'+award[2]+'" alt="'+award[1]+'" width="'+t_award.thumbnail[0]+'px" height="'+t_award.thumbnail[1]+'px" />');
		  }
    },
		tooltip : {
			current : 0,
			open : function(event,a){
				var award = t_award.users[a];
				var pos = awards.mouse.locate(event);
				awards.tooltip.coords = [pos[0],pos[1]];
				if ($("#" + a + "-tooltip").size() === 0) $("body").append('<div id="'+a+'-tooltip" style="position:absolute;max-width:500px;"><table><thead><tr><th colspan="2">'+award[1]+'</th></tr></thead><tbody><tr><td><img src="'+award[2]+'" alt="'+award[1]+'" /></td><td>'+award[3]+'<hr /><strong>Received:</strong> '+award[4]+'</td></tr></tbody></table></div>');
				var elem = document.getElementById(a+"-tooltip");
				elem.style.left = pos[0]+10+"px";
				elem.style.top = pos[1]+10+"px";
				awards.tooltip.current = a;
				document.onmousemove = awards.tooltip.update;
			},
			update : function(event){
				var pos = awards.mouse.locate(event);
				var elem = document.getElementById(awards.tooltip.current+"-tooltip");
				if(elem !== null){
					elem.style.left = pos[0]+10+"px";
					elem.style.top = pos[1]+10+"px";
				} else {
					document.onmousemove = null;
				}
			},
			bye : function(a){
				switch(t_award.closeFunction){
					case "slide":
              $("#"+a+"-tooltip").slideToggle("fast",function(){
                  $(this).remove();
              });
              break;
					case "fade":
              $("#"+a+"-tooltip").fadeOut("fast",function(){
                  $(this).remove();
              });
              break;
					default:
              $("#"+a+"-tooltip").remove();
              break;
				}
			}
		},
		mouse : {
			locate : function(event){
				e = event || window.event;
				coords = [0,0]
				if (e.pageX || e.pageY) {
					coords = [e.pageX,e.pageY];
				} 
				else {
					var de = document.documentElement;
					var b = document.body;
					coords = [e.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0),e.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0)];
				}
				return coords;
			}
		}
	}
	awards.start();
})();
