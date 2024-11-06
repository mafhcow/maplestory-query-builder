const classes = {
    'Explorer': {
        'Hero': ['히어로'],
        'Dark Knight': ['다크나이트', '닼나'],
        'Paladin': ['팔라딘'],
        'Bishop': ['비숍'],
        'Fire/Poison': ['불독'],
        'Ice/Lightning': ['썬콜'],
        'Shadower': ['섀도어'],
        'Night Lord': ['나이트로드', '나로'],
        'Dual Blade': ['듀얼블레이드', '듀블'],
        'Bowmaster': ['보우마스터', '보마'],
        'Marksman': ['신궁'],
        'Pathfinder': ['패스파인더', '패파'],
        'Buccaneer': ['바이퍼'],
        'Corsair': ['캡틴'],
        'Cannoneer': ['캐논슈터', '캐슈']
    },
    'Cygnus Knights': {
        'Dawn Warrior': ['소울마스터', '소마'],
        'Blaze Wizard': ['플레임위자드', '플위'],
        'Night Walker': ['나이트워커', '나워'],
        'Wind Archer': ['윈드브레이커', '윈브'],
        'Thunder Breaker': ['스트라이커', '스커'],
        'Mihile': ['미하일']
    },
    'Heroes': {
        'Aran': ['아란'],
        'Evan': ['에반'],
        'Mercedes': ['메르세데스', '메르', '메세'],
        'Luminous': ['루미너스', '루미'],
        'Phantom': ['팬텀'],
        'Shade': ['은월']
    },
    'Nova': {
        'Angelic Buster': ['엔젤릭버스터', '엔버'],
        'Kaiser': ['카이저'],
        'Cadena': ['카데나'],
        'Kain': ['카인']
    },
    'Resistance': {
        'Xenon': ['제논'],
        'Mechanic': ['메카닉'],
        'Battle Mage': ['배틀메이지', '배메'],
        'Wild Hunter': ['와일드헌터', '와헌'],
        'Blaster': ['블래스터', '블래'],
        'Demon Avenger': ['데몬 어벤저', '데벤', '데벤저'],
        'Demon Slayer': ['데몬 슬레이어', '데슬']
    },
    'Flora': {
        'Adele': ['아델'],
        'Ark': ['아크'],
        'Illium': ['일리움'],
        'Khali': ['칼리']
    },
    'Anima': {
        'Hoyoung': ['호영'],
        'Lara': ['라라']
    },
    'Others': {
        'Kinesis': ['키네시스', '키네'],
        'Zero': ['제로']
    }
};

const bosses = {
    'Weekly Bosses': {
        'Hilla': ['힐라'],
        'Cygnus': ['시그너스', '노시그'],
        'Magnus': ['매그너스', '하매'],
        'Pink Bean': ['핑크빈', '카핑', '카핑빈'],
        'CRA': ['카루타', '카룻'],
        'Crimson Queen': ['블러디퀸', '블퀸'],
        'Von Bon': ['반반'],
        'Pierre': ['피에르'],
        'Vellum': ['벨룸', '카벨'],
        'Papulatus': ['파풀라투스', '카파풀'],
        'Lotus': ['스우'],
        'Damien': ['데미안'],
        'Guardian Angel Slime': ['가디언 엔젤 슬라임', '가엔슬', '카엔슬'],
        'Lucid': ['루시드'],
        'Will': ['윌'],
        'Gloom': ['더스크'],
        'Verus Hilla': ['진힐라'],
        'Darknell': ['듄켈'],
        'Black Mage': ['검은 마법사', '검마'],
        'Seren': ['세렌'],
        'Kalos': ['칼로스'],
        'Kaling': ['카링'],
        'Limbo': ['림보']
    }
};

// Helper function to find shortest translation
function getShortestTranslation(translations) {
    return translations.reduce((shortest, current) => 
        current.length < shortest.length ? current : shortest
    );
}

// Initialize selects when page loads
window.onload = function() {
    const classSelect = document.getElementById('classSelect');
    const bossSelect = document.getElementById('bossSelect');
    const difficultySelect = document.getElementById('difficultySelect');
    const soloCheck = document.getElementById('soloCheck');
    const lowStatCheck = document.getElementById('lowStatCheck');

    // Add event listeners for dynamic updates
    classSelect.addEventListener('change', generateQuery);
    bossSelect.addEventListener('change', generateQuery);
    difficultySelect.addEventListener('change', generateQuery);
    soloCheck.addEventListener('change', generateQuery);
    lowStatCheck.addEventListener('change', generateQuery);

    // Populate class select
    for (const category in classes) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category;
        
        for (const className in classes[category]) {
            const option = document.createElement('option');
            const shortestTranslation = getShortestTranslation(classes[category][className]);
            option.value = shortestTranslation;
            option.text = `${className} (${shortestTranslation})`;
            optgroup.appendChild(option);
        }
        
        classSelect.appendChild(optgroup);
    }

    // Populate boss select
    for (const category in bosses) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category;
        
        for (const bossName in bosses[category]) {
            const option = document.createElement('option');
            const shortestTranslation = getShortestTranslation(bosses[category][bossName]);
            option.value = shortestTranslation;
            option.text = `${bossName} (${shortestTranslation})`;
            optgroup.appendChild(option);
        }
        
        bossSelect.appendChild(optgroup);
    }

    // Generate initial query
    generateQuery();
};

function generateQuery() {
    const className = document.getElementById('classSelect').value;
    const difficulty = document.getElementById('difficultySelect').value;
    const bossName = document.getElementById('bossSelect').value;
    const isSolo = document.getElementById('soloCheck').checked;
    const isLowStat = document.getElementById('lowStatCheck').checked;

    let query = '';
    
    // Only add terms if they are selected (value is not empty)
    if (className) query += className;
    if (difficulty) query += (query ? ' ' : '') + difficulty;
    if (bossName) query += (query ? ' ' : '') + bossName;
    if (isSolo) query += ' 솔플';
    if (isLowStat) query += ' 최소컷';

    document.getElementById('queryResult').textContent = query;
    
    // Update YouTube link
    const youtubeQuery = encodeURIComponent(query);
    const youtubeLink = document.getElementById('youtubeLink');
    youtubeLink.href = `https://www.youtube.com/results?search_query=${youtubeQuery}`;
    youtubeLink.style.display = query ? 'inline-block' : 'none';
}

function copyQuery() {
    const queryText = document.getElementById('queryResult').textContent;
    navigator.clipboard.writeText(queryText).then(() => {
        alert('Query copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}