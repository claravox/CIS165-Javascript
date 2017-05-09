//Use this webpage to find RegEx validation https://gist.github.com/nerdsrescueme/1237767
$(document).ready(function() {
	// move focus to first text box
	$("#datepicker").datepicker({
    	maxDate: +15,
    	showButtonPanel: true
  });

	// move focus to first text box
	$("#email").focus();

	// the handler for the click event of a submit button
	$("#order_form").submit(
		function(event) {
			var isValid = true;

			// validate the email entry with a regular expression
			var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
			var email = $("#email").val().trim();
			if (email == "") {
				$("#email").next().text("This field is required.");
				isValid = false;
			} else if ( !emailPattern.test(email) ) {
				$("#email").next().text("Must be a valid email address.");
				isValid = false;
			} else {
				$("#email").next().text("");
			}
			$("#email").val(email);


			// validate the password entry
			var password = $("#password").val().trim();
			if (password.length < 6) {
				$("#password").next().text("Must be 6 or more characters");
				isValid = false;
			} else {
				$("#password").next().text("");
			}
			$("#password").val(password);

      // validate the password entry
			var confirm = $("#confirm").val().trim();
			if (password !== confirm ) {
				$("#confirm").next().text("Must equal first password.");
				isValid = false;
			} else {
				$("#confirm").next().text("");
			}
			$("#confirm").val(confirm);

			// validate the first name entry
			if ($("#first_name").val() == "") {
				$("#first_name").next().text("This field is required.");
				isValid = false;
			} else {
				$("#first_name").next().text("");
			}

			// validate the last name entry
			var lastName = $("#last_name").val().trim();
			if (lastName == "") {
				$("#last_name").next().text("This field is required.");
				isValid = false;
			} else {
				$("#last_name").next().text("");
			}
			$("#last_name").val(lastName);

			// validate the state entry
			 //Alphabetic characters only
		  var statePattern = /^[a-zA-Z]*$/;
			var state = $("#state").val().trim();
			if (state == "") {
				$("#state").next().text("This field is required.");
				isValid = false;
			} else if ( !statePattern.test(state) || state.length != 2) {
				$("#state").next().text("Use 2-character code.");
				isValid = false;
			} else {
				$("#state").next().text("");
			}
			$("#state").val(state);

			// validate the zip-code entry
			 //US ZIP Codes regex with optional 4 digits
			var zipPattern = /^([0-9]{5}(?:-[0-9]{4})?)*$/;
			var zip = $("#zip").val().trim();
			if (zip == "") {
				$("#zip").next().text("This field is required.");
				isValid = false;
			} else if ( !zipPattern.test(zip) || zip.length != 5 ) {
				$("#zip").next().text("Use 99999 format.");
				isValid = false;
			} else {
				$("#zip").next().text("");
			}
			$("#zip").val(zip);

			// validate the check boxes
			var checkedOptions = [];
			checkedOptions = $(":checkbox:checked");
			if (checkedOptions.length == 0) {
				$("#catalog").next().text("Select at least one.");
				isValid = false;
			} else {
				$("#catalog").next().text("");
			}

			// prevent the default action of submitting the form if any entries are invalid
			if (isValid == false) {
				event.preventDefault();
			}
		} // end function
	);	// end submit
}); // end ready
