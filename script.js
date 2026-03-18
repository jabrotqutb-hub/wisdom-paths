/* ═══════════════════════════════════════════════
   WISDOM PATHS — Script v1.1
   New: Speaker Collection · Quote of the Day
   ═══════════════════════════════════════════════ */
'use strict';

// ══════════════════════════════════════════════════════════════════════════════
// QUOTES DATA
// ══════════════════════════════════════════════════════════════════════════════
const QUOTES_DATA = [
  { text: "The only true wisdom is in knowing you know nothing.", realAuthor: "Socrates", meaning: "True wisdom starts with humility and recognizing the limits of one's own knowledge.", category: "philosophy", dyk: "Socrates never wrote anything down — all his teachings survive through the writings of his students, primarily Plato." },
  { text: "Knowing yourself is the beginning of all wisdom.", realAuthor: "Aristotle", meaning: "Self-awareness is the foundation for understanding the world and living well.", category: "philosophy", dyk: "Aristotle tutored a 13-year-old Alexander the Great for three years, shaping one of history's greatest conquerors." },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", realAuthor: "Aristotle", meaning: "Our character is shaped by consistent actions, not isolated moments.", category: "philosophy", dyk: "Aristotle founded the Lyceum school in Athens where he taught while walking — his followers were called 'Peripatetics,' from the Greek word for walking." },
  { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", realAuthor: "Buddha", meaning: "Peace and clarity come from fully living in the now.", category: "spirituality", dyk: "The Buddha sat under the Bodhi tree for 49 days straight before achieving enlightenment. The original tree's descendant still stands in Bodh Gaya, India." },
  { text: "The longest journey begins with a single step.", realAuthor: "Lao Tzu", meaning: "Even the greatest achievements start with one small, courageous action.", category: "spirituality", dyk: "Lao Tzu is said to have lived to 160 or even 200 years old according to legend. Whether he was a real person at all is still debated by historians." },
  { text: "It does not matter how slowly you go as long as you do not stop.", realAuthor: "Confucius", meaning: "Consistent progress, no matter the pace, leads to success.", category: "philosophy", dyk: "Confucius had around 3,000 students during his lifetime. His teachings were compiled by his disciples after his death into the Analects." },
  { text: "If you want to go fast, go alone. If you want to go far, go together.", realAuthor: "African Proverb", meaning: "Collaboration and community enable greater, longer-lasting achievements.", category: "proverb", dyk: "This proverb is widely attributed across many African cultures but has no single verified origin — its wisdom is considered collective heritage." },
  { text: "Hard work is worthless for those that don't believe in themselves.", realAuthor: "Naruto Uzumaki", meaning: "Effort without self-belief lacks direction and true power.", category: "anime", dyk: "Naruto is one of the best-selling manga series of all time with over 250 million copies sold worldwide. Creator Masashi Kishimoto based Naruto's personality partly on himself." },
  { text: "If you don't take risks, you can't create a future.", realAuthor: "Monkey D. Luffy", meaning: "Growth and new possibilities require stepping beyond comfort and safety.", category: "anime", dyk: "One Piece holds the Guinness World Record for most copies published for the same comic book series by a single author — over 500 million copies." },
  { text: "Believe in yourself. Not in the you who believes in me... Believe in the you who believes in yourself!", realAuthor: "Kamina", meaning: "Ultimate strength comes from inner conviction, not external validation.", category: "anime", dyk: "Gurren Lagann's Kamina was only meant to appear for a few episodes but became so beloved his influence shapes the entire series even after his early exit." },
  { text: "People live their lives bound by what they accept as correct and true. That's how they define reality.", realAuthor: "Itachi Uchiha", meaning: "Our perceived reality is shaped by the beliefs and truths we choose to accept.", category: "anime", dyk: "Itachi Uchiha consistently ranks as fans' favourite Naruto character in popularity polls — despite being a villain for most of the series." },
  { text: "You can die anytime, but living takes true courage.", realAuthor: "Kenshin Himura", meaning: "Facing life fully every day requires more bravery than facing death.", category: "anime", dyk: "Rurouni Kenshin is set during the Meiji era of Japan (1868–1912), a real transformational period when samurai culture officially ended by government decree." },
  { text: "Fall seven times, stand up eight.", realAuthor: "Japanese Proverb", meaning: "Resilience means getting back up after every failure.", category: "proverb", dyk: "The Japanese concept of 'Nana korobi ya oki' is also the title of a famous children's toy called Daruma, a round weighted doll that always returns upright when pushed over." },
  { text: "Shared joy is a double joy; shared sorrow is half a sorrow.", realAuthor: "Swedish Proverb", meaning: "Sharing experiences strengthens happiness and eases pain.", category: "proverb", dyk: "Sweden consistently ranks in the top 5 happiest countries in the world in the UN World Happiness Report — many researchers link this to strong social trust and community bonds." },
  { text: "Words should be weighed, not counted.", realAuthor: "Yiddish Proverb", meaning: "Quality of speech matters more than quantity.", category: "proverb", dyk: "Yiddish was spoken by up to 13 million people before World War II. Today around 600,000 speakers remain, making its preservation a major cultural effort." },
  { text: "The earth is the mother of all.", realAuthor: "Ogoni Proverb (Nigeria)", meaning: "Nature sustains all life, deserving respect and care.", category: "proverb", dyk: "The Ogoni people of Nigeria became internationally known in the 1990s when activist Ken Saro-Wiwa led protests against oil company environmental destruction of their homeland." },
  { text: "A king's child is a slave elsewhere.", realAuthor: "African Proverb", meaning: "Status is relative; humility is universal.", category: "proverb", dyk: "African proverbs are considered living philosophy — elders use them to settle disputes, teach children and guide communities, passed down entirely through oral tradition." },
  { text: "Man takes up the sword in order to shield the small wound in his heart.", realAuthor: "Kentaro Miura (Berserk)", meaning: "People fight to protect their inner vulnerabilities.", category: "manga", dyk: "Kentaro Miura spent 32 years creating Berserk, drawing virtually every panel alone. He passed away in 2021 and his close friend Kouji Mori is completing the manga from his notes." },
  { text: "Even the strongest man must die.", realAuthor: "Kentaro Miura (Berserk)", meaning: "No one is invincible; mortality humbles all.", category: "manga", dyk: "Berserk is famous for its extraordinarily detailed artwork — a single chapter could take Miura several weeks to draw. Some pages contain hundreds of intricate pen-ink creatures." },
  { text: "Hate is a place where a man who can't stand sadness goes.", realAuthor: "Kentaro Miura (Berserk)", meaning: "Hatred often masks unresolved grief.", category: "manga", dyk: "Berserk directly inspired Dark Souls creator Hidetaka Miyazaki — the Souls series' brutal world, the character Guts, and its themes of perseverance all trace back to Miura's work." },
  { text: "Dreams. Each man longs to pursue his dream. Each man is tortured by this dream, but the dream gives meaning to his life.", realAuthor: "Kentaro Miura (Berserk)", meaning: "Ambition drives us, even if it causes suffering.", category: "manga", dyk: "Griffith from Berserk is considered one of the greatest villains in manga history. His design, white armour and ambition inspired countless characters including Sephiroth from Final Fantasy VII." },
  { text: "If you're always worried about crushing the ants beneath you... you won't be able to walk.", realAuthor: "Kentaro Miura (Berserk)", meaning: "Progress requires accepting some unintended harm.", category: "manga", dyk: "Berserk has been in publication since 1989. It is one of the few manga series that has never had a definitive ending — and almost certainly never will have one in its original creator's hand." },
  { text: "Preoccupied with a single leaf, you won't see the tree. Preoccupied with a single tree, you'll miss the entire forest.", realAuthor: "Takehiko Inoue (Vagabond)", meaning: "Focus on the bigger picture to truly understand.", category: "manga", dyk: "Vagabond is based on the real life of legendary Japanese swordsman Miyamoto Musashi, who fought over 60 duels and never lost. He wrote The Book of Five Rings, still studied in business schools today." },
  { text: "There is no light for those who do not know darkness.", realAuthor: "Takehiko Inoue (Vagabond)", meaning: "Appreciating good requires experiencing hardship.", category: "manga", dyk: "Takehiko Inoue won the Eisner Award — the comic equivalent of the Oscars — making Vagabond one of very few manga to receive major Western comics recognition." },
  { text: "Nothing goes perfectly for us. But... being incomplete is what pushes us onward to the next something.", realAuthor: "Takehiko Inoue (Vagabond)", meaning: "Imperfection drives growth and progress.", category: "manga", dyk: "Vagabond has been on hiatus since 2015 with no confirmed return date. Inoue has spoken publicly about struggling with perfectionism as the reason for the pause." },
  { text: "Invincible... it is merely a word.", realAuthor: "Takehiko Inoue (Vagabond)", meaning: "No one is truly unbeatable; it's an illusion.", category: "manga", dyk: "The real Miyamoto Musashi fought his most famous duel against Sasaki Kojiro at age 29, arriving over two hours late on purpose as a psychological tactic — and won in seconds." },
  { text: "Once your heart is preoccupied, your sword will not be true. Then you will die.", realAuthor: "Takehiko Inoue (Vagabond)", meaning: "Distraction leads to failure in critical moments.", category: "manga", dyk: "Miyamoto Musashi spent his later years as a painter and calligrapher. His brushwork is considered national art treasures in Japan — he saw swordsmanship and art as expressions of the same spirit." },
  { text: "You have no enemies. No one has enemies. There is no reason to harm anyone in the world.", realAuthor: "Makoto Yukimura (Vinland Saga)", meaning: "Violence stems from misunderstanding; true peace sees no foes.", category: "manga", dyk: "Vinland Saga is set during the real Viking Age, and Thorfinn is based on actual Norse explorer Thorfinn Karlsefni who led an expedition to North America around 1010 AD." },
  { text: "Time is on your side. You'll grow up and I'll grow old. Someday you'll likely beat me. It's only natural.", realAuthor: "Makoto Yukimura (Vinland Saga)", meaning: "Age brings inevitable change and reversal of power.", category: "manga", dyk: "Vikings actually reached North America 500 years before Columbus. Archaeological evidence at L'Anse aux Meadows in Newfoundland, Canada confirms a Norse settlement around 1000 AD." },
  { text: "Why is there no love in the hearts of men?", realAuthor: "Makoto Yukimura (Vinland Saga)", meaning: "Human conflict arises from a lack of compassion.", category: "manga", dyk: "Vinland Saga won the Kodansha Manga Award and is praised by critics for depicting the psychological cost of violence — unusual for an action manga of its scale." },
  { text: "A true warrior doesn't need a sword.", realAuthor: "Makoto Yukimura (Vinland Saga)", meaning: "Strength comes from within, not weapons.", category: "manga", dyk: "The anime adaptation of Vinland Saga was produced by Wit Studio (Attack on Titan) and MAPPA, two of the most acclaimed anime studios in the industry." },
  { text: "The journey to freedom is the greatest adventure of all.", realAuthor: "Makoto Yukimura (Vinland Saga)", meaning: "Seeking peace and liberty is life's ultimate quest.", category: "manga", dyk: "Makoto Yukimura started Vinland Saga as a response to the Iraq War — he wanted to examine whether violence ever truly solves human problems." },
  { text: "If you win, you live. If you lose, you die. If you don't fight, you can't win.", realAuthor: "Eren Yeager (Attack on Titan)", meaning: "Survival demands action and courage.", category: "anime", dyk: "Attack on Titan sold over 100 million copies worldwide. Creator Hajime Isayama wrote the entire ending before starting chapter one, then stuck to it despite fan pressure." },
  { text: "I am the hope of the universe. I am the answer to all living things that cry out for peace.", realAuthor: "Goku (Dragon Ball)", meaning: "True heroes protect the innocent and seek harmony.", category: "anime", dyk: "Dragon Ball Z's Goku is the most recognised anime character globally according to multiple international surveys, beating even Pikachu in some regions." },
  { text: "A lesson without pain is meaningless. That's because no one can gain without sacrificing something.", realAuthor: "Edward Elric (Fullmetal Alchemist)", meaning: "Growth requires loss and endurance.", category: "anime", dyk: "Fullmetal Alchemist: Brotherhood is still the highest-rated anime of all time on MyAnimeList with a score consistently above 9.1 from over 2 million ratings." },
  { text: "The world is cruel, but also very beautiful.", realAuthor: "Mikasa Ackerman (Attack on Titan)", meaning: "Life holds both suffering and wonder.", category: "anime", dyk: "The Survey Corps' wings of freedom symbol in Attack on Titan is based on the real double-headed eagle, a symbol used by the Byzantine and Holy Roman Empires." },
  { text: "No matter how hard or impossible it is, never lose sight of your goal.", realAuthor: "Monkey D. Luffy (One Piece)", meaning: "Persistence turns dreams into reality.", category: "anime", dyk: "One Piece creator Eiichiro Oda has been drawing weekly since 1997 without a single year off. He reportedly sleeps only 3 hours a night to maintain the schedule." },
  { text: "If you don't share someone's pain, you can never understand them.", realAuthor: "Nagato (Naruto)", meaning: "Empathy bridges divides between people.", category: "anime", dyk: "The concept of Pain in Naruto was inspired by real-world cycles of war and revenge — Nagato's arc is considered one of anime's most philosophically dense storylines." },
  { text: "Power comes in response to a need, not a desire.", realAuthor: "Goku (Dragon Ball)", meaning: "True strength arises from necessity, not greed.", category: "anime", dyk: "Dragon Ball Z was so influential in France that a generation of French children grew up calling themselves fans — France remains one of the biggest anime markets outside Japan." },
  { text: "Human strength lies in the ability to change yourself.", realAuthor: "Saitama (One Punch Man)", meaning: "Personal transformation is the greatest power.", category: "anime", dyk: "One Punch Man began as a free webcomic by a creator known only as ONE, drawn in a deliberately crude style. It went viral in Japan before being redrawn by Yusuke Murata into one of the most beautiful manga ever published." },
  { text: "Push through the pain. Giving up hurts more.", realAuthor: "Vegeta (Dragon Ball)", meaning: "Enduring hardship leads to greater rewards than quitting.", category: "anime", dyk: "Vegeta is consistently voted the most popular Dragon Ball character in Japan, often beating Goku. His redemption arc is cited as one of the most satisfying character journeys in shonen manga." },
  { text: "The difference between a novice and a master is that a master has failed more times than a novice had tried.", realAuthor: "Koro-sensei (Assassination Classroom)", meaning: "Failure is the path to mastery.", category: "anime", dyk: "Assassination Classroom ran for 180 chapters and sold over 25 million copies. Its creator Yusei Matsui said the premise — a teacher who must be killed by his students — was meant as a metaphor for overcoming your mentors." },
  { text: "Do good and throw it in the sea.", realAuthor: "Arab Proverb", meaning: "Kindness should be selfless, without expectation of reward.", category: "proverb", dyk: "This proverb is particularly common across North Africa and the Middle East and reflects the Islamic concept of 'sadaqah' — charity given without expectation of recognition." },
  { text: "Smooth seas do not make skillful sailors.", realAuthor: "African Proverb", meaning: "Challenges build competence and strength.", category: "proverb", dyk: "A similar sentiment appears in Eleanor Roosevelt's writings and in the journals of Franklin D. Roosevelt, suggesting this wisdom spread across cultures independently." },
  { text: "Man is the measure of all things.", realAuthor: "Protagoras", meaning: "Human perspective shapes reality and truth.", category: "philosophy", dyk: "Protagoras was one of the first paid teachers in history — he charged enormous fees for his lessons and became very wealthy, scandalising traditional Greeks who believed wisdom should be free." },
  { text: "I grow old always learning many things.", realAuthor: "Solon", meaning: "Lifelong learning keeps one young in spirit.", category: "philosophy", dyk: "Solon of Athens is one of the Seven Sages of Greece and considered the father of Athenian democracy. He rewrote the city's laws and then voluntarily left Athens for 10 years so no one could pressure him to change them." },
  { text: "The secret of happiness is not found in seeking more, but in developing the capacity to enjoy less.", realAuthor: "Epicurus", meaning: "Contentment comes from simplicity.", category: "philosophy", dyk: "Epicurus lived in a commune-style garden in Athens with friends and students, practising the simple pleasures he preached. Contrary to the modern word 'epicurean,' he ate bread, water and cheese, not lavish feasts." },
  { text: "Beware the barrenness of a busy life.", realAuthor: "Socrates", meaning: "Activity without purpose leads to emptiness.", category: "philosophy", dyk: "Socrates was tried and executed by Athens at age 70 for 'corrupting the youth' and 'impiety.' He refused to flee when offered the chance, choosing death over abandoning his principles." },
  { text: "The roots of education are bitter, but the fruit is sweet.", realAuthor: "Aristotle", meaning: "Learning requires effort, but yields great rewards.", category: "philosophy", dyk: "Aristotle wrote approximately 200 treatises covering logic, biology, physics, ethics, politics, and art. Only about 31 survive — the rest were lost when the Library of Alexandria burned." },
  { text: "Everything flows, nothing stands still.", realAuthor: "Heraclitus", meaning: "Change is the only constant in life.", category: "philosophy", dyk: "Heraclitus was so difficult to understand that the ancient Greeks nicknamed him 'The Obscure.' He deliberately wrote in riddles because he believed only those who truly sought wisdom deserved to understand it." },
  { text: "A journey of a thousand miles begins with a single step.", realAuthor: "Confucius", meaning: "Great endeavors start small.", category: "philosophy", dyk: "This is actually misattributed to Confucius — it originally comes from Lao Tzu's Tao Te Ching. The mix-up is one of the most common misattributions in history." },
  { text: "Every morning we are born again. What we do today is what matters most.", realAuthor: "Buddha", meaning: "Focus on the present for true fulfillment.", category: "spirituality", dyk: "There are over 500 million Buddhists worldwide, making it the fourth largest religion. Unlike most major religions, Buddhism has no single founding text — the Buddha's words were memorised by monks for 400 years before being written down." },
  { text: "Even if we painstakingly piece together something lost, it doesn't mean things will ever go back to how they were.", realAuthor: "Kentaro Miura (Berserk)", meaning: "Some losses change us irrevocably.", category: "manga", dyk: "The Japanese art of Kintsugi — repairing broken pottery with gold — embodies this idea. The breakage is considered part of the object's history, not something to hide." },
  { text: "Ambition comes with a price attached.", realAuthor: "Kentaro Miura (Berserk)", meaning: "Pursuing dreams often requires sacrifice.", category: "manga", dyk: "Berserk's villain Griffith is loosely inspired by real historical figures who sacrificed everything for power, including Cesare Borgia, the ruthless Italian nobleman who inspired Machiavelli's The Prince." },
  { text: "Do you see how infinite you are?", realAuthor: "Takehiko Inoue (Vagabond)", meaning: "Human potential is boundless.", category: "manga", dyk: "Takehiko Inoue is also the creator of Slam Dunk, the basketball manga credited with triggering Japan's real-world basketball boom in the 1990s. The anime recently received a feature film sequel 30 years later." },
  { text: "Why do we have to fear death? Do we live because we don't want to die?", realAuthor: "Makoto Yukimura (Vinland Saga)", meaning: "Questioning mortality reveals life's purpose.", category: "manga", dyk: "The Stoic philosophers, particularly Seneca, asked almost this exact question 2,000 years ago: 'It is not death that a man should fear, but he should fear never beginning to live.'" },
  { text: "The leaping of one fish would never disturb the flow of the river.", realAuthor: "Makoto Yukimura (Vinland Saga)", meaning: "Individual actions rarely alter the greater course.", category: "manga", dyk: "This idea — that individuals are small against history's current — appears in Tolstoy's War and Peace, which argues that great events are driven by collective forces, not individual great men." },
  { text: "I think, therefore I am.", realAuthor: "René Descartes", meaning: "The very act of thinking proves one's existence.", category: "philosophy", dyk: "Descartes came up with this insight while sitting alone in a room heated by a stove, trying to doubt everything he possibly could. It remains the most famous sentence in Western philosophy." },
  { text: "God is dead. God remains dead. And we have killed him.", realAuthor: "Friedrich Nietzsche", meaning: "Modern society has moved beyond traditional religious frameworks.", category: "philosophy", dyk: "Nietzsche wrote this in 1882. He suffered a mental breakdown in 1889 from which he never recovered, spending his last 11 years in a catatonic state. The cause remains debated — possibly syphilis, or a hereditary condition." },
  { text: "One cannot step twice in the same river.", realAuthor: "Heraclitus", meaning: "Everything is in constant flux and change.", category: "philosophy", dyk: "This quote inspired the philosopher Cratylus to take it further, arguing you can't step in the same river even once — because you and the river are both changing even as your foot touches the water." },
  { text: "The unexamined life is not worth living.", realAuthor: "Socrates", meaning: "Self-reflection is essential to a meaningful existence.", category: "philosophy", dyk: "Socrates said this at his trial just before being sentenced to death. He was given the option to propose his own punishment — and suggested the city of Athens reward him with free meals for life, which did not help his case." },
  { text: "He who has a why to live can bear almost any how.", realAuthor: "Friedrich Nietzsche", meaning: "Purpose gives us strength to endure hardship.", category: "philosophy", dyk: "Holocaust survivor Viktor Frankl quoted this line in his landmark book Man's Search for Meaning, saying it described exactly what kept prisoners alive in Nazi concentration camps." },
  { text: "What does not kill me makes me stronger.", realAuthor: "Friedrich Nietzsche", meaning: "Adversity builds resilience and character.", category: "philosophy", dyk: "Nietzsche wrote this in Twilight of the Idols in 1888 — just one year before his mental collapse. The irony is not lost on scholars who study his life." },
  { text: "To be is to do.", realAuthor: "Immanuel Kant", meaning: "Existence is defined by action and moral choice.", category: "philosophy", dyk: "Kant was so punctual that the people of Königsberg reportedly set their clocks by his daily afternoon walk. He lived in the same city his entire life and never traveled more than 100km from his birthplace." },
  { text: "Happiness is not an ideal of reason, but of imagination.", realAuthor: "Immanuel Kant", meaning: "True happiness comes from creative fulfillment, not logic.", category: "philosophy", dyk: "Kant's Critique of Pure Reason, published in 1781, is considered so difficult that even philosophy professors find it hard to read. He took 10 years to write it after being inspired by reading David Hume." },
  { text: "The mind is furnished with ideas by experience alone.", realAuthor: "John Locke", meaning: "All knowledge comes from sensory experience.", category: "philosophy", dyk: "John Locke's political ideas directly inspired the US Declaration of Independence. Thomas Jefferson borrowed Locke's phrase 'life, liberty and property' and changed 'property' to 'pursuit of happiness.'" },
  { text: "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.", realAuthor: "Bruce Lee", meaning: "Mastery comes from focused repetition, not variety.", category: "martial arts", dyk: "Bruce Lee could do push-ups using only two fingers and one thumb. He could also snatch a dime off a person's open palm and replace it with a penny before they could close their hand." },
  { text: "Be water, my friend.", realAuthor: "Bruce Lee", meaning: "Adaptability and flexibility are key to overcoming obstacles.", category: "martial arts", dyk: "Bruce Lee said this in a 1971 TV interview. It became one of the most quoted phrases in martial arts history and is now used by businesses, psychologists and coaches worldwide." },
  { text: "Empty your mind, be formless, shapeless, like water.", realAuthor: "Bruce Lee", meaning: "Freedom comes from releasing rigid patterns of thought.", category: "martial arts", dyk: "Bruce Lee created his own martial art, Jeet Kune Do, at age 26. It was revolutionary because it drew from multiple styles at a time when mixing martial arts was considered a betrayal of tradition." },
  { text: "Knowing is not enough, we must apply. Willing is not enough, we must do.", realAuthor: "Bruce Lee", meaning: "Action is more important than knowledge or intention alone.", category: "martial arts", dyk: "This quote is often misattributed to Bruce Lee — it is actually from Goethe's Wilhelm Meister's Apprenticeship, written in 1795. Lee included it in his notes and it became associated with him." },
  { text: "The key to immortality is first living a life worth remembering.", realAuthor: "Bruce Lee", meaning: "Legacy is built through meaningful actions, not mere existence.", category: "martial arts", dyk: "Bruce Lee died at 32 in 1973, just six days before the premiere of Enter the Dragon, the film that made him a global superstar. He remains one of the most influential people of the 20th century." },
  { text: "All that we are is the result of what we have thought.", realAuthor: "Buddha", meaning: "Our consciousness shapes our reality and identity.", category: "spirituality", dyk: "Modern neuroscience supports this — studies show that repeated thought patterns physically reshape neural pathways, a phenomenon called neuroplasticity, discovered 2,500 years after the Buddha described it." },
  { text: "Three things cannot be long hidden: the sun, the moon, and the truth.", realAuthor: "Buddha", meaning: "Truth, like natural phenomena, eventually reveals itself.", category: "spirituality", dyk: "The Buddha spent 45 years teaching after his enlightenment, walking an estimated 250,000 kilometers across India and Nepal — roughly six times around the Earth." },
  { text: "Peace comes from within. Do not seek it without.", realAuthor: "Buddha", meaning: "True serenity is found internally, not through external means.", category: "spirituality", dyk: "Mindfulness meditation, now practised by an estimated 500 million people globally and recommended by doctors and psychologists, is directly derived from Buddhist meditation techniques developed 2,500 years ago." },
  { text: "The mind is everything. What you think you become.", realAuthor: "Buddha", meaning: "Our thoughts ultimately shape our reality and identity.", category: "spirituality", dyk: "This quote is often cited in psychology — the placebo effect demonstrates it scientifically. Patients who believe they are receiving treatment often show measurable physical improvement from sugar pills alone." },
  { text: "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.", realAuthor: "Buddha", meaning: "True riches are found in well-being, satisfaction, and loyalty.", category: "spirituality", dyk: "Despite founding one of the world's great religions, the Buddha asked his followers not to worship him. He said 'be a lamp unto yourself' — meaning seek inner truth, not external authority." },
  { text: "When I let go of what I am, I become what I might be.", realAuthor: "Lao Tzu", meaning: "Releasing ego and identity allows for true transformation.", category: "spirituality", dyk: "The Tao Te Ching, attributed to Lao Tzu, is the most translated book in the world after the Bible. It has been rendered into English alone in over 250 different versions." },
  { text: "Nature does not hurry, yet everything is accomplished.", realAuthor: "Lao Tzu", meaning: "Patience and natural flow achieve more than forced effort.", category: "spirituality", dyk: "This principle — called Wu Wei or 'non-action' in Taoism — is finding modern application in flow theory, positive psychology, and even software engineering's concept of elegant minimal solutions." },
  { text: "He who knows, does not speak. He who speaks, does not know.", realAuthor: "Lao Tzu", meaning: "True wisdom is often silent, while empty talk reveals ignorance.", category: "spirituality", dyk: "This paradox is particularly interesting because it comes from a book — suggesting even Lao Tzu saw the contradiction in writing about the limits of words." },
  { text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", realAuthor: "Lao Tzu", meaning: "Love operates in two directions: receiving empowers, giving emboldens.", category: "spirituality", dyk: "Research in positive psychology by Dr. Barbara Fredrickson confirms this — studies show people with strong loving relationships demonstrate measurably greater resilience and risk tolerance." },
  { text: "The superior man is modest in his speech, but exceeds in his actions.", realAuthor: "Confucius", meaning: "True excellence shows in deeds rather than words.", category: "philosophy", dyk: "Confucius held several government positions during his life but was largely ignored by rulers of his era. His ideas became the official state philosophy of China only 300 years after his death." },
  { text: "To see what is right and not to do it is want of courage.", realAuthor: "Confucius", meaning: "Moral failure lies in recognizing goodness but failing to act.", category: "philosophy", dyk: "This concept — knowing good but choosing not to act — is called 'moral disengagement' by modern psychologists. Albert Bandura's research shows it is the primary mechanism behind how ordinary people commit atrocities." },
  { text: "The man who moves a mountain begins by carrying away small stones.", realAuthor: "Confucius", meaning: "Great achievements are built through consistent small efforts.", category: "philosophy", dyk: "This concept aligns perfectly with James Clear's Atomic Habits principle that 1% better every day compounds to 37 times better over a year — ancient wisdom meeting modern science." },
  { text: "Our greatest glory is not in never falling, but in rising every time we fall.", realAuthor: "Confucius", meaning: "True honor lies in resilience and recovery from failure.", category: "philosophy", dyk: "Confucius himself failed repeatedly — he spent 13 years wandering China trying to convince rulers to adopt his ideas and was rejected every time. He returned home at 68 and spent his final years teaching." },
  { text: "When do you think people die? When they are shot through the heart? No. It's when they are forgotten.", realAuthor: "Dr. Hiriluk (One Piece)", meaning: "True death is being erased from memory, not physical demise.", category: "anime", dyk: "This idea echoes real cultural beliefs — the Aztec concept of 'Xiu Miquiztli' (true death) holds that a person lives as long as someone speaks their name. Today 'The Day of the Dead' celebrates keeping ancestors alive in memory." },
  { text: "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean is the Pirate King!", realAuthor: "Monkey D. Luffy", meaning: "True freedom, not domination, is the highest aspiration.", category: "anime", dyk: "One Piece has been the top-selling manga in Japan for 15 consecutive years. Eiichiro Oda has said he has the ending already drawn and stored in a sealed box that will only be opened when he is near death." },
  { text: "Power isn't determined by your size, but the size of your heart and dreams.", realAuthor: "Monkey D. Luffy", meaning: "True strength comes from inner conviction and ambition.", category: "anime", dyk: "Luffy's Devil Fruit ability — stretching like rubber — was inspired by the Japanese toy 'soft vinyl' figures that stretch and return to shape, which Oda played with as a child." },
  { text: "Those who break the rules are scum, but those who abandon their friends are worse than scum.", realAuthor: "Kakashi Hatake (Naruto)", meaning: "Loyalty to comrades surpasses even the importance of rules.", category: "anime", dyk: "Kakashi Hatake consistently tops Naruto character popularity polls in Japan. His face, hidden beneath his mask, became one of anime's great mysteries — finally revealed in a comedic episode after years of fan requests." },
  { text: "Sometimes you must hurt in order to know, fall in order to grow, lose in order to gain.", realAuthor: "Pain (Naruto)", meaning: "Suffering is often the most effective teacher in life.", category: "anime", dyk: "The Pain Arc in Naruto Shippuden is cited by critics and fans as one of the greatest arcs in shonen anime history, praised for turning a villain into one of the most philosophically complex characters in the medium." },
  { text: "The moment people come to know love, they run the risk of carrying hate.", realAuthor: "Obito Uchiha (Naruto)", meaning: "Deep attachment creates vulnerability to profound resentment.", category: "anime", dyk: "Psychologist John Bowlby's attachment theory in modern psychology states almost exactly this — that the capacity for love inherently creates vulnerability to grief, loss and anger. Obito arrived there through pain alone." },
  { text: "It's not the face that makes someone a monster; it's the choices they make with their lives.", realAuthor: "Naruto Uzumaki", meaning: "Character is defined by actions, not appearance or nature.", category: "anime", dyk: "This theme runs through virtually all great shonen manga — and mirrors real psychological research showing that moral identity is built through repeated small choices, not innate personality." },
  { text: "A place where someone still thinks about you is a place you can call home.", realAuthor: "Jiraiya (Naruto)", meaning: "Home is defined by emotional connections, not physical location.", category: "anime", dyk: "Jiraiya is one of the most beloved characters in all of anime. His death scene caused such emotional uproar among fans that it trended globally on social media — years before social media routinely tracked anime events." },
  { text: "Wake up to reality! Nothing ever goes as planned in this world.", realAuthor: "Madara Uchiha (Naruto)", meaning: "Idealistic expectations inevitably clash with harsh actuality.", category: "anime", dyk: "Madara Uchiha is based partly on real historical warlords of feudal Japan. His design and personality also drew inspiration from Sun Tzu's Art of War, particularly the sections on deception and overwhelming force." },
  { text: "If you don't like your destiny, don't accept it. Instead, have the courage to change it the way you want it to be.", realAuthor: "Naruto Uzumaki", meaning: "True power lies in rejecting fate and creating one's own path.", category: "anime", dyk: "This message resonated so strongly in Japan that Naruto is officially credited by the Japanese government's cultural agency for helping introduce Japanese culture to a new global generation." },
  { text: "I'm not a hero of justice or anything. I fight for myself, for the people I care about.", realAuthor: "Ichigo Kurosaki (Bleach)", meaning: "Personal connections, not abstract ideals, motivate true action.", category: "anime", dyk: "Bleach's creator Tite Kubo nearly ended the manga after the Soul Society arc — he considered it the natural conclusion. Fans' overwhelming response convinced him to continue for another 15 years." },
  { text: "We are all like fireworks: we climb, we shine and always go our separate ways. But let's not disappear — continue to shine forever.", realAuthor: "Hitsugaya Toshiro (Bleach)", meaning: "Though connections fade, lasting impact and memory remain.", category: "anime", dyk: "Hitsugaya Toshiro consistently won Bleach popularity polls despite being a minor character — a phenomenon that baffled creator Tite Kubo, who had planned to give him much less screen time." },
  { text: "To know sorrow is not terrifying. What is terrifying is to know you can't go back to happiness you could have.", realAuthor: "Matsumoto Rangiku (Bleach)", meaning: "Irreversible loss of past joy is the true essence of fear.", category: "anime", dyk: "Psychologists call the emotion described here 'anticipatory grief' combined with 'counterfactual thinking' — imagining the roads not taken. Research shows it is one of the most psychologically painful human experiences." },
  { text: "A real fight isn't about winning or losing. You fight when you have to fight.", realAuthor: "Kenpachi Zaraki (Bleach)", meaning: "True combat arises from necessity, not competition or victory.", category: "anime", dyk: "The concept of fighting only when necessary is central to Bushido, the samurai code of ethics — a warrior who seeks fights for sport was considered dishonourable, while one who fights to protect was revered." },
  { text: "Don't live your life making up excuses. Live your life so you don't need to make excuses.", realAuthor: "Koro-sensei (Assassination Classroom)", meaning: "A life well-lived inherently justifies itself without explanation.", category: "anime", dyk: "Assassination Classroom's central metaphor — a teacher who must be killed by his students — was deliberately designed to represent every student's need to eventually surpass their teacher to truly grow." },
  { text: "It's not about being better than someone else, but being better than you used to be.", realAuthor: "Koro-sensei (Assassination Classroom)", meaning: "True growth is measured against one's own past self.", category: "anime", dyk: "This philosophy is called 'personal mastery' in modern psychology and is backed by decades of motivation research — people who compete against themselves sustain motivation longer than those who compete against others." },
  { text: "The world isn't perfect. But it's there for us, doing the best it can. That's what makes it so damn beautiful.", realAuthor: "Roy Mustang (Fullmetal Alchemist)", meaning: "Beauty lies in imperfection and persistent effort, not flawlessness.", category: "anime", dyk: "The Japanese concept of wabi-sabi — finding beauty in imperfection and impermanence — is considered one of Japan's most unique philosophical contributions to the world. Roy Mustang understood it perfectly." },
  { text: "Humankind cannot gain anything without first giving something in return.", realAuthor: "Alphonse Elric (Fullmetal Alchemist)", meaning: "The fundamental law of equivalent exchange governs all existence.", category: "anime", dyk: "Equivalent exchange in FMA mirrors real thermodynamic laws — conservation of energy states that energy cannot be created or destroyed, only converted. The alchemical law is essentially fictional physics." },
  { text: "Stand up and walk. Keep moving forward. You've got two good legs. So get up and use them.", realAuthor: "Edward Elric (Fullmetal Alchemist)", meaning: "Resilience means continuing to advance despite setbacks.", category: "anime", dyk: "Edward Elric at 15 is one of the youngest State Alchemists ever in FMA's lore — and one of the youngest protagonists in shonen to carry a series that deals with war, genocide and political corruption." },
  { text: "Strength is the only thing that matters in this world. Everything else is just an illusion.", realAuthor: "Vegeta (Dragon Ball)", meaning: "Power is the ultimate determinant of reality and worth.", category: "anime", dyk: "Vegeta's character arc — from ruthless villain to reluctant hero and father — is studied in narrative design courses as one of the most successful antagonist-to-protagonist transformations in any storytelling medium." },
  { text: "The power of hope is small, but it's the only thing that can defeat despair.", realAuthor: "Makoto Naegi (Danganronpa)", meaning: "Though fragile, hope alone can overcome utter hopelessness.", category: "anime", dyk: "Danganronpa was originally a visual novel game before becoming an anime. Its creator Kazutaka Kodaka designed it to explore how hope survives in systematically hopeless situations — inspired by real-world psychological resilience studies." },
  { text: "Even if we lose our memories, we won't lose our feelings. That's what I believe.", realAuthor: "Kaede Akamatsu (Danganronpa)", meaning: "Emotional truth persists beyond cognitive recollection.", category: "anime", dyk: "This is scientifically supported — studies of Alzheimer's patients show that emotional memories encoded by the amygdala often survive long after episodic memories are lost, a phenomenon called 'emotional memory preservation.'" },
  { text: "The world is not beautiful; therefore, it is.", realAuthor: "Kino (Kino's Journey)", meaning: "True beauty lies in imperfection and contradiction itself.", category: "anime", dyk: "Kino's Journey is adapted from a series of light novels by Keiichi Sigsawa, written when he was a university student. The series is a philosophical travelogue deliberately inspired by Candide, Voltaire's satirical novel." },
  { text: "No matter how deep the night, it always turns to day, eventually.", realAuthor: "Emma (The Promised Neverland)", meaning: "All periods of darkness eventually give way to light.", category: "anime", dyk: "The Promised Neverland was created by writer Kaiu Shirai and artist Posuka Demizu — neither had published a major manga before. It debuted in 2016 and became one of the fastest-selling new series in Shonen Jump history." },
];

// ── Author groups for smarter fake options ────────────────────────────────────
const ALL_SPEAKERS = [
  "Socrates","Aristotle","Plato","Buddha","Lao Tzu","Confucius",
  "African Proverb","Japanese Proverb","Arab Proverb","Swedish Proverb",
  "Yiddish Proverb","Ogoni Proverb (Nigeria)","Naruto Uzumaki","Monkey D. Luffy",
  "Koro-sensei (Assassination Classroom)","Kamina","Itachi Uchiha","Goku (Dragon Ball)","Kenshin Himura",
  "Vegeta (Dragon Ball)","Saitama (One Punch Man)","Edward Elric (Fullmetal Alchemist)",
  "Kentaro Miura (Berserk)","Takehiko Inoue (Vagabond)","Makoto Yukimura (Vinland Saga)",
  "Eren Yeager (Attack on Titan)","Mikasa Ackerman (Attack on Titan)","Nagato (Naruto)",
  "Roy Mustang (Fullmetal Alchemist)","Heraclitus","Epicurus","Solon","René Descartes",
  "Friedrich Nietzsche","Immanuel Kant","John Locke","Bruce Lee",
  "Dr. Hiriluk (One Piece)","Kakashi Hatake (Naruto)","Pain (Naruto)",
  "Obito Uchiha (Naruto)","Rock Lee (Naruto)","Jiraiya (Naruto)",
  "Madara Uchiha (Naruto)","Ichigo Kurosaki (Bleach)","Hitsugaya Toshiro (Bleach)",
  "Matsumoto Rangiku (Bleach)","Uryu Ishida (Bleach)","Kenpachi Zaraki (Bleach)",
  "Alphonse Elric (Fullmetal Alchemist)","Makoto Naegi (Danganronpa)",
  "Kaede Akamatsu (Danganronpa)","Kino (Kino's Journey)","Emma (The Promised Neverland)",
  "Monkey D. Luffy (One Piece)","Gol D. Roger (One Piece)","Protagoras",
];

const AUTHOR_GROUPS = {
  greek:       ["Socrates","Aristotle","Plato","Heraclitus","Epicurus","Solon","Protagoras"],
  modern_phil: ["Friedrich Nietzsche","Immanuel Kant","René Descartes","John Locke"],
  eastern:     ["Buddha","Lao Tzu","Confucius"],
  martial:     ["Bruce Lee","Kenshin Himura"],
  proverbs:    ["African Proverb","Japanese Proverb","Arab Proverb","Swedish Proverb","Yiddish Proverb","Ogoni Proverb (Nigeria)"],
  shonen:      ["Naruto Uzumaki","Monkey D. Luffy","Goku (Dragon Ball)","Kamina","Rock Lee (Naruto)","Monkey D. Luffy (One Piece)"],
  deep_anime:  ["Itachi Uchiha","Pain (Naruto)","Madara Uchiha (Naruto)","Obito Uchiha (Naruto)","Nagato (Naruto)"],
  fma:         ["Edward Elric (Fullmetal Alchemist)","Alphonse Elric (Fullmetal Alchemist)","Roy Mustang (Fullmetal Alchemist)"],
  bleach:      ["Ichigo Kurosaki (Bleach)","Hitsugaya Toshiro (Bleach)","Matsumoto Rangiku (Bleach)","Kenpachi Zaraki (Bleach)","Uryu Ishida (Bleach)"],
  berserk:     ["Kentaro Miura (Berserk)","Takehiko Inoue (Vagabond)","Makoto Yukimura (Vinland Saga)"],
  one_piece:   ["Monkey D. Luffy","Monkey D. Luffy (One Piece)","Dr. Hiriluk (One Piece)","Gol D. Roger (One Piece)"],
  naruto:      ["Naruto Uzumaki","Itachi Uchiha","Kakashi Hatake (Naruto)","Pain (Naruto)","Obito Uchiha (Naruto)","Jiraiya (Naruto)","Madara Uchiha (Naruto)","Nagato (Naruto)"],
};

const CATEGORY_ACCENT = {
  philosophy:     "var(--col-philosophy)",
  spirituality:   "var(--col-spirituality)",
  anime:          "var(--col-anime)",
  manga:          "var(--col-manga)",
  proverb:        "var(--col-proverb)",
  "martial arts": "var(--col-martial)",
};

const RANKS = [
  { min: 0,    label: "Wandering Soul",     emoji: "🌑" },
  { min: 50,   label: "Seeker of Truth",    emoji: "🌒" },
  { min: 150,  label: "Awakened Mind",      emoji: "🌓" },
  { min: 300,  label: "Scholar of Paths",   emoji: "🌔" },
  { min: 500,  label: "Sage in Training",   emoji: "🌕" },
  { min: 750,  label: "Keeper of Wisdom",   emoji: "⭐" },
  { min: 1000, label: "Enlightened Master", emoji: "✨" },
];

const COMBO_MSGS = { 3:"🔥 ON FIRE", 5:"⚡ UNSTOPPABLE", 7:"🌟 LEGENDARY", 10:"💫 OMNISCIENT" };
const LEGENDARY_CHANCE = 0.1;
const DIFF_TIMES = { easy: 15, normal: 10, hard: 6 };

// ══════════════════════════════════════════════════════════════════════════════
// SPEAKER BIOS  (covers every unique realAuthor in QUOTES_DATA)
// ══════════════════════════════════════════════════════════════════════════════
const CAT_ICONS = {
  philosophy: "⚖️", spirituality: "☯️", anime: "⚔️",
  manga: "📖", proverb: "🌿", "martial arts": "🥋",
};

const SPEAKER_BIOS = {
  "Socrates": {
    icon:"⚖️", meta:"Greek Philosopher · 470–399 BC",
    bio:"Socrates never wrote a single word — everything we know comes through his students. He spent his life questioning Athenians in the street, believing he had no wisdom of his own. The Socratic method of relentless questioning he invented is still used in law schools today. Sentenced to death at 70 for 'corrupting the youth,' he refused to flee and drank the hemlock calmly.",
  },
  "Aristotle": {
    icon:"⚖️", meta:"Greek Philosopher · 384–322 BC",
    bio:"Aristotle wrote on logic, biology, physics, ethics, politics, and theatre — arguably the greatest single mind in history. Only 31 of his estimated 200 works survive; the rest were lost. He tutored the 13-year-old Alexander the Great for three years. He founded the Lyceum school where he taught while walking, earning his followers the nickname 'Peripatetics.'",
  },
  "Buddha": {
    icon:"☯️", meta:"Spiritual Teacher · c.563–483 BC",
    bio:"Siddhartha Gautama was a prince who abandoned wealth and comfort to seek the end of suffering. After years of extreme asceticism followed by meditation, he achieved enlightenment under the Bodhi tree at age 35. He spent the next 45 years walking across India teaching, covering an estimated 250,000 kilometers. Over 500 million people follow his teachings today.",
  },
  "Lao Tzu": {
    icon:"☯️", meta:"Chinese Philosopher · c.6th century BC",
    bio:"Lao Tzu ('Old Master') may be more legend than history — scholars still debate whether he was a real person. He is credited with writing the Tao Te Ching, the most translated book in the world after the Bible, rendered into English alone in over 250 versions. His philosophy of Wu Wei — effortless action — continues to influence thinkers, leaders, and engineers worldwide.",
  },
  "Confucius": {
    icon:"⚖️", meta:"Chinese Philosopher · 551–479 BC",
    bio:"Confucius spent 13 years wandering China trying to convince rulers to adopt his ethical ideas and was rejected at every turn. He returned home at 68 and devoted his final years to teaching. Three hundred years after his death, his ideas became the official state philosophy of China and remained so for over 2,000 years, shaping one of the world's oldest civilizations.",
  },
  "Bruce Lee": {
    icon:"🥋", meta:"Martial Artist & Philosopher · 1940–1973",
    bio:"Bruce Lee created his own martial art, Jeet Kune Do, at just 26. He could do push-ups on two fingers and snatch a coin from someone's palm before they could close their hand. His philosophical notebooks fill multiple published volumes. He died at 32 — six days before Enter the Dragon premiered, the film that made him a global legend. He remains among the 20th century's most influential people.",
  },
  "Friedrich Nietzsche": {
    icon:"⚖️", meta:"German Philosopher · 1844–1900",
    bio:"Nietzsche challenged the foundations of Western morality and declared 'God is dead' — meaning modern society had moved beyond traditional frameworks. He wrote some of philosophy's most explosive ideas in just a decade before suffering a complete mental collapse in 1889, spending his last 11 years in a catatonic state. His ideas were later grotesquely misappropriated by the Nazis, something he would have despised.",
  },
  "René Descartes": {
    icon:"⚖️", meta:"French Philosopher · 1596–1650",
    bio:"Descartes arrived at 'I think therefore I am' while sitting alone in a heated room trying to doubt absolutely everything. He is considered the father of modern Western philosophy. He also invented analytical geometry — the coordinate system every graph uses is named the Cartesian plane after him. He died of pneumonia, likely contracted tutoring Queen Christina of Sweden at 5am in freezing temperatures.",
  },
  "Immanuel Kant": {
    icon:"⚖️", meta:"German Philosopher · 1724–1804",
    bio:"Kant was so punctual that the people of Königsberg set their clocks by his afternoon walk. He lived his entire life within 100km of his birthplace and never traveled. Yet his Critique of Pure Reason, written at 57 after a decade of philosophical silence, is considered one of the most important books ever written — even if almost no one can read it easily.",
  },
  "John Locke": {
    icon:"⚖️", meta:"English Philosopher · 1632–1704",
    bio:"John Locke's ideas about natural rights and government consent directly inspired the American Revolution. Thomas Jefferson borrowed Locke's phrase 'life, liberty and property' for the Declaration of Independence, famously changing 'property' to 'pursuit of happiness.' Locke also laid the groundwork for modern science, arguing that all knowledge comes from experience rather than innate ideas.",
  },
  "Heraclitus": {
    icon:"⚖️", meta:"Greek Philosopher · c.535–475 BC",
    bio:"Heraclitus was so deliberately difficult to understand that the ancient Greeks nicknamed him 'The Obscure.' He believed change is the only constant and that opposites are secretly one. His writings survive only in fragments quoted by other authors. His ideas about flux directly influenced Hegel, Marx, and modern physics — Einstein found his river metaphor particularly compelling.",
  },
  "Epicurus": {
    icon:"⚖️", meta:"Greek Philosopher · 341–270 BC",
    bio:"Despite the modern word 'epicurean' suggesting lavish pleasure, Epicurus lived on bread, water, and cheese in a commune garden in Athens. He believed happiness came from simple pleasures and friendship — not luxury. His school was revolutionary: he admitted women and slaves as equals at a time when this was unheard of in Athens.",
  },
  "Protagoras": {
    icon:"⚖️", meta:"Greek Philosopher · c.490–420 BC",
    bio:"Protagoras was one of the first Sophists — professional teachers of wisdom — and one of the first paid educators in history. He charged enormous fees and became wealthy, scandalising Greeks who believed wisdom should be free. His claim that 'man is the measure of all things' is one of philosophy's earliest statements of relativism and still generates debate today.",
  },
  "Solon": {
    icon:"⚖️", meta:"Athenian Statesman · c.638–558 BC",
    bio:"Solon is considered the father of Athenian democracy and one of the Seven Sages of ancient Greece. He completely rewrote Athens' laws, canceling debt slavery and laying the groundwork for democratic governance. After his reforms, he voluntarily left Athens for 10 years so no one could pressure him to change anything. He spent those years traveling Egypt, Cyprus, and meeting Croesus, king of Lydia.",
  },
  "Naruto Uzumaki": {
    icon:"⚔️", meta:"Anime · Naruto / Shippuden",
    bio:"Naruto began as an orphaned outcast — a boy shunned by his entire village for containing a demon fox. His journey from being the most hated person in the village to its greatest protector, through sheer stubbornness and belief in others, is one of manga's most beloved stories. Creator Masashi Kishimoto said Naruto's refusal to give up was directly inspired by his own personality.",
  },
  "Monkey D. Luffy": {
    icon:"⚔️", meta:"Anime · One Piece",
    bio:"Luffy's dream of becoming King of the Pirates is not about power — it's about freedom. Despite seeming simple-minded, he wins allies through an almost supernatural ability to make people believe in themselves. One Piece has sold over 500 million copies, making it the best-selling manga series in history by a single author. Creator Oda has the ending drawn and sealed in a box.",
  },
  "Monkey D. Luffy (One Piece)": {
    icon:"⚔️", meta:"Anime · One Piece",
    bio:"Luffy's dream of becoming King of the Pirates is not about power — it's about freedom. Despite seeming simple-minded, he wins allies through an almost supernatural ability to make people believe in themselves. One Piece has sold over 500 million copies, making it the best-selling manga series in history by a single author. Creator Oda has the ending drawn and sealed in a box.",
  },
  "Kamina": {
    icon:"⚔️", meta:"Anime · Gurren Lagann",
    bio:"Kamina is Gurren Lagann's blazing heart — a young man who never doubted himself even when he probably should have, and whose belief in others became the fuel for something far greater than himself. He was only meant to appear for a few episodes but became so beloved his spirit defines the entire series even after his exit. His catchphrase 'Who the hell do you think I am?' became iconic.",
  },
  "Itachi Uchiha": {
    icon:"⚔️", meta:"Anime · Naruto Shippuden",
    bio:"Itachi carried the weight of an impossible sacrifice his entire life — slaughtering his own clan to prevent a civil war, then allowing his younger brother to believe he was a monster so the hatred would fuel the power needed to eventually defeat him. His true nature, revealed only at death, is considered one of anime's greatest narrative revelations. He tops Naruto popularity polls to this day.",
  },
  "Kenshin Himura": {
    icon:"⚔️", meta:"Anime · Rurouni Kenshin",
    bio:"Kenshin was the most feared assassin in Japan's Meiji Revolution — responsible for countless deaths — who spent years wandering as a peaceful drifter, wielding a sword that cannot kill. Set during a real era when Japan transformed from feudal to modern society, his struggle between his violent past and peaceful present mirrors Japan's own national trauma. The manga sold over 72 million copies.",
  },
  "Eren Yeager (Attack on Titan)": {
    icon:"⚔️", meta:"Anime · Attack on Titan",
    bio:"Eren begins as a furious boy who simply wants to destroy every titan. Over 139 chapters he transforms into one of manga's most controversial protagonists — his final choices challenge readers to question whether the goals they had been cheering for were ever justified. Creator Isayama wrote the entire ending before chapter one and never changed it despite enormous fan pressure against it.",
  },
  "Mikasa Ackerman (Attack on Titan)": {
    icon:"⚔️", meta:"Anime · Attack on Titan",
    bio:"Mikasa is the Survey Corps' greatest soldier — calm, ferociously capable, and driven by a devotion to protect the people she loves. Her Ackerman bloodline gives her innate combat ability that goes beyond normal human limits. Despite her immense strength, her story is ultimately one of love, loss, and learning to exist for herself rather than for the person she has always followed.",
  },
  "Goku (Dragon Ball)": {
    icon:"⚔️", meta:"Anime · Dragon Ball Z",
    bio:"Originally sent to Earth as an infant to destroy it, a head injury erased Goku's mission and left him the cheerful, food-obsessed fighter who became Earth's greatest defender. His design — spiky hair, orange gi, boundless optimism — has influenced virtually every shonen protagonist since. He is arguably the most recognised anime character globally, ranking above Pikachu in multiple international surveys.",
  },
  "Vegeta (Dragon Ball)": {
    icon:"⚔️", meta:"Anime · Dragon Ball Z",
    bio:"Vegeta arrives as the most dangerous villain in Dragon Ball — a prince consumed by pride who has destroyed entire civilizations. His slow, painful transformation into a reluctant hero, devoted father, and Goku's rival is considered one of the greatest character redemption arcs in any medium. In Japanese polls he consistently beats Goku as the more beloved character.",
  },
  "Saitama (One Punch Man)": {
    icon:"⚔️", meta:"Anime · One Punch Man",
    bio:"Saitama is the world's strongest hero — who can defeat any enemy with a single punch — and he's bored out of his mind. The series uses his invincibility as a lens to examine depression, purpose, and what happens when you achieve your goals and find nothing there. One Punch Man began as a crude free webcomic before being redrawn by Yusuke Murata into one of the most gorgeous manga ever published.",
  },
  "Edward Elric (Fullmetal Alchemist)": {
    icon:"⚔️", meta:"Anime · Fullmetal Alchemist: Brotherhood",
    bio:"Ed is just 15 when FMA begins — one of the youngest protagonists to carry a series dealing with war, genocide, and political corruption. His rule that equivalent exchange governs everything mirrors the real physics law of conservation of energy. FMA: Brotherhood is still the highest-rated anime of all time on MyAnimeList, rated above 9.1 from over 2 million users.",
  },
  "Alphonse Elric (Fullmetal Alchemist)": {
    icon:"⚔️", meta:"Anime · Fullmetal Alchemist: Brotherhood",
    bio:"Al lost his entire body in a failed alchemical ritual at age 10, existing only as a soul bound to a suit of armour. Despite this, he remains the most gentle and compassionate character in FMA — a quiet counterpoint to his brother's brash rage. His patience and kindness in circumstances that would break anyone else is one of the series' most quietly profound elements.",
  },
  "Roy Mustang (Fullmetal Alchemist)": {
    icon:"⚔️", meta:"Anime · Fullmetal Alchemist: Brotherhood",
    bio:"The Flame Alchemist hides genuine grief and moral complexity behind a mask of lazy ambition. His true goal — to become Führer and fix a broken military system from within — is one of FMA's most nuanced political storylines. The weight of what he did in the Ishvalan war haunts him throughout the series. His relationship with Hawkeye is considered anime's most understated and cherished pairing.",
  },
  "Nagato (Naruto)": {
    icon:"⚔️", meta:"Anime · Naruto Shippuden",
    bio:"Nagato was a war orphan who lost everything and arrived at a simple, terrible conclusion: the only way to make the world understand pain is to inflict it universally. His transformation from idealistic student to the god-like Pain is one of Naruto's most tragic arcs. His philosophy that peace requires understanding suffering is philosophically dense in a way unusual for shonen manga.",
  },
  "Kakashi Hatake (Naruto)": {
    icon:"⚔️", meta:"Anime · Naruto",
    bio:"Kakashi is perhaps the most skilled ninja of his generation — a man who copied over a thousand jutsu with his Sharingan eye and became known as the Copy Ninja. Beneath his lazily amused exterior is someone who has lost everyone he loved and carries tremendous guilt. He consistently tops Naruto character polls. His masked face became one of anime's greatest mysteries, finally revealed years after fans demanded it.",
  },
  "Pain (Naruto)": {
    icon:"⚔️", meta:"Anime · Naruto Shippuden",
    bio:"Pain is Nagato's instrument of divine punishment — six bodies controlled by a single man who has decided he is God. His attack on Konoha and the philosophical debate with Naruto that follows it is considered one of shonen anime's greatest confrontations. Pain argues his case with such conviction that readers genuinely question who is right. The Pain Arc regularly tops fan rankings of best Naruto storylines.",
  },
  "Obito Uchiha (Naruto)": {
    icon:"⚔️", meta:"Anime · Naruto Shippuden",
    bio:"Obito was once an optimistic boy who declared he would become Hokage — until a single devastating loss turned him into the most destructive force in the ninja world. His identity as the masked villain Tobi was one of Naruto's most shocking reveals. His final redemption, returning to the boy he once was in his last moments, is one of the series' most emotionally powerful sequences.",
  },
  "Jiraiya (Naruto)": {
    icon:"⚔️", meta:"Anime · Naruto",
    bio:"Jiraiya is the Toad Sage — legendary ninja, bestselling author, and the closest thing Naruto ever had to a grandfather. He spent his life believing in a prophecy of a child who would bring peace, and dedicated himself to that hope even after it had broken him repeatedly. His death is considered one of anime's most devastating moments. The phrase 'Never give up' was his life's work and Naruto's inheritance.",
  },
  "Madara Uchiha (Naruto)": {
    icon:"⚔️", meta:"Anime · Naruto Shippuden",
    bio:"Madara Uchiha lived through war after war until he concluded that the only way to bring peace was to trap all of humanity in an eternal dream. The most powerful shinobi who ever lived, he had already planned everything centuries before the main story begins. His entrance in the Fourth Ninja War — taking on entire armies alone — is one of shonen anime's most visually overwhelming sequences.",
  },
  "Ichigo Kurosaki (Bleach)": {
    icon:"⚔️", meta:"Anime · Bleach",
    bio:"Ichigo became a Soul Reaper by accident and spent the entire series fighting to protect the people around him — not out of duty or ideology, but raw personal loyalty. Creator Tite Kubo nearly ended Bleach after the Soul Society arc, considering it the natural conclusion. Fans' overwhelming response kept it running for another 15 years. The recent Thousand-Year Blood War anime adaptation was widely praised.",
  },
  "Hitsugaya Toshiro (Bleach)": {
    icon:"⚔️", meta:"Anime · Bleach",
    bio:"Hitsugaya is the youngest captain in Soul Society's history, commanding ice and snow with his zanpakuto Hyorinmaru. Despite being a relatively minor character in the plot, he won Bleach popularity polls so consistently that it baffled creator Kubo, who had planned far less screen time for him. He became a symbol of quiet, youthful competence in a series full of flamboyant personalities.",
  },
  "Matsumoto Rangiku (Bleach)": {
    icon:"⚔️", meta:"Anime · Bleach",
    bio:"Rangiku is Hitsugaya's lieutenant — cheerful, sake-loving, and easy to underestimate. Beneath her easy warmth is someone who has experienced profound loss and carries grief she rarely shows. Her relationship with Gin Ichimaru is one of Bleach's saddest storylines, and her quiet scenes of reflection contain some of the series' most emotionally honest moments.",
  },
  "Kenpachi Zaraki (Bleach)": {
    icon:"⚔️", meta:"Anime · Bleach",
    bio:"Kenpachi is the only Soul Reaper captain who achieved his rank through pure battle, with no knowledge of his zanpakuto's name or abilities. He lives entirely for fighting. Yet beneath his terrifying exterior is someone who adopted a small child out of loneliness and named himself after the most dangerous district in Soul Society. His growth across the series from mindless berserker to something more is quietly compelling.",
  },
  "Koro-sensei (Assassination Classroom)": {
    icon:"⚔️", meta:"Anime · Assassination Classroom",
    bio:"Koro-sensei is a tentacled, mach-20 creature who threatens to destroy Earth — and also teaches Class 3-E with complete devotion, knowing his students must eventually kill him. His central lesson: every student has worth, and a teacher's greatest achievement is to be surpassed by those they teach. Creator Yusei Matsui designed him as a metaphor for every mentor's need to be overcome by their students.",
  },
  "Dr. Hiriluk (One Piece)": {
    icon:"⚔️", meta:"Anime · One Piece",
    bio:"Dr. Hiriluk was a quack doctor on Drum Island who spent his life trying to cure people with no medical training — and failing most of the time. Yet his belief that people can be saved, and his sacrifice to prove it, inspired Chopper to become the Straw Hats' doctor. His death scene contains one of One Piece's most quoted lines about what it truly means for a person to die.",
  },
  "Kentaro Miura (Berserk)": {
    icon:"📖", meta:"Manga Artist · 1966–2021",
    bio:"Miura spent 32 years creating Berserk virtually alone, drawing every panel himself with extraordinary detail. A single chapter could take weeks. He passed away in May 2021 with the story unfinished — his close friend Kouji Mori is completing it from their conversations. Berserk directly inspired Dark Souls, Final Fantasy VII's Sephiroth, and generations of dark fantasy. Its art remains among the most detailed ever put to paper.",
  },
  "Takehiko Inoue (Vagabond)": {
    icon:"📖", meta:"Manga Artist · Vagabond / Slam Dunk",
    bio:"Inoue is the creator of both Vagabond and Slam Dunk — two of the greatest manga ever drawn. Vagabond is based on the real swordsman Miyamoto Musashi and is painted in watercolour rather than drawn in ink — an almost unheard-of technique. He won the Eisner Award. Since 2015, Vagabond has been on an indefinite hiatus as Inoue battles perfectionism that prevents him from continuing.",
  },
  "Makoto Yukimura (Vinland Saga)": {
    icon:"📖", meta:"Manga Artist · Vinland Saga",
    bio:"Yukimura began Vinland Saga as a direct response to the Iraq War — he wanted to examine whether violence ever truly resolves human problems. Set during the real Viking Age, his protagonist Thorfinn is based on actual Norse explorer Thorfinn Karlsefni who reached North America around 1010 AD. The manga's core message — that a true warrior needs no sword — takes hundreds of chapters of brutal combat to earn.",
  },
  "African Proverb": {
    icon:"🌿", meta:"Oral Tradition · Pan-African",
    bio:"African proverbs are living philosophy — not texts but living sayings passed orally through generations. Elders use them to settle disputes, counsel the young, and guide communities. They carry the collective wisdom of thousands of years in compact, memorable form. Many have no single author or origin — they belong to everyone. Their continued use across modern Africa proves that wisdom outlasts civilizations.",
  },
  "Japanese Proverb": {
    icon:"🌿", meta:"Oral Tradition · Japan",
    bio:"Japanese proverbs (kotowaza) blend Confucian wisdom, Buddhist philosophy, and indigenous Japanese thought into concise, memorable sayings. Many use nature imagery — seasons, water, mountains — reflecting Japan's deeply nature-connected worldview. The concept of wabi-sabi, finding beauty in imperfection, emerges from this tradition and has influenced art, design, and philosophy worldwide.",
  },
  "Swedish Proverb": {
    icon:"🌿", meta:"Oral Tradition · Sweden",
    bio:"Swedish proverbs reflect the Scandinavian values of community, modesty, and shared experience that have made Nordic countries among the world's most consistently happy. The concept of 'lagom' — just the right amount, not too much or too little — underlies much Swedish wisdom. Sweden consistently ranks in the top five of the UN World Happiness Report.",
  },
  "Yiddish Proverb": {
    icon:"🌿", meta:"Oral Tradition · Ashkenazi Jewish",
    bio:"Yiddish proverbs carry centuries of wisdom from a people who have survived persecution, displacement, and tragedy while maintaining wit, warmth, and community. Yiddish was spoken by up to 13 million people before World War II; around 600,000 speakers remain today. The proverbs are distinctive for combining sharp humor with profound insight — often both in the same sentence.",
  },
  "Arab Proverb": {
    icon:"🌿", meta:"Oral Tradition · Arab World",
    bio:"Arab proverbs draw from centuries of Bedouin wisdom, Islamic philosophy, and the accumulated experience of desert life. They place enormous value on hospitality, generosity, and community. The Arabic oral tradition is one of the world's richest — thousands of proverbs exist across dialects and regions, many predating Islam by centuries. Poetry and proverbs are considered the highest art form in classical Arabic culture.",
  },
  "Ogoni Proverb (Nigeria)": {
    icon:"🌿", meta:"Oral Tradition · Ogoni People, Nigeria",
    bio:"The Ogoni are a people of the Niger Delta in Nigeria with a rich oral tradition connecting them deeply to the land. They became internationally known in the 1990s when Ken Saro-Wiwa led environmental protests against oil company destruction of their homeland. Their proverbs, like all African oral traditions, carry the weight of community memory and ecological understanding built over many generations.",
  },
  "Makoto Naegi (Danganronpa)": {
    icon:"⚔️", meta:"Anime · Danganronpa: Trigger Happy Havoc",
    bio:"Makoto is the 'Ultimate Lucky Student' — his only distinguishing trait is luck — yet he becomes the emotional anchor of a group trapped in a death game designed to destroy hope. His stubborn belief in people, even after evidence suggests he shouldn't, is what separates survival from despair. Danganronpa was originally a visual novel before becoming an anime.",
  },
  "Kaede Akamatsu (Danganronpa)": {
    icon:"⚔️", meta:"Anime · Danganronpa V3",
    bio:"Kaede is the protagonist of Danganronpa V3 — an optimistic pianist who takes it upon herself to lead her classmates out of a killing game. Her early exit from the story is one of the series' most shocking moments. Her belief that feelings persist even when memories fade reflects Danganronpa V3's central theme about the nature of fiction, memory, and what makes experiences real.",
  },
  "Kino (Kino's Journey)": {
    icon:"⚔️", meta:"Anime · Kino's Journey",
    bio:"Kino is a young traveler who visits different countries on a motorrad (talking motorcycle) named Hermes, spending only three days in each place. Each country is a thought experiment — a utopia with a dark cost, a dystopia that functions perfectly, a society built on a single strange rule. Creator Keiichi Sigsawa wrote the original light novels as a university student, inspired by Voltaire's Candide.",
  },
  "Emma (The Promised Neverland)": {
    icon:"⚔️", meta:"Anime · The Promised Neverland",
    bio:"Emma is an 11-year-old who discovers the terrifying truth of her idyllic orphanage and decides not to leave a single child behind. Her combination of physical ability, emotional intelligence, and absolute refusal to accept the world as it is makes her one of shonen's most compelling protagonists. The Promised Neverland debuted in 2016 and became one of Shonen Jump's fastest-selling new series.",
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// SOUND
// ══════════════════════════════════════════════════════════════════════════════
const SFX = { enabled: true };
function tone(freq, dur, type='sine', vol=0.12) {
  if (!SFX.enabled) return;
  try {
    const ctx  = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(); osc.stop(ctx.currentTime + dur);
    setTimeout(() => ctx.close(), (dur + 0.1) * 1000);
  } catch(e) {}
}
const playCorrect   = () => { tone(523,.15,'sine',.12); setTimeout(()=>tone(659,.2,'sine',.1),100); setTimeout(()=>tone(784,.3,'sine',.08),200); };
const playWrong     = () => { tone(200,.3,'sawtooth',.08); setTimeout(()=>tone(160,.3,'sawtooth',.06),150); };
const playPageTurn  = () => { tone(800,.08,'sine',.04); setTimeout(()=>tone(1000,.06,'sine',.03),60); };
const playClick     = () => tone(440,.05,'sine',.06);
const playTick      = () => tone(1200,.05,'sine',.04);
const playUrgent    = () => tone(880,.08,'square',.06);
const playLegendary = () => { tone(523,.15,'sine',.1); setTimeout(()=>tone(659,.15,'sine',.1),150); setTimeout(()=>tone(784,.15,'sine',.1),300); setTimeout(()=>tone(1046,.4,'sine',.12),450); };

// ══════════════════════════════════════════════════════════════════════════════
// STORAGE KEYS
// ══════════════════════════════════════════════════════════════════════════════
const K = {
  name:           'wp_player_name',
  onboarded:      'wp_onboarded',
  best:           'wp_best_score',
  streak:         'wp_daily_streak',
  lastPlay:       'wp_last_play_date',
  leaderboard:    'wp_leaderboard',
  unlocked:       'wp_unlocked',
  achievements:   'wp_achievements',
  legendaryCount: 'wp_legendary_count',
  memberSince:    'wp_member_since',     // ISO date string of first launch
  stats:          'wp_stats',            // { gamesPlayed, totalCorrect, totalWrong, bestAnswerStreak, bestDayStreak, totalQuestions, catCounts:{} }
};

// ══════════════════════════════════════════════════════════════════════════════
// COLLECTION STORAGE
// ══════════════════════════════════════════════════════════════════════════════
function loadUnlocked() {
  try { return JSON.parse(localStorage.getItem(K.unlocked) || '{}'); }
  catch { return {}; }
}
function saveUnlocked(data) {
  localStorage.setItem(K.unlocked, JSON.stringify(data));
}
function unlockQuote(author, quoteText) {
  const data = loadUnlocked();
  if (!data[author]) data[author] = [];
  if (!data[author].includes(quoteText)) {
    data[author].push(quoteText);
    saveUnlocked(data);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// PLAYER PROFILE STORAGE
// ══════════════════════════════════════════════════════════════════════════════
function loadStats() {
  try {
    return JSON.parse(localStorage.getItem(K.stats) || '{}');
  } catch { return {}; }
}
function saveStats(s) {
  localStorage.setItem(K.stats, JSON.stringify(s));
}

// Called at end of every game — updates cumulative stats
function updateStats(correct, wrong, answerStreak, mode) {
  const s = loadStats();
  s.gamesPlayed    = (s.gamesPlayed    || 0) + 1;
  s.totalCorrect   = (s.totalCorrect   || 0) + correct;
  s.totalWrong     = (s.totalWrong     || 0) + wrong;
  s.totalQuestions = (s.totalQuestions || 0) + correct + wrong;
  s.bestAnswerStreak = Math.max(s.bestAnswerStreak || 0, answerStreak);
  s.bestDayStreak    = Math.max(s.bestDayStreak    || 0, getCurrentStreak());
  // Track category play counts for favourite category
  if (!s.catCounts) s.catCounts = {};
  const cat = mode === 'endless' ? 'all' : mode;
  s.catCounts[cat] = (s.catCounts[cat] || 0) + 1;
  saveStats(s);
}

// Record first-launch date
function ensureMemberSince() {
  if (!localStorage.getItem(K.memberSince)) {
    localStorage.setItem(K.memberSince, new Date().toISOString());
  }
}
function getMemberSince() {
  const iso = localStorage.getItem(K.memberSince);
  if (!iso) return 'Today';
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
}

// Derive favourite category from catCounts
function getFavouriteCategory(catCounts) {
  if (!catCounts) return null;
  const entries = Object.entries(catCounts).filter(([k]) => k !== 'all');
  if (entries.length === 0) return null;
  entries.sort((a, b) => b[1] - a[1]);
  const cat = entries[0][0];
  const icons = { philosophy:'⚖️', spirituality:'☯️', anime:'⚔️', manga:'📖', proverb:'🌿', 'martial arts':'🥋' };
  return (icons[cat] || '') + ' ' + cat.charAt(0).toUpperCase() + cat.slice(1);
}

// ── Render the profile screen ─────────────────────────────────────────────────
function renderProfile() {
  const name     = localStorage.getItem(K.name) || 'Seeker';
  const stats    = loadStats();
  const unlocked = loadUnlocked();
  const earned   = loadEarnedAchievements();
  const best     = getBest();
  const rank     = getRank(best);

  // Header
  $('profileName').textContent  = name;
  $('profileSince').textContent = 'Member since ' + getMemberSince();
  const fav = getFavouriteCategory(stats.catCounts);
  const favEl = $('profileFavCat');
  if (fav) { favEl.textContent = 'Favourite: ' + fav; favEl.style.display = ''; }
  else      { favEl.style.display = 'none'; }

  // Rank banner with progress to next rank
  $('profileRankEmoji').textContent = rank.emoji;
  $('profileRankName').textContent  = rank.label;
  const rankIdx  = RANKS.indexOf(rank);
  const nextRank = RANKS[rankIdx + 1];
  if (nextRank) {
    const needed = nextRank.min - rank.min;
    const have   = best - rank.min;
    const pct    = Math.min(100, Math.round((have / needed) * 100));
    $('profileRankFill').style.width = pct + '%';
    $('profileRankNext').textContent = (nextRank.min - best) + ' pts to ' + nextRank.label;
  } else {
    $('profileRankFill').style.width = '100%';
    $('profileRankNext').textContent = 'Maximum rank reached ✨';
  }

  // Core stats
  const totalCorrect = stats.totalCorrect   || 0;
  const totalWrong   = stats.totalWrong     || 0;
  const totalQ       = totalCorrect + totalWrong;
  const accuracy     = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
  $('pStatGames').textContent       = stats.gamesPlayed    || 0;
  $('pStatBest').textContent        = best;
  $('pStatCorrect').textContent     = totalCorrect;
  $('pStatAccuracy').textContent    = accuracy + '%';
  $('pStatStreak').textContent      = getCurrentStreak();
  $('pStatBestStreak').textContent  = stats.bestDayStreak    || 0;
  $('pStatAnswerStreak').textContent= stats.bestAnswerStreak || 0;
  $('pStatQuestions').textContent   = stats.totalQuestions   || 0;

  // Collection
  const allAuthors       = [...new Set(QUOTES_DATA.map(q => q.realAuthor))];
  const speakersUnlocked = allAuthors.filter(a => (unlocked[a] || []).length > 0).length;
  const quotesUnlocked   = Object.values(unlocked).reduce((n, arr) => n + arr.length, 0);
  const collPct          = Math.round((speakersUnlocked / allAuthors.length) * 100);
  $('pCollSpeakers').textContent = speakersUnlocked + ' / ' + allAuthors.length + ' speakers';
  $('pCollQuotes').textContent   = quotesUnlocked + ' / ' + QUOTES_DATA.length + ' quotes';
  $('pCollBar').style.width      = collPct + '%';
  $('pCollPct').textContent      = collPct + '%';

  // Best category (most quotes unlocked)
  const catTotals = {};
  QUOTES_DATA.forEach(q => { catTotals[q.category] = (catTotals[q.category] || 0) + 1; });
  const catProgress = Object.entries(catTotals).map(([cat, total]) => {
    const done = QUOTES_DATA.filter(q => q.category === cat && (unlocked[q.realAuthor] || []).includes(q.text)).length;
    return { cat, done, total, pct: Math.round((done / total) * 100) };
  }).sort((a, b) => b.pct - a.pct);
  const bestCat = catProgress[0];
  const catIcons = { philosophy:'⚖️', spirituality:'☯️', anime:'⚔️', manga:'📖', proverb:'🌿', 'martial arts':'🥋' };
  $('pBestCat').textContent = bestCat && bestCat.done > 0
    ? 'Best: ' + (catIcons[bestCat.cat] || '') + ' ' + bestCat.cat + ' (' + bestCat.pct + '% complete)'
    : '';

  // Recent achievements (last 3 earned, shown as chips)
  const ACHIEVEMENT_MAP = Object.fromEntries(ACHIEVEMENTS.map(a => [a.id, a]));
  const earnedArr = [...earned].map(id => ACHIEVEMENT_MAP[id]).filter(Boolean);
  const recent = earnedArr.slice(-3).reverse();
  const achRow   = $('profileAchRow');
  const achEmpty = $('profileAchEmpty');
  if (recent.length === 0) {
    achRow.innerHTML = '';
    achEmpty.classList.remove('hidden');
  } else {
    achEmpty.classList.add('hidden');
    achRow.innerHTML = recent.map(a =>
      `<div class="profile-ach-chip">
        <span class="profile-ach-chip-icon">${a.icon}</span>${a.title}
      </div>`
    ).join('');
  }

  // Pre-fill edit input
  $('profileNameInput').value = name;
}
const ACHIEVEMENTS = [
  // Score milestones — normal mode only
  { id:'score_50',     icon:'🌱', title:'First Steps',      desc:'Score 50 pts in one normal game',           mode:'normal', check:(s,ds,x) => s.score >= 50 },
  { id:'score_100',    icon:'📜', title:'Century',          desc:'Score 100 pts in one normal game',          mode:'normal', check:(s,ds,x) => s.score >= 100 },
  { id:'score_300',    icon:'🔮', title:'Scholar',          desc:'Score 300 pts in one normal game',          mode:'normal', check:(s,ds,x) => s.score >= 300 },
  { id:'score_500',    icon:'⚡', title:'Sage',             desc:'Score 500 pts in one normal game',          mode:'normal', check:(s,ds,x) => s.score >= 500 },
  { id:'score_1000',   icon:'🌟', title:'Enlightened',      desc:'Score 1000 pts in one normal game',         mode:'normal', check:(s,ds,x) => s.score >= 1000 },
  { id:'score_2000',   icon:'✨', title:'Transcendent',     desc:'Score 2000 pts in one normal game',         mode:'normal', check:(s,ds,x) => s.score >= 2000 },
  // Answer streak — normal mode only
  { id:'streak_3',     icon:'🔥', title:'On Fire',          desc:'Reach a 3× streak in normal mode',          mode:'normal', check:(s,ds,x) => s.streak >= 3 },
  { id:'streak_7',     icon:'💥', title:'Unstoppable',      desc:'Reach a 7× streak in normal mode',          mode:'normal', check:(s,ds,x) => s.streak >= 7 },
  { id:'streak_15',    icon:'🌠', title:'Legendary Streak', desc:'Reach a 15× streak in normal mode',         mode:'normal', check:(s,ds,x) => s.streak >= 15 },
  { id:'streak_25',    icon:'💫', title:'Omniscient',       desc:'Reach a 25× streak in normal mode',         mode:'normal', check:(s,ds,x) => s.streak >= 25 },
  // Daily comeback — both modes
  { id:'daily_3',      icon:'📅', title:'Devoted',          desc:'Play 3 days in a row',                      mode:'any',    check:(s,ds,x) => ds >= 3 },
  { id:'daily_7',      icon:'🗓️', title:'Faithful',         desc:'Play 7 days in a row',                      mode:'any',    check:(s,ds,x) => ds >= 7 },
  { id:'daily_30',     icon:'🏆', title:'Obsessed',         desc:'Play 30 days in a row',                     mode:'any',    check:(s,ds,x) => ds >= 30 },
  // Legendary quotes — normal mode only
  { id:'legendary_1',  icon:'⭐', title:'First Legend',     desc:'Answer a Legendary quote correctly',         mode:'normal', check:(s,ds,x) => x.legendaryCorrect >= 1 },
  { id:'legendary_10', icon:'🌠', title:'Golden',           desc:'Answer 10 Legendary quotes correctly',       mode:'normal', check:(s,ds,x) => x.legendaryCorrect >= 10 },
  // Collection — both modes (speaker unlocking is fair in either)
  { id:'unlock_1',     icon:'🔓', title:'First Unlock',     desc:'Unlock your first speaker quote',            mode:'any',    check:(s,ds,x) => x.totalUnlocked >= 1 },
  { id:'unlock_25',    icon:'📚', title:'Halfway There',    desc:'Unlock quotes from 25 speakers',             mode:'any',    check:(s,ds,x) => x.speakersUnlocked >= 25 },
  { id:'unlock_all',   icon:'🏛️', title:'Master Collector', desc:'Unlock all 53 speakers',                     mode:'any',    check:(s,ds,x) => x.speakersUnlocked >= 53 },
  // Endless only
  { id:'endless_50',   icon:'♾️', title:'Marathoner',       desc:'Answer 50 questions in one Endless run',     mode:'endless',check:(s,ds,x) => x.isEndless && s.questionNum >= 50 },
  { id:'endless_100',  icon:'🎯', title:'Centurion',        desc:'Answer 100 questions in one Endless run',    mode:'endless',check:(s,ds,x) => x.isEndless && s.questionNum >= 100 },
];

// ── Achievement storage ───────────────────────────────────────────────────────
function loadEarnedAchievements() {
  try { return new Set(JSON.parse(localStorage.getItem(K.achievements) || '[]')); }
  catch { return new Set(); }
}
function saveEarnedAchievements(set) {
  localStorage.setItem(K.achievements, JSON.stringify([...set]));
}
function getLegendaryCount() {
  return parseInt(localStorage.getItem(K.legendaryCount) || '0', 10);
}
function incrementLegendaryCount() {
  localStorage.setItem(K.legendaryCount, String(getLegendaryCount() + 1));
}

// ── Build extra context for achievement checks ────────────────────────────────
function buildAchievementContext(isEndless) {
  const unlocked     = loadUnlocked();
  const allAuthors   = [...new Set(QUOTES_DATA.map(q => q.realAuthor))];
  const totalUnlocked  = Object.values(unlocked).reduce((n, arr) => n + arr.length, 0);
  const speakersUnlocked = allAuthors.filter(a => (unlocked[a] || []).length > 0).length;
  return {
    legendaryCorrect: getLegendaryCount(),
    totalUnlocked,
    speakersUnlocked,
    isEndless: !!isEndless,
  };
}

// ── Check and award new achievements — returns array of newly earned ──────────
function checkAchievements(state, dailyStreak, isEndless) {
  const earned    = loadEarnedAchievements();
  const ctx       = buildAchievementContext(isEndless);
  const newlyEarned = [];
  ACHIEVEMENTS.forEach(ach => {
    if (earned.has(ach.id)) return;
    // Enforce mode restriction
    if (ach.mode === 'normal'  &&  isEndless) return;
    if (ach.mode === 'endless' && !isEndless) return;
    // 'any' passes through always
    try {
      if (ach.check(state, dailyStreak, ctx)) {
        earned.add(ach.id);
        newlyEarned.push(ach);
      }
    } catch(e) {}
  });
  if (newlyEarned.length > 0) saveEarnedAchievements(earned);
  return newlyEarned;
}

// ── Show achievement banner (queued so multiple don't overlap) ────────────────
let _achQueue = [], _achShowing = false;
function queueAchievementBanner(ach) {
  _achQueue.push(ach);
  if (!_achShowing) showNextAchievement();
}
function showNextAchievement() {
  if (_achQueue.length === 0) { _achShowing = false; return; }
  _achShowing = true;
  const ach = _achQueue.shift();
  const banner = $('achievementBanner');
  if (!banner) { showNextAchievement(); return; }
  $('achBannerIcon').textContent  = ach.icon;
  $('achBannerTitle').textContent = ach.title;
  banner.classList.remove('hidden');
  void banner.offsetWidth;
  banner.classList.add('show');
  setTimeout(() => {
    banner.classList.remove('show');
    setTimeout(() => {
      banner.classList.add('hidden');
      setTimeout(showNextAchievement, 200);
    }, 400);
  }, 2800);
}

// ── Render achievements screen ────────────────────────────────────────────────
function renderAchievements() {
  const earned = loadEarnedAchievements();
  const total  = ACHIEVEMENTS.length;
  const count  = earned.size;
  $('achSubtitle').textContent = `${count} / ${total} unlocked`;
  const list = $('achList');
  list.innerHTML = ACHIEVEMENTS.map(ach => {
    const isEarned  = earned.has(ach.id);
    const rowClass  = isEarned ? 'ach-row earned' : 'ach-row locked';
    const icon      = isEarned ? ach.icon : '🔒';
    return `<div class="${rowClass}">
      <div class="ach-row-icon">${icon}</div>
      <div class="ach-row-info">
        <div class="ach-row-title">${ach.title}</div>
        <div class="ach-row-desc">${ach.desc}</div>
      </div>
      <div class="ach-row-check">✓</div>
    </div>`;
  }).join('');
}
function getQuoteOfTheDay() {
  const d = new Date();
  const dateKey = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = ((hash << 5) - hash) + dateKey.charCodeAt(i);
    hash |= 0;
  }
  return QUOTES_DATA[Math.abs(hash) % QUOTES_DATA.length];
}
function renderQOTD() {
  const q = getQuoteOfTheDay();
  const textEl   = document.getElementById('qotdText');
  const authorEl = document.getElementById('qotdAuthor');
  if (textEl)   textEl.textContent   = '\u201C' + q.text + '\u201D';
  if (authorEl) authorEl.textContent = '\u2014 ' + q.realAuthor;
}

// ══════════════════════════════════════════════════════════════════════════════
// DAILY STREAK
// ══════════════════════════════════════════════════════════════════════════════
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function loadStreak() {
  return {
    streak:   parseInt(localStorage.getItem(K.streak)   || '0', 10),
    lastPlay: localStorage.getItem(K.lastPlay) || '',
  };
}
function updateDailyStreak() {
  const today = todayStr();
  const { streak, lastPlay } = loadStreak();
  const prev = new Date(); prev.setDate(prev.getDate() - 1);
  const yesterdayStr = `${prev.getFullYear()}-${String(prev.getMonth()+1).padStart(2,'0')}-${String(prev.getDate()).padStart(2,'0')}`;
  let next;
  if (lastPlay === today)                        next = streak;
  else if (!lastPlay || lastPlay === yesterdayStr) next = streak + 1;
  else                                           next = 1;
  localStorage.setItem(K.streak,   String(next));
  localStorage.setItem(K.lastPlay, today);
  return next;
}
const getCurrentStreak = () => loadStreak().streak;

// ══════════════════════════════════════════════════════════════════════════════
// LEADERBOARD
// ══════════════════════════════════════════════════════════════════════════════
function loadLeaderboard() {
  try { return JSON.parse(localStorage.getItem(K.leaderboard) || '[]'); }
  catch { return []; }
}
function saveRun(entry) {
  const lb = loadLeaderboard();
  lb.push(entry);
  lb.sort((a, b) => b.score - a.score);
  const top = lb.slice(0, 10);
  localStorage.setItem(K.leaderboard, JSON.stringify(top));
  return top;
}
function getBest() { return parseInt(localStorage.getItem(K.best) || '0', 10); }
function saveBest(score) {
  const prev = getBest();
  if (score > prev) { localStorage.setItem(K.best, String(score)); return true; }
  return false;
}

// ══════════════════════════════════════════════════════════════════════════════
// TIMER
// ══════════════════════════════════════════════════════════════════════════════
const Timer = {
  _iv: null, _onExpire: null, _start: null, _dur: 10,
  start(seconds, onExpire) {
    this.stop();
    this._dur = seconds; this._onExpire = onExpire; this._start = performance.now();
    this._render(seconds);
    this._iv = setInterval(() => {
      const remaining = Math.max(0, seconds - (performance.now() - this._start) / 1000);
      this._render(remaining);
      if (remaining <= 0) { this.stop(); if (this._onExpire) this._onExpire(); }
    }, 100);
  },
  stop() { if (this._iv) { clearInterval(this._iv); this._iv = null; } },
  _render(rem) {
    const fill  = $('timerFill');
    const label = $('timerLabel');
    if (!fill || !label) return;
    fill.style.width = `${(rem / this._dur) * 100}%`;
    label.textContent = Math.ceil(rem);
    fill.classList.remove('warn','danger'); label.classList.remove('warn','danger');
    if (rem <= 3) {
      fill.classList.add('danger'); label.classList.add('danger');
      if (Math.abs(rem - Math.round(rem)) < 0.15) playUrgent();
    } else if (rem <= 5) {
      fill.classList.add('warn'); label.classList.add('warn');
    } else if (Math.abs(rem - Math.round(rem)) < 0.12 && rem < this._dur - 0.5) {
      playTick();
    }
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// SHARE CARD
// ══════════════════════════════════════════════════════════════════════════════
function buildShareCard(score, correct, wrong, rankEmoji, rankLabel, dailyStreak, mode, diff) {
  const canvas = $('shareCanvas');
  const W = 800, H = 420;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const bg = ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,'#0d0d1a'); bg.addColorStop(.5,'#13101f'); bg.addColorStop(1,'#0a0a12');
  ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);
  ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1;
  for(let x=0;x<W;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  const barG = ctx.createLinearGradient(0,0,W,0);
  barG.addColorStop(0,'transparent'); barG.addColorStop(.3,'#c9a84c');
  barG.addColorStop(.7,'#f0d080');    barG.addColorStop(1,'transparent');
  ctx.fillStyle = barG; ctx.fillRect(0,0,W,4); ctx.fillRect(0,H-4,W,4);
  const glow = ctx.createRadialGradient(0,H/2,0,0,H/2,200);
  glow.addColorStop(0,'rgba(201,168,76,0.08)'); glow.addColorStop(1,'transparent');
  ctx.fillStyle = glow; ctx.fillRect(0,0,W,H);
  ctx.font = '48px serif'; ctx.fillText('☽', 52, 80);
  ctx.font = 'bold 26px "Cinzel","Georgia",serif';
  ctx.fillStyle = '#c9a84c'; ctx.fillText('WISDOM PATHS', 52, 128);
  const pName = localStorage.getItem(K.name) || 'Seeker';
  ctx.font = '700 14px "Rajdhani","Arial",sans-serif';
  ctx.fillStyle = 'rgba(232,224,208,0.55)';
  ctx.fillText(pName.toUpperCase(), 54, 155);
  ctx.font = '700 11px "Rajdhani","Arial",sans-serif';
  ctx.fillStyle = 'rgba(201,168,76,0.5)';
  ctx.fillText(`${(mode||'ALL').toUpperCase()} · ${(diff||'NORMAL').toUpperCase()}`, 54, 176);
  ctx.strokeStyle = 'rgba(201,168,76,0.3)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(52,192); ctx.lineTo(320,192); ctx.stroke();
  ctx.font = 'bold 90px "Cinzel","Georgia",serif';
  const sg = ctx.createLinearGradient(52,200,52,310);
  sg.addColorStop(0,'#f0d080'); sg.addColorStop(1,'#8a6520');
  ctx.fillStyle = sg; ctx.fillText(String(score), 52, 298);
  ctx.font = '700 11px "Rajdhani","Arial",sans-serif';
  ctx.fillStyle = 'rgba(201,168,76,0.6)';
  ctx.fillText('INSIGHT POINTS', 56, 326);
  if (dailyStreak > 1) {
    ctx.font = '700 14px "Rajdhani","Arial",sans-serif';
    ctx.fillStyle = 'rgba(232,224,208,0.7)';
    ctx.fillText(`🔥  DAY ${dailyStreak} STREAK`, 54, 362);
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(370,30); ctx.lineTo(370,H-30); ctx.stroke();
  ctx.font = '52px serif'; ctx.fillText(rankEmoji, 420, 88);
  ctx.font = 'bold 17px "Cinzel","Georgia",serif';
  ctx.fillStyle = '#f0d080';
  ctx.fillText(rankLabel.toUpperCase(), 480, 76);
  ctx.font = 'italic 13px "Crimson Pro","Georgia",serif';
  ctx.fillStyle = 'rgba(232,224,208,0.4)';
  ctx.fillText('Rank achieved', 482, 96);
  const accuracy = correct+wrong>0 ? Math.round((correct/(correct+wrong))*100) : 0;
  const stats = [
    {label:'CORRECT',  value:correct,       color:'#4caf7d'},
    {label:'WRONG',    value:wrong,          color:'#e05555'},
    {label:'ACCURACY', value:accuracy+'%',   color:'#c9a84c'},
    {label:'BEST',     value:getBest(),      color:'#9b7fd4'},
  ];
  stats.forEach((s,i) => {
    const col = i%2, row = Math.floor(i/2);
    const x = 420+col*190, y = 152+row*100;
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    roundRect(ctx,x,y,170,75,8); ctx.fill();
    ctx.fillStyle = s.color; roundRect(ctx,x,y,4,75,[8,0,0,8]); ctx.fill();
    ctx.font = 'bold 32px "Cinzel","Georgia",serif';
    ctx.fillStyle = s.color; ctx.fillText(String(s.value), x+18, y+46);
    ctx.font = '700 10px "Rajdhani","Arial",sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillText(s.label, x+18, y+64);
  });
  ctx.font = '700 11px "Rajdhani","Arial",sans-serif';
  ctx.fillStyle = 'rgba(201,168,76,0.4)';
  ctx.fillText('wisdomPaths.app  ·  Can you beat me?', 420, H-25);
}
function roundRect(ctx, x, y, w, h, r) {
  if (typeof r === 'number') r = [r,r,r,r];
  ctx.beginPath();
  ctx.moveTo(x+r[0],y);
  ctx.lineTo(x+w-r[1],y); ctx.quadraticCurveTo(x+w,y,x+w,y+r[1]);
  ctx.lineTo(x+w,y+h-r[2]); ctx.quadraticCurveTo(x+w,y+h,x+w-r[2],y+h);
  ctx.lineTo(x+r[3],y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r[3]);
  ctx.lineTo(x,y+r[0]); ctx.quadraticCurveTo(x,y,x+r[0],y);
  ctx.closePath();
}

// ══════════════════════════════════════════════════════════════════════════════
// GAME STATE
// ══════════════════════════════════════════════════════════════════════════════
const State = {
  score:0, lives:3, streak:0, correctCount:0, wrongCount:0,
  pool:[], currentQuote:null, answered:false,
  dailyStreak:0, questionNum:0,
  isLegendary:false,
  selectedMode:'all', selectedDiff:'normal',
  isEndless:false,
};

function resetState() {
  State.score=0; State.lives=3; State.streak=0;
  State.correctCount=0; State.wrongCount=0;
  State.currentQuote=null; State.answered=false;
  State.questionNum=0; State.isLegendary=false;
  const mode = State.selectedMode;
  const source = mode === 'all'
    ? [...QUOTES_DATA]
    : QUOTES_DATA.filter(q => q.category === mode || q.category === mode.replace('-',' '));
  State.pool = shuffle(source.length >= 4 ? source : [...QUOTES_DATA]);
}

// Tracks all pending round timeouts so they can be cancelled
const _pendingTimeouts = new Set();
function safeTimeout(fn, ms) {
  const id = setTimeout(() => { _pendingTimeouts.delete(id); fn(); }, ms);
  _pendingTimeouts.add(id);
  return id;
}
function cancelAllTimeouts() {
  _pendingTimeouts.forEach(id => clearTimeout(id));
  _pendingTimeouts.clear();
}

// ══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════════════
function shuffle(arr) {
  for (let i=arr.length-1;i>0;i--) {
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}
function pickQuote() {
  if (State.pool.length===0) {
    const mode = State.selectedMode;
    const src  = mode==='all' ? [...QUOTES_DATA] : QUOTES_DATA.filter(q=>q.category===mode||q.category===mode.replace('-',' '));
    State.pool = shuffle(src.length>=4?src:[...QUOTES_DATA]);
  }
  return State.pool.pop();
}
function getFakeOptions(realAuthor, category) {
  const used=new Set([realAuthor]); const fakes=[];
  const myGroups=Object.entries(AUTHOR_GROUPS).filter(([,a])=>a.includes(realAuthor)).map(([g])=>g);
  for (const g of myGroups) {
    const pool=shuffle(AUTHOR_GROUPS[g].filter(a=>!used.has(a)));
    for (const a of pool){if(fakes.length>=2)break;fakes.push(a);used.add(a);}
    if(fakes.length>=2)break;
  }
  if(fakes.length<3){
    const sameCat=shuffle([...new Set(QUOTES_DATA.filter(q=>q.category===category&&!used.has(q.realAuthor)).map(q=>q.realAuthor))]);
    for(const a of sameCat){if(fakes.length>=3)break;fakes.push(a);used.add(a);}
  }
  if(fakes.length<3){
    const rem=shuffle(ALL_SPEAKERS.filter(a=>!used.has(a)));
    for(const a of rem){if(fakes.length>=3)break;fakes.push(a);}
  }
  return fakes.slice(0,3);
}
function getRank(score) {
  let rank=RANKS[0];
  for(const r of RANKS){if(score>=r.min)rank=r;}
  return rank;
}
const $ = id => document.getElementById(id);

function showScreen(id) {
  const all = ['screenOnboard','screenIntro','screenHowTo','screenMode',
               'screenLeaderboard','screenCollection','screenAchievements',
               'screenProfile','screenGame','screenGameOver'];
  all.forEach(s => {
    const el = $(s);
    if (el) { s===id ? el.classList.remove('hidden') : el.classList.add('hidden'); }
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// HUD
// ══════════════════════════════════════════════════════════════════════════════
function popEl(id) {
  const el=$(id); el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
}
function updateHUDHearts() {
  $('hearts').querySelectorAll('.heart').forEach((h,i)=>{
    if(i>=State.lives){h.classList.add('lost');if(i===State.lives)h.classList.add('shake');}
    else h.classList.remove('lost','shake');
  });
}
function applyCategoryStyle(category) {
  const accent=CATEGORY_ACCENT[category]||CATEGORY_ACCENT.philosophy;
  $('quoteCard').style.setProperty('--card-accent',accent);
  const badge=$('categoryBadge');
  badge.textContent=category.toUpperCase().replace(' ','');
  badge.className='category-badge badge-'+category.replace(' ','');

  // Atmospheric fog tint per category
  const fogMap = {
    'philosophy':   { bottom:'rgba(60,90,180,.14)',  top:'rgba(40,70,160,.09)'  },
    'spirituality': { bottom:'rgba(110,60,180,.14)', top:'rgba(80,40,150,.09)'  },
    'anime':        { bottom:'rgba(180,50,60,.12)',  top:'rgba(140,30,50,.08)'  },
    'manga':        { bottom:'rgba(160,100,30,.12)', top:'rgba(130,70,20,.08)'  },
    'proverb':      { bottom:'rgba(40,130,80,.12)',  top:'rgba(30,100,60,.08)'  },
    'martial arts': { bottom:'rgba(140,140,30,.12)', top:'rgba(110,110,20,.08)' },
  };
  const fog = fogMap[category] || fogMap['philosophy'];
  document.body.style.setProperty('--fog-bottom', fog.bottom);
  document.body.style.setProperty('--fog-top',    fog.top);
}

let comboTimer=null;
function showCombo(streak) {
  const msg=COMBO_MSGS[streak]||(streak>=10?COMBO_MSGS[10]:null);
  if(!msg)return;
  const b=$('comboBanner');
  b.textContent=msg+' ×'+streak;
  b.classList.remove('hidden'); void b.offsetWidth; b.classList.add('show');
  clearTimeout(comboTimer);
  comboTimer=setTimeout(()=>{b.classList.remove('show');setTimeout(()=>b.classList.add('hidden'),400);},1800);
}

let resultTimer=null;
function showResult(isCorrect,pts) {
  const o=$('overlayResult');
  const ring=$('resultRing');
  o.classList.remove('hidden');
  if(isCorrect){
    ring.classList.remove('wrong-ring');$('resultIcon').textContent='✓';
    $('resultLabel').textContent=State.isLegendary?'LEGENDARY WISDOM!':'WISDOM GAINED';
    $('resultPoints').textContent='+'+pts;$('resultPoints').style.color='var(--correct)';
  } else {
    ring.classList.add('wrong-ring');$('resultIcon').textContent='✕';
    $('resultLabel').textContent='MISUNDERSTOOD';
    $('resultPoints').textContent='−1 ❤️';$('resultPoints').style.color='var(--wrong)';
  }
  clearTimeout(resultTimer);
  resultTimer=setTimeout(()=>o.classList.add('hidden'),1100);
}

// ══════════════════════════════════════════════════════════════════════════════
// LEGENDARY
// ══════════════════════════════════════════════════════════════════════════════
function triggerLegendaryReveal(cb) {
  const o=$('overlayLegendary');
  o.classList.remove('hidden');
  playLegendary();
  setTimeout(()=>{o.classList.add('hidden');cb();},2200);
}

// ══════════════════════════════════════════════════════════════════════════════
// CORE ROUND
// ══════════════════════════════════════════════════════════════════════════════
function startRound() {
  State.answered=false;
  State.questionNum++;
  State.currentQuote=pickQuote();
  const {text,realAuthor,meaning,category,dyk}=State.currentQuote;
  State.isLegendary=Math.random()<LEGENDARY_CHANCE;

  const doRender = () => {
    applyCategoryStyle(category);
    $('qCounter').textContent=`Q ${State.questionNum}`;
    const card=$('quoteCard');
    const legBadge=$('legendaryBadge');
    const legGlow=$('legendaryGlow');
    if(State.isLegendary){
      card.classList.add('legendary-card');
      legBadge.classList.remove('hidden');
      legGlow.classList.remove('hidden');
    } else {
      card.classList.remove('legendary-card');
      legBadge.classList.add('hidden');
      legGlow.classList.add('hidden');
    }
    const qText=$('quoteText');
    $('answerReveal').classList.add('hidden');
    qText.classList.add('fade');
    setTimeout(()=>{
      qText.textContent=text;
      qText.classList.remove('fade');
      $('meaningText').textContent=meaning;
      if(dyk){$('dykText').textContent=dyk;$('dykStrip').classList.remove('hidden');}
      else $('dykStrip').classList.add('hidden');
    },200);
    const fakes=getFakeOptions(realAuthor,category);
    const options=shuffle([realAuthor,...fakes]);
    const grid=$('optionsGrid'); grid.innerHTML='';
    options.forEach((spk,i)=>{
      const btn=document.createElement('button');
      btn.className='opt-btn slide-in';
      btn.style.animationDelay=`${i*80}ms`;
      btn.textContent=spk;
      btn.addEventListener('click',()=>handleAnswer(btn,spk===realAuthor));
      grid.appendChild(btn);
    });
    const pct=((State.questionNum-1)/Math.max(QUOTES_DATA.length,1))*100;
    $('progressFill').style.width=`${Math.min(pct,100)}%`;
    $('progressGlow').style.right=`${Math.max(100-pct,0)}%`;
    playPageTurn();
    const timerSecs=DIFF_TIMES[State.selectedDiff]||10;
    Timer.start(timerSecs, ()=>{ if(!State.answered) timeOut(); });
  };

  if(State.isLegendary && State.questionNum>1) {
    triggerLegendaryReveal(doRender);
  } else {
    doRender();
  }
}

function timeOut() {
  State.answered=true;
  Timer.stop(); playWrong();
  $('optionsGrid').querySelectorAll('.opt-btn').forEach(b=>{
    b.disabled=true; b.style.pointerEvents='none';
    if(b.textContent===State.currentQuote.realAuthor) b.classList.add('correct');
    else b.classList.add('dimmed');
  });
  $('answerReveal').classList.remove('hidden');
  const o=$('overlayResult');
  $('resultRing').classList.add('wrong-ring');
  $('resultIcon').textContent='⏱';
  $('resultLabel').textContent="TIME'S UP!";
  State.streak=0; $('streak').textContent=0;
  if(State.isEndless){
    State.score=Math.max(0, State.score-10);
    $('score').textContent=State.score;
    $('resultPoints').textContent='−10 pts';
  } else {
    $('resultPoints').textContent='−1 ❤️';
    State.lives--; updateHUDHearts();
  }
  $('resultPoints').style.color='var(--wrong)';
  State.wrongCount++;
  o.classList.remove('hidden');
  clearTimeout(resultTimer); resultTimer=setTimeout(()=>o.classList.add('hidden'),1100);
  if(!State.isEndless && State.lives<=0){safeTimeout(endGame,1600);return;}
  safeTimeout(startRound,2200);
}

function handleAnswer(clickedBtn, isCorrect) {
  if(State.answered)return;
  State.answered=true;
  Timer.stop(); playClick();
  const allBtns=$('optionsGrid').querySelectorAll('.opt-btn');
  allBtns.forEach(b=>{b.disabled=true;b.style.pointerEvents='none';});
  allBtns.forEach(b=>{
    if(b.textContent===State.currentQuote.realAuthor) b.classList.add('correct');
    else if(b===clickedBtn&&!isCorrect) b.classList.add('wrong');
    else b.classList.add('dimmed');
  });
  $('answerReveal').classList.remove('hidden');

  if(isCorrect){
    unlockQuote(State.currentQuote.realAuthor, State.currentQuote.text);
    if(State.isLegendary) incrementLegendaryCount();
    State.streak++; State.correctCount++;
    let pts=15+Math.min(State.streak*3,30);
    if(State.isLegendary) pts*=2;
    State.score+=pts;
    $('score').textContent=State.score; popEl('score');
    $('streak').textContent=State.streak; popEl('streak');
    showCombo(State.streak); showResult(true,pts); playCorrect();
    navigator.vibrate&&navigator.vibrate(50);
  } else {
    State.streak=0; State.wrongCount++;
    $('streak').textContent=0;
    if(State.isEndless){
      // Endless: deduct points instead of losing lives
      const penalty = 10;
      State.score = Math.max(0, State.score - penalty);
      $('score').textContent=State.score;
      showResult(false, 0);
      // Override result points label to show penalty
      $('resultPoints').textContent='−10 pts';
      $('resultPoints').style.color='var(--wrong)';
    } else {
      State.lives--;
      updateHUDHearts();
      showResult(false,0);
      if(State.lives<=0){safeTimeout(endGame,1600);return;}
    }
    playWrong();
    navigator.vibrate&&navigator.vibrate([60,30,60]);
  }

  // Check achievements after every answer
  const newAch = checkAchievements(State, State.dailyStreak, State.isEndless);
  newAch.forEach(ach => queueAchievementBanner(ach));

  safeTimeout(startRound, 2300);
}

// ══════════════════════════════════════════════════════════════════════════════
// GAME OVER
// ══════════════════════════════════════════════════════════════════════════════
function endGame() {
  Timer.stop();
  cancelAllTimeouts();
  const rank=getRank(State.score);
  const accuracy=State.correctCount+State.wrongCount>0
    ?Math.round((State.correctCount/(State.correctCount+State.wrongCount))*100):0;
  const isNewBest=saveBest(State.score);
  saveRun({
    name:      localStorage.getItem(K.name)||'Seeker',
    score:     State.score,
    correct:   State.correctCount,
    wrong:     State.wrongCount,
    accuracy:  accuracy,
    rank:      rank.label,
    rankEmoji: rank.emoji,
    mode:      State.isEndless ? 'endless' : State.selectedMode,
    diff:      State.selectedDiff,
    date:      new Date().toLocaleDateString(),
  });

  // Update cumulative profile stats
  updateStats(State.correctCount, State.wrongCount, State.streak, State.isEndless ? 'endless' : State.selectedMode);

  // Check achievements one final time at game end
  const newAch = checkAchievements(State, State.dailyStreak, State.isEndless);
  newAch.forEach(ach => queueAchievementBanner(ach));

  $('gameoverScore').textContent=State.score;
  $('gameoverEmblem').textContent=rank.emoji;
  $('gameoverRank').textContent=`${rank.emoji}  ${rank.label}`;
  // Show mode label — endless gets its own label
  const modeLabel = State.isEndless
    ? `♾️ ENDLESS · ${State.questionNum} questions`
    : State.selectedMode.toUpperCase();
  $('gameoverStats').innerHTML=`
    <div class="stat-item"><div class="stat-val">${State.correctCount}</div><div class="stat-label">Correct</div></div>
    <div class="stat-item"><div class="stat-val">${State.wrongCount}</div><div class="stat-label">Wrong</div></div>
    <div class="stat-item"><div class="stat-val">${accuracy}%</div><div class="stat-label">Accuracy</div></div>
    <div class="stat-item"><div class="stat-val">${getBest()}</div><div class="stat-label">Best</div></div>
  `;
  if(isNewBest) $('newBestBanner').classList.remove('hidden');
  else          $('newBestBanner').classList.add('hidden');
  const ds=State.dailyStreak;
  const dsEl=$('gameoverDaily');
  dsEl.className='gameover-daily '+(ds>=1?'streak-kept':'streak-lost');
  dsEl.innerHTML=ds>=1?`🔥 <span>Day ${ds} streak!</span>`:`💔 <span>Come back tomorrow!</span>`;
  buildShareCard(State.score,State.correctCount,State.wrongCount,rank.emoji,rank.label,ds,
    State.isEndless?'endless':State.selectedMode, State.selectedDiff);
  showScreen('screenGameOver');
}

// ══════════════════════════════════════════════════════════════════════════════
// LEADERBOARD RENDER
// ══════════════════════════════════════════════════════════════════════════════
function renderLeaderboard() {
  const lb=loadLeaderboard();
  const list=$('lbList');
  const empty=$('lbEmpty');
  const pName=localStorage.getItem(K.name)||'Seeker';
  $('lbPlayerName').textContent=`${pName}'s top runs`;
  if(lb.length===0){list.innerHTML='';empty.classList.remove('hidden');return;}
  empty.classList.add('hidden');
  const medals=['🥇','🥈','🥉'];
  list.innerHTML=lb.map((run,i)=>{
    const rowClass=i===0?'lb-row gold-row':i===1?'lb-row silver-row':i===2?'lb-row bronze-row':'lb-row';
    const pos=medals[i]||`#${i+1}`;
    const meta=`${run.accuracy}% acc · ${run.mode||'all'} · ${run.date||''}`;
    return `<div class="${rowClass}" style="animation-delay:${i*60}ms">
      <div class="lb-pos">${pos}</div>
      <div class="lb-info">
        <div class="lb-name">${run.name||'Seeker'}</div>
        <div class="lb-meta">${meta}</div>
      </div>
      <div class="lb-score">${run.score}</div>
      <div class="lb-rank-emoji">${run.rankEmoji||'🌑'}</div>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════════════════════════════════════════
// COLLECTION RENDER
// ══════════════════════════════════════════════════════════════════════════════
function renderCollection(filterCat) {
  filterCat = filterCat || 'all';
  const unlocked = loadUnlocked();

  // Build speaker list from QUOTES_DATA (only authors matching the filter)
  const allAuthors = [...new Set(QUOTES_DATA.map(q => q.realAuthor))];
  let filteredAuthors;
  if (filterCat === 'all') {
    filteredAuthors = allAuthors;
  } else {
    filteredAuthors = [...new Set(
      QUOTES_DATA.filter(q => q.category === filterCat).map(q => q.realAuthor)
    )];
  }
  filteredAuthors.sort();

  // Overall progress (all speakers, not just filtered)
  const totalSpeakers   = allAuthors.length;
  const unlockedSpeakers = allAuthors.filter(a => (unlocked[a] || []).length > 0).length;
  const pct = totalSpeakers > 0 ? Math.round((unlockedSpeakers / totalSpeakers) * 100) : 0;

  $('collSubtitle').textContent = `${unlockedSpeakers} / ${totalSpeakers} speakers unlocked`;
  $('collProgressFill').style.width = pct + '%';
  $('collProgressPct').textContent  = pct + '%';

  // Build speaker cards
  const grid = $('speakerGrid');
  grid.innerHTML = '';

  filteredAuthors.forEach(author => {
    const authorQuotes  = QUOTES_DATA.filter(q => q.realAuthor === author);
    const unlockedTexts = unlocked[author] || [];
    const total  = authorQuotes.length;
    const done   = unlockedTexts.length;
    const cat    = authorQuotes[0] ? authorQuotes[0].category : 'philosophy';
    const bioEntry = SPEAKER_BIOS[author];
    const icon   = bioEntry ? bioEntry.icon : (CAT_ICONS[cat] || '⚖️');
    const barPct = total > 0 ? Math.round((done / total) * 100) : 0;

    const isLocked   = done === 0;
    const isMastered = done === total && total > 0;
    const stateClass = isMastered ? 'mastered' : isLocked ? 'locked' : 'unlocked';

    const tile = document.createElement('div');
    tile.className = 'speaker-tile ' + stateClass;
    tile.innerHTML =
      (isLocked ? '<span class="speaker-lock-icon">🔒</span>' : '') +
      '<div class="speaker-tile-icon">' + icon + '</div>' +
      '<div class="speaker-tile-name">' + author + '</div>' +
      '<div class="speaker-tile-count">' + done + '/' + total + ' quotes</div>' +
      '<div class="speaker-tile-bar"><div class="speaker-tile-fill" style="width:' + barPct + '%"></div></div>';

    tile.addEventListener('click', () => openBioModal(author));
    grid.appendChild(tile);
  });
}

function openBioModal(author) {
  const bioEntry     = SPEAKER_BIOS[author];
  const authorQuotes = QUOTES_DATA.filter(q => q.realAuthor === author);
  const unlocked     = loadUnlocked();
  const unlockedTexts = unlocked[author] || [];
  const total = authorQuotes.length;
  const done  = unlockedTexts.length;
  const cat   = authorQuotes[0] ? authorQuotes[0].category : 'philosophy';
  const icon  = bioEntry ? bioEntry.icon : (CAT_ICONS[cat] || '⚖️');

  $('bioCatIcon').textContent = icon;
  $('bioName').textContent    = author;
  $('bioMeta').textContent    = bioEntry ? bioEntry.meta : cat;
  $('bioText').textContent    = bioEntry ? bioEntry.bio : 'Play more games to discover this speaker\u2019s story.';
  $('bioProgressCount').textContent = done + ' / ' + total;
  $('bioProgressFill').style.width  = (total > 0 ? Math.round((done/total)*100) : 0) + '%';

  const qContainer = $('bioQuotes');
  qContainer.innerHTML = '';
  authorQuotes.forEach(q => {
    const isUnlocked = unlockedTexts.includes(q.text);
    const item = document.createElement('div');
    item.className = 'bio-quote-item ' + (isUnlocked ? 'unlocked' : 'locked');
    if (isUnlocked) {
      item.innerHTML =
        '<div class="bio-quote-text">\u201C' + q.text + '\u201D</div>' +
        '<div class="bio-quote-meaning">' + q.meaning + '</div>';
    } else {
      item.innerHTML =
        '<div class="bio-quote-text bio-quote-locked-text">???</div>' +
        '<div class="bio-quote-hint">Answer this quote correctly in a game to unlock</div>';
    }
    qContainer.appendChild(item);
  });

  $('bioOverlay').classList.remove('hidden');
  playClick();
}

function closeBioModal() {
  $('bioOverlay').classList.add('hidden');
}

// ══════════════════════════════════════════════════════════════════════════════
// START GAME
// ══════════════════════════════════════════════════════════════════════════════
function startGame() {
  State.dailyStreak=updateDailyStreak();
  const badge=$('hudStreakBadge');
  if(State.dailyStreak>1){badge.classList.remove('hidden');$('hudStreakDays').textContent=State.dailyStreak;}
  else badge.classList.add('hidden');

  // Endless HUD: hide hearts, show endless badge and End Run button
  if(State.isEndless){
    $('hearts').classList.add('hidden');
    $('hudEndlessBadge').classList.remove('hidden');
    $('endRunWrap').classList.remove('hidden');
  } else {
    $('hearts').classList.remove('hidden');
    $('hudEndlessBadge').classList.add('hidden');
    $('endRunWrap').classList.add('hidden');
  }

  // Reset achievement queue for new game
  _achQueue = []; _achShowing = false;

  // Cancel any lingering background timeouts from previous game
  cancelAllTimeouts();
  Timer.stop();

  resetState();

  // Reset HUD display to match fresh state
  $('score').textContent  = '0';
  $('streak').textContent = '0';
  $('score').classList.remove('pop');
  $('streak').classList.remove('pop');
  $('hearts').querySelectorAll('.heart').forEach(h => {
    h.classList.remove('lost', 'shake');
  });
  $('overlayResult').classList.add('hidden');
  $('overlayLegendary').classList.add('hidden');
  $('comboBanner').classList.remove('show');
  $('comboBanner').classList.add('hidden');

  showScreen('screenGame');
  safeTimeout(startRound, 300);
}

// ══════════════════════════════════════════════════════════════════════════════
// INTRO POPULATE
// ══════════════════════════════════════════════════════════════════════════════
function populateIntro() {
  const name=localStorage.getItem(K.name)||'Seeker';
  $('introPlayerName').textContent=name;
  const best=getBest();
  if(best>0){$('introBest').textContent=`Best: ${best}`;$('introBest').classList.remove('hidden');}
  const ds=getCurrentStreak();
  if(ds>0){$('dailyStreakIntro').classList.remove('hidden');$('dsIntroText').textContent=`Day ${ds} Streak`;}
  else $('dailyStreakIntro').classList.add('hidden');
  renderQOTD();
}

// ══════════════════════════════════════════════════════════════════════════════
// INIT — single DOMContentLoaded, every listener wired here
// ══════════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {

  // First launch vs returning player
  ensureMemberSince();
  if (!localStorage.getItem(K.onboarded)) {
    showScreen('screenOnboard');
  } else {
    populateIntro();
    showScreen('screenIntro');
  }

  // ── Onboarding ────────────────────────────────────────────────────────────
  $('btnOnboardDone').addEventListener('click', () => {
    playClick();
    const raw  = $('nameInput').value.trim();
    const name = raw || 'Seeker';
    localStorage.setItem(K.name, name);
    localStorage.setItem(K.onboarded, '1');
    populateIntro();
    showScreen('screenIntro');
  });
  $('nameInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') $('btnOnboardDone').click();
  });

  // ── Intro ─────────────────────────────────────────────────────────────────
  $('btnStart').addEventListener('click',       () => { playClick(); showScreen('screenMode'); });
  $('btnHowTo').addEventListener('click',       () => { playClick(); showScreen('screenHowTo'); });
  $('btnLeaderboard').addEventListener('click', () => { playClick(); renderLeaderboard(); showScreen('screenLeaderboard'); });
  $('btnSpeakers').addEventListener('click',    () => {
    playClick();
    renderCollection('all');
    document.querySelectorAll('.coll-tab').forEach(t => t.classList.remove('active'));
    const allTab = document.querySelector('.coll-tab[data-cat="all"]');
    if (allTab) allTab.classList.add('active');
    showScreen('screenCollection');
  });
  $('btnAchievements').addEventListener('click', () => {
    playClick(); renderAchievements(); showScreen('screenAchievements');
  });

  // ── Profile ───────────────────────────────────────────────────────────────
  $('introPlayerName').addEventListener('click', () => {
    playClick(); renderProfile(); showScreen('screenProfile');
  });
  $('btnProfileBack').addEventListener('click', () => {
    playClick(); showScreen('screenIntro');
  });
  $('btnProfileEdit').addEventListener('click', () => {
    playClick();
    const row = $('profileEditRow');
    const isHidden = row.classList.contains('hidden');
    row.classList.toggle('hidden', !isHidden);
    if (isHidden) $('profileNameInput').focus();
  });
  $('btnProfileSave').addEventListener('click', () => {
    playClick();
    const raw = $('profileNameInput').value.trim();
    if (raw) {
      localStorage.setItem(K.name, raw);
      populateIntro();
      renderProfile();
      $('profileEditRow').classList.add('hidden');
      $('btnProfileSave').textContent = '✓ SAVED';
      setTimeout(() => $('btnProfileSave').textContent = 'SAVE', 1500);
    }
  });
  $('profileNameInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') $('btnProfileSave').click();
  });

  // ── How To Play ───────────────────────────────────────────────────────────
  $('btnHowToBack').addEventListener('click', () => { playClick(); showScreen('screenIntro'); });

  // ── Leaderboard ───────────────────────────────────────────────────────────
  $('btnLbBack').addEventListener('click', () => { playClick(); showScreen('screenIntro'); });

  // ── Collection screen ─────────────────────────────────────────────────────
  $('btnCollBack').addEventListener('click', () => { playClick(); showScreen('screenIntro'); });

  document.querySelectorAll('.coll-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      playClick();
      document.querySelectorAll('.coll-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderCollection(tab.dataset.cat);
    });
  });

  // ── Bio modal ─────────────────────────────────────────────────────────────
  $('btnBioClose').addEventListener('click', () => { closeBioModal(); playClick(); });
  $('bioOverlay').addEventListener('click', e => {
    if (e.target === $('bioOverlay')) closeBioModal();
  });

  // ── Achievements screen ───────────────────────────────────────────────────
  $('btnAchBack').addEventListener('click', () => { playClick(); showScreen('screenIntro'); });

  // ── Mode select ───────────────────────────────────────────────────────────
  document.querySelectorAll('.mode-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      playClick();
      document.querySelectorAll('.mode-tile').forEach(t => t.classList.remove('active'));
      tile.classList.add('active');
      State.selectedMode = tile.dataset.mode;
    });
  });
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playClick();
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      State.selectedDiff = btn.dataset.diff;
    });
  });

  // Endless mode toggle
  $('btnEndlessToggle').addEventListener('click', () => {
    playClick();
    State.isEndless = !State.isEndless;
    $('btnEndlessToggle').classList.toggle('active', State.isEndless);
    $('endlessPill').textContent = State.isEndless ? 'ON' : 'OFF';
  });

  $('btnModeStart').addEventListener('click', () => { playClick(); startGame(); });
  $('btnModeBack').addEventListener('click',  () => {
    playClick();
    // Reset endless when going back
    State.isEndless = false;
    $('btnEndlessToggle').classList.remove('active');
    $('endlessPill').textContent = 'OFF';
    showScreen('screenIntro');
  });

  // ── End Run (endless mode) ────────────────────────────────────────────────
  $('btnEndRun').addEventListener('click', () => {
    playClick();
    Timer.stop();
    endGame();
  });

  // ── Game Over ─────────────────────────────────────────────────────────────
  $('btnRestart').addEventListener('click',  () => { playClick(); showScreen('screenMode'); });
  $('btnViewLb').addEventListener('click',   () => { playClick(); renderLeaderboard(); showScreen('screenLeaderboard'); });
  $('btnGoHome').addEventListener('click',   () => { playClick(); populateIntro(); showScreen('screenIntro'); });

  // ── Share card ────────────────────────────────────────────────────────────
  $('btnDownload').addEventListener('click', () => {
    playClick();
    const link = document.createElement('a');
    link.download = 'wisdom-paths-result.png';
    link.href = $('shareCanvas').toDataURL('image/png');
    link.click();
  });
  $('btnCopyShare').addEventListener('click', () => {
    playClick();
    const rank     = getRank(State.score);
    const accuracy = State.correctCount+State.wrongCount>0
      ? Math.round((State.correctCount/(State.correctCount+State.wrongCount))*100) : 0;
    const ds   = State.dailyStreak;
    const name = localStorage.getItem(K.name)||'Seeker';
    const modeStr = State.isEndless ? 'ENDLESS' : State.selectedMode.toUpperCase();
    const text = [
      '☽ WISDOM PATHS — Who Said It?','',
      `${name} · ${rank.emoji} ${rank.label}`,
      `📊 Score: ${State.score} pts`,
      `✅ ${State.correctCount} correct  ❌ ${State.wrongCount} wrong  🎯 ${accuracy}% accuracy`,
      ds>1 ? `🔥 Day ${ds} daily streak!` : '',
      `Mode: ${modeStr} · ${State.selectedDiff.toUpperCase()}`, '',
      'Can you beat me? wisdomPaths.app',
    ].filter(Boolean).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      const btn=$('btnCopyShare'); btn.textContent='✓ COPIED!'; btn.classList.add('copied');
      setTimeout(()=>{btn.textContent='⎘ COPY TEXT';btn.classList.remove('copied');},2000);
    }).catch(() => {
      const btn=$('btnCopyShare'); btn.textContent='✓ DONE';
      setTimeout(()=>btn.textContent='⎘ COPY TEXT',2000);
    });
  });

  // ── Sound toggle ──────────────────────────────────────────────────────────
  $('soundBtn').addEventListener('click', () => {
    SFX.enabled = !SFX.enabled;
    $('soundBtn').classList.toggle('muted', !SFX.enabled);
    $('soundIcon').textContent = SFX.enabled ? '♪' : '♪̶';
    if (SFX.enabled) tone(440, .1, 'sine', .06);
  });

});