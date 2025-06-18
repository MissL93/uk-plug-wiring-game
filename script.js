const wires = document.querySelectorAll('.wire');
const terminals = document.querySelectorAll('.terminal');
const result = document.getElementById('result');

wires.forEach(wire => {
  wire.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', wire.id);
  });
});

terminals.forEach(terminal => {
  terminal.addEventListener('dragover', e => {
    e.preventDefault();
  });

  terminal.addEventListener('drop', e => {
    e.preventDefault();
    const wireId = e.dataTransfer.getData('text/plain');
    const wire = document.getElementById(wireId);
    terminal.appendChild(wire);
  });
});

function checkWiring() {
  let correct = 0;
  terminals.forEach(terminal => {
    const wire = terminal.querySelector('.wire');
    if (wire && wire.dataset.target === terminal.id) {
      correct++;
    }
  });
  result.textContent = correct === 3 ? "✅ Correct wiring!" : "❌ Try again!";
}

document.getElementById('quiz-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const answer = document.querySelector('input[name="q1"]:checked');
  const quizResult = document.getElementById('quiz-result');
  if (answer && answer.value === "green") {
    quizResult.textContent = "✅ Correct!";
  } else {
    quizResult.textContent = "❌ Incorrect. The correct answer is Green/Yellow.";
  }
});
