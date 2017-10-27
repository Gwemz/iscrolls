$(function () {
    // var myscroll,myscroll2;
    var flickerAPI = "https://zhihu-daily.leanapp.cn/api/v1/last-stories";
    $.getJSON(flickerAPI, {}).done(function (data) {
        $.each(data.STORIES.stories, function (i, item) {
            // $('<div class="title" id=' + item.id + '><span>' + item.title + '</span><img class="img" src="' + item.images[0] + '"></img></div>').appendTo($('#content'));
            $('<li><div class="row"><div class="col-sm-6 col-md-4"><div class="thumbnail gwt_home" id="'+item.id+'"><img class="lazy" data-original="'+item.images[0]+'" src="" alt="加载失败"><div class="caption"><p>'+item.title+'</p></div></div></div></div></li>').appendTo($('#thelist'));
        })
        // setTimeout(function(){
            loaded()
            $("img.lazy").lazyload({
                effect:"fadeIn",
                threshold : 400,
                container: $("#wrapper")
            });
        // },1000)
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
        $('#wrapper2').addClass('active');
        var id=$(this).find('.gwt_home').attr('id');
        $.getJSON("https://zhihu-daily.leanapp.cn/api/v1/contents/" + id + "").done(function (data) {
            $('<link rel="stylesheet" href="'+data.CONTENTS.css[0]+'"></link>').appendTo($('head'));
            $('.page_content')[0].innerHTML = data.CONTENTS.body;
            $('.headline').remove();
            myScroll2 = {};
            // setTimeout(function(){
                loaded1();
            // },1000)
        })
    })

    //返回
    $('.back').on('click',function () {
        $('#wrapper2').removeClass('active');
    })

    //点击按钮回到页面顶部
    $('.top').on('click',function () {
        $('#wrapper2').animate({scrollTop: 0},1000);
    })
    //手指右滑返回主页面

})