import '../scss/styles-main.scss';

import $ from './jquery-3.5.1.min';
import './bootstrap.bundle.min';
import './select2.full.min';
import './slick.min';
import './jquery.scrollbar.min';

$().ready(function () {
    function setHeightPage() {
        var height = window.innerHeight - $('header').outerHeight() - $('footer').outerHeight();
        $('.min_height__js').css('min-height', height + 'px');
    }
    setHeightPage();
    $(window).on('resize', function () {
        setHeightPage();
    });

    $(document).on('click', '.toggle_menu_js', function () {
        $('html').toggleClass('opened-menu');
    })
});