$(document).ready(function() {
    /*
    $("#plus-sign").parent().hover(function() {
        $("#plus-sign").text("+");
    }).mouseout(function() {
        $("#plus-sign").text("");
    });
    */
    $("#datepicker").datepicker({
    	showButtonPanel: true
    });

    //$("#calculate").click(addHours);

    $("#org").focus();
    var tableRowArray = [];

    var tableRowYa = $("#submit").click(addToTable);
    console.log(tableRow);
    tableRowArray.push(tableRow);
    console.log(tableRowArray);
});

var i = 0;

function addToTable(event) {
    var tableRow = {};
    tableRow.org = $("#org").val();
    tableRow.hours = $("#hours").val();
    tableRow.turnedIn = $("#turned-in").val();
    tableRow.datePicker = $("#datepicker").val();
/*
    $("#volunteerTable tr:last").after("<tr>");
    for (var i = 0; i < Object.keys(tableRow).length; i++) {
        $("#volunteerTable tr:last").after("<td>" + tableRow.blah + "<td>");
    }
    $("#volunteerTable tr:last").after("</tr>");
*/
    //I'd like to be able to do this with a for loop,
    //but as you see from the code block above, it didn't work.
    $("#volunteerTable tr:last").after("<tr id=\"row" + i + "\"  class=\"row\"><td>" + tableRow.org + "</td><td class=\"hours\">" + tableRow.hours + "</td><td>" + tableRow.turnedIn + "</td><td>" + tableRow.datePicker + "</td></tr>");
    i++;
    return tableRow;
}

/*function addHours() {
    $(".row").each(function() {
        var totalHours;
        totalHours += $(this ".hours").text();

    });
        console.log("Hey" + totalHours);
}*/
