//= require jquery
//= require jquery_ujs
//= require active_admin/base

$(function() {
   // Addings to menu items

  var loc = window.location.pathname;
  var tabs = $('.header-item.tabs#tabs');
  var currentLink = tabs.find('li a[href*="'+ loc +'"]');
  var hasNested = tabs.find('.has_nested');
  if(currentLink.length){
    currentLink.addClass('active')
    currentLink.closest('li > a').addClass('active')
    currentLink.closest('.has_nested').addClass('open')
  }
  
  tabs.find('.has_nested > a').after('<div class="open-trigger"></div>')
  hasNested.on('click','.open-trigger',function(){
    $(this).closest('.has_nested').toggleClass('open')
  })

  $(document).on('click touchstart', '#sidebar', function(e) {
    var position = $(this).position();
    var width = $(this).width();
    var target = e.target;
    if ((e.pageX < position.left) && (target.tagName != 'SELECT') && (target.tagName != 'OPTION')) {
      if ($(this).css('right') == '0px') {
        $(this).css('position', 'fixed');
        $(this).animate({
          right: "-="+width
        }, 600, function() {
          $(this).removeAttr('style');
          animationFilterDone = true;
        });
      } else {
        $(this).animate({
          right: "+="+width
        }, 600, function() {
          $(this).css('position', 'absolute');
          animationFilterDone = true;
        });
      }
    }
  });

  var animationDone = true;
  $(document).on('click touchstart', '#utility_nav', function(e) {
    var position = $(this).position();
    var tabs = $('#tabs');
    var width = Math.round(tabs[0].getBoundingClientRect().width);

    if (e.pageX < (position.left + 40)) {
      if(animationDone == true) {
        animationDone = false;
        if (tabs.css('left') == '0px') {
          tabs.animate({
            left: "-="+width
          }, 400, function() {
            animationDone = true;
          });
        } else {
          tabs.animate({
            left: "+="+width
          }, 400, function() {
            animationDone = true;
          });
        }
      }
    }
  });

  $(document).on('click touchstart', 'body', function(e) {
    var tabs = $('#tabs');
    var width = Math.round(tabs[0].getBoundingClientRect().width);
    if (tabs.css('left') == '0px') {
      if (e.pageX > width && e.pageY > 60) {
        if(animationDone == true) {
          animationDone = false;
          tabs.animate({
            left: "-="+width
          }, 400, function() {
            animationDone = true;
          });
        }
      }
    }
  });
});
