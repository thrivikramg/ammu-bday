/**
 * Dynamic Birthday Configuration
 * Can be customized here or overridden via URL params (e.g. ?name=Ammu&date=2026-10-07)
 */

(function () {
  // Parse URL Parameters if available
  const urlParams = new URLSearchParams(window.location.search);
  const paramName = urlParams.get('name');
  const paramDate = urlParams.get('date');

  // Default target date: October 7, 2026 (07-10-2026)
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
    
    // Dynamic message sets
    messages: {
      cardLines: [
        "You've been with me through my best days and my hardest ones — and I can't imagine life without you, Ammu.",
        "On your special day, October 7, 2026, I just want you to feel how deeply loved and appreciated you truly are.",
        "You deserve all the joy, warmth, and magical moments in the world, today and always! 💖"
      ],
      surpriseTitle: "Happy Birthday, Ammu!",
      surpriseSubtitle: "Having you in my life makes me feel like the luckiest person alive.",
      surpriseText2: "Your smile, your love, your presence — they complete my world.",
      surpriseText3: "On your special day (07-10-2026), I wish all your wildest dreams come true. ✨",
      endingTitle: "To Many More Beautiful Years, Ammu...",
      endingSub: "The journey with you is my favorite adventure."
    }
  };

  /**
   * Helper function to compute countdown time remaining
   */
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
