const adviceItems = [
  {
    topic: 'Exam Stress',
    title: 'How to calm down before exams',
    tip: 'Try 25-minute study blocks, then 5-minute breaks. Sleep before revision day.'
  },
  {
    topic: 'Bullying',
    title: 'What to do if bullying starts',
    tip: 'Save evidence, tell a trusted adult, and avoid facing it alone.'
  },
  {
    topic: 'Friendship Issues',
    title: 'Handling friendship drama',
    tip: 'Use clear and kind language. Set boundaries and speak privately.'
  },
  {
    topic: 'Mental Health',
    title: 'When you feel overwhelmed',
    tip: 'Name what you feel, breathe slowly, and reach out to support immediately.'
  },
  {
    topic: 'Study Habits',
    title: 'Build a study routine that sticks',
    tip: 'Choose one daily study slot and track small wins to stay consistent.'
  }
];

const adviceGrid = document.getElementById('adviceGrid');
const search = document.getElementById('search');
const filterTopic = document.getElementById('filterTopic');
const adviceForm = document.getElementById('adviceForm');
const formMessage = document.getElementById('formMessage');

function renderAdvice(list) {
  adviceGrid.innerHTML = '';

  if (!list.length) {
    adviceGrid.innerHTML = '<p class="card">No advice found for this search.</p>';
    return;
  }

  list.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card advice-card';
    card.innerHTML = `
      <span class="pill">${item.topic}</span>
      <h4>${item.title}</h4>
      <p>${item.tip}</p>
    `;
    adviceGrid.appendChild(card);
  });
}

function filterAdvice() {
  const term = search.value.trim().toLowerCase();
  const selectedTopic = filterTopic.value;

  const filtered = adviceItems.filter((item) => {
    const matchesTopic = selectedTopic === 'all' || item.topic === selectedTopic;
    const matchesTerm =
      !term ||
      item.title.toLowerCase().includes(term) ||
      item.tip.toLowerCase().includes(term) ||
      item.topic.toLowerCase().includes(term);

    return matchesTopic && matchesTerm;
  });

  renderAdvice(filtered);
}

search.addEventListener('input', filterAdvice);
filterTopic.addEventListener('change', filterAdvice);

adviceForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!adviceForm.checkValidity()) {
    formMessage.textContent = 'Please fill in all required fields.';
    formMessage.style.color = '#d32f2f';
    return;
  }

  const request = {
    topic: document.getElementById('topic').value,
    grade: document.getElementById('grade').value,
    question: document.getElementById('question').value,
    anonymous: document.getElementById('anonymous').checked,
    submittedAt: new Date().toISOString()
  };

  localStorage.setItem('latestAdviceRequest', JSON.stringify(request));

  formMessage.textContent = 'Request sent successfully. A staff member will review it soon.';
  formMessage.style.color = '#147a3f';
  adviceForm.reset();
  document.getElementById('anonymous').checked = true;
});

document.getElementById('year').textContent = new Date().getFullYear();
renderAdvice(adviceItems);
