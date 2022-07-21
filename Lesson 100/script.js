'use strict'

// Инкапсуляция один из принципов объектно-ориентированного програмирования
// сокрытие информации от вмешательства пользователя

function User(name, age) {
    this.name = name;
    // this.age = age;
    let userAge = age; 
    // что бы изменять такие переменные необходимо использовать геттеры и сетеры (не путать с прошлым уроком)
    // так могут называться любые методы которые позволяют либо получать либо устанавливать значения

    this.say = function() {
        // console.log(`Имя пользователя ${this.name}, возраст ${this.age}`);
        console.log(`Имя пользователя ${this.name}, возраст ${userAge}`);

    };

    this.getAge = function() { 
        // так как мы не можем обратиться к переменной userAge через console.log(ivan.userAge); для этого будет метод getAge
        return userAge;
    };

    this.setAge = function(age) {
        // так как мы не моэем изменить userAge через ivan.userAge = 30; для этого будет метод setAge
        if (typeof age === 'number' && age > 0 && age < 110) {
            userAge = age;
        } else {
            console.log('Недопустимой значение');
        }
    };
}

const ivan = new User ('Ivan', 27);
console.log(ivan.name); // получаем Ivan
// console.log(ivan.age);  // получаем 27
console.log(ivan.userAge); // в таком случае получаем undefined потому что это уже не свойство объекта это и есть Инкапсуляция

// ivan.age = 30;
ivan.userAge = 30; // в таком случае изменить userAge не получится потому что это уже не свойство объекта
ivan.name = 'Alex';

// ivan.say(); // получаем Имя пользователя Alex, возраст 30 произашло вмешаельство из вне и всё может поломаться для этого и нужна инкапсуляция
ivan.say();    // получаем Имя пользователя Alex, возраст 27 в таком случае к userAge нет доступа снаружи

console.log(ivan.getAge()); // обращаемся к методу getAge получаем 27
ivan.setAge(30);            // устанавливаем другое значение переменной через setAge
console.log(ivan.getAge()); // обращаемся к методу getAge получаем 30
ivan.setAge(300);           // получаем Недопустимой значение так как сработало условие внутри метода





class User1 {
    constructor(name, age) {
        this.name = name;
        // let userAge = age; // внутри класса использовать переменную нельзя она undefined
        this.userAge = age;   // на в таком случае это свой свойство будет публичным его можно изменить из вне 
        //  если в классе какое то свойство надо скрыть от внешних факторов принято в начале ставить _
        this._age = age;
    }

    surname = 'Petrychenko'; // работает не во всех браузера
    #surname1 = 'Yakubovich'; // приватное свойство в классе работает не во всех браузера

    say() {
        console.log(`Имя пользователя ${this.name} ${this.surname}, возраст ${this.userAge}`);

    }

    say1 = () => {   // методы можно задавать в качестве стрелочной функции работает не во всех браузера
        console.log(`Имя пользователя ${this.name} ${this.#surname1}, возраст ${this.userAge}`);

    }

    // устаревший подход

    getAge() { 
        return this.userAge;
    }

    setAge(age) {
        if (typeof age === 'number' && age > 0 && age < 110) {
            this.userAge = age;
        } else {
            console.log('Недопустимой значение');
        }
    }

    // современный подход

    get age() {
        return this._age;
    }

    set age(age) {
        if (typeof age === 'number' && age > 0 && age < 110) {
            this._age = age;
        } else {
            console.log('Недопустимой значение');
        }
    }
}

const ivan1 = new User1 ('Ivan', 27);
// ivan1.say();     // получаем Имя пользователя Ivan, возраст undefined
ivan1.say();        // получаем Имя пользователя Ivan, возраст 27
ivan1.userAge = 30;
console.log(ivan1.getAge()); // получаем 30 this.userAge изменили из вне

console.log(ivan1.age); // получаем 27 используется геттер
ivan1.age = 99;
console.log(ivan1.age); // получаем 99 используется сеттер

console.log(ivan1._age); // используется не геттер и сеттер а идёт обращение к свойству напрямую
ivan1._age = 199;
console.log(ivan1._age); // получаем Имя пользователя Ivan Yakubovich, возраст 30 через метод приватное свойство можно использовать
ivan1.say1();
console.log(ivan1.surname1); // получаем undefined потому что свойство приватное снаружи к нему не обратишься