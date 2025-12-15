
document.addEventListener('DOMContentLoaded', () => {

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('section > .container > *, section h2, section p, section img, .btn');

    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    window.addEventListener('scroll', () => {
        const hero = document.getElementById('hero');
        const scrollPosition = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });

    if (document.getElementById('scenery-bg')) {
        updateCarousel();
    }
});

const sceneryData = [
    { img: 'days_gone_scenery_1.png', title: 'High Desert', desc: 'Arid, open plains where the heat beats down. Speed is your only ally here.' },
    { img: 'days_gone_scenery_2.png', title: 'The Cascades', desc: 'Dense, rainy forests. Visibility is low, and danger lurks behind every tree.' },
    { img: 'days_gone_scenery_3.png', title: 'Lost Lake', desc: 'A treacherous marshland surrounding a massive lake. Watch your bike in the deep mud.' },
    { img: 'days_gone_scenery_4.png', title: 'Belknap', desc: 'Volcanic rock and scorching vents. A harsh landscape that forgives no mistakes.' },
    { img: 'days_gone_scenery_5.png', title: 'Broken Road', desc: 'The remnants of the old world. Ruined highways and abandoned checkpoints.' },
    { img: 'days_gone_scenery_6.png', title: 'Iron Butte', desc: 'A land transformed by madness. The Rippers have carved this territory into a twisted gauntlet of traps and worship.' }
];

let currentSlide = 0;

function updateCarousel() {
    if (!document.getElementById('scenery-bg')) return;

    const data = sceneryData[currentSlide];
    const bg = document.getElementById('scenery-bg');
    const title = document.getElementById('scenery-title');
    const desc = document.getElementById('scenery-desc');
    const thumbs = document.querySelectorAll('.nav-thumb');

    const infoBox = document.querySelector('.scenery-info');
    if (infoBox) infoBox.style.opacity = '0';

    setTimeout(() => {
        if (bg) bg.style.backgroundImage = `url('${data.img}')`;
        if (title) title.textContent = data.title;
        if (desc) desc.textContent = data.desc;
        if (infoBox) infoBox.style.opacity = '1';
    }, 300);

    thumbs.forEach((thumb, index) => {
        if (index === currentSlide) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % sceneryData.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + sceneryData.length) % sceneryData.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

const freakerData = [
    { name: 'Swarmers', role: 'Common Infected', desc: 'The most common type. They travel in small packs or massive hordes. Individually weak, but deadly in numbers.', image: 'days_gone_swarmer_card.png' },
    { name: 'Newts', role: 'Opportunist Scavengers', desc: 'Small and opportunistic. They prefer to stay high up on rooftops and will only attack if you are low on health.', image: 'days_gone_newt.png' },
    { name: 'Screamers', role: 'Alarm System', desc: 'Their high-pitched scream can disorient you and attract any nearby Freakers. Take them out first.', image: 'days_gone_screamer.png' },
    { name: 'Breakers', role: 'Heavy Muscle', desc: 'Hulking masses of muscle. They can take a massive amount of damage and will charge you with incredible speed.', image: 'days_gone_breaker.png' },
    { name: 'Runners', role: 'Infected Wolves', desc: 'Infected wolves that can outrun your bike. They hunt in packs and will try to knock you off the road.', image: 'days_gone_runner.png' },
    { name: 'Rippers', role: 'Cultist Fanatics', desc: '"Rest in Peace." Led by the fanatic Carlos, this cult worships the Freakers. They shave their heads and carve R.I.P. into their flesh.', image: 'days_gone_ripper.png' },
    { name: 'Marauders', role: 'Hostile Humans', desc: 'Hostile drifters and survivors who set up ambushes and camps. They kill for supplies and territory.', image: 'days_gone_marauder.png' },
    { name: 'Criers', role: 'Infected Ravens', desc: 'Infected ravens. They build nests in trees and will swoop down to attack if you get too close. Burn their nests.', image: 'days_gone_crier.png' },
    { name: 'Ragers', role: 'Infected Bears', desc: 'Infected bears. Massive, powerful, and hard to kill. Often found with barbed wire tangled in their fur.', image: 'days_gone_rager.png' },
    { name: 'Reachers', role: 'Agile Hunters', desc: 'Fast, intelligent, and deadly. They can dodge attacks and possess incredible agility.', image: 'days_gone_reacher.png' },
    { name: 'Bleachers', role: 'Evolved Swarmers', desc: 'A rare, evolved form. Pale, highly aggressive, and stronger than the average Swarmer.', image: 'days_gone_bleacher.png' }
];

function renderRosterV2(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    container.className = 'roster-container-v2';

    const menuEl = document.createElement('div');
    menuEl.className = 'roster-menu-v2';

    const stageEl = document.createElement('div');
    stageEl.className = 'roster-stage-v2';

    const stageImg = document.createElement('img');
    stageImg.className = 'stage-image-v2';
    if (data.length > 0) stageImg.src = data[0].image;

    const stageInfo = document.createElement('div');
    stageInfo.className = 'stage-info-v2';
    stageInfo.innerHTML = `
        <div class="info-role-v2"></div>
        <div class="info-title-v2"></div>
        <p class="info-desc-v2"></p>
    `;

    stageEl.appendChild(stageImg);
    stageEl.appendChild(stageInfo);

    data.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'menu-item-v2';
        if (index === 0) itemEl.classList.add('active');

        itemEl.innerHTML = `
            <img src="${item.image}" class="menu-thumb-v2" alt="${item.name}">
            <span class="menu-name-v2">${item.name}</span>
            <button class="roster-btn">PICK</button>
        `;

        const activateItem = () => {
            menuEl.querySelectorAll('.menu-item-v2').forEach(el => el.classList.remove('active'));
            itemEl.classList.add('active');

            stageEl.classList.remove('active');

            // Pop-Out Animation: Create Flying Clone
            const thumb = itemEl.querySelector('.menu-thumb-v2');
            const startRect = thumb.getBoundingClientRect();

            const clone = document.createElement('img');
            clone.src = item.image;
            clone.style.position = 'fixed';
            clone.style.zIndex = '50'; // Lower layer (was 1000)
            clone.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
            clone.style.top = `${startRect.top}px`;
            clone.style.left = `${startRect.left}px`;
            clone.style.width = `${startRect.width}px`;
            clone.style.height = `${startRect.height}px`;
            clone.style.borderRadius = '50%';
            clone.style.objectFit = 'cover';
            clone.style.pointerEvents = 'none';

            document.body.appendChild(clone);

            // Update Stage (Hidden)
            stageImg.src = item.image;
            stageImg.style.opacity = '0'; // Keep real image hidden
            stageInfo.querySelector('.info-role-v2').textContent = item.role || 'Survivor';
            stageInfo.querySelector('.info-title-v2').textContent = item.name;
            stageInfo.querySelector('.info-desc-v2').textContent = item.desc || 'Classified NERO Intel.';

            // Calculate Target (Aligned with CSS left: 75%)
            const stageRect = stageEl.getBoundingClientRect();
            const boxH = stageRect.height * 0.85;
            const boxW = stageRect.width * 0.90;
            const targetCenterY = stageRect.top + stageRect.height / 2;
            // IMPORTANT: CSS puts center at 75% of width
            const targetCenterX = stageRect.left + (stageRect.width * 0.75);

            requestAnimationFrame(() => {
                clone.style.borderRadius = '0';
                clone.style.objectFit = 'contain';
                clone.style.width = `${boxW}px`;
                clone.style.height = `${boxH}px`;
                clone.style.top = `${targetCenterY - boxH / 2}px`;
                clone.style.left = `${targetCenterX - boxW / 2}px`;
            });

            // Delayed Text Reveal (Polished feel)
            setTimeout(() => {
                stageEl.classList.add('active');
            }, 300); // Start text slide just before image lands

            // Cleanup & Handover
            setTimeout(() => {
                stageImg.style.opacity = ''; // Reveal real image
                clone.remove();
            }, 500);
        };

        itemEl.querySelector('.roster-btn').addEventListener('click', (e) => {
            activateItem();
        });

        menuEl.appendChild(itemEl);
    });

    container.appendChild(menuEl);
    container.appendChild(stageEl);

    if (data.length > 0) {
        setTimeout(() => {
            const firstBtn = menuEl.querySelector('.roster-btn');
            if (firstBtn) firstBtn.click();
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const charContainer = document.getElementById('character-roster-v2');
    if (charContainer) {
        fetch('characters.json')
            .then(res => res.json())
            .then(characters => {
                const enriched = characters.map(c => ({
                    ...c,
                    desc: c.desc || `Key figure in the Oregon wastes. Role: ${c.role}.`
                }));
                renderRosterV2('character-roster-v2', enriched);
            })
            .catch(err => {
                console.error(err);
                charContainer.innerHTML = `<p style="color:red; padding:20px;">Connection Interrupted: ${err.message}</p>`;
            });
    }

    renderRosterV2('freaker-roster-v2', freakerData);
});
