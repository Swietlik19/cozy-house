$(function(){
  /* Если нажали на саму упаковку */
  $('.products__item-pack').click(function() {
    switchClasses($(this));
  });

  /* Если нажали на надпись "купи" */
  $('.products__item-buy').click(function() {
    /* Ищем .products__item-pack над нажатым "купи" */
    switchClasses($($(this).parent().parent().parent().children()[0]));
  });

  function switchClasses(pack) {
    /* Ищем .products__item-note под нажатой упаковкой (чтобы поменять) */
    var note = $(pack.parent().children()[1]);
    if (pack.hasClass('products__item-pack--default')) {
      pack.removeClass('products__item-pack--default');
      pack.addClass('products__item-pack--selected');

      note.children('.products__item-note--default').removeClass('products__item-note--displayed');
      note.children('.products__item-note--selected').addClass('products__item-note--displayed');

    } else if (pack.hasClass('products__item-pack--selected')) {
      pack.removeClass('products__item-pack--selected');
      pack.removeClass('products__item-pack--second');
      pack.addClass('products__item-pack--default');

      note.children('.products__item-note--selected').removeClass('products__item-note--displayed');
      note.children('.products__item-note--default').addClass('products__item-note--displayed');
    }
  }

  $('.products__item-pack').mouseenter(function() {
    /* Добавляем класс, если повторно навели на выбранный элемент */
    if ($(this).hasClass('products__item-pack--selected') && !($(this).hasClass('products__item-pack--second'))) {
      $(this).addClass('products__item-pack--second');
    }

    /* Меняем текст .products__general при воторном наведении на selected */
    if ($(this).hasClass('products__item-pack--second')) {
      el = $(this).children('.products__general');
      el.text("Котэ не одобряет?");
      el.addClass('products__general--hover');
    }
  });

  $('.products__item-pack').mouseleave(function() {
    el = $(this).children('.products__general');
    if (el[0].textContent == "Котэ не одобряет?") {
      el.text("Сказочное заморское яство");
      el.removeClass('products__general--hover');
    }
  });

  $('.products__item-pack').click(function() {
    el = $(this).children('.products__general');
    if (el[0].textContent == "Котэ не одобряет?") {
      el.text("Сказочное заморское яство");
      el.removeClass('products__general--hover');
    }
  });
});
