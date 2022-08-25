import {Component} from 'react';

const Message = (props) => {
    return (
        <>
            Lesson 158 <br />
            <h2>The counter is {props.counter}</h2>
            Из вне клмпанента можно вызывать его render и делается это тоже в пропсах <br />

            Компанент Message может в себе содержать любое сообщение с пропсом counter тоесть это независимый компанент <br />
            То же самое классовый компанент Counter у него есть своё состояние, он рендерит просто кнопку на страницу каторая меняет это состояние <br />

            Как можно связать эти 2 компанента что бы они были независимы друг от друга но при этом Message находился внутри Counter <br />
            и использовал его состояние. <br />

            Если мы просто Message поместим внутрь Counter в метод render то это будет просто жёсткая привязка. Компанент Counter <br />
            потеряет свою спецефичность потому что внтури будет содержать какйто другой конкретный компанент. <br />
            Если нужено будет испоьзовать другой компанент внутри Counter а не Message то придётся скорее всего создавать еще одну  <br />
            копию компанента Counter. <br />

            Для этого можно использовать Render-props <br />
            Рендер пропсы тоесть в свойства (пропсы) компанента Counter нужно передать что то (функцию) что будет рендерить какую то определенну <br />
            структуру внутри компанента <br />
            То есть в компанент Counter можно передать функцию как пропс каторая будет запускаться внутри <br />
            и рендерить какую то структуру внуть компанента <br />
            {/* <Counter render={counter => (
                    <Message counter={counter}/>
                )}/> */}
            Взяли компанент Counter во время его вызыва передали пропс render каторый внутри себя содержит колбек функцию  <br />
            эта функция принимает в себяя аргумент counter и возврощает другой команент мы указываем Message но можно указыть любой. <br />
            Внутри компанента Counter вызываем эту функцию this.props.render при этом передаём в нее вргумент из состояния this.state.counter <br />

            Тиких рендер пропсов можно создавать несколько и просто вызывать их в нужных местах
            Вызывать один и тот же рендер пропс можно несколько раз

            если говорить о реальном приминении, приложение у нас многостраничное для разделения на страницы используется специальный <br />
            компанент назавем его СТРАНИЦА, этот компанент не знает какой контент будет в себе содержать темболее все страницы разные
            каждый раз этот компанент страница содержит в себе разный контент. Вот для такой ситуации подойдёт рендер пропс 
            когда через функцию каждый раз можно рендерить разные компаненты, props.children позволяет просто отрендерить кусок верстки,
            а рендер пропс позволяет использовать внутренности этого компанента (состояния)

            {/* Page 
                div 
            
            Page
                from 

            Page
                span */}

        </>
    )
}

class Counter extends Component {
    state = {
        counter: 0
    }

    changeCounter = () => {
        this.setState(({counter}) => ({
            counter: counter + 1
        }))
    }

    render() {
        return (
            <>
                <button
                    className={'btn btn-primary'}
                    onClick={this.changeCounter}>
                    Click me
                </button>
                {/* <Message counter={this.state.counter}/> вот так будет жесткая привязка компанента Counter к Message */}
                {this.props.render(this.state.counter)}
                {this.props.render(this.state.counter)}
            </>
        )
    }
}

export {Message};
export default Counter;
