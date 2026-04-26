// Navbar scroll effect
const navbar = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle (Basic setup for future expansion)
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navbar.classList.toggle('menu-open');
        mobileBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if(window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Fan Zone MVP Poll Submission Logic
const pollForm = document.getElementById('mvp-poll-form');
if (pollForm) {
    pollForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const selectedOption = document.querySelector('input[name="mvp"]:checked');
        const messageContainer = document.getElementById('poll-message');
        
        if (selectedOption) {
            // Hide the form and show simulated results
            const resultsHtml = `
                <div class="poll-results animate-up">
                    <h4>Current Standings</h4>
                    <div class="result-bar-item">
                        <span>Sanju Samson</span>
                        <div class="bar-container"><div class="bar" style="width: 95%"></div><span>95%</span></div>
                    </div>
                    <div class="result-bar-item">
                        <span>Ayush Mhatre</span>
                        <div class="bar-container"><div class="bar" style="width: 55%"></div><span>55%</span></div>
                    </div>

                    <div class="result-bar-item">
                        <span>Shivam Dube</span>
                        <div class="bar-container"><div class="bar" style="width: 35%"></div><span>35%</span></div>
                    </div>
                    <div class="result-bar-item">
                        <span>Ruturaj Gaikwad</span>
                        <div class="bar-container"><div class="bar" style="width: 5%"></div><span>5%</span></div>
                    </div>
                    <p style="margin-top: 1rem; font-size: 0.8rem; opacity: 0.7;">Thanks for voting, Whistle Podu! 🦁</p>
                </div>
            `;
            pollForm.innerHTML = resultsHtml;
        } else {
            messageContainer.textContent = 'Please select a player to vote.';
            messageContainer.style.color = '#ff4d4f';
            messageContainer.style.display = 'block';
        }
    });
}

// --- Fan Wall Logic ---
const fanWallForm = document.getElementById('fan-wall-form');

if (fanWallForm) {
    fanWallForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = document.getElementById('fan-name');
        const textInput = document.getElementById('fan-msg');
        const successMsg = document.getElementById('fan-success-msg');
        
        if (userInput.value && textInput.value) {
            // We still save to localStorage for potential future features, 
            // but we don't display it.
            const messages = JSON.parse(localStorage.getItem('csk_fan_messages') || '[]');
            const newMsg = {
                user: userInput.value,
                text: textInput.value,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            messages.push(newMsg);
            localStorage.setItem('csk_fan_messages', JSON.stringify(messages));
            
            userInput.value = '';
            textInput.value = '';
            
            // Show success message with animation
            successMsg.style.display = 'block';
            successMsg.style.animation = 'fadeInUp 0.5s ease forwards';
            
            setTimeout(() => {
                successMsg.style.animation = 'fadeIn 0.5s ease reverse forwards';
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 500);
            }, 4000);
        }
    });
}

// --- Live Match Engine (Simulation) ---
function updateLiveMatch() {
    const liveContainer = document.getElementById('live-match-center');
    if (!liveContainer || !window.cskData.liveMatch.isLive) return;
    
    const match = window.cskData.liveMatch;
    
    // Simulate score increase
    const scoreParts = match.cskScore.split('/');
    let runs = parseInt(scoreParts[0]);
    let wickets = parseInt(scoreParts[1]);
    
    // Randomly update every call
    const rand = Math.random();
    let ballResult = '0';
    if (rand > 0.8) {
        runs += 4; ballResult = '4';
    } else if (rand > 0.7) {
        runs += 6; ballResult = '6';
    } else if (rand > 0.6) {
        runs += 1; ballResult = '1';
    } else if (rand > 0.55) {
        wickets += 1; ballResult = 'W';
    } else {
        runs += 0; ballResult = '0';
    }
    
    match.cskScore = `${runs}/${wickets}`;
    match.recentBalls.shift();
    match.recentBalls.push(ballResult);
    
    // Update DOM
    const scoreEl = liveContainer.querySelector('.live-score');
    if (scoreEl) scoreEl.textContent = match.cskScore;
    
    const recentEl = liveContainer.querySelector('.recent-balls');
    if (recentEl) {
        recentEl.innerHTML = match.recentBalls.map(b => `<span class="ball ${b === 'W' ? 'wicket' : b === '4' || b === '6' ? 'boundary' : ''}">${b}</span>`).join('');
    }
}

if (document.getElementById('live-match-center')) {
    setInterval(updateLiveMatch, 5000); // Update every 5 seconds
}

