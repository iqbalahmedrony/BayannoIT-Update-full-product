$(function() {
	
	

	/* jCarousel
	============================== */
	$('.fw-carousel').jcarousel({
		wrap: 'last',
		scroll: 1
	});
	
	

	/* Tooltip
	============================== */
	$('.fw-tooltip').tooltip();
	
	
	
	/* Superfish Dropdown menu
	============================== */
	$("ul.sf-menu").superfish({ 
		pathClass:  'current',
		autoArrows	: false,
		delay:200,
		speed: 'normal',
		animation:   {height:'show'}
	});
	
	
	
	/* Fancybox
	============================== */
	$('.fw-lightbox').fancybox({
		helpers : {
			title : {
				type : 'inside'
			}
		}
	});
	
	// Hover Function for Fancy Box
	$('.fw-lightbox').hover(
		function () {
			//$(this).append('<div class="fw-lightboxoverlay"></div>');
			$('<div class="fw-lightboxoverlay"></div>').hide().appendTo(this).fadeIn();
		},
		function () {
			$(this).children('.fw-lightboxoverlay').remove();
		}
	);
	
	// Hover Function for Overlay link
	$('.fw-linkstyle').hover(
		function () {
			//$(this).append('<div class="fw-lightboxoverlay"></div>');
			$('<div class="fw-overlaylink"></div>').hide().appendTo(this).fadeIn();
		},
		function () {
			$(this).children('.fw-overlaylink').remove();
		}
	);
	
	
	
	/* Quicksand
	============================== */
	if($().quicksand){
        function initQuickSand(){
            // get the action filter option item on page load
            var $filterType = $('#fw-portfoliofilter li.active a').attr('class');

            // get and assign the ourHolder element to the
            // $holder varible for use later
            var $holder = $('ul#gallery');

            // clone all items within the pre-assigned $holder element
            var $data = $holder.clone();

            // assign transition parameters
            var $preferences = {
                duration: 500,
                easing: 'easeInQuad'
            };

            // attempt to call Quicksand when a filter option
            // item is clicked
            $('#fw-portfoliofilter li a').click(function(e){
                // reset the active class on all the buttons
                $('#fw-portfoliofilter li').removeClass('active');
                // assign the class of the clicked filter option
                // element to our $filterType variable
                var $filterType = $(this).attr('class');
                $(this).parent().addClass('active');
                if($filterType == 'all'){
                    // assign all li items to the $filteredData var when
                    // the 'All' filter option is clicked
                    var $filteredData = $data.find('li.portfoliodata');
                }
                else{
                    // find all li elements that have our required $filterType
                    // values for the data-type element
                    var $filteredData = $data.find('li[data-type~=' + $filterType + ']');
                }
                // callback function
                $holder.quicksand($filteredData, $preferences, function() {
					initAllEntrySliders(false);
				});
				
				e.preventDefault();

            });
        }
        initQuickSand();
    }
	
	
	
	/* Pricing Table Slider
	============================== */
	
	// Variable
	var pricingTableNum = 4; // Number of table column
	var pricingTableFlag;
	var pricingTableLimit;
	pricingTableFlag = 0;
	
	$('.fw-pricingtablenav a.nav-next').click(function(e){
		comparisonNext();
		e.preventDefault();
	});
	
	$('.fw-pricingtablenav a.nav-prev').click(function(e){
		comparisonPrev();
		e.preventDefault();
	});
	
	function comparisonNext(){
		pricingTableLimit = checkMaxWidthTable();
		
		if(pricingTableFlag!=pricingTableLimit) {
			$('.fw-pricingtablecontent').animate({
				left: '-=155'
			},300, function(){
				pricingTableFlag -= 155;
			});
		}
	}
	
	function comparisonPrev(){
		if(pricingTableFlag!=0) {
			$('.fw-pricingtablecontent').animate({
				left: '+=155'
			},300, function(){
				pricingTableFlag += 155;
			});
		}
	}
	
	function checkMaxWidthTable(){
		return ($('.fw-pricingtablecontainer').width() - (pricingTableNum*155));
	}
	
	/* Reset position on window resize */
	$(window).resize(function(){
		if(pricingTableFlag!=0) {
			$('#comparison-table-content').animate({
				left: '0'
			},300);
		}
		pricingTableFlag = 0;
	});
	
	
	/* Cycle Slider
	============================== */
	if($().cycle){

	var entrySliders = $('.fw-cycle-slider > ul');

	$.fn.cycle.transitions.scrollHorizontal = function($cont, $slides, opts) {
		$cont.css('overflow', 'hidden');
		opts.before.push($.fn.cycle.commonReset);
		var w = $cont.width();
		opts.cssFirst.left = 0;
		opts.cssBefore.left = w;
		opts.cssBefore.top = 0;
		opts.animIn.left = 0;
		opts.animOut.left = 0-w;

		if( $cont.data('dir') === 'prev' ) {
			opts.cssBefore.left = -w;
			opts.animOut.left = w;
		}
	};

        function initEntrySlider(entrySliders, isFirstTime){
            entrySliders.each(function(i) {
                var slider = $(this);
                var initPerformed = isFirstTime && slider.data('initInvoked');
                if(!initPerformed){
                    slider.data('initInvoked', 'true');

                    var sliderId = 'fw-cycle-slider-'+i;
                    slider.attr('id', sliderId);
                    var prevButtonId = sliderId+'-prev';
                    var nextButtonId = sliderId+'-next';

                    if(slider.data('enable') === 'false' ){
                        return;
                    }

                    slider.css('height', slider.children('li:first').height());
                    var firstSlide = slider.children('li')[0];
                    var lastSlide = slider.children('li')[slider.children('li').length-1];

                    if(slider.children('li').length > 1){
                        if(slider.parent().find('#'+prevButtonId).length==0){
                            slider.parent().append('<div class="fw-cycle-slider-nav"><a id="'+prevButtonId+'" class="prev">Prev</a><a id="'+nextButtonId+'" class="next">Next</a></div>');
                        }
                    }

                    slider.cycle({
                        onPrevNextEvent: function(isNext, zeroBasedSlideIndex, slideElement){
                            $(slideElement).parent().data('dir', isNext? 'next' : 'prev');
                        },
                        before: function( curr, next, opts, forwardFlag ) {
                            var $this = $(this);
                            var sliderId = $this.closest('ul').attr('id');
                            // set the container's height to that of the current slide
                            $this.parent().stop().animate({ height:$this.height() }, opts.speed);
                            if(opts['nowrap']){
                                var prevButton = $('#'+sliderId+'-prev');
                                var nextButton = $('#'+sliderId+'-next');
                                if((firstSlide == next) && (!prevButton.hasClass('disabled'))){
                                    prevButton.addClass('disabled');
                                }else{
                                    prevButton.removeClass('disabled');
                                }

                                if((lastSlide == next) && (!nextButton.hasClass('disabled'))){
                                    nextButton.addClass('disabled');
                                }else{
                                    nextButton.removeClass('disabled');
                                }
                            }
                        },
                        containerResize : false,
                        pauseOnPagerHover : true,
                        nowrap : false, // if true, the carousel will not be circular
                        easing : 'easeInOutExpo',
                        fx : 'scrollHorizontal',
                        speed : 600,
                        timeout : 0,
                        fit : true,
                        width : '100%',
                        pause : true,
                        slideResize : true,
                        slideExpr : 'li',
                        prev : '#' + prevButtonId,
                        next : '#' + nextButtonId
                    });
                }
            });
            if(Modernizr.touch && $().swipe) {
                function doEntrySliderSwipe( e, dir ) {
                    var sliderId = $(e.currentTarget).attr('id');
                    if(dir == 'left' ) {
                        $('#'+sliderId+'-next').trigger('click');
                    }
                    if(dir == 'right' ) {
                        $('#'+sliderId+'-prev').trigger('click');
                    }
                }

                entrySliders.each(function() {
                    var slider = $(this);
                    var initPerformed = isFirstTime && slider.data('swipeInvoked');
                    if(!initPerformed){
                        slider.data('swipeInvoked', 'true');
                        slider.swipe({
                            click       : function(e, target){
                                $(target).trigger('click');
                            },
                            swipeLeft       : doEntrySliderSwipe,
                            swipeRight      : doEntrySliderSwipe,
                            allowPageScroll : 'auto'
                        });
                    }
                });

            }

        }

        function initAllEntrySliders(isFirstTime){
            initEntrySlider($('.fw-cycle-slider > ul'), isFirstTime);
        }

        function resizeEntrySlider(entrySliders){
            entrySliders.each(function() {
                var slider = $(this);
                slider.css('height', slider.children('li:first').height());
            });
        }

        function loadEntrySlider(){
            var entrySliderImages = $('.fw-cycle-slider > ul > li> a > img');
            var unloadedImagesCount = 0;
            var unloadedImages = [];
            entrySliderImages.each(function(){
                if(!this.complete && this.complete != undefined){
                    unloadedImages.push(this);
                    unloadedImagesCount++;
                }
            });
            if(unloadedImagesCount == 0){
                initAllEntrySliders(true);
            }else{
                var initAllEntrySlidersInvoked = false;
                var loadedImagesCount = 0;
                $(unloadedImages).bind('load', function (){
                    loadedImagesCount++;
                    if(loadedImagesCount === unloadedImagesCount){
                        if(!initAllEntrySlidersInvoked){
                            initAllEntrySlidersInvoked = true;
                            initAllEntrySliders(true);
                        }
                    }
                });
                var timer = window.setTimeout( function() {
                    window.clearTimeout(timer);
                    $(unloadedImages).each(function() {
                        if(this.complete || this.complete === undefined) {
                            $(this).trigger('load');
                        }
                    });
                }, 50);

            }
        }

        loadEntrySlider();

        $(window).on('resize', function() {
            var timer = window.setTimeout( function() {
                window.clearTimeout(timer);
                resizeEntrySlider(entrySliders);
            }, 30 );
        });
    }
	
	
	
	/* Validation
	============================== */
	
	/* Blog Section Validation */
	$("#validate").validate({
		rules: {
			name: "required",
			email: {
				required: true,
				email: true
			},
			message: {
				required: true,
				minlength: 20
			}
		}
	});
	
	/* Contact Section Validation */
		$.validator.setDefaults({
			submitHandler: function() { 
				/* get some values from elements on the page: */
				var $form = $( "#fw-contactform" ),
					name = $form.find( 'input[name="name"]' ).val(),
					email = $form.find( 'input[name="email"]' ).val(),
					phone = $form.find( 'input[name="phone"]' ).val(),
					subject = $form.find( 'input[name="subject"]' ).val(),
					message = $form.find( 'textarea[name="message"]' ).val(),
					url = $form.attr( 'action' );
	
				/* Send the data using post and put the results in a div */
				$.post( url, { name: name, email: email, phone: phone, subject: subject, message: message
			}, function( data ) {
					  //var content = $( data ).find( '#content' );
					  //$( "#result" ).empty().append( content );
			}).success(function() { 
					// success
					// reset form values
					$form.find( 'input[name="name"]' ).val('');
					$form.find( 'input[name="email"]' ).val('');
					$form.find( 'input[name="phone"]' ).val('');
					$form.find( 'input[name="subject"]' ).val('');
					$form.find( 'textarea[name="message"]' ).val('');
			}).error(function() {
				$("#fw-contactform").prepend(
					$("<div class=\"alert alert-error fade in\"><button class=\"close\" data-dismiss=\"alert\" type=\"button\">×</button><span class=\"fw-textred\">Error :</span> Sorry, please try again.</div>").hide().fadeIn('slow')
				);
			}).complete(function() { 
				$("#fw-contactform").prepend(
					$("<div class=\"alert alert-success fade in\"><button class=\"close\" data-dismiss=\"alert\" type=\"button\">×</button><span class=\"fw-textred\">Success :</span> Email has been sent</div>").hide().fadeIn('slow')
				);
			});
		}});
		
		$("#fw-contactform").validate({
			rules: {
				name: "required",
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true,
					number: true
				},
				subject: "required",
				message: {
					required: true,
					minlength: 20
				}
			}
		});
	
	/* Twitter Feed
	============================== */
    if($().tweet){
        $(".tweet").tweet({
            username: "envato", // Change username here
            join_text: false,
            avatar_size: false, // you can activate the avatar
            count: 3, // number of tweets
            view_text: "view tweet on twitter",
            seconds_ago_text: "about %d seconds ago",
            a_minutes_ago_text: "about a minute ago",
            minutes_ago_text: "about %d minutes ago",
            a_hours_ago_text: "about an hour ago",
            hours_ago_text: "about %d hours ago",
            a_day_ago_text: "about a day ago",
            days_ago_text: "about %d days ago",
            template: "{avatar}{text}{join}{time}" // [string or function] template used to construct each tweet <li> - see code for available vars
        });

    }
	
	/* Scroll to Top
	============================== */
    if($().UItoTop){
        $().UItoTop({
            scrollSpeed: 600
        });
    }
	
	/* Custom Google Map
	============================== */
	var mapCoodrdinatLat = -6.131187;
	var mapCoodrdinatLng = 106.793734;
	var mapTitle = "Forward, Inc";
	
	if ($('#fw-map').length > 0) {
		initialize(mapCoodrdinatLat, mapCoodrdinatLng, mapTitle);
	}
	
	/* Timeline
	============================== */
	$.timeliner({
		timelineContainer: '#timelineContainer',
		fontOpen: '14px',
		startOpen: '#event01EX',
		fontClosed: '14px'
	});
	
});