let editIndex = null;

const form = document.getElementById("event-form");
const eventList = document.getElementById("event-list");

let events = JSON.parse(localStorage.getItem("events")) || [];

function renderEvents() {
    eventList.innerHTML = "";

    if (events.length === 0) {
        eventList.innerHTML = "<p>No events yet. Add one to get started.</p>";
        return;
    }

    events.forEach((event, index) => {
        const div = document.createElement("div");
        div.classList.add("event");

        div.innerHTML = `
            <div class="event-info">
                <h3>${event.title}</h3>
                <small>${event.date} • ${event.time} • ${event.location}</small>
                <p>${event.notes}</p>
            </div>
            <div>
                <button onclick="editEvent(${index})">Edit</button>
                <button onclick="deleteEvent(${index})">Delete</button>
            </div>
        `;

        eventList.appendChild(div);
    });
}

function deleteEvent(index) {
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    renderEvents();
}

function editEvent(index) {
    const event = events[index];

    document.getElementById("title").value = event.title;
    document.getElementById("date").value = event.date;
    document.getElementById("time").value = event.time;
    document.getElementById("location").value = event.location;
    document.getElementById("notes").value = event.notes;

    editIndex = index;
    form.querySelector("button").textContent = "Update Event";
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newEvent = {
        title: document.getElementById("title").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        location: document.getElementById("location").value,
        notes: document.getElementById("notes").value
    };

    if (editIndex === null) {
        events.push(newEvent);
    } else {
        events[editIndex] = newEvent;
        editIndex = null;
        form.querySelector("button").textContent = "Add Event";
    }

    localStorage.setItem("events", JSON.stringify(events));
    form.reset();
    renderEvents();
});

// Initial render
renderEvents();
