;
(function(win, $) {
    $(function() {

        //control
        ;
        (function(win, $) {
            var book = $('#book').myTurn();

            var _control = $('#control'),
                _up = _control.find('.up'),
                _down = _control.find('.down'),
                _left = _control.find('.left'),
                _right = _control.find('.right');

            _up.click(function() {
                //openBook
                var _this = $(this);
                _this.addClass('keypress');

                setTimeout(function() {
                    _this.removeClass('keypress');
                }, 150);
                book.openBook().then(function(pages, pageIndex) {
                    $(pages[pageIndex]).addClass('personal-info-ani');
                    _this.addClass('disabled');
                    //_left.removeClass('disabled');
                    _down.removeClass('disabled');
                    _right.removeClass('disabled');

                    

                });
            });
            _down.click(function() {
                //closeBook
                var _this = $(this);
                _this.addClass('keypress');

                setTimeout(function() {
                    _this.removeClass('keypress');
                }, 150);
                book.closeBook().then(function() {
                    _this.addClass('disabled');
                    _left.addClass('disabled');
                    _right.addClass('disabled');
                    _up.removeClass('disabled');

                });
            });
            _left.click(function() {
                //prev
                var _this = $(this);
                _this.addClass('keypress');

                setTimeout(function() {
                    _this.removeClass('keypress');
                }, 150);
                book.prevPage().then(function(pages, pageIndex) {
                    var currPage = $(pages[pageIndex]),
                        prevPage = $(pages[pageIndex - 1]);
                    if (pageIndex == 0) {
                        _left.addClass('disabled');
                        currPage.addClass('personal-info-ani');
                    } else if(pageIndex == 3) {
                        prevPage.addClass('my-works-ani');
                        _right.removeClass('disabled');
                    }
                    prevPage.addClass('curr-page-prev');
                });
            });
            _right.click(function() {
                //next
                var _this = $(this);
                _this.addClass('keypress');

                setTimeout(function() {
                    _this.removeClass('keypress');
                }, 150);
                book.nextPage().then(function(pages, pageIndex) {
                    var currPage = $(pages[pageIndex]),
                        prevPage = $(pages[pageIndex - 1]);
                    if(pageIndex == 1) {
                        _left.removeClass('disabled');
                    } else if(pageIndex == 3) {
                        prevPage.addClass('my-works-ani');
                        currPage.addClass('my-works-ani');
                    } else if(pageIndex == 4) {
                        _right.addClass('disabled')
                        $('#back-home').show();
                    }
                    prevPage.addClass('curr-page-prev');

                });
            });


            $(document).keyup(function(event) {
                if (event.keyCode == 37) {
                    //left
                    //prev();
                    _left.trigger('click');
                } else if (event.keyCode == 39) {
                    //right
                    //next();
                    _right.trigger('click');
                } else if (event.keyCode == 38) {
                    //up
                    // open book
                    //openBook();
                    _up.trigger('click');
                } else if (event.keyCode == 40) {
                    //down
                    //close book
                    //closeBook();
                    _down.trigger('click');
                }
            });

            $('#back-home').click(function() {
                var _this = $(this);
                _this.addClass('back-home-ani');
                book.turnToPage(1).then(function(pages, pageIndex) {
                    _this.removeClass('back-home-ani').hide();
                    setTimeout(function() {
                        $(pages[pageIndex]).addClass('personal-info-ani');
                    }, 100);
                    
                });
            });
        })(window, jQuery);
        //work-experience
        ;
        (function(win, $) {
            var _con = $('.work-experience>.con');
            var lastIndex = 1;
            _con.find('>ul>li>a').click(function() {

                var _index = $(this).attr('data-tick');
                if (lastIndex == _index) {
                    return;
                }
                lastIndex = _index;
                var _project = _con.find('>ul>li>div[data-project=' + _index + ']').parent();
                _project.addClass('selected').siblings('li').removeClass('selected');
                var _wrapWorkExp = $(_project[0]).parents('.work-experience');
                var _wrapWET = _wrapWorkExp.offset().top;
                var _wrapWEH = _wrapWorkExp.outerHeight();
                //console.log(Math.max($(_project[0]).find('.content').outerHeight(), $(_project[1]).find('.content').outerHeight()));
                var ele = _project.find('.content');
                var eleT = ele.offset().top;
                var eleH = ele.outerHeight();
                // var moveY = - (eleT + eleH - _wrapWEH -_wrapWET) - 80;

                // ele.css({
                //     "margin-top": moveY
                // });
            });
        })(window, jQuery);
        //skill
        ;
        (function($) {
            $('#language').click(function() {
                $(this).addClass('selected');
                $('#others').removeClass('selected')
                $('.skill>.con').removeClass('others-select');
                $('.skill>.con').addClass('language-select');
            });
            $('#others').click(function() {
                $(this).addClass('selected');
                $('#language').removeClass('selected')
                $('.skill>.con').removeClass('language-select');
                $('.skill>.con').addClass('others-select');
            });
        })(jQuery);
        //help info
        ;
        (function() {
            console.log('---------------------------------------');
            console.log('请尽量用最新版的chrome浏览器打开');
            console.log('---------------------------------------');
        })();
    });
})(window, jQuery);
