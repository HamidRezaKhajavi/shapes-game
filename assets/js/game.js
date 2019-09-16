let allShapesClass = ["circle", "right-triangle","triangle-left", "square", "trapezoid"];
let scoreCounter;
let heartCounter;
let playing;
let movingAllShapes;
const shapeWith = 140;
const defaultScore = 0;
const defaultHeart = 3;
const changeOpacity = 800;


$(document).ready(function () {
    resetGame()
});

$("#btn-start").click(function () {
    $("#btn-start").attr("disabled", true);
    game();
    playing = setInterval(game, 1000);
    movingAllShapes = setInterval(moveAllShapes, 1);
});

function game() {
    $("#game-board").text("");
    var boxShapes = $("#box-shapes");
    var div = document.createElement("div");
    var shapeClass = allShapesClass[Math.floor(Math.random() * allShapesClass.length)];

    div.classList.add("shape");
    div.classList.add(shapeClass);

    var boxWidth = boxShapes.width();
    var leftRandom = Math.floor(Math.random() * boxWidth);

    if (leftRandom + shapeWith > boxWidth) {
        leftRandom -= shapeWith;
    }
    div.style.top = -10 + "px";
    div.style.left = leftRandom + "px";
    div.style.opacity = 1;

    if (shapeClass === "trapezoid") {
        div.style.borderBottomColor = generateRandomColor();
    } else if (shapeClass === "right-triangle") {
        div.style.borderRightColor = generateRandomColor();
    } else if (shapeClass === "triangle-left") {
        div.style.borderRightColor = generateRandomColor();
    } else {
        div.style.backgroundColor = generateRandomColor();
    }

    div.addEventListener("click", function () {
        div.remove();
        scoreCounter += 50;
        $("#myScore").text(scoreCounter);
    });
    boxShapes.append(div);
}

function resetGame() {
    scoreCounter = defaultScore;
    heartCounter = defaultHeart;
    $("#myScore").text(scoreCounter);
    $('#myHeart').html(heartCounter);
}

$("#btn-end").click(function () {
    clearInterval(playing);
    clearInterval(movingAllShapes);
    clearBoxShapes();
    var modalText = "<p>" + "امتیاز شما در این بازی : " + scoreCounter + "</p>";
    var modalText = modalText + "<p>" + "تعداد قلب باقی مانده : " + heartCounter + "</p>";
    showModal(modalText);
    $("#heart").removeClass("heart-main").addClass("heart");
});

function moveAllShapes() {
    var allShape = $("div.shape");
    allShape.animate({top: '+=25px'}, "fast");
    var boxHeight = $("#box-shapes").height();
    for (let index = 0; index < allShape.length; index++) {
        var element = allShape[index];
        if (element.offsetTop > changeOpacity) {
            element.style.opacity -= 0.01;
        }
        if (element.offsetTop + element.offsetHeight > boxHeight) {
            if (!element.classList.contains("calculated")) {
                heartCounter -= 1;
                $("#myHeart").text(heartCounter);
                element.classList.add("calculated");
            }
        }
        if (element.offsetTop > boxHeight) {
            element.remove();
        }
        if (heartCounter <= 0) {
            clearInterval(movingAllShapes);
            clearInterval(playing);
            showModal("با شور بختی شما باختید..!");
            clearBoxShapes();
            $("#heart").removeClass("heart-main").addClass("heart");
        }
    }
}

function clearBoxShapes() {
    var allShape = $("div.shape");
    for (var i = 0; i < allShape.length; i++) {
        var element = allShape.eq(i);
        element.remove();
    }
}

function showModal(modalText) {
    $("#modal-body").html(modalText);
    $("#myModal").modal("show");
}

$('#myModal').on('hidden.bs.modal', function (e) {
    resetGame();
    clearBoxShapes();
    $("#heart").removeClass("heart").addClass("heart-main");
    $("#btn-start").removeAttr("disabled");
});

function generateRandomColor() {
    return '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
}

function generateRandomColor2() {
    var colorR = Math.floor((Math.random() * 256));
    var colorG = Math.floor((Math.random() * 256));
    var colorB = Math.floor((Math.random() * 256));
    var rgbColor = "rgb(" + colorR + ", " + colorG + ", " + colorB + ")";
    if (rgbColor === "rgb(255, 255, 255)".trim) {
        generateRandomColor2();
    }
    return rgbColor;
}