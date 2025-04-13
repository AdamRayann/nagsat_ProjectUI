window.onload = function () {
  fetch('exams/test_1.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('test-title').textContent = data.title || "امتحان";

      const container = document.getElementById('questions-container');
      data.questions.forEach(q => {
        const qBlock = document.createElement('div');
        qBlock.className = 'question-block';
        qBlock.id = `question-block${q.id}`;
        qBlock.setAttribute('data-question', q.question);
        qBlock.setAttribute('data-corr-answer', q.correct_answer);

        qBlock.innerHTML = `
          <div class="question-text">${q.question}</div>

          <label for="answer${q.id}">إجابة الطالب:</label>

          <div id="helperBox${q.id}" class="input-helper">
            <button id="btn-normal" onclick="setInsertMode('normal', 'answer${q.id}')">عادي</button>
            <button id="btn-sub" onclick="setInsertMode('sub', 'answer${q.id}')">أسفل</button>
            <button id="btn-sup" onclick="setInsertMode('sup', 'answer${q.id}')">أعلى</button>
            <button onclick="insertChar('answer${q.id}', '→')">→</button>
            <span id="currentMode" style="font-weight: bold;">(وضع: عادي)</span>
          </div>

          <textarea id="answer${q.id}" class="chemical-input" placeholder="اجب هنا:" onkeypress="handleInsert(event, 'answer${q.id}')"></textarea>

          <label for="notes${q.id}">ملاحظات المعلم الافتراضي:</label>
          <textarea id="notes${q.id}" rows="2" placeholder="ملاحظات حول الإجابة..." readonly></textarea>

          <label for="score${q.id}">الدرجة:</label>
          <input type="number" id="score${q.id}" min="0" max="100" placeholder="من 100" readonly>

          <button onclick="submitQuestion(${q.id})">فحص</button>
        `;

        container.appendChild(qBlock);
      });
    })
    .catch(error => {
      console.error("فشل تحميل الأسئلة:", error);
    });
};
