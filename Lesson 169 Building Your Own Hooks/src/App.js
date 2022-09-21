import { useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// когда полей ввода немного то состояния создавать для каждого можно без проблем
// но когда инпутов много то код будет сильно повторяться
// и если таких форм много в приложении то это тоже дублироваане кода
// что бы этого избежать можно создать отдельно функцию

// создадим отдельно функцию каторая содержит в себе состояние и умеет его менять
// это и есть собственный хук
// собственные хуки выделяют в отдельный компанент и используют в любй форме приложения
// пользовательские хуки это механизм повторного использования логики с состоянием
// название каждого пользовательского хука начинать с use
// пользовательские хуки мгут содержать любую логику запросы на сервер, запуск таймера, анимаацию и тд.
function useInputWithValidate(initialValue) {
    const [value, setValue] = useState(initialValue);

    const onChange = event => {
        setValue(event.target.value)
    }

    const validateInput = () => {
        return value.search(/\d/) >= 0
    }

    // return {value: value, onChange: onChange};
    return {value, onChange, validateInput}
    // теперь когда мы запустим эту функцию получим объект и этот объект растащить на отдельные переменные
    // состояние, функция для изменения состояния, функция для валидации
}

const Form = () => {
    // const [text, setText] = useState('');
    // const [textArea, setTextArea] = useState('');

    // теперь вместо создания стейтов вручную можно вызвать функцию useInputWithValidate
    // теперь в этих переменных будут лежать и состояние и все методы из этой функции в виде объекта
    const input = useInputWithValidate('');
    const textArea = useInputWithValidate('');

    // допустим у этой формы должен быть метод по реализации валидации инпутов
    // const validateInput = (text) => {
    //     // if(text.search(/\d/) >= 0) {
    //     //     return true
    //     // } else {
    //     //     return false
    //     // }

    //     // можно сократить
    //     // return text.search(/\d/) >= 0 ? true : false // так тоже будет возвращаться булиновое значение
    //     // можно еще сократить
    //     return text.search(/\d/) >= 0 // так тоже будет возвращаться булиновое значение
    // }

    // если в инпут будет написано число то в классы будет добавлен text-danger
    // const color = validateInput(text) ? 'text-danger' : null;

    // теперь можно в color валидировать только инпут input.validateInput() потому что этот метод храниться внутри объекта каторый возврощается выше
    const color = input.validateInput() ? 'text-danger' : null;

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    {/* <input value={`${text} / ${textArea}`} type="text" className="form-control" readOnly/> */}
                    <input value={`${input.value} / ${textArea.value}`} type="text" className="form-control" readOnly/>
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <input 
                        // onChange={(e) => setText(e.target.value)} теперь можно использовать метод onChange из инпута
                        onChange={input.onChange} 
                        type="email" 
                        // value={text} теперь можно использовать состояние из инпута
                        value={input.value}
                        className={`form-control ${color}`}
                        id="exampleFormControlInput1" 
                        placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea 
                        // onChange={e => setTextArea(e.target.value)}
                        onChange={textArea.onChange}
                        value={textArea.value}
                        className="form-control" 
                        id="exampleFormControlTextarea1" 
                        rows="3"></textarea>
                </div>
            </form>
        </Container>
    )
}

function App() {
    return (
        <Form/>
    );
}

export default App;