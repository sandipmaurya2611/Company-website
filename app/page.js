"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Menu, X, Play, ArrowRight, Video, Search, Sparkles, Settings, Share2, 
  Download, CheckSquare, Send, ChevronRight, Brain, Shield, Database, Key, 
  Clock, GitMerge, Milestone, TrendingUp, Star, ChevronDown, Check, Lock, Loader,
  Twitter, Github, Linkedin, ShieldCheck, Mic, FileText, Users
} from "lucide-react";

export default function Home() {
  // -------------------------------------------------------------
  // States & Refs
  // -------------------------------------------------------------
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Dashboard Mockup Tab Selection
  const [dashboardTab, setDashboardTab] = useState("meetings"); // 'meetings' | 'search' | 'ask-ai' | 'settings'
  const [meetingsSubtab, setMeetingsSubtab] = useState("transcript"); // 'transcript' | 'summary'

  // Dashboard Checklist State
  const [actionItems, setActionItems] = useState([
    { id: 1, text: "Alex Rivera: Initiate OAuth integration sprint for Zoom & Slack", checked: false, tag: "High", date: "Due Thursday", tagClass: "tag-high" },
    { id: 2, text: "David K.: Optimize sync API endpoints for sub-100ms response times", checked: false, tag: "Medium", date: "Due Friday", tagClass: "tag-medium" },
    { id: 3, text: "Sarah Jenkins: Finalize UI mockups for onboarding wizard", checked: false, tag: "Medium", date: "Due Friday", tagClass: "tag-medium" }
  ]);

  // Live Typing Transcript State
  const [liveTranscriptText, setLiveTranscriptText] = useState(
    "Perfect, let's schedule a review session on Friday morning at 10 AM to finalize the design prototype."
  );

  // Semantic Search RAG State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchMeta, setSearchMeta] = useState("Type a query or press enter to search with semantic RAG retrieval.");
  const [searchResults, setSearchResults] = useState([
    {
      score: "98% Relevance Match",
      date: "June 6, 2026",
      meeting: "Q3 Product Strategy & Roadmap Sync",
      snippet: "...We should also verify <strong>HIPAA compliance policies</strong> for these integrations... David will optimize the API endpoints...",
      speaker: "David K. (Data Architect)"
    },
    {
      score: "85% Relevance Match",
      date: "May 24, 2026",
      meeting: "Security & Compliance Audit Review",
      snippet: "...Our database architecture handles data encryption at rest. For <strong>HIPAA compliance</strong>, we need to ensure all transcript logs are encrypted using AES-256 keys managed via AWS KMS...",
      speaker: "Chief Information Security Officer"
    }
  ]);

  // AI Assistant Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: "assistant", text: "Hello! I'm your MeetMind Assistant. I have indexed all 142 meetings from your workspace. Ask me to draft follow-ups, summarize decisions, or locate action items." },
    { sender: "user", text: "Draft a follow-up email to the team based on today's strategy meeting." },
    { sender: "assistant", text: "Here is a draft based on the Q3 Product Strategy & Roadmap Sync:", emailDraft: true }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);

  // Pricing State
  const [isYearlyBilling, setIsYearlyBilling] = useState(false);

  // FAQ Accordion State
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  // -------------------------------------------------------------
  // Effects
  // -------------------------------------------------------------
  
  // Track scroll position for Header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for Scroll Reveals & Mouse Glow Effects
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    // Mousemove glow on feature cards
    const featureCards = document.querySelectorAll(".feature-card");
    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    };

    featureCards.forEach((card) => {
      card.addEventListener("mousemove", handleMouseMove);
    });

    return () => {
      observer.disconnect();
      featureCards.forEach((card) => {
        card.removeEventListener("mousemove", handleMouseMove);
      });
    };
  }, []);

  // Simulated Live Transcript Typing Loop
  useEffect(() => {
    const simulatedPhases = [
      "Perfect, let's schedule a review session on Friday morning at 10 AM to finalize the design prototype.",
      " I will bring the Figma files and we can invite David to verify API latencies in real time.",
      " Let's also invite Marketing so they can prepare the email blast for the 2.0 release.",
      " Meeting adjourned. Excellent work today, everyone!"
    ];

    let phaseIndex = 0;
    let charIndex = simulatedPhases[0].length;
    let timer;

    function simulateTyping() {
      if (phaseIndex >= simulatedPhases.length) {
        phaseIndex = 0;
        charIndex = 0;
        setLiveTranscriptText("");
      }

      const currentSentence = simulatedPhases[phaseIndex];

      if (charIndex < currentSentence.length) {
        setLiveTranscriptText((prev) => prev + currentSentence.charAt(charIndex));
        charIndex++;
        timer = setTimeout(simulateTyping, 30 + Math.random() * 50);
      } else {
        phaseIndex++;
        charIndex = 0;
        timer = setTimeout(simulateTyping, 4000);
      }
    }

    timer = setTimeout(simulateTyping, 3000);
    return () => clearTimeout(timer);
  }, []);

  // -------------------------------------------------------------
  // Event Handlers
  // -------------------------------------------------------------

  // Action Items Checkbox Change
  const handleCheckboxChange = (id) => {
    setActionItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const remainingActionItemsCount = actionItems.filter(item => !item.checked).length;

  // Semantic RAG Search Handler
  const handleRAGSearch = (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSearchMeta("Type a query or press enter to search with semantic RAG retrieval.");
      return;
    }

    setIsSearching(true);
    setSearchMeta("Querying vector index & loading context blocks...");

    setTimeout(() => {
      const mockDb = [
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

      const matchedResults = mockDb.filter(
        (item) =>
          item.queryKeywords.some((keyword) => query.includes(keyword)) ||
          item.snippet.toLowerCase().includes(query) ||
          item.meeting.toLowerCase().includes(query)
      );

      if (matchedResults.length > 0) {
        setSearchMeta(`Found ${matchedResults.length} semantic matches across 142 conversations:`);
        setSearchResults(matchedResults);
      } else {
        setSearchMeta("Found 1 semantic match with low confidence (generated on-the-fly):");
        setSearchResults([
          {
            score: "74% Relevance Match",
            date: "June 6, 2026",
            meeting: "Q3 Product Strategy & Roadmap Sync",
            snippet: `...Discussed terms related to: <strong>"${escapeHTML(searchQuery)}"</strong>. Sarah suggested sync points on Friday to clarify items...`,
            speaker: "AI Context Synthesis"
          }
        ]);
      }
      setIsSearching(false);
    }, 800);
  };

  const escapeHTML = (str) => {
    return str.replace(/[&<>'"]/g, 
      (tag) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  };

  // AI Assistant Chat Send
  const handleSendChat = (e) => {
    if (e) e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;

    setChatInput("");
    setChatMessages((prev) => [...prev, { sender: "user", text }]);

    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    setTimeout(() => {
      let aiText = "I search-retrieved 142 past transcripts in your space, but couldn't locate specific details on that topic. Could you clarify your question? (Tip: ask me about 'action items' or 'HIPAA security' to see RAG retrieval!)";
      let emailDraft = false;

      const lowerText = text.toLowerCase();
      if (lowerText.includes("action") || lowerText.includes("todo") || lowerText.includes("task")) {
        aiText = `Based on the latest strategy sync, here are the extracted action items:
        <ul>
            <li><strong>Alex Rivera</strong>: Launch Zoom & Slack integrations sprint (Due Thursday).</li>
            <li><strong>David K.</strong>: Optimize API endpoints to achieve sub-100ms sync speeds (Due Friday).</li>
            <li><strong>Sarah Jenkins</strong>: Finalize UI onboarding designs (Due Friday).</li>
        </ul>
        Would you like me to push these to your Jira project backlog?`;
      } else if (lowerText.includes("summary") || lowerText.includes("outline") || lowerText.includes("what happened")) {
        aiText = `In today's meeting (Q3 Product Strategy Sync), the team aligned on addressing the 28% drop-off in user onboarding. Sarah proposed an automated integration wizard. Alex is launching a sprint for this tomorrow, and David is optimizing sync API response times. They scheduled a follow-up review on Friday at 10:00 AM.`;
      } else if (lowerText.includes("hipaa") || lowerText.includes("compliance") || lowerText.includes("security")) {
        aiText = `Yes, HIPAA compliance was discussed. David noted that all integrations must comply with HIPAA policies. Additionally, logs from May 24 indicate that all meeting transcripts are encrypted at rest with AES-256 keys, and data-retention schedules can be configured in your settings panel.`;
      } else if (lowerText.includes("email") || lowerText.includes("follow-up") || lowerText.includes("draft")) {
        aiText = "Here is a draft based on the Q3 Product Strategy & Roadmap Sync:";
        emailDraft = true;
      }

      setChatMessages((prev) => [...prev, { sender: "assistant", text: aiText, emailDraft }]);

      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }, 1000);
  };

  // Toggle FAQ Accordion
  const toggleAccordion = (index) => {
    setOpenAccordionIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Glow Effects in Background */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
      <div className="ambient-glow glow-3"></div>

      {/* Header / Navigation */}
      <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          <a href="#" className="logo-group" id="nav-logo">
            <div className="logo-icon">
              <span className="logo-dot"></span>
            </div>
            <span className="logo-text">MeetMind <span className="accent-text">AI</span></span>
          </a>
          
          <nav className="main-nav" id="main-nav">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#dashboard-showcase" className="nav-link">Product</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>

          <div className="header-actions">
            <a href="#login" className="btn btn-text">Sign In</a>
            <a href="#signup" className="btn btn-primary">Get Started Free</a>
          </div>

          <button 
            className="mobile-menu-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? "active" : ""}`} id="mobile-overlay">
        <nav className="mobile-nav">
          <a href="#features" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
          <a href="#how-it-works" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
          <a href="#dashboard-showcase" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Product</a>
          <a href="#pricing" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          <a href="#faq" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
          <div className="mobile-actions">
            <a href="#login" className="btn btn-text w-full">Sign In</a>
            <a href="#signup" className="btn btn-primary w-full">Get Started Free</a>
          </div>
        </nav>
      </div>

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="section-container">
            <div className="hero-badge reveal">
              <span className="badge-tag">New</span>
              <span class="badge-text">MeetMind 2.0: Instant Enterprise Semantic Search is live</span>
              <ArrowRight className="badge-arrow" />
            </div>
            
            <h1 className="hero-title reveal">
              Turn Every Conversation Into <br />
              <span className="gradient-text">Actionable Intelligence</span>
            </h1>
            
            <p className="hero-subtitle reveal">
              MeetMind AI automatically transcribes your meetings, generates concise summaries, extracts key action items, and enables instant semantic search across all past conversations using advanced RAG and LLM technology.
            </p>

            <div className="hero-ctas reveal">
              <a href="#signup" className="btn btn-primary btn-lg">Get Started Free</a>
              <a href="#demo" className="btn btn-secondary btn-lg">
                <Play className="btn-icon" /> Book a Demo
              </a>
            </div>

            {/* Interactive Dashboard Mockup */}
            <div className="dashboard-mockup-wrapper reveal">
              <div className="dashboard-mockup">
                {/* Window Chrome */}
                <div className="chrome-header">
                  <div className="chrome-dots">
                    <span className="dot-red"></span>
                    <span className="dot-yellow"></span>
                    <span className="dot-green"></span>
                  </div>
                  <div className="chrome-address">
                    <Lock className="chrome-lock-icon" />
                    <span>app.meetmind.ai/dashboard</span>
                  </div>
                  <div className="chrome-actions">
                    <span style={{ fontSize: "16px", cursor: "pointer" }}>+</span>
                  </div>
                </div>
                
                {/* Dashboard Layout */}
                <div className="dashboard-body">
                  {/* Sidebar */}
                  <aside className="dash-sidebar">
                    <div className="sidebar-logo">
                      <div className="logo-icon-s"></div>
                      <span>MeetMind AI</span>
                    </div>
                    <div className="sidebar-menu">
                      <button 
                        className={`side-btn ${dashboardTab === "meetings" ? "active" : ""}`}
                        onClick={() => setDashboardTab("meetings")}
                      >
                        <Video size={16} /> <span>Meetings</span>
                      </button>
                      <button 
                        className={`side-btn ${dashboardTab === "search" ? "active" : ""}`}
                        onClick={() => setDashboardTab("search")}
                      >
                        <Search size={16} /> <span>Semantic Search</span>
                      </button>
                      <button 
                        className={`side-btn ${dashboardTab === "ask-ai" ? "active" : ""}`}
                        onClick={() => setDashboardTab("ask-ai")}
                      >
                        <Sparkles size={16} /> <span>Ask AI Assistant</span>
                      </button>
                      <button 
                        className={`side-btn ${dashboardTab === "settings" ? "active" : ""}`}
                        onClick={() => setDashboardTab("settings")}
                      >
                        <Settings size={16} /> <span>Settings</span>
                      </button>
                    </div>
                    <div className="sidebar-user">
                      <div className="user-avatar">JD</div>
                      <div className="user-info">
                        <p className="user-name">John Doe</p>
                        <p className="user-role">Product Lead</p>
                      </div>
                    </div>
                  </aside>

                  {/* Dashboard Content */}
                  <div className="dash-content">
                    {/* Meetings Tab */}
                    {dashboardTab === "meetings" && (
                      <div className="tab-panel active">
                        <div className="panel-header">
                          <div>
                            <span className="status-indicator">Recording Live</span>
                            <h3 className="meeting-title">Q3 Product Strategy & Roadmap Sync</h3>
                            <p className="meeting-meta">June 6, 2026 • 45 mins • 6 Attendees</p>
                          </div>
                          <div className="panel-actions">
                            <button className="btn-icon-only"><Share2 size={16} /></button>
                            <button className="btn btn-secondary btn-sm"><Download size={12} className="mr-1" /> Export</button>
                          </div>
                        </div>

                        <div className="dashboard-grid">
                          {/* Main content: Transcript */}
                          <div className="grid-main">
                            <div className="card-header-tabs">
                              <button 
                                className={`tab-trigger ${meetingsSubtab === "transcript" ? "active" : ""}`}
                                onClick={() => setMeetingsSubtab("transcript")}
                              >
                                Live Transcript
                              </button>
                              <button 
                                className={`tab-trigger ${meetingsSubtab === "summary" ? "active" : ""}`}
                                onClick={() => setMeetingsSubtab("summary")}
                              >
                                AI Summary
                              </button>
                            </div>
                            
                            {/* Transcript Subtab */}
                            {meetingsSubtab === "transcript" && (
                              <div className="subtab-panel active">
                                <div className="transcript-list">
                                  <div className="transcript-item">
                                    <div className="transcript-meta">
                                      <span className="speaker-name text-blue">Sarah Jenkins (VP Design)</span>
                                      <span className="timestamp">12:04</span>
                                    </div>
                                    <p className="transcript-text">We need to simplify the onboarding flow. Right now, user drop-off is at 28% during the integration phase. I suggest we introduce a wizard that helps them connect Slack and Zoom automatically.</p>
                                  </div>
                                  <div className="transcript-item highlight">
                                    <div className="transcript-meta">
                                      <span className="speaker-name text-purple">Alex Rivera (Eng Lead)</span>
                                      <span className="timestamp">12:06</span>
                                    </div>
                                    <p className="transcript-text">I can kick off the OAuth integrations sprint tomorrow. We should have the prototype ready by Thursday. I'll sync with David to ensure the database schemas are updated.</p>
                                  </div>
                                  <div className="transcript-item">
                                    <div className="transcript-meta">
                                      <span className="speaker-name text-green">David K. (Data Architect)</span>
                                      <span className="timestamp">12:07</span>
                                    </div>
                                    <p className="transcript-text">Sounds good. I will optimize the API endpoints so that sync speeds are sub-100ms. We should also verify HIPAA compliance policies for these integrations.</p>
                                  </div>
                                  <div className="transcript-item live-typing">
                                    <div className="transcript-meta">
                                      <span className="speaker-name text-orange">Sarah Jenkins (VP Design)</span>
                                      <span className="timestamp">Just now</span>
                                    </div>
                                    <p className="transcript-text cursor-blink">{liveTranscriptText}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Summary Subtab */}
                            {meetingsSubtab === "summary" && (
                              <div className="subtab-panel active">
                                <div className="summary-content">
                                  <h4 className="summary-section-title">Executive Overview</h4>
                                  <p className="summary-text">The team discussed strategies to reduce the 28% user drop-off rate during onboarding. The focus will be on automating integration steps for Slack and Zoom, updating API performance, and validating security protocols.</p>
                                  
                                  <h4 className="summary-section-title">Key Themes</h4>
                                  <ul className="summary-list">
                                    <li><strong>UX Friction:</strong> Identified onboarding flow as the main bottleneck.</li>
                                    <li><strong>Engineering Alignment:</strong> Scheduled sprint setup for OAuth flow and database schema updates.</li>
                                    <li><strong>Compliance:</strong> Highlighted the necessity of auditing HIPAA parameters before launch.</li>
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Sidebar: Actions & Insights */}
                          <div className="grid-side">
                            <div className="action-items-card">
                              <div className="card-title-bar">
                                <CheckSquare className="text-purple" size={16} />
                                <h4>Extracted Action Items</h4>
                                <span className="badge-count">{remainingActionItemsCount}</span>
                              </div>
                              
                              <ul className="action-list">
                                {actionItems.map((item) => (
                                  <li key={item.id} className="action-item-checkbox">
                                    <label className="custom-checkbox">
                                      <input 
                                        type="checkbox" 
                                        checked={item.checked} 
                                        onChange={() => handleCheckboxChange(item.id)} 
                                      />
                                      <span className="checkmark"></span>
                                      <span className="action-label-text">
                                        <strong>{item.text.split(":")[0]}:</strong>{item.text.split(":")[1]}
                                      </span>
                                    </label>
                                    <div className="action-tags">
                                      <span className={`tag ${item.tagClass}`}>{item.tag}</span>
                                      <span className="tag-date">{item.date}</span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Semantic Search Tab */}
                    {dashboardTab === "search" && (
                      <div className="tab-panel active">
                        <div className="search-tab-container">
                          <form onSubmit={handleRAGSearch} className="search-bar-wrapper">
                            <Search className="search-icon" size={18} />
                            <input 
                              type="text" 
                              className="search-input" 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search across all past meetings... e.g. 'what did we decide on HIPAA compliance?'" 
                            />
                            <button type="submit" className="btn btn-primary btn-sm">RAG Search</button>
                          </form>
                          
                          <div className="search-results-section">
                            <p className="search-results-meta">{searchMeta}</p>
                            
                            <div className="search-results-list">
                              {isSearching ? (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px", color: "var(--text-muted)", fontSize: "0.8125rem", gap: "10px" }}>
                                  <Loader className="animate-spin" style={{ animation: "spin 1s linear infinite" }} size={16} /> Retrieving RAG Nodes...
                                </div>
                              ) : (
                                searchResults.map((res, index) => (
                                  <div key={index} className="search-result-item">
                                    <div className="result-header">
                                      <span className="result-match-score">{res.score}</span>
                                      <span className="result-date">{res.date}</span>
                                    </div>
                                    <h4 className="result-meeting-title">{res.meeting}</h4>
                                    <p className="result-snippet" dangerouslySetInnerHTML={{ __html: res.snippet }}></p>
                                    <div className="result-footer">
                                      <span>Speaker: {res.speaker}</span>
                                      <a href="#" className="result-link">Jump to transcript <ArrowRight size={12} style={{ transform: "rotate(-45deg)" }} /></a>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Ask AI Tab */}
                    {dashboardTab === "ask-ai" && (
                      <div className="tab-panel active">
                        <div className="chat-container">
                          <div className="chat-messages">
                            {chatMessages.map((msg, index) => (
                              <div key={index} className={`message ${msg.sender}`}>
                                <div className="msg-avatar">
                                  {msg.sender === "user" ? "JD" : <Sparkles size={14} />}
                                </div>
                                <div className="msg-bubble">
                                  {msg.emailDraft ? (
                                    <>
                                      <p>Here is a draft based on the <strong>Q3 Product Strategy & Roadmap Sync</strong>:</p>
                                      <div className="email-draft-box">
                                        <p><strong>Subject:</strong> Action Items & Next Steps: Q3 Product Strategy</p>
                                        <p>Hi Team,</p>
                                        <p>Thanks for a productive sync today. Here are our high-priority action items as we aim to resolve the onboarding funnel drop-off:</p>
                                        <ul>
                                          <li><strong>@Alex</strong> - Launch OAuth integration sprint for Zoom/Slack (Due Thursday).</li>
                                          <li><strong>@David</strong> - Optimize API endpoints for sub-100ms response times (Due Friday).</li>
                                          <li><strong>@Sarah</strong> - Finalize UI mockups for the new onboarding wizard (Due Friday).</li>
                                        </ul>
                                        <p>We will reconvene on Friday at 10:00 AM for the design and technical review.</p>
                                        <p>Best regards,<br />John</p>
                                      </div>
                                    </>
                                  ) : (
                                    <div dangerouslySetInnerHTML={{ __html: msg.text }}></div>
                                  )}
                                </div>
                              </div>
                            ))}
                            <div ref={chatEndRef} />
                          </div>
                          
                          <form onSubmit={handleSendChat} className="chat-input-bar">
                            <input 
                              type="text" 
                              className="chat-input" 
                              value={chatInput}
                              onChange={(e) => setChatInput(e.target.value)}
                              placeholder="Ask AI a question about your meetings..." 
                            />
                            <button type="submit" className="btn btn-primary btn-icon-only">
                              <Send size={16} />
                            </button>
                          </form>
                        </div>
                      </div>
                    )}

                    {/* Settings Tab */}
                    {dashboardTab === "settings" && (
                      <div className="tab-panel active" style={{ padding: "30px" }}>
                        <h4 style={{ marginBottom: "16px", fontSize: "1rem" }}>Workspace Settings</h4>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "20px" }}>Configure database options and transcription parameters.</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                          <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
                            <p style={{ fontSize: "0.875rem", fontWeight: "700", marginBottom: "4px" }}>HIPAA Shield Mode</p>
                            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Enforces AES-256 local database encryption. Active.</p>
                          </div>
                          <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
                            <p style={{ fontSize: "0.875rem", fontWeight: "700", marginBottom: "4px" }}>Calendar Syncing</p>
                            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Google Workspace connected. Syncing active.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="trusted-by-section">
          <div className="section-container">
            <p className="trusted-title">TRUSTED BY INNOVATIVE TEAMS AT WORLD-CLASS ENTERPRISES</p>
            <div className="logo-cloud">
              <div className="logo-item"><span className="logo-mock">▲</span> Vercel</div>
              <div className="logo-item"><span className="logo-mock">N</span> Notion</div>
              <div className="logo-item"><span className="logo-mock">L</span> Linear</div>
              <div className="logo-item"><span className="logo-mock">❖</span> Figma</div>
              <div className="logo-item"><span className="logo-mock">●</span> Stripe</div>
              <div className="logo-item"><span className="logo-mock">❄</span> Snowflake</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section" id="features">
          <div className="section-container">
            <div className="section-header reveal">
              <h2 className="section-title">Supercharge Your Meeting Workflows</h2>
              <p className="section-subtitle">Everything you need to turn raw conversations into organized workspace knowledge, instantly.</p>
            </div>

            <div className="features-grid">
              {/* Feature Card 1 */}
              <div className="feature-card reveal">
                <div className="feature-icon-wrapper">
                  <Mic size={20} />
                </div>
                <h3 className="feature-title">AI Meeting Transcription</h3>
                <p className="feature-desc">99.2% accuracy in speech-to-text transcription across 32+ languages. Automatically detects speakers, tech jargon, and accents with acoustic models.</p>
              </div>

              {/* Feature Card 2 */}
              <div className="feature-card reveal">
                <div className="feature-icon-wrapper">
                  <FileText size={20} />
                </div>
                <h3 className="feature-title">Smart Summaries</h3>
                <p className="feature-desc">Say goodbye to blocky notes. Generates hyper-structured summaries with executive decisions, project themes, and contextual descriptions tailored to your team.</p>
              </div>

              {/* Feature Card 3 */}
              <div className="feature-card reveal">
                <div className="feature-icon-wrapper">
                  <CheckSquare size={20} />
                </div>
                <h3 className="feature-title">Automatic Action Items</h3>
                <p className="feature-desc">Using advanced LLM reasoning, MeetMind automatically extracts tasks, assignees, and deadlines, syncing them instantly to Jira, Linear, and Asana.</p>
              </div>

              {/* Feature Card 4 */}
              <div className="feature-card reveal">
                <div className="feature-icon-wrapper">
                  <Sparkles size={20} />
                </div>
                <h3 className="feature-title">Semantic RAG Search</h3>
                <p className="feature-desc">Ask your meetings database questions directly. RAG semantic search connects abstract concepts, finding answers across years of meeting archives in milliseconds.</p>
              </div>

              {/* Feature Card 5 */}
              <div className="feature-card reveal">
                <div className="feature-icon-wrapper">
                  <Users size={20} />
                </div>
                <h3 className="feature-title">Team Collaboration</h3>
                <p className="feature-desc">Share summaries, tag teammates in transcripts, add notes, and collaborate in real-time. Integrate directly with Slack workspaces for instant channels sharing.</p>
              </div>

              {/* Feature Card 6 */}
              <div className="feature-card reveal">
                <div className="feature-icon-wrapper">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="feature-title">Enterprise Security</h3>
                <p className="feature-desc">SOC 2 Type II certified. AES-256 data encryption at rest and in transit, private VPC hosting, and custom data-retention schedules for complete HIPAA compliance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section" id="how-it-works">
          <div className="section-container">
            <div className="section-header reveal">
              <h2 className="section-title">Seamless Integration. Instant Intelligence.</h2>
              <p className="section-subtitle">How MeetMind AI turns daily meetings into a searchable, connected intelligence hub.</p>
            </div>

            <div className="steps-container">
              <div className="step-card reveal">
                <div className="step-num">01</div>
                <h3 className="step-title">Connect Meetings</h3>
                <p className="step-desc">Sync with Google Calendar or Microsoft Outlook. The MeetMind bot automatically joins Zoom, Teams, and Google Meet calls when they start.</p>
              </div>
              <div className="step-arrow-icon"><ChevronRight className="w-6 h-6" /></div>
              
              <div className="step-card reveal">
                <div className="step-num">02</div>
                <h3 className="step-title">AI Processing</h3>
                <p className="step-desc">Our transcription pipeline cleans background noise, transcribes text, identifies speakers, and runs specialized LLM summaries in under 3 minutes.</p>
              </div>
              <div className="step-arrow-icon"><ChevronRight className="w-6 h-6" /></div>

              <div className="step-card reveal">
                <div className="step-num">03</div>
                <h3 className="step-title">Insights & Actions</h3>
                <p className="step-desc">Review highlights, assign tasks, edit details, and push structured items directly to your engineering, design, or project management boards.</p>
              </div>
              <div className="step-arrow-icon"><ChevronRight className="w-6 h-6" /></div>

              <div className="step-card reveal">
                <div className="step-num">04</div>
                <h3 className="step-title">Search Knowledge</h3>
                <p className="step-desc">All calls form a semantic index. Ask the AI assistant about past conversations to pull up quotes, dates, metrics, and project contexts instantly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase Section */}
        <section className="product-showcase-section" id="dashboard-showcase">
          <div className="section-container">
            <div className="showcase-grid">
              <div className="showcase-content reveal">
                <span className="showcase-tag">Semantic RAG Engine</span>
                <h2 className="showcase-title">A Semantic Knowledge Base of Your Entire Organization</h2>
                <p className="showcase-desc">
                  MeetMind AI acts as a second brain for your company. It stores, reads, and connects every meeting transcription. Instead of searching keywords, ask questions like:
                </p>
                <div className="query-suggestions">
                  <div className="query-suggestion-item">
                    <Sparkles className="text-blue" size={14} />
                    <span>"Why did we decide to postpone the pricing page launch in April?"</span>
                  </div>
                  <div className="query-suggestion-item">
                    <Sparkles className="text-purple" size={14} />
                    <span>"What design changes did Sarah suggest for the onboarding wizard?"</span>
                  </div>
                  <div className="query-suggestion-item">
                    <Sparkles className="text-blue" size={14} />
                    <span>"List all compliance challenges Alex mentioned during the engineering audit."</span>
                  </div>
                </div>
                <p className="showcase-footer-text">
                  Our LLM searches your vector databases with multi-document cross-referencing, delivering a unified answer with citations linking directly back to timestamped transcripts and audio files.
                </p>
              </div>

              <div className="showcase-graphics-wrapper reveal">
                <div className="glass-graphics-card">
                  <div className="graphic-header">
                    <span className="graphic-dot"></span>
                    <span className="graphic-title">Vector Search Visualization</span>
                  </div>
                  
                  {/* Custom Graph visual */}
                  <div className="vector-graph">
                    <div className="node node-main">
                      <Brain size={18} />
                      <span className="node-tooltip">HIPAA Compliance</span>
                    </div>
                    <div className="node-connection conn-1"></div>
                    <div className="node node-sub node-sub-1">
                      <Shield size={18} />
                      <span className="node-tooltip">Security Audit</span>
                    </div>
                    <div className="node-connection conn-2"></div>
                    <div className="node node-sub node-sub-2">
                      <Database size={18} />
                      <span className="node-tooltip">Database Schema</span>
                    </div>
                    <div className="node-connection conn-3"></div>
                    <div className="node node-sub node-sub-3">
                      <Key size={18} />
                      <span className="node-tooltip">AWS KMS keys</span>
                    </div>
                  </div>

                  <div className="graphics-stats">
                    <div className="stat-box">
                      <p className="stat-val">300ms</p>
                      <p className="stat-lbl">Index Query Latency</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-box">
                      <p className="stat-val">99.8%</p>
                      <p className="stat-lbl">Retrieval Precision</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="benefits-section">
          <div className="section-container">
            <div className="section-header reveal">
              <h2 className="section-title">Designed for Output, Not Administration</h2>
              <p className="section-subtitle">Enable your organization to focus on building, designing, and coding, while MeetMind AI handles alignment.</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card reveal">
                <div className="benefit-icon-wrapper">
                  <Clock size={18} />
                </div>
                <h3 className="benefit-title">Save Hours of Admin Time</h3>
                <p className="benefit-desc">No more manual summary drafting or logging tickets. MeetMind writes your meeting summaries and creates your workspace tasks automatically, returning 4+ hours per employee every week.</p>
              </div>

              <div className="benefit-card reveal">
                <div className="benefit-icon-wrapper">
                  <GitMerge size={18} />
                </div>
                <h3 className="benefit-title">Improve Team Alignment</h3>
                <p className="benefit-desc">Keep cross-functional departments (product, design, engineering, sales) aligned with automated summaries shared directly to Slack channels. Eliminate ambiguity about what was agreed upon.</p>
              </div>

              <div className="benefit-card reveal">
                <div className="benefit-icon-wrapper">
                  <Milestone size={18} />
                </div>
                <h3 className="benefit-title">Never Miss Key Decisions</h3>
                <p className="benefit-desc">With central knowledge storage, decisions are never lost. When team members change or projects are resurrected, easily query past discussions to understand historical context.</p>
              </div>

              <div className="benefit-card reveal">
                <div className="benefit-icon-wrapper">
                  <TrendingUp size={18} />
                </div>
                <h3 className="benefit-title">Increase Meeting ROI</h3>
                <p className="benefit-desc">Ensure meetings are productive. By automatically extracting action items and tracking accountability, every call results in progress. Make meetings shorter, or skip them and read summaries.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="section-container">
            <div className="section-header reveal">
              <h2 className="section-title">Loved by High-Growth Teams</h2>
              <p className="section-subtitle">Here is how engineering leaders, product designers, and founders run alignment with MeetMind AI.</p>
            </div>

            <div className="testimonials-grid">
              {/* Testimonial 1 */}
              <div className="testimonial-card reveal">
                <div className="stars">
                  <Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} />
                </div>
                <p className="testimonial-text">
                  "MeetMind AI has fundamentally changed how we run engineering sprints. Instead of taking scribbled notes during standalone architecture reviews, we just talk. The RAG search across our past meeting history is like magic for onboarding new devs."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar av-1">AR</div>
                  <div className="author-details">
                    <h4 className="author-name">Alex Rivera</h4>
                    <p className="author-title">VP of Engineering, Vercel</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="testimonial-card reveal">
                <div className="stars">
                  <Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} />
                </div>
                <p className="testimonial-text">
                  "The design mockups, developer requirements, and sync points are automatically organized and sent directly to Linear. It feels like we hired an executive assistant for every single product manager on our team. A massive time-saver."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar av-2">SJ</div>
                  <div className="author-details">
                    <h4 className="author-name">Sarah Jenkins</h4>
                    <p className="author-title">Lead Product Designer, Linear</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="testimonial-card reveal">
                <div className="stars">
                  <Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} />
                </div>
                <p className="testimonial-text">
                  "As a founder, I bounce between board reviews, investor pitches, and team syncs. With MeetMind AI, I can search 'investor concerns about HIPAA' and retrieve every specific question asked across 4 months of calls in 2 seconds."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar av-3">MK</div>
                  <div className="author-details">
                    <h4 className="author-name">Marcus K.</h4>
                    <p className="author-title">Founder & CEO, Novatech</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="pricing-section" id="pricing">
          <div className="section-container">
            <div className="section-header reveal">
              <h2 className="section-title">Simple, Predictable Pricing</h2>
              <p className="section-subtitle">Start free, upgrade when your team scales. No hidden fees or onboarding costs.</p>
              
              {/* Billing Toggle */}
              <div className="billing-toggle-container">
                <span className={`toggle-lbl ${!isYearlyBilling ? "active" : ""}`} onClick={() => setIsYearlyBilling(false)}>Monthly</span>
                <button 
                  className={`toggle-switch ${isYearlyBilling ? "yearly" : ""}`} 
                  onClick={() => setIsYearlyBilling(!isYearlyBilling)}
                  aria-label="Toggle billing duration"
                >
                  <span className="toggle-switch-handle"></span>
                </button>
                <span className={`toggle-lbl ${isYearlyBilling ? "active" : ""}`} onClick={() => setIsYearlyBilling(true)}>
                  Yearly <span className="discount-pill">Save 20%</span>
                </span>
              </div>
            </div>

            <div className="pricing-grid">
              {/* Starter Plan */}
              <div className="pricing-card reveal">
                <div className="card-header">
                  <h3 className="plan-name">Starter</h3>
                  <p className="plan-desc">For professionals and freelancers looking to automate notes.</p>
                  <div className="price-box">
                    <span className="currency">$</span>
                    <span className="price-amount">0</span>
                    <span className="duration">/mo</span>
                  </div>
                  <a href="#signup" className="btn btn-secondary w-full">Get Started Free</a>
                </div>
                <div className="card-body">
                  <ul className="features-list">
                    <li><Check size={14} /> 5 meeting hours per month</li>
                    <li><Check size={14} /> 95% transcription accuracy</li>
                    <li><Check size={14} /> Basic AI summaries & action items</li>
                    <li><Check size={14} /> Integrates with Zoom, Teams, Meet</li>
                    <li className="muted"><X size={14} /> Semantic RAG search across history</li>
                    <li className="muted"><X size={14} /> Custom security configurations</li>
                  </ul>
                </div>
              </div>

              {/* Professional Plan (Featured) */}
              <div className="pricing-card featured reveal">
                <div className="popular-badge">Most Popular</div>
                <div className="card-header">
                  <h3 className="plan-name">Professional</h3>
                  <p className="plan-desc">For scaling teams that need deep search and collaboration.</p>
                  <div className="price-box">
                    <span className="currency">$</span>
                    <span className="price-amount">{isYearlyBilling ? "15" : "19"}</span>
                    <span className="duration">/mo</span>
                  </div>
                  <a href="#signup" class="btn btn-primary w-full">Start 14-Day Free Trial</a>
                </div>
                <div className="card-body">
                  <ul className="features-list">
                    <li><Check size={14} /> Unlimited meeting hours</li>
                    <li><Check size={14} /> 99.2% transcription accuracy</li>
                    <li><Check size={14} /> Custom summary templates</li>
                    <li><Check size={14} /> Semantic RAG search (past 1 year)</li>
                    <li><Check size={14} /> Slack, Notion, Jira & Linear integrations</li>
                    <li><Check size={14} /> Workspace collaboration & notes tagging</li>
                  </ul>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="pricing-card reveal">
                <div className="card-header">
                  <h3 className="plan-name">Enterprise</h3>
                  <p className="plan-desc">For large companies requiring top-tier security and API options.</p>
                  <div className="price-box">
                    <span className="price-custom">Custom</span>
                  </div>
                  <a href="#demo" className="btn btn-secondary w-full">Contact Sales</a>
                </div>
                <div className="card-body">
                  <ul className="features-list">
                    <li><Check size={14} /> Unlimited hours + Premium priority queues</li>
                    <li><Check size={14} /> Dedicated LLM models & custom vocabulary</li>
                    <li><Check size={14} /> Infinite Semantic search database</li>
                    <li><Check size={14} /> SOC-2 Type II, HIPAA, & Custom VPC hosting</li>
                    <li><Check size={14} /> SAML SSO & Advanced user provisioning</li>
                    <li><Check size={14} /> Dedicated Success Manager & 24/7 SLA Support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section" id="faq">
          <div className="section-container">
            <div className="section-header reveal">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Everything you need to know about MeetMind AI transcription, security, and usage.</p>
            </div>

            <div className="faq-accordion-list">
              {/* Accordion 1 */}
              <div className={`accordion-item reveal ${openAccordionIndex === 0 ? "active" : ""}`}>
                <button className="accordion-header" onClick={() => toggleAccordion(0)}>
                  <span>How does MeetMind AI join my meetings?</span>
                  <span className="accordion-icon"><ChevronDown size={16} /></span>
                </button>
                <div 
                  className="accordion-content"
                  style={{
                    maxHeight: openAccordionIndex === 0 ? "300px" : "0px",
                    transition: "max-height 0.4s ease-out"
                  }}
                >
                  <p>Once you connect your Google Calendar or Microsoft Outlook calendar, MeetMind detects any upcoming Zoom, Microsoft Teams, or Google Meet links. A background bot will automatically request access to join the call at the scheduled time, record the meeting, and process it instantly. You can also customize which meetings the bot joins automatically.</p>
                </div>
              </div>

              {/* Accordion 2 */}
              <div className={`accordion-item reveal ${openAccordionIndex === 1 ? "active" : ""}`}>
                <button className="accordion-header" onClick={() => toggleAccordion(1)}>
                  <span>How accurate is the transcription engine?</span>
                  <span className="accordion-icon"><ChevronDown size={16} /></span>
                </button>
                <div 
                  className="accordion-content"
                  style={{
                    maxHeight: openAccordionIndex === 1 ? "300px" : "0px",
                    transition: "max-height 0.4s ease-out"
                  }}
                >
                  <p>Our speech-to-text engine boasts a 99.2% accuracy rate under ordinary conditions. It relies on noise-cancellation filtering, speaker identification, and customizable vocabulary dictionaries that adapt to your company's product names, acronyms, and technical jargon to ensure perfect naming and context.</p>
                </div>
              </div>

              {/* Accordion 3 */}
              <div className={`accordion-item reveal ${openAccordionIndex === 2 ? "active" : ""}`}>
                <button className="accordion-header" onClick={() => toggleAccordion(2)}>
                  <span>What is Semantic Search (RAG) and how does it work?</span>
                  <span className="accordion-icon"><ChevronDown size={16} /></span>
                </button>
                <div 
                  className="accordion-content"
                  style={{
                    maxHeight: openAccordionIndex === 2 ? "300px" : "0px",
                    transition: "max-height 0.4s ease-out"
                  }}
                >
                  <p>Semantic RAG (Retrieval-Augmented Generation) search does not just scan for exact keyword matches. Instead, it translates your conversations and natural-language queries into mathematical vector embeddings. This allows the AI to search for abstract concepts (e.g., searching for "onboarding bottlenecks" will surface conversations about "drop-offs during the integration phase"), pulling precise answers across months of meeting history.</p>
                </div>
              </div>

              {/* Accordion 4 */}
              <div className={`accordion-item reveal ${openAccordionIndex === 3 ? "active" : ""}`}>
                <button className="accordion-header" onClick={() => toggleAccordion(3)}>
                  <span>Is my company's data safe with MeetMind AI?</span>
                  <span className="accordion-icon"><ChevronDown size={16} /></span>
                </button>
                <div 
                  className="accordion-content"
                  style={{
                    maxHeight: openAccordionIndex === 3 ? "300px" : "0px",
                    transition: "max-height 0.4s ease-out"
                  }}
                >
                  <p>Absolutely. Security is our top priority. MeetMind AI is SOC 2 Type II certified. All data is fully encrypted using AES-256 at rest and TLS 1.3 in transit. We run isolation boundaries between enterprise workspaces, never use your proprietary data to train base models, and support HIPAA compliance criteria for healthcare organizations.</p>
                </div>
              </div>

              {/* Accordion 5 */}
              <div className={`accordion-item reveal ${openAccordionIndex === 4 ? "active" : ""}`}>
                <button className="accordion-header" onClick={() => toggleAccordion(4)}>
                  <span>Can I export transcripts and summaries to other platforms?</span>
                  <span className="accordion-icon"><ChevronDown size={16} /></span>
                </button>
                <div 
                  className="accordion-content"
                  style={{
                    maxHeight: openAccordionIndex === 4 ? "300px" : "0px",
                    transition: "max-height 0.4s ease-out"
                  }}
                >
                  <p>Yes. You can export summaries and transcripts in PDF, Markdown, TXT, or JSON formats. MeetMind AI also supports automated sync integrations: it can instantly drop summaries into Slack channels, create cards on Linear or Jira boards, and document meeting files within Notion, Confluence, or Google Drive pages.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="final-cta-section">
          <div className="section-container reveal">
            <div className="cta-card">
              <div className="cta-content">
                <h2 className="cta-title">Make Every Meeting Count</h2>
                <p className="cta-desc">Join over 10,000+ teams building products, coordinating workflows, and scaling companies with MeetMind AI. Start today for free.</p>
                <div className="cta-buttons">
                  <a href="#signup" className="btn btn-primary btn-lg">Get Started Free</a>
                  <a href="#demo" className="btn btn-secondary-light btn-lg">Request Demo</a>
                </div>
                <p className="cta-fineprint">No credit card required. 14-day trial of Professional features included.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Branding and info */}
            <div className="footer-brand">
              <a href="#" className="logo-group">
                <div className="logo-icon">
                  <span className="logo-dot"></span>
                </div>
                <span className="logo-text">MeetMind <span className="accent-text">AI</span></span>
              </a>
              <p className="brand-pitch">Automating meeting intelligence for high-velocity teams using advanced LLMs and RAG vector storage systems.</p>
              <div className="social-links">
                <a href="#" aria-label="Twitter"><Twitter size={14} /></a>
                <a href="#" aria-label="GitHub"><Github size={14} /></a>
                <a href="#" aria-label="LinkedIn"><Linkedin size={14} /></a>
              </div>
            </div>

            {/* Product Links */}
            <div className="footer-links-col">
              <h4 className="col-title">Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#dashboard-showcase">Interactive Demo</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#security">Security Core</a></li>
                <li><a href="#changelog">Changelog</a></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="footer-links-col">
              <h4 className="col-title">Resources</h4>
              <ul>
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#blog">Company Blog</a></li>
                <li><a href="#guides">RAG Best Practices</a></li>
                <li><a href="#support">Help Center</a></li>
                <li><a href="#status">System Status</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="footer-links-col">
              <h4 className="col-title">Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#careers">Careers <span className="hiring-badge">We're hiring</span></a></li>
                <li><a href="#press">Press Kit</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">&copy; 2026 MeetMind AI, Inc. All rights reserved.</p>
            <div className="legal-bottom-links">
              <a href="#privacy">Privacy</a>
              <span className="bullet">•</span>
              <a href="#terms">Terms</a>
              <span className="bullet">•</span>
              <a href="#security">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
