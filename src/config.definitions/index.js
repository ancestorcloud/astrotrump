
const presidents = [
  {
    id: 'trump',
    firstName: 'Donald',
    lastName: 'Trump',
    name: 'Donald Trump',
    avatar: '/images/trump.jpg',
    ogfId: '577114544',
    facebookBannerImage: 'https://i.imgur.com/LidVqkH.jpg',
    resultsCopy: [
      'You are more closely related to Trump than 80% of the human race. Did you know, he is just as concerned about family relationships as you? Donald Trump was an active member of the “birther” movement, a popular conspiracy theory that came about during Obama’s 2008 election. He conducted an investigation in Hawaii to backup his accusations. In 2014, when Obama released his information publicly, Trump referred to it as his “so-called birth certificate, or whatever it was.” Looks like that family curiosity is in your DNA.',
      'No wonder your hair looks like that sometimes! Although when The Donald wakes up in the morning his locks look quite differently. His remarkable hairstyle is achieved after blow-drying his hair forward and then combing it backward. At this time we can not divulge the secrets of how he maintains his many shades of curiously unclear hair. Although your roots may have their bad days, your genetic roots will forever have a claim to american fame.',
      'Trump has said, “I’m the number 1 developer in New York, I’m the biggest in Atlantic City, and maybe we’ll keep it that way.” We’d suggest you stay close to Trump as this mogul expands his empire throughout the world. We all love having family members whose net worth is $4.5 billion. (Well according to Forbes it’s 4.5 billion... according to Trump it’s over 10 billion.) So there ya go! Proof of that rich uncle you’ve always wanted to be related to.',
      'The great thing about family is we can always learn from their mistakes! We wouldn’t exactly call him a “family guy”. His first marriage was 1977 to Czech model Ivana Zelnickova (an alternate to the Czech Olympic Ski Team) and cheated on her with second marriage, actress Marla Maples in 1993. Trump divorced Maples in 1999 and married his current wife and Slovenian model Melania Knauss, in 2005. He also said on camera, “If Ivanka weren’t my daughter, perhaps I would be dating her.” We hope The Donald Complex doesn’t run in your family!!',
      'We bet you get your healthy habits from your cousin too! Although this may come as a surprise to you Trump has never smoked a cigarette, drank alcohol or done drugs. He of course has however, his own brand of vodka. Launched in 2006, he self described it as a “superb product and beautifully packaged”. Sadly consumers didn’t agree and the vodka line ended abruptly in 2011 due to slow sales. So next time you’re tempted to monetize the misfortune of others, keep in mind what it did to the reputation of your distant cousin.',
      'Did you know it’s in your blood to be a tough cookie? Ever aspired to attend a great college? Both could be in your cards given Donald is your distant cousin. From being shipped off to a military boarding school by his parents at a young age, to getting into the most prestigious business schools in the country, there is no doubt your cousin Trump aspires to learn. You never know, maybe having his name in your family tree will help you get accepted into the school of your dreams.',
      'Ever wonder where you or a sibling of yours got that germaphobe nature from? That could have been from Donald Trump! Your distant cousin is a self-confessed germaphobe, which stems from a common obsessive-compulsive disorder. He does not like to shake hands, or touch people at all. He doesn’t even like to push the ground floor level button on an elevator because so many foreign people have touched it before. Next time you take an extra squirt of hand-sanitizer remember you’re not the only freak out there, it probably runs in the family!',
      'Now I know what you’re thinking… he was the last person you were going to vote for and now you’re learning that you’re distant cousins! It can’t be all that bad, at least in his words: “I’m the worst thing that’s ever happened to ISIS.” So rest assured that ISIS doesn’t like him even if you’re not so proud of this new revelation in your family tree.',
      'We’re sorry if this isn’t good news for you. If you it makes you feel any better, Hillary Clinton is Donald’s 19th cousins, and they are learning to get along just great! Well, not really but hey, this just proves that we don’t always get along or agree with our family members!',
      'You’ve finally found your claim to fame! Donald Trump received his star on the Hollywood Walk of Fame in 2007 for his TV show, The Apprentice. We hope that this cousin of yours inspires some desire in you to reach the stardom you’ve always dreamed of. Whether you’re an aspiring actor/actress or a Real Estate Mogul this really goes to show that anyone can make it to the Hollywood Walk of Fame! So don’t give up on your dreams and don’t be afraid to call up Donald Trump for any advice, after all, he is your cousin!!',
      'You likely get your “Can Do” attitude from your cousin Donald Trump! We all think of him as this force to be reckoned with, and he certainly sees himself as unstoppable.  Next time your bank account hits zero, just remember Trump has been there before, 4 times! You can’t quit yet, you keep trying, maybe someday you’ll even feel inspired to run for President of the United States. Why not?',
      'Maybe that’s why you’ve always been so focused on your good grades! That must run in your family DNA! After Trump attended the New York Military Academy, he went on to higher education at Fordham University and later University of Pennsylvania receiving his BA in economics. He told CNN the Wharton School of Finance is the hardest school to get into, “it’s like super genius stuff”. Good for you, for keeping on with that degree, your intelligence and perseverance is something you’ve likely inherited from a common ancestor 28 generations back!!',
      'Well look at that! He is a cousin afterall!! He may not be the best family guy, but that doesn’t stop him from monetizing family game night! Though this likely won’t come as a surprise, Donald Trump is the only presidential candidate with his very own board game! Hitting stores in 1989, “Trump: The Game” is modeled similarly to Monopoly, using Trump cards to buy and sell properties. If this game doesn’t bring your family closer, we don’t know what will. Just $13.99 on ebay!',
      'Trump is your cousin, and he’s a sports lover too!! Most of us stopped playing sports in high school, but why stop playing when you can just purchase an entire football team? In 1983 Trump purchased the New Jersey Generals. At one time he was even a financial advisor for Mike Tyson. Bet you never thought your distant cousin was such a sports fanatic, it must run in the family!',
      'Well there you go! You really are cousins with a billionaire. Whether this is good news to you or bad, it may help explain your indecisive nature. Trump has had various political positions often contradicting himself. It appears as if he doesn’t always know quite where he stands on an issue. As pertaining to Iowa for example in January 2016 he said, “I love Iowa, we’ve done really well here.” In November 2015, “How stupid are the people of Iowa”. Whether you are for Trump or against Trump...or you really can’t decide -- you share a common ancestor, making it all relative.',
      'Maybe you’ve always loved TV reality shows/ contests. Well your cousin Donald does too! We’re all-too familiar with The Apprentice but are you familiar with his ties to the Miss Universe, Miss USA, and Miss Teen USA beauty pageants? Unfortunately after a nasty comment made about Mexican immigrants, NBC and Univision ended their business relationship with Trump - to which he responded with a $500 million lawsuit, and then won.',
      `Dozens of things have been named after your cousin Donald, including towers, plazas, hotels, golf courses, parks, shuttles, ice rinks, and even fragrances. If you feel like supporting the family business, drop by your local mall and take a whiff of the following fragrances: "Empire by Trump," "Success by Trump," and, yes, even "Donald Trump, The Fragrance."`,
      `Well, you're definitely related. Unfortunately, he probably won't be writing you into his will any time soon. According to Forbes he's sitting on a fortune of $4 billion. If he cashed that money out into hundred dollar bills, he could place them end to end from New York City to Paris and still have enough left over to retire for a few lifetimes. Maybe you should call up your long-lost cousin Donald? Family is important, and it's never too late to get in touch.`,
      `Donald Trump is your cousin. No kidding. He's been variously described as a fascist (by Max Boot) and as the best thing to happen to politics in a long time (by Mark Cuban). For better or worse, this guy is your cousin. You probably won't be having very pleasant conversations over Thanksgiving dinner with him around, but maybe you can convince him to pay for those salsa dancing lessons you've been thinking about.`,
      `Congratulations, it's a boy! Donald is your cousin. This business-magnate-turned-politician lives in New York. You could fly over for a visit, if not for the dangers of the Big Apple. Boris Johnson, a British politician, quipped that the only reason he wouldn't go to some parts of New York is "the real risk of meeting Donald Trump." If you can stomach that hazard, you should pay the city a visit. Perhaps your cousin Donald will reserve a room for you in the skyscraper he calls home, Trump Tower. Let's just hope you don't run into him in the elevator.`,
      `Have you felt aggressive lately? Are you unleashing diatribes on dentists, whooping at waiters, cursing at carolers, or throwing tantrums in taxis? That bluster might be in your blood. After all, you're cousins with Donald Trump, the man who, for all of his millions, seems to be miffed at all times and in all places. Even the ever-equanimous J. K. Rowling said "Voldemort was nowhere near as bad" as your dear cousin Donald.`,
      `Well, the results are in. I don't like to be the bearer of bad news, but that's part of my job. Donald Trump is your cousin. I'm sure that's difficult to hear. But look on the bright side. Even if you've filed for bankruptcy once, you've still filed for bankruptcy three fewer times than your cousin Donald. And if you ever need to file for bankruptcy again, maybe he'll help you get back on your feet. Even if he gave you 0.025% of his $4 billion fortune you'd still be a millionaire. So maybe your prognosis isn't as bad as you originally imagined.`
    ]
  },

  {
    id: 'obama',
    firstName: 'Barack',
    lastName: 'Obama',
    name: 'Barack Obama',
    avatar: '/images/obama.jpg',
    ogfId: '577114544',
    facebookBannerImage: 'https://i.imgur.com/pighVQj.jpg',
    resultsCopy: [
      `Did you know you have a Grammy award winning cousin? Lucky you! Obama is an accomplished author and vocal artist! Most of his income comes from his book sales and the audio book of his auto-biography won him a Grammy! He is not the only former president with a Grammy, both Bill Clinton and Jimmy Carter have earned that honor as well. Maybe it’s time you start up that musical career you’ve always dreamed of - we’re sure Barry can make some introductions. `,
      `You have achievement in your blood! Not only did Obama become the first black president of the United States, he also won a Nobel peace prize! He joins three other presidents Theodore Roosevelt, Woodrow Wilson, and Jimmy Carter who have won the prize. What have you done today?`,
      `Do you and your cousin Obama share a love for sports? Barry is famously known for loving basketball. He played in high school and earned the nickname “O’Bomber.” He turned the White House tennis court into a basketball court and has a basketball Election Day ritual. He’s been playing more golf and less basketball as his age makes it harder for him to stay competitive, but basketball is still in his heart as many of his golf partners are famous basketball players. Looks like a love of basketball could run in the family!`,
      `You’re cousins, so of course you share a love for great food! Obama is quite the foodie, some of his favorites include the classics - he loves chicken enchiladas, jalapeno cheeseburgers, and barbecue. His specialty as a cook is chili. In the morning he has usually 4-6 eggs, potatoes, and wheat toast for breakfast. Every now and then he adds fruit, bacon and oatmeal to the mix. If you dined with Obama what do you suppose you would eat with him?`,
      `Are you a pet lover too? Your cousin Barack certainly is! The Obama Family welcomed Bo, a male Portuguese Water Dog to the White House in 2008. He is affectionately referred to as the “First Dog”. In 2013 Bo was joined by Sunny, a female dog of the same breed. Sadly Sunny bit a white house guest in January! Thus, Bo continues to be the favorite of the pooches. A plush toy was even manufactured in Bo’s honor. Would you buy it?`,
      `Obama’s early family life was anything but simple. So if you’re family has some issues maybe you can relate to your cousin Barack. Barack’s mother was English and father was Kenyan. He once mentioned, “My father looked nothing like the people around me - that he was black as pitch, my mother white as milk.” As a young adult it was difficult to reconcile social perceptions of his multiracial heritage. His parents divorced when he was three and his father killed in a car accident when he was 21. Makes you think twice about the adversity he had to overcome, and the important role family now plays in his life. Consider what challenges your family has faced, we hope it makes you stronger as it did your cousin!`,
      `You are cousins with a philanthropist! Barack Obama is quite the giver. On his 2010 income of $1.7 million he gave 14% of it to non-profit organizations including 131,000 to Fisher House Foundation, a charity assisting wounded veterans’ families. Does he inspire you to be charitable? Maybe it’s in your blood!  `
    ]
  },

  {
    id: 'lincoln',
    firstName: 'Abe',
    lastName: 'Lincoln',
    name: 'Abe Lincoln',
    avatar: '/images/lincoln.jpg',
    ogfId: '577114544',
    facebookBannerImage: 'https://i.imgur.com/QCPkjmt.png',
    resultsCopy: [
      `Woah, you must be a force to reckoned with! Not only did he serve as Commander-in-Chief during the Civil War, but he was also a skilled wrestler. He lost just once in 300 matches. He was held in such high esteem in the wrestling community, he earned the honor of “Outstanding American” in the National Wrestling Hall of Fame. Maybe it’s time to pick up a new family sport?`,
      `Feeling innovative? You should take a page from your cousin’s book and pursue a new venture. Lincoln holds the distinction of being the only president to have obtained a patent. His patent was an improvement for steamboats. Maybe you can get some transportation tips from Elon Musk - just mention your famous cousin and we’re sure you’ll be able to get a meeting. `,
      `You’re related to Abraham Lincoln! But did you know his path to the White House was anything but easy? He had very little formal education, and failed in his first business. Due to his persistence and tenacity he was the 16th president of the US. So don’t give up on those dream! You’ve got determination in your blood.  `,
      `Well, the good news is you have a famous cousin. The bad news is, he was one unlucky president. We all know that he was famously assassinated, but did you know another member of his family was as well? The unlucky party was Fido, one of Lincoln’s dogs. He happened upon the wrong drunkard and met his demise. Best you be on the lookout for shady characters. Don’t say we didn’t warn you.`,
      `Now you know where your ambition comes from! Lincoln was known as a famous lawyer before his political career, but did you know that he didn’t have a law degree? He only attended school for less than a year but that didn’t stop him from have a successful 25 year run as a lawyer and, of course, becoming president of the United States. Talk about fake it till you make it! `,
      `If at first you don’t succeed, remember your famous cousin Abe. In 1856 he lost his bid to become his party’s candidate for vice president. In 1858 he lost his Senate race. In the next presidential election in 1860, he won both the electoral college and the popular vote by a large margin. So as the saying goes, try try again.`,
      `Well that explains a lot about those quirks! President Lincoln was a noble and good man but let’s be honest...he was a strange one. He kept his important documents inside his hat, he was obsessed with cats, and wore a size 14 shoe. So don’t let your friends tell you you’re weird. It runs in the family! `
    ]
  },

  {
    id: 'washington',
    firstName: 'George',
    lastName: 'Washington',
    name: 'George Washington',
    avatar: '/images/washington.jpg',
    ogfId: '577114544',
    facebookBannerImage: 'https://i.imgur.com/wZlBVJX.jpg',
    resultsCopy: [
      `We have good news! You are related to George Washington. It is always good to have a relative with some cash (and definitely relatives who are ON some cash). Did you know Washington’s salary in 1790 was 2% of the total US budget! Talk about life on top! It wasn’t always that way though. He had to borrow money to attend his own first inauguration. Here’s to hoping your financial fortunes follow the same trajectory!  `,
      `You must come from a family with presence. Not only is George Washington our first president and one of our founding fathers, he checked in at 6 feet 2 inches tall and 200 pounds. That’s a big dude. If you didn’t benefit from those tall genes, maybe your kids will reap the benefits and make it big on the playing field. Perhaps look into fox hunting, one of your cousin’s favorite sports. `,
      `Now you know where you get your entrepreneurial spirit! Washington was a dropout before it was cool, leaving school at the age of 15 to become a surveyor when his family couldn’t afford to send him to school. Things turned out pretty well for him, so maybe tell your parents to lay off the next time they ask you about grades.`,
      `The good news, you’re cousins with an American hero. The bad news, you may have inherited some bade genes. For George, it was his teeth. Toothaches were a huge problem for him and at 57, he had them all pulled. Maybe it's time to take that trip to the dentist you’ve been putting off. `,
      `Congrats! You have a very important name in your family tree. George Washington had a penchant for interesting names. He never had any children of his own to name, but he bred hound dogs and gave them some unique names: Tarter, Truelove, SweetLips,  Drunkard, Tipler, and Tipsy. Maybe it’s because his name lacked flair - he didn’t even have a middle name! We’re sure your kids would appreciate it if you took after George (after the bullying phase of course). `,
      `Can you feel the power! You are related to one of America’s greatest military leaders. Not only did he serve as an officer in the Military and eventually Commander-in-Chief while president, he eventually attained a very powerful rank. A law was passed after his death to make him the General of the Armies of the United States, the highest ranking officer of all time. The next time someone challenges you to a game of Risk, you better be fair and let them know who they're up against. `,
      `George Washington is your cousin! You may think this is great news, but did you know he suffered from a long list of problems: diphtheria, tuberculosis, smallpox, dysentery, malaria, quinsy (tonsillitis), carbuncle, pneumonia, and epiglottitis—to name a few. You better hope you inherited your immune system from the other side of your family. `
    ]
  }
]

export default presidents
