$(window).hashchange(function () {
    $("body").css("overflow-y", "auto");
    window.scrollTo(0, 0);
    var hash = location.hash;
    huskOpen = false;
    $("#overlay").hide();
    $(".nav > .nav4 > i").css('display', 'none');
    $(".nav4 > .nav-header").show();
    if (hash == '#information') {       
        currentState = 'information';
        initPage();
        alignInfo();
        var slides = 2;
        setTimeout(function () {
            if ($(window).width() < 460) {
                slides = 1;              
            }
            var swiper1 = new Swiper('.swiper1', {
                slidesPerView: slides,
                centeredSlides: false,
                nextButton: '.information-right',
                prevButton: '.information-left',
                keyboardControl: true,
                spaceBetween: 20
            });
        }, 1);
    }
    else if (hash == '#konsultationer') {
        currentState = 'konsultationer';
        initPage();
    }
    else if (hash == '#husk') {
        $(".nav4 > i").css('display', '');
        $(".nav4 > .nav-header").hide();
        $('.modal').modal('hide');
        $("#husk").show();
        setNavs(4);
        huskOpen = true;
    }
    else if (hash == '#listModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#listModal").modal("show",{
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#filmListModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#filmListModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#textFirstModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#textFirstModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#textFlojtenModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#textFlojtenModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#textAndenodModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#textAndenodModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#textBehandlereModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#textBehandlereModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#textParorendeModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#textParorendeModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#textLaegensModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#textLaegensModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#textRygestopstilbudModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#textRygestopstilbudModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#textPatiententsModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#textPatiententsModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#textAngstModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#textAngstModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#textGodeModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#textGodeModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#videoModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#videoModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#mainModal') {
        currentState = "konsultationer";
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#mainModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#status') {
        currentState = 'stamdata';
        currentStamdata = 'status';
        initPage();
        setCurrentStamdata(1);
    }
    else if (hash == '#myself') {
        currentState = 'stamdata';
        currentStamdata = 'myself';
        initPage();
        setCurrentStamdata(2);
    }
    else if (hash == '#medicin') {
        currentState = 'stamdata';
        currentStamdata = 'medicin';
        initPage();
        setCurrentStamdata(3);
    }
    else if (hash == '#therapists') {
        currentState = 'stamdata';
        currentStamdata = 'therapists';
        initPage();
        setCurrentStamdata(4);
    }
    else if (hash == '#consent') {
        currentState = 'stamdata';
        currentStamdata = 'consent';
        initPage();
        setCurrentStamdata(5);
    }
    else if (hash == '#introduktionModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        setIntroduktionType(1);
        $("#introduktionModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#forventeModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        setForventeType(1);
        $("#forventeModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#accordionListModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#accordionListModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#medicinModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#medicinModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (hash == '#additionsModal') {
        initPage();
        $("body").css("overflow-y", "hidden");
        $("#additionsModal").modal("show", {
            backdrop: 'static',
            keyboard: false
        });
    }
    else {
        window.location.hash = "information";
    }

    if (window.screen.width < 641) {
        if (location.hash == "#information") {
            $(".mobile-nav select")[0].value = "1";
        }
        else if (location.hash == "#konsultationer") {
            $(".mobile-nav select")[0].value = "3";
        }
        else if (location.hash == "#husk") {
            $(".mobile-nav select")[0].value = "4";
        }
        else if (location.hash == "#status" || location.hash == "#myself" ||location.hash == "#medicin" ||location.hash == "#therapists" ||location.hash == "#consent") {
            $(".mobile-nav select")[0].value = "2";
        }
    }
});

$.fn.modal.prototype.constructor.Constructor.DEFAULTS.backdrop = 'static';