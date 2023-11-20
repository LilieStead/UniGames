function toggleMenu() {
  var arrow = document.getElementById("menuarrow")
    var menu = document.getElementById("hamburgerMenu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
    if (menu.style.display === "none"){
      arrow.innerHTML = ("null");
      arrow.innerHTML = ('<i class="fa fa-caret-down" aria-hidden="true"></i>');
    }else {
      arrow.innerHTML = ("null");
      arrow.innerHTML = ('<i class="fa fa-caret-up" aria-hidden="true"></i>');
    }
  }
  