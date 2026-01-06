// ============================================
// JAVASCRIPT ДЛЯ ИГРЫ В КАРТОЧКИ
// ============================================

// Утилиты
const CardGame = {
    // Показать уведомление
    showNotification(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
        alertDiv.style.zIndex = '9999';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    },
    
    // Форматирование даты
    formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    },
    
    // Подтверждение действия
    confirm(message) {
        return window.confirm(message);
    },
    
    // Анимация появления элементов
    animateElements() {
        const elements = document.querySelectorAll('.fade-in-up');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    el.style.transition = 'all 0.5s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    },
    
    // Сохранить ответ локально (на случай перезагрузки)
    saveAnswerDraft(cardId, text) {
        localStorage.setItem(`answer_draft_${cardId}`, text);
    },
    
    // Загрузить черновик ответа
    loadAnswerDraft(cardId) {
        return localStorage.getItem(`answer_draft_${cardId}`) || '';
    },
    
    // Удалить черновик
    clearAnswerDraft(cardId) {
        localStorage.removeItem(`answer_draft_${cardId}`);
    },
    
    // Проверка статуса игры (polling)
    startPolling(sessionId, callback, interval = 5000) {
        return setInterval(() => {
            fetch(`/api/card-game/session/${sessionId}/status`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        callback(data);
                    }
                })
                .catch(err => console.error('Polling error:', err));
        }, interval);
    },
    
    // Остановить polling
    stopPolling(intervalId) {
        if (intervalId) {
            clearInterval(intervalId);
        }
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Анимация элементов
    CardGame.animateElements();
    
    // Автосохранение черновиков ответов
    const answerTextareas = document.querySelectorAll('textarea[id^="answer-"]');
    answerTextareas.forEach(textarea => {
        const cardId = textarea.id.replace('answer-', '');
        
        // Загрузить черновик
        const draft = CardGame.loadAnswerDraft(cardId);
        if (draft) {
            textarea.value = draft;
        }
        
        // Сохранять при вводе
        textarea.addEventListener('input', function() {
            CardGame.saveAnswerDraft(cardId, this.value);
        });
    });
    
    // Tooltip для подсказок
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Экспорт для использования в шаблонах
window.CardGame = CardGame;
