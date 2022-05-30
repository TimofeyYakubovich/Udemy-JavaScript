
class Rectangle { // название класса всегда начинается с большой буквы // концепция
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    calcArea() {
        return this.height * this.width;
    }
}

class ColoredRectangleWithText extends Rectangle { // класс ColoredRectangleWithText наследуется(extends) от класса Rectangle
    constructor(height, width, text, bgColor) {
        super(height, width); // метод super(); вызывает супер конструктор у родителя тоесть теже ствойства что и у родителя
                              // должен записываться всегда первым в конструкторе
                              // в него записываются свойства которые мы хотим использовать из родителя, не всегда нужны все свойства
        this.text = text;
        this.bgColor = bgColor;
    }

    showMyProbs() {
        console.log(`Текст: ${this.text} Цвет: ${this.bgColor}`);
    }
}

const square = new Rectangle(10, 10); // экземпляры
const long = new Rectangle(20, 100);  // экземпляры

console.log(square.calcArea());
console.log(long.calcArea());

const div = new ColoredRectangleWithText(25, 10, 'Hello World', 'red');

div.showMyProbs();
console.log(div.calcArea());