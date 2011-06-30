/*
 * sherpiND
 *
 * Copyright (c) 2011 University of Notre Dame
 *
 * Date: 2011-04-05
 * Version: 1.0
 */

;(function($) {
  $.fn.sherpiND = function(options) {
    var opts = $.extend({}, $.fn.sherpiND.defaults, options),
				docHeight = $(document).height(),
				windowHeight = $(window).height(),
        list = '<ol id="sherpind" class="'+ opts.color +'"></ol>'
    ;
    $(document.body).append(list);

    var $list = $('#sherpind');
    $list.find('li').live('click', function(){
      var $this = $(this),
          targetId = this.getAttribute('data-target'),
          top = parseInt($('#'+targetId).offset().top, 10)
      ;

      $('html,body').animate({ scrollTop: top });
    }).live('mouseenter', function(){
      var $this = $(this),
          top = $this.offset().top,
          wintop = $(window).scrollTop()
      ;
      $this.addClass('hover');

      if( (top + $this.height()) > windowHeight + wintop ) {
       $this.addClass('pinup');
       var ntop = '-' + $this.height() + 'px';
       $this.find('.content').css({'margin-top' : ntop});
      }
    }).live('mouseleave', function(){
      $(this).removeClass('hover').removeClass('pinup');
      $(this).find('.content').css({'margin-top' : '-19px'});
    });

    $(window).resize(function() {
      var windowHeight = window.innerHeight;
      $list.find('li').each(function(){
        var targetID = this.getAttribute('data-target'),
            $target = $('#'+targetID),
            offset = $target.offset(),
            top = offset.top,
            positionPercentage = top/docHeight,
            thisTop = parseInt(positionPercentage * windowHeight, 10)
        ;
        $(this).css({'top':thisTop});
      });
    });

    return this.each(function(fn) {
      var $this = $(this),
          id = this.getAttribute('id'),
          $target = $('#' + id),
          top = $this.offset().top,
          positionPercentage = top/docHeight,
          thisTop = parseInt(positionPercentage * windowHeight, 10),
          classes = this.getAttribute("class"),
          text = $this.text(),
          tease = '',
          img = (this.getAttribute('data-pin-img')) ? this.getAttribute('data-pin-img') : $target.next('img').first().attr('src'),
          $p = $('#'+ id +' ~ p').first(),
          snippet = (this.getAttribute('data-pin-snippet')) ? this.getAttribute('data-pin-snippet') + '&hellip;' : $p.text().substr(0,30) + '&hellip;'
      ;

      if(img && img.length) {
        tease = '<div class="tease"><img src="' + img + '" alt="Preview Image"></div>';
      }
      $list.append('<li data-target="'+this.getAttribute('id')+'" style="top:'+thisTop+'px;" class="'+ classes +'"><div class="marker"></div><div class="content">'+ tease +'<span class="title">' + text + '</span><p class="snippet">'+ snippet +'</p></div></li>');
    });

  };

  $.fn.sherpiND.defaults = {color:'light-gray'};

})(jQuery);