/**
 * Dynamic Birthday Configuration
 * Can be customized here or overridden via URL params (e.g. ?name=Ammu&date=2026-10-07)
 */

(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const paramName = urlParams.get('name');
  const paramDate = urlParams.get('date');

  const defaultDateStr = '2026-10-07T00:00:00';
  const targetDateStr = paramDate ? `${paramDate}T00:00:00` : defaultDateStr;
  const birthDateObj = new Date(targetDateStr);

  const formattedDate = birthDateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  window.BIRTHDAY_CONFIG = {
    name: paramName || 'Ammu',
    targetDate: birthDateObj,
    dateStrFormatted: '07-10-2026',
    dateDisplay: formattedDate,
    relationship: 'My Love',
    senderName: 'TV',
    
    // Dynamic message sets matching user's heartfelt wishes
    messages: {
      cardLines: [
        "Happy birthday to my favourite person, my queen, my boss baby, my cutie patootie & my hottie!",
        "I love ur heart, ur soft kindness, ur silly childish side and literally anything about u, Ammu.",
        "Through the good, the messy, and everything ahead -- I love u, Ammu. I always will! 💖"
      ],
      surpriseTitle: "Happy Birthday Bujju!",
      surpriseSubtitle: "Having you in my life makes every single day brighter.",
      surpriseText2: "I love the real u, and I want to keep learning how to love u better.",
      surpriseText3: "On your special day (07-10-2026), your full heartfelt PDF letter is ready below! ✨",
      endingTitle: "To Many More Years Together, Ammu...",
      endingSub: "Your special birthday PDF letter is ready for you!"
    }
  };

  window.getBirthdayCountdown = function () {
    const now = new Date();
    const diff = window.BIRTHDAY_CONFIG.targetDate - now;

    if (diff <= 0 && diff > -86400000) {
      return { isToday: true, isPast: false, days: 0, hours: 0, minutes: 0, seconds: 0 };
    } else if (diff <= -86400000) {
      return { isToday: false, isPast: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      isToday: false,
      isPast: false,
      days,
      hours,
      minutes,
      seconds,
      totalDiff: diff
    };
  };
})();
