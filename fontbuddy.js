var fontBuddy = {
  getElmStyle: function(elm, style) {
    var res = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
      res = document.defaultView.getComputedStyle(elm, "").getPropertyValue(style);
    } else if (elm.currentStyle) {
      style = style.replace(/\-(\w)/g, function(s, p) {
        return p.toUpperCase();
      });
      res = elm.currentStyle[style];
    }
    return res;
  },
  getFontStyle: function(elm) {
    return this.getElmStyle(elm, "font-family") + ' ' + this.getElmStyle(elm, "font-size");
  },
  splitFontStyle: function(fs) {
    var i = fs.lastIndexOf(' ');
    var nm = fs.substring(0, i).replace(/'/g, '').toLowerCase();
    var sz = fs.substring(i + 1).replace(/\D+/, '') * 1;
    return {
      'name': nm,
      'size': sz
    };
  },
  sortFonts: function(fonts) {
    var fsrt = {};
    var farr = [];
    for (var fs in fonts) {
      farr.push(fs);
    }
    farr.sort(function(a, b) {
      var af = fontBuddy.splitFontStyle(a);
      var bf = fontBuddy.splitFontStyle(b);
      return af.name < bf.name ? -1 : (af.name > bf.name ? 1 : (af.size - bf.size));
    });
    for (var i = 0; i < farr.length; i++) {
      fsrt[farr[i]] = fonts[farr[i]];
    }
    return fsrt;
  },
  getFonts: function(sorted) {
    var fonts = {};
    var elms = document.all;
    var s = '';
    for (var i = 0; i < elms.length; i++) {
      s = this.getFontStyle(elms[i]);
      fonts[s] = (fonts[s] ? fonts[s] : 0) + 1;
    };
    return sorted ? this.sortFonts(fonts) : fonts;
  },
  printFonts: function() {
    var fonts = this.getFonts(1);
    for (var fs in fonts) {
      console.log(fs + ' -> ' + fonts[fs] + ' elements');
    }
  }
}
fontBuddy.printFonts();
