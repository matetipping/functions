function change_gui(prev, next) {
  document.getElementById(prev).style.display = "none";
  document.getElementById(next).style.display = "inline-block";
}

function set_layer_des(id, design) {
  document.getElementById(id + "_des").value = design;
  document.getElementById(id + "_design").style.backgroundPosition = design;
}

function set_back_col(colour) {
  document.getElementById("back_col").value = colour;
  document.getElementById("emblem").style.background = colour;
}

function set_layer_col(id, colour) {
  document.getElementById(id + "_col").value = colour;
  document.getElementById(id + "_design").style.backgroundImage = "url('" + colour + "')";
}

function rotate_layer(id, no_degrees) {
  var value_deg = parseInt(document.getElementById(id + "_rot").value) + no_degrees;

  if (value_deg >= 360) {
    value_deg = value_deg - 360;
  } else if (value_deg < 0) {
    value_deg = value_deg + 360;
  }

  document.getElementById(id + "_rot").value = value_deg;
  document.getElementById(id + "_design").style.transform = "rotate(" + value_deg + "deg)";
}

function flip_design_layers(idA, idB) {
  var temp_col = document.getElementById(idA + "_col").value;
  var temp_des = document.getElementById(idA + "_des").value;
  var temp_rot = document.getElementById(idA + "_rot").value;
  var temp_back = document.getElementById(idA + "_design").style.background;
  var temp_trans = document.getElementById(idA + "_design").style.transform;
  
  document.getElementById(idA + "_design").style.background = document.getElementById(idB + "_design").style.background;
  document.getElementById(idA + "_design").style.transform = document.getElementById(idB + "_design").style.transform;
  document.getElementById(idA + "_col").value = document.getElementById(idB + "_col").value;
  document.getElementById(idA + "_des").value = document.getElementById(idB + "_des").value;
  document.getElementById(idA + "_rot").value = document.getElementById(idB + "_rot").value;

  document.getElementById(idB + "_design").style.background = temp_back;
  document.getElementById(idB + "_design").style.transform = temp_trans;
  document.getElementById(idB + "_col").value = temp_col;
  document.getElementById(idB + "_des").value = temp_des;
  document.getElementById(idB + "_rot").value = temp_rot;
}

function flip_design_layers_col(idA, idB) {
  var temp_col = document.getElementById(idA + "_col").value;
  var temp_back = document.getElementById(idA + "_design").style.backgroundImage;

  document.getElementById(idA + "_design").style.backgroundImage = document.getElementById(idB + "_design").style.backgroundImage;
  document.getElementById(idA + "_col").value = document.getElementById(idB + "_col").value;

  document.getElementById(idB + "_design").style.backgroundImage = temp_back;
  document.getElementById(idB + "_col").value = temp_col;
}

function randomise_all() {
  set_random_back_col();
  set_random_layer_col("low");
  set_random_layer_col("top");
  set_random_layer_des("low");
  set_random_layer_des("top");
  set_random_layer_rot("low");
  set_random_layer_rot("top");
}

function random_num(a_number) {
  return Math.floor(Math.random() * a_number) + 1;
}

function set_random_back_col() {
  switch(random_num(60)) {
    case 1:
      set_back_col("rgb(120, 0, 43)")
      break;
    case 2:
      set_back_col("rgb(151, 13, 36)")
      break;
    case 3:
      set_back_col("rgb(55, 0, 1)")
      break;
    case 4:
      set_back_col("rgb(148, 8, 8)")
      break;
    case 5:
      set_back_col("rgb(242, 66, 66)")
      break;
    case 6:
      set_back_col("rgb(233, 58, 35)")
      break;
    case 7:
      set_back_col("rgb(210, 52, 12)")
      break;
    case 8:
      set_back_col("rgb(255, 132, 85)")
      break;
    case 9:
      set_back_col("rgb(237, 96, 48)")
      break;
    case 10:
      set_back_col("rgb(228, 108, 10)")
      break;
    case 11:
      set_back_col("rgb(246, 120, 43)")
      break;
    case 12:
      set_back_col("rgb(238, 211, 180)")
      break;
    case 13:
      set_back_col("rgb(173, 119, 79)")
      break;
    case 14:
      set_back_col("rgb(144, 80, 35)")
      break;
    case 15:
      set_back_col("rgb(61, 29, 11)")
      break;
    case 16:
      set_back_col("rgb(48, 31, 22)")
      break;
    case 17:
      set_back_col("rgb(146, 128, 99)")
      break;
    case 18:
      set_back_col("rgb(221, 210, 171)")
      break;
    case 19:
      set_back_col("rgb(233, 234, 181)")
      break;
    case 20:
      set_back_col("rgb(236, 164, 20)")
      break;
    case 21:
      set_back_col("rgb(255, 204, 0)")
      break;
    case 22:
      set_back_col("rgb(255, 238, 17)")
      break;
    case 23:
      set_back_col("rgb(230, 239, 151)")
      break;
    case 24:
      set_back_col("rgb(189, 214, 26)")
      break;
    case 25:
      set_back_col("rgb(130, 132, 34)")
      break;
    case 26:
      set_back_col("rgb(116, 189, 67)")
      break;
    case 27:
      set_back_col("rgb(31, 188, 0)")
      break;
    case 28:
      set_back_col("rgb(56, 249, 109)")
      break;
    case 29:
      set_back_col("rgb(51, 119, 38)")
      break;
    case 30:
      set_back_col("rgb(3, 24, 4)")
      break;
    case 31:
      set_back_col("rgb(0, 102, 44)")
      break;
    case 32:
      set_back_col("rgb(33, 95, 45)")
      break;
    case 33:
      set_back_col("rgb(158, 211, 131)")
      break;
    case 34:
      set_back_col("rgb(113, 226, 187)")
      break;
    case 35:
      set_back_col("rgb(81, 179, 174)")
      break;
    case 36:
      set_back_col("rgb(175, 234, 223)")
      break;
    case 37:
      set_back_col("rgb(31, 141, 157)")
      break;
    case 38:
      set_back_col("rgb(8, 86, 98)")
      break;
    case 39:
      set_back_col("rgb(3, 23, 26)")
      break;
    case 40:
      set_back_col("rgb(135, 187, 229)")
      break;
    case 41:
      set_back_col("rgb(21, 113, 189)")
      break;
    case 42:
      set_back_col("rgb(35, 89, 149)")
      break;
    case 43:
      set_back_col("rgb(23, 55, 94)")
      break;
    case 44:
      set_back_col("rgb(16, 37, 63)")
      break;
    case 45:
      set_back_col("rgb(57, 63, 96)")
      break;
    case 46:
      set_back_col("rgb(147, 145, 162)")
      break;
    case 47:
      set_back_col("rgb(124, 105, 175)")
      break;
    case 48:
      set_back_col("rgb(60, 48, 82)")
      break;
    case 49:
      set_back_col("rgb(29, 23, 39)")
      break;
    case 50:
      set_back_col("rgb(159, 96, 193)")
      break;
    case 51:
      set_back_col("rgb(128, 28, 90)")
      break;
    case 52:
      set_back_col("rgb(228, 103, 239)")
      break;
    case 53:
      set_back_col("rgb(242, 96, 162)")
      break;
    case 54:
      set_back_col("rgb(250, 198, 196)")
      break;
    case 55:
      set_back_col("rgb(242, 242, 242)")
      break;
    case 56:
      set_back_col("rgb(217, 217, 217)")
      break;
    case 57:
      set_back_col("rgb(127, 127, 127)")
      break;
    case 58:
      set_back_col("rgb(89, 89, 89)")
      break;
    case 59:
      set_back_col("rgb(40, 40, 40)")
      break;
    default:
      set_back_col("rgb(13, 13, 13)")
  }
}

function set_random_layer_col(id) {
  switch(random_num(70)) {
    case 1:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005719/emblemdesigns_splurtle.png")
      break;
    case 2:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003806/emblemdesigns_maroon.png")
      break;
    case 3:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005768/emblemdesigns_darkred.png")
      break;
    case 4:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005724/emblemdesigns_blood.png")
      break;
    case 5:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005723/emblemdesigns_coral.png")
      break;
    case 6:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003763/emblemdesigns_red.png")
      break;
    case 7:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003809/emblemdesigns_tomato.png")
      break;
    case 8:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003839/emblemdesigns_salmon.png")
      break;
    case 9:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003840/emblemdesigns_tangerine.png")
      break;
    case 10:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003807/emblemdesigns_orange.png")
      break;
    case 11:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005760/emblemdesigns_carrot.png")
      break;
    case 12:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005763/emblemdesigns_nude.png")
      break;
    case 13:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003838/emblemdesigns_lightbrown.png")
      break;
    case 14:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005729/emblemdesigns_nutella.png")
      break;
    case 15:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003805/emblemdesigns_brown.png")
      break;
    case 16:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005725/emblemdesigns_charcoalbrown.png")
      break;
    case 17:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005769/emblemdesigns_cement.png")
      break;
    case 18:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005727/emblemdesigns_sand.png")
      break;
    case 19:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005728/emblemdesigns_cream.png")
      break;
    case 20:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003804/emblemdesigns_amber.png")
      break;
    case 21:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003812/emblemdesigns_gold.png")
      break;
    case 22:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003817/emblemdesigns_yellow.png")
      break;
    case 23:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005762/emblemdesigns_citrus.png")
      break;
    case 24:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003814/emblemdesigns_lime.png")
      break;
    case 25:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003815/emblemdesigns_olive.png")
      break;
    case 26:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005758/emblemdesigns_grass.png")
      break;
    case 27:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003813/emblemdesigns_green.png")
      break;
    case 28:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005759/emblemdesigns_martian.png")
      break;
    case 29:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003811/emblemdesigns_forest.png")
      break;
    case 30:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005731/emblemdesigns_amazongreen.png")
      break;
    case 31:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005771/emblemdesigns_emerald.png")
      break;
    case 32:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005730/emblemdesigns_bottlegreen.png")
      break;
    case 33:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003841/emblemdesigns_mint.png")
      break;
    case 34:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003810/emblemdesigns_cyan.png")
      break;
    case 35:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003816/emblemdesigns_teal.png")
      break;
    case 36:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003818/emblemdesigns_aqua.png")
      break;
    case 37:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003819/emblemdesigns_azure.png")
      break;
    case 38:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005770/emblemdesigns_darkteal.png")
      break;
    case 39:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005721/emblemdesigns_midnight.png")
      break;
    case 40:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003823/emblemdesigns_lightblue.png")
      break;
    case 41:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003820/emblemdesigns_blue.png")
      break;
    case 42:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005772/emblemdesigns_royalblue.png")
      break;
    case 43:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003821/emblemdesigns_darkblue.png")
      break;
    case 44:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003824/emblemdesigns_navy.png")
      break;
    case 45:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003822/emblemdesigns_glaucous.png")
      break;
    case 46:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005722/emblemdesigns_lilac.png")
      break;
    case 47:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003826/emblemdesigns_lightpurple.png")
      break;
    case 48:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003829/emblemdesigns_purple.png")
      break;
    case 49:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003825/emblemdesigns_darkpurple.png")
      break;
    case 50:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003830/emblemdesigns_violet.png")
      break;
    case 51:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005720/emblemdesigns_berry.png")
      break;
    case 52:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003827/emblemdesigns_magenta.png")
      break;
    case 53:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003828/emblemdesigns_pink.png")
      break;
    case 54:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005761/emblemdesigns_lightpink.png")
      break;
    case 55:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003755/emblemdesigns_white.png")
      break;
    case 56:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003754/emblemdesigns_silver.png")
      break;
    case 57:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003753/emblemdesigns_grey.png")
      break;
    case 58:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003752/emblemdesigns_charcoal.png")
      break;
    case 59:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3005726/emblemdesigns_jet.png")
      break;
    case 60:
      set_layer_col(id, "http://b3.ifrm.com/30609/91/0/p3003751/emblemdesigns_black.png")
      break;
    default:
      set_layer_col(id, "none")
  }
}

function set_random_layer_des(id) {
  switch(random_num(24)) {
    case 1:
      set_layer_des(id, "0px 0px")
      break;
    case 2:
      set_layer_des(id, "0px -150px")
      break;
    case 3:
      set_layer_des(id, "0px -300px")
      break;
    case 4:
      set_layer_des(id, "0px -450px")
      break;
    case 5:
      set_layer_des(id, "-150px 0px")
      break;
    case 6:
      set_layer_des(id, "-150px -150px")
      break;
    case 7:
      set_layer_des(id, "-150px -300px")
      break;
    case 8:
      set_layer_des(id, "-150px -450px")
      break;
    case 9:
      set_layer_des(id, "-300px 0px")
      break;
    case 10:
      set_layer_des(id, "-300px -150px")
      break;
    case 11:
      set_layer_des(id, "-300px -300px")
      break;
    case 12:
      set_layer_des(id, "-300px -450px")
      break;
    case 13:
      set_layer_des(id, "-450px 0px")
      break;
    case 14:
      set_layer_des(id, "-450px -150px")
      break;
    case 15:
      set_layer_des(id, "-450px -300px")
      break;
    case 16:
      set_layer_des(id, "-450px -450px")
      break;
    case 17:
      set_layer_des(id, "-600px 0px")
      break;
    case 18:
      set_layer_des(id, "-600px -150px")
      break;
    case 19:
      set_layer_des(id, "-600px -300px")
      break;
    case 20:
      set_layer_des(id, "-600px -450px")
      break;
    case 21:
      set_layer_des(id, "-750px 0px")
      break;
    case 22:
      set_layer_des(id, "-750px -150px")
      break;
    case 23:
      set_layer_des(id, "-750px -300px")
      break;
    default:
      set_layer_des(id, "-750px -450px")
  }
}

function set_random_layer_rot(id) {
  switch(random_num(6)) {
    case 1:
      rotate_layer(id, 90)
      break;
    case 2:
      rotate_layer(id, 180)
      break;
    case 3:
      rotate_layer(id, -90)
      break;
    default:
  }
}
