var currentStamdata = 'status';

function setCurrentStamdataHash(current) {
    window.location.hash = current;
}

function setCurrentStamdata(navId) {
    var change = true;
    for (var i = 0; i < $(".stamdata-content").length; i++) {
        if ($(".stamdata-content:nth(" + i + ")").css('display') == 'block') {
            if ((i + 1) == navId) {
                change = false;
                break;
            }          
        }
    }
    if (change) {
        $(".stamdata-content").fadeOut();
        $(".stamdata-content:nth(" + (navId - 1) + ")").fadeIn();
        $(".stamdata-item").css('color', '#666');
        if (window.screen.width < 641) {
            if (navId == 1) {
                $(".stamdata-nav-mobile .stamdataCircle").css('margin-left', 'calc(17% - 7px)');
                $(".stamdata-item:nth(5)").css('color', '#AF1F30');
            }
            else if (navId == 3) {
                $(".stamdata-nav-mobile .stamdataCircle").css('margin-left', 'calc(51% - 7px)');
                $(".stamdata-item:nth(6)").css('color', '#AF1F30');
            }
            else if (navId == 4) {
                $(".stamdata-nav-mobile .stamdataCircle").css('margin-left', 'calc(83% - 7px)');
                $(".stamdata-item:nth(7)").css('color', '#AF1F30');
            }
        }
        else {
            var margin = (20 * navId) - 10;
            $("#stamdataCircle").css('margin-left', 'calc(' + margin + '% - 7px)');
            $(".stamdata-item:nth(" + (navId - 1) + ")").css('color', '#AF1F30');
        }
        
    }
    
}

function focusInput(input) {
    var span = input.parentElement.children[0];
    span.setAttribute("class", "visible-span");
    input.setAttribute("class", "form-control full-input");
}

function disfocusInput(input) {
    if (input.value == '') {
        var span = input.parentElement.children[0];
        span.setAttribute("class", "invisible-span");
        input.setAttribute("class", "form-control empty-input");
    }
    enableAddButton();
}

function enableTherapistForm() {
    $("#therapistForm").slideToggle("slow");
    $("#enabledAddButton")[0].setAttribute("class", "enabled-button-visible");
    $("#disabledAddButton")[0].setAttribute("class", "disabled-button-invisible");
    $("#therapistForm :input").prop('disabled', false);
    enableAddButton();
}

function enableAddButton() {
    var disabled = false;
    for (var i = 0; i < $(".form-control").length; i++) {
        if ($(".form-control")[i].value == "") {
            disabled = true;
        }
    }
    if (disabled) {
        $("#enabledAddButton")[0].setAttribute("class", "enabled-button-invisible");
        $("#disabledAddButton")[0].setAttribute("class", "disabled-button-visible");
    }
    else {
        $("#enabledAddButton")[0].setAttribute("class", "enabled-button-visible");
        $("#disabledAddButton")[0].setAttribute("class", "disabled-button-invisible");
    }
}