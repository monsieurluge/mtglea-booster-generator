const domElements = {
    boosters: document.getElementById('boosters'),
    perBoosterCardcount: document.getElementById('booster-count'),
}

const maxAttempts = 5

const boosterStats = {
    colorDistribution: {
        white: 1,
        blue: 1,
        black: 1,
        red: 1,
        green: 1,
        artifact: 0.8,
        land: 0.7
    },
    rarityDistribution: {
        common: 11,
        uncommon: 3,
        rare: 1,
    },
}

function generateBoosters() {
    const allCards = set()
    const count = parseInt(domElements.perBoosterCardcount.value, 10) || 1
    const boosters = []

    for (let i = 0; i < count; i++) {
        boosters.push(generateBooster(allCards))
    }

    domElements.boosters.innerHTML = ''
    boosters.forEach(booster => {
        const element = createBoosterElement(booster)
        domElements.boosters.appendChild(element)
    })
}

function generateBooster(allCards) {
    const colorWeights = Object.values(boosterStats.colorDistribution)
    const totalWeight = colorWeights.reduce((a, b) => a + b, 0)

    const commons = selectCards({
        allCards,
        colorWeights,
        targetRarity: 'common',
        total: boosterStats.rarityDistribution.common,
        totalWeight,
    })

    const uncommons = selectCards({
        allCards,
        colorWeights,
        targetRarity: 'uncommon',
        total: boosterStats.rarityDistribution.uncommon,
        totalWeight,
    })

    const rares = selectCards({
        allCards,
        colorWeights,
        targetRarity: 'rare',
        total: boosterStats.rarityDistribution.rare,
        totalWeight,
    })

    return [...commons, ...uncommons, ...rares]
}

function selectCards({ allCards, colorWeights, totalWeight, total, targetRarity }) {
    let cards = []
    for (let i = 0; i < total; i++) {
        const card = selectCard({
            allCards,
            colorWeights,
            totalWeight,
            targetRarity,
        })
        cards.push(card)
    }
    return cards
}

function selectCard({ allCards, colorWeights, totalWeight, targetRarity }) {
    const colors = ['white', 'blue', 'black', 'red', 'green', 'artifact', 'land']
    let attempt = 0

    while (attempt < maxAttempts) {
        attempt += 1

        const rand = Math.random() * totalWeight
        let cumulativeWeight = 0
        let selectedColor
        for (let i = 0; i < colors.length; i++) {
            cumulativeWeight += colorWeights[i]
            if (rand < cumulativeWeight) {
                selectedColor = colors[i]
                break
            }
        }
        const filteredCards = allCards.filter(card => card.rarity === targetRarity && card.color === selectedColor)
        const selectedCard = filteredCards[Math.floor(Math.random() * filteredCards.length)]

        if (selectedCard) return selectedCard
    }

    throw new Error(`Failed to select a ${targetRarity} card after ${maxAttempts} attempts`)
}

function createBoosterElement(cards) {
    const boosterEl = document.createElement('div')
    boosterEl.classList.add('booster')

    const listEl = document.createElement('ul')
    boosterEl.appendChild(listEl)

    cards.forEach(card => {
        const cardEl = document.createElement('li')
        cardEl.classList.add(`color-${card.color}`, `rarity-${card.rarity}`)
        cardEl.textContent = card.name
        listEl.appendChild(cardEl)
    })

    return boosterEl
}

function set() {
    return [
        { name: 'animate wall', rarity: 'rare', color: 'white' },
        { name: 'armageddon', rarity: 'rare', color: 'white' },
        { name: 'balance', rarity: 'rare', color: 'white' },
        { name: 'benalish hero', rarity: 'common', color: 'white' },
        { name: 'black ward', rarity: 'uncommon', color: 'white' },
        { name: 'blaze of glory', rarity: 'rare', color: 'white' },
        { name: 'blessing', rarity: 'rare', color: 'white' },
        { name: 'blue ward', rarity: 'uncommon', color: 'white' },
        { name: 'castle', rarity: 'uncommon', color: 'white' },
        { name: 'circle of protection blue', rarity: 'common', color: 'white' },
        { name: 'circle of protection green', rarity: 'common', color: 'white' },
        { name: 'circle of protection red', rarity: 'common', color: 'white' },
        { name: 'circle of protection white', rarity: 'common', color: 'white' },
        { name: 'consecrate land', rarity: 'uncommon', color: 'white' },
        { name: 'conversion', rarity: 'uncommon', color: 'white' },
        { name: 'crusade', rarity: 'rare', color: 'white' },
        { name: 'death ward', rarity: 'common', color: 'white' },
        { name: 'disenchant', rarity: 'common', color: 'white' },
        { name: 'farmstead', rarity: 'rare', color: 'white' },
        { name: 'green ward', rarity: 'uncommon', color: 'white' },
        { name: 'guardian angel', rarity: 'common', color: 'white' },
        { name: 'healing salve', rarity: 'common', color: 'white' },
        { name: 'holy armor', rarity: 'common', color: 'white' },
        { name: 'holy strength', rarity: 'common', color: 'white' },
        { name: 'island sanctuary', rarity: 'rare', color: 'white' },
        { name: 'karma', rarity: 'uncommon', color: 'white' },
        { name: 'lance', rarity: 'uncommon', color: 'white' },
        { name: 'mesa pegasus', rarity: 'common', color: 'white' },
        { name: 'northern paladin', rarity: 'rare', color: 'white' },
        { name: 'pearled unicorn', rarity: 'common', color: 'white' },
        { name: 'personal incarnation', rarity: 'rare', color: 'white' },
        { name: 'purelace', rarity: 'rare', color: 'white' },
        { name: 'red ward', rarity: 'uncommon', color: 'white' },
        { name: 'resurrection', rarity: 'uncommon', color: 'white' },
        { name: 'reverse damage', rarity: 'rare', color: 'white' },
        { name: 'righteousness', rarity: 'rare', color: 'white' },
        { name: 'samite healer', rarity: 'common', color: 'white' },
        { name: 'savannah lions', rarity: 'rare', color: 'white' },
        { name: 'serra angel', rarity: 'uncommon', color: 'white' },
        { name: 'swords to plowshares', rarity: 'uncommon', color: 'white' },
        { name: 'veteran bodyguard', rarity: 'rare', color: 'white' },
        { name: 'wall of swords', rarity: 'uncommon', color: 'white' },
        { name: 'white knight', rarity: 'uncommon', color: 'white' },
        { name: 'white ward', rarity: 'uncommon', color: 'white' },
        { name: 'wrath of god', rarity: 'rare', color: 'white' },
        { name: 'air elemental', rarity: 'uncommon', color: 'blue' },
        { name: 'ancestral recall', rarity: 'rare', color: 'blue' },
        { name: 'animate artifact', rarity: 'uncommon', color: 'blue' },
        { name: 'blue elemental blast', rarity: 'common', color: 'blue' },
        { name: 'braingeyser', rarity: 'rare', color: 'blue' },
        { name: 'clone', rarity: 'uncommon', color: 'blue' },
        { name: 'control magic', rarity: 'uncommon', color: 'blue' },
        { name: 'copy artifact', rarity: 'rare', color: 'blue' },
        { name: 'counterspell', rarity: 'uncommon', color: 'blue' },
        { name: 'creature bond', rarity: 'common', color: 'blue' },
        { name: 'drain power', rarity: 'rare', color: 'blue' },
        { name: 'feedback', rarity: 'uncommon', color: 'blue' },
        { name: 'flight', rarity: 'common', color: 'blue' },
        { name: 'invisibility', rarity: 'common', color: 'blue' },
        { name: 'jump', rarity: 'common', color: 'blue' },
        { name: 'lifetap', rarity: 'uncommon', color: 'blue' },
        { name: 'lord of atlantis', rarity: 'rare', color: 'blue' },
        { name: 'magical hack', rarity: 'rare', color: 'blue' },
        { name: 'mahamoti djinn', rarity: 'rare', color: 'blue' },
        { name: 'mana short', rarity: 'rare', color: 'blue' },
        { name: 'merfolk of the pearl trident', rarity: 'common', color: 'blue' },
        { name: 'phantasmal forces', rarity: 'uncommon', color: 'blue' },
        { name: 'phantasmal terrain', rarity: 'common', color: 'blue' },
        { name: 'phantom monster', rarity: 'uncommon', color: 'blue' },
        { name: 'pirate ship', rarity: 'rare', color: 'blue' },
        { name: 'power leak', rarity: 'common', color: 'blue' },
        { name: 'power sink', rarity: 'common', color: 'blue' },
        { name: 'prodigal sorcerer', rarity: 'common', color: 'blue' },
        { name: 'psionic blast', rarity: 'uncommon', color: 'blue' },
        { name: 'psychic venom', rarity: 'common', color: 'blue' },
        { name: 'sea serpent', rarity: 'common', color: 'blue' },
        { name: "siren's call", rarity: 'uncommon', color: 'blue' },
        { name: 'sleight of mind', rarity: 'rare', color: 'blue' },
        { name: 'spell blast', rarity: 'common', color: 'blue' },
        { name: 'stasis', rarity: 'rare', color: 'blue' },
        { name: 'steal artifact', rarity: 'uncommon', color: 'blue' },
        { name: 'thoughtlace', rarity: 'rare', color: 'blue' },
        { name: 'time walk', rarity: 'rare', color: 'blue' },
        { name: 'timetwister', rarity: 'rare', color: 'blue' },
        { name: 'twiddle', rarity: 'common', color: 'blue' },
        { name: 'unsummon', rarity: 'common', color: 'blue' },
        { name: 'vesuvan doppleganger', rarity: 'rare', color: 'blue' },
        { name: 'volcanic eruption', rarity: 'rare', color: 'blue' },
        { name: 'wall of air', rarity: 'uncommon', color: 'blue' },
        { name: 'wall of water', rarity: 'uncommon', color: 'blue' },
        { name: 'water elemental', rarity: 'uncommon', color: 'blue' },
        { name: 'animate dead', rarity: 'uncommon', color: 'black' },
        { name: 'bad moon', rarity: 'rare', color: 'black' },
        { name: 'black knight', rarity: 'uncommon', color: 'black' },
        { name: 'bog wraith', rarity: 'uncommon', color: 'black' },
        { name: 'cursed land', rarity: 'uncommon', color: 'black' },
        { name: 'dark ritual', rarity: 'common', color: 'black' },
        { name: 'deathgrip', rarity: 'uncommon', color: 'black' },
        { name: 'deathlace', rarity: 'rare', color: 'black' },
        { name: 'demonic hordes', rarity: 'rare', color: 'black' },
        { name: 'demonic tutor', rarity: 'uncommon', color: 'black' },
        { name: 'drain life', rarity: 'common', color: 'black' },
        { name: 'drudge skeletons', rarity: 'common', color: 'black' },
        { name: 'evil presence', rarity: 'uncommon', color: 'black' },
        { name: 'fear', rarity: 'common', color: 'black' },
        { name: 'frozen shade', rarity: 'common', color: 'black' },
        { name: 'gloom', rarity: 'uncommon', color: 'black' },
        { name: 'howl from beyond', rarity: 'common', color: 'black' },
        { name: 'hypnotic specter', rarity: 'uncommon', color: 'black' },
        { name: 'lich', rarity: 'rare', color: 'black' },
        { name: 'lord of the pit', rarity: 'rare', color: 'black' },
        { name: 'mind twist', rarity: 'rare', color: 'black' },
        { name: 'nether shadow', rarity: 'rare', color: 'black' },
        { name: 'nettling imp', rarity: 'uncommon', color: 'black' },
        { name: 'nightmare', rarity: 'rare', color: 'black' },
        { name: 'paralyze', rarity: 'common', color: 'black' },
        { name: 'pestilence', rarity: 'common', color: 'black' },
        { name: 'plague rats', rarity: 'common', color: 'black' },
        { name: 'raise dead', rarity: 'common', color: 'black' },
        { name: 'royal assassin', rarity: 'rare', color: 'black' },
        { name: 'sacrifice', rarity: 'uncommon', color: 'black' },
        { name: 'scathe zombies', rarity: 'common', color: 'black' },
        { name: 'scavenging ghoul', rarity: 'uncommon', color: 'black' },
        { name: 'sengir vampire', rarity: 'uncommon', color: 'black' },
        { name: 'simulacrum', rarity: 'uncommon', color: 'black' },
        { name: 'sinkhole', rarity: 'common', color: 'black' },
        { name: 'terror', rarity: 'common', color: 'black' },
        { name: 'unholy strength', rarity: 'common', color: 'black' },
        { name: 'wall of bone', rarity: 'uncommon', color: 'black' },
        { name: 'warp artifact', rarity: 'rare', color: 'black' },
        { name: 'weakness', rarity: 'common', color: 'black' },
        { name: 'will-o-the-wisp', rarity: 'rare', color: 'black' },
        { name: 'word of command', rarity: 'rare', color: 'black' },
        { name: 'zombie master', rarity: 'rare', color: 'black' },
        { name: 'burrowing', rarity: 'uncommon', color: 'red' },
        { name: 'chaoslace', rarity: 'rare', color: 'red' },
        { name: 'disintegrate', rarity: 'common', color: 'red' },
        { name: 'dragon whelp', rarity: 'uncommon', color: 'red' },
        { name: 'dwarven demolition team', rarity: 'uncommon', color: 'red' },
        { name: 'dwarven warriors', rarity: 'common', color: 'red' },
        { name: 'earth elemental', rarity: 'uncommon', color: 'red' },
        { name: 'earthbind', rarity: 'common', color: 'red' },
        { name: 'earthquake', rarity: 'rare', color: 'red' },
        { name: 'false orders', rarity: 'common', color: 'red' },
        { name: 'fire elemental', rarity: 'uncommon', color: 'red' },
        { name: 'fireball', rarity: 'common', color: 'red' },
        { name: 'firebreathing', rarity: 'common', color: 'red' },
        { name: 'flashfires', rarity: 'uncommon', color: 'red' },
        { name: 'fork', rarity: 'rare', color: 'red' },
        { name: 'goblin balloon brigade', rarity: 'uncommon', color: 'red' },
        { name: 'goblin king', rarity: 'rare', color: 'red' },
        { name: 'granite gargoyle', rarity: 'rare', color: 'red' },
        { name: 'gray ogre', rarity: 'common', color: 'red' },
        { name: 'hill giant', rarity: 'common', color: 'red' },
        { name: 'hurloon minotaur', rarity: 'common', color: 'red' },
        { name: 'ironclaw orcs', rarity: 'common', color: 'red' },
        { name: 'keldon warlord', rarity: 'uncommon', color: 'red' },
        { name: 'lightning bolt', rarity: 'common', color: 'red' },
        { name: 'mana flare', rarity: 'rare', color: 'red' },
        { name: 'manabarbs', rarity: 'rare', color: 'red' },
        { name: "mons's goblin raiders", rarity: 'common', color: 'red' },
        { name: 'orcish artillery', rarity: 'uncommon', color: 'red' },
        { name: 'orcish oriflamme', rarity: 'uncommon', color: 'red' },
        { name: 'power surge', rarity: 'rare', color: 'red' },
        { name: 'raging river', rarity: 'rare', color: 'red' },
        { name: 'red elemental blast', rarity: 'common', color: 'red' },
        { name: 'roc of kher ridges', rarity: 'rare', color: 'red' },
        { name: 'rock hydra', rarity: 'rare', color: 'red' },
        { name: 'sedge troll', rarity: 'rare', color: 'red' },
        { name: 'shatter', rarity: 'common', color: 'red' },
        { name: 'shivan dragon', rarity: 'rare', color: 'red' },
        { name: 'smoke', rarity: 'rare', color: 'red' },
        { name: 'stone giant', rarity: 'uncommon', color: 'red' },
        { name: 'stone rain', rarity: 'common', color: 'red' },
        { name: 'tunnel', rarity: 'uncommon', color: 'red' },
        { name: 'two-headed giant of foriys', rarity: 'rare', color: 'red' },
        { name: 'uthden troll', rarity: 'uncommon', color: 'red' },
        { name: 'wall of fire', rarity: 'uncommon', color: 'red' },
        { name: 'wall of stone', rarity: 'uncommon', color: 'red' },
        { name: 'wheel of fortune', rarity: 'rare', color: 'red' },
        { name: 'aspect of the wolf', rarity: 'rare', color: 'green' },
        { name: 'berserk', rarity: 'uncommon', color: 'green' },
        { name: 'birds of paradise', rarity: 'rare', color: 'green' },
        { name: 'camouflage', rarity: 'uncommon', color: 'green' },
        { name: 'channel', rarity: 'uncommon', color: 'green' },
        { name: 'cockatrice', rarity: 'rare', color: 'green' },
        { name: 'craw wurm', rarity: 'common', color: 'green' },
        { name: 'elvish archers', rarity: 'rare', color: 'green' },
        { name: 'fastbond', rarity: 'rare', color: 'green' },
        { name: 'fog', rarity: 'common', color: 'green' },
        { name: 'force of nature', rarity: 'rare', color: 'green' },
        { name: 'fungusaur', rarity: 'rare', color: 'green' },
        { name: "gaea's liege", rarity: 'rare', color: 'green' },
        { name: 'giant growth', rarity: 'common', color: 'green' },
        { name: 'giant spider', rarity: 'common', color: 'green' },
        { name: 'grizzly bears', rarity: 'common', color: 'green' },
        { name: 'hurricane', rarity: 'uncommon', color: 'green' },
        { name: 'ice storm', rarity: 'uncommon', color: 'green' },
        { name: 'instill energy', rarity: 'uncommon', color: 'green' },
        { name: 'ironroot treefolk', rarity: 'common', color: 'green' },
        { name: 'kudzu', rarity: 'rare', color: 'green' },
        { name: 'ley druid', rarity: 'uncommon', color: 'green' },
        { name: 'lifeforce', rarity: 'uncommon', color: 'green' },
        { name: 'lifelace', rarity: 'rare', color: 'green' },
        { name: 'living artifact', rarity: 'rare', color: 'green' },
        { name: 'living lands', rarity: 'rare', color: 'green' },
        { name: 'llanowar elves', rarity: 'common', color: 'green' },
        { name: 'lure', rarity: 'uncommon', color: 'green' },
        { name: 'natural selection', rarity: 'rare', color: 'green' },
        { name: 'regeneration', rarity: 'common', color: 'green' },
        { name: 'regrowth', rarity: 'uncommon', color: 'green' },
        { name: 'scryb sprites', rarity: 'common', color: 'green' },
        { name: 'shanodin dryads', rarity: 'common', color: 'green' },
        { name: 'stream of life', rarity: 'common', color: 'green' },
        { name: 'thicket basilisk', rarity: 'uncommon', color: 'green' },
        { name: 'timber wolves', rarity: 'rare', color: 'green' },
        { name: 'tranquility', rarity: 'common', color: 'green' },
        { name: 'tsunami', rarity: 'uncommon', color: 'green' },
        { name: 'verduran enchantress', rarity: 'rare', color: 'green' },
        { name: 'wall of brambles', rarity: 'uncommon', color: 'green' },
        { name: 'wall of ice', rarity: 'uncommon', color: 'green' },
        { name: 'wall of wood', rarity: 'common', color: 'green' },
        { name: 'wanderlust', rarity: 'uncommon', color: 'green' },
        { name: 'war mammoth', rarity: 'uncommon', color: 'green' },
        { name: 'web', rarity: 'rare', color: 'green' },
        { name: 'wild growth', rarity: 'uncommon', color: 'green' },
        { name: 'ankh of mishra', rarity: 'rare', color: 'artifact' },
        { name: 'basalt monolith', rarity: 'uncommon', color: 'artifact' },
        { name: 'black lotus', rarity: 'rare', color: 'artifact' },
        { name: 'black vise', rarity: 'uncommon', color: 'artifact' },
        { name: 'celestial prism', rarity: 'uncommon', color: 'artifact' },
        { name: 'chaos orb', rarity: 'rare', color: 'artifact' },
        { name: 'clockwork beast', rarity: 'rare', color: 'artifact' },
        { name: 'conservator', rarity: 'uncommon', color: 'artifact' },
        { name: 'copper tablet', rarity: 'uncommon', color: 'artifact' },
        { name: 'crystal rod', rarity: 'uncommon', color: 'artifact' },
        { name: 'cyclopean tomb', rarity: 'rare', color: 'artifact' },
        { name: 'dingus egg', rarity: 'rare', color: 'artifact' },
        { name: 'disrupting scepter', rarity: 'rare', color: 'artifact' },
        { name: 'forcefield', rarity: 'rare', color: 'artifact' },
        { name: 'gauntlet of might', rarity: 'rare', color: 'artifact' },
        { name: 'glasses of urza', rarity: 'uncommon', color: 'artifact' },
        { name: 'helm of chatzuk', rarity: 'rare', color: 'artifact' },
        { name: 'howling mine', rarity: 'rare', color: 'artifact' },
        { name: 'icy manipulator', rarity: 'uncommon', color: 'artifact' },
        { name: 'illusionary mask', rarity: 'rare', color: 'artifact' },
        { name: 'iron star', rarity: 'uncommon', color: 'artifact' },
        { name: 'ivory cup', rarity: 'uncommon', color: 'artifact' },
        { name: 'jade monolith', rarity: 'uncommon', color: 'artifact' },
        { name: 'jade statue', rarity: 'rare', color: 'artifact' },
        { name: 'jayemdae tome', rarity: 'rare', color: 'artifact' },
        { name: 'juggernaut', rarity: 'uncommon', color: 'artifact' },
        { name: 'kormus bell', rarity: 'rare', color: 'artifact' },
        { name: 'library of leng', rarity: 'uncommon', color: 'artifact' },
        { name: 'living wall', rarity: 'uncommon', color: 'artifact' },
        { name: 'mana vault', rarity: 'rare', color: 'artifact' },
        { name: 'meekstone', rarity: 'rare', color: 'artifact' },
        { name: 'mox emerald', rarity: 'rare', color: 'artifact' },
        { name: 'mox jet', rarity: 'rare', color: 'artifact' },
        { name: 'mox pearl', rarity: 'rare', color: 'artifact' },
        { name: 'mox ruby', rarity: 'rare', color: 'artifact' },
        { name: 'mox sapphire', rarity: 'rare', color: 'artifact' },
        { name: "nevinyrral's disk", rarity: 'rare', color: 'artifact' },
        { name: 'obsianus golem', rarity: 'uncommon', color: 'artifact' },
        { name: 'rod of ruin', rarity: 'uncommon', color: 'artifact' },
        { name: 'sol ring', rarity: 'uncommon', color: 'artifact' },
        { name: 'soul net', rarity: 'uncommon', color: 'artifact' },
        { name: 'sunglasses of urza', rarity: 'rare', color: 'artifact' },
        { name: 'the hive', rarity: 'rare', color: 'artifact' },
        { name: 'throne of bone', rarity: 'uncommon', color: 'artifact' },
        { name: 'time vault', rarity: 'rare', color: 'artifact' },
        { name: 'winter orb', rarity: 'rare', color: 'artifact' },
        { name: 'wooden sphere', rarity: 'uncommon', color: 'artifact' },
        { name: 'badlands', rarity: 'rare', color: 'land' },
        { name: 'bayou', rarity: 'rare', color: 'land' },
        { name: 'plateau', rarity: 'rare', color: 'land' },
        { name: 'savannah', rarity: 'rare', color: 'land' },
        { name: 'scrubland', rarity: 'rare', color: 'land' },
        { name: 'taiga', rarity: 'rare', color: 'land' },
        { name: 'tropical island', rarity: 'rare', color: 'land' },
        { name: 'tundra', rarity: 'rare', color: 'land' },
        { name: 'underground sea', rarity: 'rare', color: 'land' },
    ]
}
