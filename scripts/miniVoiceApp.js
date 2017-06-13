/**
 * Created by yangshibin on 2017/6/10.
 */
var audioMain;
var effectGroup = [];
var songsGroup = [];
var currPlay = null; //当前播放的歌曲
var audioDJ1 = new Audio('audios/DJ盘音效示例001.wav');
var audioDJ2 = new Audio('audios/wq1204.wav');
audioDJ1.addEventListener('canplay', function () {
    audioDJ1.loaded = true;
    audioDJ1.loop = true;
});
//转盘控制
$(function () {
    var down = false;
    var isMove = false;//正在移动
    var lastX = 0, newX = 0;//记录前后位置
    $('.turn-mask').on("mousedown", function (event) {
        lastX = event.clientX;
        event.preventDefault();
        $('body').css('cursor', 'pointer')
        isMove = true;
    });//鼠标按下
    $('.turn-mask').mousemove(function (event) {
        event.preventDefault();
        if (isMove) {
            newX = event.clientX;
            var offset =  newX - lastX;
            if (offset > 0) {
                if (audioDJ1.loaded && audioDJ1.currentTime == 0) {
                    audioDJ2.pause();
                    audioDJ2.currentTime = 0;
                   // audioMain.volume = 0.3;
                    audioDJ1.play();
                }
                $('#clockwise').css({'opacity': 0, 'transition': 'opacity .3s'});
                $('#anticlockwise').css({'opacity': 1,'transition': 'opacity .3s'});
            }
            else {
                audioDJ1.pause();
                audioDJ1.currentTime = 0;
                audioDJ2.play();
                $('#anticlockwise').css('opacity', 0);
                $('#clockwise').css('opacity', 1);
            }
            $('.turntable').css('transform','rotate('+ parseInt(newX) + 'deg)');
        }
    });
//文档上鼠标拖动
    $('.turn-mask').mouseup(function (event) {
        event.preventDefault();
        $('body').css('cursor', 'default')
        $('#anticlockwise').css('opacity', 0);
        $('#clockwise').css('opacity', 0);
        isMove = false;
        audioDJ1.pause();
        audioDJ1.currentTime = 0;
        audioDJ2.pause();
        audioDJ2.currentTime = 0;
       // audioMain.volume = 1;
    });
})
//音量控制
$(function () {

})
var switchSong = function () {
    for (var i = 0; i < songsGroup.length; i++) {
        if (currPlay == songsGroup[i]) {
            currPlay.pause();
            var next = (i + 1) == songsGroup.length ? 0 : (i + 1);
            currPlay = songsGroup[next];
            currPlay.currentTime = 0;
            initSong();
            break;
        }
    }
}
$('.switch-btn').each(function(){
    $(this).dragging({
        target: '.switch-btn',
        move : 'y',
        randomPosition : false,
        finishCall: switchSong
    });
});
//进度条控制
$(function () {
    var song1 = new Audio('audios/songs/A-Song.mp3');
    var song2 = new Audio('audios/songs/B-Song.mp3');
    songsGroup = [song1, song2];
    for (var i in songsGroup) {
        songsGroup[i].addEventListener('canplay', function () {
            songsGroup[i].loaded = true;
        });
    }
    currPlay = song2;
    audioMain = currPlay;
    audioMain.addEventListener('canplay', function () {
        if(audioMain) {
            $.playBar.initBar(audioMain, audioMain.duration, $('.progress-slider'));
            $.playBar.startPlay();
        }
        audioMain = null;
    });
});

$(function () {
    var effect1 = new Audio('audios/effects/C.mp3');
    var effect2 = new Audio('audios/effects/D.mp3');
    var effect3 = new Audio('audios/effects/E.mp3');
    var effect4 = new Audio('audios/effects/F.mp3');
    effectGroup = [effect1, effect2, effect3, effect4];
    for (var i in effectGroup) {
        effectGroup[i].addEventListener('canplay', function () {
            effectGroup[i].loaded = true;
            effectGroup[i].playing = false;
        });
    }
})
function initSong() {
    audioMain = currPlay;
    if(audioMain) {
        $.playBar.initBar(audioMain, audioMain.duration, $('.progress-slider'));
        $.playBar.startPlay();
    }
    audioMain = null;
}

//插入音效
function insertEffect(id) {
    var effect = effectGroup[id - 1];
    if (effect) {
        effect.currentTime = 0;
        effect.play();
    }
}