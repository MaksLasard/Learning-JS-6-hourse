/*
Паттерны проектирования:
    - это некоторые структурные еденицы которые предназначены для решения часто встречаемых задач

Все паттерны делятся на 3 большие группы:
    - структурные 
    - пораждающие
    - поведенческие

Название паттерна объесняет то, что он выполняет


1. Singleton (Одиночка)
    - это просто объект который есть в системе в одном экземпляре плюс к нему есть какая-то глобальная точка доступа

Он нужен каждый раз когда у вас в системе должен быть объект в едином экземпляре и к которому
должен быть доступ из разных частей программы

Пример:
    - создание Singleton с помощью литерала объекта

const instence1 = {
    name: 'singleton',
}
const instence2 = {
    name: 'singleton',
}
instence1 === instence2
{} === {}

Каждый раз когда мы попытаемся создать объект с помощью литерала у нас получиться Singleton. Объект находящийся в одном экземпляре

Чтобы создать Singleton существует 2 основных подхода:
    - можно создать глобальную переменную и обращаться к ней после чего весь код завернуть в модуль
    - определить Singleton внутри объекта

Пример:

let instance

class Counter {
    constructor() {
        if (!instance) instance = this
        return instance
    }
}


2. Factory Method (Фабричный метод)
    - оснавная цель данного шаблона это создание класса который в свою очередь будет помогать создавать определенные объекты
на основании каких-то входных данных. Исходный класс можно называть супер классом

Этот паттер мы используем когда нам нужно создавать множество однотипных объектов. Объекты с одинаковой структурой, но разными данными
Причем эти методы могут содержать как свойства так и методы

Простая фабрика может состоять из 2х классов. Класса конструктора который генерирует новый объект и класса который вызывает это создание
с определенными параметрами. Классов конструкторов может быть несколько и в корневом супер классе фабрики просто вызывается один из них
в зависимости от переданного параметра

Пример:

class BmwFactory {
    create(type) {
        if (type === 'X5')
            return new Bmw(type, 108000, 300)
        if (type === 'X6')
            return new Bmw(type, 111000, 320)
    }
}
cosnt factory = new BmwFactory()

cosnt x5 = factory.create('X5')
const x6 = factory.create('X6')

Минус такого подхода:
    - при большом количестве создаваемых объектов структура нашего фабричного метода начнет разрастаться 

В данном случае проблему можно решить шаблон абстрактой фабрики


3. Abstract Factory (Абстрактная фабрика)
    - паттерн который создает интерфейс группирующий другие фабрики которые логически связаны друг с другом 

Это своеобразная абстракция для фабрики и фабричного метода. Это дополнительная надстройка над другими фабриками
У подфабрик должен быть одинаковый интерфейс создания объектов чтобы им можно было управлять из обстрактной фабрики






































































































*/