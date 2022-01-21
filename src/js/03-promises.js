import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  const firstDelay = document.querySelector("input[name='delay']").value;
  const stepDelay = document.querySelector("input[name='step']").value;
  const amount = document.querySelector("input[name='amount']").value;

  for (let index = 1; index <= amount; index++) {    
    createPromise(index, Number(firstDelay) + Number(stepDelay) * index)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
formEl.addEventListener('submit', onFormSubmit);
