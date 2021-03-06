//Приложение 1: Пробный запуск кода и первого приложения

// fs = require('fs'); // Мы загружаем модуль который будет доступенн в переменной fs

// const data = fs.readFileSync('./data.txt'); // Это специальная команда для чтения файлов синхронное. Блокирует поток
// console.log(data.toString());

//Приложение 2: CommonJS Modules
// В реальном проекте всегда возвращай результат , а не меняй внутри функции

// const { characters, stealRing } = require('./characters.js');

/*const a = 1;
if(a > 0) {
    const log = require('./characters.js');
    log();
} else {
    console.log('Меньше на 0');
}*/

// Если мы require получаем какую-то переменную она в этом scoup ведет себя как константа. Мы не можем модифицировать саму переменную
// let myChars = characters;
// myChars = stealRing(myChars, 'Фродо');

// for (const c of characters) {
//  console.log(c)
//}

// module.exports = { a }

//Приложение 3: ES Modules

// import { characters, greet} from './characters.mjs';

/* for(const c of characters) {
    greet(c)
}; 
*/

/*import * as char from './characters.mjs';

for(const c of char.characters) {
    char.greet(c)
};
*/

/*async function main() {
    const { characters, greet } = await import('./characters.mjs')
    for ( const c of characters) {
        greet(c)
    }
}
main(); - ассинхронный импорт модуль
*/

// Events

// Event Emitter - нужен для того чтобы обмениваться событиями между частями нашей системы
// С одной стороны мы можем подписаться на какое-то событие. С другой стороны его генерировать
// В случае генерации - передавать какие-то данные которые мы можем обрабатывать в нашем обработчике этого события 

// Чем Event Emitter - отличается от Event Target?

/*
Event Emitter:
- Берется из модуля Events - Берется из стандартной библиотеки Events которая у нас есть в Node.js
- Несколько listener на 1 событие 
- Эмулирует почти всю EE API
- Обработка ошибок через error - позволяет обрабатывать ошибки через специальное событие error
- Встроенные события add/ remove listeners
*/

/*
Event Target:
- Глобальная переменная
- Только 1 listener для события - если мы добавим 2 он его проигнорирует , но ошибки не будет
- Частичная эмуляция
- Нет обработки через error
- Нет событий добавления и удаления обработчиков
*/

// Если вы захотите работать с Event Emitter в Node.js, то в данном случае нужно использовать только Event Emitter и не использовать Event Target

// Как нам получить EventEmmiter? Мы получаем его из стандартной библиотеки Events

/*
const EventEmmiter = require('events');

Теперь мы можем создать свой EventEmmiter, с помощью конструктора куда мы будем отправлять и подписываться на событие 

const myEventEmmiter = new EventEmmiter();

Теперь мы сделаем простую функцию которая будет выводить ну скажем мы будем кидать событие connecting. Будем имулировать что это база данных
У нас есть eventListener который слушает событие connected и в результате нам выводить dataBase connected

const logDbConnection = () => {
    console.log('DB connected')
};

myEventEmmiter.addListener('connected')
Может иметь следующие слойства. 
Внутрь мы передаем информацию на какое событие мы подписываемся и что мы должны делать в результате этого выполнения
1. Событие будет connected
2. В результате мы выполним функцию logDbConnection
Тем самым мы подписались на это событие. У нас будет подписка которая будет каждый раз тригеррится 

Где находятся подписки мы будем смотреть когда будем изучать архитектуру Node.js

Теперь мы сгенерим событие и посмотрим что у нас в результате произошел console.log(). Фактически наша база подключилась
Мы должны эммитеть в тотже Emmiter на которы мы подписались

myEventEmmiter.emit
- Используем функцию emit('connected') - которая говорит что мы можем передать событие, а дальше неограниченное число аргументов. Это дополнительные аргументы в функцию
- Событие называется connected - и в результате ожидаем что когда мы запустим наш скрипт у нас выведется console.log('DB connected')
- Потому что сгенерится событие, подписчик logDbConnection его получит

Иногда у нас возникает необходимость удалить connection. 
- К примеру: Мы перезапустили какую-то часть нашего приложения
- Утечка eventListener - одна из частых проблем которую можно встретить в приложении

// WayUp обучение Node.js

// Все начинаеться с npm init - первое действие. И написать название. 
// Далее ввод информации для проекта

// Лайфхак. Копируешь файл package.json в новый пустой проект. Нажимаешь npm i и устанавливаются все зависимости с предыдущего проекта

Помимо addListener у нас есть removeListener


/*
Устройство Node.js

Концепция неблокирующий ввод и вывод
- У нас есть один основной поток. Этот поток никогда не будет блокироваться вводом и выводом
- Сервер будет продолжнать обслуживать запросы. 
- Мы должны уметь работать с ассинхронным кодом 

Схема работы:
- У нас есть запросы и есть один основной поток 
Если нам нужно что-то сделать тяжелое, запрос направляется в Worker Theards (Дополнительные потоки внутри основного)
Они будут созданны под какие-то сложные дорогостоящие операции. Например: криптография, чтение из файлов и т.д

Болле детальное рассмотрение схемы, как она реализуется в Node.js и из каких компонентов она состоит. 
- Во первых есть такое понятие Стека и Кучи
Куча - это фактически хранение в памяти каких-то наших переменных 
Стек - это стек вызовов фунций

Node.js - он не однопоточный как многие могут говорить. Он производителен за счет того есть основной поток и огромное кол-во дополнительных потоков внутри
Которые создаеются под разные задачи

- Node.js популярна за счет того что мы имеем JS который можем писать и на Frontend и на Backend
- Это неплохая производительность которая достигается за счет набора библиотек

Состовляющие Node.js приложения:

- Одним из ключевыъ компонентов является движок V8
Это движок которые обрабатывает JS. Это виртуальная машина JS

- Libuv
Реализует концепцию Event Loop, выделение Theards pool, и ассинхронный ввод/вывод

- Дополнительные библиотеки:
C-areas, zlib, http_parser, open_ssl

- Стандартная библиотека
Это работа с файловой системой, криптография и т.д

- Дополнительные С/С++ библиотеки написанные для Node.js
Поэтому есть Node.js bindings которые позволяют нам вызовы JS преорпзовывать в вызовы библиотек на С++
Например если мы хотим сконвертировать изображение

- Node.js API


Обработка запросов в рамках Node.js:
- Нам приходит запрос, мы его обрабатываем и наш JS V8

- Дальше у нас есть Node bindings которые позволяют преобрзовать наш код к некоторым Events
Например к нам пришел Http запрос который нам нужно обработать 
В рамках этой очереди у нас есть Event Loop, который фактически крутится и обслуживает все

- Event Loop берет какае-то событие которое к нам пришло из очереди и говорит "Ок, нам нужно что-то сделать!"

- Дальше он это отправляет в Call Stack (Стек вызовов)
В нем начинает выполнять наш JS код на движке V8
Если Call Stack встречает что-то что требует производительности, тяжелые операции, чтение файлов он отправляет их в Worker Threads

Worker Threads - это те отдельные воркеры (отдельные потоки) которые обслуживают тяжелые операции
Как только воркер завершил работу он возвращает callback который нам был передан вместе с этим воркером обратно в очередь
Event Loop продалжает крутится и снова получает из очереди уже возврат

Если в результате мы все сделали вернули запрос Event Loop вернет нам эти данные обратно и нам придет ответ

По сути Event Loop это просто цикл который имеет наборы фаз, который забирает из очереди какие-то события
Отправляет их на выполнение. Если операция тяжелая, то выполнение будет делегировано отдельным потокам 
Дальше после этого произойдет возврат обратно в очередь. 
После чего Event Loop снова получит результат, выполнит callback и тд

В результате в нашем потоке будет выполняться в основном то, что будет попадать в CallStack (что-то легкое) - это основной поток

Крайне важно когда мы разрабатываем приложение на Node.js этот поток не блокировать 


Как устроен Event Loop. И из каких фаз он состоит
- таймеры - callback от запланированных таймеров
- pending callbacks - callback от системных операций 
- idle, prepare - внутреннее использование 
- poll - расчет времени и обработка событий ввода и вывода(|/0)
- chekc - обработка setImmediate (Вызов какой-то функции которая должна быть вызвани именно в эту фазу)
- close callback - вызов событий 'close', например сокеты

process.nextTick()
other microtaskQueue

Как выглядит Event Loop?
- Первое это инициализация. Т.е у нас все import, require - все чтобы запустить наш проект
И мы начинаем выполнять наш синхронный код фиксируя все callback которые зарегистрированы
Далее мы попадаем в этим фазы. При этом между каждой фазой мы проверяем наши Promise 

Как только мы прошли 6 фаз мы попадаем какбы в проверку окончания работы приложения 
Можем ли мы окончить работу или нет

В данном случае если у нас Event Loop не имеет никаких запланированных таймеров
У нас не ожидается никаких системных вызовов которых мы ждем 
В данном случае у нас процесс может быть просто завершен

Если у нас есть что-то подобное, то мы идем на следующий цикл

Где в этом процессе синхронный код и блокировка?
- Представим что в рамках какой-то фазы у нас запланированна очень тяжелая операция 
Как только мы войдем в эту фазу у нас будет длительное выполнение js и event loop приостановится
И чем больше у нас таких операций в рамках Event Loop тем время прохождения полного цикла больше

Поэтому важно его измерять и понимать как мы можем повлиять на эту ситуацию
И соответственно не использование тяжелых операций в рамках нашего кода

Регистрируя события Event Loop проходит по различным фазам. И каждый регистрируемый код поподает в отдельную фазу
По которой по очереди проходит Event Loop и если попадается тяжелая операция для нее выделяется дополнительный поток
Это принцип неблокирующий ввод и вывод. Проходит по каждой фазе и вызывает фунции, если у функция еще не готова, пропускает и идет дальше
Выполняя другие события. Как только все оставльные события закончились, происходит проверка на окончание и если все выполнилось цикл прекращается 
Но событие которое не отработало заставляет Event Loop сделать еще цикл чтобы выполнить setTimeout из фазы таймеры

Примеры: 

const fs = require('fs')

fs.readFile(__filename, () => {
    console.log('File readed...')
})

Принимает 1 параметром имя 
__filename - глобальная переменная которая дает имя текущего файла и путь до него
2 параметром callback

Когда мы используем какие-то ресурсоемкие опреции цикл блокируется. Если это основной поток
Если мы используем тяжелые JS расчеты их нужно выносить каким-то образом. Такими вещами мы легко можем заблокировать наш процесс

Promise.resolve().then(() => {
    console.log(Promise)
})

Промис которой сразу будет резолвится у него нет времени ожидания, он выполняется сразу
Promise и nextTick они происходят между каждой из наших фаз. Мы можем влезать между фазами
Это хорошо т.к нам не нужно ждать полный цикл, чтобы выполнить наши Promise

process.nextTick(() => consoele.log('tick'))

Сначала выполняется nextTick, а потом Promise 

















































*/ 



















