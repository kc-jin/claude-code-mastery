/**
 * 개발자 포트폴리오 - 메인 JavaScript 파일
 * 네비게이션, 스크롤 애니메이션, 인터랙션 로직 포함
 */

// ===================================
// 유틸리티 함수
// ===================================

/**
 * 주어진 함수를 일정 시간(ms) 간격으로만 실행하도록 제한
 * @param {Function} fn - 실행할 함수
 * @param {number} delay - 최소 실행 간격 (ms)
 * @returns {Function} throttled 함수
 */
function throttle(fn, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn(...args);
        }
    };
}

// ===================================
// 다크모드 관리
// ===================================

/**
 * localStorage와 시스템 설정을 기반으로 다크모드 초기 적용
 */
function initDarkMode() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);

    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    updateDarkModeIcon(isDark);
}

/**
 * 다크모드 아이콘 업데이트 (달 ↔ 태양)
 * @param {boolean} isDark - 다크모드 활성화 여부
 */
function updateDarkModeIcon(isDark) {
    const icon = document.getElementById('darkModeIcon');
    if (!icon) return;

    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

/**
 * 다크모드 토글 (클래스 토글 + localStorage 저장 + 아이콘 변경)
 */
function toggleDarkMode() {
    const html = document.documentElement;
    const icon = document.getElementById('darkModeIcon');

    // 클래스 토글
    html.classList.toggle('dark');

    // localStorage에 저장
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // 아이콘 애니메이션 및 업데이트
    if (icon) {
        icon.classList.add('switching');
        setTimeout(() => {
            updateDarkModeIcon(isDark);
            icon.classList.remove('switching');
        }, 200);
    }
}

// ===================================
// 1. 모바일 메뉴 토글
// ===================================

/**
 * 모바일 버거 메뉴 토글 기능
 * 메뉴 표시/숨김, 아이콘 교체 (바 ↔ X)
 */
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggleBtn = document.getElementById('menuToggleBtn');

    // 메뉴 표시/숨김 토글
    mobileMenu.classList.toggle('hidden');

    // 아이콘 교체 (바 ↔ X)
    const icon = toggleBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
}

// ===================================
// 2. 네비게이션 스크롤 처리
// ===================================

/**
 * 스크롤 위치에 따라 네비게이션 배경/그림자 전환
 * scrollY > 50일 때 .scrolled 클래스 추가
 */
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===================================
// 3. 활성 네비게이션 링크 업데이트
// ===================================

/**
 * 현재 스크롤 위치에 따라 활성 네비게이션 링크 업데이트
 * 각 섹션의 위치를 감지하여 해당 nav-link에 .active 클래스 추가
 */
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

    // 활성 섹션 결정
    let activeSection = sections[0];
    for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section && section.offsetTop <= window.scrollY + 100) {
            activeSection = sectionId;
        }
    }

    // 모든 nav-link에서 .active 제거
    navLinks.forEach(link => link.classList.remove('active'));

    // 활성 섹션에 해당하는 nav-link에만 .active 추가
    const activeLink = document.querySelector(`a[href="#${activeSection}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// ===================================
// 4. 스크롤 애니메이션 초기화
// ===================================

/**
 * IntersectionObserver를 사용하여 뷰포트에 진입하는 요소에 .visible 클래스 추가
 * .animate-on-scroll 클래스가 있는 모든 요소 감시
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 한 번 애니메이션이 실행되면 감시 중지 (성능 최적화)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // .animate-on-scroll 클래스가 있는 모든 요소 감시
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// ===================================
// 5. 스킬 바 애니메이션
// ===================================

/**
 * Skills 섹션 진입 시 진행률 바 애니메이션 시작
 * data-width 속성 값을 --skill-width CSS 변수로 설정
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.setProperty('--skill-width', width);
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
}

// ===================================
// 6. 맨 위로 버튼 처리
// ===================================

/**
 * 스크롤 위치에 따라 "맨 위로" 버튼 표시/숨김
 * scrollY > 300일 때 버튼 표시
 */
function handleScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove('hidden');
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.classList.add('hidden');
        scrollToTopBtn.style.display = 'none';
    }
}

// ===================================
// 7. 맨 위로 스크롤
// ===================================

/**
 * 페이지 최상단으로 부드럽게 스크롤
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===================================
// 8. 부드러운 스크롤 (앵커 링크)
// ===================================

/**
 * 앵커 링크 클릭 시 네비게이션 바 높이를 고려한 부드러운 스크롤
 * @param {Event} e - 클릭 이벤트
 */
function handleSmoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');

    // 앵커 링크인 경우에만 처리
    if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            e.preventDefault();

            // 네비게이션 바 높이 (64px = h-16)
            const navbarHeight = 64;
            const elementPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });

            // 모바일 메뉴 닫기
            const mobileMenu = document.getElementById('mobileMenu');
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        }
    }
}

// ===================================
// 초기화 함수
// ===================================

/**
 * 페이지 로드 시 모든 이벤트 리스너 등록 및 초기 상태 설정
 */
function init() {
    // 0. 다크모드 초기화
    initDarkMode();

    // 다크모드 토글 버튼 이벤트 리스너 (데스크톱 + 모바일 동일 ID)
    const darkModeToggleBtns = document.querySelectorAll('#darkModeToggleBtn');
    darkModeToggleBtns.forEach(btn => {
        btn.addEventListener('click', toggleDarkMode);
    });

    // 1. 모바일 메뉴 버튼 클릭 이벤트
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', toggleMobileMenu);
    }

    // 2. 모바일 메뉴 링크 클릭 이벤트
    const mobileMenuLinks = document.querySelectorAll('#mobileMenu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // 3. 데스크톱 메뉴 링크 클릭 이벤트
    const desktopMenuLinks = document.querySelectorAll('nav a, a[href^="#"]');
    desktopMenuLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // 4. "맨 위로" 버튼 클릭 이벤트
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }

    // 5. 스크롤 이벤트 (throttle 적용)
    const throttledScroll = throttle(() => {
        handleNavbarScroll();
        updateActiveNavLink();
        handleScrollToTopButton();
    }, 100);

    window.addEventListener('scroll', throttledScroll);

    // 6. 초기 스크롤 애니메이션 설정
    initScrollAnimations();

    // 7. 초기 스킬 바 애니메이션 설정
    animateSkillBars();

    // 8. 초기 상태 업데이트
    handleNavbarScroll();
    updateActiveNavLink();
    handleScrollToTopButton();

    console.log('✅ 포트폴리오 초기화 완료!');
}

// ===================================
// DOM 로드 완료 시 초기화
// ===================================

document.addEventListener('DOMContentLoaded', init);

// 페이지 뒤로 돌아올 시에도 초기화
window.addEventListener('pageshow', () => {
    handleNavbarScroll();
    updateActiveNavLink();
    handleScrollToTopButton();
});
