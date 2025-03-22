/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
    return (n | 0) === n; // n | 0 - битовый оператор ИЛИ, преобразует число в 32-битное целое число
}

/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {       // length       callback function 
    return Array.from({ length: 10 }, (_, i) => (i + 1) * 2); // Создаем массив из 10 элементов, каждый элемент - четное число 
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {*} n
 */
function sumTo(n) { // Сумма чисел от 1 до n
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 */
function recSumTo(n) { // Сумма чисел от 1 до n через рекурсию
    return n === 1 ? 1 : n + recSumTo(n - 1);
}

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {*} n
 */
function factorial(n) { // Факториал числа n через рекурсию
    return n === 0 ? 1 : n * factorial(n - 1);
}

/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */
function isBinary(n) { // Проверка, является ли число степенью двойки
    //      число > 0 и побитовое И числа и числа - 1 равно 0 елси степень двойки
    return n > 0 && (n & (n - 1)) === 0;
}

/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) { // Число Фибоначчи через цикл
    if (n <= 1) return n;
    let a = 0, b = 1, temp;
    for (let i = 2; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    let storedValue = initialValue;  // Инициализация переменной для хранения текущего значения
    return operatorFn
        ? (newValue) => (storedValue = operatorFn(storedValue, newValue)) // Если передана operatorFn, выполняем операцию
        : () => storedValue; // Если operatorFn не передана, возвращаем текущее значение
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
    let current = start - step; // Начинаем на один шаг "назад"
    return () => {
        current += step; // Увеличиваем на step
        return current;  // Возвращаем текущее значение
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    // Специальная обработка для NaN
    if (typeof firstObject === 'number' && typeof secondObject === 'number') {
        if (isNaN(firstObject) && isNaN(secondObject)) {
            return true;
        }
    }

    // Быстрая проверка идентичности (включает обработку примитивов)
    if (firstObject === secondObject) {
        return true;
    }

    // Если один из аргументов null или не объект, сравнение завершится
    if (
        firstObject === null || typeof firstObject !== 'object' ||
        secondObject === null || typeof secondObject !== 'object'
    ) {
        return false;
    }

    // Получаем ключи для обоих объектов
    const keysA = Object.keys(firstObject);
    const keysB = Object.keys(secondObject);

    // Сравниваем количество ключей
    if (keysA.length !== keysB.length) return false;

    // Проверяем ключи и значения рекурсивно
    for (const key of keysA) {
        if (!keysB.includes(key) || !deepEqual(firstObject[key], secondObject[key])) {
            return false;
        }
    }

    return true;
}





module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
