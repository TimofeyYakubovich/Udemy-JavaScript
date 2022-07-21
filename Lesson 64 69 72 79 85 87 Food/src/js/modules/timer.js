function timer() {

    // Timer

    // const deadline = '2022-05-05';
    const deadline = new Date('2078-12-17');
    const day = new Date();
    // day.setHours(day.getHours() + (day.getTimezoneOffset()/-60));
    deadline.setFullYear(day.getFullYear());
    deadline.setMonth(day.getMonth());
    deadline.setDate(day.getDate() + 1);
    // console.log(day);
    // console.log(deadline);

    function getTimeReamining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), // разница между дедлайном и текущем временем //
              days = Math.floor(t / (1000 * 60 * 60 * 24)), // Math.floor округляет до целого // (1000 * 60 * 60 * 24) количесвто милисекунд в сутках // получаем сколько дней осталось до дедлайна //
              hours = Math.floor((t / (1000 * 60 * 60) % 24)), // t / (1000 * 60 * 60) получаем количество часов до дедлайна // % 24 делим на количество часов в сутках и получаем остаток //
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock (selector, endtime) {
        const time = document.querySelector(selector),
              days = time.querySelector('#days'),
              hours = time.querySelector('#hours'),
              minutes = time.querySelector('#minutes'),
              seconds = time.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock (); // запускаем функцию updateClock не дожидаясь 1000 миллисекунд что бы на странице не появлялись цифры с вёрстки

        function updateClock () {
            const t = getTimeReamining(endtime); // в переменную t помещается объект из функции getTimeReamining //

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours - 3);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

}

module.exports = timer;