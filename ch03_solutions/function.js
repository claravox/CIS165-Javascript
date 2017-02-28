/* It's been raining a lot recently so this gave me the idea of creating a function to check the weather. However, I don't know how I'd actually do that based on real data, so instead I have a randomly generated number as the chance of weather. */

function predictWeather(weatherType) {
    var chance; //This is the chance of the type of weather occuring.
    chance = Math.floor(Math.random() * 101); //Randomly generate a number anywhere from 0 to 100.
    document.write("The chance of " + weatherType + " is " + chance + "%. "); 
    if (chance < 50) { //If the chance is less than 50%, print that the weather type isn't so likely.
        document.write("It is probably not going to " + weatherType + " today.");
    } else if (chance >= 50 && chance != 100) { //If the chance is over or equal to 50%, print that the weather type is likely.
        document.write("It is likely that it will " + weatherType + " today.");
    } else if (chance == 100) { //If there is a 100% chance of the weather, print that it is certain it will happen.
        document.write("It WILL " + weatherType + " today.");
    }
    document.write("<br>"); //This just creates a new line so if the function is called again it will go on the next line.
}

predictWeather("rain"); //First try this with rain.

predictWeather("snow"); //Then try this with the weather type snow.
