import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

// в Formik есть готовые компаненты Form, Field, ErrorMessage каторые через контекст ббудут принимать нужные пропсы
// перепишим все на базовую форму без хука, хук useFormik используется внутри компанента Formik

// импортируем Formik, Form, Field, ErrorMessage
// Formik главный компанент
// Form компанент самой формы
// Field любые инпуты
// ErrorMessage компанент с ошибкой

// помещаем всю форму внутрь компанента Formik, передаем в Formik как пропсы initialValues схему валидации validationSchema и onSubmit
// все методы handleSubmit handleChange handleBlur values будут получаться через контекст от готовых компанентов
// меняем тег form на компанент Form и удаляем у него onSubmit={formik.handleSubmit} так как form получает его через контекст у Formik

// вместо input используем Field id name type оставляем а value onChange onBlur удаляем так как Field получает их через контекст у Formik
// value он получает от name

// ErrorMessage используется для того что бы отобразить шибку причем он уже настроен так что получает ошибку привязаную по formik.errors.name
// и по formik.touched.name
// в ErrorMessage передаем className="error" связываем ошибку с определенным инпутом name="name" и если так оставить то ошибка на страницу будет 
// рендериться в формате просто строки
// что бы рендерить ошибки в каих то элиментах можно добавить component="div" тогда ошибка отрендериться дивом со строкой с классом className
// есть еще способ поещать внутрь ErrorMessage функцию каторая будет брать как аргумент сообщение об ошибке и рендерить уже какую то нужную нам
// верстку <ErrorMessage name="email">{msg => <div>{msg}</div>}</ErrorMessage>

// Field общий компанент его можно применять и вместо select и textarea
// что бы Field понимал что ему нужно отрендерить именно select а не input ему нужно добавить атрибу as="select"

// так как checkbox изночально input просто меняем его на Field

// сейчас есть повторение 3 однотипных компанентов name email amount отличающихся неймом их может быть больше и так же селектов или текстэрии
// их можно вынести в отдельный компанент и связать его именно с этой формой для этого есть хук useField

// импортируем useField

// создадим компанент MyTextInput он будет принимать инпут и label так как он тоже повторяется отличается только участком с текстом

const MyTextInput = ({label, ...props}) => { // label участком с текстом ...props какие то другие проперти каторые туда приходят

    const [field, meta] = useField(props);
    // что бы связать этот компанент с формой Formik тоесть этот инпут должен получить атрибуты value onChange onBlur для этого есть хук useField
    // он через контекст получает эти пропсы когда используется внутри формика
    // useField позволяет получать массив из 2 объектов field - это пропсы value onChange onBlur, meta - метаданные с ошибками и был ли уже 
    // использован этот инпут

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>  {/* разварачиваем объект с пропсами id name type и тд. как атрибуты для инпута */}
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
            {/* рендер ошибки */}
        </>
    )
};

// такимже образом можно создавать и другие инпуты но в useField нужно указать тип поля каторое будет использоваться checkbox select и тд.
// таким образом копанент получит дополнительные пропсы

const MyCheckbox = ({children, ...props}) => {  // children - текст возле галочки может быть и какой угодно компанент 

    const [field, meta] = useField({...props, type: 'checkbox'}); // передаем тип type: 'checkbox' за счет этого в field придет не value а checked
    // checked и меняется как галочка

    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...props} {...field}/>
                {children}
            </label>

            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
};

const CustomForm = () => {

    return (
        <Formik 
            initialValues = {{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema = {Yup.object({
                name: Yup.string()  
                         .min(2, 'Минимум 2 символа')
                         .required('Обязательное поле'), 
                email: Yup.string() 
                          .email('Неправильный email адрес')  
                          .required('Обязательное поле'),  
                amount: Yup.number() 
                           .min(5, 'Не менее 5')  //
                           .required('Обязательное поле'),
                currency: Yup.string().required('Выберете валюту'),
                text: Yup.string().min(10, 'Не менее 10 символов'), 
                terms: Yup.boolean()  
                          .required('Необходимо согласие')
                          .oneOf([true], 'Необходимо согласие')
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form"> 
                <h2>Отправить пожертвование</h2>
                {/* <label htmlFor="name">Ваше имя</label>
                <Field
                    id="name"
                    name="name"
                    type="text"
                />
                <ErrorMessage className="error" name="name" component="div"/> */}
                <MyTextInput
                    label="Ваше имя"
                    id="name"
                    name="name"
                    type="text"
                />
                {/* <label htmlFor="email">Ваша почта</label>
                <Field
                    id="email"
                    name="email"
                    type="email"
                />
                <ErrorMessage className="error" name="email" component="div"/> */}
                <MyTextInput
                    label="Ваша почта"
                    id="email"
                    name="email"
                    type="email"
                />
                <label htmlFor="amount">Количество</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error" name="amount" component="div"/>
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className="error" name="currency" component="div"/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className="error" name="text" component="div"/>
                {/* <label className="checkbox">
                    <Field 
                        name="terms" 
                        type="checkbox"/>
                    Соглашаетесь с политикой конфиденциальности?
                </label>
                <ErrorMessage className="error" name="terms" component="div"/> */}
                <MyCheckbox
                    name="terms">
                        Соглашаетесь с политикой конфиденциальности?  {/* эта строка придет как children */} 
                </MyCheckbox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;