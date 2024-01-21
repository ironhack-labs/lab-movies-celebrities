document.addEventListener("DOMContentLoaded",() => {

  const imgBtn =  document.getElementById("image-edit-btn");

  imgBtn.onclick = function(){
    document.getElementById("update-img-div").style.display = "none";
    document.getElementById("input-img").style.visibility = "visible";
  }

});
