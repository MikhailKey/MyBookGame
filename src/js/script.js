
//Constants
const selectedOption = $('.modal-bar__current'),
    chooseWindow = $('.modal-preview'),
    resultWindow = $('.modal-book'),
    modalEventSelector =  $('.modal-slider'),
    modalBar = $('.modal-bar__select'),
    resultButton = $('.modal-button'),
    randomButton = $('.modal-button__newrandom'),
    againButton = $('.modal-again');

//Functions values
  
    let loader = true,
    dataArray = [];
     

//Functions

  // preloader
  function Loader(selector) {
    if (loader) {
      $(selector).fadeIn(500);
    } else {
      $(selector).fadeOut(250);
    }
  }

  function bookTemplate(book){
    const {id, pageCount, linePerPageCount, name, author, yearPublishing, img} = book;

    return `<div data-id=${id} data-pageCount="${pageCount}" data-linesCount="${linePerPageCount}" class="slide-item">
      <h1>${name}</h1>
      <h2>${author}</h2>
      <span>${yearPublishing}</span>
      <img src="${img}" alt="">
    </div>`;
  }

  function makeBooksList(jsonMap, modalSelector) {
    let content = '';

    jsonMap.map((book) => {
      content += bookTemplate(book)
    })

    $(modalSelector).html(content);
  }

  function modalItemTamplate(count){
    return  `<div class="modal-bar__item">${count}</div>`;
  }

  function changeSelect(slickSelector, choosenSelect) {
    let pageCount = Number($(slickSelector).attr('data-pagecount')),
      linesCount = Number($(slickSelector).attr('data-linescount')),
      pageSelect = '',
      stringSelect = '';
    let i = 1;
    while(i < pageCount && i < linesCount){
      i++;
      if(i < pageCount) pageSelect += modalItemTamplate(i);
      if(i < linesCount) stringSelect +=  modalItemTamplate(i);
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

  function inputChange(inputsArray, slickSelector) {
    
    $(inputsArray).each(function (i, input) {
      $(input).on('input', function (e) {
        let pageCount = Number($(slickSelector).attr('data-pagecount')),
          linesCount = Number($(slickSelector).attr('data-linescount'));
        if ($(this).siblings(modalBar).hasClass('select-page')) {
          if ($(this).val() > pageCount) {
            $(this).val(pageCount);
          }
        } else {
          if ($(this).val() > linesCount) {
            $(this).val(linesCount);
          }
        }
        this.value = e.target.value;
        
        $(this).attr('value', e.target.value);
        $(this).val(e.target.value);
      })
    })
  }

  function ajaxLiveLoad(url) {
    Loader('.lds-ripple');
      $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
        loader = false;
        Loader('.lds-ripple');
        $(chooseWindow).fadeIn(500);
        if (data.length > 0 && data != '') {
          makeBooksList(data, '.modal-slider');
          dataArray = data;
          $('.modal-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: $('.slider-arrow__left'),
            nextArrow: $('.slider-arrow__right'),
          });
          inputChange('.modal-bar__current', '.slick-active');
          changeSelect('.slick-active', modalBar);
        }
      },
      error: function () {
        loader = false;
        Loader('.lds-ripple');
        $(chooseWindow).fadeIn(500);
        let errorMessage = `<div class="modal-error">Произошла ошибка. <br> Пожалуйста, воспользуйтесь сервисом позднее</div>`;
        $(chooseWindow).html(errorMessage);
      }
    });
  }

  function showSelect() {
    let selectWrap = $('.modal-bar__current');
    
    function chooseSelect(number) {
      let length = ($(modalBar).eq(number).children().length) * 30;
      if (length >= 210) {
        modalBar.eq(number).css({
          'max-height': '210px',
          'overflow-y': 'auto'
        });
      } else {
        modalBar.eq(number).css({
          'overflow': 'visible',
          'height': `${length}px`,
        });
      }
    }

    $(selectWrap).on('click', function () {
      if ($(this).siblings(modalBar).hasClass('select-page')) {
        chooseSelect(0)
      } else {
        chooseSelect(1)
      }
    })
  }

  function hideSelect() {
    $(document).mouseup(function (e) {
      if (!$(modalBar).is(e.target)
        && modalBar.has(e.target).length === 0) {
          modalBar.css({
          'max-height': '0',
          'overflow': 'hidden'
        });
      }
    });
    $(document).on('keypress', function (e) {
      if (e.which == 13) {
        if (!$(modalBar).is(e.target)
          && modalBar.has(e.target).length === 0) {
            modalBar.css({
            'max-height': '0',
            'overflow': 'hidden'
          });
        }
      }
    });
  }

  function chooseOption() {
    modalBar.on('click', '.modal-bar__item', function () {
      let cont = $(this).text();
      let currentSelect = $('.modal-bar__current');
      if ($(this).closest(modalBar).hasClass('select-page')) {
        $(currentSelect).eq(0).val(cont);
        $(currentSelect).eq(0).attr('value', cont);
      } else {
        $(currentSelect).eq(1).val(cont);
        $(currentSelect).eq(1).attr('value', cont);
      }
      $(this).closest(modalBar).css({
        'max-height': '0',
        'overflow': 'hidden'
      });
    })
  }

  function changeImage(url) {
    let image = $('.modal-book__text');
    $(image).attr('src', url);
  }

  function sendResult(arg) {
    let id = $('.slick-current').attr('data-id'),
      pageNumber = Number($(selectedOption).eq(0).attr('value')),
      linePerPageNumber = Number($(selectedOption).eq(1).attr('value'));
    let url = '';
    if (!arg) {
      url = `http://moya-kniga.ru/ajax/game.php?id=${id}&pageNumber=${pageNumber}&linePerPageNumber=${linePerPageNumber}`;
    } else {
      let randomData = dataArray[Math.floor(Math.random() * (dataArray.length))];
      id = randomData.id;
      pageNumber = Math.floor(Math.random() * (randomData.pageCount) + 1);
      linePerPageNumber = Math.floor(Math.random() * (randomData.linePerPageCount) + 1);
      url = `http://moya-kniga.ru/ajax/game.php?id=${id}&pageNumber=${pageNumber}&linePerPageNumber=${linePerPageNumber}`;
    }
    $(resultWindow).fadeIn(500);
    changeImage(url);
  }

  function sharing(vkShare, twitterShare, facebookShare, odnoklassnikiShare, box) {
    var url = '';
    var title = 'game';
    var pimg = '';
    var text = '';
    function sharingContent(self) {
      url = encodeURIComponent('http://moya-kniga.ru/#game');
      pimg = encodeURIComponent($(box).find('.modal-book__text').attr("src"));
    }
    $(box).on('click', vkShare, function (e) {
      e.preventDefault();
      sharingContent(this);
      var vkShare = 'https://vkontakte.ru/share.php?url=' + url + '&title=' + title + '&description=' + text + '&image=' + pimg;
      window.open(vkShare, 'Поделиться', 'toolbar=0,status=0,width=626,height=436');
    });
    $(box).on('click', twitterShare, function (e) {
      e.preventDefault();
      sharingContent(this);
      var twitShare = 'https://twitter.com/share?url=' + pimg + '&text=' + title;

      window.open(twitShare, 'Поделиться', 'toolbar=0,status=0,width=626,height=436');

    });
    $(box).on('click', facebookShare, function (e) {
      e.preventDefault();
      sharingContent(this);
      var faceShare = 'https://www.facebook.com/sharer/sharer.php?u=' + pimg;
      window.open(faceShare, 'Поделиться', 'toolbar=0,status=0,width=626,height=436');
    });
    $(box).on('click', odnoklassnikiShare, function (e) {
      e.preventDefault();
      sharingContent(this);
      var odnoklassnikShare = 'https://connect.ok.ru/offer?url=' + pimg;
      window.open(odnoklassnikShare, 'Поделиться', 'toolbar=0,status=0,width=626,height=436');
    });
  }

//Page Ready
$(document).ready(function () {
  //modal change select event
  modalEventSelector.on('afterChange',  () => changeSelect('.slick-active', modalBar));
  //get books request
  ajaxLiveLoad('https://cors-anywhere.herokuapp.com/moya-kniga.ru/ajax/game.php');

  //open popup for select page or string
  showSelect()
  //hide varitant for select
  hideSelect()

  //click variant for choose
  chooseOption()
  
  //take result page
  $(resultButton).on('click', () => {
    $(chooseWindow).hide();
    sendResult();
  })

  //post with results
  $(randomResultButton).on('click', () => {
    $(chooseWindow).hide();
    sendResult(true);
  });

  //randomize results
  $(randomButton).on('click', function () {
    sendResult(true);
  })
  // refresh for play again
  $(againButton).on('click', function () {
    $(chooseWindow).fadeIn(500);
    $(resultWindow).hide();
  })
  //social sharing for vk, facebook, odn, twitter
  sharing(".social-vk-share", ".social-twitter-share", ".social-facebook-share", ".social-odnoklassniki-share", ".modal-book");
})

