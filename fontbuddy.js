var fontBuddy = {
  getElmStyle: function(elm, styleName) {
    var res = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
      res = document.defaultView.getComputedStyle(elm, "").getPropertyValue(styleName);
    } else if (elm.currentStyle) {
      styleName = styleName.replace(/\-(\w)/g, function(s, p) {
        return p.toUpperCase();
      });
      res = elm.currentStyle[styleName];
    }
    return res;
  },
  getFontStyleStr: function(elm) {
    return this.getElmStyle(elm, "font-family") + ' ' + this.getElmStyle(elm, "font-size");
  },
  splitFontStyleStr: function(fs) {
    var i = fs.lastIndexOf(' ');
    var nm = fs.substring(0, i).replace(/'/g, '').toLowerCase();
    var sz = fs.substring(i + 1).replace(/\D+/, '') * 1;
    return {
      name: nm,
      size: sz
    };
  },
  sortFonts: function(fonts) {
    var fsrt = {};
    var farr = [];
    for (var fs in fonts) {
      farr.push(fs);
    }
    farr.sort(function(a, b) {
      var af = fontBuddy.splitFontStyleStr(a);
      var bf = fontBuddy.splitFontStyleStr(b);
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
      s = this.getFontStyleStr(elms[i]);
      fonts[s] = (fonts[s] ? fonts[s] : 0) + 1;
    };
    return sorted ? this.sortFonts(fonts) : fonts;
  },
  printFonts: function() {
    var fonts = this.getFonts(1);
    for (var fs in fonts) {
      console.log(fs + ' -> ' + fonts[fs] + ' elements');
    }
  },
  elements: function(fontStyleStr) {
    var allElms = document.all;
    var selElms = [];
    for (var i = 0; i < allElms.length; i++) {
      if (fontStyleStr == this.getFontStyleStr(allElms[i])) {
        selElms.push(allElms[i]);
      }
    }
    return selElms;
  },
  highlight: function(fontStyleStr, hlStyles) {
    var elms = this.elements(fontStyleStr);
    for (var i = 0; i < elms.length; i++) {
      for (var s in hlStyles) {
        elms[i].style[s] = hlStyles[s];
      }
    };
  }
}
fontBuddy.printFonts();
