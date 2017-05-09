$(document).ready(function() {
    $("#accordion").accordion({
        event: "dblclick",
        heightStyle: "content",
        collapsible: true,
        active: false,
        icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" }
    });

});
