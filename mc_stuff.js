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
            $("select#attr_career").html("<option value='0'>None</option><option value='1'>Nitwit</option>");
    }
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
command_txt = command_txt + "Career: " + career + ", ";

command_txt = remove_last_comma(command_txt);
command_txt = command_txt + "}";

$("span.command_text").each( function() {
    $(this).html(command_txt);
});
}
