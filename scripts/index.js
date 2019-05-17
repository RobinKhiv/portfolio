function openNavBar() {
  document.getElementById('navbar-anchors-mobile').classList.toggle('active');
}
window.onclick = function(event) {
  if (!event.target.matches('.fa-bars')) {
    var dropdowns = document.getElementsByClassName('dropdown');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('active')) {
        openDropdown.classList.remove('active');
      }
    }
  }
};