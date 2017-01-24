var tipping_data = {
    round: "R1",
    admin: "Administrator",
    tips: [
	["R1", "Administrator", "CAR", 32, "HAW", 25, 0, 0],
	["R1", "Daniel Terrington", "RIC", 3, "HAW", 34, 0, 0],
	["R1", "ciniboi_12", "CAR", 10, "HAW", 19, 0, 0]
    ],
    fixtures: [
        ["R1", "Administrator", "Daniel Terrington"],
        ["R2"],
        ["R3"]
    ]
}

function find_round_tips(round_no, a_list) {
    var round_chk = 0;
    var len = a_list.length;
    for (var i = 0; i < len; i++) {
	round_chk = round_chk + a_list[i][3];
    }
    return round_chk;
}

$(function () {
    $("span#score_user").html(find_round_tips(tipping_data.round, tipping_data.tips));
    $("span#score_opponent").html("hi");
});
