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

$(function () {
    $("span#score_user").html(tipping_data.admin);
    $("span#score_opponent").html(String.valueOf(tipping_data.tips[0][3]));
});
