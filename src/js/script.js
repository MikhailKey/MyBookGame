$(document).ready(function () {

  let selectedOption = $('.modal-bar__current'),
      choosenSelect = $('.modal-bar__select'),
      loader = false,
      chooseWindow = $('.modal-preview'),
      resultWindow = $('.modal-book'),
      dataArray = [];

  function Loader() {
    if (loader) {
      $('.lds-ripple').fadeIn(500);
    } else {  
      $('.lds-ripple').fadeOut(250);
    } 
  }

  function makeBooksList(json) {
    let content = ``;
    json.map((book) => 
    {
      let pagesCount = book.pageCount,
          linesCount = book.linePerPageCount;
      content += `
      <div data-id=${book.id} data-pageCount="${pagesCount}" data-linesCount="${linesCount}" class="slide-item">
        <h1>${book.name}</h1>
        <h2>${book.author}</h2>
        <span>${book.yearPublishing}</span>
        <img src="${book.img}" alt="">
      </div>
      `
    })
    $('.modal-slider').html(content);
  }

  function changeSelect() {
    let pageCount = Number($('.slick-active').attr('data-pagecount')),
        linesCount = Number($('.slick-active').attr('data-linescount')),
        pageSelect = '',
        stringSelect = '';

    for (let i = 1; i < pageCount + 1; i++) {
      pageSelect += `<div class="modal-bar__item">${i}</div>`;
    }

    for (let i = 1; i < linesCount + 1; i++) {
      stringSelect += `<div class="modal-bar__item">${i}</div>`;
    }

    $(choosenSelect).eq(0).html(pageSelect);
    $(choosenSelect).eq(1).html(stringSelect);

    if (Number($(selectedOption).eq(0).attr('value')) > pageCount) {
      $(selectedOption).eq(0).val(pageCount);
      $(selectedOption).eq(0).attr('value', pageCount);
    }

    if (Number(($(selectedOption).eq(1).attr('value')) > linesCount)) {
      $(selectedOption).eq(1).val(linesCount);
      $(selectedOption).eq(1).attr('value', linesCount);
    }
  }

  $('.modal-slider').on('afterChange', () => changeSelect());

  function ajaxLiveLoad(url) {
    let button = $('.button-play');
    $(button).on('click', function () 
    {
      loader = true;
      Loader();
      $('.modal-start').fadeOut(250);
      if (loader === true) {
        $.ajax({
          url: url,
          type: 'GET',
          success: function (data) {
            loader = false;
            Loader();
            $(chooseWindow).fadeIn(500);
            if (data.length > 0 && data != '') {
              makeBooksList(data);
              dataArray = data;
              $('.modal-slider').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: $('.slider-arrow__left'),
                nextArrow: $('.slider-arrow__right'),
              });
              inputChange();
              changeSelect();
            }
          },
          error: function() {
            loader = false;
            Loader();
            $(chooseWindow).fadeIn(500);
            let errorMessage = `<div class="modal-error">Произошла ошибка. <br> Пожалуйста, воспользуйтесь сервисом позднее</div>`;
            $(chooseWindow).html(errorMessage); 
          }
        });
      }
    });
  }

  ajaxLiveLoad('https://cors-anywhere.herokuapp.com/moya-kniga.ru/ajax/game.php');

  function inputChange()
  {
    let inputs = $('.modal-bar__current');

    $(inputs).each(function(i, input)
    {
      $(input).on('input', function(e)
      {
        let pageCount = Number($('.slick-active').attr('data-pagecount')),
            linesCount = Number($('.slick-active').attr('data-linescount'));
        if ($(this).siblings($('.modal-bar__select')).hasClass('select-page')) {
          if ($(this).val() > pageCount) {
            $(this).val(pageCount);
          } 
        } else {
          if ($(this).val() > linesCount) {
            $(this).val(linesCount);
          }
        }
        $(this).attr('value', e.target.value);
        $(this).val(e.target.value);
      })
    })
  }

  function showSelect() 
  {
    let selectWrap = $('.modal-bar__current');

    function chooseSelect(number) 
    {
      let length = ($('.modal-bar__select').eq(number).children().length) * 30;
      if (length >= 210) {
        $('.modal-bar__select').eq(number).css({
          'max-height': '210px',
          'overflow-y': 'auto'
        });
      } else {
        $('.modal-bar__select').eq(number).css({
          'overflow': 'visible',
          'height': `${length}px`,
        });
      }
    }

    $(selectWrap).on('click', function () {
      if ($(this).siblings($('.modal-bar__select')).hasClass('select-page')) {
        chooseSelect(0)
      } else {
        chooseSelect(1)
      }
    })
  }

  showSelect()

  function hideSelect() {
    $(document).mouseup(function (e) {
      if (!$('.modal-bar__select').is(e.target)
        && $('.modal-bar__select').has(e.target).length === 0) {
        $('.modal-bar__select').css({
          'max-height': '0',
          'overflow': 'hidden'
        });
      }
    });
  }

  hideSelect()

  function chooseOption() {
    $('.modal-bar__select').on('click', '.modal-bar__item', function () {
      let cont = $(this).text();
      let currentSelect = $('.modal-bar__current');
      if ($(this).closest($('.modal-bar__select')).hasClass('select-page')) {
        $(currentSelect).eq(0).val(cont);
        $(currentSelect).eq(0).attr('value', cont);
      } else {
        $(currentSelect).eq(1).val(cont);
        $(currentSelect).eq(1).attr('value', cont); 
      }
      $(this).closest('.modal-bar__select').css({
        'max-height': '0',
        'overflow': 'hidden'
      });
    })
  }

  chooseOption()

  function sendResult(arg) {
    let id = $('.slick-current').attr('data-id'),
    pageNumber = Number($(selectedOption).eq(0).attr('value')),
    linePerPageNumber = Number($(selectedOption).eq(1).attr('value'));
    let url = '';
    if (!arg) {
      url = `http://moya-kniga.ru/ajax/game.php?id=${id}&pageNumber=${pageNumber}&linePerPageNumber=${linePerPageNumber}`;
    } else {
      let randomData = dataArray[Math.floor(Math.random()*(dataArray.length))];
      id = randomData.id;
      pageNumber = Math.floor(Math.random() * (randomData.pageCount) + 1);
      linePerPageNumber = Math.floor(Math.random() * (randomData.linePerPageCount) + 1); 
      url = `http://moya-kniga.ru/ajax/game.php?id=${id}&pageNumber=${pageNumber}&linePerPageNumber=${linePerPageNumber}`;
    }
    $(resultWindow).fadeIn(500);
    changeImage(url);
  }

  function changeImage(url) {
    let image = $('.modal-book__text');
    $(image).attr('src', url);
  } 

  let resultButton = $('.modal-button');
  $(resultButton).on('click', () => {
    $(chooseWindow).hide();
    sendResult();
  })

  let randomResultButton = $('.modal-button__random');
  $(randomResultButton).on('click', () => {
    $(chooseWindow).hide();
    sendResult(true);
  });

  let randomButton = $('.modal-button__newrandom');
  $(randomButton).on('click', function()
  {
    sendResult(true);
  })


  let againButton = $('.modal-again');
  $(againButton).on('click', function () {
    $(chooseWindow).fadeIn(500);
    $(resultWindow).hide();
  })

  function sharing(vkShare, twitterShare, facebookShare, odnoklassnikiShare, box){
    var url = '';
    var title = 'game';
    var pimg= '';
    var text = '';
    function sharingContent(self){
      url = encodeURIComponent('http://moya-kniga.ru/#game');
      pimg = encodeURIComponent($(box).find('.modal-book__text').attr("src"));
    }
    $(box).on('click', vkShare, function(e){
       e.preventDefault();
       sharingContent(this); 
       var vkShare = 'https://vkontakte.ru/share.php?url='+url+'&title=' + title + '&description='+text+'&image='+pimg; 
       window.open(vkShare,'Поделиться','toolbar=0,status=0,width=626,height=436');
    });
    $(box).on('click', twitterShare, function(e){
       e.preventDefault();
       sharingContent(this);
       var twitShare = 'https://twitter.com/share?url=' + pimg + '&text=' + title;
       
       window.open(twitShare,'Поделиться','toolbar=0,status=0,width=626,height=436');
      
    }); 
    $(box).on('click', facebookShare, function(e){
      e.preventDefault();
      sharingContent(this); 
      var faceShare = 'https://www.facebook.com/sharer/sharer.php?u=' + pimg;
      window.open(faceShare,'Поделиться','toolbar=0,status=0,width=626,height=436');
   }); 
   $(box).on('click', odnoklassnikiShare, function(e){
    e.preventDefault();
    sharingContent(this); 
    var odnoklassnikShare = 'https://connect.ok.ru/offer?url=' + pimg;
    window.open(odnoklassnikShare,'Поделиться','toolbar=0,status=0,width=626,height=436');
 }); 
  }
  sharing(".social-vk-share", ".social-twitter-share", ".social-facebook-share", ".social-odnoklassniki-share", ".modal-book");  
})

