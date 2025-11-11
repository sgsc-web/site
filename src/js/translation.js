document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            home: 'Home',
            about: 'About Us',
            services: 'Services',
            products: 'Products',
            partners: 'Partners',
            news: 'News',
            contact: 'Contact Us',
            login: 'Login',
            hero_title: 'Welcome to My Awesome Website',
            hero_subtitle: 'Your one-stop solution for amazing things.',
            search: 'Search',
            all_fields: 'All Services',
            our_services: 'Our',
            services_span: 'Services',
            our_products: 'Our Products',
            all_courses: 'All Products',
            our_partners: 'Our Partners',
            latest_news: 'Latest News',
            all_blogs: 'All News',
            client_feedback: 'What Our Clients Say',
            why_choose_us: 'Why',
            choose_us_span: 'Choose Us',
            // Add more translations as needed
        },
        ar: {
            home: 'الرئيسية',
            about: 'من نحن',
            services: 'خدماتنا',
            products: 'منتجاتنا',
            partners: 'شركاؤنا',
            news: 'أخبار',
            contact: 'اتصل بنا',
            login: 'تسجيل الدخول',
            hero_title: 'مرحبا بكم في موقعنا الرائع',
            hero_subtitle: 'وجهتك الوحيدة لكل ما هو مدهش.',
            search: 'بحث',
            all_fields: 'كل الخدمات',
            our_services: 'أبرز',
            services_span: 'خدماتنا',
            our_products: 'منتجاتنا',
            all_courses: 'كل المنتجات',
            our_partners: 'شركاؤنا',
            latest_news: 'آخر الأخبار',
            all_blogs: 'كل الأخبار',
            client_feedback: 'ماذا يقول عملاؤنا',
            why_choose_us: 'لماذا',
            choose_us_span: 'تختارنا',
            // Add more translations as needed
        }
    };

    const setLanguage = (language) => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[language] && translations[language][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[language][key];
                } else {
                    element.innerHTML = translations[language][key];
                }
            }
        });
        localStorage.setItem('language', language);
    };

    const languageSwitcher = document.getElementById('language-switcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', (event) => {
            event.preventDefault();
            const currentLang = document.documentElement.lang;
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            setLanguage(newLang);
            // Update the button text
            languageSwitcher.textContent = newLang === 'en' ? 'AR' : 'EN';
        });
    }

    // Set initial language
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    if (languageSwitcher) {
        languageSwitcher.textContent = savedLanguage === 'en' ? 'AR' : 'EN';
    }
});
