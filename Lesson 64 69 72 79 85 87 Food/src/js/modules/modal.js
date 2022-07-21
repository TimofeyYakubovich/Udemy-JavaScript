function modal() {

     //Modal

     const modalTrigger = document.querySelectorAll('[data-modal]'),
     modal = document.querySelector('.modal');
    //   modalCloseBtn = document.querySelector('[data-close]');

    // modalTrigger.forEach(btn => {
    //     btn.addEventListener('click', () => {
    //         // modal.style.display = 'block';
    //         // modal.classList.add('show');
    //         // modal.classList.remove('hide');
    //         // modal.classList.toggle('show');
    //         // document.body.style.overflow = 'hidden'; // запрещаем скролить страницу //
    //     });
    // });

    modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
    });

    function openModal () {
    // modal.classList.toggle('show');
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // запрещаем скролить страницу //
    clearInterval(modalTimerID); // сбрасываем setTimeout(openModal, 3000) //
    }

    // modalTrigger.addEventListener('click', () => {
    //     // modal.style.display = 'block';
    //     // modal.classList.add('show');
    //     // modal.classList.remove('hide');
    //     modal.classList.toggle('show');
    //     document.body.style.overflow = 'hidden'; // запрещаем скролить страницу //
    // });

    // modalCloseBtn.addEventListener('click', () => {
    //     // modal.style.display = 'none';
    //     // modal.classList.add('hide');
    //     // modal.classList.remove('show');
    //     modal.classList.toggle('show');
    //     document.body.style.overflow = ''; // разрешаем скролить страницу //
    // });

    // modalCloseBtn.addEventListener('click', closeModal);

    // modal.addEventListener('click', (e) => {
    //     if (e.target === modal) {
    //         modal.classList.toggle('show');
    //         document.body.style.overflow = '';
    //     }
    // });

    modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();
    }
    });

    function closeModal () {
    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');
    document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (e) => { // событие нажатия клавиши клавиатуры //
    if (e.code === "Escape" && modal.classList.contains('show')) { // e.code отслеживает код клавиши //
        closeModal();
    }
    });

    const modalTimerID = setTimeout(openModal, 5000);

    function showModalByScroll () {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { 
        // window.pageYOffset сколько пользователь отлистал страницу сверху //
        // document.documentElement.clientHeight высота видимой части страници //
        // document.documentElement.scrollHeight вся высота страници //
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
    }

    window.addEventListener('scroll', showModalByScroll);// если добавить {once: true} то даже если немного прокрутить колесико мыши событие сразу удалится //
                                                        // scroll отлавливает когда пользователь скролит страницу //


}

module.exports = modal;