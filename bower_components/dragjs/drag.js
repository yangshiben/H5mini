
$.fn.extend({
    //---元素拖动插件
    dragging:function(data){
        var $this = $(this);
        var xPage;
        var yPage;
        var X;//
        var Y;//
        var xRand = 0;//
        var yRand = 0;//
        var father = $this.parent();
        var defaults = {
            move : 'both',
            randomPosition : true ,
            hander:1,
        }
        var opt = $.extend({},defaults,data);
        var movePosition = opt.move;
        var random = opt.randomPosition;

        var hander = opt.hander;
        var callFunc = opt.finishCall; //
        var targetDom = opt.target;
        var endY = 0;
        var preY = 0;

        if(hander == 1){
            hander = $this;
        }else{
            hander = $this.find(opt.hander);
        }


        //---初始化
        father.css({"position":"relative","overflow":"hidden"});
        $this.css({"position":"absolute"});
        hander.css({"cursor":"pointer"});

        var faWidth = father.width();
        var faHeight = father.height();
        var thisWidth = $this.width()+parseInt($this.css('padding-left'))+parseInt($this.css('padding-right'));
        var thisHeight = $this.height()+parseInt($this.css('padding-top'))+parseInt($this.css('padding-bottom'));
        thisHeight = 40;
        var mDown = false;//
        var positionX;
        var positionY;
        var moveX ;
        var moveY ;

        if(random){
            $thisRandom();
        }
        function $thisRandom(){ //随机函数
            $this.each(function(index){
                var randY = parseInt(Math.random()*(faHeight-thisHeight));///
                var randX = parseInt(Math.random()*(faWidth-thisWidth));///
                if(movePosition.toLowerCase() == 'x'){
                    $(this).css({
                        left:randX
                    });
                }else if(movePosition.toLowerCase() == 'y'){
                    $(this).css({
                        top:randY
                    });
                }else if(movePosition.toLowerCase() == 'both'){
                    $(this).css({
                        top:randY,
                        left:randX
                    });
                }

            });
        }

        $(targetDom).mousedown(function(e){
            father.children().css({"zIndex":"0"});
            $this.css({"zIndex":"1"});
            mDown = true;
            X = e.pageX;
            Y = e.pageY;
            positionX = $this.position().left;
            positionY = $this.position().top;
            preY = positionY - Y;
            return false;
        });

        $(targetDom).mouseup(function(e){
            if(moveY <= (faHeight-thisHeight)/2) {
                $this.css({"top": '0'});
                if (positionY != 0 && typeof callFunc == 'function') callFunc();
            }
            if(moveY > (faHeight-thisHeight)/2) {
                $this.css({"top":faHeight-thisHeight});
                if (Math.abs(positionY - (faHeight-thisHeight)) > 0.001 && typeof callFunc == 'function') callFunc();
            }
            mDown = false;
        });

        $(targetDom).mousemove(function(e){
            xPage = e.pageX;//--
            moveX = positionX+xPage-X;

            yPage = e.pageY;//--
            moveY = positionY+yPage-Y;

            function thisXMove(){ //x轴移动
                if(mDown == true){
                    $this.css({"left":moveX});
                }else{
                    return;
                }
                if(moveX < 0){
                    $this.css({"left":"0"});
                }
                if(moveX > (faWidth-thisWidth)){
                    $this.css({"left":faWidth-thisWidth});
                }
                return moveX;
            }

            function thisYMove(){ //y轴移动
                if(mDown == true){
                    $this.css({"top":moveY});
                }else{
                    return;
                }
                if(moveY < 0){
                    $this.css({"top":"0"});
                }
                if(moveY > (faHeight-thisHeight)){
                    $this.css({"top":faHeight-thisHeight});
                }
                return moveY;
            }

            function thisAllMove(){ //全部移动
                if(mDown == true){
                    $this.css({"left":moveX,"top":moveY});
                }else{
                    return;
                }
                if(moveX < 0){
                    $this.css({"left":"0"});
                }
                if(moveX > (faWidth-thisWidth)){
                    $this.css({"left":faWidth-thisWidth});
                }

                if(moveY < 0){
                    $this.css({"top":"0"});
                }
                if(moveY > (faHeight-thisHeight)){
                    $this.css({"top":faHeight-thisHeight});
                }
            }
            if(movePosition.toLowerCase() == "x"){
                thisXMove();
            }else if(movePosition.toLowerCase() == "y"){
                endY = thisYMove();
            }else if(movePosition.toLowerCase() == 'both'){
                thisAllMove();
            }
        });
    }
});
