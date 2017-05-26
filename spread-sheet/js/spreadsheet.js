$(document).ready(function() {
    //Turns the date text field into a date picker.
    $("#datepicker").datepicker({
    	showButtonPanel: true,
        maxDate: "+0d"
    });

    $("#hours").spinner();

    $( "input[type=submit], button, .delete, .edit" ).button();

    $("#calculate").click(sumUpHours);

    $("#org").focus();

    $("#submit").click(addToTable);



});

var i = 0;
var tableRowArray = [];
var currentlyEditingRow = false;
var numOfRow = 0;

//var newRowContents = "<tr id=\"row" + numOfRow + "\"  class=\"row\"><td>" + tableRow.org + "</td><td class=\"hours\">" + tableRow.hours + "</td><td>" + tableRow.turnedIn + "</td><td>" + tableRow.datePicker + "</td><td><span class=\"editbox\"> </span></td></tr>"


function checkValidity() {
    if ($(this).spinner( "isValid" )) {
        console.log("valid");
    } else {
        console.log("Bad bad");
    }
}

function showControls(event) {
    $(".editbox").html("<button type=\"submit\" class=\"delete\" name=\"delete\" value=\"Delete\"><i class=\"fa fa-trash\"></i></button><button type=\"submit\" class=\"edit\" name=\"edit\" value=\"Edit\"><i class=\"fa fa-edit\"></i></button>");
    $( ".delete, .edit" ).button()
    $(".delete").click(deleteRow);
    $(".edit").click(editRow);
}

//At one time I planned to hide the controls when you moved the mouse away,
//but it was too distracting.
/*function hideControls(event) {
    $(".editbox").css({color: "red"});
}*/

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


            $("#add-row").effect("highlight", 1000);
            $("#add-row #org").val(tableRowArray[j].org);
            $("#add-row #hours").val(tableRowArray[j].hours);
            //$("#add-row #turned-in").val(tableRowArray[j].turnedIn);
            $("#add-row #turned-in").val(processCheckMarkOut(tableRowArray[j].turnedIn, "#turned-in"));
            $("#add-row #datepicker").val(tableRowArray[j].datePicker);

            $("#submit").html("<i class=\"fa fa-edit\"></i>");

            currentlyEditingRow = true;
        }
    }

}

function addToTable(event) {
    //This makes sure if there was an error before, that the previous warning is removed.
    $("#hours").removeAttr("title");

    if ($("#hours").val() == "" || $("#org").val() == "" || $("#datepicker").val() == "") {
        $("#add-row").prop("title", "You did not fill in one of the fields.").tooltip().effect("highlight", 1000);
        return;
    }

    var tableRow = addPropsToRow(tableRow);
    if (tableRow.hours == "bad") {
        $("#hours").prop("title", "You entered an invalid amount of hours.").tooltip().effect("highlight", 1000);
        return;
    }

    if (currentlyEditingRow) {
        //Set this to false for the next time the add button is clicked.
        currentlyEditingRow = false;

        $("#row" + numOfRow).replaceWith(rowUpdate(tableRow, numOfRow));
        showControls();

        tableRowArray[numOfRow] = tableRow;

        $("#submit").html("<i class=\"fa fa-plus\"></i>");

        //This stops the rest of the code in the addToTable function from running.
        return;
    }

    tableRowArray[i] = tableRow;

    //I'd like to be able to do this with a for loop,
    //but as you see from the code block above, it didn't work.
    $("#volunteerTable tr:last").after(rowUpdate(tableRow, i));

    //Add to i for the next time the Add button is clicked
    i++;

    console.log(tableRowArray);

    //Show the delete and edit button when editbox is hovered
    $(".editbox").parent().hover(showControls);

    return tableRow;
}

function addPropsToRow(tableRow) {
    var tableRow = {};
    //Add each value from the input fields to the tableRow object
    tableRow.org = $("#org").val();
    tableRow.hours = processNumber("#hours");
    tableRow.turnedIn = processCheckMarkIn("#turned-in");
    tableRow.datePicker = $("#datepicker").val();
    return tableRow;
}

//This function will put in a row in the table where the parameter says to.
function rowUpdate(tableRow, numOfRow) {
    return "<tr id=\"row" + numOfRow + "\"  class=\"row\"><td>" + tableRow.org + "</td><td class=\"hours\">" + tableRow.hours + "</td><td>" + tableRow.turnedIn + "</td><td>" + tableRow.datePicker + "</td><td><span class=\"editbox\"> </span></td></tr>";
}

function processNumber(hours) {
    var hoursVal = $(hours).val();
    if (hoursVal % 1 !== 0 || hoursVal < 0) {
        return "bad";
    } else {
        return hoursVal;
    }


}

function processCheckMarkIn(checkMarkId) {
    var checkMarkValue = $(checkMarkId + ":checked");

    /*While experimenting, I discovered that checkMarkValue returns an object with an array that has a length of zero when unchecked and a length of 1 when checked.
    */
    if (checkMarkValue.length) {
        return "yes";
    } else {
        return "no";
    }
    return checkMarkValue;
}

function processCheckMarkOut(checkMarkValue, checkMarkId) {
    if (checkMarkValue == "yes") {
        $(checkMarkId).prop("checked", true);
    } else {
        $(checkMarkId).prop("checked", false);
    }
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
