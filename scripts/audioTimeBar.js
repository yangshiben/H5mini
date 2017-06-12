/**
 * Created by yangshibin on 2017/6/11.
 */

(function ($) {
    /*****处理拖动事件********
     */
    var isAction = true;
    var width = 0;
    var nowWidth = 0;
    var currTime = 0;//记录当前进度条表示时间
    var timer;
    var addHour = 0, addMinute = 0, addSecond = 0, TheHour = 0, TheMinute = 0, TheSecond = 0;
    var flag = 0;//标志位
    var allTime = 0;//总时间毫秒
    var addWidth = 0;//每次增加的长度
    var offsetX = 0;//偏移量
    var times = 0;
    var dom = null;
    var audio = null;
    var barWidth = 0;
    var initDone = false;
    var down = false;
    var BarMove = false;//正在移动
    var lastX = 0, NewX = 0;//记录前后位置
    $.playBar = {
        initDone: false,
        initBar: function (audioDom, duration, DOM) {
            CleanAll();
            dom = DOM;
            allTime = parseInt(duration * 1000);
            width = DOM.width();
            times = allTime / 1000;
            barWidth = width - 17;
            addWidth = (width - 10) / times;
            audio = audioDom;
            var t = TransitionTime(allTime);
            audio.play();
            OpenBar();
            this.initDone = true;
        },
        restTime: function (allTime) {//从新开始
            CleanAll();
            StopBar();
            allTime = allTime;
            width = dom.width();
            times = allTime / 1000;
            barWidth = width - 5;
            addWidth = (width - 10) / times;
            var t = TransitionTime(allTime);
            OpenBar();
        },
        startPlay: function () {
            OpenBar();
        },
        stopPlay: function () {
            audio.pause();
        }
    }
    /*****处理拖动事件********/
    var down = false;
    var BarMove = false;//正在移动
    var lastX = 0, NewX = 0;//记录前后位置
    $(document).on("mousedown", '.slider-point', function (event) {
        lastX = event.clientX;
        event.preventDefault();
        down = true;
        BarMove = true;
        if (isAction) {
            StopBar();//停止滑动
        }
    });//鼠标按下
    $(document).mousemove(function (event) {
        event.preventDefault();
        NewX = event.clientX;
        if (BarMove) {
            //console.log(changeM);
            var mcs = NewX - lastX;
            lastX = NewX;
            //console.log(mcs+" "+lastX+" "+NewX);
            if (mcs < 0) {
                if (nowWidth - (-mcs) > 0) {
                    nowWidth = nowWidth - (-mcs);
                }
            } else {
                if (nowWidth + mcs < barWidth) {
                    nowWidth = nowWidth + mcs;
                } else {
                    nowWidth = barWidth;
                }
            }
            //console.log(changeM+" "+mcs);
            timeChange();
            $('.slider-point').css("left", nowWidth);
            //down=false;
        }
    });
//文档上鼠标拖动
    $(document).mouseup(function () {
        if (BarMove) {
            BarMove = false;
            down = false;
            NewX = 0;
            var xo = parseInt(currTime / 1000);
            offsetX = nowWidth - xo * addWidth;
            //console.log(nowWidth+" "+barWidth+" "+addWidth+" "+offsetX);
            //console.log(nowWidth+addWidth-offsetX+" "+parseInt(currTime/1000)*addWidth);
            if (isAction) {
                OpenBar();//重新开始计时
                audio.play();
                audio.currentTime = parseFloat(currTime / 1000);
                console.log(audio.currentTime);
            }
        }
    });
    /*
     *****全部清零
     */
    function CleanAll() {
        isAction = true;
        nowWidth = 0;
        currTime = 0;
        addHour = 0;
        addMinute = 0;
        addSecond = 0;
        TheHour = 0;
        TheMinute = 0;
        TheSecond = 0;
        offsetW = 0;
        thewidth = 0;
        flag = 0;
    }

    function timeChange() {
        currTime = parseInt(nowWidth / barWidth * allTime);
        var ltx = TransitionTime(currTime);
        if (TheHour > 0) {
            if (ltx.hHour) {
                $('.bar-time').html(ltx.StringTime);
            } else {
                $('.bar-time').html("00:" + ltx.StringTime);
            }
        } else {
            $('.bar-time').html(ltx.StringTime);
        }
        addSecond = ltx.Tsec;
        addMinute = ltx.Tmin;
        addHour = ltx.Thour;
    }

    //时间拖动时改变时间

//时间拖动时改变时间
    function changeBar() {
        console.log(audio.currentTime)
        var second, minute, hour;
        nowWidth = nowWidth * 1 + addWidth - offsetX;
        if (offsetX > 0) {
            offsetX = 0;
        }
        if (nowWidth < barWidth && currTime < allTime) {
            currTime = currTime + 1 * 1000;//
            addSecond = addSecond + 1;
            if (addSecond > 59) {
                addSecond = 0;
                addMinute = addMinute + 1;
                if (addMinute > 59) {
                    addMinute = 0;
                    addHour = addHour + 1;
                }
            }//时间累加判断
            if (addSecond > 9) {
                second = addSecond;
            } else {
                second = "0" + addSecond;
            }
            if (addMinute > 9) {
                minute = addMinute;
            } else {
                minute = "0" + addMinute;
            }
            if (addHour > 9) {
                hour = addHour;
            } else {
                hour = "0" + addHour;
            }
            if (addHour > 0) {
                flag = 1;
            }
            //
            if (flag == 0) {
                $('.bar-time').html(minute + ":" + second);
            } else {
                $('.bar-time').html(hour + ":" + minute + ":" + second);
            }//
        } else {
            //console.log(nowWidth+" "+barWidth);
            nowWidth = barWidth;
            //StopBar();
        }
        $('.slider-point').css("left", nowWidth);
    }

//改变进度条
    function TransitionTime(str) {
        var m = parseFloat(str) / 1000;
        var time = "";
        var second, minute, hour;
        var haveHour = false;
        var ch = 0, csx = 0, cm = 0;
        if (m >= 60 && m < 60 * 60) {//分钟
            if (parseInt(m / 60.0) < 10) {
                minute = "0" + parseInt(m / 60.0);
            } else {
                minute = parseInt(m / 60.0);
            }
            var cs = parseInt(m - parseInt(m / 60.0) * 60);
            if (cs < 10) {
                second = "0" + cs;
            } else {
                second = "" + cs;
            }
            TheMinute = parseInt(m / 60.0);
            TheSecond = cs;
            cm = TheMinute;
            TheHour = 0;
            csx = cs;
            time = minute + ":" + second;
            $('.bar-time').html("00:00");
        } else if (m >= 60 * 60) {//到达小时
            flag = 1;
            haveHour = true;
            ch = parseInt(m / 3600.0);
            cm = parseInt((parseFloat(m / 3600.0) - parseInt(m / 3600.0)) * 60);
            csx = parseInt((parseFloat((parseFloat(m / 3600.0) - parseInt(m / 3600.0)) * 60) - parseInt((parseFloat(m / 3600.0) - parseInt(m / 3600.0)) * 60)) * 60);
            if (ch < 10) {
                hour = "0" + ch;
            } else {
                hour = "" + ch;
            }
            if (cm < 10) {
                minute = "0" + cm;
            } else {
                minute = "" + cm;
            }
            if (csx < 10) {
                second = "0" + csx;
            } else {
                second = "" + csx;
            }
            TheHour = ch;
            TheMinute = cm;
            TheSecond = csx;
            time = hour + ":" + minute + ":" + second;
            $('.bar-time').html("00:00:00");
        } else {//秒
            $('.bar-time').html("00:00");
            csx = parseInt(m);
            if (parseInt(m) > 9) {
                second = "" + parseInt(m);
            } else {
                second = "0" + parseInt(m);
            }
            TheMinute = 0;
            TheSecond = parseInt(m);
            TheHour = 0;
            time = "00:" + second;
        }//
        var tt = {hHour: haveHour, Thour: ch, Tmin: cm, Tsec: csx, StringTime: time};
        return tt;
        //$('.FinishTime').html(time);
    }

//毫秒转换成分钟小时格式
    function StopBar() {
        if (!down) {
            isAction = false;
        }
        audio.pause();
        clearInterval(timer);
    }

//进度停止
    function OpenBar() {
        isAction = true;
        timer = setInterval(changeBar, 1000);
    }
})(jQuery)