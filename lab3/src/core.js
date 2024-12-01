function isInteger(n) {
    return (n | 0) === n;
}

function even() {
    return Array.from({ length: 10 }, (_, i) => (i + 1) * 2);
}

function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function recSumTo(n) {
    return n === 1 ? 1 : n + recSumTo(n - 1);
}

function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}

function isBinary(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

function fibonacci(n) {
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
    let storedValue = initialValue;
    return operatorFn
        ? (newValue) => (storedValue = operatorFn(storedValue, newValue))
        : () => storedValue;
}

function sequence(start = 0, step = 1) {
    let current = start - step;
    return () => {
        current += step;
        return current;
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
