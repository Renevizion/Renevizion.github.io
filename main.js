document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const inquiryForm = document.getElementById('review-form');
  const formNote = document.getElementById('form-note');

  if (!inquiryForm || !formNote) return;

  inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!inquiryForm.checkValidity()) {
      inquiryForm.reportValidity();
      return;
    }

    const fields = new FormData(inquiryForm);
    const name = String(fields.get('name') || '').trim();
    const company = String(fields.get('company') || '').trim();
    const email = String(fields.get('email') || '').trim();
    const situation = String(fields.get('problem') || '').trim();
    const subject = 'Project inquiry for Milocro' + (company ? ` — ${company}` : '');
    const body = [
      'Milocro project inquiry',
      '',
      `Name: ${name}`,
      `Company / organization: ${company || 'Not provided'}`,
      `Email: ${email}`,
      '',
      'What they are looking to build:',
      situation,
    ].join('\n');
    const recipient = ['jasonmilord1216', 'gmail.com'].join('@');

    formNote.textContent = 'Opening your email draft. Review it, then send when you are ready.';
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
