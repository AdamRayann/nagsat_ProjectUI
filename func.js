const baseURI = "https://nagsat-project.onrender.com/";
function submitQuestion(qNum) {
    const questionBlock = document.getElementById(`question-block${qNum}`);
  const question = questionBlock.getAttribute('data-question');
  const corr_answer = questionBlock.getAttribute('data-corr-answer');
  const answer = document.getElementById(`answer${qNum}`).value.trim();
  console.log(question)
    if (!answer ) {
      alert('الرجاء كتابة إجابة قبل الإرسال.');
      return;
    }
  
    fetch('${baseURI}api/v1/0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: question,
        t_answer: corr_answer,
        s_answer: answer
      })
    })
    .then(response => {
      if (!response.ok) throw new Error('خطأ في الاتصال بالخادم');
      return response.json();
    })
    .then(data => {
      document.getElementById(`notes${qNum}`).value = data.feedback || 'لا توجد ملاحظات';
      document.getElementById(`score${qNum}`).value = data.score !== undefined ? data.score : '';
    })
    .catch(error => {
      console.error(error);
      alert('حدث خطأ أثناء إرسال الإجابة. الرجاء المحاولة لاحقاً.');
    });
  }
  

  function scratchHint(element) {
    let count = parseInt(element.getAttribute('data-scratch-count'), 10);
    let revealed = element.getAttribute('data-revealed') === 'true';
  
    if (revealed) return;
  
    count++;
    element.setAttribute('data-scratch-count', count);
  
    // Scratch threshold to reveal
    if (count >= 20) {
      element.classList.add('revealed');
      element.setAttribute('data-revealed', 'true');
  
      // Reset after 5 seconds
      setTimeout(() => {
        element.classList.remove('revealed');
        element.setAttribute('data-scratch-count', 0);
        element.setAttribute('data-revealed', 'false');
      }, 5000); // 5000 milliseconds = 5 seconds
    }
  }
  
  function insertChar(textareaId, char) {
    const textarea = document.getElementById(textareaId);
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
  
    // Insert the char at the cursor position
    textarea.value = text.slice(0, start) + char + text.slice(end);
    // Move cursor after inserted char
    textarea.selectionStart = textarea.selectionEnd = start + char.length;
    textarea.focus();
  }
  
  



  let insertMode = 'normal'; // current writing mode: normal, sub, sup

  function toggleHelper() {
    const helperBox = document.getElementById("helperBox");
    helperBox.classList.toggle("hidden");
  }
  

function setInsertMode(mode, textareaId) {
  insertMode = mode;

  // Update mode label
  const modeLabel = {
    normal: 'عادي',
    sub: 'أسفل',
    sup: 'أعلى'
  };
  document.getElementById('currentMode').textContent = `(وضع: ${modeLabel[mode]})`;

  // Highlight active button
  ['normal', 'sub', 'sup'].forEach(m => {
    document.getElementById(`btn-${m}`).classList.remove('active');
  });
  document.getElementById(`btn-${mode}`).classList.add('active');

  // 🔥 Refocus the textarea to keep typing smoothly
  const textarea = document.getElementById(textareaId);
  if (textarea) {
    textarea.focus();
  }
}

  
  
  function handleInsert(event, textareaId) {
    if (insertMode === 'normal') return; // let it behave normally
  
    const textarea = document.getElementById(textareaId);
    const char = event.key;
  
    event.preventDefault(); // block default character input
  
    let transformedChar = char;
  
    if (insertMode === 'sub') {
      transformedChar = toSubscript(char);
    } else if (insertMode === 'sup') {
      transformedChar = toSuperscript(char);
    }
  
    insertChar(textareaId, transformedChar);
  }
  
  function insertChar(textareaId, char) {
    const textarea = document.getElementById(textareaId);
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
  
    textarea.value = text.slice(0, start) + char + text.slice(end);
    textarea.selectionStart = textarea.selectionEnd = start + char.length;
    textarea.focus();
  }
  
  function toSubscript(char) {
    const map = {
      '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
      '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
      'a': 'ₐ', 'e': 'ₑ', 'o': 'ₒ', 'x': 'ₓ', 'h': 'ₕ',
      'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'p': 'ₚ',
      's': 'ₛ', 't': 'ₜ', '+': '₊', '-': '₋', '=': '₌',
      '(': '₍', ')': '₎'
    };
    return map[char.toLowerCase()] || char;
  }
  
  function toSuperscript(char) {
    const map = {
      '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
      '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
      'n': 'ⁿ', 'i': 'ⁱ'
    };
    return map[char.toLowerCase()] || char;
  }
  

  
