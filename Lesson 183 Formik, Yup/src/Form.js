import { useFormik } from 'formik';
import * as Yup from 'yup';

// Formik библиотека для работы с формами самая популярная

// есть еще библиотеки для работы с формами

// Redux Form на текущий момент использовать ее крайне не рекомендуется в новых проектах даже на главной ее старнице пишут что лучше использовать
// React Final Form проблема Redux Form в том что все данные из каждой формы хроняться в отдельном хранилище и если форм много и данных много
// и при введении или удалении любого символа из фрмы данные обовляются в хранилище поэтому для средних и больших приложений эо просадка по оптимизации

// React Final Form смысл и подход в целом очень похож на Formik

// React Hook Form даже немного потимизмрование чем Formik и другие но смысл и подход в целом очень похож

// имопртируем компанент Formik главный компанент для работы с формой

// файл Basic как пример

// что бы установиь библиотеку npm install formik --save

// Formik рекомендует использовать дополнительные библиотеки Yup каторые занимаются валидацией форм
// усьанавливаем Yup npm install yup --save он напрямую не связан с Formik его можно использовать и отдельно от него

// Formik можно использовать не только как компанент можно использовать как хук
// вариант использовать Formik как компанент больше подходит для реальных приложений потому что он использует контекст что бы пробрасывать события
// импортируем хук useFormik

// создадим переменную formik в каторой используем хук каторый будет содиржать все значения из формы как объект
// на форму навешиваем обработчик onSubmit и в нем будет вызываться handleSubmit тоесть вызываться будет onSubmit
// далее заполним каждый инпут в value помещаем объект formik в нем объект values и из него свойство name по соответствию атрибута name
// аналагично и в других инпутах
// так же навешиваем обработчик события onChange и в нем будем вызывать из формика функцию handleChange она смотрит какой инпут изменяется 
// и по совпадению атрибута инпута name и свойства в объекте initialValues записывает в подходящее свойство то что введено в value в инпуте
// дальше идет обратная связь и это значение попадает в value
// в select можно выбирать одно из значений в option, при выборе значения value из option так же устанавливается и у select

// что бы валидировать данные в инпутах в HTML5 есть свои атрибууты но чаще всего нужна собственная валидация потому чтот в разных браузерах
// по разному отображаются стандартные валидации, так же не везде есть нужные валидации например в React Native при разработке форм для мобильных
// устройтсв без браузера, поэтому валидацию чаще всего прописывают вручную

// создадим функцию validate каторая будет принимать аргумент values объект все значения из форм
// в функции будет изночально пустой объект errors
// помещаем функцию validate как свойтсво в объект formik и она будет запускаться каждый раз когда будет запускаться событие handleChange
// при введении чего то в инпут
// каждый раз когда запускается validate она возвращает объект с ошибками поэтому внутри formik появится еще одно свойство объект errors

// на основании объекта errors можно после каждого инпута рендерить эту ошибку на страницу
// {formik.errors.name ? <div>{formik.errors.name}</div> : null}
// валидация срабатывает но когда идет изменение для одного инпута то появляется уведомление об ошибку и для другого 
// это прооисходит пото му что идет вызов функции handleChange при изминении одного из инпутов после запускается функция validate
// и там возвращается объект ошибки и так как еще ничего в email не вводили там будет сформирван errors.email = 'Обязательное поле';

// иногда просят так и оставлять н почти всего надо пофикстить такое поведение
// для этого предусотрен объект touched каторый отслеживает использовал ли пользователь этот элимент
// по форме это такой же объект как и errors

// что бы отслеживать провзаимодействовал ли пользователь с конкретным инпутом используется событие handleBlur
// на каждый инпут навешиваем событие onBlur оно срабатывает когда фокус уходит с элимента и так же нажатием Tab и в него моиещаем formik.handleBlur
// навешиваем onBlur={formik.handleBlur} на все инпуты теперь когда пользователь провзаимодействовал с каким то инпутом сраьатывает событие onBlur
// и название этого инпута атрибут name будет записано в объект touched
// теперь объект touched можно использовать что бы не отображать сразу все ошибки под каждым инпутом

// что бы не прописывать такие функции validate особенно с простыми задачами и такими регулярками есть готовые бибилиотеки по типу Yup
// Yup это просто набор команд каторые пот капотом делаю все тоже самое что и validate и поитогу Yup возвращает такой же объект errors
// импортируем все что есть из Yup import * as Yup from 'yup';
// можно валидировать разные типы данных строки, чилса, булиновое значение, даты, массивы и тд. к каждому типу данных набор своих команд
// команды mixed можно применять ко всем типам данных

// функция validate уже не нужна вместо нее передаем метод validationSchema это набор правил катрые можно применять к каждому полю в initialValues
// в validationSchema берем Yup использум команду object в нее помещаем объект эта команда вернет нам объект с ключами потиму объекта errors

const validate = values => {
    const errors = {};

    if (!values.name) {    // если в значениях каторые пришли из формы нет поля name тоесть оно пустое
        errors.name = 'Обязательное поле';  // то в объекте errors созалем свойство name и в него записываем 'Обязательное поле'
    } else if (values.name.length < 2) {   // если пользователь ввел меньше 2 символов в поле name
        errors.name = 'Миниму 2 символа для заполнения!'; // то в errors.name записываем 'Миниму 2 символа для заполнения!'
    }

    if (!values.email) {
        errors.email = 'Обязательное поле';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) { // если по шаблону введеный email не подшел регулярка из документации
        errors.email = 'Неправильный email адрес';  // то в errors.email записываем 'Неправильный email адрес'
    }

    return errors; // когда функция закончила работу она возвращает объект с ошибками

}

const Form = () => {

    const formik = useFormik({
        initialValues: { // те инпуты каторые будут контролироваться внутри формы связка по атрибуту name
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false
        },
        // validate, // сокращенная запись validate: validate
        validationSchema: Yup.object({
            name: Yup.string()  // будем валидировать name, это поле должно быть строкой Yup.string() далше используем прием ченинг
                     .min(2, 'Минимум 2 символа')  // проверяем количество символов, 2 аргумент 'Минимум 2 символа' сообщение если проверка не прошла
                     .required('Обязательное поле'), // required какое сообщение будет выводиться елси вдруг не прошла эта проверка
            email: Yup.string() // проверяем что введена строка
                      .email('Неправильный email адрес')  // проверяем что введен именно email
                      .required('Обязательное поле'),  // required инпут обязательно должен быть заполнен
            amount: Yup.number() // проверяем что введено число
                       .min(5, 'Не менее 5')  //
                       .required('Обязательное поле'),
            currency: Yup.string().required('Выберете валюту'),
            text: Yup.string().min(10, 'Не менее 10 символов'), // required не указываем что бы можно было ничего не вводить
            terms: Yup.boolean()  // boolean проверяет что введено именно true или false
                      .required('Необходимо согласие')
                      .oneOf([true], 'Необходимо согласие') // к checkbox надо применять проверку oneOf в массиве прописываются те значения при 
        }),                                                 // каторых пройдет проверка 
        onSubmit: values => console.log(JSON.stringify(values, null, 2)) // onSubmit что будет происходить когда форма будет отправляться
        // values объект все значения из формы. конструкция JSON.stringify(values, null, 2) что бы нормально превратить объект в строку 
    })

    return (
        <form className="form" onSubmit={formik.handleSubmit}> 
            <h2>Отправить пожертвование</h2>
            <label htmlFor="name">Ваше имя</label>
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {/* {formik.errors.name ? <div>{formik.errors.name}</div> : null} */}
            {/* если в объекте errors есть свойство name и оно не пустое то рендерим эту ошибку <div>{formik.errors.name}</div> */}
            {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
            {/* если у этого инпута есть ошибка из функции validate и при этом провзаимодействовал с этим инпутом только тогда ошибка показывается */}
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
                // value={formik.values.email}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                {...formik.getFieldProps('name')} // getFieldProps позволяет получать объект с определенными пропы value onChange onBlur когда  
                // используется хук useFormik в нем указывается пропсы какого инпута надо получить name
                // есть еще formik.getFieldMeta что бы получать ошибки или объект touched
            />
            {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null}
            <label htmlFor="amount">Количество</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.amount && formik.touched.amount ? <div className="error">{formik.errors.amount}</div> : null}
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </select>
            {formik.errors.currency && formik.touched.currency ? <div className="error">{formik.errors.currency}</div> : null}
            <label htmlFor="text">Ваше сообщение</label>
            <textarea 
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.text && formik.touched.text ? <div className="error">{formik.errors.text}</div> : null}
            <label className="checkbox">
                <input 
                    name="terms" 
                    type="checkbox"
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.errors.terms && formik.touched.terms ? <div className="error">{formik.errors.terms}</div> : null}
            <button type="submit">Отправить</button>
        </form>
    )
}

export default Form;