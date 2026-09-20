document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const reviewForm = document.getElementById('review-form');
  const formNote = document.getElementById('form-note');

  if (!reviewForm || !formNote) return;

  reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!reviewForm.checkValidity()) {
      reviewForm.reportValidity();
      return;
    }

    const fields = new FormData(reviewForm);
    const name = String(fields.get('name') || '').trim();
    const company = String(fields.get('company') || '').trim();
    const email = String(fields.get('email') || '').trim();
    const problem = String(fields.get('problem') || '').trim();
    const subject = 'Systems Review request' + (company ? ` — ${company}` : '');
    const body = [
      'Systems Review request',
      '',
      `Name: ${name}`,
      `Company / organization: ${company || 'Not provided'}`,
      `Email: ${email}`,
      '',
      'What is happening:',
      problem,
    ].join('\n');
    const recipient = ['jasonmilord1216', 'gmail.com'].join('@');

    formNote.textContent = 'Opening your email draft. Review it, then send when you are ready.';
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
