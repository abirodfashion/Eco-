// State Management
let state = {
    lang: 'EN',
    currentView: 'home',
    currentUser: JSON.parse(localStorage.getItem('eco_current_user')) || null,
    adminSection: 'dashboard',
    authType: 'login',
    authRole: 'CUSTOMER',
    users: JSON.parse(localStorage.getItem('eco_users')) || [
        { id: 'admin-1', fullName: 'RAFEE NAHEYAN', username: '1234', password: '1234', role: 'ADMIN', status: 'ACTIVE' }
    ],
    content: JSON.parse(localStorage.getItem('eco_content')) || {
        EN: {
            subtitle: 'Organic & Fresh Dairy Products',
            heroTitle: 'Eco Dairy Farm',
            heroDesc: 'Experience the purity of nature with our organic dairy products. Fresh from our farm to your table, every day.',
            aboutTitle: 'Modern Dairy Farming & Healthy Cow Rearing',
            coreFeatures: 'Our Core Features',
            coreDesc: 'We combine traditional values with modern technology to ensure the highest quality.',
            farmGallery: 'Farm Gallery',
            getInTouch: 'Get in Touch',
            address: 'Jadurani Bajar, Haripur, Thakurgaon',
            phone: '+8801727387706',
            email: 'rafeenaheyan2@gmail.com',
            footerText: '© 2026 Eco Dairy Farm. Built with excellence.'
        },
        BN: {
            subtitle: 'অর্গানিক এবং ফ্রেশ ডেইরি পণ্য',
            heroTitle: 'ইকো ডেইরি ফার্ম',
            heroDesc: 'আমাদের অর্গানিক ডেইরি পণ্যের সাথে প্রকৃতির বিশুদ্ধতা অনুভব করুন। প্রতিদিন আমাদের খামার থেকে সরাসরি আপনার টেবিলে।',
            aboutTitle: 'আধুনিক ডেইরি ফার্মিং ও স্বাস্থ্যকর গরু পালন',
            coreFeatures: 'আমাদের মূল বৈশিষ্ট্য',
            coreDesc: 'আমরা সর্বোচ্চ গুণমান নিশ্চিত করতে আধুনিক প্রযুক্তির সাথে ঐতিহ্যগত মূল্যবোধের সমন্বয় করি।',
            farmGallery: 'খামার গ্যালারি',
            getInTouch: 'যোগাযোগ করুন',
            address: 'যাদুরাণী বাজার, হরিপুর, ঠাকুরগাঁও',
            phone: '+৮৮০১৭২৭৩৮৭৭০৬',
            email: 'rafeenaheyan2@gmail.com',
            footerText: '© ২০২৬ ইকো ডেইরি ফার্ম। শ্রেষ্ঠত্বের সাথে নির্মিত।'
        }
    },
    gallery: JSON.parse(localStorage.getItem('eco_gallery')) || [1, 2, 3, 4, 5, 6, 7, 8].map(i => `https://picsum.photos/seed/farm${i}/500/500`),
    orders: JSON.parse(localStorage.getItem('eco_orders')) || [],
    transactions: JSON.parse(localStorage.getItem('eco_transactions')) || [],
    notifications: JSON.parse(localStorage.getItem('eco_notifications')) || []
};

// Translations
const t = {
    EN: {
        home: 'Home', about: 'About Us', info: 'Information', gallery: 'Gallery', contact: 'Contact',
        login: 'Login', create: 'Create Account', loginCreate: 'Login / Create Account', settings: 'Settings',
        adminLogin: 'Admin Login', logout: 'Logout', subtitle: 'Organic & Fresh Dairy Products',
        heroTitle: 'Eco Dairy Farm', heroDesc: 'Experience the purity of nature with our organic dairy products. Fresh from our farm to your table, every day.',
        getStarted: 'Get Started', learnMore: 'Learn More', aboutTitle: 'Modern Dairy Farming & Healthy Cow Rearing',
        coreFeatures: 'Our Core Features', coreDesc: 'We combine traditional values with modern technology to ensure the highest quality.',
        farmGallery: 'Farm Gallery', getInTouch: 'Get in Touch', address: 'Address', phone: 'Phone', email: 'Email', management: 'Management Team'
    },
    BN: {
        home: 'হোম', about: 'আমাদের সম্পর্কে', info: 'তথ্য', gallery: 'গ্যালারি', contact: 'যোগাযোগ',
        login: 'লগইন', create: 'অ্যাকাউন্ট তৈরি করুন', loginCreate: 'লগইন / অ্যাকাউন্ট তৈরি', settings: 'সেটিংস',
        adminLogin: 'অ্যাডমিন লগইন', logout: 'লগআউট', subtitle: 'অর্গানিক এবং ফ্রেশ ডেইরি পণ্য',
        heroTitle: 'ইকো ডেইরি ফার্ম', heroDesc: 'আমাদের অর্গানিক ডেইরি পণ্যের সাথে প্রকৃতির বিশুদ্ধতা অনুভব করুন। প্রতিদিন আমাদের খামার থেকে সরাসরি আপনার টেবিলে।',
        getStarted: 'শুরু করুন', learnMore: 'আরও জানুন', aboutTitle: 'আধুনিক ডেইরি ফার্মিং ও স্বাস্থ্যকর গরু পালন',
        coreFeatures: 'আমাদের মূল বৈশিষ্ট্য', coreDesc: 'আমরা সর্বোচ্চ গুণমান নিশ্চিত করতে আধুনিক প্রযুক্তির সাথে ঐতিহ্যগত মূল্যবোধের সমন্বয় করি।',
        farmGallery: 'খামার গ্যালারি', getInTouch: 'যোগাযোগ করুন', address: 'ঠিকানা', phone: 'ফোন', email: 'ইমেইল', management: 'ব্যবস্থাপনা দল'
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderView();
    setupEventListeners();
});

function setupEventListeners() {
    // Language Toggle
    document.getElementById('langToggle').addEventListener('click', () => {
        state.lang = state.lang === 'EN' ? 'BN' : 'EN';
        updateTranslations();
    });

    // Sidebar Toggle
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.remove('translate-x-full');
        sidebarOverlay.classList.remove('hidden');
        setTimeout(() => sidebarOverlay.classList.add('opacity-100'), 10);
    });

    closeSidebar.addEventListener('click', closeSidebarFunc);
    sidebarOverlay.addEventListener('click', closeSidebarFunc);

    function closeSidebarFunc() {
        sidebar.classList.add('translate-x-full');
        sidebarOverlay.classList.remove('opacity-100');
        setTimeout(() => sidebarOverlay.classList.add('hidden'), 300);
    }

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        state.currentUser = null;
        localStorage.removeItem('eco_current_user');
        showView('home');
        showAlert('success', 'Logged out successfully');
    });
}

function updateTranslations() {
    const langText = document.getElementById('langText');
    langText.textContent = state.lang === 'EN' ? 'বাংলা' : 'English';
    
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        // Check if there's an override in state.content
        if (state.content[state.lang] && state.content[state.lang][key]) {
            el.textContent = state.content[state.lang][key];
        } else if (t[state.lang][key]) {
            el.textContent = t[state.lang][key];
        }
    });
}

function showView(view) {
    state.currentView = view;
    renderView();
    // Close sidebar if open
    document.getElementById('sidebar').classList.add('translate-x-full');
    document.getElementById('sidebarOverlay').classList.add('hidden');
}

function renderView() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    // Update Sidebar Auth Buttons
    const authButtons = document.getElementById('sidebarAuthButtons');
    const logoutBtn = document.getElementById('logoutBtn');
    const dashLink = document.getElementById('dashLink');
    const loginCreateBtn = document.getElementById('loginCreateBtn');
    const adminLoginBtn = document.getElementById('adminLoginBtn');

    if (state.currentUser) {
        authButtons.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        dashLink.classList.remove('hidden');
        loginCreateBtn.classList.add('hidden');
        adminLoginBtn.classList.add('hidden');
    } else {
        authButtons.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        dashLink.classList.add('hidden');
        loginCreateBtn.classList.remove('hidden');
        adminLoginBtn.classList.remove('hidden');
    }

    if (state.currentView === 'home') {
        const template = document.getElementById('home-template');
        app.appendChild(template.content.cloneNode(true));
        renderHomeContent();
    } else if (state.currentView === 'login' || state.currentView === 'register' || state.currentView === 'adminLogin') {
        const template = document.getElementById('auth-template');
        app.appendChild(template.content.cloneNode(true));
        renderAuthView();
    } else if (state.currentView === 'completeProfile') {
        const template = document.getElementById('complete-profile-template');
        app.appendChild(template.content.cloneNode(true));
        renderCompleteProfileView();
    } else if (state.currentView === 'dashboard') {
        if (!state.currentUser) {
            showAlert('error', 'Please login to continue');
            showView('login');
            return;
        }
        if (state.currentUser.status === 'INCOMPLETE_PROFILE') {
            showView('completeProfile');
            return;
        }
        const template = document.getElementById('dashboard-template');
        app.appendChild(template.content.cloneNode(true));
        renderDashboard();
    }
    
    lucide.createIcons();
    updateTranslations();
    window.scrollTo(0, 0);
}

function renderHomeContent() {
    const content = state.content[state.lang];
    
    // Update text content
    const heroTitle = document.querySelector('.hero-title');
    const heroDesc = document.querySelector('.hero-desc');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const aboutTitle = document.querySelector('.about-title');
    const coreFeaturesTitle = document.querySelector('.core-features-title');
    const coreDesc = document.querySelector('.core-desc');
    const galleryTitle = document.querySelector('.gallery-title');
    
    if (heroTitle) heroTitle.textContent = content.heroTitle;
    if (heroDesc) heroDesc.textContent = content.heroDesc;
    if (heroSubtitle) heroSubtitle.textContent = content.subtitle;
    if (aboutTitle) aboutTitle.textContent = content.aboutTitle;
    if (coreFeaturesTitle) coreFeaturesTitle.textContent = content.coreFeatures;
    if (coreDesc) coreDesc.textContent = content.coreDesc;
    if (galleryTitle) galleryTitle.textContent = content.farmGallery;

    // About Features
    const features = state.lang === 'EN' ? [
        'Healthy cow rearing and regular checkups',
        'Cleanliness and use of modern technology',
        '100% organic and fresh dairy products',
        'Eco-friendly eco-system'
    ] : [
        'স্বাস্থ্যকর গরু পালন ও নিয়মিত চেকআপ',
        'পরিচ্ছন্নতা ও আধুনিক প্রযুক্তি ব্যবহার',
        '১০০% অর্গানিক ও ফ্রেশ ডেইরি পণ্য',
        'পরিবেশবান্ধব ইকো-সিস্টেম'
    ];
    
    const featuresContainer = document.getElementById('aboutFeatures');
    if (featuresContainer) {
        featuresContainer.innerHTML = '';
        features.forEach(f => {
            const div = document.createElement('div');
            div.className = 'flex items-start gap-3 md:gap-4';
            div.innerHTML = `
                <div class="mt-1 p-1 bg-farm-light rounded-full shrink-0">
                    <i data-lucide="check-circle-2" class="w-4 h-4 md:w-5 md:h-5 text-farm-green"></i>
                </div>
                <p class="text-sm md:text-base text-slate-600">${f}</p>
            `;
            featuresContainer.appendChild(div);
        });
    }

    // Info Cards
    const cards = [
        { title: 'Healthy Cows', desc: 'Regular veterinary checkups and organic feed.', icon: '🐄' },
        { title: 'Quality Milk', desc: 'Automated milking and instant cooling system.', icon: '🥛' },
        { title: 'Eco-Friendly', desc: 'Sustainable waste management and green energy.', icon: '🌱' }
    ];
    const cardsContainer = document.getElementById('infoCards');
    if (cardsContainer) {
        cardsContainer.innerHTML = '';
        cards.forEach(c => {
            const div = document.createElement('div');
            div.className = 'bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 text-center card-hover';
            div.innerHTML = `
                <div class="text-4xl md:text-5xl mb-4 md:mb-6">${c.icon}</div>
                <h3 class="text-lg md:text-xl font-bold mb-3 md:mb-4">${c.title}</h3>
                <p class="text-slate-500 text-xs md:text-sm leading-relaxed">${c.desc}</p>
            `;
            cardsContainer.appendChild(div);
        });
    }

    // Gallery
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        galleryGrid.innerHTML = '';
        state.gallery.forEach((img, i) => {
            const div = document.createElement('div');
            div.className = 'aspect-square rounded-2xl overflow-hidden shadow-md hover:scale-105 transition-transform';
            div.innerHTML = `<img src="${img}" alt="Gallery ${i}" class="w-full h-full object-cover">`;
            galleryGrid.appendChild(div);
        });
    }
    lucide.createIcons();
}

function renderAuthView() {
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');
    const submitBtn = document.getElementById('authSubmitBtn');
    const switchText = document.getElementById('authSwitchText');
    const roleSelector = document.getElementById('roleSelector');
    const registerFields = document.getElementById('registerFields');
    const form = document.getElementById('authForm');
    const backToLoginBtn = document.getElementById('backToLoginBtn');
    const passwordStrengthContainer = document.getElementById('passwordStrengthContainer');
    const passwordInput = document.getElementById('authPasswordInput');

    if (state.currentView === 'adminLogin') {
        title.textContent = 'Admin Login';
        subtitle.textContent = 'Restricted access for administrators only';
        submitBtn.textContent = 'Login as Admin';
        switchText.classList.add('hidden');
        roleSelector.classList.add('hidden');
        registerFields.classList.add('hidden');
        if (backToLoginBtn) backToLoginBtn.classList.add('hidden');
        if (passwordStrengthContainer) passwordStrengthContainer.classList.add('hidden');
    } else if (state.currentView === 'login') {
        title.textContent = 'Welcome Back';
        subtitle.textContent = 'Please enter your details to login';
        submitBtn.textContent = 'Sign In';
        switchText.classList.remove('hidden');
        roleSelector.classList.add('hidden');
        registerFields.classList.add('hidden');
        if (backToLoginBtn) backToLoginBtn.classList.add('hidden');
        if (passwordStrengthContainer) passwordStrengthContainer.classList.add('hidden');
    } else {
        title.textContent = 'Create Account';
        subtitle.textContent = 'Join our eco-friendly dairy community';
        submitBtn.textContent = 'Create Account';
        switchText.classList.remove('hidden');
        roleSelector.classList.remove('hidden');
        if (backToLoginBtn) backToLoginBtn.classList.remove('hidden');
        
        if (state.authRole === 'ENTREPRENEUR') {
            registerFields.classList.add('hidden');
            submitBtn.textContent = 'Contact Manager to Join';
            subtitle.textContent = 'Entrepreneurs must contact a manager for account creation';
            if (passwordStrengthContainer) passwordStrengthContainer.classList.add('hidden');
        } else {
            registerFields.classList.remove('hidden');
            if (passwordStrengthContainer) passwordStrengthContainer.classList.remove('hidden');
        }
    }

    if (passwordInput) {
        passwordInput.oninput = (e) => {
            if (state.currentView === 'register' && state.authRole === 'CUSTOMER') {
                updatePasswordStrength(e.target.value);
            }
        };
    }

    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (state.currentView === 'adminLogin') {
            if (data.username === '1234' && data.password === '1234') {
                state.currentUser = state.users.find(u => u.username === '1234');
                localStorage.setItem('eco_current_user', JSON.stringify(state.currentUser));
                localStorage.setItem('role', 'admin');
                showView('dashboard');
                showAlert('success', 'Admin login successful');
            } else {
                showAlert('error', 'Invalid admin credentials');
            }
        } else if (state.currentView === 'login') {
            const user = state.users.find(u => u.username === data.username && u.password === data.password);
            if (user) {
                if (user.status === 'SUSPENDED') {
                    showAlert('error', 'Your account has been suspended. Please contact admin.');
                    return;
                }
                state.currentUser = user;
                localStorage.setItem('eco_current_user', JSON.stringify(user));
                localStorage.setItem('role', user.role.toLowerCase());
                
                if (user.status === 'INCOMPLETE_PROFILE') {
                    showView('completeProfile');
                } else if (user.status === 'PENDING_APPROVAL') {
                    showAlert('info', 'Your profile is pending admin approval.');
                    showView('dashboard');
                } else {
                    showView('dashboard');
                    showAlert('success', `Welcome back, ${user.fullName}`);
                }
            } else {
                showAlert('error', 'Invalid username or password');
            }
        } else {
            // Register
            if (state.authRole === 'ENTREPRENEUR') {
                openEntrepreneurModal();
                return;
            }
            const newUser = {
                id: 'u-' + Date.now(),
                fullName: data.fullName,
                username: data.username,
                password: data.password,
                role: state.authRole,
                status: state.authRole === 'CUSTOMER' ? 'APPROVED' : 'PENDING',
                createdAt: new Date().toISOString()
            };
            state.users.push(newUser);
            localStorage.setItem('eco_users', JSON.stringify(state.users));
            showAlert('success', 'Account created! You can now login.');
            showView('login');
        }
    };
}

function updatePasswordStrength(password) {
    const bars = [
        document.getElementById('strengthBar1'),
        document.getElementById('strengthBar2'),
        document.getElementById('strengthBar3'),
        document.getElementById('strengthBar4')
    ];
    const text = document.getElementById('strengthText');
    if (!text || !bars[0]) return;
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const colors = ['bg-slate-200', 'bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];
    const labels = ['Too Short', 'Weak', 'Fair', 'Good', 'Strong'];

    bars.forEach((bar, i) => {
        if (i < strength) {
            bar.className = `flex-1 rounded-full transition-all ${colors[strength]}`;
        } else {
            bar.className = 'flex-1 rounded-full bg-slate-200 transition-all';
        }
    });

    text.textContent = password.length > 0 ? labels[strength] : 'Password Strength';
    text.className = `text-[10px] font-bold uppercase tracking-wider ${password.length > 0 ? colors[strength].replace('bg-', 'text-') : 'text-slate-400'}`;
}

function switchAuth() {
    state.currentView = state.currentView === 'login' ? 'register' : 'login';
    renderView();
}

function setAuthRole(role) {
    state.authRole = role;
    const btnC = document.getElementById('roleCustomer');
    const btnE = document.getElementById('roleEntrepreneur');
    if (role === 'CUSTOMER') {
        btnC.className = 'flex-1 py-3 rounded-xl font-bold transition-all bg-white text-farm-green shadow-sm';
        btnE.className = 'flex-1 py-3 rounded-xl font-bold transition-all text-slate-500';
    } else {
        btnE.className = 'flex-1 py-3 rounded-xl font-bold transition-all bg-white text-farm-green shadow-sm';
        btnC.className = 'flex-1 py-3 rounded-xl font-bold transition-all text-slate-500';
    }
    renderAuthView(); // Re-render to update fields
}

function renderDashboard() {
    const user = state.currentUser;
    const adminSidebar = document.getElementById('adminSidebar');
    const mobileAdminNav = document.getElementById('mobileAdminNav');
    const dashTitle = document.getElementById('dashTitle');
    const dashContent = document.getElementById('dashContent');
    const dashStats = document.getElementById('dashStats');
    const dashCharts = document.getElementById('dashCharts');

    // Reset view
    dashContent.innerHTML = '';
    dashStats.innerHTML = '';
    dashCharts.classList.add('hidden');

    if (user.role === 'ADMIN') {
        adminSidebar.classList.remove('hidden');
        adminSidebar.classList.add('flex');
        mobileAdminNav.classList.remove('hidden');
        renderAdminNav();
        renderAdminSection(state.adminSection);
        updateNotifBadge();
    } else {
        adminSidebar.classList.add('hidden');
        mobileAdminNav.classList.add('hidden');
        renderUserDashboard();
    }
}

function toggleMobileMenu() {
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
}

function renderAdminNav() {
    const nav = document.getElementById('adminNav');
    const sections = [
        { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
        { id: 'landing', label: 'Landing Page', icon: 'home' },
        { id: 'users', label: 'User Management', icon: 'users' },
        { id: 'entrepreneurs', label: 'Entrepreneur Management', icon: 'briefcase' },
        { id: 'orders', label: 'Orders', icon: 'shopping-cart' },
        { id: 'transactions', label: 'Transactions', icon: 'credit-card' },
        { id: 'approvals', label: 'Approvals', icon: 'check-square' },
        { id: 'gallery', label: 'Gallery', icon: 'image' },
        { id: 'contact', label: 'Contact Info', icon: 'phone' },
        { id: 'notifications', label: 'Notifications', icon: 'bell' },
        { id: 'settings', label: 'Settings', icon: 'settings' }
    ];

    nav.innerHTML = sections.map(s => `
        <button onclick="${s.id === 'settings' ? 'openSettingsPanel()' : `setAdminSection('${s.id}')`}" 
                class="admin-nav-item flex items-center gap-3 w-full p-3 rounded-xl font-medium text-sm ${state.adminSection === s.id ? 'active' : 'text-slate-600'}">
            <i data-lucide="${s.icon}" class="w-4 h-4"></i>
            ${s.label}
        </button>
    `).join('');
    lucide.createIcons();
}

function openSettingsPanel() {
    const panel = document.getElementById('settingsPanel');
    panel.classList.add('open');
    renderSettingsSubNav();
}

function closeSettingsPanel() {
    const panel = document.getElementById('settingsPanel');
    panel.classList.remove('open');
}

function renderSettingsSubNav() {
    const subNav = document.getElementById('settingsSubNav');
    const items = [
        { label: 'Edit Landing Page', action: "renderLandingEditor()" },
        { label: 'Edit Gallery', action: "renderGalleryEditor()" },
        { label: 'Edit Contact Info', action: "renderContactEditor()" },
        { label: 'Edit Footer', action: "renderFooterEditor()" },
        { label: 'Edit Users', action: "renderUserManagement(false)" },
        { label: 'Edit Entrepreneurs', action: "renderEntrepreneurManagement(false)" },
        { label: 'Edit Approvals', action: "renderApprovals(false)" },
        { label: 'Edit Orders', action: "renderOrderManagement(false)" },
        { label: 'Edit System Text', action: "renderSystemTextEditor()" }
    ];

    subNav.innerHTML = items.map(item => `
        <button onclick="${item.action}; document.body.classList.add('sidebar-closed'); closeSettingsPanel();" class="w-full text-left p-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-farm-green transition-all flex items-center justify-between group">
            ${item.label}
            <i data-lucide="chevron-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all"></i>
        </button>
    `).join('');
    lucide.createIcons();
}

function setAdminSection(section) {
    state.adminSection = section;
    document.body.classList.remove('sidebar-closed');
    closeSettingsPanel();
    
    // Close mobile menu
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('show');

    const mobileLabel = document.getElementById('mobileCurrentSection');
    if (mobileLabel) mobileLabel.textContent = section.charAt(0).toUpperCase() + section.slice(1);
    renderDashboard();
}

function renderAdminSection(section) {
    const dashTitle = document.getElementById('dashTitle');
    const dashContent = document.getElementById('dashContent');
    const dashStats = document.getElementById('dashStats');
    const dashCharts = document.getElementById('dashCharts');
    const headerActions = document.getElementById('dashHeaderActions');
    
    dashTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);
    headerActions.innerHTML = '';

    // Add back button for non-dashboard sections
    let backHeader = '';
    if (section !== 'dashboard') {
        backHeader = `
            <div class="mb-6">
                <button onclick="setAdminSection('dashboard')" class="btn-back">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Dashboard
                </button>
            </div>
        `;
    }

    if (section === 'dashboard') {
        dashCharts.classList.remove('hidden');
        renderAdminStats();
        renderAdminDashboardHome();
    } else {
        dashCharts.classList.add('hidden');
        dashStats.innerHTML = '';
        dashContent.innerHTML = backHeader;
        
        if (section === 'users') {
            renderUserManagement(true);
        } else if (section === 'entrepreneurs') {
            renderEntrepreneurManagement(true);
        } else if (section === 'landing') {
            renderLandingView();
        } else if (section === 'gallery') {
            renderGalleryView();
        } else if (section === 'contact') {
            renderContactView();
        } else if (section === 'approvals') {
            renderApprovals();
        } else if (section === 'orders') {
            renderOrderManagement(true);
        } else if (section === 'transactions') {
            renderTransactionView();
        } else if (section === 'notifications') {
            renderNotifications();
        } else {
            dashContent.innerHTML += `<div class="bg-white p-12 rounded-3xl text-center border border-slate-100">
                <i data-lucide="construction" class="w-16 h-16 mx-auto text-slate-300 mb-4"></i>
                <h3 class="text-xl font-bold text-slate-800">Section Under Construction</h3>
                <p class="text-slate-500">The ${section} management system is being implemented.</p>
            </div>`;
        }
    }
    lucide.createIcons();
}

function renderAdminStats() {
    const statsContainer = document.getElementById('dashStats');
    const stats = [
        { label: 'Total Users', value: state.users.length, icon: 'users', color: 'bg-blue-500' },
        { label: 'Total Orders', value: state.orders.length, icon: 'shopping-cart', color: 'bg-emerald-500' },
        { label: 'Transactions', value: state.transactions.length, icon: 'trending-up', color: 'bg-amber-500' },
        { label: 'Pending Approvals', value: state.users.filter(u => u.status === 'PENDING_APPROVAL').length, icon: 'clock', color: 'bg-purple-500' },
    ];

    stats.forEach(s => {
        const div = document.createElement('div');
        div.className = 'bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 animate-scale-up';
        div.innerHTML = `
            <div class="p-4 rounded-xl text-white ${s.color}"><i data-lucide="${s.icon}" class="w-5 h-5 md:w-6 md:h-6"></i></div>
            <div><p class="text-xs text-slate-500">${s.label}</p><p class="text-xl md:text-2xl font-bold text-slate-900">${s.value}</p></div>
        `;
        statsContainer.appendChild(div);
    });
    lucide.createIcons();
}

function renderAdminDashboardHome() {
    const dashContent = document.getElementById('dashContent');
    const recentNotifications = state.notifications.slice(0, 5);
    
    dashContent.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
                        <i data-lucide="bell" class="w-5 h-5 text-farm-green"></i>
                        Recent Notifications
                    </h3>
                    <div class="space-y-4">
                        ${recentNotifications.length === 0 ? `
                            <div class="text-center py-8">
                                <i data-lucide="bell-off" class="w-12 h-12 mx-auto text-slate-200 mb-2"></i>
                                <p class="text-sm text-slate-400 italic">No recent notifications.</p>
                            </div>
                        ` : recentNotifications.map(n => `
                            <div class="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-farm-green transition-all">
                                <div class="p-2 rounded-xl ${n.type === 'entrepreneur' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}">
                                    <i data-lucide="${n.type === 'entrepreneur' ? 'user-plus' : 'shopping-bag'}" class="w-4 h-4"></i>
                                </div>
                                <div class="flex-1">
                                    <p class="text-sm font-medium text-slate-800">${n.message}</p>
                                    <p class="text-[10px] text-slate-400 mt-1">${new Date(n.timestamp).toLocaleString()}</p>
                                </div>
                                ${!n.read ? '<div class="w-2 h-2 rounded-full bg-farm-green mt-2"></div>' : ''}
                            </div>
                        `).join('')}
                    </div>
                    ${state.notifications.length > 5 ? `
                        <button onclick="setAdminSection('notifications')" class="w-full mt-6 py-3 text-sm font-bold text-farm-green hover:bg-farm-light rounded-xl transition-all">View All Notifications</button>
                    ` : ''}
                </div>
            </div>
            
            <div class="space-y-6">
                <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 class="text-lg font-bold mb-4">System Status</h3>
                    <div class="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl text-emerald-700">
                        <i data-lucide="check-circle" class="w-5 h-5"></i>
                        <span class="font-medium">All systems operational</span>
                    </div>
                </div>
                
                <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 class="text-lg font-bold mb-4">Quick Actions</h3>
                    <div class="grid grid-cols-2 gap-3">
                        <button onclick="setAdminSection('users')" class="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-farm-green transition-all text-center group">
                            <i data-lucide="users" class="w-6 h-6 mx-auto mb-2 text-slate-400 group-hover:text-farm-green"></i>
                            <p class="text-xs font-bold">Users</p>
                        </button>
                        <button onclick="setAdminSection('approvals')" class="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-farm-green transition-all text-center group">
                            <i data-lucide="check-square" class="w-6 h-6 mx-auto mb-2 text-slate-400 group-hover:text-farm-green"></i>
                            <p class="text-xs font-bold">Approvals</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function renderUserDashboard() {
    const dashTitle = document.getElementById('dashTitle');
    const dashContent = document.getElementById('dashContent');
    const dashStats = document.getElementById('dashStats');
    const dashCharts = document.getElementById('dashCharts');
    
    dashTitle.textContent = 'My Dashboard';
    dashCharts.classList.remove('hidden');

    const stats = [
        { label: 'My Orders', value: '0', icon: 'shopping-cart', color: 'bg-emerald-500' },
        { label: 'Transactions', value: '0', icon: 'trending-up', color: 'bg-amber-500' },
        { label: 'Activity %', value: '78%', icon: 'trending-up', color: 'bg-purple-500' },
    ];

    stats.forEach(s => {
        const div = document.createElement('div');
        div.className = 'bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 animate-scale-up';
        div.innerHTML = `
            <div class="p-4 rounded-xl text-white ${s.color}"><i data-lucide="${s.icon}" class="w-5 h-5 md:w-6 md:h-6"></i></div>
            <div><p class="text-xs text-slate-500">${s.label}</p><p class="text-xl md:text-2xl font-bold text-slate-900">${s.value}</p></div>
        `;
        dashStats.appendChild(div);
    });
    
    dashContent.innerHTML = `<div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 class="text-lg font-bold mb-4">Welcome, ${state.currentUser.fullName}</h3>
        <p class="text-slate-500">You are currently logged in as a ${state.currentUser.role}.</p>
    </div>`;
    
    lucide.createIcons();
}

function renderEntrepreneurManagement(readOnly = false) {
    const dashContent = document.getElementById('dashContent');
    const entrepreneurs = state.users.filter(u => u.role === 'ENTREPRENEUR');
    
    let backBtn = '';
    if (!readOnly) {
        backBtn = `
            <div class="mb-6">
                <button onclick="document.body.classList.remove('sidebar-closed'); renderAdminSection('settings')" class="btn-back">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Settings
                </button>
            </div>
        `;
    }

    dashContent.innerHTML = `
        ${backBtn}
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-fade-in">
            <div class="p-6 border-b border-slate-100">
                <h3 class="font-bold">Entrepreneur List</h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead>
                        <tr class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                            <th class="px-6 py-4 font-bold">Entrepreneur</th>
                            <th class="px-6 py-4 font-bold">Contact</th>
                            <th class="px-6 py-4 font-bold">Status</th>
                            ${!readOnly ? '<th class="px-6 py-4 font-bold">Actions</th>' : ''}
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        ${entrepreneurs.map(u => `
                            <tr class="hover:bg-slate-50/50 transition-colors">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                                            ${u.photo ? `<img src="${u.photo}" class="w-full h-full object-cover">` : `<i data-lucide="user" class="w-5 h-5 text-slate-400"></i>`}
                                        </div>
                                        <div>
                                            <p class="font-bold text-sm text-slate-900">${u.fullName || u.username}</p>
                                            <p class="text-xs text-slate-500">@${u.username}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <p class="font-medium">${u.mobile || 'N/A'}</p>
                                    <p class="text-xs text-slate-500">${u.whatsApp || ''}</p>
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase ${u.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
                                        ${u.status}
                                    </span>
                                </td>
                                ${!readOnly ? `
                                <td class="px-6 py-4">
                                    <button onclick="openConfirmModal(() => editUser('${u.id}'))" class="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-all"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
                                </td>
                                ` : ''}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    lucide.createIcons();
}
function renderCompleteProfileView() {
    const form = document.getElementById('completeProfileForm');
    const entrepreneurFields = document.getElementById('entrepreneurFields');
    
    if (state.currentUser.role === 'ENTREPRENEUR') {
        entrepreneurFields.classList.remove('hidden');
    }

    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Update user in state
        const userIdx = state.users.findIndex(u => u.id === state.currentUser.id);
        if (userIdx !== -1) {
            state.users[userIdx] = {
                ...state.users[userIdx],
                fullName: data.fullName,
                username: data.username,
                password: data.password,
                mobile: data.mobile,
                whatsApp: data.whatsApp,
                photo: document.getElementById('profilePreview').src,
                nidPhoto: state.currentUser.role === 'ENTREPRENEUR' ? document.getElementById('nidPreview').src : null,
                status: state.currentUser.role === 'ENTREPRENEUR' ? 'PENDING_APPROVAL' : 'ACTIVE'
            };
            
            state.currentUser = state.users[userIdx];
            localStorage.setItem('eco_users', JSON.stringify(state.users));
            localStorage.setItem('eco_current_user', JSON.stringify(state.currentUser));
            
            if (state.currentUser.role === 'ENTREPRENEUR') {
                addNotification('entrepreneur', `New entrepreneur profile submitted: ${state.currentUser.fullName}`);
            }

            if (state.currentUser.status === 'PENDING_APPROVAL') {
                showAlert('success', 'Profile completed! Waiting for admin approval.');
            } else {
                showAlert('success', 'Profile completed successfully!');
            }
            showView('dashboard');
        }
    };
    lucide.createIcons();
}

function previewImage(input, previewId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById(previewId);
            preview.src = e.target.result;
            preview.classList.remove('hidden');
            // Hide the icon
            const icon = input.parentElement.querySelector('i') || input.parentElement.querySelector('.text-center');
            if (icon) icon.classList.add('hidden');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function renderNotifications() {
    const dashContent = document.getElementById('dashContent');
    const headerActions = document.getElementById('dashHeaderActions');
    
    headerActions.innerHTML = `
        <button onclick="markAllNotificationsRead()" class="flex items-center gap-2 px-4 py-2 text-xs font-bold text-farm-green hover:bg-farm-light rounded-xl transition-all">
            <i data-lucide="check-check" class="w-4 h-4"></i> Mark all as read
        </button>
    `;
    
    dashContent.innerHTML = `
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-fade-in">
            <div class="p-6 border-b border-slate-100">
                <h3 class="font-bold">All Notifications</h3>
            </div>
            <div class="divide-y divide-slate-50">
                ${state.notifications.length === 0 ? `
                    <div class="p-12 text-center">
                        <i data-lucide="bell-off" class="w-16 h-16 mx-auto text-slate-200 mb-4"></i>
                        <p class="text-slate-500">No notifications yet.</p>
                    </div>
                ` : state.notifications.map(n => `
                    <div class="p-6 flex items-start gap-4 hover:bg-slate-50 transition-all ${!n.read ? 'bg-farm-light/20' : ''}">
                        <div class="p-3 rounded-2xl ${n.type === 'entrepreneur' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}">
                            <i data-lucide="${n.type === 'entrepreneur' ? 'user-plus' : 'shopping-bag'}" class="w-6 h-6"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex justify-between items-start">
                                <p class="font-bold text-slate-900">${n.type === 'entrepreneur' ? 'New Entrepreneur' : 'New Order'}</p>
                                <p class="text-xs text-slate-400">${new Date(n.timestamp).toLocaleString()}</p>
                            </div>
                            <p class="text-sm text-slate-600 mt-1">${n.message}</p>
                            ${!n.read ? `
                                <button onclick="markNotificationRead('${n.id}')" class="mt-3 text-xs font-bold text-farm-green hover:underline">Mark as read</button>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    lucide.createIcons();
}

function markNotificationRead(id) {
    const notif = state.notifications.find(n => n.id === id);
    if (notif) {
        notif.read = true;
        localStorage.setItem('eco_notifications', JSON.stringify(state.notifications));
        updateNotifBadge();
        if (state.adminSection === 'notifications') renderNotifications();
        if (state.adminSection === 'dashboard') renderAdminDashboardHome();
    }
}

function markAllNotificationsRead() {
    state.notifications.forEach(n => n.read = true);
    localStorage.setItem('eco_notifications', JSON.stringify(state.notifications));
    updateNotifBadge();
    if (state.adminSection === 'notifications') renderNotifications();
    showAlert('success', 'All notifications marked as read');
}

function updateNotifBadge() {
    const badge = document.getElementById('notifBadge');
    if (!badge) return;
    const unreadCount = state.notifications.filter(n => !n.read).length;
    if (unreadCount > 0) {
        badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function renderUserManagement(readOnly = false) {
    const dashContent = document.getElementById('dashContent');
    const headerActions = document.getElementById('dashHeaderActions');
    
    let backBtn = '';
    if (!readOnly) {
        backBtn = `
            <div class="mb-6">
                <button onclick="document.body.classList.remove('sidebar-closed'); renderAdminSection('settings')" class="btn-back">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Settings
                </button>
            </div>
        `;
        headerActions.innerHTML = `<button onclick="openCreateUserModal()" class="glossy-button flex items-center gap-2 px-6 py-2 text-sm">
            <i data-lucide="user-plus" class="w-4 h-4"></i> Create User
        </button>`;
    } else {
        headerActions.innerHTML = '';
    }
    
    dashContent.innerHTML = `
        ${backBtn}
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-fade-in">
            <div class="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 class="font-bold">All Users</h3>
                <div class="relative">
                    <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i>
                    <input type="text" placeholder="Search users..." class="pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead>
                        <tr class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                            <th class="px-6 py-4 font-bold">User</th>
                            <th class="px-6 py-4 font-bold">Role</th>
                            <th class="px-6 py-4 font-bold">Contact</th>
                            <th class="px-6 py-4 font-bold">Status</th>
                            ${!readOnly ? '<th class="px-6 py-4 font-bold">Actions</th>' : ''}
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        ${state.users.map(u => `
                            <tr class="hover:bg-slate-50/50 transition-colors">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                                            ${u.photo ? `<img src="${u.photo}" class="w-full h-full object-cover">` : `<i data-lucide="user" class="w-5 h-5 text-slate-400"></i>`}
                                        </div>
                                        <div>
                                            <p class="font-bold text-sm text-slate-900">${u.fullName || u.username}</p>
                                            <p class="text-xs text-slate-500">@${u.username}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : u.role === 'ENTREPRENEUR' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}">
                                        ${u.role}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <div class="space-y-1">
                                        <p class="text-xs flex items-center gap-1.5 text-slate-600">
                                            <i data-lucide="phone" class="w-3 h-3"></i> ${u.mobile || 'N/A'}
                                        </p>
                                        <p class="text-xs flex items-center gap-1.5 text-slate-600">
                                            <i data-lucide="message-square" class="w-3 h-3"></i> ${u.whatsApp || 'N/A'}
                                        </p>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <span class="flex items-center gap-1.5 ${u.status === 'ACTIVE' ? 'text-emerald-600' : u.status === 'PENDING_APPROVAL' ? 'text-amber-600' : u.status === 'SUSPENDED' ? 'text-red-600' : 'text-slate-400'} font-bold text-xs">
                                        <span class="w-2 h-2 rounded-full ${u.status === 'ACTIVE' ? 'bg-emerald-600' : u.status === 'PENDING_APPROVAL' ? 'bg-amber-600' : u.status === 'SUSPENDED' ? 'bg-red-600' : 'bg-slate-400'}"></span>
                                        ${u.status.replace('_', ' ')}
                                    </span>
                                </td>
                                ${!readOnly ? `
                                <td class="px-6 py-4">
                                    <div class="flex gap-2">
                                        <button onclick="openConfirmModal(() => editUser('${u.id}'))" class="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-all"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
                                        <button onclick="openConfirmModal(() => deleteUser('${u.id}'))" class="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-all"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                                    </div>
                                </td>
                                ` : ''}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function openCreateUserModal() {
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h3 class="text-xl font-bold mb-6">Create New User</h3>
        <form id="createUserForm" class="space-y-4 text-left">
            <div>
                <label class="block text-xs font-bold mb-1 text-slate-500">Username *</label>
                <input name="username" required class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
            </div>
            <div>
                <label class="block text-xs font-bold mb-1 text-slate-500">Temporary Password *</label>
                <input name="password" type="password" required class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
            </div>
            <div>
                <label class="block text-xs font-bold mb-1 text-slate-500">Role *</label>
                <select name="role" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                    <option value="CUSTOMER">Customer</option>
                    <option value="ENTREPRENEUR">Entrepreneur</option>
                </select>
            </div>
            <div class="mt-8 flex gap-4">
                <button type="button" onclick="closeAlert()" class="flex-1 py-3 rounded-xl font-bold text-slate-500 bg-slate-100 text-sm">Cancel</button>
                <button type="submit" class="flex-1 py-3 rounded-xl font-bold text-white bg-farm-green text-sm">Create User</button>
            </div>
        </form>
    `;
    
    const form = document.getElementById('createUserForm');
    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const newUser = {
            id: 'u-' + Date.now(),
            username: data.username,
            password: data.password,
            role: data.role,
            status: 'INCOMPLETE_PROFILE',
            createdAt: new Date().toISOString()
        };
        
        state.users.push(newUser);
        localStorage.setItem('eco_users', JSON.stringify(state.users));
        closeAlert();
        showAlert('success', 'User created successfully!');
        renderUserManagement();
    };

    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    setTimeout(() => {
        overlay.classList.add('opacity-100');
        content.classList.remove('scale-90');
    }, 10);
}

function renderLandingView() {
    const dashContent = document.getElementById('dashContent');
    const sections = ['EN', 'BN'];
    dashContent.innerHTML = `
        <div class="space-y-6 animate-fade-in">
            ${sections.map(lang => `
                <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
                        <i data-lucide="globe" class="w-5 h-5 text-farm-green"></i> ${lang === 'EN' ? 'English Content' : 'Bengali Content'}
                    </h3>
                    <div class="space-y-6">
                        <div>
                            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hero Title</p>
                            <p class="text-xl font-bold text-slate-800">${state.content[lang].heroTitle}</p>
                        </div>
                        <div>
                            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hero Subtitle</p>
                            <p class="text-slate-600 font-medium">${state.content[lang].subtitle}</p>
                        </div>
                        <div>
                            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hero Description</p>
                            <p class="text-slate-600 leading-relaxed">${state.content[lang].heroDesc}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    lucide.createIcons();
}

function renderGalleryView() {
    const dashContent = document.getElementById('dashContent');
    dashContent.innerHTML = `
        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-fade-in">
            <h3 class="text-lg font-bold mb-8">Gallery Preview</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                ${state.gallery.map(img => `
                    <div class="aspect-square rounded-2xl overflow-hidden border border-slate-100 group relative">
                        <img src="${img}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderContactView() {
    const dashContent = document.getElementById('dashContent');
    dashContent.innerHTML = `
        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-fade-in">
            <h3 class="text-lg font-bold mb-8">Contact Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-6">
                    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</p>
                        <p class="text-slate-800 font-bold">+880 1234 567890</p>
                    </div>
                    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">WhatsApp</p>
                        <p class="text-slate-800 font-bold">+880 1234 567890</p>
                    </div>
                </div>
                <div class="space-y-6">
                    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                        <p class="text-slate-800 font-bold">info@ecodairy.com</p>
                    </div>
                    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Address</p>
                        <p class="text-slate-800 font-bold">Village Road, Gazipur, Bangladesh</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderFooterEditor() {
    const dashContent = document.getElementById('dashContent');
    dashContent.innerHTML = `
        <div class="mb-6">
            <button onclick="document.body.classList.remove('sidebar-closed'); renderAdminSection('settings')" class="btn-back">
                <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Settings
            </button>
        </div>
        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-fade-in">
            <h3 class="text-lg font-bold mb-6">Footer Editor</h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-bold mb-1 text-slate-500">Copyright Text</label>
                    <input value="© 2024 Eco Dairy Farm. All rights reserved." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                </div>
                <div class="pt-6 border-t border-slate-50 flex justify-end">
                    <button onclick="openConfirmModal(() => showAlert('success', 'Footer updated successfully!'))" class="bg-farm-green text-white px-8 py-3 rounded-xl font-bold text-sm">Save Footer</button>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function renderContactEditor() {
    const dashContent = document.getElementById('dashContent');
    dashContent.innerHTML = `
        <div class="mb-6">
            <button onclick="document.body.classList.remove('sidebar-closed'); renderAdminSection('settings')" class="btn-back">
                <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Settings
            </button>
        </div>
        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-fade-in">
            <h3 class="text-lg font-bold mb-6">Contact Info Editor</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-bold mb-1 text-slate-500">Phone</label>
                    <input value="+880 1234 567890" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                </div>
                <div>
                    <label class="block text-xs font-bold mb-1 text-slate-500">WhatsApp</label>
                    <input value="+880 1234 567890" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                </div>
                <div>
                    <label class="block text-xs font-bold mb-1 text-slate-500">Email</label>
                    <input value="info@ecodairy.com" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                </div>
                <div>
                    <label class="block text-xs font-bold mb-1 text-slate-500">Address</label>
                    <input value="Village Road, Gazipur, Bangladesh" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                </div>
            </div>
            <div class="mt-6 pt-6 border-t border-slate-50 flex justify-end">
                <button onclick="openConfirmModal(() => showAlert('success', 'Contact info updated successfully!'))" class="bg-farm-green text-white px-8 py-3 rounded-xl font-bold text-sm">Save Contact Info</button>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function renderOrderManagement(readOnly = false) {
    const dashContent = document.getElementById('dashContent');
    let backBtn = '';
    if (!readOnly) {
        backBtn = `
            <div class="mb-6">
                <button onclick="document.body.classList.remove('sidebar-closed'); renderAdminSection('settings')" class="flex items-center gap-2 text-slate-500 hover:text-farm-green font-bold text-sm transition-all">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Settings
                </button>
            </div>
        `;
    }
    dashContent.innerHTML = `
        ${backBtn}
        <div class="bg-white p-12 rounded-3xl text-center border border-slate-100 animate-fade-in">
            <i data-lucide="shopping-cart" class="w-16 h-16 mx-auto text-slate-200 mb-4"></i>
            <h3 class="text-xl font-bold text-slate-800">Orders Management</h3>
            <p class="text-slate-500">Order tracking and management system is coming soon.</p>
        </div>
    `;
    lucide.createIcons();
}

function renderTransactionView() {
    const dashContent = document.getElementById('dashContent');
    dashContent.innerHTML = `
        <div class="bg-white p-12 rounded-3xl text-center border border-slate-100 animate-fade-in">
            <i data-lucide="credit-card" class="w-16 h-16 mx-auto text-slate-200 mb-4"></i>
            <h3 class="text-xl font-bold text-slate-800">Transactions</h3>
            <p class="text-slate-500">Transaction history is coming soon.</p>
        </div>
    `;
    lucide.createIcons();
}

function renderSystemTextEditor() {
    const dashContent = document.getElementById('dashContent');
    dashContent.innerHTML = `
        <div class="mb-6">
            <button onclick="document.body.classList.remove('sidebar-closed'); renderAdminSection('settings')" class="btn-back">
                <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Settings
            </button>
        </div>
        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-fade-in">
            <h3 class="text-lg font-bold mb-6">System Text Editor</h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-bold mb-1 text-slate-500">Welcome Message</label>
                    <input value="Welcome to Eco Dairy Farm Dashboard" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                </div>
                <div class="pt-6 border-t border-slate-50 flex justify-end">
                    <button onclick="openConfirmModal(() => showAlert('success', 'System text updated successfully!'))" class="bg-farm-green text-white px-8 py-3 rounded-xl font-bold text-sm">Save System Text</button>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function renderLandingEditor() {
    const dashContent = document.getElementById('dashContent');
    const sections = ['EN', 'BN'];
    
    dashContent.innerHTML = `
        <div class="mb-6">
            <button onclick="document.body.classList.remove('sidebar-closed'); renderAdminSection('settings')" class="btn-back">
                <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Settings
            </button>
        </div>
        <div class="space-y-6 animate-fade-in">
            ${sections.map(lang => `
                <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
                        <i data-lucide="globe" class="w-5 h-5 text-farm-green"></i> ${lang === 'EN' ? 'English Content' : 'Bengali Content'}
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-xs font-bold mb-1 text-slate-500">Hero Title</label>
                                <input id="land_${lang}_heroTitle" value="${state.content[lang].heroTitle}" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                            </div>
                            <div>
                                <label class="block text-xs font-bold mb-1 text-slate-500">Hero Subtitle</label>
                                <input id="land_${lang}_subtitle" value="${state.content[lang].subtitle}" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold mb-1 text-slate-500">Hero Description</label>
                            <textarea id="land_${lang}_heroDesc" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green h-28">${state.content[lang].heroDesc}</textarea>
                        </div>
                    </div>
                    <div class="mt-6 pt-6 border-t border-slate-50 flex justify-end">
                        <button onclick="openConfirmModal(() => saveLandingContent('${lang}'))" class="bg-farm-green text-white px-8 py-3 rounded-xl font-bold text-sm">Save ${lang} Changes</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    lucide.createIcons();
}

function saveLandingContent(lang) {
    state.content[lang].heroTitle = document.getElementById(`land_${lang}_heroTitle`).value;
    state.content[lang].subtitle = document.getElementById(`land_${lang}_subtitle`).value;
    state.content[lang].heroDesc = document.getElementById(`land_${lang}_heroDesc`).value;
    
    localStorage.setItem('eco_content', JSON.stringify(state.content));
    showAlert('success', `${lang} content updated successfully!`);
}

function renderGalleryEditor() {
    const dashContent = document.getElementById('dashContent');
    dashContent.innerHTML = `
        <div class="mb-6">
            <button onclick="document.body.classList.remove('sidebar-closed'); renderAdminSection('settings')" class="btn-back">
                <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Settings
            </button>
        </div>
        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-fade-in">
            <div class="flex justify-between items-center mb-8">
                <h3 class="text-lg font-bold">Gallery Management</h3>
                <button onclick="openAddImageModal()" class="bg-farm-green text-white px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                    <i data-lucide="plus" class="w-4 h-4"></i> Add Image
                </button>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                ${state.gallery.map((img, idx) => `
                    <div class="relative aspect-square rounded-2xl overflow-hidden group">
                        <img src="${img}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button onclick="openConfirmModal(() => removeGalleryImage(${idx}))" class="p-2 bg-red-600 text-white rounded-lg hover:scale-110 transition-all"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    lucide.createIcons();
}

function removeGalleryImage(idx) {
    state.gallery.splice(idx, 1);
    localStorage.setItem('eco_gallery', JSON.stringify(state.gallery));
    renderGalleryEditor();
    showAlert('success', 'Image removed from gallery');
}

function renderApprovals(readOnly = true) {
    const dashContent = document.getElementById('dashContent');
    const pendingUsers = state.users.filter(u => u.status === 'PENDING_APPROVAL');
    
    let backBtn = '';
    if (!readOnly) {
        backBtn = `
            <div class="mb-6">
                <button onclick="document.body.classList.remove('sidebar-closed'); renderAdminSection('settings')" class="btn-back">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Settings
                </button>
            </div>
        `;
    }

    dashContent.innerHTML = `
        ${backBtn}
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-fade-in">
            <div class="p-6 border-b border-slate-100">
                <h3 class="font-bold">Pending Entrepreneur Approvals</h3>
            </div>
            ${pendingUsers.length === 0 ? `
                <div class="p-12 text-center">
                    <i data-lucide="check-circle" class="w-12 h-12 mx-auto text-emerald-100 mb-4"></i>
                    <p class="text-slate-500">No pending approvals at the moment.</p>
                </div>
            ` : `
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                <th class="px-6 py-4 font-bold">Entrepreneur</th>
                                <th class="px-6 py-4 font-bold">Verification</th>
                                <th class="px-6 py-4 font-bold">Date</th>
                                ${!readOnly ? '<th class="px-6 py-4 font-bold">Actions</th>' : ''}
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50">
                            ${pendingUsers.map(u => `
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                                                ${u.photo ? `<img src="${u.photo}" class="w-full h-full object-cover">` : `<i data-lucide="user" class="w-5 h-5 text-slate-400"></i>`}
                                            </div>
                                            <div>
                                                <p class="font-bold text-sm text-slate-900">${u.fullName}</p>
                                                <p class="text-xs text-slate-500">${u.mobile}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <button onclick="viewNID('${u.id}')" class="text-xs font-bold text-farm-green hover:underline flex items-center gap-1">
                                            <i data-lucide="external-link" class="w-3 h-3"></i> View NID
                                        </button>
                                    </td>
                                    <td class="px-6 py-4 text-xs text-slate-500">
                                        ${new Date(u.createdAt).toLocaleDateString()}
                                    </td>
                                    ${!readOnly ? `
                                    <td class="px-6 py-4">
                                        <div class="flex gap-2">
                                            <button onclick="openConfirmModal(() => approveUser('${u.id}'))" class="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all">Approve</button>
                                            <button onclick="openConfirmModal(() => rejectUser('${u.id}'))" class="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-all">Reject</button>
                                        </div>
                                    </td>
                                    ` : ''}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `}
        </div>
    `;
    lucide.createIcons();
}

function approveUser(userId) {
    const userIdx = state.users.findIndex(u => u.id === userId);
    if (userIdx !== -1) {
        state.users[userIdx].status = 'ACTIVE';
        localStorage.setItem('eco_users', JSON.stringify(state.users));
        showAlert('success', 'User approved successfully!');
        renderApprovals();
    }
}

function viewNID(userId) {
    const user = state.users.find(u => u.id === userId);
    if (user && user.nidPhoto) {
        const overlay = document.getElementById('modalOverlay');
        const content = document.getElementById('modalContent');
        
        content.innerHTML = `
            <h3 class="text-xl font-bold mb-6">NID Verification</h3>
            <div class="rounded-2xl overflow-hidden border border-slate-100 mb-6">
                <img src="${user.nidPhoto}" class="w-full h-auto">
            </div>
            <button onclick="closeAlert()" class="w-full py-3 rounded-xl font-bold text-white bg-farm-green text-sm">Close</button>
        `;
        
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        setTimeout(() => {
            overlay.classList.add('opacity-100');
            content.classList.remove('scale-90');
        }, 10);
    } else {
        showAlert('error', 'NID photo not found');
    }
}

function deleteUser(userId) {
    if (userId === 'admin-1') {
        showAlert('error', 'Cannot delete the primary admin account');
        return;
    }
    if (confirm('Are you sure you want to delete this user?')) {
        state.users = state.users.filter(u => u.id !== userId);
        localStorage.setItem('eco_users', JSON.stringify(state.users));
        showAlert('success', 'User deleted successfully');
        renderUserManagement();
    }
}

function editUser(userId) {
    const user = state.users.find(u => u.id === userId);
    if (!user) return;

    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h3 class="text-xl font-bold mb-6">Edit User: ${user.username}</h3>
        <form id="editUserForm" class="space-y-4 text-left max-h-[70vh] overflow-y-auto px-2">
            <div class="flex flex-col items-center mb-6">
                <div class="w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center relative overflow-hidden group cursor-pointer" onclick="document.getElementById('editPhotoInput').click()">
                    <img id="editPhotoPreview" src="${user.photo || ''}" class="${user.photo ? '' : 'hidden'} w-full h-full object-cover">
                    <i data-lucide="camera" class="${user.photo ? 'hidden' : ''} w-6 h-6 text-slate-400 group-hover:text-farm-green transition-colors"></i>
                    <input type="file" id="editPhotoInput" accept="image/*" class="hidden" onchange="previewImage(this, 'editPhotoPreview')">
                </div>
                <p class="text-[10px] text-slate-400 mt-1">Change Profile Photo</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold mb-1 text-slate-500">Full Name</label>
                    <input name="fullName" value="${user.fullName || ''}" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                </div>
                <div>
                    <label class="block text-xs font-bold mb-1 text-slate-500">Username</label>
                    <input name="username" value="${user.username || ''}" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold mb-1 text-slate-500">Mobile Number</label>
                    <input name="mobile" value="${user.mobile || ''}" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                </div>
                <div>
                    <label class="block text-xs font-bold mb-1 text-slate-500">WhatsApp Number</label>
                    <input name="whatsApp" value="${user.whatsApp || ''}" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold mb-1 text-slate-500">Role</label>
                    <select name="role" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                        <option value="CUSTOMER" ${user.role === 'CUSTOMER' ? 'selected' : ''}>Customer</option>
                        <option value="ENTREPRENEUR" ${user.role === 'ENTREPRENEUR' ? 'selected' : ''}>Entrepreneur</option>
                        <option value="ADMIN" ${user.role === 'ADMIN' ? 'selected' : ''}>Admin</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold mb-1 text-slate-500">Status</label>
                    <select name="status" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm outline-none focus:border-farm-green">
                        <option value="ACTIVE" ${user.status === 'ACTIVE' ? 'selected' : ''}>Active</option>
                        <option value="PENDING_APPROVAL" ${user.status === 'PENDING_APPROVAL' ? 'selected' : ''}>Pending Approval</option>
                        <option value="INCOMPLETE_PROFILE" ${user.status === 'INCOMPLETE_PROFILE' ? 'selected' : ''}>Incomplete Profile</option>
                        <option value="SUSPENDED" ${user.status === 'SUSPENDED' ? 'selected' : ''}>Suspended</option>
                    </select>
                </div>
            </div>
            <div class="mt-8 flex gap-4">
                <button type="button" onclick="closeAlert()" class="flex-1 py-3 rounded-xl font-bold text-slate-500 bg-slate-100 text-sm">Cancel</button>
                <button type="submit" class="flex-1 py-3 rounded-xl font-bold text-white bg-farm-green text-sm">Save Changes</button>
            </div>
        </form>
    `;
    
    const form = document.getElementById('editUserForm');
    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const userIdx = state.users.findIndex(u => u.id === userId);
        const photoPreview = document.getElementById('editPhotoPreview');
        
        state.users[userIdx] = { 
            ...state.users[userIdx], 
            ...data,
            photo: photoPreview.src && !photoPreview.classList.contains('hidden') ? photoPreview.src : state.users[userIdx].photo
        };
        localStorage.setItem('eco_users', JSON.stringify(state.users));
        
        closeAlert();
        showAlert('success', 'User updated successfully');
        renderUserManagement();
    };

    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    setTimeout(() => {
        overlay.classList.add('opacity-100');
        content.classList.remove('scale-90');
    }, 10);
    lucide.createIcons();
}

function addNotification(type, message) {
    const notification = {
        id: 'notif-' + Date.now(),
        type,
        message,
        timestamp: new Date().toISOString(),
        read: false
    };
    state.notifications.unshift(notification);
    localStorage.setItem('eco_notifications', JSON.stringify(state.notifications));
    
    // Non-intrusive toast if admin is logged in
    if (state.currentUser && state.currentUser.role === 'ADMIN') {
        showToast(message);
        if (state.adminSection === 'dashboard') {
            renderAdminDashboardHome();
        }
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-[100] animate-fade-in flex items-center gap-3 border border-white/10';
    toast.innerHTML = `
        <div class="w-2 h-2 rounded-full bg-farm-green animate-pulse"></div>
        <p class="text-sm font-medium">${message}</p>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

function openAddImageModal() {
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h3 class="text-xl font-bold mb-6">Add Gallery Image</h3>
        <div class="space-y-4">
            <div class="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:border-farm-green transition-all cursor-pointer relative overflow-hidden group">
                <input type="file" accept="image/*" onchange="previewImage(this, 'galleryPreview')" class="absolute inset-0 opacity-0 cursor-pointer z-10">
                <div id="galleryPlaceholder">
                    <i data-lucide="image-plus" class="w-12 h-12 mx-auto text-slate-300 mb-2"></i>
                    <p class="text-sm text-slate-500 font-bold">Click to upload photo</p>
                </div>
                <img id="galleryPreview" class="hidden w-full h-auto rounded-2xl">
            </div>
            <div class="mt-8 flex gap-4">
                <button type="button" onclick="closeAlert()" class="flex-1 py-3 rounded-xl font-bold text-slate-500 bg-slate-100 text-sm">Cancel</button>
                <button onclick="saveGalleryImage()" class="flex-1 py-3 rounded-xl font-bold text-white bg-farm-green text-sm">Add to Gallery</button>
            </div>
        </div>
    `;
    
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    setTimeout(() => {
        overlay.classList.add('opacity-100');
        content.classList.remove('scale-90');
    }, 10);
    lucide.createIcons();
}

function saveGalleryImage() {
    const preview = document.getElementById('galleryPreview');
    if (preview && preview.src && !preview.classList.contains('hidden')) {
        state.gallery.unshift(preview.src);
        localStorage.setItem('eco_gallery', JSON.stringify(state.gallery));
        closeAlert();
        showAlert('success', 'Image added to gallery!');
        renderGalleryEditor();
    } else {
        showAlert('error', 'Please select an image first');
    }
}

function logout() {
    state.currentUser = null;
    localStorage.removeItem('eco_current_user');
    showView('home');
    showAlert('success', 'Logged out successfully');
}
// Alert System
// Forgot Password System
function openForgotPasswordModal() {
    const overlay = document.getElementById('modalOverlay');
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <div class="text-center animate-fade-in">
            <h3 class="text-2xl font-serif font-bold text-slate-900 mb-2">Forgot Password</h3>
            <p class="text-slate-500 text-sm mb-8">Enter your username to find your account</p>
            <div class="relative mb-6">
                <i data-lucide="user" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"></i>
                <input id="forgotUsernameInput" placeholder="Username" class="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-farm-green outline-none transition-all">
            </div>
            <button onclick="searchUsernameForReset()" class="w-full glossy-button py-4 text-lg font-bold shadow-xl shadow-farm-green/20">Search Account</button>
        </div>
    `;
    
    lucide.createIcons();
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    setTimeout(() => {
        overlay.classList.add('opacity-100');
        document.getElementById('modalContent').classList.remove('scale-90');
    }, 10);
}

function searchUsernameForReset() {
    const username = document.getElementById('forgotUsernameInput').value.trim();
    if (!username) {
        showAlert('error', 'Please enter a username');
        return;
    }

    const user = state.users.find(u => u.username.toLowerCase() === username.toLowerCase());
    const body = document.getElementById('modalBody');

    if (user || username.toLowerCase() === '1234') {
        body.innerHTML = `
            <div class="text-center animate-fade-in">
                <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i data-lucide="check" class="w-8 h-8"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-4">আপনার ইউজার এর পাসওয়ার্ড রিসেট করতে ফার্ম ম্যানেজার এর সাথে যোগাযোগ করুন..!</h3>
                
                <div class="space-y-4 mt-8">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Manager List</p>
                    
                    <div class="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 text-left">
                        <p class="font-bold text-slate-800 mb-4 text-sm">MD RAFIK HOSSAIN</p>
                        <a href="https://wa.me/8801590018360" target="_blank" class="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-green-500/20">
                            <i data-lucide="message-circle" class="w-5 h-5"></i> Continue WhatsApp
                        </a>
                    </div>

                    <div class="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 text-left">
                        <p class="font-bold text-slate-800 mb-4 text-sm">MD SAGAR HOSEN</p>
                        <a href="https://wa.me/8801723447229" target="_blank" class="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-green-500/20">
                            <i data-lucide="message-circle" class="w-5 h-5"></i> Continue WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();
    } else {
        showAlert('error', 'Username not found');
    }
}

// Admin Password Confirmation Modal
let confirmCallback = null;

function openConfirmModal(callback) {
    confirmCallback = callback;
    const overlay = document.getElementById('confirmOverlay');
    const input = document.getElementById('confirmPasswordInput');
    input.value = '';
    
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    setTimeout(() => {
        overlay.classList.add('opacity-100');
        overlay.querySelector('div').classList.remove('scale-90');
    }, 10);

    document.getElementById('confirmSaveBtn').onclick = () => {
        const password = input.value;
        const admin = state.users.find(u => u.role === 'ADMIN') || { password: '1234' };
        
        if (password === admin.password) {
            closeConfirmModal();
            if (confirmCallback) confirmCallback();
        } else {
            showAlert('error', 'Incorrect Admin Password');
        }
    };
}

function closeConfirmModal() {
    const overlay = document.getElementById('confirmOverlay');
    overlay.classList.remove('opacity-100');
    overlay.querySelector('div').classList.add('scale-90');
    setTimeout(() => {
        overlay.classList.remove('flex');
        overlay.classList.add('hidden');
    }, 300);
}

function showAlert(type, message) {
    const overlay = document.getElementById('modalOverlay');
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <div class="text-center animate-fade-in">
            <div class="flex justify-center mb-6">
                <div class="w-20 h-20 rounded-full flex items-center justify-center ${type === 'success' ? 'bg-emerald-100 text-emerald-600' : type === 'error' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}">
                    <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info'}" class="w-10 h-10"></i>
                </div>
            </div>
            <h3 class="text-xl font-bold mb-2 ${type === 'success' ? 'text-emerald-900' : type === 'error' ? 'text-red-900' : 'text-blue-900'}">${type.charAt(0).toUpperCase() + type.slice(1)}!</h3>
            <p class="text-slate-600 text-sm mb-8 leading-relaxed">${message}</p>
            <button onclick="closeAlert()" class="w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${type === 'success' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' : type === 'error' ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'}">OK</button>
        </div>
    `;
    
    lucide.createIcons();
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    setTimeout(() => {
        overlay.classList.add('opacity-100');
        document.getElementById('modalContent').classList.remove('scale-90');
    }, 10);
}

function closeAlert() {
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    if (!overlay) return;
    overlay.classList.remove('opacity-100');
    if (content) content.classList.add('scale-90');
    setTimeout(() => {
        overlay.classList.remove('flex');
        overlay.classList.add('hidden');
    }, 300);
}

function closeModal() {
    closeAlert();
}

// Entrepreneur Modal
function openEntrepreneurModal() {
    const modal = document.getElementById('entrepreneurModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        modal.classList.add('opacity-100');
        modal.querySelector('div').classList.remove('scale-90');
    }, 10);
    lucide.createIcons();
}

function closeEntrepreneurModal() {
    const modal = document.getElementById('entrepreneurModal');
    modal.classList.remove('opacity-100');
    modal.querySelector('div').classList.add('scale-90');
    setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }, 300);
}

function rejectUser(userId) {
    if (confirm('Are you sure you want to reject this user?')) {
        state.users = state.users.filter(u => u.id !== userId);
        localStorage.setItem('eco_users', JSON.stringify(state.users));
        showAlert('success', 'User request rejected.');
        renderApprovals();
    }
}
