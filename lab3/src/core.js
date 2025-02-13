function isInteger(n) {
    return (n | 0) === n; // n | 0 - битовый оператор ИЛИ, преобразует число в 32-битное целое число
}

function even() {       // length       callback function 
    return Array.from({ length: 10 }, (_, i) => (i + 1) * 2); // Создаем массив из 10 элементов, каждый элемент - четное число 
}

function sumTo(n) { // Сумма чисел от 1 до n
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function recSumTo(n) { // Сумма чисел от 1 до n через рекурсию
    return n === 1 ? 1 : n + recSumTo(n - 1);
}

function factorial(n) { // Факториал числа n через рекурсию
    return n === 0 ? 1 : n * factorial(n - 1);
}

function isBinary(n) { // Проверка, является ли число степенью двойки
    //      число > 0 и побитовое И числа и числа - 1 равно 0 елси степень двойки
    return n > 0 && (n & (n - 1)) === 0;
}

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

function getOperationFn(initialValue, operatorFn) {  
    let storedValue = initialValue;  // Инициализация переменной для хранения текущего значения
    return operatorFn
        ? (newValue) => (storedValue = operatorFn(storedValue, newValue)) // Если передана operatorFn, выполняем операцию
        : () => storedValue; // Если operatorFn не передана, возвращаем текущее значение
}


function sequence(start = 0, step = 1) {
    let current = start - step; // Начинаем на один шаг "назад"
    return () => {
        current += step; // Увеличиваем на step
        return current;  // Возвращаем текущее значение
    };
}

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
