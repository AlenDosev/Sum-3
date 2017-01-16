$(document).ready(function () {
    importExternalHtml();
    $(".nav1").click(function () {
        window.location.hash = "information";
        window.scrollTo(0, 0);
    });

    $(".nav2").click(function () {
        window.location.hash = currentStamdata;
        window.scrollTo(0, 0);
    });

    $(".nav3").click(function () {
        window.location.hash = "konsultationer";
        window.scrollTo(0, 0);
    });

    $(".nav4").click(function () {
        if (huskOpen) {
            for (var i = 0; i < $(".content-element").length; i++) {
                if ($(".content-element:nth(" + i + ")").css('display') == 'block') {
                    if ($(".content-element:nth(" + i + ")").prop('id') == 'stamdata') {
                        window.location.hash = currentStamdata;
                    }
                    else {
                        window.location.hash = $(".content-element:nth(" + i + ")").prop('id');
                    }
                    break;
                }
            }
        }
        else {
            window.location.hash = "husk";
        }
        window.scrollTo(0, 0);
    });
   
});

var currentState = 'information';
var huskOpen = false;

function init() {
    if ($("html").hasClass("no-csstransitions")) {
        $("#swiper-min").remove();
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "../scripts/libraries/swiper.jquery.min.js";
        // Use any selector
        $("head").append(s);
    }
    $("#leftNavPointerLine").css('width', '24%');
    $(".nav1").addClass("nav--item-active");

    $("#information").hide();
    $(".card").hide();

    $('#konsultationer').on('swipedown', function () { moveUp() });
    $('#konsultationer').on('swipeup', function () { moveDown() });
    
    initCharts();
    initCards();

    setTimeout(function () {
        $(".main--row").removeClass('hide-main');
        $(".uil-ring-css").hide();
        var minStamdataHeight = 0;
        for (var i = 0; i < $(".stamdata-content").length; i++) {
            if ($(".stamdata-content:nth(" + i + ")").height() > minStamdataHeight) {
                minStamdataHeight = $(".stamdata-content:nth(" + i + ")").height();
            }
        }

        $(".stamdata-content-container").css('min-height', (minStamdataHeight + 100) + 'px');
        $(window).trigger('hashchange');
    }, 500);
       
    setCurrentStamdata();
    $(".mobile-nav select").change(function () {
        if (this.value == "1") {
            $(".nav1").click();
        }
        else if (this.value == "2") {
            $(".nav2").click();
        }
        else if (this.value == "3") {
            $(".nav3").click();
        }
        else if (this.value == "4") {
            $(".nav4").click();
        }
        else if (this.value == "5") {
            openModal('forventeModal');
        }
        else if (this.value == "6") {
            openModal('introduktionModal');
        }
    });

}

function initPage() {
    $('.modal').modal('hide');
    $(".content-element").hide();
    $("#" + currentState).show();
    if (currentState == 'information') {
        setNavs(1);
    }
    else if (currentState == 'stamdata') {
        setNavs(2);
    }
    else if (currentState == 'konsultationer') {
        setNavs(3);
    }    
}

function setNavs(currentNav) {    
    $(".nav > div").removeClass("nav--item-active");
    $(".nav > div").addClass("nav--item-passive");

    $(".mobile-nav-item").removeClass("nav--item-active");

    $(".nav" + currentNav).removeClass("nav--item-passive");
    $(".nav" + currentNav).addClass("nav--item-active");
    if (currentNav == 4) {
        var offset = $(".nav").position().top + $(".nav").height();
        $("#overlay").show();
        $("#overlay").css('top', offset + 'px');
        $("#overlay").css('height', 'calc(100% - ' + offset + 'px)');
        $("#husk").css('margin-top', $(".nav").height() + 'px');        
    }
}

(function () {
    /* scroll UP and scroll down touch events */
    var supportTouch = $.support.touch,
                scrollEvent = "touchmove scroll",
                touchStartEvent = supportTouch ? "touchstart" : "mousedown",
                touchStopEvent = supportTouch ? "touchend" : "mouseup",
                touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function () {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function (event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[0] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [data.pageX, data.pageY],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[0] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [data.pageX, data.pageY]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function (event) {
                            $this.unbind(touchMoveEvent, moveHandler);
                            if (start && stop) {
                                if (stop.time - start.time < 1000 &&
                                        Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                        Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                    start.origin
                                            .trigger("swipeupdown")
                                            .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                                }
                            }
                            start = stop = undefined;
                        });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function (event, sourceEvent) {
        $.event.special[event] = {
            setup: function () {
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });
    // the code here is executed once in its own scope
})();

function importExternalHtml() {
    $(".main--row").addClass('hide-main');
    $('#header').load('views/components/header.html', function () {
        $('#information').load('views/components/information.html', function () {
            $('#stamdata').load('views/components/stamdata.html', function () {
                $('#husk').load('views/components/husk.html', function () {
                    $('#mainModal').load('views/modals/mainModal.html', function () {
                        $('#textFirstModal').load('views/modals/textFirstModal.html', function () {
                            $('#introduktionModal').load('views/modals/introduktionModal.html', function () {
                                $('#textBehandlereModal').load('views/modals/textBehandlereModal.html', function () {
                                    $('#textAngstModal').load('views/modals/textAngstModal.html', function () {
                                        $('#listModal').load('views/modals/listModal.html', function () {
                                            $('#videoModal').load('views/modals/videoModal.html', function () {
                                                $('#filmListModal').load('views/modals/filmListModal.html', function () {
                                                    $('#textFlojtenModal').load('views/modals/textFlojtenModal.html', function () {
                                                        $('#textAndenodModal').load('views/modals/textAndenodModal.html', function () {
                                                            $('#textParorendeModal').load('views/modals/textParorendeModal.html', function () {
                                                                $('#textLaegensModal').load('views/modals/textLaegensModal.html', function () {
                                                                    $('#textRygestopstilbudModal').load('views/modals/textRygestopstilbudModal.html', function () {
                                                                        $('#textPatiententsModal').load('views/modals/textPatiententsModal.html', function () {
                                                                            $('#textGodeModal').load('views/modals/textGodeModal.html', function () {
                                                                                $('#forventeModal').load('views/modals/forventeModal.html', function () {
                                                                                    $('#accordionListModal').load('views/modals/accordionListModal.html', function () {
                                                                                        $('#medicinModal').load('views/modals/medicinModal.html', function () {
                                                                                            $("#additionsModal").load('views/modals/additionsModal.html', function () {
                                                                                                init();
                                                                                            });
                                                                                        });
                                                                                    });                                                                                 
                                                                                });                                                                               
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function alignInfo() {   
    var column1 = $(".information--main-container > div:nth(0)");
    var column2 = $(".information--main-container > div:nth(1)");
    column1.find("> div:nth(1)").removeAttr("style");
    column1.find("> div:nth(2)").removeAttr("style");
    column2.find("> div:nth(1)").removeAttr("style");

    if (column1.height() > column2.height()) {
        column2.find("> div:nth(1)").css('margin-top', (column1.height() - column2.height()) + 'px');
    }
    else {
        var margin = (column2.height() - column1.height()) / 2;
        column1.find("> div:nth(1)").css('margin-top', margin + 'px');
        column1.find("> div:nth(2)").css('margin-top', margin + 'px');
    }
}

function huskBook(self) {
    $(self).addClass('gray');
    $(self).find("button").text('Det er klaret');
    $(self).removeAttr("onclick");
    $(self).css('cursor', 'auto');
    $(self).find("button").css('cursor', 'auto');
    $(self).find("button").attr('disabled', 'true');
}

function playBtnClick(self) {
    $(self).siblings("video")[0].play();
    $(self).hide();
}

function pauseVideo(self) {
    $(self).siblings(".play-btn").show();
}

function playVideo(self) {
    $(self).siblings(".play-btn").hide();
}