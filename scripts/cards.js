var numberOfCards = 0;
var focusedCard;
var enabledGoUp = true;
var enabledGoDown = true;
var cards = [];

if (sessionStorage.focusedCard == undefined) {
    focusedCard = 4;
    sessionStorage.focusedCard = focusedCard;
}
else {
    focusedCard = Number(sessionStorage.focusedCard);
}

function initCards() {   
    var card1 = {
        type: "card",
        updated: "OPDATERET April 15, 2015",
        title: " Almindelig konsultation 10. april 2016",
        place: "Lægehuset, Stadion Alle 34, Lunderskov",
        time: "Mandag den 11. april 2016 kl. 11.20",
        date: new Date(2016, 3, 11),
        treat: "AGH",
        latest: false
      }
    var card2 = {
        type: "card",
        updated: "OPDATERET Juli 20, 2015",
        title: "Opfølgning hos sygeplejersken 27. april 2015",
        place: "Lægehuset Stadion Allé 34, Lunderskov",
        time: "Mandag den 27. april 2015",
        date: new Date(2015, 3, 27),
        treat: "MFA",
        latest: false
    }
    var card3 = {
        type: "card",
        updated: "OPDATERET Juli 20, 2015",
        title: "3-måneders kontrol 15. juli 2016",
        place: "Lægehuset Stadion Allé 34, Lunderskov",
        time: "Onsdag den 15. juli 2015",
        date: new Date(2016, 6, 15),
        treat: "AGH",
        latest: true
    }
    var card4 = {
        type: "card",
        updated: "OPDATERET Juli 20, 2015",
        title: "Konsultation influenza-vaccination mandag 28. september 2015",
        place: "Lægehuset Stadion Allé 34, Lunderskov",
        time: "Onsdag den 15. juli 2015",
        date: new Date(2015, 8, 28),
        treat: "AGH",
        latest: false
    }
    var card5 = {
        type: "card",
        updated: "OPDATERET Juli 20, 2015",
        title: "Årskontrol fredag den 22. januar 2015",
        place: "Lægehuset Stadion Allé 34, Lunderskov",
        time: "Fredag den 22. januar 2015",
        date: new Date(2015, 0, 22),
        treat: "AGH",
        latest: false
    }

    cards.push(card5);
    cards.push(card4);
    cards.push(card3);
    cards.push(card2);
    cards.push(card1);

    for (var i = 0; i < cards.length; i++) {
        drawCard(cards[i].updated, cards[i].title, cards[i].place, cards[i].time, cards[i].treat, cards[i].latest, i + 1);
    }
    numberOfCards = cards.length;
        
    setBehind2Card($("#" + (focusedCard - 2)));
    setBehind1Card($("#" + (focusedCard - 1)));
    setFocusedCard($("#" + focusedCard));
    setFrontCard($("#" + (focusedCard + 1)));
    
    for (var i = focusedCard + 2; i <= numberOfCards; i++) {
        setFrontCard($("#" + (i)));
        $("#" + (i)).css('opacity','0');
    }

    for (var i = 1; i < focusedCard - 2; i++) {
        setBehind2Card($("#" + (i)));
        $("#" + (i)).css('opacity', '0');
    }
    setStickyButtons();
    $(".card").addClass('transform');
}

function moveCards(goUp) {       
    moveBehind2Card($("#" + (focusedCard - 2)), goUp);
    moveBehind1Card($("#" + (focusedCard - 1)), goUp);
    moveFocusedCard($("#" + (focusedCard)), goUp);
    moveFrontCard($("#" + (focusedCard + 1)), goUp);

    if (goUp) {
        $("#" + (focusedCard - 2)).css("opacity", "1");
        $("#" + (focusedCard + 2)).css("opacity", "0");
    }
    else {
        $("#" + (focusedCard + 1)).css("opacity", "1");
        $("#" + (focusedCard - 3)).css("opacity", "0");
    }    

    setStickyButtons();
}

function drawCard(updated, title, place, time, treat, latest, id) {
    var card =
        "<div id='" + id + "' class='card'>" +
            "<div class='row card--row col-xs-12'>" +
                "<span class='card--header-left'>KOL FORLØBSPLAN</span>";
    if (latest) {
        card = card +
                "<div class='card--header-right'>" +
                        "<span>" + updated + "</span>" +
                "</div>";
    }                        
    card = card +   			    
	        "</div>" +
		    "<span class='card--title'>" + title + "</span>" +
		    "<div class='col-sm-2 col-xs-3 card--content-left'>" +
			    "<span>STED:</span>" +
		    "</div>" +
		    "<div class='col-sm-10 col-xs-9 card--content-right'>" +
			    "<span>" + place + "</span>" +
		    "</div>" +
		    "<div class='col-sm-2 col-xs-3 card--content-left'>" +
			    "<span>TIDSPUNKT:</span>" +
		    "</div>" +
		    "<div class='col-sm-10 col-xs-9 card--content-right'>" +
			    "<span>" + time + "</span>" +
		    "</div>" +
		    "<div class='col-sm-2 col-xs-3 card--content-left'>" +
			    "<span>BEHANDLER:</span>" +
		    "</div>" +
		    "<div class='col-sm-10 col-xs-9 card--content-right'>" +
			    "<span>" + treat + "</span>" +
		    "</div>" +
		    "<button class='card--button' onclick=\"openModal('mainModal')\">VIS MERE</button>" +
        "</div>";

    $(".konsultationer--content").append(card);
}

function moveUp() {
    if (enabledGoUp) {       
        focusedCard--;
        sessionStorage.focusedCard = focusedCard;
        moveCards(true);
    }
};

function moveDown() {
    if (enabledGoDown) {
        focusedCard++;
        sessionStorage.focusedCard = focusedCard;
        moveCards(false);
    }
};

function setFocusedCard(focused) {
    if (screen.width > 1441) {
        focused.css({ transform: 'translate(0%, 0px)', 'width': '75%', 'z-index': '2', 'cursor': 'auto' });
    }
    else if (screen.width > 481) {
        focused.css({ transform: 'translate(-2.5%, 0px)', 'width': '80%', 'z-index': '2', 'cursor': 'auto' });
    }
    else {
        focused.css({ transform: 'translate(-14%, 0px)', 'width': 'calc(100% - 56px)', 'z-index': '2', 'cursor': 'auto' });
    }
    focused.removeClass("gray");
    focused.removeClass("behind-card");
    focused.unbind('click');
}

function moveFocusedCard(focused, goUp) {
    focused.removeClass('behind-card');
    focused.unbind('click');
    if (screen.width > 1441) {
        focused.css({ transform: 'translate(0%, 0px)', 'width': '75%', 'z-index': '2', 'cursor': 'auto' });
        focused.removeClass("gray");
    }
    else if (screen.width > 481) {
        focused.css({ transform: 'translate(-2.5%, 0px)', 'width': '80%', 'z-index': '2', 'cursor': 'auto' });
        focused.removeClass("gray");
    }
    else {
        focused.css({ transform: 'translate(-14%, 0px)', 'width': 'calc(100% - 56px)', 'z-index': '2', 'cursor': 'auto' });
        focused.removeClass("gray");
    }
}

function setBehind1Card(behind1) {
    if (screen.width > 1441) {
        behind1.css({ transform: 'translate(3.5%, -42px)', 'width': '70%', 'z-index': '1', 'cursor': 'pointer' });
    }
    else if (screen.width > 481) {
        behind1.css({ transform: 'translate(1%, -42px)', 'width': '75%', 'z-index': '1', 'cursor': 'pointer' });
    }
    else {
        behind1.css({ transform: 'translate(-12%, -42px)', 'width': 'calc(96% - 56px)', 'z-index': '1', 'cursor': 'pointer' });
    }
    behind1.addClass("gray");
    behind1.addClass("behind-card");
    behind1.unbind('click');
    behind1.click(function () {
        moveUp();
    });
}

function moveBehind1Card(behind1, goUp) {
    if (screen.width > 1441) {
        behind1.css({ transform: 'translate(3.5%, -42px)', 'width': '70%', 'z-index': '1', 'cursor': 'pointer' });       
    }
    else if (screen.width > 481) {
        behind1.css({ transform: 'translate(1%, -42px)', 'width': '75%', 'z-index': '1', 'cursor': 'pointer' });            
    }
    else {
        behind1.css({ transform: 'translate(-12%, -42px)', 'width': 'calc(96% - 56px)', 'z-index': '1', 'cursor': 'pointer' });
    }
    behind1.addClass("gray");
    behind1.addClass("behind-card");
    behind1.unbind('click');
    behind1.click(function () {
        moveUp();
    });
}

function setBehind2Card(behind2) {
    if (screen.width > 1441) {
        behind2.css({ transform: 'translate(7.5%, -84px)', 'width': '65%', 'z-index': '0', 'cursor': 'pointer' });
    }
    else if (screen.width > 481) {
        behind2.css({ transform: 'translate(5%, -84px)', 'width': '70%', 'z-index': '0', 'cursor': 'pointer' });
    }
    else {
        behind2.css({ transform: 'translate(-10%, -84px)', 'width': 'calc(92% - 56px)', 'z-index': '0', 'cursor': 'pointer' });
    }
    behind2.addClass("gray");
    behind2.addClass("behind-card");
    behind2.unbind('click');
    behind2.click(function () {
        moveUp();
        moveUp();
    });
}

function moveBehind2Card(behind2, goUp) {
    if (!goUp) {

    }
    if (screen.width > 1441) {
        //Large Desktop
        behind2.css({ transform: 'translate(7.5%, -84px)', 'width': '65%', 'z-index': '0', 'cursor': 'pointer' });  
    }
    else if (screen.width > 481) {
        //Laptop and Tablet
        behind2.css({ transform: 'translate(5%, -84px)', 'width': '70%', 'z-index': '0', 'cursor': 'pointer' });     
    }
    else {
        behind2.css({ transform: 'translate(-10%, -84px)', 'width': 'calc(92% - 56px)', 'z-index': '0', 'cursor': 'pointer' });
    }
    behind2.addClass("gray");
    behind2.addClass("behind-card");
    behind2.unbind('click');
    behind2.click(function () {
        moveUp();
        moveUp();
    });
}

function setFrontCard(front) {
    if (screen.width > 1441) {
        front.css({ transform: 'translate(7.5%, 306px)', 'width': '65%', 'z-index': '3', 'cursor': 'pointer' });
    }
    else if (screen.width > 481) {
        front.css({ transform: 'translate(5%, 306px)', 'width': '70%', 'z-index': '3', 'cursor': 'pointer' });
    }
    else {
        front.css({ transform: 'translate(-10%, 306px)', 'width': 'calc(92% - 56px)', 'z-index': '3', 'cursor': 'pointer' });
    }
    front.addClass("behind-card");
    front.addClass("gray");
    front.unbind('click');
    front.click(function () {
        moveDown();
    });
}

function moveFrontCard(front, goUp) {
    if (goUp) {
        if (screen.width > 1441) {
            front.css({ transform: 'translate(7.5%, 306px)', 'width': '65%', 'z-index': '3', 'cursor': 'pointer' });
        }
        else if (screen.width > 481) {
            front.css({ transform: 'translate(5%, 306px)', 'width': '70%', 'z-index': '3', 'cursor': 'pointer' });
        }
        else {
            front.css({ transform: 'translate(-10%, 306px)', 'width': 'calc(92% - 56px)', 'z-index': '3', 'cursor': 'pointer' });
        }
    }
    front.addClass("gray");
    front.addClass("behind-card");
    front.unbind('click');
    front.click(function () {
        moveDown();
    });
}

function setStickyButtons() {
    if (focusedCard == numberOfCards) {
        $("#goDown").addClass('disabled-button');
        $('#goDown').prop('disabled', true);
        enabledGoDown = false;
    }
    else {
        $("#goDown").removeClass('disabled-button');
        $('#goDown').prop('disabled', false);       
        enabledGoDown = true;
    }
    if (focusedCard == 1) {
        $("#goUp").addClass('disabled-button');
        $('#goUp').prop('disabled', true);
        enabledGoUp = false;
    }
    else {
        $("#goUp").removeClass('disabled-button');
        $('#goUp').prop('disabled', false);       
        enabledGoUp = true;
    }
}