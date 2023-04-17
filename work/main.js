//待做事項
//table的時間排序插入//不要了
//box 搭配影片播放



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
        //npc1 == 3
        //npc2 == 4
        //npc3 == 5
        //
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0, 1, 0, 0],
        [0, 0, 1, 4, 1, 1, 0, 0, 0, 5, 1, 0, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 3, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 2, 3, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0]
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
        magic: "images/magic2.png",
        
    };

    //繪製其他物品
    loadImages(sources, function(images){
        for (let x in mapArray) {
            for (let y in mapArray[x]) {
                if (mapArray[x][y] == 1) {//障礙物
                    ctx.drawImage(images.stone, 0, 0, 14, 14, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if(mapArray[x][y] == 2){//寶箱
                    ctx.drawImage(images.box, 0, 0, 79, 75, y * gridLength, x * gridLength, gridLength, gridLength);
                }else if (mapArray[x][y] == 7) {
                    ctx.drawImage(images.enemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                }else if (mapArray[x][y] == 3){
                    ctx.drawImage(images.npc, 483, 7, 52, 52, y * gridLength, x * gridLength, gridLength, gridLength);
                }else if (mapArray[x][y] == 4){
                    ctx.drawImage(images.npc, 290, 5, 53, 53, y * gridLength, x * gridLength, gridLength, gridLength);
                }else if (mapArray[x][y] == 5){
                    ctx.drawImage(images.npc, 148, 12, 52, 52, y * gridLength, x * gridLength, gridLength, gridLength);
                }else if (mapArray[x][y] == 6){
                    ctx.drawImage(images.magic, 0, 0, 300, 300, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
    });

});
var task1 = 0;
var task2 = 0;
var task3 = 0;
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
            case 0://stree
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1://stone
                $("#talkBox").text("沒路啦");
                break;
            case 2: // box
                $("#talkBox").text("寶箱!!!!!!");
                var youtubeplayer = document.getElementById('youtubeplayer');
                var RPG = document.getElementById('RPG');
                var task = document.getElementById('task');
                youtubeplayer.style.display = 'block';
                RPG.style.display = 'none';
                task.style.display = 'none';
                break;
            case 3: //npc1
                $("#talkBox").text("幫我採集30份木材");
                $(function(){
                    if(task1<5){
                        let millisecsPerDay = 24*60*60*1000;
                        $("#courseTable").append("<tr>"+
                        `<td>${task1+task2+task3+1}</td>`+
                        `<td>${(new Date(startDate.getTime()+3*(task1+1)*millisecsPerDay)).toLocaleDateString()}</td>`+
                        `<td>${topic[0]}</td>`+
                        "</tr>");
                        task1++;
                    }
                });

                break;
            case 4: //npc2
                $("#talkBox").text("擊殺10隻怪物");
                $(function(){
                    if(task2<5){
                        let millisecsPerDay = 24*60*60*1000;
                        $("#courseTable").append("<tr>"+
                        `<td>${task1+task2+task3+1}</td>`+
                        `<td>${(new Date(startDate.getTime()+5*(task2+1)*millisecsPerDay)).toLocaleDateString()}</td>`+
                        `<td>${topic[1]}</td>`+
                        "</tr>");
                        task2++;
                    }
                });

                break;
            case 5: //npc3
                $("#talkBox").text("請獲得一套裝備");
                $(function(){
                    if(task3<5){
                        let millisecsPerDay = 24*60*60*1000;
                        $("#courseTable").append("<tr>"+
                        `<td>${task1+task2+task3+1}</td>`+
                        `<td>${(new Date(startDate.getTime()+7*(task3+1)*millisecsPerDay)).toLocaleDateString()}</td>`+
                        `<td>${topic[2]}</td>`+
                        "</tr>");
                        task3++;
                    }
                });

                break;
            case 6:
                var magic = document.getElementById('magic');
                var RPG = document.getElementById('RPG');
                var task = document.getElementById('task');
                magic.style.display = 'block';
                RPG.style.display = 'none';
                task.style.display = 'none';
                
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
        $("#boxh2").text($("li").eq(randomChildNumber).text());
        $("img").attr("src",imageURL_Array[randomChildNumber]);
    });
});

//領取
$(function(){
    $("#take").on("click",function(){
        //
        if(last != -1){
            $("#boxh2").text("?");
            $("img").attr("src","images/box.png");
            var random = document.getElementById('random');
            var RPG = document.getElementById('RPG');
            var task = document.getElementById('task');
            task.style.display = 'block';
            random.style.display = 'none';
            RPG.style.display = 'block';
            $("#talkBox").text("獲得道具");
            last=-1;
        }
    });
});

//任務表
var topic = [
    "幫我採集30份木材",
    "擊殺10隻怪物",
    "請獲得一套裝備"
    ];

var startDate = new Date();
//setMonthAndDay(4,18);

$(function(){
    $("#courseTable").append("<tr><th>NO.</th><th>截止時間</th><th>需求</th></tr>");
/*    let topicCount = topic.length;
    //一秒鐘有1000毫秒
    //每分鐘60秒、每小時60分鐘、每天24小時
    let millisecsPerDay = 24*60*60*1000;
    for(var x=0;x<topicCount;x++){
    $("#courseTable").append("<tr>"+
    `<td>${x+1}</td>`+
    `<td>${(new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString()}</td>`+
    `<td>${topic[x]}</td>`+
    "</tr>");
    }*/
});


//magic
$(function () {
    let currentQuiz = null;
    var magicend = false;
     $("#startButton").on("click",function(){

         if(magicend){
            var magic = document.getElementById('magic');
            var RPG = document.getElementById('RPG');
            var task = document.getElementById('task');
            magic.style.display = 'none';
            RPG.style.display = 'block';
            task.style.display = 'block';
            magicend=false;
         }
         if(currentQuiz == null){
             currentQuiz = 0;
             $("#question").text(questions[0].question);
             $("#options").empty();
             questions[0].answers.forEach(function(element, index, array){
                 $("#options").append(
                     `<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`
                 );
             });
             $("#startButton").attr("value","下一題");
         }else{
             $.each($(":radio"),function(i, val){
                 // console.log(i + " : " + val.checked);
                 if(val.checked){
                     if(isNaN(questions[currentQuiz].answers[i][1])){
                         //A,B,C,D
                         let finalResult = questions[currentQuiz].answers[i][1];
                         $("#question").text(finalAnswers[finalResult][0]);
                         $("#options").empty();
                         $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                         currentQuiz = null;
                         $("#startButton").attr("value", "結束占卜");
                         magicend=true;
                     }else{
                         //go to questions[x]
                         currentQuiz = questions[currentQuiz].answers[i][1] - 1;
                         $("#question").text(questions[currentQuiz].question);
                         $("#options").empty();
                         questions[currentQuiz].answers.forEach(function (element, index, array) {
                             $("#options").append(
                                 `<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`
                             );
                         });
                     }
                     return false;
                 }
             });
         }
     });
 });

 let questions = [
    {
        "question":"你現在對今年非常樂觀？",
        "answers":[
            ["是的",2],
            ["不是",3],
            ["不知道",4]
        ]
    },
    {
        "question":"你覺得自己是不是越來越不可靠了？",
        "answers":[
            ["是的",3],
            ["不是",4],
            ["一般",5]
        ]
    },
    {
        "question":"想到新的一年來到，就非常開心？",
        "answers":[
            ["是的",4],
            ["不是",5],
            ["還好",6]
        ]
    },
    {
        "question":"如果給你五百萬要你離開很愛的戀人，你會？",
        "answers":[
            ["好的",5],
            ["都可以",6],
            ["不要",7]
        ]
    },
    {
        "question":"過去一年裡，你有沒有受到很大的打擊？",
        "answers":[
            ["有的",6],
            ["沒有",7],
            ["還在承受著呢",8]
        ]
    },
    {
        "question":"你喜歡下面哪一個形容天氣的詞？",
        "answers":[
            ["風和日麗",7],
            ["豔陽高照",8],
            ["秋高氣爽","A"]
        ]
    },
    {
        "question":"你覺得自己的愛情一直是比較不一般的？",
        "answers":[
            ["是的",8],
            ["不是",9],
            ["不知道",10]
        ]
    },
    {
        "question":"你會想要跟情人去哪裡旅行？",
        "answers":[
            ["蔚藍海岸",9],
            ["山林湖畔","A"],
            ["歷史古鎮","B"]
        ]
    },
    {
        "question":"除了愛情，你更希望今年實現哪件事情？",
        "answers":[
            ["買房子","C"],
            ["工作升遷","D"],
            ["變帥變美","A"]
        ]
    },
    {
        "question":"下面哪一種飲料中獎，你最想要？",
        "answers":[
            ["優格再來一瓶","B"],
            ["啤酒再來一瓶","C"],
            ["紅茶再來一瓶","D"]
        ]
    }
    
];

let finalAnswers={
        "A":["愛情有點酸","在今年，你的愛情有一些酸哦，不過還好，不苦，而且有時候雖然酸，酸中也帶了絲甜。即使你會與喜歡的人沒有緣分走到一起，但是你們彼此能祝福對方。心中有些酸，是因為你看得開。現在對愛情真的看得淡了，不會強求，也不渴望什麼轟轟烈烈，甜甜蜜蜜，只希望過了這陣酸，會有甜頭來。"],
        "B":["愛情超級甜","在今年裡，你的愛情超級甜蜜哦，真的有如蜜糖一樣甜，不時撒一把狗糧，能讓旁邊的人都覺得發膩哦。當然啦，你這麼幸運，遇到甜蜜的愛情，也是因為你是一個溫暖的人啊，值得這麼好的愛情，也值得別人好好疼愛你。你也會加倍珍惜，好好回饋對方，這樣才是愛情的正確打開方式。"],
        "C":["愛情有苦有甜","你在今年的愛情，一定是有苦也有甜的，其實這才是正常的感情，或者說普通的感情。有的人一直甜蜜，他們是幸運兒。而你是普通人，感情中會有甜蜜的時候，也會有爭吵矛盾，會有淚水，會有痛苦。但是學會理智經營感情，在甜的時候好好享受，在苦的時候及時審視，愛情才能持久。"],
        "D":["愛情平淡沒滋味","今年裡，你的愛情沒有啥滋味，可能你根本就遇不到愛情，繼續又單身一整年，這樣也好，你可以忙於賺錢。也可能你的愛情就是有如一碗平平淡淡的白開水，沒有什麼滋味，但是沒有它又不行。或者是缺少了一些刺激，但是誰的愛情能一直轟轟烈烈呢？平淡如水，細水長流，未嘗不是一件好事。"]
};


//YOUTUBE PLAYER
let player;
let currentPlay = 0;

function onYouTubeIframeAPIReady(){
    player = new YT.Player("player",{
        height:"390",
        width:"640",
        videoId:playList[currentPlay],
        playerVars:{
            autoplay:0,
            controls:0,
            start:playTime[currentPlay][0],
            end:playTime[currentPlay][1],
            iv_load_policy:3
        },
        events:{
            onReady:onPlayerReady,
            onStateChange:onPlayerStateChange
        }
    });
}

function onPlayerReady(event){
    $("#playButton").on("click",function(){
        var playover = false;
        $("#playerh2").text(player.getVideoData().title);
        player.playVideo();
    });
}

function onPlayerStateChange(event){
    if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1]){
        if(currentPlay<playList.length-1){
            currentPlay++;
            playover = false;
            player.loadVideoById({
                videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
        }else{
            currentPlay=0;
            playover = true;
            player.cueVideoById({
                videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
            var random = document.getElementById('random');
            var youtubeplayer = document.getElementById('youtubeplayer');
            random.style.display='block';
            youtubeplayer.style.display='none';
        }
    }
    if(event.data==1){
        $("#playerh2").text(player.getVideoData().title);
    }
}

let playList = [
    "U3Bknr37mq0",
    "Q2y7w70kA70",
    "VoAv2Dr3XHw"
    
];

let playTime = [
    [193,200],
    [42,52],
    [231,240]
    
];