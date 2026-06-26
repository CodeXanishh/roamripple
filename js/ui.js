
const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>30){

navbar.classList.add("scrolled");

}else{

navbar.classList.remove("scrolled");

}

});
const toggle=document.querySelector(".menu-toggle");
const links=document.querySelector(".nav-links");

toggle.addEventListener("click",()=>{

links.classList.toggle("active");

});