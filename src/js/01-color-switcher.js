function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
console.log(document.querySelector('button[data-start]'))
const btnStart =document.querySelector('button[data-start]');
  const btnStop =document.querySelector('button[data-stop]');
  btnStop.disabled = true;
 let intervalId=null;
  const changeColorBody = function (){
    btnStop.disabled = false;
    btnStart.disabled = true;
     intervalId =  setInterval(()=> {
         document.body.style.backgroundColor = getRandomHexColor()
     }, 1000);
  };

  btnStart.addEventListener('click',changeColorBody);
  btnStop.addEventListener('click',()=>{clearInterval(intervalId)
    btnStop.disabled = true;
    btnStart.disabled = false;
});
