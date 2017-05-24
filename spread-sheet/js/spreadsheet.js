$(document).ready(function() {
    $("#datepicker").datepicker({
    	showButtonPanel: true
    });

    //$("#hours").spinner;

    $("#calculate").click(sumUpHours);

    $("#org").focus();

    $("#submit").click(addToTable);

});

var i = 0;
var tableRowArray = [];
var currentlyEditingRow = false;
var numOfRow = 0;

function showControls(event) {
    $(".editbox").html("<input type=\"submit\" class=\"delete\" name=\"delete\" value=\"Delete\"><input type=\"submit\" class=\"edit\" name=\"edit\" value=\"Edit\">");
    $(".delete").click(deleteRow);
    $(".edit").click(editRow);
}

function hideControls(event) {
    $(".editbox").text(" ");
}

function deleteRow() {
    var rowToDelete = $(this).parent().parent().parent().hide().attr("id");
    var numOfRow = rowToDelete.substring(3);
    for (var j = 0; j < tableRowArray.length; j++) {
        if (j == numOfRow) {
            tableRowArray[j].ignore = true;
        }
    }
}

function editRow() {
    var rowToEdit = $(this).parent().parent().parent().attr("id");
    numOfRow = rowToEdit.substring(3);
    for (var j = 0; j < tableRowArray.length; j++) {
        if (j == numOfRow) {
            //Do something!
            $("#add-row").effect("highlight", 1000);
            $("#add-row #org").val(tableRowArray[j].org);
            $("#add-row #hours").val(tableRowArray[j].hours);
            $("#add-row #turned-in").val(tableRowArray[j].turnedIn);
            $("#add-row #datepicker").val(tableRowArray[j].datePicker);
            currentlyEditingRow = true;
        }
    }
}

function addToTable(event) {
    var tableRow = {};
    tableRow.org = $("#org").val();
    tableRow.hours = $("#hours").val();
    tableRow.turnedIn = $("#turned-in").val();
    tableRow.datePicker = $("#datepicker").val();

    if (currentlyEditingRow) {
        currentlyEditingRow = false;
        $("#row" + numOfRow).replaceWith("<tr id=\"row" + numOfRow + "\"  class=\"row\"><td>" + tableRow.org + "</td><td class=\"hours\">" + tableRow.hours + "</td><td>" + tableRow.turnedIn + "</td><td>" + tableRow.datePicker + "</td><td><span class=\"editbox\"> </span></td></tr>");
        tableRowArray[numOfRow] = tableRow;
        return;
    }

    //I'd like to be able to do this with a for loop,
    //but as you see from the code block above, it didn't work.
    $("#volunteerTable tr:last").after("<tr id=\"row" + i + "\"  class=\"row\"><td>" + tableRow.org + "</td><td class=\"hours\">" + tableRow.hours + "</td><td>" + tableRow.turnedIn + "</td><td>" + tableRow.datePicker + "</td><td><span class=\"editbox\"> </span></td></tr>");

    //Add to i for the next time the Add button is clicked
    i++;

    console.log(tableRowArray);

        //Gives error:
    //$("#add-row").insertBefore($("#add-row").before);

    tableRowArray.push(tableRow);

    //Show and hide delete button
    $(".editbox").parent().hover(showControls, hideControls);


    return tableRow;
}

function sumUpHours() {
    var totalHours = 0;

    //I used j because I had already used i for the ids of the new rows.
    for (var j = 0; j < tableRowArray.length; j++) {
        if (!tableRowArray[j].ignore) {
            totalHours += Number(tableRowArray[j].hours);
        }
    }

    if (totalHours == 1) {
        $("#total-hours").text(totalHours + " hour");
    } else {
        $("#total-hours").text(totalHours + " hours");
    }
}
