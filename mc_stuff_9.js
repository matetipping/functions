function change_career_options() {
    var profession = $("select#attr_prof").val();
    if (profession === "0") {
            $("select#attr_career").html("<option value='0'>None</option><option value='1'>Farmer</option><option value='2'>Fisherman</option><option value='3'>Shepherd</option><option value='4'>Fletcher</option>");
    } else if (profession === "1") {
            $("select#attr_career").html("<option value='0'>None</option><option value='1'>Librarian</option><option value='2'>Cartographer</option>");
    } else if (profession === "2") {
            $("select#attr_career").html("<option value='0'>None</option><option value='1'>Cleric</option>");
    } else if (profession === "3") {
            $("select#attr_career").html("<option value='0'>None</option><option value='1'>Armorer</option><option value='2'>Weaponsmith</option><option value='3'>Tool Smith</option>");
    } else if (profession === "4") {
            $("select#attr_career").html("<option value='0'>None</option><option value='1'>Butcher</option><option value='2'>Leatherworker</option>");
    } else {
            $("select#attr_career").html("<option value='0'>None</option>");
    }
}

function change_careerlvl_options() {
    var profession = $("select#attr_prof").val();
    var career = $("select#attr_career").val();
    if ((profession === "0") && (career === "1")) {
        $("select#attr_careerlvl").html("<option value='1'>Level 1: Pumpkins</option><option value='2'>Level 2: Fruits</option><option value='3'>Level 3: Baking</option><option value='4'>No trade levels</option>");
    } else if ((profession === "0") && (career === "2")) {
        $("select#attr_careerlvl").html("<option value='1'>Level 1: Fishing rod</option><option value='2'>No trade levels</option>");
    } else if ((profession === "0") && (career === "3")) {
        $("select#attr_careerlvl").html("<option value='1'>Level 1: Wool</option><option value='2'>No trade levels</option>");
    } else if ((profession === "0") && (career === "4")) {
        $("select#attr_careerlvl").html("<option value='1'>Level 1: Bow & Flint</option><option value='2'>No trade levels</option>");
    } else if ((profession === "1") && (career === "1")) {
        $("select#attr_careerlvl").html("<option value='1'>Level 1: Books, Bookshelf & Compass</option><option value='2'>Level 2: Written Books, Clock & Glass</option><option value='3'>Level 3: Enchanted Book</option><option value='4'>Level 4: Enchanted Book</option><option value='5'>Level 5: Name Tag</option><option value='6'>No trade levels</option>");
    } else if ((profession === "1") && (career === "2")) {
        $("select#attr_careerlvl").html("<option value='1'>Level 1: Compass</option><option value='2'>Level 2: Empty Map</option><option value='3'>Level 3: Exploration Map</option><option value='4'>No trade levels</option>");
    } else if ((profession === "2") && (career === "1")) {
        $("select#attr_careerlvl").html("<option value='1'>Level 1: Stones</option><option value='2'>Level 2: Eye of Ender & Glowstone</option><option value='3'>Level 3: Bottle o' enchanting</option><option value='4'>No trade levels</option>");
    } else if ((profession === "3") && (career === "1")) {
        $("select#attr_careerlvl").html("<option value='1'>Level 1: Iron</option><option value='2'>Level 2: Diamond</option><option value='3'>Level 3: Chain</option><option value='4'>No trade levels</option>");
    } else if ((profession === "3") && (career === "2")) {
        $("select#attr_careerlvl").html("<option value='1'>Level 1: Iron</option><option value='2'>Level 2: Diamond</option><option value='3'>No trade levels</option>");
    } else if ((profession === "3") && (career === "3")) {
        $("select#attr_careerlvl").html("<option value='1'>Level 1: Iron</option><option value='2'>Level 2: Diamond</option><option value='3'>No trade levels</option>");
    } else if ((profession === "4") && (career === "1")) {
        $("select#attr_careerlvl").html("<option value='1'>Level 1: Coal & Meat</option><option value='2'>No trade levels</option>");
    } else {
        $("select#attr_careerlvl").html("<option value='1'>Level 1: Leather</option><option value='2'>No trade levels</option>");
    }
}

function show_career_level() {
    if ($("select#attr_career").val() === "0") {
        $("select#attr_careerlvl").parent().attr("style", "display: none");
    } else {
        $("select#attr_careerlvl").parent().attr("style", "display: block");
    }
    change_careerlvl_options();
}

function remove_last_comma(command){        
    var n = command.lastIndexOf(", ");
    var a = command.substring(0,n) 
    return a;
}

function update_cmd_txt() {
var rel_pos = $("select#attr_relpos").val();
var x_loc = $("input#attr_x").val();
var y_loc = $("input#attr_y").val();
var z_loc = $("input#attr_z").val();
var my_name = $("input#attr_name").val();
var prof = $("select#attr_prof").val();
var career = $("select#attr_career").val();

var command_txt = "/summon Villager" + rel_pos + x_loc + rel_pos + y_loc + rel_pos + z_loc + " {";
if (my_name !== "") {
    command_txt = command_txt + "CustomName: " + my_name + ", ";
}
command_txt = command_txt + "Profession: " + prof + ", ";
if (career !== "0") {
    command_txt = command_txt + "Career: " + career + ", ";
    var career_lvl = $("select#attr_careerlvl").val();
    command_txt = command_txt + "CareerLevel: " + career_lvl + ", ";
}

command_txt = remove_last_comma(command_txt);
command_txt = command_txt + "}";

$("span.command_text").each( function() {
    $(this).html(command_txt);
});
}
