'use strict';

$(document).ready(function () {
    var sidebarMenu = $('.sidebar-nav_menu');
    var staticContent = $('#static-content');
    var title;
    var prevTitle;

    // Init onScroll function that make curennt menu item active depending from position on the page
    $(document).on("scroll", onScroll);

    // Run template
    // if($('#itemTmpl').length) {
    // 	$('#itemTmpl').tmpl(imagesItems).appendTo('#item-template-view');
    // }
    //



        // $('#testLayout').innerHTML = nano("<div>" +
        //     "Hello {user.first_name} {user.last_name}! Your account is <strong>{user.account.status}</strong>" +
        //     "<script src='http://gist-it.appspot.com/https://github.com/KostyaPy23/presets_library/blob/master/less/menus-presets/{user.link}'></script>" +
        //     "</div>", data);

    setTimeout(function(){
        $('#testLayout').html(
            nano = nano("<div>" +
                "Hello {user.first_name} {user.last_name}! Your account is <strong>{user.account.status}</strong>" +
                "<script src='{user.link}'></script>" +
                "</div>", data)
        );
    }, 3000);





    // Find h2 title at the content and create main items for sidebar menu
    staticContent.find('h2.article-title').each(function () {
        sidebarMenu.append('<li id="' + $(this).attr('id') + '_menu"><a href="#' + $(this).attr('id') + '">' + $(this).html() + '</li>');
        title = sidebarMenu.find('#' + $(this).attr('id'));

    });
    // Find h3 title at the content and create sub items for sidebar menu
    staticContent.find('h3').each(function () {
        prevTitle = sidebarMenu.find('#' + $(this).prevAll('h2').first().attr('id') + '_menu');
        prevTitle.not(":has(ul)").append('<ul class="sub-menu"></ul>');
        prevTitle.find('.sub-menu').append('<li id="' + $(this).attr('id') + '-menu"><a href="#' + $(this).attr('id') + '">' + $(this).html() + '</li>');
    });

    sidebarMenu.affix({
        offset: {
            top: 420  // height offset
        }
    });

    // Tabs
    $(function () {
        $('ul.tabs-caption').on('click', 'li:not(.active)', function () {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.tabs').find('div.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
        });
    });

    // Back To Top
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
});

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('.sidebar-nav_menu a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href")).parent();
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.sidebar-nav_menu li a').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
    });
}

// window.onload  = function () {
// 	document.getElementById('testLayout').innerHTML = nano("<div>" +
// 		"Hello {user.first_name} {user.last_name}! Your account is <strong>{user.account.status}</strong>" +
// 		"<script src='http://gist-it.appspot.com/https://github.com/KostyaPy23/presets_library/blob/master/less/menus-presets/{user.link}'></script>" +
// 		"</div>", data);
// }