$(document).ready(function() {
    $("#image_list a").each(function() {
        var swappedImage = new Image();
        swappedImage.src = $(this).attr("href");
    });
    $("#image_list a").click(function(event) {
        var imageUrl = $(this).attr("href");
        $("#main_image").attr("src", imageUrl);

        var caption = $(this).attr("title");
        $("#caption").text(caption);


        event.preventDefault();
    });
});
