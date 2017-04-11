var view = {
    //This controls how the page will look after pressing enter.
    displayListItems: function(listArray, priorityArray) {
        document.write("<h2>High Priority Things to Do:</h2>");
        /*I think document.write must delete all things on a page,
        so I can't add another task to the todo list (except
         through the console).*/
        for (var i = 0; i < listArray.length; i++) {
            if (priorityArray[i] == "highPriority") {
                document.write(listArray[i]);
            }
        }
        document.write("<h2>Low Priority Things to Do:</h2>");
        for (var i = 0; i < listArray.length; i++) {
            if (priorityArray[i] == "lowPriority") {
                document.write(listArray[i]);
            }
        }
    }

};

var controller = {
    //This controls how the arrays are created.
    addToList: function(listArray, todoInput) {
        listArray.push(todoInput);
        return listArray;
    },
    addPriority: function(priorityArray, selectedPriority) {
        priorityArray.push(selectedPriority);
        return priorityArray;
    },
};

function handleEnterButton() {
	var todoInput = document.getElementById("todoInput");
    var select = document.getElementById("priority");
    var listArray = [];
	var listArray = controller.addToList(listArray, todoInput.value);
    var priorityArray = [];
    var priorityArray = controller.addPriority(priorityArray, select.value);
    view.displayListItems(listArray, priorityArray);
	todoInput.value = "";
}

function handleKeyPress(e) {
	var enterButton = document.getElementById("enterButton");
	if (e.keyCode === 13) {
        //The ASCII code for return is 13.
		enterButton.click();
        //Returning false makes sure the form doesn't do anything else,
        //like trying to submit itself.
		return false;
	}
}

window.onload = init;

function init() {
	//Handle when enterButton is clicked.
	var enterButton = document.getElementById("enterButton");
	enterButton.onclick = handleEnterButton;

	//Handle when return is pressed.
	var todoInput = document.getElementById("todoInput");
	todoInput.onkeypress = handleKeyPress;

}
