// Что такое Prototype в JavaScript

const person = {
    name: 'Maksim',
    age: 25,
    greet: function() {
        console.log('Greet!!!')
    }
}
// В консоле мы попытаемся вызвать функцию sayHello(). Получиться ошибка, т.к у объекта нет такой функции (мы ее не определили)
// Если в консоле мы вызовем метод toString(). То ошибки не возникнет. Мы получаем значение [object Object] - который по сути является строкой

// Почему на функцию sayHello() у нас выдается ошибка, но когда мы вызываем метод toString() мы получаем кокое-то значение и никакой ошибки нет
// Так работают прототипы

// Учитывая то что у объекта нет функции sayHello() мы получили ошибку, но у Prototype есть функция toString() мы получили некоторое значение
// Так же по мимо своих свойств в объекта персон есть свойство __proto__: Object
// __proto__: Object - это специальное свойство которое является ссылкой на prototype объекта
// ....: Object - это название некоторого родительского класса, которой является родителем для этого объекта

// Если мы откроем свойство __proto__: Object, то увидим большое кол-во методов где мы увидим метод toString()
// Когда мы вызывали метод toStirng() мы сначало смотрели на верхнем уровне данный объект, если мы его не находили мы шли в prototype и находили данный метод

const person1 = new Object ({ // Мы создаем объект person от класса объект
    name: 'Maksim',
    age: 25,
    greet: function() {
        console.log('Greet!!!')
    }
})
// Мы можем переписать объет немного иначе и конструктор данного объекта можем передать те свойства которые определяли ранее
/*
Мы создаем переменную person от класса Object. И поэтому когда мы передаем какие-то параметры. 
Помимо параметров к нам в объект попадает еще и прототип самого главного класса в JS, т.е объекта
И он несет в себе другие поля которые мы можем использовать

Прототип - это тот же самый объект, но который присутствует у коких-то родительских сущностей
Что мы можем с этим сделать?

1. Допустим мы можем обратится к глобальному классу object и обратится к его свойству которое называется prototype

Object.proyotype.sayHello = function () {
    console.log('Hello!!!!')
}

И в этом прототипе мы можем создавать какие-либо новые поля. Например создадим функцию sayHello

Ранее мы создавали объет person, но у него нет функции sayHello
Далее мы обращаемся к прототипу класса Object.prototype от которого мы создаем данный объект и задаем ему новую функцию

С помощью конструкции мы расширили прототип класса object и добавили его в новый метод. 
После чего он стал доступен для того объета который мы создаем 

Прототип - это определенный объект который присутсвует у родительских элементов с помощью него мы можем носледоваться от разных объектов и иметь доступ к более расширеным функциям

const lena = Object.create(person)

Метод сreate() с помощью которыъ мы создаем новые объекты
В метод create() мы можем передать какой-то объект который будет являтся прототипом объекта lena

В данном случае у объекта lena будут доступны все свойства которые есть у объекта person
Т.к объект lean не имеет своих свойств у нее есть prototype которым является объект person 

Прототип объекта lena теперь имеет 2 уровня доступа до прототипа
1 уровень - это прототип объекта person: const lena = Object.create(person)
2 уровень - это расширение протопипа объекта person: 
Object.proyotype.sayHello = function () {
    console.log('Hello!!!!')
}
Тем самым lena имеет также доступ к фунции sayHello 

Как работает прототип?
Он идет сверху вниз. Если он на верхнем уровне находит какое-то поле или какую-то функцию то сразу же ее вызывает. 
Но если он ничего не находит, он обращается к прототипу и пытается найти что-то в нем. 
Если же и в этом прототипе ничего нет, он идет дальше по цепочке прототипов и находит тот метод который он должен вызвать
Но если же он ничего не находит в прототипе, то тогда выдает ошибку

const str = 'I am sring'
*/

/*
Что такое контекст this. Как работает call, bind, apply

function hello() {
    console.log('Hello', this) // Результат: Hello, window
}
Мы заведем функцию hello. Она будет выводить в консоле сообщение, а вторым параметром мы будем сдесь выводить специальное ключевое слово this
Который указывает на текущий контекст

Мы получаем строку и глобальный объект window. 

const person = {
    name: 'Maksim',
    age: 22,
    sayHello: hello
}
person.sayHello(): Hello, {name: 'Maksim', age: 22, sayHello: f}

Когда мы вызваем sayHello и просто hello мы всегда выводим в консоль ключевое слово this
Оно указывает на тот объект в контексте которого это было вызванно 

Ключевое слово this оно всегда динамичное и указывает на тот объект в контексте которого оно было вызванно

Взаимодействие с контекстом: 
- Предположим что мы хотим создать еще одну функцию внутри объекта person, но которая также будет ссылаться на фунцию hello
Но мы хотим чтобы контекст там был именно глобального объекта Window, а не самого объекта person

Мы заведем функцию sayHelloWindow:
const person = {
    name: 'Maksim',
    age: 22,
    sayHello: hello,
    sayHelloWindow: hello.bind(window) - привязка определенного контекста функции
    logInfo: function (job, phone) {
        console.group(`${this.name} info: `)
        console.log(`Name is ${this.name}`) - используется this чтобы сделать более универсальный код
        console.log(`Name is ${this.age}`)
        console.log(`Job is ${job}`)
        console.log(`Phone is ${phone}`)
        console.groupEnd()
    }
}
И также как референс передам ссылку на функцию hello. Но если мы оставим все в таком виде, то все равно контекст будет объекта person

Чтобы передавать какой либо контекст и вызывать функцию с нужным указанным контекстом мы можем воспользоваться встроенными методами
Которые есть у функций в JavaScript. Hello является функцией у которой есть свои методы 

У функции hello мы можем вызвать специальный метод .bind() и в качестве значения данной фунции мы можем передать тот контекст который будет привязан к этой функции
Например глобальный объект window
Мы можем передавать любой контекст который нужен. 

Как мы можем это использовать в своих целях?
- Предположим у объекта person мы заведем другую функцию которую назовем logInfo которая будем выводить в консоль сообщение с информацией об объекте
Мы используем обратные ковычки в которые мы можем динамически передавать параметры

this - указывает на контекст объекта person

const lena = {
    name: 'Elena',
    age: 23
}
У объекта lena нет функции logInfo. Можем ли мы воспользоваться фунцией logInfo чтобы вывести значене не объекта person, а значение объекта lena
person.logInfo.bind(lena)()

Мы берем объект person обращаемся к функции logInfo
Чтобы передаавть нужный контекст который мы указываем сами. У фунции logInfo мы можем вызвать метод .bind() куда пердадим поле lena

Метод bind не вызывает функцию, а возвращает новую которая уже привязала себе новый контекст
Поэтому мы можем сразу вызвать эту функцию person.logInfo.bind(lena)()

Мы воспользовались функцией logInfo, но в него мы передали другой контекст
Когда мы вызываем эту фунцию ключевое слово this указывает на контекст того объекта который мы передавали 

person.logInfo.bind(lena)()

Усложненный вариант:

- Мы можем воспользоваться объектом console.group()
Внутрь мы передаем строку которая будет являтся заголовком данной группы

console.group(`${this.name} info: `)

- После всех консоль логов нам нужно закрыть группу
console.groupEnd()

Например мы хотим передавать в функцию дополнительные параметры console.log(`Job is ${job}`)
- Здель мы уже не указываем this т.к этот параметр мы передаем в функцию 

Если мы оставим все в таком виде мы получив в новые параметры переданные в функцию значение undefined
Чтобы все заработало нужно передать значение этих параметров в person.logInfo.bind(lena)('Frontend', 'Iphone')

Можно сделать и таким образом 

const fnLena = person.logInfo.bind(lena)()
fnLean('Frontend', 'Iphone')

С помощью метода bind мы можем сделать немного иначе
- Помимо того что первым параметром мы указываем контекст который привязан к новой функции
- Следующими параметрами мы можем передавать следующие параметры которые нужны для функции через запятую

const fnLena = person.logInfo.bind(lena, 'Frontend', 'Iphone' )()
fnLean()

И дальше мы вызываем функцию без параметров 


Метод call:
- служит для таких же целей как bind, но у него есть отличие 

const fnLena = person.logInfo.call(lena, 'Frontend', 'Iphone')

Мы также вызываем функцию logInfo и в него мы хотим передать контекст объекта лена
Принимает в себя теже параметры что и метод bind

Отличие что метод call мы уже не вызываем как функцию
Метод call помимо того что он задает определенный контекст функции и параметры и он сразу же вызывает эту функцию
Метод bind он возвращает новую функцию и мы можем ее вызвать когда удобно. Метод call вызывает ее сразу
Можем передавать бесконечное число параметров 

Метод apply: 

const fnLena = person.logInfo.apply(lena, ['Frontend', 'Iphone'])

Первым параметром мы также передаем объект который должен являтся контекстом. Дальше есть отличие отметода call
В метод apply мы всегда передаем 2 параметра 

Если мы хотим передать параметры мы должны их указать в массиве 
Второй параметр всегда массив из аргументов которые попадут в эту функцию

Метод call и apply отличаются только одним способом передачи параметров в функцию

Практика с прототипами и контекстом:

Комбинирование this и prototype

Задача: Написать такую функцию которая позволит умножить каждое значение массива на определнное число которое мы будем передавать

Пример:
const array = [1, 2, 3, 4, 5]

function multBy(arr, n) {
    return arr.map(function (i) {
        return i * n
    })
}
console.log(multBy(array, 5))
Мы создаем функцию мы будем передавать число (n) и чтобы изменить массив мы будем передавать (arr)
Мы будем возвращать данный массив пробегаться по нему с помощью метода map где на каждой итерации мы будем вызывать функцию
Функция будет принимать каждый отдельный элемент данного массива 
И мы будем просто возвращать данных элемент массива умноженный на число n 

Вызываем функцию multBy() в нее передаем некоторый массив и число на которое мы хоти умножить каждый элемент

Но это не самый удобный вариант в некоторых случаях т.к данную функцию нужно будет импортировать всегда для того чтобы вызвать ее
Всегда нужно будет передавать некоторый массив и т.д 

Часто на собеседованиях спрашивают: Как сделать так чтобы у этого массива сразу же был метод который сразу позволяет сделать подобный функционал
Как раз для этого мы можем пользоваться прототипами

Array.prototype.myltBy = function (n) {
    return arr.map(function (i) {
        return i * n
    })
    console.log('myltBy', this)
}
array.myltBy(2)

Мы обрптимся к глобальному объекту Array который является родительским классом для данного объекта/масива 
Дальше мы обратимся к его прототипу. И после этого мы можем создавать сдесь какие-то новые функции. Например функцию multBy
Данная функция также будет принимать в себя некоторое число. И по сути нам нужно повторить функционал который мы делали ранее

Как нам определить к какому именно массиву нам это применить?

Для этого мы будем пользоваться ключевым словом this
Теперь нам нужно немного переписать вызов функии
Учитывая то что мы расширили прототип массивом мы можем обратится к нашему массиву вызвать у него метод multBy с значением 2

В результате мы получим сообщение myltBy и дальше тотже самым массив у которого мы делали вызов 2 

myltBy => (5) [1, 2, 3, 4, 5]

По сути ключевое слово this и является этим массивов у которого мы вызываем этот метод 
Дальше мы можем повторить функционал

И вместо того чтобы возвращать некоторый массив arr мы просто обращаемся к ключевому слову this
Потому что это ключевое слово указывает на тот объект который находится слева от точки array.myltBy(2)

Теперь для того чтобы изменять элементы каждого массива (даже нового) нам не нужно вызывать отдельную функцию 
Например мы создадим массив чисел и вызовем у него метод myltBy(4) с значением 

[5, 6, 9].myltBy(4)

Мы сразу видим кокай результат получаем. Мы каждый раз не создаем новую функцию, она сразу же доступна у объекта
Таким образом мы можем расширять объекты ошибок, строк , promes и чего угодно всех классов которые у нас есть
*/


/*
Что такое замыканя. Как они работают:
- По сути это просто функция внутри другой функции 

function createCalcFunction(n) {
    return function() {
        console.log(1000 * n)
    }
}
const calc = createCalcFunction(42)
calc()

Это функция нам будет возвращать другую функцию. Также функция будет принимать n
В результате вызова функии createCalcFunction(42) мы ничего не получим. Потому что она нам возвращает новую функцию
Поэтому мы можем занести ее в отдельную переменную calc которая является функцией которую мы получаем из другой функции
Функцию calc мы вызываем без параметров 

Как это работаем?

Когда мы вызывали функцию createCalcFunction и мы передавали в нее чило 42, то функция createCalcFunction отработала и вернула нам новую функцию
Но учитывая что данная функция была вызвана в контексте функции createCalcFunction переменная n она какбы была замкнута в той функции которую мы возвращаем
И поэтому всегда когда мы вызываем функцию calc в ней уже хранится значение n. Т.е функция ее замкнула
Поэтому это и называется замыканием. Мы получаем определенный доступ до scoup верхней функции

function createIncrementor(n) { - основная задача кода в JS это прописать логику работы
    return function(num) {
        return n + num
    }
}

const addOne = createIncrementor(1)
const addTen = createIncrementor(10)

console.log(addOne(10)) || 11
console.log(addOne(41)) || 42

console.log(addTen(10)) || 20
console.log(addTen(41)) || 51

Данная функция будет у нас работать по данному принципу
Она будет нам возвращать новую функцию. Которая в свою очередь будет нам возвращать сумму двух чисел
Например параметр n который мы будем передавать в верхнюю функцию и какого-то значения которое мы будем передавть в вторую фукцию
Мы создадим функцию addOne и она у нас будет являтся определенной функцией потому что мы будем ее получать из функции createIncrementor

И допустим переменную n мы хотим замкнуть на значении 1
В консоле мы будем выводить функцию addOne и в нее мы можем передавать какое-то новое значение 
И это значение будет совпадать с переменной num например 10

Потому что функция addOne она замкнула в себе значение 1. И постоянно прибовляет 1
Теперь мы можем создать ещё одну функцию addTen в которое будем передавть значение 10. Теперь повторим логику с теми же самыми значениями

Но учитывая что в ней мы (addTen) замкнули значение 10, то ка результат мы получим соответствующие значения 20 и 51 
Потому что теперь функция addTen добавляет всегда 10

Посути мы всегда пользуемя одной главной функцией которой мы замыкаем определенное значение 
На выходе мы получаем другую функцию которая уже может работать с другими параметрами

Пример:

function urlGeneration(domain) {
    return function(url) {
        return `https://${url}.${domain}`
    }
}

const comUrl = urlGeneration('com')
console.log(comUrl('google'))

Мы создадим функцию которая будет нам возвращать другую фукнцию. 
Которая в свою очередь будет возвращать строчку

Мы будем добавлять протокол https:// после этого мы хотим добавлять называние ссылки которую мы хотим сгенерировать
И через точку мы хотим добавлять какое-то доменное имя. Принимать каждый раз статически не хочется поэтому мы будем принимать параметр domain

Как этим пользоваться? По сути так же 

Практический пример задания с собеседования:

function bind(context, fn) {
    return function(...args) {
        fn.apply(context, args)
    }
}

Мы заведем функию bind. Первым параметром функция принимает некоторый контекст который нам необходимо привязать, а вторым некоторую функцию
И дальше для того чтобы это все работало нам необходимо вернуть новую функцию 
У функции fn мы будем вызывать метод apply в которую первым параметром мы будем передавать контекст
А вторым передаем массив параметров 

Чтобы наша функция bind была универсальной и мы могли в нее передавать любое кол-во параметров от нуля до n - ого числа
Нам нужно каким-то образом определить как эти параметры передаются и для этого мы используем apply потому что мы передаем в него массив параметров
И массив мы можем получить в внутренней функции передадим с помощью оператора spread массив ...args
Он является массивом и в него попадают все необходимые параметры которые будут перемещенны в данную функцию


Ассинхронность. Что такое Event Loop?

Начнем с того что заведем какую нибудь синхронную операцию которая будет выполнятся в процессе выполнения кода
Как нам сделать так чтобы console.log() выводился асинхронно например через какое-то время
Для этого в браузере есть специальная функция которая называется setTimeout

Функция setTimeout в действительности не входит в спецификацию JS. Данная функция пришла к нам из браузерного API
Мы можем ее вызывать setTimeout(). Но в действительности она вызывается у глобального объекта window.setTimeout()
Данный метод принимает первым параметром в себя некоторую функцию. 

window.setTimeout(function() {
    console.log('Iside timeout, after 2000 seconds ')
}, 2000) - эквивалентно 2 секундам

Первым парметров мы можем создать анонимную функию, передать уже имеющуюся функцию
Вторым параметром мы передаем количество милисекунд через которая фукнция должна быть выполнена

Что интересно , что если после того как мы определили данный timeout мы напишем еще какой нибудь код он выполниться раньше чем timeout

Как это работает?
Когда браузер интерпритирует данный скрипт, он бежит по строчкам находит код -> закидывает в стек -> и выполняет 

Когда браузер доходит до setTimeout. Он берет и регистрирует данную функцию которая должна быть выполнена спустя 2 секунды. И начинает ждать. 
Программа при выполнении не тормозит она не ждет пока выполнится данная функция, она сразу же идет дальше 

По сути все что находится у нас в синхронном режиме выполняется сразу. 
Что важно то место где мы регистрируем какую-то ассинхронность здесь выполнение скрипка не бланируется
И мы просто закидываем в некоторое место эту функцию и спустя нужное кол-во времени она у нас вызывается 

function timeout2sec() {
    console.log('timeout2sec')
}
setTimeout(timeout2sec, 2000)

Главное чтобы мы не вызывали timeout2sec, т.к это ассинхронная операция и если поставить (), то функция выполнится сразу
Таймауты выполняются по очереди в зависимости через какое время должны быть выполненны функции

Как это вообще работает? Почему поток не блокируется? Почему программа это регистрирует и в нужный момент вызывает?
- В действительности здесь кроется простой концепт который называется Event Loop

Как работает Event Loop:
- Программа бежит по строчкам кода. Когда интерпритарор доходит до setTimeout он берет и закидывает всю строку в стек
- В стеке он начинает смотреть ага есть фунция setTimeout и это некоторый браузерный API
- Поэтому он берет и выкидывает его из стека и регистрирует функцию setTimeout 
- И ждет пока браузерный сторонний API выполнит метод setTimeout
- Когда данный метод будет выполнен функция которую мы регистрируем она попадает в так называемую очередь
- ГДе по сути работает очень простой цикл который пробегается по этой очереди
- И если видит что функция готова, то он закидывает ее обратно в стек и выполняет ее 

Т.е тем самым мы как бы не блокируем поток и поэтому мы можем использовать большое кол0во ассинхронностей 
Речь идет не тольок о setTimeout, а о любых ассинхронных операциях которые есть в языке 

Сервис который показывает как работает Event Loop: latentflip

Callstack - место которое выполняет нашу пробрамму 
Wep Apis - место для сторонних api 
Callback Queue - список событий в очереди 

У нас есть некоторый слушатель события который добавляет событие click на кнопку
Когда происходит событие у нас выполняется функцция
В начале мы зарегистрируем это ассинхронный слушательй который является частью стороннего Wep API
После этого он берется из callstack

Сторонние Api добавили нам listener. При клике событие попадает в очередь и выполняется функция

Почему Callback Queue называется очередью?
- Если мы сделаем много событий, то Event Loop будет по очереди выполненные закидывать в стек 
- Для того чтобы они выполнились. Но ему на это необходимо определенное кол-во времени 

Концепт SetTimeout(0)
- Снчала выполнится весь код, а после кода выполнится setTimeout

Мы что-то регистрируем, это закидывается на сторонний api 
Дальше готовые функция закидываются просто в очередь 
Event Loop просто пробигается по очереди и закидывет в Callstack


Что такое Promise? Как он работает?
- 

Сейчас сделаем небольшую эмуляцию работы с сервером через ассинхронность. Через подход callback

console.log('Request data...') - сервер готовит некоторые данные 
Данным console.log мы будем говорить что мы как будто бы делаем сейчас ассинхронный запрос на сервер

setTimeout(() => {
    console.log('Preparing data...')

    const backendData = {
        server: 'aws',
        port: 2000,
        status: 'working'
    }

    setTimeout(() => {
        backendData.modified = true
        console.log('Data recevied', backendData)
    })
}, 2000)
В первом setTimeout мы как будто будем находится на сервере и говорить что мы готовим некоторые данные 
Как будто сервер делает запрос к базе данных и получает некоторые данные. Например он будет это делать 3 секунды

Далее как будто бы с бэкенда мы получим некоторую константу. Например это будет объект с какими-то данными

На этом этапе сервер уже подготовил данные и потребуется некоторое кол-во времени чтобы отдать это клиенту
Мы также эмулируем ассинхронность с помощью setTimeout который как бы говорит какбы получили с сервера

Зададим объекту backendData новый ключ. 
В данном случае мы реализовали последовательную ассинхронность с помощью callback
Мы используем первый callack где описываем логику, далее еще один callback в котором мы используем фунционал

Чем плох данный подход?
- Тем что мы получаем достаточно большую вложенность
У нас есть первая вложенность когда мы передаем callback, есть вторая вложенность
Если бы у нас была еще какая-то ассинхронная операция у нас была бы еще одна вложенность
Тем самым мы получаем большое кол-во колбеков внутри колбеков. И чем сложнее манипуляции чем сложнее поддерживать данный код

Promise пришли как раз чтобы решить данную проблему и упростить работу с ассинхронными операциями 

Тоже самое только с помощью Promise:

Как работают Promise?
- Мы создадим новую переменную p. И в JS присутствует глобальный класс который называется Promise

const p = new Promise((resolve, reject) => {
    setTimiout(() => {
        console.log('Request data...')
        const backendData = {
            server: 'aws',
            port: 2000,
            status: 'working'
      }
      resolve(backendData)
    }, 2000)
})

p.then(data => {
    console.log('Promise resolve', data)
})

Мы создаем некоторой инстанс от класса Promise. Это класс в конструктор которого мы должны передать callback
Она как функция принимает в себя как параметр 2 аргумента:
- Первый агумент resolve 
- Второй параметр reject

Два этих параметра также являются функциями
Теперь мы получили нашу функцию callback в конструкторе класса promise
И внутри данного callback мы должны написать какой-то ассинхронный код который будем выполнять  

У нас есть ассинхронный код который мы обернули в Promise

Теперь как нам работать с данным объектом? И получить доступ до данных
- Нам нужно сделать еще одну ассинхронную операцию, и как будто отправить на клиент данные 
Для этого как раз и существуют resolve и reject

Функция resolve вызывается тогда когда закончена ассинхронная операция. И закончена успешно
После объекта backendData мы вызываем метод resolve и тем самым говорим нашему промесу что он завершил свое выполнение
На этом все

Теперь у нас есть переменная p которая является Промесом потому что мы ее получаем из класса Promise
И у каждого промеса есть набор методов которые мы можем использовать 
- Мы можем обратится к нашему Promise и вызвать у него метод который называется then (читается как 'Когда выполнится')

В метод then мы также передаем callback. И данный callback будет вызыват когда закончится некоторая ассинхронная операция
И будет вызыват метод resolve(). Т.е когда прошла ассинхронная оперция мы попали в метод then
Это все. Мы сообщили Promise что он завершился и был вызвын метод then

Чтобы получить доступ до backendData мы просто передаем ее в resolve
И данный параметр будет получен в методе then как обчный параметр
И мы получаем данные которые как будто пришли с базы

Преимущество Promise перед callback
- 



















*/