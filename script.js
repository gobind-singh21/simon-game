// alert("Linking successful");

var pattern = [];

var index = 0;

var level = 0;

var map = {
    0 : "green",
    1 : "red",
    2 : "yellow",
    3 : "blue",
    "green" : 0,
    "red" : 1,
    "yellow" : 2,
    "blue" : 3
}

function playSound(name) {
    var music = new Audio('./sounds/'+name+".mp3");
    music.play();
}

function animateButton(id) {
    $('#'+id).toggleClass("pressed");
    setTimeout(function () {
        $('#'+id).toggleClass("pressed");
    }, 100);
}

function generatePattern() {
    var color = Math.floor(Math.random() * 4);
    playSound(map[color]);
    animateButton(map[color]);
    pattern.push(color);
}

$(document).on("click", function (event) {
    if(level > 0)
        return;
    level++;
    $("#level-title").text("Level "+level);
    index = 0;
    setTimeout(function () {
        generatePattern();
    }, 100);
});

$(document).keypress(function () {
    if(level > 0)
        return;
    level++;
    $("#level-title").text("Level "+level);
    index = 0;
    setTimeout(function () {
        generatePattern();
    }, 100);
});

$(".btn").click(function (event) {
    animateButton(event.target.id);
    if(pattern.length == 0) {
        return;
    }
    if(pattern[index] === map[event.target.id]) {
        playSound(event.target.id);
        index++;
        index %= pattern.length;
        if(index == 0) {
            setTimeout(function () {
                generatePattern();
            },1000);
            level++;
            $('#level-title').text("Level "+level);
        }
    }
    else {
        new Audio('./sounds/wrong.mp3').play();
        pattern = [];
        index = 0;
        level = 0;
        $("#level-title").text("Game over, press any key to restart");
        $('body').addClass("game-over");
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 100);
    }
});
