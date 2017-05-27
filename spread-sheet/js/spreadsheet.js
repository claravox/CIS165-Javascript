$(document).ready(function() {
    //This block of code uses jquery ui to add a datepicker, a spinner, and a button.
    $("#datepicker").datepicker({
    	showButtonPanel: true,
        maxDate: "+0d"
    });
    $("#hours").spinner();
    $( "input[type=submit], button, .delete, .edit" ).button();

    //When the user clicks the calculate button, the function sumUpHours is run.
    $("#calculate").click(sumUpHours);

    //This might make it easier to type in right away.
    $("#org").focus();

    //When the add button is clicked, the function addToTable is run.
    $("#submit").click(addToTable);
});

//This is used to give names to each new row.
var i = 0;

//This is the array that keeps track of all the added rows.
var tableRowArray = [];

//This will change if the user is editing a row.
var currentlyEditingRow = false;

//This is the number of the row currently being edited.
var numOfRow = 0;

//This will show the delete and edit buttons for each row.
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
    //This will hide the whole row from the viewer, but it doesn't actually delete the row.
    var rowToDelete = $(this).parent().parent().parent().hide().attr("id");

    //This takes the last part of the id of the row for the row number.
    var numOfRow = rowToDelete.substring(3);

    //This goes through the table array to see if its number matches.
    for (var j = 0; j < tableRowArray.length; j++) {
        if (j == numOfRow) {
            //If the numbers match, the row will get an ignore property.
            tableRowArray[j].ignore = true;
        }
    }
}

//This is triggered when the user clicks on the edit button.
function editRow() {
    //This find the id of the row, and then its number.
    var rowToEdit = $(this).parent().parent().parent().attr("id");
    numOfRow = rowToEdit.substring(3);

    //This changes the icon to a pencil to show the user
    //that they are editing a row, not creating a new one.
    $("#submit").html("<i class=\"fa fa-edit\"></i>");

    for (var j = 0; j < tableRowArray.length; j++) {
        if (j == numOfRow) {

            //This alerts the user that they edit the text in the boxes to edit the row.
            $("#add-row").effect("highlight", 1000);
            $("#add-row #org").val(tableRowArray[j].org);
            $("#add-row #hours").val(tableRowArray[j].hours);
            $("#add-row #turned-in").val(processCheckMarkOut(tableRowArray[j].turnedIn, "#turned-in"));
            $("#add-row #datepicker").val(tableRowArray[j].datePicker);

            //When the submit button is clicked, the addToTable function
            //will behave differently because of this value.
            currentlyEditingRow = true;
        }
    }

}

//This runs when the submit buttton is clicked.
function addToTable(event) {
    //This makes sure if there was an error before, that the previous warning is removed.
    $("#hours").removeAttr("title");


    //This checks if one of the fields is empty.
    if ($("#hours").val() == "" || $("#org").val() == "" || $("#datepicker").val() == "") {
        $("#add-row").prop("title", "You did not fill in one of the fields.").tooltip().effect("highlight", 1000);
        return;
    }

    //This makes sure if there was an error before, that the previous warning
    //is removed. For some reason just using removeAttr didn't work, I needed to
    //disable the tooltip as well.
    $("#add-row").removeAttr("title").tooltip({
        disabled: true
    });

    //This stores the user input in an object.
    var tableRow = addPropsToRow(tableRow);

    //This alerts the user that they did not enter a whole, positive number.
    if (tableRow.hours == "bad") {
        $("#hours").prop("title", "You entered an invalid amount of hours.").tooltip().effect("highlight", 1000);
        return;
    }

    if (currentlyEditingRow) {
        //Set this to false for the next time the add button is clicked.
        currentlyEditingRow = false;

        //This finds the id of the row being edited and replace its element.
        $("#row" + numOfRow).replaceWith(rowUpdate(tableRow, numOfRow));

        //This makes sure the controls don't dissappear after the previous command.
        showControls();

        tableRowArray[numOfRow] = tableRow;

        //This changes the submit icon to a plus to show the user that now
        //clicking on the button will add a new row.
        $("#submit").html("<i class=\"fa fa-plus\"></i>");

        //This stops the rest of the code in the addToTable function from running.
        return;
    }

    tableRowArray[i] = tableRow;

    //I'd like to be able to do this with a for loop,
    //but it didn't work.
    $("#volunteerTable tr:last").after(rowUpdate(tableRow, i));

    //Add to i for the next time the Add button is clicked
    i++;

    //For debugging:
    //console.log(tableRowArray);

    //Show the delete and edit button when editbox is hovered
    $(".editbox").parent().hover(showControls);
}

function addPropsToRow(tableRow) {
    //Defines tableRow as an object
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

    /*The % 1 determines the remainder of dividing by one, which is just a way
    to see if a number is a whole number. The < 0 determines if the number
    is negative.*/
    if (hoursVal % 1 !== 0 || hoursVal < 0) {
        return "bad";
    } else {
        return hoursVal;
    }
}

//This will determine what phrase will show in the turned in field based on the
//checkmark's value.
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

//Convert the checkMarkValue back for editing a row
function processCheckMarkOut(checkMarkValue, checkMarkId) {
    if (checkMarkValue == "yes") {
        $(checkMarkId).prop("checked", true);
    } else {
        $(checkMarkId).prop("checked", false);
    }
}

function sumUpHours() {
    //Set totalHours as an integer, starting at zero.
    var totalHours = 0;

    //I used j because I had already used i for the ids of the new rows.
    for (var j = 0; j < tableRowArray.length; j++) {
        //If the row doesn't have an ignore property, add its hour field to the
        //total hours variable.
        if (!tableRowArray[j].ignore) {
            totalHours += Number(tableRowArray[j].hours);
        }
    }

    //This is just a grammar fix. It will display "1 hour" if the total hours
    //are only 1, and "[number] hours" for all other values.
    if (totalHours == 1) {
        $("#total-hours").text(totalHours + " hour");
    } else {
        $("#total-hours").text(totalHours + " hours");
    }
}
