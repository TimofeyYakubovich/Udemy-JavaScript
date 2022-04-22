console.log(document.body);
console.log(document.head);
console.log(document.documentElement); // получение тега html //

console.log(document.body.childNodes); // получение псевдамассива из всех эелиментов body NodeList(6) [ #text, div.wrapper, #text, <!--  renernh  -->, #text, script ] //
                                       // #text - это перенос строки DOM - узел //
                                       // div.wrapper - DOM - элемент //
                                       // #text - это перенос строки DOM - узел //
                                       // <!--  renernh  --> - это комментарий DOM - узел //
                                       // #text - это перенос строки DOM - узел //
                                       // script - DOM - элемент //
                                       // childNodes позволяет получить все ноды которые находятся внутри родителя body //

console.log(document.body.firstChild); // firstChild получение первого узла в теге body - #text //
console.log(document.body.firstElementChild); // firstElementChild получение первого элемента в теге body - div.wrapper //
console.log(document.body.lastChild);  // firstChild получение последнего узла в теге body - script //
console.log(document.body.lastElementChild); // lastElementChild получение последнего элемента в теге body - script //

console.log(document.querySelector('#current').parentNode); // parentNode позволяет получить родителя элемента с ID - current тоесть div class="first"> //
console.log(document.querySelector('#current').parentElement); // parentElement позволяет получить родителя элемента с ID - current тоесть div class="first"> //
console.log(document.querySelector('#current').parentNode.parentNode); // получение родителя родителя //

console.log(document.querySelector('[data-current="3"]')); // получение элемента по дата атрибуту //
console.log(document.querySelector('[data-current="3"]').nextSibling); // получение следующего узла (ноду) тоесть текстовой ноды #text //
console.log(document.querySelector('[data-current="3"]').previousSibling); // получение предыдущего узла (ноду) тоесть текстовой ноды #text //
console.log(document.querySelector('[data-current="3"]').nextElementSibling); // получение следующего элемента - <li>4</li> //
console.log(document.querySelector('[data-current="3"]').previousElementSibling); // получение предыдущего элемента - <li>2</li> //

// иногда мы не можем использовать forEach потому что нужно прерывать цикл или пропускать одну итерацию //


for (let node of document.body.childNodes) { // перебираем все элементы в псевдомассиве //
    if (node.nodeName == '#text') { 
        continue;
    }

    console.log(node); // получаем только элементы (и коментарий потому то у него имя не '#text') без ткстовых нод //
}
