function mobileMenu(){
  var mobileMenus = $('#mobile-menus .container-fluid');
  var menuIcon = $('#mobile-menu-icon');
  var menuCloseIcon = $('#mobile-close-icon');
  $('#dropdown-menu').on('click', function(){
    if (mobileMenus.is(':hidden')) {
      mobileMenus.slideDown('fast');
      menuIcon.hide();
      menuCloseIcon.show();
    } else {
      mobileMenus.slideUp('fast');
      menuIcon.show();
      menuCloseIcon.hide();
    }
  });
}

$(function(){
  mobileMenu();
});
