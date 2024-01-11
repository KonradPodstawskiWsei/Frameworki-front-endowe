let notes = JSON.parse(localStorage.getItem('notes')) || [];

function addNote() {
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
    const color = document.getElementById('note-color').value;
    const pin = document.getElementById('note-pin').checked;
    const tags = document.getElementById('note-tags').value.split(',').map(tag => tag.trim());
    const reminder = document.getElementById('note-reminder').value;
    const date = new Date().toISOString();

    const note = { title, content, color, pin, tags, reminder, date };
    notes.push(note);
    saveNotes();
    displayNotes();
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
    return notes;
}

function displayNotes() {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';
    notes.sort((a, b) => b.pin - a.pin);
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = `note ${note.pin ? 'pinned' : ''}`;
        noteElement.style.backgroundColor = note.color;
        noteElement.innerHTML = `
            <div class="note-title">${note.title}</div>
            <div class="note-content">${note.content}</div>
            <div class="note-tags">${note.tags.join(', ')}</div>
            <div class="note-footer">
                <div>${new Date(note.date).toLocaleDateString()}</div>
                ${note.reminder ? `<div>Reminder: ${new Date(note.reminder).toLocaleString()}</div>` : ''}
                <div class="delete-btn" onclick="deleteNote('${note.date}')">Delete</div>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function deleteNote(date) {
    notes = notes.filter(note => note.date !== date);
    saveNotes();
    displayNotes();
}

function searchNotes() {
    const query = document.getElementById('search-query').value.toLowerCase();
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.tags.some(tag => tag.toLowerCase().includes(query))
    );
    displaySearchedNotes(filteredNotes);
}

function displaySearchedNotes(filteredNotes) {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';
    filteredNotes.sort((a, b) => b.pin - a.pin);
    filteredNotes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = `note ${note.pin ? 'pinned' : ''}`;
        noteElement.style.backgroundColor = note.color;
        noteElement.innerHTML = `
            <div class="note-title">${note.title}</div>
            <div class="note-content">${note.content}</div>
            <div class="note-tags">${note.tags.join(', ')}</div>
            <div class="note-footer">
                <div>${new Date(note.date).toLocaleDateString()}</div>
                ${note.reminder ? `<div>Reminder: ${new Date(note.reminder).toLocaleString()}</div>` : ''}
                <div class="delete-btn" onclick="deleteNote('${note.date}')">Delete</div>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function checkReminders() {
    const currentDateTime = new Date();
    notes.forEach(note => {
        if (note.reminder && new Date(note.reminder) <= currentDateTime) {
            alert(`Reminder: ${note.title}`);
        }
    });
}

displayNotes();
setInterval(checkReminders, 30000);
