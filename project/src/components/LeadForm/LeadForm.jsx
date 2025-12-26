// src/components/FormFooter/FormFooter.jsx
import React, { useState } from 'react';
import "../../styles/LeadForm.css";

export default function FormFooter() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    agreement: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!/^[\d+\-\s()]{10,}$/.test(formData.phone.replace(/[\s\-()]/g, ''))) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!formData.agreement) {
      newErrors.agreement = 'Необходимо согласие на обработку данных';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/mykygola', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: 'Заявка на поддержку сайта',
          _replyto: formData.email
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
          agreement: false
        });
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <>
      <section className="form-section" id="form">
        <div className="container">
          <div className="form-wrapper">
            {/* Левая часть - контактная информация */}
            <div className="form-info">
              <div className="info-header">
                <h2 className="info-title">
                  Оставить заявку на
                  <br />
                  <span className="highlight">поддержку сайта</span>
                </h2>
                <div className="info-content">
                  <p>
                    Срочно нужна поддержка сайта? Ваша команда не успевает
                    справиться самостоятельно или предыдущий подрядчик не
                    справился с работой? Тогда вам точно к нам!
                  </p>
                  <p>
                    Просто оставьте заявку и наш менеджер с вами свяжется!
                  </p>
                </div>
              </div>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-content">
                    <h3 className="contact-label">Телефон</h3>
                    <a href="tel:+79991234567" className="contact-value">
                      +7 (999) 123-45-67
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-content">
                    <h3 className="contact-label">Email</h3>
                    <a href="mailto:support@it-academy.ru" className="contact-value">
                      support@it-academy.ru
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая часть - форма */}
            <div className="form-container">
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Иван Иванов"
                    required
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="example@mail.ru"
                    required
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Комментарий
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Опишите вашу задачу или вопрос..."
                    rows="4"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <label htmlFor="agreement" className="checkbox-label">
                    Я соглашаюсь с обработкой персональных данных
                  </label>
                  {errors.agreement && (
                    <span className="error-message">{errors.agreement}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </button>

                {submitStatus === 'success' && (
                  <div className="success-message">
                    ✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="error-message">
                    ❌ Ошибка отправки. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo-text">IT Academy</div>
              <p className="footer-tagline">
                Обучение IT-профессиям с гарантией результата
              </p>
            </div>

            <div className="footer-links">
              <div className="links-column">
                <h3 className="links-title">Обучение</h3>
                <a href="#direction" className="footer-link">Направления</a>
                <a href="#mentors" className="footer-link">Менторы</a>
                <a href="#pricing" className="footer-link">Тарифы</a>
                <a href="#tasks" className="footer-link">Задачи</a>
              </div>

              <div className="links-column">
                <h3 className="links-title">О нас</h3>
                <a href="#reviews" className="footer-link">Отзывы</a>
                <a href="#form" className="footer-link">Контакты</a>
                <a href="#" className="footer-link">FAQ</a>
                <a href="#" className="footer-link">Блог</a>
              </div>

              <div className="links-column">
                <h3 className="links-title">Контакты</h3>
                <a href="tel:+79991234567" className="footer-link">+7 (999) 123-45-67</a>
                <a href="mailto:info@it-academy.ru" className="footer-link">info@it-academy.ru</a>
                <div className="social-links">
                  <a href="#" className="social-link" aria-label="Telegram">📱</a>
                  <a href="#" className="social-link" aria-label="VKontakte">👥</a>
                  <a href="#" className="social-link" aria-label="YouTube">▶️</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">
              © 2024 IT Academy. Все права защищены.
            </div>
            <div className="legal-links">
              <a href="#" className="legal-link">Политика конфиденциальности</a>
              <a href="#" className="legal-link">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}