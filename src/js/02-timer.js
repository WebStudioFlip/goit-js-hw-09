import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let intervalId = null;
const btnStart = document.querySelector('button[data-start]')
btnStart.disabled = true;
let deadline = Date.now();
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minDate:new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
    onChange: function(selectedDates) {        
        if (selectedDates[0] > Date.now()) {
            deadline = selectedDates[0];
            btnStart.disabled = false;
            btnStart.textContent = "Start"
            if (intervalId){clearInterval(intervalId)
            intervalId=null}
        }
    },
  };

  flatpickr('#datetime-picker',options)

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

      function startTimer () {
        btnStart.textContent = "Stop"
          const rootSelector = document.querySelector('.timer')
            intervalId = setInterval(() => {
              const now = Date.now();
              const diff = deadline - now;
        
              if (diff <= 0) {
                stopTimer();
                return;
              }
        
              const { days, hours, minutes, seconds } = convertMs(diff);
        
              rootSelector.querySelector('span[data-days]').textContent = days;
              rootSelector.querySelector('span[data-hours]').textContent = addLeadingZero(hours);
              rootSelector.querySelector('span[data-minutes]').textContent = addLeadingZero(minutes);
              rootSelector.querySelector('span[data-seconds]').textContent = addLeadingZero(seconds);
        
              rootSelector.querySelector('span[data-days]').nextElementSibling.textContent = declensionNum(days, [
                'день',
                'дня',
                'дней',
              ]);
              rootSelector.querySelector('span[data-hours]').nextElementSibling.textContent = declensionNum(hours, [
                'час',
                'часа',
                'часов',
              ]);
              rootSelector.querySelector('span[data-minutes]').nextElementSibling.textContent = declensionNum(minutes, [
                'минута',
                'минуты',
                'минут',
              ]);
              rootSelector.querySelector('span[data-seconds]').nextElementSibling.textContent = declensionNum(seconds, [
                'секунда',
                'секунды',
                'секунд',
              ]);
            }, 1000);
          }
        
         function stopTimer() {
            clearInterval(intervalId);
            intervalId = null;
            btnStart.textContent = "Start"
            btnStart.disabled = true;
          }
        

  function addLeadingZero(value) {
        return String(value).padStart(2, 0);
      }

      function declensionNum (num, words) {
            return words[
              num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
            ];
          }
function onBtnStartClick () {
if (intervalId){
    stopTimer()
} else {
    startTimer ()
}
}

  btnStart.addEventListener('click', onBtnStartClick)