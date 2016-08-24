

function get_todos() {
  var todos = new Array;
  var todos_str = localStorage.getItem('todo');
  if(todos_str != null)
    todos = JSON.parse(todos_str);
  return todos;
}

function add() {

  var task = document.getElementById('task').value;

  if(task != "") {
    var todos = get_todos();
    var item = {work: task , complete : false};
    todos.push(item);
    localStorage.setItem('todo', JSON.stringify(todos));
  }
  else {
    alert("nothing to add");
  }
  show();

  return false;

}

function show() {
  var todos = get_todos();
  document.getElementById('task').value = '';
  var html = '<ul>';
  var complete_boxes = document.getElementsByClassName('complete');
  for (var i = 0; i < todos.length; i++) {
    html += '<li><input type = "checkbox" class = "complete" name = "complete" id ="'+ i +'">';
    if(todos[i].complete == true) {
        html += '<s>'+ todos[i].work + '</s>' ;
    }
    else {
        html += todos[i].work;
    }

    html += '&nbsp;<button class = "remove" id = "' + i + '"> Delete </button></li>';
  //  html += '&nbsp;&nbsp;<button class="complete" id="' + i + '"> Complete </button> </li>';

  }

  html += '</ul>';
  document.getElementById('todos').innerHTML = html;
  var del_buttons = document.getElementsByClassName('remove');
  for(var i = 0; i < del_buttons.length; i++) {
    del_buttons[i].addEventListener('click', remove);
  }
  var complete_boxes = document.getElementsByClassName('complete');
  for(var i = 0; i < complete_boxes.length; i++) {
      complete_boxes[i].checked = todos[i].complete;
      complete_boxes[i].addEventListener('click', complete);
  }
}

function remove() {
  var id = this.getAttribute('id');
  var todos = get_todos();
  todos.splice(id,1);
  localStorage.setItem('todo', JSON.stringify(todos));
  show();
  return false;

}

function complete() {
//  console.log('complete');
  var id = this.getAttribute('id');
  var todos = get_todos();
  var complete_boxes = document.getElementsByClassName('complete');
  todos[id].complete = !todos[id].complete;
  localStorage.setItem('todo', JSON.stringify(todos));
  show();
  return true;
}

function clear_all() {
  localStorage.removeItem('todo');
  show();

}

document.getElementById('add').addEventListener('click',add);
document.getElementById('reset').addEventListener('click',clear_all);
show();
