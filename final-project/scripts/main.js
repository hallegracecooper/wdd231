import { setLocalStorageItem, getLocalStorageItem, createItemCard } from './module.js';

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');

    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('hidden');
    });

    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const inspirationModal = document.getElementById('inspirationModal');

    if (openModalBtn && closeModalBtn && inspirationModal) {
        openModalBtn.addEventListener('click', () => {
            inspirationModal.showModal();
        });

        closeModalBtn.addEventListener('click', () => {
            inspirationModal.close();
        });
    }

    const saveThemeBtn = document.getElementById('saveThemeBtn');
    const themeInput = document.getElementById('themeInput');
    const themeMessage = document.getElementById('themeMessage');

    function applyPreferredTheme() {
        const preferredTheme = getLocalStorageItem('preferredTheme');
        if (preferredTheme === 'light' || preferredTheme === 'dark') {
            document.body.setAttribute('data-theme', preferredTheme);
            if(themeMessage) {
                themeMessage.textContent = `Applied saved theme: ${preferredTheme}.`;
            }
        } else {
            if(themeMessage) {
                themeMessage.textContent = 'No saved theme found.';
            }
        }
    }

    if (saveThemeBtn && themeInput && themeMessage) {
        saveThemeBtn.addEventListener('click', () => {
            const theme = themeInput.value.trim().toLowerCase();
            if (theme === 'light' || theme === 'dark') {
                setLocalStorageItem('preferredTheme', theme);
                themeMessage.textContent = `Theme saved as ${theme}.`;
            } else {
                themeMessage.textContent = 'Please enter either "light" or "dark".';
            }
        });
    }

    const recipesContainer = document.getElementById('recipes-container');
    const exercisesContainer = document.getElementById('exercises-container');

    async function loadData() {
        try {
            const response = await fetch('data/data.json');
            const data = await response.json();

            if (recipesContainer && data.recipes) {
                const recipesHTML = data.recipes.map(recipe => createItemCard(recipe, 'recipe')).join('');
                recipesContainer.innerHTML = recipesHTML;
            }

            if (exercisesContainer && data.exercises) {
                const exercisesHTML = data.exercises.map(ex => createItemCard(ex, 'exercise')).join('');
                exercisesContainer.innerHTML = exercisesHTML;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    loadData();
    applyPreferredTheme();
});
