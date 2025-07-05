const addWorkoutFab = document.getElementById('add-workout-fab');
const modalOverlay = document.getElementById('modal-overlay');
const addWorkoutForm = document.getElementById('add-workout-form');
const cancelBtn = document.getElementById('cancel-btn');
const workoutNameInput = document.getElementById('workout-name-input');
const workoutDescInput = document.getElementById('workout-desc-input');

function openModal() {
    modalOverlay.style.display = 'flex';
}

function closeModal() {
    modalOverlay.style.display = 'none';
}

addWorkoutFab.addEventListener('click', openModal);

cancelBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (event) => {
    // Se o clique for no fundo escuro, fecha o modal
    if (event.target === modalOverlay) {
        closeModal();
    }
});

addWorkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const workoutName = workoutNameInput.value.trim();
    const workoutDesc = workoutDescInput.value.trim();

    if (!workoutName) {
        alert("O nome do treino é obrigatório!");
        return;
    }

    console.log("Treino que vai ser adicionado:");
    console.log({ name: workoutName, description: workoutDesc });

    addWorkoutForm.reset();
    closeModal();
});