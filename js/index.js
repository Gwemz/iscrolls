$(function () {
    var flickerAPI = "https://zhihu-daily.leanapp.cn/api/v1/last-stories";
    $.getJSON(flickerAPI, {}).done(function (data) {
        $.each(data.STORIES.stories, function (i, item) {
            // $('<div class="title" id=' + item.id + '><span>' + item.title + '</span><img class="img" src="' + item.images[0] + '"></img></div>').appendTo($('#content'));
            $('<li><div class="row"><div class="col-sm-6 col-md-4"><div class="thumbnail gwt_home" id="'+item.id+'"><img src="'+item.images[0]+'" alt="加载失败"><div class="caption"><p>'+item.title+'</p></div></div></div></div></li>').appendTo($('#thelist'));
            myScroll.refresh(); 
            //iscroll
            /*var myScroll,
                pullDownEl, pullDownOffset,
                pullUpEl, pullUpOffset,
                generatedCount = 0;
            document.addEventListener('touchmove', function (e) { 
                e.preventDefault(); 
            }, false);
            
            document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);*/
        })
    });

    $('#page_content').on('click', '.back', function () {
        $('#page_content').removeClass('active');
    })
    //标题页隐藏
    setInterval(function(){
        $('.page').hide();
    },2000)

    //内容页信息展示
    $('#thelist').on('click','li',function () {
        $('#content').addClass('active');
        var id=$(this).find('.gwt_home').attr('id');
        $.getJSON("https://zhihu-daily.leanapp.cn/api/v1/contents/" + id + "").done(function (data) {
            $('<link rel="stylesheet" href="'+data.CONTENTS.css[0]+'"></link>').appendTo($('head'));
            $('.page_content')[0].innerHTML = data.CONTENTS.body;
            $('.headline').remove();
            myScroll.refresh(); 
        })
    })

    //返回
    $('.back').on('click',function () {
        $('#content').removeClass('active');
    })

    //点击按钮回到页面顶部
    $('.top').on('click',function () {
        $('#content').animate({scrollTop: 0},1000);
    })
    //手指右滑返回主页面

    

    function pullDownAction () {
        setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
            var el, li, i;
            el = document.getElementById('thelist');

            for (i=0; i<3; i++) {
                li = document.createElement('li');
                li.innerText = 'Generated row ' + (++generatedCount);
                el.insertBefore(li, el.childNodes[0]);
            }

            myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
        }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
    }

    function pullUpAction () {
        setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
            var el, li, i;
            el = document.getElementById('thelist');

            for (i=0; i<3; i++) {
                li = document.createElement('li');
                li.innerText = 'Generated row ' + (++generatedCount);
                el.appendChild(li, el.childNodes[0]);
            }

            myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
        }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
    }

    function loaded() {
        pullDownEl = document.getElementById('pullDown');
        pullDownOffset = pullDownEl.offsetHeight;
        pullUpEl = document.getElementById('pullUp');
        pullUpOffset = pullUpEl.offsetHeight;

        myScroll = new iScroll('wrapper', {
            useTransition: true,
            topOffset: pullDownOffset,
            onRefresh: function () {
                if (pullDownEl.className.match('loading')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                } else if (pullUpEl.className.match('loading')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                }
            },
            onScrollMove: function () {
                if (this.y > 5 && !pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'flip';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
                    this.minScrollY = 0;
                } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                    this.minScrollY = -pullDownOffset;
                } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                    this.maxScrollY = pullUpOffset;
                }
            },
            onScrollEnd: function () {
                if (pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'loading';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
                    pullDownAction();   // Execute custom function (ajax call?)
                } else if (pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'loading';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
                    pullUpAction(); // Execute custom function (ajax call?)
                }
            }
        });

        setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
    }

    /*document.addEventListener('touchmove', function (e) { 
        e.preventDefault(); 
    }, false);

    document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);*/
})