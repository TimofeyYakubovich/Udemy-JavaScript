import { Component, Fragment } from "react";
import styled from 'styled-components';

import {WhoAmi} from './App';
// импортируем объект styled из styled-components

// создадим блок каторый будет обрачивать компаненты WhoAmi
// создаём переменную Wrapper и в ней используем объект styled и указываем какой это будет тег в данном случае div
// и через бектики прописываем стили
const Wrapper = styled.div`
    width: 600px;
    margin: 80px auto 0 auto;
`;

// так же можно заменять стандартные теги в компанентах
// так же в такие компаненты можно передавать свои пропсы и использовать их пряом внутри стилей
const EmpItem = styled.div`
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, .2);
    // что бы не стилизовать теги внутри styled компанентов используется вложенности как и в SCSS
    a {
        display: block;
        margin: 10px 0 10px 0;
        color: black;
        // проверяем пропс прямо внутри стилей если active true то color: orange если false то color: black
        color: ${props => props.active ? 'orange' : 'black'};
    }
    input {
        display: block;
        margin-top: 10px;
    }

`;

const Header = styled.h2`
    font-size: 22px;
`;

export const Button = styled.button`
    display: block;
    padding: 5px 15px;
    background-color: gold;
    border: 1px solid rgba(0, 0, 0, .2);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, .2);
`;

// ТАким образом можно создать фаил с готовыми styled компанентами которые уже экспортировать куда угодно
// экспортируем Button в index.js

const Lesson143 = () => {
    return(
        <Fragment>
            <br />
            <br />
            <br />
            Lesson143 <br />
            Технология CSS-in-JS ее конкретный предстовитель Styled Components <br />
            дословно CSS-in-JS это использование CSS кода прямо внутри JS компанентов <br />
            сначало надо установить Styled Components  npm install --save styled-components <br />
            Styled Components может использовать условия внутри своих стилей, вложенности как и в SCSS <br />
            вендерные префиксы ставятся автоматически, псевдоселекторы и псевдоэлементы точно так же работают <br />
            анимации тоже можно создавать
            <Wrapper>
                <WhoAmi name="Jonh" surname="Smith" link="facebook.com"/>
                <WhoAmi name="Alex" surname="Shepard" link="vk.com"/>
                <br />
                <br />
                так же можно заменять стандартные теги в компанентах 
                <br />
                <br />
                <WhoAmiComp name="Jonh" surname="Smith" link="facebook.com"/>
            </Wrapper>
        </Fragment>
        
    )
        
}


class WhoAmiComp extends Component { 
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
          // так же в такие компаненты можно передавать свои пропсы и использовать их пряом внутри стилей
          // если передаём пустой пропс то он всегда в пазиции true
          <EmpItem active>
            <Button onClick={() => this.nextYear()} >{this.state.text}</Button> 
            добавим конпку с событием клика которое запускает метод nextYear
            <Header>My name is {name}, surname - {surname}, age - {years}, position - {position}</Header>
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
        </EmpItem>
        )
    }
  }

export default Lesson143;