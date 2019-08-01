const content = document.querySelector('.content');

const people = ['mario', 'luigi', 'yoshi'];

people.forEach(person => {
    content.innerHTML += `<p>${person} </p>`;
});
