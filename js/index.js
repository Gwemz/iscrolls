$(function () {
    var flickerAPI = "https://zhihu-daily.leanapp.cn/api/v1/last-stories";
    $.getJSON(flickerAPI, {}).done(function (data) {
        $.each(data.STORIES.stories, function (i, item) {
            // $('<div class="title" id=' + item.id + '><span>' + item.title + '</span><img class="img" src="' + item.images[0] + '"></img></div>').appendTo($('#content'));
            $('<li><div class="row"><div class="col-sm-6 col-md-4"><div class="thumbnail gwt_home" id="'+item.id+'"><img src="'+item.images[0]+'" alt="加载失败"><div class="caption"><p>'+item.title+'</p></div></div></div></div></li>').appendTo($('#thelist'));
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
        console.log(id);
        $.getJSON("https://zhihu-daily.leanapp.cn/api/v1/contents/" + id + "").done(function (data) {
            console.log(data.CONTENTS);
            $('<link rel="stylesheet" href="'+data.CONTENTS.css[0]+'"></link>').appendTo($('head'));
            $('.page_content')[0].innerHTML = data.CONTENTS.body;
            $('.headline').remove();
        })
    })

    //返回
    $('.back').on('click',function () {
        $('#content').removeClass('active');
    })
})