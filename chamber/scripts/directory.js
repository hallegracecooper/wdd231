async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        const directory = document.getElementById('directory');
        directory.innerHTML = "";

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card');
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">${member.website}</a>
                <p>Membership Level: ${member.membership}</p>
            `;
            directory.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function toggleView() {
    const directory = document.getElementById('directory');
    directory.classList.toggle('list-view');
    directory.classList.toggle('grid-view');
}

function updateFooterDates() {
    const lastModified = document.getElementById('lastModified');
    lastModified.textContent = document.lastModified;

    const copyrightYear = new Date().getFullYear();
    document.querySelector('footer').insertAdjacentHTML('beforeend', `<p>© ${copyrightYear}</p>`);
}

document.getElementById('toggleView').addEventListener('click', toggleView);

fetchMembers();
updateFooterDates();