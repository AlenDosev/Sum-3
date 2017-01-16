$(document).ready(function () {
    var currentCard = {};

    $('#videoModal').on('show.bs.modal', function () {
        var modal = $(this)
        var video = localStorage.getItem("videoSrc");
        if (video == null) {
            video = 'video1';          
        }
        $(".intro-slide").hide();
        $(".forvente-slide").hide();
        $(".motion-slide").show();
        $(".smafilm-om").show();
        var topic = localStorage.getItem("videoTopic");
        if (topic == null) {
            topic = 'Motion';
        }
        else if (topic == 'introduktion') {
            $(".intro-slide").show();
            $(".motion-slide").hide();
            $(".forvente-slide").hide();
            $(".smafilm-om").hide();
        }
        else if (topic == 'forløbsplanen') {
            $(".intro-slide").hide();
            $(".motion-slide").hide();
            $(".forvente-slide").show();
            $(".smafilm-om").hide();
        }
        var title = localStorage.getItem("videoTitle");
        if (title == null) {
            title = 'Sadan far jeg motion uden at ga til traening';
        }
        modal.find('#videoSrc').attr('src', "assets/videos/" + video + ".m4v");
        modal.find('#videoSrcWebm').attr('src', "assets/videos/" + video + ".webm");
        $("#videoTopic").text(topic);
        $(".videoTitle").text(title);
        $("#mainVideo").hide();
        $(".uil-reload-css").show();
        $(".play-btn").hide();
        $("#mainVideo").load();
        $("#mainVideo").on('loadeddata', function () {
            $("#mainVideo").show();
            $(".uil-reload-css").hide();
            $(".play-btn").show();
            $("#mainVideo").unbind("loadeddata");
        });
    });

    $('#videoModal').on('shown.bs.modal', function () {
        var slidesPerView = 3;
        if (window.screen.width < 641)
            slidesPerView = 2;
        var swiper5 = new Swiper('.swiper-container.video-swiper', {
            slidesPerView: slidesPerView,
            centeredSlides: false,
            nextButton: '.modal-video-right',
            prevButton: '.modal-video-left',
            keyboardControl: true,
            spaceBetween: 10
        });
        
        var swiperContainerWidth = document.getElementById("videoListContainer").offsetWidth
        $("#videoListContainer img").attr('width', (swiperContainerWidth / slidesPerView) + 'px !important;');
    });
    
    $('#mainModal').on('show.bs.modal', function () {
        currentCard = cards[focusedCard - 1];
        $("#mainModalTitle").text(currentCard.title);
        $("#mainModalPlace").text(currentCard.place);
        $("#mainModalTime").text(currentCard.time);
        $("#mainModalTreat").text(currentCard.treat);       
    });

    $('#mainModal').on('shown.bs.modal', function () {
        dateArray = getDates(currentCard.date.subDays(2), currentCard.date.addDays(6));      
        drawCharts();

        $("#hojdeRow").hide();
        $("#hojdeToggle > span:nth(0)").text('Vis graf');
        $("#hojdeToggle span:nth(1)").removeClass('glyphicon-chevron-down');
        $("#hojdeToggle span:nth(1)").addClass('glyphicon-chevron-up');

        $("#vaegtRow").hide();
        $("#vaegtToggle > span:nth(0)").text('Vis graf');
        $("#vaegtToggle span:nth(1)").removeClass('glyphicon-chevron-down');
        $("#vaegtToggle span:nth(1)").addClass('glyphicon-chevron-up');

        $("#lungeToggle").unbind('click');
        $("#lungeToggle").click(function () {
            $("#lungeRow").slideToggle('slow');
            if ($("#lungeToggle span:nth(1)").hasClass('glyphicon-chevron-down')) {
                $("#lungeToggle span:nth(1)").removeClass('glyphicon-chevron-down');
                $("#lungeToggle span:nth(1)").addClass('glyphicon-chevron-up');
                $("#lungeToggle > span:nth(0)").text('Vis graf');
            }
            else {
                $("#lungeToggle span:nth(1)").removeClass('glyphicon-chevron-up');
                $("#lungeToggle span:nth(1)").addClass('glyphicon-chevron-down');
                $("#lungeToggle > span:nth(0)").text('Skjul graf');
            }
        });

        $("#vaegtToggle").unbind('click');
        $("#vaegtToggle").click(function () {
            $("#vaegtRow").slideToggle('slow');
            if ($("#vaegtToggle span:nth(1)").hasClass('glyphicon-chevron-down')) {
                $("#vaegtToggle span:nth(1)").removeClass('glyphicon-chevron-down');
                $("#vaegtToggle span:nth(1)").addClass('glyphicon-chevron-up');
                $("#vaegtToggle > span:nth(0)").text('Vis graf');
            }
            else {
                $("#vaegtToggle span:nth(1)").removeClass('glyphicon-chevron-up');
                $("#vaegtToggle span:nth(1)").addClass('glyphicon-chevron-down');
                $("#vaegtToggle > span:nth(0)").text('Skjul graf');
            }
        });

        $("#hojdeToggle").unbind('click');
        $("#hojdeToggle").click(function () {
            $("#hojdeRow").slideToggle('slow');
            if ($("#hojdeToggle span:nth(1)").hasClass('glyphicon-chevron-down')) {
                $("#hojdeToggle span:nth(1)").removeClass('glyphicon-chevron-down');
                $("#hojdeToggle span:nth(1)").addClass('glyphicon-chevron-up');
                $("#hojdeToggle > span:nth(0)").text('Vis graf');
            }
            else {
                $("#hojdeToggle span:nth(1)").removeClass('glyphicon-chevron-up');
                $("#hojdeToggle span:nth(1)").addClass('glyphicon-chevron-down');
                $("#hojdeToggle > span:nth(0)").text('Skjul graf');
            }
        });
    });
  
    $(".modal").on('show.bs.modal', function () {
        if ($(this).prop('id') != 'introduktionModal') {
            $(document).keyup(function (e) {
                if (e.keyCode == 27) {
                    $(document).unbind("keyup");
                    closeModal();
                }
            });
        }      
    });    

    $('#introduktionModal').on('shown.bs.modal', function () {
        $(document).keyup(function (e) {
            if (e.keyCode == 27) {
                closeIntroduktion();
                $(document).unbind("keyup");
            }
        });
        var swiper1 = new Swiper('.swiper-introduktion', {
            slidesPerView: 1,
            centeredSlides: false,
            nextButton: '.introduktion-right',
            prevButton: '.introduktion-left',
            keyboardControl: true,
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
    });

    $('#medicinModal').on('show.bs.modal', function () {
        $("#medicinVideosContainer video:nth(0)").hide
        $("#medicinVideosContainer img").hide();
        $(".uil-reload-css").show();
        $(".play-btn").hide();
        $("#medicinVideosContainer video").load();
        $("#medicinVideosContainer video:nth(0)").on('loadeddata', function () {
            $("#medicinVideosContainer img").show();
            $("#medicinVideosContainer video:nth(0)").show();
            $(".uil-reload-css").hide();
            $(".play-btn").show();
            $("#medicinVideosContainer video:nth(0)").unbind("loadeddata");
        });
    });

    $('#medicinModal').on('shown.bs.modal', function () {
        $(".medicin-title").text(localStorage.getItem("medicinTitle"));
        if(localStorage.getItem("medicinStar") == "true"){
            $("#medicinModal .star-btn").css('display', 'flex');
        }
        else{
            $("#medicinModal .star-btn").hide();
        }

        var slidesPerView = 3;
        if (window.screen.width < 641)
            slidesPerView = 2;
        var swiper7 = new Swiper('.swiper-container.medicin-swiper', {
            slidesPerView: slidesPerView,
            centeredSlides: false,
            nextButton: '.medicin-right',
            prevButton: '.medicin-left',
            keyboardControl: true,
            spaceBetween: 15
        });

        var swiperContainerWidth = document.getElementById("medicinListContainer").offsetWidth;
        $("#medicinListContainer img").attr('width', '100%');
        var swiper8 = new Swiper('.swiper-container.medicin-video-swiper', {
            slidesPerView: 1,
            centeredSlides: false,
            nextButton: '.medicin-video-right',
            prevButton: '.medicin-video-left',
            keyboardControl: false
        });

        medicinSwiper = swiper8;       
    });

    $('#additionsModal').on('shown.bs.modal', function () {
        var slidesPerView = 3;
        if (window.screen.width < 641)
            slidesPerView = 2;
        var swiper11 = new Swiper('.swiper-container.additions-swiper', {
            slidesPerView: slidesPerView,
            centeredSlides: false,
            nextButton: '.additions-down',
            prevButton: '.additions-up',
            keyboardControl: true,
            direction: 'vertical'
        });
    });
});

var medicinSwiper;
var dateArray = [];
function pauseVideos() {
    $('video').each(function () {
        $(this).get(0).pause();
    });
    closeModal();
}

function changeMainVideoSrc(src, topic, title) {
    if (src != localStorage.getItem("videoSrc")) {
        localStorage.setItem("videoSrc", src);
        localStorage.setItem("videoTopic", topic);
        localStorage.setItem("videoTitle", title);
        $("#videoTopic").text(topic);
        $(".videoTitle").text(title);
        $("#videoSrc").attr('src', 'assets/videos/' + src + '.m4v');
        $("#videoSrcWebm").attr('src', 'assets/videos/' + src + '.webm');
        $("#mainVideo").hide();
        $(".uil-reload-css").show();
        $("#mainVideo").load();
        $("#mainVideo").on('loadeddata', function () {
            $("#mainVideo").show();
            $(".uil-reload-css").hide();
            $("#mainVideo").unbind("loadeddata");
        });
    }    
}

function changeMedicinVideo(id) {
    medicinSwiper.slideTo(id);
}
function changeMedicinVideoSrc(src) {
    $("#medicinVideoSrc").attr('src', 'assets/videos/' + src + '.m4v');
    $("#medicinVideoSrcWebm").attr('src', 'assets/videos/' + src + '.webm');
    $("#medicinMainVideo").hide();
    $(".uil-reload-css").show();
    $("#medicinMainVideo").load();
    $("#medicinMainVideo").on('loadeddata', function () {
        $("#medicinMainVideo").show();
        $(".uil-reload-css").hide();
        $("#medicinMainVideo").unbind("loadeddata");
    });
}

function openModal(modal, param) {
    if (modal == "filmListModal") {
        if (param == 'motion') {
            $("#filmListMotion").click();
        }
        else if (param == 'medicin') {
            $("#filmListMedicin").click();
        }
    }
    
    window.location.hash = modal;
    $("body").css("overflow-y", "hidden");
    $(".main--row").css("position", "fixed");
    $(".main--row").css("overflow-y", "none");
}

function closeModal() {
    $('.modal').modal('hide');
    window.location.hash = currentState;
    window.scrollTo(0, 0);
    $("body").css("overflow-y", "auto");
    $(".main--row").css("position", "inherit");
    $(".main--row").css("overflow-y", "inherit");
}

function closeIntroduktion() {
    $(".header--top-right button").attr('disabled', 'true');
    $(".modal-backdrop").hide();
    $('#introduktionModal .modal-content').css({
        overflow: 'hidden',
        height: $('#introduktionModal .modal-content').height() + 'px',
        width: $('#introduktionModal .modal-content').width() + 'px',
        transition: 'all 1.3s'
    });
    setTimeout(function () {
        $('#introduktionModal .modal-content').css('width', '0px');
        $('#introduktionModal .modal-content').css('height', '0px');
        $('#introduktionModal .modal-content').css('margin-left', '650px');
        $('#introduktionModal .modal-content').css('margin-top', '-20px');
        $('#introduktionModal .modal-content').css('opacity', '0');
        setTimeout(function () {
            $('#introduktionModal').removeClass('in');
            setTimeout(function () {
                $('.modal .modal-content').removeAttr("style");
                $(".header--top-right button").removeAttr('disabled');
            }, 1000);
            window.location.hash = currentState;
            $("body").css("overflow-y", "auto");
        }, 1000);
    }, 1);
}

function setIntroduktionType(intId) {
    $(".introduktion-content").hide();
    $(".introduktion-content:nth(" + (intId - 1) + ")").show();
    var margin = (50 * intId) - 25;
    $("#introduktionCircle").css('margin-left', 'calc(' + margin + '% - 3px)');
    $(".introduktion-item").css('color', '#666');
    $(".introduktion-item:nth(" + (intId - 1) + ")").css('color', '#AF1F30');
}

function setForventeType(fvId) {
    $(".forvente-content").hide();
    $(".forvente-content:nth(" + (fvId - 1) + ")").show();
    var margin = (40 * fvId) - 20;
    $("#forventeCircle").css('margin-left', 'calc(' + margin + '% + 3px)');
    $(".forvente-item").css('color', '#666');
    $(".forvente-item:nth(" + (fvId - 1) + ")").css('color', '#AF1F30');
}

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

Date.prototype.subDays = function (days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() - days);
    return dat;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(currentDate)
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

function openVideoModal(videoSrc, topic, title) {
    localStorage.setItem("videoSrc", videoSrc);
    localStorage.setItem("videoTopic", topic);
    localStorage.setItem("videoTitle", title);
    window.location.hash = 'videoModal';
}

function toggleListModalItems(item){
    $(item).toggleClass("fa-plus");
    $(item).toggleClass("fa-minus");
    $(item).parent().siblings('.modal-list-items-wrapper').slideToggle('slow');
}

function toggleListModalItems(item) {
    $(item).toggleClass("fa-plus");
    $(item).toggleClass("fa-minus");
    $(item).parent().siblings('.modal-list-items-wrapper').slideToggle('slow');
}

function toggleAccordion(item) {
    $(item).toggleClass("fa-plus");
    $(item).toggleClass("fa-minus");
    $(item).parent().siblings(".accordion-row-content").slideToggle();   
}

function selectStar(item) {
    var remove = false;
    $(item).toggleClass("selected-star");
    var itemText = $(item).parent().siblings(0).children("span").text();
    var accordionRowRight = $(item).parent().parent().parent().siblings(".accordion-row-right");
    if (accordionRowRight.children().length == 0) {
        var drawItem = '<div class="accordion-row-right-item ' + itemText + '">' +
                        '<i class="fa fa-star star-btn selected-star" aria-hidden="true"></i>' +
                    '</div>';
        accordionRowRight.append(drawItem);
    }
    else {
        for (var i = 0; i < accordionRowRight.children().length; i++) {
            if (accordionRowRight.children(':nth(' + i + ')').children().parent().hasClass(itemText)) {
                remove = true;
                break;
            }           
        }
        if (remove) {
            accordionRowRight.children(':nth(' + i + ')').remove();
        }
        else {
            var drawItem = '<div class="accordion-row-right-item ' + itemText + '">' +
                        '<i class="fa fa-star star-btn selected-star" aria-hidden="true"></i>' +
                    '</div>';
            accordionRowRight.append(drawItem);
        }
    }  
}

function openMedicinModal(item) {
    localStorage.setItem("medicinTitle", $(item).find("span").text());
    localStorage.setItem("medicinStar", $(item).siblings().find("i").hasClass('selected-star'));
    window.location.hash = 'medicinModal';
}

function expandModalContainer(item) {
    $(item).parent().siblings(".expand-container").slideToggle('slow');
}

function downloadPdf() {
    var link = document.createElement("a");
    link.download = '';
    link.href = "assets/dummy_pdf.pdf";
    link.click();
}

function printPage() {
    window.print();
}