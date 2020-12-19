import '../scss/styles-main.scss';

import $ from 'jquery';
import './bootstrap.bundle.min';
import select2 from './select2.full.min';
import slick from 'slick-carousel';
import scrollbar from './jquery.scrollbar.min';
import WOW from "wowjs";


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
    });
    new WOW.WOW().init();

    $('.top_slider_js').slick({
        slidesToShow: 6,
        dots: false,
        arrows: true,
        infinite: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                }
            },
        ]
    });
    $('.top_slider_2_js').slick({
        slidesToShow: 3,
        dots: false,
        arrows: true,
        infinite: false,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                }
            },
        ]
    });

    $('.select2').select2({
        width: '100%',
        minimumResultsForSearch: 20
    }).on('select2:open', function () {
        $('.select2-container--default .select2-results > .select2-results__options').addClass('scrollbar-inner').scrollbar();
    });

    $('.modal').on('hide.bs.modal', function () {
        if($(this).find('video').length > 0 && $(this).find('video')[0]){
            var video = $(this).find('video')[0];

            if (video && video.paused != true) {
                video.pause();
            }
        }

    });
    

});