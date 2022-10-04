import {useContext} from 'react';
import dataContext from './context';
// импортируем dataContext в этом компаненте будет подписка на этот контекст

const InputComponent = () => {

    const context = useContext(dataContext);
    console.log(context.forceChangeMail);
    return (
        <input
            value={context.mail}
            type="email" 
            className='form-control' 
            id="exampleFormControlInput1" 
            placeholder="name@example.com"
            onFocus={context.forceChangeMail}/>
    )
}

export default InputComponent;