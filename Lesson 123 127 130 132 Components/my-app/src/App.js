// import React from 'react';
import {Component, StrictMode} from 'react'; // диструктуризация импортируем только компанент
import logo from './logo.svg'; // ипортирование картинки
import './App.css';

// создадим простейший компанент
const Header = () => { // пишутся с большой буквы так как компанент
    // однастрочная структура поэтому сдесь круглые скобки не нужны
    return <h2>HEllo World</h2>
} // теперь этот компанент можно постоянно повторять

const Field = () => {
  const holder = 'Enter here'
  // return <input placeholder='Type here' type="text" />
  const styleField = {
    width: '300px'
  };
   // так же можно манипулировать содержанием атрибутов особенно при изменении классов
   // когда атрибутов много
  return <input 
          placeholder={holder} 
          type="text" 
          style={styleField} /> 
 
}

// Классы в js это тоже функции только обёрнутые в красивую оболчку а это значит что компаенты реакта могут быть классами
// сейчас конечно идет развитие в сторону компанентов но изначально всё писалось на классах 
// для того что бы классы в реакте работали правлино мы должны унаследовать какое то поведение от базового класса называется Component
// для того что бы создавать собственные компаненты через классы что бы они умели делать всё то что задумано в реакте
// берем из компанента Component библиотеки React все функциональные вещи которые понадобятся в нашем классе и их наследуем
// в наш класс который создаём

// class Field1 extends React.Component { 

// }
class Field1 extends Component { // если импортируем только Component
    render() {   // в классах которые служат реакт компанентами должен быть один главный метод каторый что то создаёт
      const holder = 'Enter here';
      const styleField = {
        width: '300px'
      };
      return <input 
          placeholder={holder} 
          type="text" 
          style={styleField} /> 
    }
}// отличие в синтаксисе в том что в классахх должен быть один главный метод каторый что то создаёт и уже в нем return




function Btn() { // для объявления компанентов можно использовать как стрелоочную фенкцию так и обычную
    const text = 'Log in'
    const res = () => {
      return 'Log in';
    }
    const p = <p>Log in</p>
    // return <button>{text}</button>
    // return <button>{res()}</button>
    // return <button>{p}</button>
    // return <button>{3+4}</button>

    const logged = true;
    return <button>{logged ? 'Enter' : text}</button> // можно помещать условия if нельзя
    
}

// это реакт компанент
function App() { // копаненты это функции которые могут возвращать JSX элементы всегда пишутся с большой буквы
  return (
    <div className="App">
        <StrictMode>
            <Header/> можно и так если мы ничего не собираемся вставлять в него
        </StrictMode>
        <Header></Header> вызываем компанент
        <Field/>
        <Btn/>
        <Field1/>
        <div className='Lesson127'>
            Lesson127!!!!!!!!!!!!!!!!!!!!!!!!!
            <WhoAmi name="Jonh" surname="Smith" link="facebook.com"/> из этих атрибутов будет сформирован объект props
            даже если их не указывать объект всёравно будет сформирован
            <WhoAmi name="Alex" surname="Shepard" link="vk.com"/>
            значение этих атрибутов изменить никак нельзя, что бы изменить их динамически нужно заново пересоздать компанент
            {/* <WhoAmi name={{firstName: 'Fedor'}} surname="Shepard" link="vk.com"/> можно передавать объект */}
            {/* <WhoAmi name={() => {return 'Jonh'}} surname="Shepard" link="vk.com"/> можно передавать функцию */}
        </div>
        <div className="Lesson130">
            Lesson130!!!!!!!!!!!!!!!!!!!!!
            <WhoAmiClass name="Jonh" surname="Smith" link="facebook.com"/>
            <WhoAmiClass name="Alex" surname="Shepard" link="vk.com"/>
            пропсы в классовые компаненты передаём точно так же как и в функциональные
        </div>
        <div className="Lesson132">
            Lesson132!!!!!!!!!!!!!!!!!!!!!
            <WhoAmiEvent name="Jonh" surname="Smith" link="facebook.com"/>
            <WhoAmiEvent name="Alex" surname="Shepard" link="vk.com"/>
            пропсы в классовые компаненты передаём точно так же как и в функциональные
        </div>
    </div>
  );
}

// function WhoAmi (props) {
  function WhoAmi ({name, surname, link}) { // чаще всего используется диструктуризация объекта props
  return (
      <div>
          {/* <h1>My name is {props.name}, surname - {props.surname}</h1>
          <a href={props.link}>My profile</a> */}
          <h1>My name is {name}, surname - {surname}</h1>
          {/* <h1>My name is {name()}, surname - {surname}</h1>  можно передавать функцию */}
          {/* <h1>My name is {name.firstName}, surname - {surname}</h1> можно передавать объект */}
          <a href={link}>My profile</a>
          
      </div>
  )
}

// мы можеи и должны писать компаненты в разных файлах и импортировать и экспортировать в другие файлы для удобного ипользования
// в идеале для каждого компанента должен быть отдельный файл или папка с компанентами


// Lesson 130 Состояние компанентов

// дупустим у нас на странице есть несколько счётчиков и слайдеров у них меняется активное значение число на счётчике и слайд на слайдере
// вот эта динамическая вещь конкретное число или активный слайд и отлавливает состояние компанента его можно днамически менять

// раньше в функциональных компанентах состояние создать было не возможно они были только в классовых сейчас уже можно при помощи хуков

// начнем с состояния в классовых компанентов

class WhoAmiClass extends Component { // возможность работы с пропсами приходит от реакт компанента Component от которого мы наследуем наш класс WhoAmiClass
    constructor(props) {  // пропсы в классовый компанент передаются через объект конструктор
                          // если в конструкторе больше ничего нет кроме пропсов то его можно удалить
        super(props);     // прпсы используются только для чтения динамически их менять нельзя
                          // для этого используются состояния которые можно менять динамически внутри компанентов
        this.state = {    // что бы создат состояние в конструкторе создаётся свойсвто this.state как объект
            years: 27,    // теперь это свойство years можно динамически зменять
            text: '++++=' // state может содержать неколько свойств их может быть много
                          // изменяться будут тоько те которые прописаны в команде setState
        }
    }
    
    nextYear = () => {   // метод в виде стрелочной функции если испоьзовать обычную функцию то будет ошибка
        console.log('+++');
        // this.state.years++ // так реакт выдаёт предупреждение на прямую состояние менять нельзя
        // this.setState({  // что бы правильно менять состояне компанента спользуется команда this.setState
        //   // years: ++this.state.years // так реакт выдаёт предупреждение на прямую состояние менять нельзя
        //   // дело в том что опрератор ++ меняет предыдущее состояние this.state
        //   years: this.state.years + 1 // вот так правильно изменять динамически состояния компанента
        // })
        this.setState(state => ({ // в setState передается функция в нее передаётся один аргумент state это текущее состояние
          years: state.years + 1
        }))
          // когда команда setState запускается она запускате перересовку всего компанента с новым состоянием а именно вызов метода render()
          // каждое новое состояние зависит от предыдущего стейта но команда setState выполняется асинхронно 
          // и может случиться так что предыдущее состояние еще не обновилось а мы уже опять нажил на конопку и опять запускае команду
          // механизмы внутри реакта позволяют объединить несколько зменений состояния в одно и дать приоритет какому то одному процессу
          // что бы избежать такой ситуации внутрь команды setState передаётся колбек функция таким образом реакт будет 
          // выполнять эту функцию только тогда когда предыдущий стейт будет готов
        
    }

    render() {
        const {name, surname, link} = this.props;
        return (
          <div>
            <button onClick={this.nextYear} >{this.state.text}</button> 
            добавим конпку с событием клика которое запускает метод nextYear
            <h1>My name is {name}, surname - {surname}, age - {this.state.years}</h1>
            <a href={link}>My profile - {link}</a>
        </div>
        )
    }
}

// Lesson 132 События в React и вспоминаем this

// для того что бы назначить событие в реакте нужно промисать событие в реакте в формате CamelCase

// addEventListener назначать нигде не нужно реакт всё делает сам когда в теге прписан обработчк события
// для отмены стандартного поведения браузера в реакте необходимо использовать только event.preventDefault()

// почему мы исопльзовали стрелочную функцию для методов класса 
      // из за контекста вызыва this. Когда мы передаём метод в обработчик события 
      // всегда в начале прописываем this для указания экземпляра объекта (класса)
      // так же и для пропсов и для стейтов что бы у каждого компанента были свои свойства и свои пропсы

// с обработчикам событий немного сложней 
      // когда событие срабатытвает контекст теряется потомучто функция переданая в обработчик вызывается внутри другова метода
      // и this становится undefined
      // способы избежать этого: 

  // 1 Через конструкцю bind
  // например this.nextYear = this.nextYear.bind(this)
  // слева просто свойство которое будет у экземпляра this класса
  // справа обрщаемся к методу класса this.nextYear и привязываем его bind к конкреному экземпляру класса this

  // 2 использовать стрелочную фенкцию  commitInputChanges = (e) => {}

  // 3 вызвать событие через анонимную стрелочную функцию <button onClick={() => this.nextYear()} >{this.state.text}</button>
      // когда произойдёт событие вызывется анонимная стрелочная функция вынтри нее она вызовет this.nextYear()
      // и так как стрелочная функция берет конктекст у своег родителя в него попдает наш экземпляр объекта (класса)
      // только может быть одна проблема каждый раз когда будет создаваться компанент WhoAmiEvent бдует создавать 
      // это же колбек () => this.nextYear() и пролбемы могут начаться если этот колбек передаётся куда то дальше в виде пропсов
      // если бы мы написал еще большой компаненты ниже WhoAmiEvent и туда в качестве пропсов передавали () => this.nextYear() 
      // она каждый раз создавалась бы заново и по алгоритму если у компанента меняется пропс то это заново его перерисовывает на странце
      // немного просела бы оптимизация

      // каждый раз когда вызывается this.setState она вызывает render и по алгоритму реакт изменит только те элементы которые изменились



// Использование аргуентов в обработчиках событий
    // при вот такой записи nChange={this.commitInputChanges} мы не можем передать туда никакие аргументы 
    // кроме event (e) который приходит по автоматически
    // что бы передовать аргументы нужно спользовать стрелочную функцию  onChange={(e) => this.commitInputChanges(e, 'some color')}
    // куда уже вручную нужно передать объект события (e) и аргументы которые нам нужны 'some color'

class WhoAmiEvent extends Component { 
  constructor(props) {
      super(props)
      this.state = {    
          years: 27,    
          text: '++++=',
          position: ''              
      }
      // this.nextYear = this.nextYear.bind(this);
  }
  
  nextYear() {
      console.log('+++');
      this.setState(state => ({ 
        years: state.years + 1
      }))
  }

  commitInputChanges = (e, color) => {
    console.log(color);
      // console.log(e.target.value); выводим в консоль то что вводим в инпут
      this.setState({   // не используем стрелочную функцию так как нам не важно что за position был до этого в стейте
        position: e.target.value
      })
  }

  render() {
      const {name, surname, link} = this.props;
      const {position, years} = this.state;
      return (
        <div>
          <button onClick={() => this.nextYear()} >{this.state.text}</button> 
          добавим конпку с событием клика которое запускает метод nextYear
          <h1>My name is {name}, surname - {surname}, age - {years}, position - {position}</h1>
          position прописывается потомчу что в обработчике события вызывается функция которая <br />
          вызвает setState который автоматичесские вызывает render <br />
          <a href={link}>My profile - {link}</a>
          <form>
            <span>Введите должность</span>
            {/* <input type="text" onChange={this.commitInputChanges}/> <br /> */}
            <input type="text" onChange={(e) => this.commitInputChanges(e, 'some color')}/> <br />
            в нативном JS onInput срабатывает тлько тогда когда ввели какие то симовлы <br/>
            onChange срабатывает тлько тогда когда уводится фокус от этого элимента <br />
            В реакте onInput и onChange срабатывают одинаково когда ввели какие то симовол но очаще всего используется onChange
          </form>
      </div>
      )
  }
}



export {Header}; // именованый экспорт как обычной функции 
export default App; // экспорт по умолчанию
