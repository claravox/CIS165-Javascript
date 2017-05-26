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
    $("#submit").click(addToTable(tableRowArray));

    //For debugging purposes. Shows what is in the local storage database.
    db.info().then(function (info) {
      console.log(info);
    })

    showRowsFromStorage();

});

//Create a new database to store information even after refreshing the page.
var db = new PouchDB("table1");

//This is used to give names to each new row.
var i = 0;
i._id = i;


//This is the array that keeps track of all the added rows.
var tableRowArray = [];

//This will change if the user is editing a row.
var currentlyEditingRow = false;

//This is the number of the row currently being edited.
var numOfRow = 0;

function showRowsFromStorage() {
  db.allDocs({include_docs: true}, function(err, doc) {
    console.log(doc);
    console.log("This is the doc.row" + doc.rows);
    addToTable(doc.rows);
  });
}

//This will show the delete and edit buttons for each row.
function showControls(event) {
    $(".editbox").html("<button type=\"submit\" class=\"delete\" name=\"delete\" value=\"Delete\"><i class=\"fa fa-trash\"></i></button><button type=\"submit\" class=\"edit\" name=\"edit\" value=\"Edit\"><i class=\"fa fa-edit\"></i></button>");
    $( ".delete, .edit" ).button();
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
    console.log(numOfRow);
    //Goes through the table array to see if its number matches.
    for (var j = 0; j < tableRowArray.length; j++) {
        if (j == numOfRow) {
            tableRowArray[j].ignore = true;

            //This should remove the row from the  Pouch database as well.
            db.get("row" + j).then(function (doc) {
                console.log("row" + j);
                return db.remove(doc);
            }).catch(function (err) {
                console.log(err);
            });

        }
    }
}

//This is triggered when the user clicks on the edit button.
function editRow() {
    //This find the id of the row, and then its number.
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

            //This will change the behavior of addToTable.
            currentlyEditingRow = true;
        }
    }

}

//This function will put in a row in the table where the parameter says to.
function rowUpdate(tableRow, numOfRow) {
    return "<tr id=\"row" + numOfRow + "\"  class=\"row\"><td>" + tableRow.org + "</td><td class=\"hours\">" + tableRow.hours + "</td><td>" + tableRow.turnedIn + "</td><td>" + tableRow.datePicker + "</td><td><span class=\"editbox\"> </span></td></tr>";
}

//This runs when the add button is clicked.
function addToTable(tableRowArray) {
    //This makes sure if there was an error before, that the previous warning is removed.
    $("#hours").removeAttr("title");

    //Set tableRow as an object
    var tableRow = addPropsToRow(tableRow);

    //This function should add to the database.
    updateDb(tableRow, "row", hours);

    if (currentlyEditingRow) {
        //Set this to false for the next time the add button is clicked.
        currentlyEditingRow = false;

        //Instead of adding another row, the row edited is replaced.
        $("#row" + numOfRow).replaceWith(rowUpdate(tableRow, numOfRow));

        //This makes sure the delete and edit buttons are still available.
        showControls();

        var tableRow = addPropsToRow(tableRow);

        tableRowArray[numOfRow] = tableRow;

        //Change the Add icon back to a plus, since we are not editing a row anymore.
        $("#submit").html("<i class=\"fa fa-plus\"></i>");

        //This stops the rest of the code in the addToTable function from running.
        return;
    }

    //I'd like to be able to do this with a for loop,
    //but it didn't work.
    $("#volunteerTable tr:last").after(rowUpdate(tableRow, i));

    //Add to i for the next time the Add button is clicked
    i++;

    //For debugging purposes.
    console.log(tableRowArray);

    //Add the local variable to the global variable tableRowArray so it can be
    //accessed later.
    tableRowArray.push(tableRow);

    //Show the delete and edit button when editbox is hovered
    $(".editbox").parent().hover(showControls);

    return tableRow;
}

function addPropsToRow(tableRow) {
    var tableRow = {};
    //Add each value from the input fields to the tableRow object
    tableRow.org = $("#org").val();
    tableRow.hours = processNumber("#hours");
    if (tableRow.hours == "bad") {
        $("#hours").prop("title", "You entered an invalid amount of hours.").tooltip().effect("highlight", 1000);
        return;
    }
    tableRow.turnedIn = processCheckMarkIn("#turned-in");
    tableRow.datePicker = $("#datepicker").val();
    return tableRow;
}
//This is for my reference: updateDb(tableRow, "row", hours);

function updateDb(doc, phrase, partToUpdate) {
    doc._id = phrase + i;
    db.put(doc);
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
    //totalHours is a number, set first at zero everytime calculated.
    var totalHours = 0;

    //I used j because I had already used i for the ids of the new rows.
    for (var j = 0; j < tableRowArray.length; j++) {
        if (!tableRowArray[j].ignore) {
            //+= adds the new value to the previous value.
            totalHours += Number(tableRowArray[j].hours);
        }
    }

    //This is just some grammar fixing.
    if (totalHours == 1) {
        $("#total-hours").text(totalHours + " hour");
    } else {
        $("#total-hours").text(totalHours + " hours");
    }
}
