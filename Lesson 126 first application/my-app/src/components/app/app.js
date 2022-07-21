import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
             data: [
                {name: 'Jonh C.', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Carl W.', salary: 15000, increase: false, rise: false, id: 3},
            ]
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        // Lesson 135
        // console.log(id);
        this.setState(({data}) => { // удалять из state какой то элимент можно только через this.setState только так правильно
            // алгоритм удаления каковото элимента из массива с объектами 
            // где нужно взять id и понему найти нужный объект внутри массива и удалить его
            // что бы найти нужный объект нужно определеить его индекс в массиве
            const index = data.findIndex(elem => elem.id === id);
            console.log(index);
            // метод findIndex() принимает в себя колбекфункцию каторая запускается и если эта функция вернет true
            // то из этого метода будет возвращён номер элемента в массиве на катором сработала эта функция и помещён в index
            // elem это каждый объект по порядку в массиве его id сравнивается с id который приходит с метода deleteItem

            // не изменяемость (Иммутабельность состояния) state
            // через this.state изменять state нельзя
            // не изменяемым или Иммутабельным объект называется тогда когда он не может быть изменен после своего создания
            // что бы внести какие то изменения можно создать копию объета допустим state с уже внесенными изменениями 

            // что можно было бы сделать что бы изменить state
            // data.splice(index, 1); // метод сплайс удаляет элимент с индексом index из массива 1 - один элимент
            // return {
            //     data: data
            // }
            // но ак мы изменили state напрямую так как splice изменяет содержимое массива

            // правильно создать новый массив но уже без не нужного нам элимента сохроняя старый объект
            // метод slice копирует часть массива и создаёт новый
            // const before = data.slice(0, index); // копируем все элименты массива от 0 до того что помещен в index
            // const after = data.slice(index + 1,); // копируем часть массива начиная со следующего после index и до конца массива
            // const newArr = [...before, ...after];
            // return {
            //     data: newArr
            // }

            // второй способ
            // Метод filter() создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции.
            return {
                data: data.filter(item => item.id !== id) // фильтуем все элименты в объектк data и оставляем только те элименты 
                // id которых не совпадают с тем который пришёл в deleteItem = (id)
            }
        })
    }

    addItem = (mame, salary) => {
        const mewItem = {
            mame,
            salary,
            increase: false,
            rise: false, 
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, mewItem]
            return {
                data: newArr
            }
        });
    }

    // onToggleIncrease = (id) => { // этот метод будет изменять параметр increase на противополжный у определенного элимента по id
    //     // console.log(`Increase this ${id}`);
    //     // this.setState(({data}) => {
    //     //     const index = data.findIndex(elem => elem.id === id); // получаем индекс в массиве объекта сотрудника который получит премию
    //     //     const old = data[index];  // получаем копию этого объекта
    //     //     const newItem = {...old, increase: !old.increase} 
    //     //     // создаём новый объект newItem и в нем разварачиваем свойства объекта old тем самы формируем новый объект
    //     //     // после этого можно добавлять новые свойтсва и если они совпадают с теми что развернулись из старого объекта 
    //     //     //то они их будут заменять
    //     //     // increase: !old.increase таким образом создаём новое свойство increase которое берет значение из старого объекта меняет
    //     //     // его на противоположное и записывает в новый объект (заменяет так как в новом объекте оно уже есть)
    //     //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
    //     //     // разварачиваем все объекты от первого до объекта с индексом index, добовляем новый объект newItem
    //     //     // и развроачиваем все объекты после объекта с индексом index
    //     //     return {
    //     //         data: newArr
    //     //     }
    //     // })

    //     // второй способ
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return {...item, increase: !item.increase}
    //             }
    //             return item;
    //         })
    //         // map берет исходный массив и изменяет каждый элмент внутри его на выходе получается новый массив
    //         // item каждый отдельный объект внутри массива если id перебираемого объекта совпал с id который пришёл в onToggleIncrease = (id)
    //         // и в таком случае на этой итерации возвращаем return из колбек функции новый объект {...item, increase: !item.increase}
    //         // если id не совпало то мы просто возвращаем объект нетронутым 
    //         // поитогу получаем массив объектов только с одним новым изменнненым 
    //     }))
    // }

    // onToggleRise = (id) => { // этот метод будет изменять параметр Rise на противополжный у определенного элимента по id 
    //     // console.log(`Rise this ${id}`);
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return {...item, rise: !item.rise}
    //             }
    //             return item;
    //         })
    //     }))
    // }

    // так как методы onToggleIncrease и onToggleRise почти идентичны их можно объединить в один

    onToggleProp = (id, prop) => { // этот метод будет изменять параметр Rise на противополжный у определенного элимента по id 
        // console.log(`Rise this ${id}`);
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    render() {
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        // перебираем объект data и возвращаем только те айтемы у которых increase будет в позиции true и берём их количество
        return (
            <div className='app'>
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployeesList 
                    data={this.state.data}
                    // onDelete={id => console.log(id)}/> 
                    onDelete={this.deleteItem}
                    // onToggleIncrease={this.onToggleIncrease}
                    // onToggleRise={this.onToggleRise}/>
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;