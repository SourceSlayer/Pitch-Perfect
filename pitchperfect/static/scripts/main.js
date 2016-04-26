$(document).ready(function(){
    var topMenu=$("#top-menu");
    var title=$("#title");
    var menu=$("#menu-links ul")
    var menuItems=$("#menu-links ul li");
    var searchEntry=$("#search-container");
    var menuTogglable=$(".menu-togglable");
    function toggleVisibleItems(){
        if($(window).width()<=500){
            menu.css("margin", "0 auto");
            menuItems.css("display", "inline-block");
            menuTogglable.css("display", "none");
        }
        else{
            menu.css("margin", "auto");
            menuTogglable.css("display", "inline-block");
        }
    }
    $(window).scroll(function(){
        topMenu.css("transition", "1s");
        title.css("transition", "1s");
        if($(window).scrollTop()){
            topMenu.css("position", "fixed");
            topMenu.css("border-radius", "15.5px");
            topMenu.css("height", "25px");
            title.css("font-size", "40px");
            menu.css("margin-top", "0");
            menuItems.css("border-left", "1px rgba(15, 15, 15, .8) solid");
            //searchEntry.css("padding", "2px");
            //searchEntry.css("margin-right", "15px");
            /*title.css("text-align", "left");*/
            title.appendTo("top-menu");
        } else {
            //topMenu.css("border-radius", "5px");
            topMenu.css("height", "50px");
            topMenu.css("position", "absolute");
            title.css("font-size", "60px");
            menu.css("margin-top", "16px");
            //menu.css("margin", "0");
            menuItems.css("border-left", "none");
            menuItems.css("padding-left", "25px");
            menuItems.css("padding-right", "25px");
            menuItems.css("padding-top", "4px");
            menuItems.css("padding-bottom", "2px");/**/
            /*searchEntry.css("padding", "2px");
            title.css("text-align", "center");*/
        }
    });
    $(window).resize(toggleVisibleItems)
})
