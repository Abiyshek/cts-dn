console.log("Welcome to the Community Portal");

window.addEventListener('DOMContentLoaded', (event) => {
    alert("Welcome! The Local Community Event Portal has fully loaded.");
    initPortal();
});

const systemLogs = [];
function addLog(message) {
    const timestamp = new Date().toLocaleTimeString();
    const formattedLog = `[${timestamp}] ${message}`;
    systemLogs.unshift(formattedLog);
    console.log(formattedLog);
    
    const logContainer = document.getElementById("logContainer");
    if (logContainer) {
        logContainer.innerHTML = systemLogs.map(log => `<div>${log}</div>`).join('');
    }
}

function demonstrateVariables() {
    addLog("--- Demonstrating Syntax & Data Types (Exercise 2) ---");
    const eventName = "Summer Jazz Picnic";
    const eventDate = "2026-07-15";
    let availableSeats = 50;

    const eventInfo = `Event: "${eventName}" scheduled on ${eventDate}. Seats: ${availableSeats}`;
    addLog(eventInfo);

    addLog("Simulating a registration...");
    availableSeats--;
    addLog(`Seat registered! Updated remaining seats: ${availableSeats}`);
}

class CommunityEvent {
    constructor(id, title, category, location, date, seats, description = "No description provided.") {
        this.id = id;
        this.title = title;
        this.category = category;
        this.location = location;
        this.date = date;
        this.seats = seats;
        this.description = description;
    }
}

CommunityEvent.prototype.checkAvailability = function() {
    return this.seats > 0;
};

CommunityEvent.prototype.logDetails = function() {
    addLog(`Listing Object Entries for: "${this.title}"`);
    const entries = Object.entries(this);
    entries.forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
    return entries;
};

let globalEvents = [];

function createRegistrationTracker() {
    const categoryCounts = {};

    return {
        register(category) {
            if (!categoryCounts[category]) {
                categoryCounts[category] = 0;
            }
            categoryCounts[category]++;
            return categoryCounts[category];
        },
        getCounts() {
            return categoryCounts;
        }
    };
}

const regTracker = createRegistrationTracker();

// AddEvent function
function addEvent(eventObj) {
    globalEvents.push(eventObj);
    addLog(`[Event Added]: "${eventObj.title}" added successfully.`);
}

function filterEventsByCategory(category, callback) {
    const clonedList = [...globalEvents];
    
    return clonedList.filter(event => {
        if (callback) {
            return callback(event, category);
        }
        return event.category === category;
    });
}

const categoryMatcher = (event, category) => {
    if (!category || category === "all") return true;
    return event.category.toLowerCase() === category.toLowerCase();
};

function displayEventsLoop(eventsArray) {
    const container = document.getElementById("eventCardsContainer");
    if (!container) return;
    container.innerHTML = "";

    eventsArray.forEach(event => {
        const isAvailable = event.checkAvailability();
        const card = document.createElement("div");
        card.className = `event-card ${!isAvailable ? 'full' : ''}`;
        card.id = `event-card-${event.id}`;
        
        const { id, title, category, location, date, seats, description } = event;
        
        card.innerHTML = `
            <div class="category-badge ${category}">${category}</div>
            <h3>${title}</h3>
            <p class="description">${description}</p>
            <div class="details">
                <span>📍 ${location}</span>
                <span>📅 ${date}</span>
            </div>
            <div class="seats-left ${seats === 0 ? 'sold-out' : ''}">
                ${seats === 0 ? 'Sold Out' : `Seats remaining: <strong>${seats}</strong>`}
            </div>
            <div class="actions">
                ${seats > 0 
                    ? `<button class="btn btn-register" onclick="handleRegistration(${id})">Register</button>` 
                    : `<button class="btn btn-disabled" disabled>Fully Booked</button>`
                }
            </div>
        `;
        
        container.appendChild(card);
    });
}

function handleRegistration(eventId) {
    addLog(`Attempting registration for Event ID: ${eventId}`);
    
    try {
        const event = globalEvents.find(e => e.id === eventId);
        if (!event) {
            throw new Error(`Event with ID ${eventId} not found.`);
        }
        
        if (!event.checkAvailability()) {
            throw new Error(`Registration failed: "${event.title}" is already fully booked!`);
        }
        
        event.seats--;
        const totalRegsForCat = regTracker.register(event.category);
        
        addLog(`Successfully registered for "${event.title}"!`);
        addLog(`Total registrations in "${event.category}" category: ${totalRegsForCat}`);
        
        renderAll();
        
    } catch (error) {
        alert(error.message);
        addLog(`[ERROR]: ${error.message}`);
    }
}

function demonstrateArrayMethods() {
    addLog("--- Demonstrating Array Methods (Exercise 6) ---");
    
    const musicEvents = globalEvents.filter(e => e.category === 'music');
    addLog(`Filtered music events count: ${musicEvents.length}`);
    console.log("Music events list:", musicEvents);
    
    const formattedTitles = globalEvents.map(e => `[Event] - ${e.title} (${e.category.toUpperCase()})`);
    console.log("Mapped event tags:", formattedTitles);
    addLog("Check browser dev tools console for mapped array outputs!");
}

async function fetchEventsAsync() {
    const spinner = document.getElementById("loadingSpinner");
    if (spinner) spinner.style.display = "block";
    
    addLog("Initiating async fetch call to mock events.json endpoint...");
    
    try {
        const response = await fetch("events.json");
        
        if (!response.ok) {
            throw new Error(`HTTP fetch error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        await new Promise(resolve => setTimeout(resolve, 800));
        addLog("Data successfully fetched! Populating global state...");
        
        globalEvents = data.map(item => new CommunityEvent(
            item.id,
            item.title,
            item.category,
            item.location,
            item.date,
            item.seats,
            item.description
        ));
        
        renderAll();
        
    } catch (error) {
        addLog(`[FETCH ERROR]: ${error.message}. Loading fallback local events.`);
        loadFallbackEvents();
    } finally {
        if (spinner) spinner.style.display = "none";
    }
}

function loadFallbackEvents() {
    addEvent(new CommunityEvent(1, "Summer Symphony", "music", "Central Park", "2026-06-15", 30, "Enchanting outdoor evening concert."));
    addEvent(new CommunityEvent(2, "Chef Baking Masterclass", "cooking", "Kitchen Lab", "2026-06-22", 0, "Learn sourdough bread baking."));
    addEvent(new CommunityEvent(3, "Neighborhood Charity Run 5K", "sports", "Lake Pavilion", "2026-07-05", 25, "Raise funds for town library."));
    renderAll();
}

function setupFormHandlers() {
    const form = document.getElementById("eventRegistrationForm");
    if (!form) return;
    
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        addLog("--- Initiating Registration Form Validation ---");
        
        const formElements = form.elements;
        const name = formElements["userName"].value.trim();
        const email = formElements["userEmail"].value.trim();
        const selectedEventId = parseInt(formElements["eventSelect"].value);
        
        let hasErrors = false;
        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const selectError = document.getElementById("selectError");
        
        nameError.textContent = "";
        emailError.textContent = "";
        selectError.textContent = "";
        
        if (!name) {
            nameError.textContent = "Full Name is required.";
            hasErrors = true;
        }
        
        if (!email || !email.includes("@")) {
            emailError.textContent = "Please enter a valid email address.";
            hasErrors = true;
        }
        
        if (isNaN(selectedEventId)) {
            selectError.textContent = "Please select an upcoming event.";
            hasErrors = true;
        }
        
        if (hasErrors) {
            addLog("[Form Validation]: Errors found. Stopping submission.");
            return;
        }
        
        addLog(`Form validated successfully! Sending user registration for Event ID: ${selectedEventId}`);
        
        const submitBtn = formElements["submitBtn"];
        submitBtn.disabled = true;
        submitBtn.value = "Sending registration...";
        
        const payload = { name, email, eventId: selectedEventId };
        console.log("POST request payload prepared:", payload);
        
        setTimeout(() => {
            try {
                handleRegistration(selectedEventId);
                
                const successMsg = document.getElementById("formSuccessMessage");
                successMsg.className = "alert alert-success";
                successMsg.textContent = `Thank you ${name}! You are registered successfully for event #${selectedEventId}.`;
                successMsg.style.display = "block";
                
                form.reset();
                
                setTimeout(() => {
                    successMsg.style.display = "none";
                }, 5000);
                
            } catch (err) {
                const successMsg = document.getElementById("formSuccessMessage");
                successMsg.className = "alert alert-danger";
                successMsg.textContent = `Registration failed: ${err.message}`;
                successMsg.style.display = "block";
            } finally {
                submitBtn.disabled = false;
                submitBtn.value = "Submit Registration";
            }
        }, 1200);
    });
}

function setupInteractiveSearch() {
    const searchInput = document.getElementById("eventSearchInput");
    const categoryFilter = document.getElementById("categorySelect");
    
    if (searchInput) {
        searchInput.addEventListener("keyup", function(event) {
            addLog(`Search query typed: "${event.target.value}"`);
            renderFiltered();
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener("change", function(event) {
            addLog(`Category selection changed to: "${event.target.value}"`);
            renderFiltered();
        });
    }
}

function renderFiltered() {
    const searchInput = document.getElementById("eventSearchInput");
    const categoryFilter = document.getElementById("categorySelect");
    
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedCat = categoryFilter ? categoryFilter.value : "all";
    
    const filtered = filterEventsByCategory(selectedCat, (event, cat) => {
        const matchesCategory = categoryMatcher(event, cat);
        const matchesSearch = event.title.toLowerCase().includes(query) || 
                              event.description.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });
    
    displayEventsLoop(filtered);
}

function updateFormSelectOptions() {
    const select = document.getElementById("eventSelect");
    if (!select) return;
    
    select.innerHTML = '<option value="" disabled selected>-- Select an Event --</option>';
    
    globalEvents.forEach(e => {
        if (e.checkAvailability()) {
            const opt = document.createElement("option");
            opt.value = e.id;
            opt.textContent = `${e.title} (${e.category.toUpperCase()})`;
            select.appendChild(opt);
        }
    });
}

function updateSummaryCounters() {
    const summary = document.getElementById("summaryText");
    if (!summary) return;
    
    const totalEvents = globalEvents.length;
    const openEvents = globalEvents.filter(e => e.checkAvailability()).length;
    summary.innerHTML = `Currently tracking <strong>${totalEvents}</strong> community events. (<strong>${openEvents}</strong> open for registrations).`;
}

function renderAll() {
    renderFiltered();
    updateFormSelectOptions();
    updateSummaryCounters();
}

function setupJQueryEffects() {
    $("#toggleConsoleBtn").on("click", function() {
        const logs = $("#logOuterBox");
        if (logs.is(":visible")) {
            logs.fadeOut(400);
            $(this).text("Show Live Web Console");
        } else {
            logs.fadeIn(400);
            $(this).text("Hide Live Web Console");
        }
    });
    
    addLog("jQuery animations attached successfully.");
}

function initPortal() {
    addLog("Portal components initializing...");
    demonstrateVariables();
    fetchEventsAsync();
    setupFormHandlers();
    setupInteractiveSearch();
    setupJQueryEffects();
    
    const demoBtn = document.getElementById("demoArrayBtn");
    if (demoBtn) {
        demoBtn.addEventListener("click", () => {
            demonstrateArrayMethods();
            if (globalEvents.length > 0) {
                globalEvents[0].logDetails();
            }
        });
    }
}
