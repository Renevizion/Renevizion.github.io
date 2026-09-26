document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const inquiryForm = document.getElementById('review-form');
  const formNote = document.getElementById('form-note');
  const submitButton = inquiryForm?.querySelector('button[type="submit"]');
  if (!inquiryForm || !formNote || !submitButton) return;

  inquiryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!inquiryForm.checkValidity()) {
      inquiryForm.reportValidity();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    formNote.className = 'form-note is-pending';
    formNote.textContent = 'Sending your message…';

    try {
      const response = await fetch(inquiryForm.action, {
        method: 'POST',
        body: new FormData(inquiryForm),
        headers: { Accept: 'application/json' },
      });
      const result = await response.json();
      if (!response.ok || result.success !== 'true') throw new Error(result.message || 'Submission failed');

      inquiryForm.reset();
      formNote.className = 'form-note is-success';
      formNote.textContent = 'Message sent. We’ll review it and get back to you by email.';
      submitButton.textContent = 'Message sent';
    } catch (error) {
      formNote.className = 'form-note is-error';
      formNote.textContent = 'We couldn’t send your message right now. Please try again or email us directly.';
      submitButton.disabled = false;
      submitButton.textContent = 'Try again ↗';
    }
  });
});
