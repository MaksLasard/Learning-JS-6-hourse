/*
Заметки с практических курсов: 

addInput = addForm.querySelector('.adding__input') - мы ищем input внутри формы addForm
checkbox = addForm.querySelector('[type="checkbox"]') - поиск элемента по атрибутам HTML

Событие submit - позволяет отслеживать событе "отправка формы"
const newFil = addInput.value - получение значения input которое ввел пользователь
const favorite = checkbox.checked - событе true или false отслеживает включение чекбокса

Чтобы уйти от жесткой привязки к какому-то элементу и сделать функцию более гибкой, нужно заменить элемент на аргумент
Передать жестко привязанный элемент в качестве параметра в вызове функции

Некоторые программисты переносят вызовы функций в конец файла

event.target.reset() - сбрасывает форму 





*/