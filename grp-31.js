/*! jRespond.js v 0.10 | Author: Jeremy Fields [jeremy.fields@viget.com], 2013 | License: MIT */
!function(a,b,c){"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=c:(a[b]=c,"function"==typeof define&&define.amd&&define(b,[],function(){return c}))}(this,"jRespond",function(a,b,c){"use strict";return function(a){var b=[],d=[],e=a,f="",g="",i=0,j=100,k=500,l=k,m=function(){var a=0;return a="number"!=typeof window.innerWidth?0!==document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth:window.innerWidth},n=function(a){if(a.length===c)o(a);else for(var b=0;b<a.length;b++)o(a[b])},o=function(a){var e=a.breakpoint,h=a.enter||c;b.push(a),d.push(!1),r(e)&&(h!==c&&h.call(null,{entering:f,exiting:g}),d[b.length-1]=!0)},p=function(){for(var a=[],e=[],h=0;h<b.length;h++){var i=b[h].breakpoint,j=b[h].enter||c,k=b[h].exit||c;"*"===i?(j!==c&&a.push(j),k!==c&&e.push(k)):r(i)?(j===c||d[h]||a.push(j),d[h]=!0):(k!==c&&d[h]&&e.push(k),d[h]=!1)}for(var l={entering:f,exiting:g},m=0;m<e.length;m++)e[m].call(null,l);for(var n=0;n<a.length;n++)a[n].call(null,l)},q=function(a){for(var b=!1,c=0;c<e.length;c++)if(a>=e[c].enter&&a<=e[c].exit){b=!0;break}b&&f!==e[c].label?(g=f,f=e[c].label,p()):b||""===f||(f="",p())},r=function(a){if("object"==typeof a){if(a.join().indexOf(f)>=0)return!0}else{if("*"===a)return!0;if("string"==typeof a&&f===a)return!0}},s=function(){var a=m();a!==i?(l=j,q(a)):l=k,i=a,setTimeout(s,l)};return s(),{addFunc:function(a){n(a)},getBreakpoint:function(){return f}}}}(this,this.document));

var $ = jQuery.noConflict();

function onScrollSliderParallax() {
	SEMICOLON.slider.sliderParallax();
	SEMICOLON.slider.sliderElementsFade();
}

var SEMICOLON = SEMICOLON || {};
window.scwEvents = window.scwEvents || {};

(function($){
    // USE STRICT
    "use strict";

    SEMICOLON.initialize = {
        init: function(){
			SEMICOLON.initialize.defaults();
			//SEMICOLON.initialize.goToTop();
		},
        defaults: function(){
			let easingJs = {
				default: 'body',
				file: 'plugins.easing.js',
				error: 'plugins.easing.js: Plugin could not be loaded',
				pluginfn: 'typeof jQuery.easing["easeOutQuad"] !== "undefined"',
				trigger: 'pluginEasingReady',
				class: 'has-plugin-easing'
			};

			let bootstrapJs = {
				default: 'body',
				file: 'plugins.bootstrap.js',
				error: 'plugins.bootstrap.js: Plugin could not be loaded',
				pluginfn: 'typeof bootstrap !== "undefined"',
				trigger: 'pluginBootstrapReady',
				class: 'has-plugin-bootstrap'
			};

			let jRes = jRespond([
				{
					label: 'smallest',
					enter: 0,
					exit: 575
				},{
					label: 'handheld',
					enter: 576,
					exit: 767
				},{
					label: 'tablet',
					enter: 768,
					exit: 991
				},{
					label: 'laptop',
					enter: 992,
					exit: 1199
				},{
					label: 'desktop',
					enter: 1200,
					exit: 10000
				}
			]);

			jRes.addFunc([
				{
					breakpoint: 'desktop',
					enter: function() { $body.addClass('device-xl'); },
					exit: function() { $body.removeClass('device-xl'); }
				},{
					breakpoint: 'laptop',
					enter: function() { $body.addClass('device-lg'); },
					exit: function() { $body.removeClass('device-lg'); }
				},{
					breakpoint: 'tablet',
					enter: function() { $body.addClass('device-md'); },
					exit: function() { $body.removeClass('device-md'); }
				},{
					breakpoint: 'handheld',
					enter: function() { $body.addClass('device-sm'); },
					exit: function() { $body.removeClass('device-sm'); }
				},{
					breakpoint: 'smallest',
					enter: function() { $body.addClass('device-xs'); },
					exit: function() { $body.removeClass('device-xs'); }
				}
			]);

			// SEMICOLON.initialize.functions( easingJs );
			// SEMICOLON.initialize.functions( bootstrapJs );

			// if( ! 'IntersectionObserver' in window ){
			// 	let intersectObserve = {
			// 		default: 'body',
			// 		file: 'intersection-observer.js',
			// 		error: 'intersection-observer.js: Plugin could not be loaded',
			// 		pluginfn: 'typeof window.IntersectionObserver !== "undefined"',
			// 		trigger: 'intersectObservePolyfill',
			// 		class: 'has-polyfill-intersection-observer'
			// 	};

			// 	SEMICOLON.initialize.functions( intersectObserve );
			// }
		}
    };

    SEMICOLON.documentOnResize = {
        init: function(){
            SEMICOLON.header.menufunctions();
        }
    };

    SEMICOLON.header = {
        init: function(){
            SEMICOLON.header.initialize();
            SEMICOLON.header.menufunctions();
			SEMICOLON.header.stickyMenu();
			//SEMICOLON.header.logo();
        },
        initialize: function(){
            if( $headerWrap.length > 0 ) {
				if( $('.header-wrap-clone').length < 1 ) {
					$headerWrap.after('<div class="header-wrap-clone"></div>');
				}
				$headerWrapClone = $('.header-wrap-clone');
			}
        },
        menufunctions: function(){

            let menuSpeed = 200;
            menuSpeed = Number( menuSpeed );

            $primaryMenuTrigger.off( 'click' ).on( 'click', function(){
                if( $body.hasClass('device-md') || $body.hasClass('device-sm') || $body.hasClass('device-xs') ){
                    $( '.primary-menu .menu-container' ).stop( true, true ).slideToggle( menuSpeed );
                    $( '.primary-menu .menu-container' ).toggleClass('d-block');
                }

                $body.toggleClass("primary-menu-open");
				$primaryMenuTrigger.toggleClass("animate");

				$("html").toggleClass('not-scroll');
				$body.toggleClass("not-scroll");
				$(".primary-menu").toggleClass('vh-100');
				return false;
            });

			$( '.menu-container' ).css({ 'display': '' });
			$( '.primary-menu .menu-container' ).removeClass('d-block');
			$(".primary-menu").removeClass('vh-100');
			$("html").removeClass('not-scroll');
			$body.removeClass("not-scroll");
			$body.removeClass("primary-menu-open");
			$primaryMenuTrigger.removeClass("animate");
        },
		stickyMenu: function( headerOffset ){
			
			windowScrT	= $window.scrollTop();
			
			if( $body.hasClass('device-xl') || $body.hasClass('device-lg') ){
				if( windowScrT > headerOffset ) {
					$header.filter(':not(.no-sticky)').addClass('sticky-header');

					if( stickyShrink == 'true' && !$header.hasClass('no-sticky') ){
						if( ( windowScrT - headerOffset ) > Number( stickyShrinkOffset ) ) {
							$header.addClass('sticky-header-shrink');
						} else {
							$header.removeClass('sticky-header-shrink');
						}
					}
				}else{
					SEMICOLON.header.removeStickyness();
				}
			}
		},
		removeStickyness: function(){
			if( $header.hasClass('sticky-header') ){
				$header.removeClass('sticky-header');
				$header.removeClass().addClass(oldHeaderClasses);
				$headerWrap.removeClass().addClass(oldHeaderWrapClasses);
				//if( !$headerWrap.hasClass('force-not-dark') ) { $headerWrap.removeClass('not-dark'); }
				//SEMICOLON.slider.swiperSliderMenu();
				//SEMICOLON.slider.revolutionSliderMenu();
				if( $headerWrapClone.length > 0 && $headerWrap.outerHeight() > $headerWrapClone.outerHeight() ) {
					$headerWrapClone.css({ 'height': $headerWrap.outerHeight() });
				}
			}
			if( ( $body.hasClass('device-sm') || $body.hasClass('device-xs') || $body.hasClass('device-md') ) && ( typeof responsiveMenuClasses === 'undefined' ) ) {
				$header.removeClass().addClass(oldHeaderClasses);
				$headerWrap.removeClass().addClass(oldHeaderWrapClasses);
				//if( !$headerWrap.hasClass('force-not-dark') ) { $headerWrap.removeClass('not-dark'); }
			}
		}
    };

    SEMICOLON.documentOnReady = {
        init: function(){
            SEMICOLON.initialize.init();
            SEMICOLON.header.init();
			SEMICOLON.documentOnReady.windowscroll();
        },
		windowscroll: function(){
			if( $header.length > 0 ){
				headerOffset = $header.offset().top;
				$headerWrap.addClass('position-absolute');
				headerWrapOffset = $headerWrap.offset().top;
				$headerWrap.removeClass('position-absolute');
			}

			let headerDefinedOffset = $header.attr('data-sticky-offset');
			headerWrapOffset = headerOffset;

			SEMICOLON.header.stickyMenu( headerWrapOffset );

			window.addEventListener( 'scroll', function(){
				SEMICOLON.header.stickyMenu( headerWrapOffset );
			}, { passive: true });
		}    
    };

    let $window = $(window),
		windowScrT,
		$body = $('body'),
		$wrapper = $('#wrapper'),
        windowWidth = $window.width(),

		$header = $('#header'),
		oldHeaderClasses = $header.attr('class'),
		
        $headerWrap = $('#header-wrap'),
		oldHeaderWrapClasses = $headerWrap.attr('class'),
		
        $headerWrapClone = '',
		headerOffset = 0,
		headerWrapOffset = 0,
		stickyShrink = $header.attr('data-sticky-shrink') || 'true',
		stickyShrinkOffset = $header.attr('data-sticky-shrink-offset') || 300,

		logo = $('#logo'),
		defaultLogo = logo.find('.standard-logo'),
		defaultLogoImg = defaultLogo.find('img').attr('src'),

        $primaryMenuTrigger = $("#primary-menu-trigger"),
        primaryMenu = $('.primary-menu'),

        resizeTimer;

    $(document).ready( SEMICOLON.documentOnReady.init );

	//$window.on( 'load', SEMICOLON.documentOnLoad.init );

    $window.on( 'resize', function() {
		let thisWindow = $(this);
		SEMICOLON.documentOnResize.init();

		// clearTimeout(resizeTimer);
		// resizeTimer = setTimeout(function() {
		// 	if ( thisWindow.width() !== windowWidth ) {
		// 		SEMICOLON.documentOnResize.init();
		// 	}
		// }, 250);
	});

})(jQuery);