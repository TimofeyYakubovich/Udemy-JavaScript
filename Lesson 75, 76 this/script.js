'use strict'

// const num = new Number(3);
// console.log(num);

// const num1 = new Function(3);
// console.log(num1);

function User(name, id) {      // функция конструктор //
    this.name = name;          // записываем свйство которое будет отбражаться точна также как в объекте //
    this.id = id;              
    this.human = true;
    this.hello = function() {  // метод объекта(функции)
        console.log(`hello ${this.name}`); // в методах можно использовать свойства этой же функции
    };
}

const ivan = new User('Ivan', 28); // с помощью ключевого слова new вызывается функция конструктор User и помещает в переменную ivan объект
// со свойчтавми которые прописаны в функции  User { name: 'Ivan', id: 28, human: true }
const alex = new User('Alex', 20); //   User { name: 'Alex', id: 20, human: true }

console.log(alex);
console.log(ivan);

ivan.hello(); // hello Ivan
alex.hello(); // hello Alex

User.prototype.exit = function () { // свойство prototype добовляет методы или свойства функции конструктору и они буду прототипно наследоваться у потомков которые были созданы после добовления этого метода
    console.log(`Пользователь ${this.name} ушёл`); // prototype используется когда нет доступа к функции конструктору (прототипу)
};

ivan.exit(); // Пользователь Ivan ушёл


// ________________________________________________________________________________________________________________________________________________

// функция может вызываться 4 способами и в каждом контекст вызыва отличается

// контекст вызова this - это то что окружает функцию и в каких условиях она вызывается

// 1) обычная функция

function showThis() {
    console.log(this); // если прописан строгий режим 'use strict' то контекст вызова this выдаёт undefined если не прописан то выдаёт объект Window
}

showThis();

function showThis1(a, b) {
    console.log(this); // если прописан строгий режим 'use strict' то контекст вызова this выдаёт undefined если не прописан то выдаёт объект Window
    function sum () {
        console.log(this); // даже если используется функция внутри функции всё равно this выдаёт либо Window либо undefined
        // return this.a + this.b; // с использованием контекста this выдаёт ошибку
        return a + b;
    } 
    console.log(sum());
}

showThis1(4, 5);

// 2) Контекст у методов объекта - сам объект

const obj = {
    a: 20,
    b: 30,
    sum: function() {
        console.log(this); // если используем метод внутри объекта то контекст вызова this всегда будет ссылаться на сам объект
        function shout () {
            console.log(this); // в таком случае получаем undefined потомучто это не метод объекта а простой вызов функции внутри метода
        }

        shout();
    }
};

obj.sum();
 
// 3) Внутри функции конструкторов контекст this для всех свейств и методов будет только что созданный новый объект в данном слечае ivan1
//  this в конструкторах и классах - это новый экземпляр объекта

function User1(name, id) {      // функция конструктор //
    this.name = name;          // записываем свйство которое будет отбражаться точна также как в объекте //
    this.id = id;              
    this.human = true;
    this.hello = function() {  // метод объекта(функции)
        console.log(`hello ${this.name}`); // в методах конктекст ссылается так же на только что созданный объект
    };
}

const ivan1 = new User1('Ivan', 28);


// 4) ручное присвоение конктекста call apply bind

function sayName(surname) { // функция приобрела свой конктекст вызова user
    console.log(this); // в таком случае получаем не Window либо undefined а Object { name: "John" }
    console.log(this.name); // в таком случае получаем не Window либо undefined а John
    console.log(this.name + surname);
}

const user = {
    name: 'John'
};

// методы call и apply делают одно и тоже разница только в синтаксисе
// методы call и apply присваивают функции sayName конктекст вызова не Window либо undefined а (обект) user 

sayName.call(user, 'Smith'); // аргументы передаются через строку
sayName.apply(user, ['jora']); // аргументы передаются в массиве


function count(num) {
    return this*num;  // вместо конктекста вызова предаётся 2 (bind(2))
}

// bind создаёт НОВУЮ функцию связанную с определённым конкстекстом

const double = count.bind(2); // в переменную double помещаем новую функцию count с конктекстом вызова = 2 
                              // double это новая функция у которой есть привязанный конктекст = 2

console.log(double(3));       // вызывае функцию double с аргументом(num) = 3 получаем 6
console.log(double(13));      // вызывае функцию double с аргументом(num) = 13 получаем 26





const btn = document.querySelector('button');

btn.addEventListener('click', function() { // если использовать стрелочную функцию то this будет Window либо undefined
    console.log(this); // в таком случае конктекстом вызова будет сам элимент на котором произошло событие(event.target) <button>
    this.style.backgroundColor = 'blue';
});

btn.addEventListener('click', (e) => { 
    console.log(e.target); 
    e.target.style.backgroundColor = 'blue';
});


// у стрелочной функции нет конктекста вызова она всегда его будет брать у своего родителя

const obj1 = {
    num: 5,
    sayNumber: function() {
        const say = () => {      // у обычной функции this был бы undefined. Но стрелочная функция берет конктест вызова у своего родителя 
            console.log(this);   // метода sayNumber, у метода всегда конктекст ссылается на объект obj1
            console.log(this.num); // получаем 5 потому что функция say обратилась к конктексту вызова obj1 и взяла свойство num
        };                     
        say();
    }

};

obj1.sayNumber();

const double1 = (a) => {  // обычный синтаксис стрелочный функции
    return a * 2;
};

console.log(double1(4));

const double2 = a => a * 2; // укороченный синтаксис стрелочный функции если она принимает только 1 аргумент и ее тело помещается в одну строчку

console.log(double2(4));