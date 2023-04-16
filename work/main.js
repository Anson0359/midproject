//RPG 主體
let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
const gridLength = 40;

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

//initial
$(function(){
    //地圖的標示
    mapArray = [
        //大概先15*15
        //道路 == 0
        //障礙 == 1
        //寶箱 == 2
        //
        //
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 3, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]
    ];

    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    //人物圖示
    imgMain.src = "images/player2.png";
    currentImgMain = {
        x:0,
        y:0
    };

    imgMain.onload = function(){
        ctx.drawImage(imgMain,0,7,52,52,currentImgMain.x, currentImgMain.y, gridLength,gridLength);
    };

    //其他事件
    //圖片
    let sources = {
        stone: "images/stone2.png",
        //lab 1 抽籤
        box: "images/box.png",
        //lab 2 行事曆
        //可以設計活動 或是 任務
        npc:"images/player2.png",
        //task: "",
        enemy: "images/Enemy.png",
        //lab 3 心理測驗
        magic: "images/magic.png",
        
        //lab 5 播放器
        //音樂盒??
        //music:""
    };

    //繪製其他物品
    loadImages(sources, function(images){
        for (let x in mapArray) {
            for (let y in mapArray[x]) {
                if (mapArray[x][y] == 1) {//障礙物
                    ctx.drawImage(images.stone, 0, 0, 14, 14, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if(mapArray[x][y] == 2){//寶箱
                    ctx.drawImage(images.box, 0, 0, 79, 75, y * gridLength, x * gridLength, gridLength, gridLength);
                }else if (mapArray[x][y] == 3) {
                    ctx.drawImage(images.enemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                }else if (mapArray[x][y] == 5){
                    ctx.drawImage(images.npc, 483, 7, 52, 52, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
    });

});

//Click Event
$(document).on("keydown", function(event){
    console.log(event.code);
    let targetImg, targetBlock, cutImagePositionY;
    targetImg = {
        x:-1,
        y:-1
    };
    targetBlock = {
        x:-1,
        y:-1
    };
    event.preventDefault();

    //移動 已改完成
    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionY = 59;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionY = 163;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionY = 111;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionY = 0;
            break;
        default:
            return;
    }

    if(targetImg.x <= 560 && targetImg.x >=0 && targetImg.y <= 560 && targetImg.y >=0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    //目標位置判斷
    //並且做出相應結果
    if(targetBlock.x != -1 && targetBlock.y != -1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                $("#talkBox").text("沒路啦");
                break;
            case 2: // Final Stop
                $("#talkBox").text("寶箱!!!!!!");
                var random = document.getElementById('random');
                var RPG = document.getElementById('RPG');
                random.style.display = 'block';
                RPG.style.display = 'none';
                break;
            case 3: //Enemy
                $("#talkBox").text("HI!!!");
                break;
            case 5:
                
                break;
        }
    }else{
        $("#talkBox").text("邊界");
    }

    ctx.drawImage(imgMain, 0, cutImagePositionY, 52, 52, currentImgMain.x, currentImgMain.y, gridLength, gridLength);

});

//寶箱抽籤
let imageURL_Array = [
    "images/sword.webp",
    "images/pretext.webp",
    "images/ax.webp",
    "images/bow.webp"
];

//抽獎
let last = -1;
$(function(){
    $("#run").on("click",function(){
        //
        var numberOfListItem = $("li").length;
        var randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        //確保不連續
        for(;randomChildNumber==last;){
            randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        }
        last = randomChildNumber;
        console.log(randomChildNumber);
        $("h2").text($("li").eq(randomChildNumber).text());
        $("img").attr("src",imageURL_Array[randomChildNumber]);
    });
});

//領取
$(function(){
    $("#take").on("click",function(){
        //
        if(last != -1){
            $("h2").text("?");
            $("img").attr("src","images/box.png");
            var random = document.getElementById('random');
            var RPG = document.getElementById('RPG');
            random.style.display = 'none';
            RPG.style.display = 'block';
            $("#talkBox").text("獲得道具");
            last=-1;
        }
    });
});

//任務表
var topic = [
    "尚未開學",
    "國定假日",
    "環境準備",
    "隨機性",
    "重複性"
    ];

var startDate = new Date();
/*
function setMonthAndDay(startMonth, startDay){
    //一次設定好月份與日期
    startDate.setMonth(startMonth-1,startDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}
setMonthAndDay(2,21);
*/
$(function(){
    $("#courseTable").append("<tr><th>NO.</th><th>截止時間</th><th>需求</th></tr>");
    let topicCount = topic.length;
    //一秒鐘有1000毫秒
    //每分鐘60秒、每小時60分鐘、每天24小時
    let millisecsPerDay = 24*60*60*1000;
    for(var x=0;x<topicCount;x++){
    $("#courseTable").append("<tr>"+
    `<td>${x+1}</td>`+
    `<td>${(new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString()}</td>`+
    `<td>${topic[x]}</td>`+
    "</tr>");
    }
});