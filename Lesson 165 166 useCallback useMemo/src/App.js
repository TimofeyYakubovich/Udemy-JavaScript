import {Component, useState, useEffect, useCallback, useMemo} from 'react';
// импортируем хук useState
import {Container} from 'react-bootstrap';
import './App.css';

// дополнительные хуки useCallback

// представим что слайдер загружает для себя изображения посредством запроса на сервер
// для иметацит ьакова запроса есть функция getSomeImages каторая возврощает массив с 2 строками
// точно так же может вернуть сервер массив изображений на основании этих данных сформируем верстку

// const getSomeImages = () => {
//     console.log('fetching')
//     return [
//         "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
//         "https://klike.net/uploads  /posts/2019-05/1556708032_1.jpg"
//     ]
// }

// useMemo возвращяет мемоизированное значение

// в слайдере может быть написана дополнительная логика по вычислению какова либо значение допустим общего количества слайдов в функции countTotal
// и эту функцию будем использовать перед тем return как возвращать кусок верстки

const countTotal =(num) => {
    console.log('counting...')
    return num + 10;
}

const Slider = (props) => {

    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    const getSomeImages = useCallback(() => { // хук useCallback принимает 2 аргумента 1 - сама функция 2 - массив зависимостей
        console.log('fetching')
        return [
            "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
            "https://klike.net/uploads/posts/2019-05/1556708032_1.jpg"
        ]
    }, [slide]); 
    // но даже в таком случае при любом изменении стейта вызывается функция getSomeImages в ретюрне в кансоль выдает fetching
    // всё так же делается запрос на сервер
    // если пойти по логическому пути компанента то сначала срабатывает рендер внутри срабатывает функция getSomeImages
    // потом вызываеются эфекты и компанент ждёт изменений
    // когда мы меняем стейт то вызываем повторынй рендренг компанента оптяь вызыв функции getSomeImages и опять эфекты
    // тоесть вызыв функции всёравно будет каждый раз при изменении стейта потому что в ретюрне прописана функция со скобками getSomeImages()
    // тоесть четко вызыв функции
    // поэтому этот приём полезен при передаче дочернему компаненту каторый не должен каждый раз меняться
    // создадим дочерний компанент

    useEffect(() => {
        console.log('effect');
        document.title = `Slide: ${slide}`;
    }, []);

    function logging() {
        console.log('log');
    }

    useEffect(() => {
        console.log('use effect');
        document.title = `Slide: ${slide}`;
    }, [slide]);

    useEffect(() => {
        console.log('autoplay');
    }, [autoplay]);

    function changeSlide(i) {
        setSlide(slide => slide + i); 
    }

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay);
    }

    // const total = countTotal(slide);
    const total = useMemo(() => {
        return countTotal(slide);
    }, [slide]);

    // const style = {
    //     color: slide > 4 ? 'red' : 'black'
    // }

    const style = useMemo(() => ({ // в круглых скобках ({}) для сокращения синтексиса потому что передаем объект
        color: slide > 4 ? 'red' : 'black'
    }), [slide]);

    useEffect(() => { // когда у нас будет изменение стилей будет вызвана эта функция каторая выдаст в консоль styles!
        console.log('styles!')
    }, [style]);
    // в таком случае при изменении стейта autoplay в консль тоже выдает styles! хотя useEffect никак не завязан на autoplay
    // так происходит потому что когда запускается рендер компанента каждый раз в const style создается новый объект и так как в useEffect
    // в зависимости прописан объект style объекты передаются по ссылке и получается так что при каждом рендере у нас создается новый объект style
    // каторый не похож на предыдущий в JS если объекты содержат одинаковые внутренности это не значит что объекты равны они сравниваются оп ссылкам
    // и не равны друг другу поэтому в массиве зависимостей useEffect реакт думает что объект style поменялся и запускает функцию внутри
    // поэтому объект style надо закешировать что бы компанент его запомнил и изменял его только тогда когда когда поменяются его внутренности

    // поэтому помещаем объект в useMemo и в массив зависимостей прописываем slide потому что внутри проверяется только он
    // теперь если поменяется какой то другой стейт не slide то объект style меняться не будет и следвательно для useEffect style тоже не поменяется


    return (
        <Container>
            <div className="slider w-50 m-auto">
                {/* <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" /> */}

                {
                    // вызываем функцию getSomeImages она возвращает массив с адресами перебераем его мепом и вставоляем каждый url в верстку
                    // логичнее всего было бы помеместить этой действие в useEffect когда компанент создался он делает запрос на сервер получает
                    // ответ и на базе ответа строим верстку

                    // при каждом изменении стейта нажатиями кнопак каждый раз вызывается функция getSomeImages в кансоль выдает fetching
                    // если бы так реально грузились картинки с сервера то это очень сильная просадка по оптимизации
                    // происходит это потому что каждый раз при перересовке компанента вызывается return и вызывается функция getSomeImages
                    // поэтому нужно как то закешировать эту функцию что бы она вызывалась только один раз или только по надобности
                    // для этого и есть хук useCallback каторый Возвращает мемоизированный колбэк.
                    // импортируем useCallback

                    // getSomeImages().map((url, i) => {
                    //     return (
                    //         <img key={i} className="d-block w-100" src={url} alt="slide" />
                    //     )
                    // })
                }

                <Slide getSomeImages={getSomeImages}/>
                {/* передаем как пропс функцию getSomeImages 
                    теперь fetching выдает в кансоль тоесть идет запрос на сервер только при изменении состояния slide
                    если удалить slide из массива зависимостей в getSomeImages то fetching выдает только один раз при создании компанента и всё
                    при изменении стейта запрос не охудит
                    
                    так можно мемоизировать функции только когда мы передаем этй функцию во внутрь внутреннего компанента дочерне го*/}

                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                <div style={style} className="text-center mt-5">Total Slides: {total}</div>
                {
                    // перввый раз при создании компанента и при изменении состояния slide вызывется функция countTotal и это впрницпе логично
                    // но при изменении состояния autoplay так же вызывется функция countTotal хотя нам этого не нужно при изменении autoplay
                    // если в countTotal выполняются какие то сложные вычислительные процессы то это очень сильная просадка по оптимизации
                    // происходит это по той же причине что и прошлый раз каждый раз при перерендеренге компанента запускается функция countTotal
                    // что бы запомнить это значение total или вызывать его только тогда когда это нужно используется хук useMemo
                    // когда код доходит до переменной в каторой лежит хук useMemo внутри ее есть колбек функция каторая возврощает мемоизированное
                    // тоесть запомненое каторое компанент помнит значение каторое попадает в эту переменную total
                    // когда меняется какой то стейт или пропс компанент начинает перерендориваться и если изменился стейт каторый не входит в массив
                    // зависимостей то эта переменная total остается прежней не пересчитывается
                    // если оставить массив зависимостей пустым то функция вызовется только один раз при создании компанента

                    // с помощью useMemo мы закешировали значение total
                    // с помощью useCallback мы закешировали функцию 

                    // в useMemo нельзя помещать побочные эфекты типа запросов и подписак так как этот хук запускается во время рендеренга

                    // приминение useMemo с объектами можно мемоизировать объекты для их правильной работы
                }
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                        {/* теперь ненадо обращаться к методам через this.state */}
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => { // компанент буде принимать функцию как пропс
    const [images, setImages] = useState([]); // состояние изночальное пустой массив

    // когда этот компанет будет создан и если вдруг он начнет обновляться то вызывается useEffect меняется количесво изображений внутри слайдера
    useEffect(() => {
        setImages(getSomeImages()) // устанавливаем состояние images, внутри setImages делаем запрос на сервер getSomeImages()
        // таким образом функция setImages установит массив с картинками
    }, [getSomeImages]); 
    // в массив зависимостей пропишем пропс функцию по получению изображений если она измениться только тогда запустим 
    // useEffect повторно делаем запрос на сервер

    return(
        <>
            {images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)}
            {/* в images попадает массив с путями перебираем его мепом и создаём верстку картинок */}
        </>
    )
}


function App() {
    return (
        <Slider/>
    );
}

export default App;
