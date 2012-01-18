// javascript:(function(){document.body.appendChild(document.createElement('script')).setAttribute('src','http://cloud.github.com/downloads/eip/js/vkwallclear.js')})();
myWall = {
  curId : 0,
  maxId : 0,
  delay : 0.2,
  btns : [],
  addControls : function()
  {
    var submitPostBox = document.getElementById('submit_post_box');
    var box = submitPostBox.insertBefore(document.createElement('div'), submitPostBox.getElementsByTagName('div')[0]);
    box.setAttribute('class', 'clear_fix');
    box.setAttribute('style', 'padding-bottom: 8px; verical-align: middle;');
    //Fields
    var elm = box.appendChild(document.createElement('span'));
    elm.appendChild(document.createTextNode('Оставить первые '));
    elm = box.appendChild(document.createElement('input'));
    elm.size = 1;
    elm.value = '1';
    elm.setAttribute('id', 'leave_first');
    elm.setAttribute('type', 'text');
    elm.setAttribute('class', 'text');
    elm = box.appendChild(document.createElement('span'));
    elm.appendChild(document.createTextNode(' и последние '));
    elm = box.appendChild(document.createElement('input'));
    elm.size = 1;
    elm.value = '1';
    elm.setAttribute('id', 'leave_last');
    elm.setAttribute('type', 'text');
    elm.setAttribute('class', 'text');
    //Clear Wall Button
    elm = box.appendChild(document.createElement('div'));
    elm.setAttribute('class', 'button_blue fl_r');
    elm = elm.appendChild(document.createElement('button'));
    elm.setAttribute('id', 'clear_wall');
    elm.setAttribute('onclick', 'myWall.clear()')
    elm.appendChild(document.createTextNode('Очистить стену'));
  }, 
  delPost : function() {
    var btn = myWall.btns[myWall.curId];
    console.log(btn.id);
    btn.getElementsByTagName("div")[0].onclick();
    myWall.curId++;
    if (myWall.curId < myWall.maxId)
      setTimeout(myWall.delPost, myWall.delay * 1000);
  },
  clear : function(leaveBeg, leaveEnd) {
    myWall.curId += parseInt(document.getElementById('leave_first').value);
    myWall.btns = document.getElementsByClassName("delete_post");
    myWall.maxId = myWall.btns.length - parseInt(document.getElementById('leave_last').value);
    if (myWall.curId < myWall.maxId)
      setTimeout(myWall.delPost, myWall.delay * 1000);
  }
}
myWall.addControls();