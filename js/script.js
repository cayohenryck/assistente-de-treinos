const addWorkoutFab = document.getElementById('add-workout-fab');
const modalOverlay = document.getElementById('modal-overlay');
const addWorkoutForm = document.getElementById('add-workout-form');
const cancelBtn = document.getElementById('cancel-btn');
const workoutNameInput = document.getElementById('workout-name-input');
const workoutDescInput = document.getElementById('workout-desc-input');
const workoutContainer = document.getElementById('workout-container');


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

    const workoutToAdd = {
        title: workoutNameInput.value,
        description: workoutDescInput.value,
    };

    workouts.push(workoutToAdd);
    renderWorkout();
    saveWorkout();

    addWorkoutForm.reset();
    closeModal();
});

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

const defaultWorkout = [
    {
    title: "Braços - Segunda feira",
    description: "Rosca direta (3x12), rosca martelo (3x10-12), rosca concentrada unilateral (3x10), tríceps testa com halteres (3x12), tríceps coice (3x10-12) e mergulho no banco (3x10-15).",
    },
];

const savedWorkouts = localStorage.getItem('workouts-saved');

let workouts = savedWorkouts ? JSON.parse(savedWorkouts) : defaultWorkout;

function saveWorkout() {
    localStorage.setItem('workouts-saveds', JSON.stringify(workouts));
}

function renderWorkout(){
    const workoutCardsHTML = workouts.map(workout => {
        return `<div class="workout-card">
                    <h4 class="card-title title">${workout.title}</h3>
                    <div class="info-repetition-container item-individual-container">
                        <!-- <h5 class="exercises-number-title title">NÚMERO DE EXERCICIOS: </h5>
                         <p class="exercises-number desc">5</p>-->
                    </div>
                    <div class="description-container item-individual-container">
                        <p class="desc">${workout.description}</p>
                        <button class="remove-btn" data-title="${workout.title}">X</button>
                    </div>
                </div>
                `
    });

    const containerHTML = workoutCardsHTML.join('');
    workoutContainer.innerHTML = containerHTML;
};

workoutContainer.addEventListener('click', (event) => {
    const clickElement = event.target;
    const removeButton = clickElement.closest('.remove-btn');

    if (removeButton){
        const workoutToRemove = removeButton.dataset.title;

        workouts = workouts.filter(workout => workout.title !== workoutToRemove);
        
        renderWorkout();
        saveWorkout();
    }
})

renderWorkout();
