// ----- REST - pega o resto das propriedades
// Em objetos normais
const usuario = {
nome: 'Glenn',
idade: 23,
empresa: 'Bonnjur'
};

const { nome, ...resto } = usuario;

console.log(nome);
console.log(resto);
// Em arrays
const arr = [1, 2, 3, 4];

const [a, b, ...c] = arr;

console.log(a);
console.log(b);
console.log(c);

// Em parâmetros de funções
function soma(...params) {
return params.reduce((total, next) => total + next);
}

console.log(soma(1, 3, 4));
// ----- REST - FIM -----

// ----- SPREAD - Propaga/ repassa as informações de uma estrutura de dados para outra estrutura
// Em arrays
const arr1 = [1, 2, 3, 4];
const arr2 = [5, 6, 7, 8];

const arr3 = [...arr1, ...arr2];
console.log('arr3: ', arr3);

// Em objetos
const usuario1 = {
nome: 'Glenn',
idade: 23
};
const usuario2 = {
...usuario1,
nome: 'Mateus',
empresa: 'Bonnjur'
};

console.log(usuario2);
// ----- SPREAD - FIM -----
