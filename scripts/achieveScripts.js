var acc = document.getElementsByClassName("achieveBoxes");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
// You must edit this javascript to somehow have an event listener to the button ".achieveBoxes" when gets clicked
// So it doesnt have to be at the bottom of the page.
// The current system does not work if you put the script at the top of the page because it gets loaded first.
