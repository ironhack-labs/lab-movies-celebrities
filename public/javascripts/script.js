document.addEventListener(
  "DOMContentLoaded",
  () => {
    setCurrentPg();
  },
  false
);

function setCurrentPg(){
  let ele = 'navbar-brand'; //placeholder
  const onPage = window.location.pathname;
  if(onPage.includes('movie')){
    if(onPage.includes('create')){
      document.getElementById('nav-drop').classList.toggle('active');
      ele = 'nav-drop-movie';
    }else
      ele = 'nav-movie';
  }else if(onPage.includes('celeb')){
    if(onPage.includes('create')){
      document.getElementById('nav-drop').classList.toggle('active');
      ele = 'nav-drop-celeb';
    }else
      ele = 'nav-celeb';
  }else{
      ele = 'nav-home';
  }
  document.getElementById(ele).classList.toggle('active');
  document.getElementById(ele).innerHTML += `<span class="sr-only">(current)</span>`;
  return true;
}