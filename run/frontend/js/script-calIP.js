/*
function run_animation() {
	document.querySelector("#holder").style = "animation-name: submit;";
}
*/

$(document).ready(function() {

	$("#submit").click(function() {
		$("#holder").css("animation-name", "submit");
		$("#text").fadeIn();
	});

});