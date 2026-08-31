/**
 * 💖 Happy Birthday Website Configuration
 * ---------------------------------------------------------------
 * Customize all text, memories, letter, and reasons below!
 * You can also drop your own PNG photos directly into the `assets/` folder.
 */

const BIRTHDAY_CONFIG = {
  // 🌸 Girlfriend & Birthday Info
  recipientName: "Prashita", // Her name
  nickname: "Prashiii💕✨",
  birthdayDate: "September 1", // Displayed on the badge & timeline
  birthYear: "Special Day", // e.g. "2002" or "Forever Young"

  // 💌 Hero Section
  hero: {
    badge: "🎉 Today is all about YOU, Prashita",
    headline: "Happy Birthday, My Beautiful Prashita!",
    subheadline: "To the girl who brings endless sunshine, warmth, and magic into my universe. Every second with you is a dream come true.",
    image: "assets/hero.png", // Replace with her photo or cutout
    placeholderFallback: "assets/hero-placeholder.svg",
    ctaButton: "✨ Unwrap Your Surprise ✨"
  },

  // 🎂 Interactive Cake Section
  cake: {
    title: "Make a Birthday Wish 🎂",
    subtitle: "Close your eyes, make the sweetest wish in your heart, and click the candle to blow it out!",
    blownMessage: "✨ May all your sweetest dreams, hopes, and wishes come true! You deserve all the happiness in the world. ✨",
  },

  // 💌 3D Wax Seal Love Letter
  letter: {
    tag: "A Letter From My Heart 💌",
    title: "To My Dearest Prashita,",
    date: "September 1",
    paragraphs: [
      "Happy Birthday to the most cute ,dumb and gentle soul I know. From the moment you walked into my world, you turned ordinary days into unforgettable adventures.",
      "Thank you for your warmth, your dumbass laughter, the way you always  cheer me up when my algorithm gets messed up and the endless love you shower on me.",
      "On this special birthday, I want to promise you my unwavering love, support, and a million more sweet memories together. May your coming year be filled with boundless joy, peace, success, and all the love you so effortlessly give to the world.",
      "I love you a lottt. Happy Birthday, my love! ❤️"
    ],
    signature: "Forever Yours, Always & Truly 💕"
  },

  // 💖 Reasons Why I Love You
  reasons: [
    {
      icon: "✨",
      title: "Your sweet laughter",
      description: "How your laugh immediately lights up my mood and makes everything better."
    },
    {
      icon: "🌸",
      title: "Your Kind & Pure Heart",
      description: "The gentle empathy and love you show to everyone around you especially mee hehe."
    },
    {
      icon: "🧸",
      title: "Your Cute Voice",
      description: "The sweetest, most adorable sound that instantly melts my heart and brings peace to my day."
    },
    {
      icon: "🌙",
      title: "All Our Twisted Dreams",
      description: "Every wild, funny, and beautiful daydream of ours that only we understand."
    },
    {
      icon: "🌟",
      title: "Your Beautiful Ambition",
      description: "How passionately you chase your dreams and inspire me to be better every single day."
    },
    {
      icon: "💫",
      title: "Simply Being You",
      description: "Every little quirk, habit, and expression makes you one-of-a-kind and irreplaceable."
    }
  ],

  // 🎵 Audio Settings
  music: {
    src: "assets/song.mp3", // Your custom background song
    title: "Tainu Khabar Nahi 🎵"
  }
};

if (typeof window !== 'undefined') {
  window.BIRTHDAY_CONFIG = BIRTHDAY_CONFIG;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BIRTHDAY_CONFIG;
}
