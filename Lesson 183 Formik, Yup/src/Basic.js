import { Formik } from 'formik';

// имопртируем компанент Formik главный компанент для работы с формой

// сдесь в этом примере есть кмпанент Basic
// в нем в главном диве есть заголовок 1 порядка и в кмпаненте Formik обернута форма у кторый 2 инпута и кнопка
// у кмпанента Formik есть пропсы

// initialValues первичные значения с которыми форма будет появляться на странице это объект с полями initialValues={{ email: '', password: '' }}
// и они должны соответствовать атрибуту name в инпутах формы бывает и связь по атрибуту id

// validate в validate передается функция по валидации каждого интерактивного элимента каторые есть в форме
// эта функция принимает values это значение из формы типа объекта { email: '', password: '' }
// эта функция может быть любая в зависимости от валидации формы

// onSubmit принимает функцию в котороый обычно происходят главные действия формы восновном это отправка данных куда то или еще что то
// в этой функции так же может быть что угодно формирование формата json файла из формдейты и тд.
// onSubmit та функция каторя будет взываться при нажатии Enter или button

// дальше вызываем фнкцию в каторой диструктурируем объект со занчениями каторые будут приходить в фрму
// тоесть тут будет двухсторонняя связь изменяется стейт в форме а стейт отображается в форме value и тд.
// получается контралируемый элимент

const Basic = () => (
    <div>
      <h1>Anywhere in your app!</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {}; // пустой объект ошибок
          if (!values.email) { // если в значениях каторые пришли из формы нет поля email тоесть оно пустое
            errors.email = 'Required'; // то в объекте errors созалем свойство email и в него записываем 'Required'
          } else if (  // если email заполнен идет проверка подходит ли написаный email по нужному формату
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) // например проверка по такому формату test@gmail.com
            // ^[A-Z0-9._%+-]+ набор смоволов каторый может быть потом @ потом еще набор смоволов [A-Z0-9.-]+\ точка . и еще набор смоволов [A-Z]{2,}
          ) {  // если такая проверка тоже не проходит то в errors.email записываем 'Invalid email address'
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
 
        {({ // первые скобки { это выражение JSX потом функция ({}) и из функции диструктурируем объект со занчениями каторые будут приходить в фрму
          values,  // значения каторые есть у формы инпутов
          errors,  // объект с ошибками
          touched,
          handleChange,  // событие если какойто элимент формы изменяется
          handleBlur,    // событие элимент уходит из фокуса
          handleSubmit,  // событие форма сабмитится
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}> {/* на форму навешиваем обработчик onSubmit и в нем будет вызываться handleSubmit он связан с onSubmit */}
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email} // в value передаем values.email каторый приходит из initialValues
            />
            {errors.email && touched.email && errors.email}
            {/* если в инпуте возникла какая то ошибка то отображается строка каторая попала в errors.email но отобразить можно что угодно
            например компанент с ошибкой и тд. */}
            <input
              type="password"
              name="password"
              onChange={handleChange} // в инпутах поворяются пропсы
              onBlur={handleBlur}
              value={values.password}
              // в инпутах поворяются пропсы поэтому в библиотеке есть готовые компаненты Form, Field, ErrorMessage
              // эти компаненты можно использовать через контекст, контекст уже встроен в библиотеку насртаивать его не нужно
              // компанент Form это сама фрма просто пощается в формик
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );





//   const Basic1 = () => (
//     <div>
//       <h1>Any place in your app!</h1>
//       <Formik
//         initialValues={{ email: '', password: '' }}
//         validate={values => {
//           const errors = {};
//           if (!values.email) {
//             errors.email = 'Required';
//           } else if (
//             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//           ) {
//             errors.email = 'Invalid email address';
//           }
//           return errors;
//         }}
//         onSubmit={(values, { setSubmitting }) => {
//           setTimeout(() => {
//             alert(JSON.stringify(values, null, 2));
//             setSubmitting(false);
//           }, 400);
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <Field type="email" name="email" />
//             <ErrorMessage name="email" component="div" />
//             <Field type="password" name="password" />
//             <ErrorMessage name="password" component="div" />
//             <button type="submit" disabled={isSubmitting}>
//               Submit
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );

export default Basic;






