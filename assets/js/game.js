const shapeWidth = 140;
const defaultScore = 0;
const defaultHeart = 3;
const changeOpacity = 800;
let scoreCounter;
let heartCounter;
let playing;
let movingAllShapes;
let allShapesClass = ["circle", "right-triangle", "triangle-left", "square", "trapezoid"];

function createRandomColor() {
    return '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
}

$("#startGameId").click(function () {
    $("#startGameId").attr("disabled", true);
    playGame();
    playing = setInterval(playGame, 1000);
    movingAllShapes = setInterval(moveAllShapes, 1);
});

function playGame() {
    var boxShapes = $("#boxShapesId");
    var div = document.createElement("div");
    var shapeClass = allShapesClass[Math.floor(Math.random() * allShapesClass.length)];
    div.classList.add("shape");
    div.classList.add(shapeClass);
    var boxWidth = boxShapes.width();
    var leftRandom = Math.floor(Math.random() * boxWidth);
    if (leftRandom + shapeWidth > boxWidth) {
        leftRandom -= shapeWidth;
    }
    div.style.top = -10 + "px";
    div.style.left = leftRandom + "px";
    div.style.opacity = 1;

    if (shapeClass === "trapezoid") {
        div.style.borderBottomColor = createRandomColor();
    } else if (shapeClass === "right-triangle") {
        div.style.borderRightColor = createRandomColor();
    } else if (shapeClass === "triangle-left") {
        div.style.borderRightColor = createRandomColor();
    } else {
        div.style.backgroundColor = createRandomColor();
    }
    div.addEventListener("click", function () {
        div.remove();
        scoreCounter += 50;
        $("#scoreId").text(scoreCounter);
    });
    boxShapes.append(div);
}

$("#endGameId").click(function () {
    clearInterval(playing);
    clearInterval(movingAllShapes);
    clearBoxShapes();
    var modalText = "<p>" + "امتیاز شما در این بازی : " + scoreCounter + "</p>";
    modalText = modalText + "<p>" + "تعداد جان باقی مانده شما : " + heartCounter + "</p>";
    showModal(modalText);
    $("#heartId").removeClass("heart-main").addClass("heart");
    $("#trophyId").removeClass("trophy-main").addClass("heart");
});

function moveAllShapes() {
    var allShape = $("div.shape");
    allShape.animate({top: '+=25px'}, "fast");
    var boxHeight = $("#boxShapesId").height();
    for (let index = 0; index < allShape.length; index++) {
        var element = allShape[index];
        if (element.offsetTop > changeOpacity) {
            element.style.opacity -= 0.01;
        }
        if (element.offsetTop + element.offsetHeight > boxHeight) {
            if (!element.classList.contains("calculated")) {
                heartCounter -= 1;
                $("#heartCountId").text(heartCounter);
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
            $("#heartId").removeClass("heart-main").addClass("heart");
            $("#trophyId").removeClass("trophy-main").addClass("heart");
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
    $("#modalBodyId").html(modalText);
    $("#modalId").modal("show");
}

$('#modalId').on('hidden.bs.modal', function (e) {
    resetGame();
    clearBoxShapes();
    $("#heartId").removeClass("heart").addClass("heart-main");
    $("#trophyId").removeClass("heart").addClass("trophy-main");
    $("#startGameId").removeAttr("disabled");
});

$(document).ready(function () {
    resetGame()
});

function resetGame() {
    scoreCounter = defaultScore;
    heartCounter = defaultHeart;
    $("#scoreId").text(scoreCounter);
    $('#heartCountId').html(heartCounter);
}