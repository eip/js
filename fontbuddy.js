var fontBuddy = {
  getStyle: function(elm, style) {
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
  listFonts: function() {
    var elms = document.all;
    var fonts = {};
    for (var i = 0; i < elms.length; i++) {
      s = this.getStyle(elms[i], "font-family") + ' ' + this.getStyle(elms[i], "font-size");
      fonts[s] = (fonts[s] ? fonts[s] : 0) + 1;
    };
    var fa = [];
    for (var fs in fonts) {
      fa.push(fs);
    }
    fa.sort();
    for (var i = 0; i < fa.length; i++) {
      console.log(fa[i] + ' -> ' + fonts[fa[i]] + ' elements');
    }
  }
}
fontBuddy.listFonts();
