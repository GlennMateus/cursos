const minhaPromise = () =>
  new Promise((resolve, reject) => {
    return setTimeout(() => {
      resolve('OK');
    }, 2000);
  });

// minhaPromise().then(response => {
//   console.log(response);
// });

// Async/ await só funciona com funções que retornam Promise
async function executaPromise() {
  const response = await minhaPromise();

  console.log(response);
}

executaPromise();
