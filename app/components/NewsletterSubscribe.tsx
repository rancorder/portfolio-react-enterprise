'use client';

import { useState, FormEvent } from 'react';
import styles from './NewsletterSubscribe.module.css';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to subscribe');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>📬 新着記事をメールで受け取る</h3>
        <p className={styles.description}>
          最新の技術記事や情報をお届けします
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your-email@example.com"
          required
          disabled={status === 'loading'}
          className={styles.input}
          data-testid="newsletter-email-input"
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className={styles.button}
          data-testid="newsletter-submit-button"
        >
          {status === 'loading' ? (
            <>
              <span className={styles.spinner}></span>
              登録中...
            </>
          ) : (
            '購読する'
          )}
        </button>
      </form>

      {message && (
        <div
          className={`${styles.message} ${styles[status]}`}
          data-testid="newsletter-message"
          role="alert"
        >
          {status === 'success' ? '✅ ' : '❌ '}
          {message}
        </div>
      )}
    </div>
  );
}
