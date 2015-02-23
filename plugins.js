 /*
 *
 * Increment - a jQuery Plugin
 * Copyright 2010 Sean O
 * http://sean-o.com
 * http://twitter.com/seanodotcom
 *
 * Version 0.6 - April, 2010
 *      Added support for mousewheel plugin, small Closure Compiler bugfix
 * Version 0.5 - March, 2010
 *      Initial Release
 *
 * Increment/Decrement numeric inputs by using up/down arrow keys or mousewheel.
 * Use Shift & Ctrl/Cmd keys to modify increment.
 *
 * Known Issues (v0.6):
 * Google Chrome overrides the ctrl+scroll event for browser resizing, with no known workaround
 *
 * The Increment jQuery plugin is provided "AS IS", with no warranties express or implied,
 * and is dual licensed under the MIT & GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Enjoy!  --SEAN O (@seanodotcom)
 *
 */

(function($){

  $.fn.increment = function(options) {
    var defaults = {
      increment:            1,     // amount to increment/decrement
      minVal:               0,     // minimum value of input
      maxVal:             100,     // maximum value of input
      minIncrement:       0.1,     // minimum increment (Ctrl/Cmd Key modifier)
      maxIncrement:         5,     // maximum increment (Shift Key modifier)
      showArrows:         true     // show up/down arrows as UI input hint? (use UTF-8 character set & be mindful of CSS)
    };
     var hint = "<span style='display:inline' class='arrowshint'>&uarr;&darr;&nbsp;</span>";
     var opts = $.extend(defaults, options);
    var $this = $(this);

    var constructor = function() {
      var handleEvent = function(e) {
        // ?? e.preventDefault();
        var $tgt = $(e.target);
        var key = ( e.keyCode || e.charCode || e.which );
        var val = (e.shiftKey ? opts.maxIncrement : (e.ctrlKey || e.metaKey) ? opts.minIncrement : opts.increment);

        if (e.wheelDelta > 0 || e.which == 38) {
          increment($tgt, val);
        }
        else if ( e.wheelDelta < 0 || e.which == 40 ) {
          decrement($tgt, val);
        }

        return true;
      };

      var increment = function(target, incrementBy) {
        var v = target.val() - 0;
        if ( v + incrementBy > opts.maxVal ) {
          return;
        }
        v += incrementBy;
        target.val(v);
      }

      var decrement = function(target, decrementBy) {
        var v = target.val() - 0;
        if ( v - decrementBy < opts.minVal ) {
          return;
        }
        v -= decrementBy;
        target.val(v);
      }

       if (opts.showArrows) {
         $this
          .attr('autocomplete','off')
         .focus(function() {
            $('.arrowshint').remove();
            $this.before(hint);
            $('.arrowshint').css('opacity', 0.3);
         })
         .blur(function(){
           $('.arrowshint').remove();
         });
      }
      if ( $this.attr('title') == '' )
        $this.attr('title','Use up/down arrows to increment/decrement value');

      $this.bind("mousewheel keydown", handleEvent);
    };

    return this.each(constructor);
  };
})(jQuery);  // return jQuery object