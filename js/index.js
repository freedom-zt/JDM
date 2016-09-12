/**
 * Created by zhangtong on 2016/7/21.
 */
window.onload = function () {
    headerOpacity();
    timeBack();
    var banner = document.querySelector(".jd_banner");
    var width = banner.offsetWidth;
    var imgBox = banner.querySelector("ul:first-child");
    var indicator = banner.querySelector("ul:last-child");
    var lis = indicator.querySelectorAll("li");
    var index = 1;
    var addTransition = function () {
        imgBox.style.webkitTransition = "all .5s";
        imgBox.style.transition = "all .5s";
    }
    var addTransform = function(obj) {
        imgBox.style.webkitTransform = "translateX(" + (obj) + "px)";
        imgBox.style.transform = "translateX(" + (obj) + "px)";
    }
    var removeTransition = function() {
        imgBox.style.webkitTransition = "none";
        imgBox.style.transition = "none";
    }
    var timerId = setInterval(function () {
        index++;
        addTransition();
        addTransform(-index * width);
    }, 2000);
    imgBox.addEventListener("webkitTransitionEnd", function () {
        if (index == 9) {
            index = 1;
        }
        if(index == 0){
            index = 8;
        }
        setIndicator();
        removeTransition();
        addTransform(-index * width);
    });
    imgBox.addEventListener("transitionEnd", function () {
        if (index == 9) {
            index = 1;
        }
        if(index == 0){
            index = 8;
        }
        setIndicator();
        removeTransition();
        addTransform(-index * width);
    });

    //小点
    var setIndicator = function() {
        for(var i=0;i<lis.length;i++){
            //lis[i].className = "";
            lis[i].classList.remove("current");
        }
        if(index > 0 && index <9){
            lis[index - 1].classList.add("current");
        }
    }
    //touch事件
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var ismove = false;
    imgBox.addEventListener("touchstart", function (e) {
        clearInterval(timerId);
        startX = e.touches[0].clientX;
        console.log(startX);
    });
    imgBox.addEventListener("touchmove", function (e) {
        ismove = true;
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        //console.log(moveX);
        removeTransition();
        addTransform(-index * width + distanceX);
    });
    imgBox.addEventListener("touchend", function (e) {
        if( ismove && Math.abs(distanceX) >= width / 3){
            if(distanceX > 0){
                index--;
            }else{
                index++;
            }
            addTransition();
            addTransform(-index * width);
            setIndicator();
        }else{
            addTransition();
            addTransform(-index * width);
        }
        timerId = setInterval(function () {
            index++;
            addTransition();
            addTransform(-index * width);
        }, 2000);
    });

}



    function timeBack() {
        var time = 10;
        var timerId = setInterval(function() {
            if(time<=0){
                clearInterval(timerId);
                return;
            }
            time--;
            var timeback = document.querySelector(".timeBack");
            var timeLis = timeback.querySelectorAll("li");
            var hour = Math.floor(time / 3600);
            var minute = Math.floor(time % 3600 / 60);
            var second = time % 60;
            timeLis[0].innerHTML = Math.floor(hour / 10);
            timeLis[1].innerHTML = Math.floor(hour % 10);
            timeLis[3].innerHTML = Math.floor(minute / 10);
            timeLis[4].innerHTML = Math.floor(minute % 10);
            timeLis[6].innerHTML = Math.floor(second / 10);
            timeLis[7].innerHTML = Math.floor(second % 10);

        },1000);
    }


//顶部滚动
function headerOpacity() {
    var headerNav = document.querySelector(".jd_header");
    var banner = document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
    var opacity = 0;
    window.onscroll = function () {
        var scrollTop = scroll().top;
        if (scrollTop < bannerHeight) {
            opacity = scrollTop / bannerHeight;
        } else {
            opacity = 1
        }
        headerNav.style.background = "rgba(200,20,35," + opacity + ")";
    }
}
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollTop || 0
    }
}

