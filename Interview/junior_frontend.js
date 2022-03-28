/*
Вопросы на собеседовании:

HTML
1. Доступность в HTML/CSS 
2. Семантическая верстка: Какие теги используются?, для чего нужна?, плюсы и минусы?

CSS
1. Почему плохо писать все css стили в одном файле, или в inline стилях в HTML?
2. Разные подходы к стилизации css? Плюсы и минусы разных подходов
3. Что такое каскад из абравиатуры CSS (Каскадные таблицы стилей)?
4. Наследовании CSS (иерархия)?
5. Способы изоляции CSS?
6. Подходы по написанию CSS (БЭМ)?
7. Проблемы наследования стилей (Shadow DOM)?
8. Специфичность CSS?
9. Какой стиль из 2х классов приоритетней? Первый или второй?
10. Что такое схлопывание margin`s?
11. Что такое media запросы (адаптив)?
12. В чем разница между адаптивным дизайном и отзывачивым?

JavaScript:
1. Типы данных в JavaScript и их отличие? (Включая null, undefined, BigInt, Symbol)
2. На какие типы их можно поделить? (Примитивы и сложные типы) почему так называются?
3. Функция, это какой тип данных?(Объект) Почему такой тип?
4. Схожие параметры между array, function, object?
5. Операторы JavaScript и как они работаю?
6. Что будет если к number прибавить string?
7. Отличие var, let, const 
8. Что такое event loop? И как он работает?
9. Что такое замыкание? Определение и способы реализации (с примерами)
10. Что такое контекст? 
11. Что такое область видимости? Принцип работы? Как ведут себя внутри var, let, const?

Пример: Блокирование потока
for (var i = 1; i <= 10; i++) {
        function foo(x) {
            setTimeout(() => {
            console.log(i)
        }, 0)
    }
    foo(i)

    setTimeout(() => {
        console.log(i)
    }, 1000)
}
JavaScript выполняется в потоке. И для того чтобы он ждал какой-то отложенной операции он должен этот поток заблакировать. 
Что в данном примере блокирует этот поток? Все дело в замыкании дело в том что переменная i никуда не замкнулась. 
Она просто ссылается на внешнюю область видимости которая в цикле, в цикле она же изменяется
Если мы хотим чтобы переменная i равнялась тому чему мы хотим, последовательно от 1 до 10
Нам нужно их замкнуть, мы пишем другую функцию и в нее уже это передаем
Если мы передаем в вызов функции foo переменную i, все она замкнута у тебя ее будет брать из первой области видимости

12. Что такое ассинхронный код? Как она работает?
13. Что такое Web API? Что такое делигированние? Когда приминяется и зачем нужно?
14. Что такое событийная модель? Как работают события в браузере (синтаксис)? Какие есть события? Какие фазы событий есть?
15. Что такое фаза погружения? 

<div id="foo" onclick=""console.log('foo')">
    <div id="bar" onclick=""console.log('bar')">
        Clic me!
    </div>
</div>

Что в данном случае выведится в консоль?
- События имееют такое свойство как всплытие т.е то событие которое возникает на вложенном элементе оно всплывает вплоть до window
Даже если мы повесим событие на window click, там оно тоже сработает
Для того чтобы у нас всплытие не происходило мы используем stopPropagination(). Именно всплытие навер этих событий
Чтобы ограничить событие в рамках своего блока

document.getElementById('bar').addEventListener('click', function(event) {
    event.stopImmediatePropagation()
})
document.getElementById('bar').addEventListener('click', function(event) {
    event.stopPropagation()
})
В зависимости от того как мы объявили будет разный эффект
У нас есть 2 вида предотвращения события. 

Чтобы предотвратить уже на накинутые события. На 'bar' сейчас 2 события. Если мы вызовем stopImmediatePropagation(), то второй обработчик уже вызван не будет
Если мы вызовем просто stopPropagation(), то вызовется еще и второй. Но дальше событие уже вверх не пойдет 
Если этого ничего не будет вызванно, то в таком случае отработает еще один onclick

16. Какие есть циклы? Как они работают?
17. Две нотации while? В чем различие? Плюсы и минусы? Кейсы применения нотаций
18. Отличие while от for?
19. Что такое forEach? Что такое map? В чем разница?
20. Что такое reduce? Как работает? В каих случаях применяется?
21. Способы клонирования объектов? Методы объектов? Как использовать? В чем разница?

*/

/*

Комментарии / Ответы:

1. БЭМ решает проблемы каскадирования
2. CSS. Все что будет иметь одинаковую специфичность и будет объявленно последним, будет иметь больший вес
3. Уровень спицифичности #id нельзя перебить добавлением специфичности классам
4. Определение специфичности идет справа налево
5. Двойное равно сравнивает с приведением типов 
6. У var функциональная область видимости, а у let блочная 
7. Если объявить var в блочной области видимости, то мы можем получить доступ к var из вне
8. Замыкание это когда переменная существует внутри функции
9. У примитивов данные передаются по значению
10. Погружение - события идут с верхнего элемента вниз
11. В чем разница префиксной и постфиксной записи?
    - Сначала увеличивает счетчик и его возвращает
    - Сначала возвращает текущий счетчик, а потом его увеличивает
12. forEach - его не любят разработчики. Он позволяет мутировать исходное значение массива
    - Когда мы продвигаемся по каждому элементу мы его можем мутировать. Ничего не возвращает, только мутирует
13. Map - возвращает новый массив. Значение придется куда-то положить
14. Ключевая разница что для for нжуно сделать большое кол-во действий в качестве подговтовки. 
    - Если помимо цикло еще что-то сделать он начнет разрастаться и станет не очень удобным
    - Map это более удобное компактное решение в упрошенном варианте
    - Цикл for мы можем использовать если есть критические вещи по производительности
Когда нужно что-то максимально производительно выполнять над объектами
    - Методы каждый раз заново проходятся по массиву, когда пишешь map, это один проход, filter - еще проход
Когда ты пишешь цикл ты можешь это сделать за одни проход. Это критично для каких нибудь алгоритмоф




*/