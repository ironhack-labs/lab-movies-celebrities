document.addEventListener(
  "DOMContentLoaded",
  () => {

    const curPage = window.location.pathname;
    if(curPage.substring(1,12) == 'celebrities'){
      document.querySelector("#nav-celeb").classList.toggle('active');
    }else if(curPage.substring(1,7) == 'movies'){
      document.querySelector("#nav-movie").classList.toggle('active');
    }else if(curPage == '/' ){
      document.querySelector("#nav-home").classList.toggle('active');
    }
  
  },
  false


);
