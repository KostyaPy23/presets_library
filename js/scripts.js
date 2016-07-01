'use strict';

$(document).ready(function() {
	var sidebarMenu = $('.sidebar-nav_menu');
	var staticContent = $('#static-content');
	var title;
	var prevTitle;

	// Init onScroll function that make curennt menu item active depending from position on the page
	$(document).on("scroll", onScroll);

	staticContent.find('h2.article-title').each(function() {
		sidebarMenu.append('<li id="' + $(this).attr('id') + '_menu"><a href="#' + $(this).attr('id') + '">' + $(this).html() + '</li>');
		title = sidebarMenu.find('#' + $(this).attr('id'));

	});
	staticContent.find('h3').each(function() {
		prevTitle = sidebarMenu.find('#' + $(this).prevAll('h2').first().attr('id') + '_menu');
		prevTitle.not(":has(ul)").append('<ul class="sub-menu"></ul>');
		prevTitle.find('.sub-menu').append('<li id="'+ $(this).attr('id') + '-menu"><a href="#' + $(this).attr('id') + '">' + $(this).html() + '</li>');
	});

	sidebarMenu.affix({
      offset: {
        top: 420  // height offset
      }
	});


	$(".btn").click(function() {
		$(".code").toggle(300);
	});

});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.sidebar-nav_menu a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href")).parent();
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.sidebar-nav_menu li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}
