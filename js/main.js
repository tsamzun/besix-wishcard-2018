var render = new Render();
var currentSlider;
var W = $("body").width(),
    H = $("body").height(),
    mouseX, mouseY;
var animButterfly = true;
var fireworksVideo = document.getElementById("video_fireworks");

$(window).on('resize', _.debounce(function() {
  W = $("body").width();
  H = $("body").height();
  projects.isResizing();

}));

// Split texts into words
$.each($("*[data-split]"), function(i, v) {
  var string = $(v).text();
  var arrString = string.split(" ");
  var newString = "";
  v.innerHTML = "";
  $.each(arrString, function(j, w) {
    newString += "<span class='word__wrapper'><span class='word'>"+ w +"&nbsp;</span></span>";
  });

  v.innerHTML = newString;
});

// For clean HTML
// $(".line-text").append('<span class="line-red"></span><span class="line-blue"></span>');
var touchScreen;
var hash = parseInt(parent.location.hash.substr(2));
if (!isNaN(hash) && hash != '') {
  var initialSlide = hash;
} else {
  var initialSlide = 0;
}

// SWIPER
var swiper = new Swiper('.slider', {
  wrapperClass: 'slider__container',
  slideClass: 'slider__item',
  mousewheelControl: false,
  allowTouchMove: false,
  simulateTouch: false,
  initialSlide: initialSlide,
  speed: 500,
  passiveListeners: false,
  // effect: 'fade',
  on: {
    imagesReady: function() {
      TweenMax.to($('.loader'), 1, {
        css: {
            pointerEvents: 'none',
            opacity: 0
          }, delay: 3, onComplete: function() {
            render.renderSlide();
        }
      });
    },
    touchStart: function(e) {
      touchScreen = e.changedTouches[0].pageX;
    },
    touchEnd: function(e) {
      var threshold = 80;
      if (touchScreen < e.changedTouches[0].pageX - threshold || touchScreen > e.changedTouches[0].pageX + threshold) {
        if (touchScreen < e.changedTouches[0].pageX) {
          if (swiper.activeIndex != 0) render.slideNext('prev');
        } else {
          if (swiper.activeIndex != swiper.slides.length - 1) render.slideNext('next');
        }
      }
    }
  }
});

// Detect mousewheel to fire event with specific render
var indicator = new WheelIndicator({
  elem: document.querySelector('.slider__container'),
  callback: function(e){
    if (!animButterfly) {
      if(e.direction == 'up') {
        if (swiper.activeIndex != 0) render.slideNext('prev');
      } else {
        if (swiper.activeIndex != swiper.slides.length - 1) render.slideNext('next');
      }
    }
  }
});

// function parallax() {
//   if (W>620) {
//       // Parallax Effect on elements
//       $(currentSlider).mousemove(function(e) {
//         var range = 50;
//         var xx = -range/2 + (e.pageX / W) * range;
//         var yy = -range/2 + (e.pageY / H) * range;

//         var rotation = 10;
//         var rx = -rotation/2 + (e.pageX / W) * rotation;
//         var ry = rotation/2 - (e.pageY / H) * rotation;
//         TweenMax.to($(this).find(".bg"), 1, {x: xx, y: yy, rotationX: ry, rotationY: rx, ease: Quad.easeOut, transformPerspective: 2000, transformOrigin: "center center -500px" });
//         TweenMax.to($(this).find("*[data-parallax]"), 1, {x: xx*.5, y: yy*.5, skewX: ry*.5, skewY: ry*.5, ease: Quad.easeOut, transformPerspective: 1000, transformOrigin: "center center 500px" });
//       });
//     } else {
//       $(currentSlider).unbind('mousemove');
//     }
// }

function Render() {
  var tl = new TimelineLite();

  this.renderSlide = function () {
    butterfly.comeInScreen(swiper.activeIndex);
    indicator.turnOff();
    currentSlider = $(swiper.slides[swiper.activeIndex]);

    // parallax();

    tl.clear();

    if ($(".swiper-slide-active").attr("data-header-white") == '') {
      $('body').addClass("whiteHeader");
    } else {
      $('body').removeClass("whiteHeader");
    }

    if ($(currentSlider).find(".title-logo").length > 0) tl.to($(currentSlider).find(".title-logo"), .3, { y:0, opacity: 1 });

    // if ($(currentSlider).find(".line-wrapper").length > 0) {
    //     $(currentSlider).find(".line-wrapper").each(function() {
    //     tl.to($(this).find(".line-text"), .2, { x: "0" });
    //     // tl.to($(this).find(".line-blue"), .5, { x: "105%" }, '-=0.1');
    //     // tl.to($(this).find(".line-red"), .5, { x: "105%" }, '-=0.2');
    //   });
    // }
    tl.staggerTo($(currentSlider).find(".word"), .2,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: Back.easeOut,
        delay: .2
      }, .02);

    if ($(currentSlider).find("small").length > 0) tl.to($(currentSlider).find("small"), .2, { y:0, opacity: 1, scale: 1 }, "-=.1");
    if ($(currentSlider).find(".btn").length > 0) tl.to($(currentSlider).find(".btn"), .5, { y:0, opacity: 1, scale: 1 }, "-=.1");
    if ($(currentSlider).find(".arrow").length > 0) tl.to($(currentSlider).find(".arrow"), .5, { x:0, opacity: 1, scale: 1 }, "-=.5");
    if ($(currentSlider).find(".share__block").length > 0) tl.to($(currentSlider).find(".share__block"), .3, { y:0, opacity: 1, scale: 1 }, "-=.2");
    if ($(currentSlider).find(".share__block").length > 0) tl.staggerTo($(currentSlider).find(".list-inline li"), .5, { y:0, opacity: 1, scale: 1 }, .2, "-=.2");
    if ($(currentSlider).find(".follow").length > 0) tl.to($(currentSlider).find(".follow"), .3, { y:0, opacity: 1, scale: 1 }, "-=.2");
    if ($(currentSlider).find(".follow").length > 0) tl.staggerTo($(currentSlider).find(".list-inline li"), .5, { y:0, opacity: 1, scale: 1 }, .2, "-=.2");



    // tl.staggerTo($(currentSlider).find(".slider__title .letter"), .2,
    //   {
    //     y: 0,
    //     opacity: 1,
    //     scale: 1,
    //     ease: Back.easeOut,
    //     delay: .2
    //   }, .02);



    tl.play().timeScale(1);
    if (swiper.activeIndex == swiper.slides.length - 1) {
      setTimeout(function() {
        watchingFireworks = true;
        // new p5(sketch, 'fireworks');
      }, 500);
    } else {
      watchingFireworks = false;
    }

    tl.eventCallback("onComplete", function() {
      if (swiper.activeIndex == swiper.slides.length - 1) {
        fireworksVideo.play();
        fireworksVideo.loop = true;
      }
      indicator.turnOn();
      $('.btn-onEdge').mouseover(function() {
        $("body").addClass("open-slideNext");
      }).mouseout(function() {
        $("body").removeClass("open-slideNext");
      });
    });
  }

  this.slideNext = function(s) {
    // if (W>620) {
    //   if (s == 'prev') {
    //     butterfly.leaveScreen('prev');
    //   } else {
    //     // butterfly.leaveScreen('next');
    //   }
    // }
    indicator.turnOff();

    butterfly.leaveScreen(swiper.activeIndex);
    // $(currentSlider).unbind("mousemove mouseover");
    $('.btn-onEdge').unbind('mouseover mouseout');
    tl.reverse().timeScale(2);
    tl.eventCallback("onReverseComplete", function() {
      indicator.turnOn();
      if (s == 'next') {
        swiper.slideNext();
        // butterfly.comeInScreen('next');
      } else if (s == 'prev') {
        swiper.slidePrev();
        // butterfly.comeInScreen('prev');
      } else {
        swiper.slideTo(s);
        // butterfly.comeInScreen('next');
      }
      render.renderSlide();

      if (swiper.activeIndex == swiper.slides.length - 1) {
        fireworksVideo.currentTime = 0;
        fireworksVideo.pause();
      }
    });
  }
}



// BUTTERLFY
function Butterlfy() {

  var map = Snap('.butterfly-path');
  var butterfly = map.select('.butterfly');
  var stopingPoint, butterflyPath, butterflyPathLength, butterflyBox, currentPoint;


  this.comeInScreen = function(path) {
    stopingPoint = 0;
    butterflyPath = 0; 
    butterflyPathLength = 0; 
    butterflyBox = 0; 
    currentPoint =0;
    animButterfly = true;
    
    butterfly.transform('');
    if (path < 9) {
      setTimeout(function() {
        $('.butterfly').css('opacity', 1);
      }, 500);
    } else {
      $('.butterfly').css('opacity', 0);
    }
    var p = '#path-'+ (path + 1);
    var stop = parseFloat($(p).attr('stop'));

    butterflyPath = map.select(p);
    butterflyPathLength = Snap.path.getTotalLength(butterflyPath);
    butterflyBox = butterfly.getBBox();

    stopingPoint = butterflyPathLength * stop;

    Snap.animate(0, stopingPoint, function( step ) {
        butterfly.transform('');
        var moveToPoint = Snap.path.getPointAtLength( butterflyPath, step );
        var x = moveToPoint.x - (butterflyBox.width/2);
        var y = moveToPoint.y - (butterflyBox.height/2);
        currentPoint = step;
        butterfly.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha - 90)+', '+butterflyBox.cx+', '+butterflyBox.cy+')');
    }, 2000, mina.easeinout, function() {
      animButterfly = false;
    });

  }

  this.leaveScreen = function() {
    animButterfly = true;
    var step = currentPoint;
    Snap.animate(stopingPoint, butterflyPathLength, function( step ) {
        if (step > butterflyPathLength) { step = butterflyPathLength }
        var moveToPoint = Snap.path.getPointAtLength( butterflyPath, step);
        var x = moveToPoint.x - (butterflyBox.width/2);
        var y = moveToPoint.y - (butterflyBox.height/2);
        butterfly.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha - 90)+', '+butterflyBox.cx+', '+butterflyBox.cy+')');
    }, 350, function() {
      animButterfly = false;
      $('.butterfly').css('opacity', 0);
    });
  }



}

var butterfly = new Butterlfy();


$("[btn-next]").on("click", function(e) {
  e.preventDefault();
  $("body").removeClass("open-slideNext");
  render.slideNext('next');
});

// Menu
$(".menu").on('click', function(e) {
  e.preventDefault();
  $("body").toggleClass("open-menu");

  if ($("body").hasClass('open-menu')) {
     if (W > 620) {
        $(".nav").mousemove(projects.mouseMoving);
        $(".projects__item").mouseover(projects.mouseOverProject).mouseleave(projects.mouseLeaveProject);
      }
  } else {
      $(".nav").unbind('mousemove');
      $(".projects__item").unbind('mouseover mouseleave');
  }

});

// Projects in menu
function Projects() {

  this.init = function() {
    if (W > 620) {
      var total = $(".projects__item").width() * ($(".projects__item").length + 2) + 400;
      $(".projects").width(total);
    } else {
      $(".projects").width('auto');
    }
  }

  this.mouseMoving = function(e) {
    var tx = 400 - e.pageX / W * ($(".projects").width() - W + 400);
    TweenMax.to($(".projects"), 1, {x: tx, ease: Quad.easeOut});
  }


  this.mouseOverProject = function() {
    $(".projects__img img, .projects__title").css("opacity", .6);
    $(this).find("img").css("opacity", 1);
    $(this).find(".projects__title").css("opacity", 1);
  }

  this.mouseLeaveProject = function() {
    $(".projects__img img, .projects__title").css("opacity", 1);
  }

  this.isResizing = function() {
    if (W > 620) {
      $(".nav").mousemove(this.mouseMoving);
      $(".projects__item").mouseover(this.mouseOverProject).mouseleave(this.mouseLeaveProject);
    } else {
      $(".nav").unbind('mousemove');
      $(".projects__item").unbind('mouseover mouseleave');
    }
  }

  $('.projects__item a').on('click', function(e) {
    if ($(this).attr('href') == '#') {
      e.preventDefault();
      console.log('yo');
    }
  });

}

var projects = new Projects();
projects.init();

$("[data-slider]").on("click", function(e) {
  e.preventDefault();
  var attr = parseInt($(this).attr("data-slider"));
  $('body').removeClass("open-menu");
  if (attr != swiper.activeIndex) {
    setTimeout(function() {
      render.slideNext(attr);
    }, 500);
  }

});


// FIREWORKS

var fireworks = [];
var gravity;
var watchingFireworks = false;

var sketch = function(p) {
  var bg,
      ratio;

  p.preload = function() {
    bg = p.loadImage("../img/bg-fireworks.jpg");
  };

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    // p.pixelDensity(window.devicePixelRatio);
    var d = p.pixelDensity();
    if (W > 620) {
      gravity = p.createVector(0, 0.2);
    } else {
      gravity = p.createVector(0, 0.3);
    }

    ratio = bg.width / bg.height;
    bg.loadPixels();

    p.stroke(255);
    p.strokeWeight(4);
  };

  p.draw = function() {
    p.background(0);
    if (window.innerWidth > window.innerHeight) {
      p.image(bg, 0, 0, window.innerWidth, window.innerWidth*ratio);
    } else {
      p.image(bg, 0, 0, window.innerHeight*ratio, window.innerHeight);
    }
    if (watchingFireworks) {
      if (p.random(2) < 0.05) {
        fireworks.push(new Firework(p));
      }
    }
    for (var i = fireworks.length-1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();

      if (fireworks[i].done()) {
        fireworks.splice(i,1);
      }
    }
  }

  p.windowResized = function() {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  }
}
