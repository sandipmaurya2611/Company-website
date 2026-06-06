document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. Initialize Lucide Icons
    // -------------------------------------------------------------
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // -------------------------------------------------------------
    // 2. Scroll Header Effect
    // -------------------------------------------------------------
    const header = document.querySelector(".site-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // -------------------------------------------------------------
    // 3. Mobile Navigation Menu Toggle
    // -------------------------------------------------------------
    const menuToggle = document.getElementById("menu-toggle");
    const mobileOverlay = document.getElementById("mobile-overlay");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    function toggleMenu() {
        mobileOverlay.classList.toggle("active");
        const isActive = mobileOverlay.classList.contains("active");
        
        // Update menu icon
        if (isActive) {
            menuToggle.innerHTML = '<i data-lucide="x"></i>';
        } else {
            menuToggle.innerHTML = '<i data-lucide="menu"></i>';
        }
        lucide.createIcons();
        
        // Disable body scroll when menu is active
        document.body.style.overflow = isActive ? "hidden" : "";
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMenu);
    }

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (mobileOverlay.classList.contains("active")) {
                toggleMenu();
            }
        });
    });

    // -------------------------------------------------------------
    // 4. Scroll Reveal Animations (Intersection Observer)
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                // Once revealed, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Mousemove glow effect on feature cards
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
        });
    });

    // -------------------------------------------------------------
    // 5. FAQ Accordions (Smooth Height Transition)
    // -------------------------------------------------------------
    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach(item => {
        const header = item.querySelector(".accordion-header");
        const content = item.querySelector(".accordion-content");

        header.addEventListener("click", () => {
            const isOpen = item.classList.contains("active");

            // Close all items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove("active");
                otherItem.querySelector(".accordion-content").style.maxHeight = null;
            });

            // Toggle selected item
            if (!isOpen) {
                item.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // -------------------------------------------------------------
    // 6. Pricing Toggle
    // -------------------------------------------------------------
    const billingToggle = document.getElementById("billing-toggle");
    const labelMonthly = document.getElementById("billing-monthly");
    const labelYearly = document.getElementById("billing-yearly");
    
    const priceStarter = document.getElementById("price-starter");
    const priceProfessional = document.getElementById("price-professional");

    function updatePricing(isYearly) {
        if (isYearly) {
            billingToggle.classList.add("yearly");
            labelYearly.classList.add("active");
            labelMonthly.classList.remove("active");
            
            // Starter is free
            animatePrice(priceStarter, 0);
            animatePrice(priceProfessional, 15);
        } else {
            billingToggle.classList.remove("yearly");
            labelMonthly.classList.add("active");
            labelYearly.classList.remove("active");
            
            animatePrice(priceStarter, 0);
            animatePrice(priceProfessional, 19);
        }
    }

    function animatePrice(element, targetValue) {
        if (!element) return;
        const currentVal = parseInt(element.textContent, 10) || 0;
        if (currentVal === targetValue) return;

        let start = currentVal;
        const duration = 300; // ms
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const value = Math.round(start + (targetValue - start) * easeProgress);
            
            element.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    if (billingToggle) {
        billingToggle.addEventListener("click", () => {
            const isYearly = !billingToggle.classList.contains("yearly");
            updatePricing(isYearly);
        });

        labelMonthly.addEventListener("click", () => updatePricing(false));
        labelYearly.addEventListener("click", () => updatePricing(true));
    }

    // -------------------------------------------------------------
    // 7. Interactive Dashboard Mockup Simulation
    // -------------------------------------------------------------
    
    // -- Sidebar Tab Switching --
    const sideBtns = document.querySelectorAll(".side-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    sideBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.getAttribute("data-tab");
            
            // Update active button
            sideBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Update active panel
            tabPanels.forEach(panel => {
                panel.classList.remove("active");
                if (panel.getAttribute("id") === `panel-${tabId}`) {
                    panel.classList.add("active");
                }
            });
        });
    });

    // -- Sub-tab switching (Transcript vs. AI Summary) --
    const tabTriggers = document.querySelectorAll(".tab-trigger");
    const subtabPanels = document.querySelectorAll(".subtab-panel");

    tabTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const subtabId = trigger.getAttribute("data-subtab");

            // Update active trigger
            tabTriggers.forEach(t => t.classList.remove("active"));
            trigger.classList.add("active");

            // Update active subpanel
            subtabPanels.forEach(panel => {
                panel.classList.remove("active");
                if (panel.getAttribute("id") === `subpanel-${subtabId}`) {
                    panel.classList.add("active");
                }
            });
        });
    });

    // -- Interactive Checkboxes Action Items count --
    const checkboxes = document.querySelectorAll(".action-item-checkbox input");
    const badgeCount = document.querySelector(".badge-count");

    function updateActionCount() {
        if (!badgeCount) return;
        const unchecked = Array.from(checkboxes).filter(cb => !cb.checked).length;
        badgeCount.textContent = unchecked;
        if (unchecked === 0) {
            badgeCount.style.background = "rgba(16, 185, 129, 0.15)";
            badgeCount.style.color = "var(--accent-green)";
        } else {
            badgeCount.style.background = "rgba(139, 92, 246, 0.15)";
            badgeCount.style.color = "var(--accent-purple)";
        }
    }

    checkboxes.forEach(cb => {
        cb.addEventListener("change", updateActionCount);
    });

    // -- Live Transcript Speech Simulation --
    const liveTextEl = document.querySelector(".live-typing .transcript-text");
    const simulatedPhases = [
        "Perfect, let's schedule a review session on Friday morning at 10 AM to finalize the design prototype.",
        " I will bring the Figma files and we can invite David to verify API latencies in real time.",
        " Let's also invite Marketing so they can prepare the email blast for the 2.0 release.",
        " Meeting adjourned. Excellent work today, everyone!"
    ];
    let phaseIndex = 0;
    let charIndex = simulatedPhases[0].length; // start after first sentence

    function simulateTyping() {
        if (phaseIndex >= simulatedPhases.length) {
            // Reset to beginning of cycle
            phaseIndex = 0;
            charIndex = 0;
            if (liveTextEl) liveTextEl.textContent = "";
        }

        const currentSentence = simulatedPhases[phaseIndex];

        if (charIndex < currentSentence.length) {
            if (liveTextEl) {
                liveTextEl.textContent += currentSentence.charAt(charIndex);
            }
            charIndex++;
            // Slightly variable typing speed
            setTimeout(simulateTyping, 30 + Math.random() * 50);
        } else {
            // Sentence complete, wait 4 seconds then type next one
            phaseIndex++;
            charIndex = 0;
            setTimeout(simulateTyping, 4000);
        }
    }

    // Start transcription simulation
    setTimeout(simulateTyping, 3000);

    // -- RAG Semantic Search Simulation --
    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("semantic-search-input");
    const searchResultsList = document.getElementById("search-results-list");
    const searchResultsMeta = document.querySelector(".search-results-meta");

    const searchMockDatabase = [
        {
            queryKeywords: ["hipaa", "compliance", "security", "encryption"],
            score: "99% Relevance Match",
            date: "June 6, 2026",
            meeting: "Q3 Product Strategy & Roadmap Sync",
            snippet: "...We should also verify <strong>HIPAA compliance policies</strong> for these integrations... David will optimize the API endpoints...",
            speaker: "David K. (Data Architect)"
        },
        {
            queryKeywords: ["hipaa", "compliance", "security", "encryption"],
            score: "88% Relevance Match",
            date: "May 24, 2026",
            meeting: "Security & Compliance Audit Review",
            snippet: "...Our database architecture handles data encryption at rest. For <strong>HIPAA compliance</strong>, we need to ensure all transcript logs are encrypted using AES-256 keys managed via AWS KMS...",
            speaker: "CISO (Chief Security Officer)"
        },
        {
            queryKeywords: ["onboarding", "wizard", "design", "drop-off", "friction"],
            score: "97% Relevance Match",
            date: "June 6, 2026",
            meeting: "Q3 Product Strategy & Roadmap Sync",
            snippet: "...We need to simplify the <strong>onboarding flow</strong>. Right now, user <strong>drop-off</strong> is at 28% during integration... Sarah suggested introducing a wizard...",
            speaker: "Sarah Jenkins (VP Design)"
        },
        {
            queryKeywords: ["oauth", "sprint", "schedule", "jira", "linear"],
            score: "95% Relevance Match",
            date: "June 6, 2026",
            meeting: "Q3 Product Strategy & Roadmap Sync",
            snippet: "...I can kick off the <strong>OAuth integrations sprint</strong> tomorrow. We should have the prototype ready by Thursday. I'll sync with David...",
            speaker: "Alex Rivera (Eng Lead)"
        }
    ];

    function runSemanticSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            searchResultsMeta.textContent = "Type a query or press enter to search with semantic RAG retrieval.";
            return;
        }

        // Show loading state
        searchResultsMeta.textContent = "Querying vector index & loading context blocks...";
        searchResultsList.innerHTML = `
            <div style="display:flex; justify-content:center; align-items:center; height:100px; color:var(--text-muted); font-size:0.8125rem; gap:10px;">
                <i data-lucide="loader" class="animate-spin" style="animation: spin 1s linear infinite;"></i> Retrieving RAG Nodes...
            </div>
        `;
        lucide.createIcons();

        setTimeout(() => {
            // Filter database
            const matchedResults = searchMockDatabase.filter(item => {
                return item.queryKeywords.some(keyword => query.includes(keyword)) ||
                       item.snippet.toLowerCase().includes(query) ||
                       item.meeting.toLowerCase().includes(query);
            });

            if (matchedResults.length > 0) {
                searchResultsMeta.textContent = `Found ${matchedResults.length} semantic matches across 142 historical conversations:`;
                searchResultsList.innerHTML = matchedResults.map(res => `
                    <div class="search-result-item">
                        <div class="result-header">
                            <span class="result-match-score">${res.score}</span>
                            <span class="result-date">${res.date}</span>
                        </div>
                        <h4 class="result-meeting-title">${res.meeting}</h4>
                        <p class="result-snippet">${res.snippet}</p>
                        <div class="result-footer">
                            <span>Speaker: ${res.speaker}</span>
                            <a href="#" class="result-link">Jump to transcript <i data-lucide="arrow-up-right"></i></a>
                        </div>
                    </div>
                `).join('');
            } else {
                // Return generic semantic matching for custom query
                searchResultsMeta.textContent = "Found 1 semantic match with low confidence (generated on-the-fly):";
                searchResultsList.innerHTML = `
                    <div class="search-result-item">
                        <div class="result-header">
                            <span class="result-match-score" style="color:var(--accent-orange)">74% Relevance Match</span>
                            <span class="result-date">June 6, 2026</span>
                        </div>
                        <h4 class="result-meeting-title">Q3 Product Strategy & Roadmap Sync</h4>
                        <p class="result-snippet">"...Discussed terms related to: <strong>"${escapeHTML(query)}"</strong>. Sarah suggested sync points on Friday to clarify items..."</p>
                        <div class="result-footer">
                            <span>Speaker: AI Context Synthesis</span>
                            <a href="#" class="result-link">Jump to transcript <i data-lucide="arrow-up-right"></i></a>
                        </div>
                    </div>
                `;
            }
            lucide.createIcons();
        }, 800);
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", runSemanticSearch);
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                runSemanticSearch();
            }
        });
    }

    // -- Ask AI Chat Assistant Interface Simulation --
    const chatInputField = document.getElementById("chat-input-field");
    const sendChatBtn = document.getElementById("send-chat-btn");
    const chatMessagesContainer = document.getElementById("chat-messages");

    const mockAiResponses = [
        {
            triggerKeywords: ["action", "todo", "task"],
            response: `Based on the latest strategy sync, here are the extracted action items:
            <ul>
                <li><strong>Alex Rivera</strong>: Launch Zoom & Slack integrations sprint (Due Thursday).</li>
                <li><strong>David K.</strong>: Optimize API endpoints to achieve sub-100ms sync speeds (Due Friday).</li>
                <li><strong>Sarah Jenkins</strong>: Finalize UI onboarding designs (Due Friday).</li>
            </ul>
            Would you like me to push these to your Jira project backlog?`
        },
        {
            triggerKeywords: ["summary", "outline", "what happened"],
            response: `In today's meeting (Q3 Product Strategy Sync), the team aligned on addressing the 28% drop-off in user onboarding. Sarah proposed a automated integration wizard. Alex is launching a sprint for this tomorrow, and David is optimizing sync API response times. They scheduled a follow-up review on Friday at 10:00 AM.`
        },
        {
            triggerKeywords: ["hipaa", "compliance", "security"],
            response: `Yes, HIPAA compliance was discussed. David noted that all integrations must comply with HIPAA policies. Additionally, logs from May 24 indicate that all meeting transcripts are encrypted at rest with AES-256 keys, and data-retention schedules can be configured in your settings panel.`
        }
    ];

    function handleSendChatMessage() {
        const text = chatInputField.value.trim();
        if (!text) return;

        // Clear input
        chatInputField.value = "";

        // Add user bubble
        appendChatBubble(text, "user");

        // Scroll down
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

        // Simulate thinking & response
        setTimeout(() => {
            let aiText = "I search-retrieved 142 past transcripts in your space, but couldn't locate specific details on that topic. Could you clarify your question? (Tip: ask me about 'action items' or 'HIPAA security' to see RAG retrieval!)";
            
            const lowerText = text.toLowerCase();
            for (const item of mockAiResponses) {
                if (item.triggerKeywords.some(keyword => lowerText.includes(keyword))) {
                    aiText = item.response;
                    break;
                }
            }

            appendChatBubble(aiText, "assistant");
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }, 1000);
    }

    function appendChatBubble(content, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}`;
        
        let avatarContent = sender === "user" ? "JD" : '<i data-lucide="sparkles"></i>';
        
        messageDiv.innerHTML = `
            <div class="msg-avatar">${avatarContent}</div>
            <div class="msg-bubble">${content}</div>
        `;
        
        chatMessagesContainer.appendChild(messageDiv);
        lucide.createIcons();
    }

    if (sendChatBtn && chatInputField) {
        sendChatBtn.addEventListener("click", handleSendChatMessage);
        chatInputField.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handleSendChatMessage();
            }
        });
    }
});
