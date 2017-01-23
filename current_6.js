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

function find_round_tips (round, a_list) {
    var list = [];
    for (i = 0; i < a_list.length; i++) {
        if (a_list[i][0].equals(round)) {
            list.append(a_list[i]);
        }
    }
    return list;
}

$(function () {
    $("span#score_user").html(find_round_tips(tipping_data.round, tipping_data.tips)[0][0]);
    $("span#score_opponent").html(find_round_tips(tipping_data.round, tipping_data.tips)[1][2]);
});
