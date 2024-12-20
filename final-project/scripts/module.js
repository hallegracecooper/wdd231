export function setLocalStorageItem(key, value) {
    localStorage.setItem(key, value);
}

export function getLocalStorageItem(key) {
    return localStorage.getItem(key);
}

export function createItemCard(item, type) {
    return `
        <div class="${type}-item">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
            <h3>${item.name}</h3>
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>${type === 'recipe' ? 'Calories' : 'Type'}:</strong> ${type === 'recipe' ? item.calories + ' kcal' : item.type}</p>
            <p><strong>${type === 'recipe' ? 'Protein' : 'Duration'}:</strong> ${type === 'recipe' ? item.protein : item.duration}</p>
        </div>
    `;
}
