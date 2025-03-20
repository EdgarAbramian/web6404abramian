document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        let errorMessage = '';
        if (!name) {
            errorMessage += 'Введите ваше имя.\n';
        }
        if (!validateEmail(email)) {
            errorMessage += 'Введите корректный e-mail.\n';
        }
        if (!message) {
            errorMessage += 'Введите сообщение.\n';
        }

        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        // Отправка данных с помощью Fetch API
        fetch('/submit_form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка отправки формы');
                }
                return response.json();
            })
            .then(data => {
                alert('Форма отправлена успешно!');
                form.reset(); 
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке формы. Попробуйте позже.');
            });
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});