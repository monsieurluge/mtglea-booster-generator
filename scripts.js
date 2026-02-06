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
        { name: 'Animate Wall', rarity: 'rare', color: 'white' },
        { name: 'Armageddon', rarity: 'rare', color: 'white' },
        { name: 'Balance', rarity: 'rare', color: 'white' },
        { name: 'Benalish Hero', rarity: 'common', color: 'white' },
        { name: 'Black Ward', rarity: 'uncommon', color: 'white' },
        { name: 'Blaze of Glory', rarity: 'rare', color: 'white' },
        { name: 'Blessing', rarity: 'rare', color: 'white' },
        { name: 'Blue Ward', rarity: 'uncommon', color: 'white' },
        { name: 'Castle', rarity: 'uncommon', color: 'white' },
        { name: 'Circle of Protection Blue', rarity: 'common', color: 'white' },
        { name: 'Circle of Protection Green', rarity: 'common', color: 'white' },
        { name: 'Circle of Protection Red', rarity: 'common', color: 'white' },
        { name: 'Circle of Protection White', rarity: 'common', color: 'white' },
        { name: 'Consecrate Land', rarity: 'uncommon', color: 'white' },
        { name: 'Conversion', rarity: 'uncommon', color: 'white' },
        { name: 'Crusade', rarity: 'rare', color: 'white' },
        { name: 'Death Ward', rarity: 'common', color: 'white' },
        { name: 'Disenchant', rarity: 'common', color: 'white' },
        { name: 'Farmstead', rarity: 'rare', color: 'white' },
        { name: 'Green Ward', rarity: 'uncommon', color: 'white' },
        { name: 'Guardian Angel', rarity: 'common', color: 'white' },
        { name: 'Healing Salve', rarity: 'common', color: 'white' },
        { name: 'Holy Armor', rarity: 'common', color: 'white' },
        { name: 'Holy Strength', rarity: 'common', color: 'white' },
        { name: 'Island Sanctuary', rarity: 'rare', color: 'white' },
        { name: 'Karma', rarity: 'uncommon', color: 'white' },
        { name: 'Lance', rarity: 'uncommon', color: 'white' },
        { name: 'Mesa Pegasus', rarity: 'common', color: 'white' },
        { name: 'Northern Paladin', rarity: 'rare', color: 'white' },
        { name: 'Pearled Unicorn', rarity: 'common', color: 'white' },
        { name: 'Personal Incarnation', rarity: 'rare', color: 'white' },
        { name: 'Purelace', rarity: 'rare', color: 'white' },
        { name: 'Red Ward', rarity: 'uncommon', color: 'white' },
        { name: 'Resurrection', rarity: 'uncommon', color: 'white' },
        { name: 'Reverse Damage', rarity: 'rare', color: 'white' },
        { name: 'Righteousness', rarity: 'rare', color: 'white' },
        { name: 'Samite Healer', rarity: 'common', color: 'white' },
        { name: 'Savannah Lions', rarity: 'rare', color: 'white' },
        { name: 'Serra Angel', rarity: 'uncommon', color: 'white' },
        { name: 'Swords to Plowshares', rarity: 'uncommon', color: 'white' },
        { name: 'Veteran Bodyguard', rarity: 'rare', color: 'white' },
        { name: 'Wall of Swords', rarity: 'uncommon', color: 'white' },
        { name: 'White Knight', rarity: 'uncommon', color: 'white' },
        { name: 'White Ward', rarity: 'uncommon', color: 'white' },
        { name: 'Wrath of God', rarity: 'rare', color: 'white' },
        { name: 'Air Elemental', rarity: 'uncommon', color: 'blue' },
        { name: 'Ancestral Recall', rarity: 'rare', color: 'blue' },
        { name: 'Animate Artifact', rarity: 'uncommon', color: 'blue' },
        { name: 'Blue Elemental Blast', rarity: 'common', color: 'blue' },
        { name: 'Braingeyser', rarity: 'rare', color: 'blue' },
        { name: 'Clone', rarity: 'uncommon', color: 'blue' },
        { name: 'Control Magic', rarity: 'uncommon', color: 'blue' },
        { name: 'Copy Artifact', rarity: 'rare', color: 'blue' },
        { name: 'Counterspell', rarity: 'uncommon', color: 'blue' },
        { name: 'Creature Bond', rarity: 'common', color: 'blue' },
        { name: 'Drain Power', rarity: 'rare', color: 'blue' },
        { name: 'Feedback', rarity: 'uncommon', color: 'blue' },
        { name: 'Flight', rarity: 'common', color: 'blue' },
        { name: 'Invisibility', rarity: 'common', color: 'blue' },
        { name: 'Jump', rarity: 'common', color: 'blue' },
        { name: 'Lifetap', rarity: 'uncommon', color: 'blue' },
        { name: 'Lord of Atlantis', rarity: 'rare', color: 'blue' },
        { name: 'Magical Hack', rarity: 'rare', color: 'blue' },
        { name: 'Mahamoti Djinn', rarity: 'rare', color: 'blue' },
        { name: 'Mana Short', rarity: 'rare', color: 'blue' },
        { name: 'Merfolk of the Pearl Trident', rarity: 'common', color: 'blue' },
        { name: 'Phantasmal Forces', rarity: 'uncommon', color: 'blue' },
        { name: 'Phantasmal Terrain', rarity: 'common', color: 'blue' },
        { name: 'Phantom Monster', rarity: 'uncommon', color: 'blue' },
        { name: 'Pirate Ship', rarity: 'rare', color: 'blue' },
        { name: 'Power Leak', rarity: 'common', color: 'blue' },
        { name: 'Power Sink', rarity: 'common', color: 'blue' },
        { name: 'Prodigal Sorcerer', rarity: 'common', color: 'blue' },
        { name: 'Psionic Blast', rarity: 'uncommon', color: 'blue' },
        { name: 'Psychic Venom', rarity: 'common', color: 'blue' },
        { name: 'Sea Serpent', rarity: 'common', color: 'blue' },
        { name: "Siren's Call", rarity: 'uncommon', color: 'blue' },
        { name: 'Sleight of Mind', rarity: 'rare', color: 'blue' },
        { name: 'Spell Blast', rarity: 'common', color: 'blue' },
        { name: 'Stasis', rarity: 'rare', color: 'blue' },
        { name: 'Steal Artifact', rarity: 'uncommon', color: 'blue' },
        { name: 'Thoughtlace', rarity: 'rare', color: 'blue' },
        { name: 'Time Walk', rarity: 'rare', color: 'blue' },
        { name: 'Timetwister', rarity: 'rare', color: 'blue' },
        { name: 'Twiddle', rarity: 'common', color: 'blue' },
        { name: 'Unsummon', rarity: 'common', color: 'blue' },
        { name: 'Vesuvan Doppleganger', rarity: 'rare', color: 'blue' },
        { name: 'Volcanic Wruption', rarity: 'rare', color: 'blue' },
        { name: 'Wall of Air', rarity: 'uncommon', color: 'blue' },
        { name: 'Wall of Water', rarity: 'uncommon', color: 'blue' },
        { name: 'Water Elemental', rarity: 'uncommon', color: 'blue' },
        { name: 'Animate Dead', rarity: 'uncommon', color: 'black' },
        { name: 'Bad Moon', rarity: 'rare', color: 'black' },
        { name: 'Black Knight', rarity: 'uncommon', color: 'black' },
        { name: 'Bog Wraith', rarity: 'uncommon', color: 'black' },
        { name: 'Cursed Land', rarity: 'uncommon', color: 'black' },
        { name: 'Dark Ritual', rarity: 'common', color: 'black' },
        { name: 'Deathgrip', rarity: 'uncommon', color: 'black' },
        { name: 'Deathlace', rarity: 'rare', color: 'black' },
        { name: 'Demonic Hordes', rarity: 'rare', color: 'black' },
        { name: 'Demonic Tutor', rarity: 'uncommon', color: 'black' },
        { name: 'Drain Life', rarity: 'common', color: 'black' },
        { name: 'Drudge Skeletons', rarity: 'common', color: 'black' },
        { name: 'Evil Presence', rarity: 'uncommon', color: 'black' },
        { name: 'Fear', rarity: 'common', color: 'black' },
        { name: 'Frozen Shade', rarity: 'common', color: 'black' },
        { name: 'Gloom', rarity: 'uncommon', color: 'black' },
        { name: 'Howl From Beyond', rarity: 'common', color: 'black' },
        { name: 'Hypnotic Specter', rarity: 'uncommon', color: 'black' },
        { name: 'Lich', rarity: 'rare', color: 'black' },
        { name: 'Lord of the Pit', rarity: 'rare', color: 'black' },
        { name: 'Mind Twist', rarity: 'rare', color: 'black' },
        { name: 'Nether Shadow', rarity: 'rare', color: 'black' },
        { name: 'Nettling Imp', rarity: 'uncommon', color: 'black' },
        { name: 'Nightmare', rarity: 'rare', color: 'black' },
        { name: 'Paralyze', rarity: 'common', color: 'black' },
        { name: 'Pestilence', rarity: 'common', color: 'black' },
        { name: 'Plague Rats', rarity: 'common', color: 'black' },
        { name: 'Raise Dead', rarity: 'common', color: 'black' },
        { name: 'Royal Assassin', rarity: 'rare', color: 'black' },
        { name: 'Sacrifice', rarity: 'uncommon', color: 'black' },
        { name: 'Scathe Zombies', rarity: 'common', color: 'black' },
        { name: 'Scavenging Ghoul', rarity: 'uncommon', color: 'black' },
        { name: 'Sengir Vampire', rarity: 'uncommon', color: 'black' },
        { name: 'Simulacrum', rarity: 'uncommon', color: 'black' },
        { name: 'Sinkhole', rarity: 'common', color: 'black' },
        { name: 'Terror', rarity: 'common', color: 'black' },
        { name: 'Unholy Strength', rarity: 'common', color: 'black' },
        { name: 'Wall of Bone', rarity: 'uncommon', color: 'black' },
        { name: 'Warp Artifact', rarity: 'rare', color: 'black' },
        { name: 'Weakness', rarity: 'common', color: 'black' },
        { name: 'Will-O-The-Wisp', rarity: 'rare', color: 'black' },
        { name: 'Word of Command', rarity: 'rare', color: 'black' },
        { name: 'Zombie Master', rarity: 'rare', color: 'black' },
        { name: 'Burrowing', rarity: 'uncommon', color: 'red' },
        { name: 'Chaoslace', rarity: 'rare', color: 'red' },
        { name: 'Disintegrate', rarity: 'common', color: 'red' },
        { name: 'Dragon Whelp', rarity: 'uncommon', color: 'red' },
        { name: 'Dwarven Demolition Team', rarity: 'uncommon', color: 'red' },
        { name: 'Dwarven Warriors', rarity: 'common', color: 'red' },
        { name: 'Earth Elemental', rarity: 'uncommon', color: 'red' },
        { name: 'Earthbind', rarity: 'common', color: 'red' },
        { name: 'Earthquake', rarity: 'rare', color: 'red' },
        { name: 'False Orders', rarity: 'common', color: 'red' },
        { name: 'Fire Elemental', rarity: 'uncommon', color: 'red' },
        { name: 'Fireball', rarity: 'common', color: 'red' },
        { name: 'Firebreathing', rarity: 'common', color: 'red' },
        { name: 'Flashfires', rarity: 'uncommon', color: 'red' },
        { name: 'Fork', rarity: 'rare', color: 'red' },
        { name: 'Goblin Balloon Brigade', rarity: 'uncommon', color: 'red' },
        { name: 'Goblin King', rarity: 'rare', color: 'red' },
        { name: 'Granite Gargoyle', rarity: 'rare', color: 'red' },
        { name: 'Gray Ogre', rarity: 'common', color: 'red' },
        { name: 'Hill Giant', rarity: 'common', color: 'red' },
        { name: 'Hurloon Minotaur', rarity: 'common', color: 'red' },
        { name: 'Ironclaw Orcs', rarity: 'common', color: 'red' },
        { name: 'Keldon Warlord', rarity: 'uncommon', color: 'red' },
        { name: 'Lightning Bolt', rarity: 'common', color: 'red' },
        { name: 'Mana Flare', rarity: 'rare', color: 'red' },
        { name: 'Manabarbs', rarity: 'rare', color: 'red' },
        { name: "Mons's Goblin Raiders", rarity: 'common', color: 'red' },
        { name: 'Orcish Artillery', rarity: 'uncommon', color: 'red' },
        { name: 'Orcish Oriflamme', rarity: 'uncommon', color: 'red' },
        { name: 'Power Surge', rarity: 'rare', color: 'red' },
        { name: 'Raging River', rarity: 'rare', color: 'red' },
        { name: 'Red Elemental Blast', rarity: 'common', color: 'red' },
        { name: 'Roc of Kher Ridges', rarity: 'rare', color: 'red' },
        { name: 'Rock Hydra', rarity: 'rare', color: 'red' },
        { name: 'Sedge Troll', rarity: 'rare', color: 'red' },
        { name: 'Shatter', rarity: 'common', color: 'red' },
        { name: 'Shivan Dragon', rarity: 'rare', color: 'red' },
        { name: 'Smoke', rarity: 'rare', color: 'red' },
        { name: 'Stone Giant', rarity: 'uncommon', color: 'red' },
        { name: 'Stone Rain', rarity: 'common', color: 'red' },
        { name: 'Tunnel', rarity: 'uncommon', color: 'red' },
        { name: 'Two-Headed Giant of Foriys', rarity: 'rare', color: 'red' },
        { name: 'Uthden Troll', rarity: 'uncommon', color: 'red' },
        { name: 'Wall of Fire', rarity: 'uncommon', color: 'red' },
        { name: 'Wall of Stone', rarity: 'uncommon', color: 'red' },
        { name: 'Wheel of Fortune', rarity: 'rare', color: 'red' },
        { name: 'Aspect of the Wolf', rarity: 'rare', color: 'green' },
        { name: 'Berserk', rarity: 'uncommon', color: 'green' },
        { name: 'Birds of Paradise', rarity: 'rare', color: 'green' },
        { name: 'Camouflage', rarity: 'uncommon', color: 'green' },
        { name: 'Channel', rarity: 'uncommon', color: 'green' },
        { name: 'Cockatrice', rarity: 'rare', color: 'green' },
        { name: 'Craw Wurm', rarity: 'common', color: 'green' },
        { name: 'Elvish Archers', rarity: 'rare', color: 'green' },
        { name: 'Fastbond', rarity: 'rare', color: 'green' },
        { name: 'Fog', rarity: 'common', color: 'green' },
        { name: 'Force of Nature', rarity: 'rare', color: 'green' },
        { name: 'Fungusaur', rarity: 'rare', color: 'green' },
        { name: "Gaea's Liege", rarity: 'rare', color: 'green' },
        { name: 'Giant Growth', rarity: 'common', color: 'green' },
        { name: 'Giant Spider', rarity: 'common', color: 'green' },
        { name: 'Grizzly Bears', rarity: 'common', color: 'green' },
        { name: 'Hurricane', rarity: 'uncommon', color: 'green' },
        { name: 'Ice Storm', rarity: 'uncommon', color: 'green' },
        { name: 'Instill Energy', rarity: 'uncommon', color: 'green' },
        { name: 'Ironroot Treefolk', rarity: 'common', color: 'green' },
        { name: 'Kudzu', rarity: 'rare', color: 'green' },
        { name: 'Ley Druid', rarity: 'uncommon', color: 'green' },
        { name: 'Lifeforce', rarity: 'uncommon', color: 'green' },
        { name: 'Lifelace', rarity: 'rare', color: 'green' },
        { name: 'Living Artifact', rarity: 'rare', color: 'green' },
        { name: 'Living Lands', rarity: 'rare', color: 'green' },
        { name: 'Llanowar Elves', rarity: 'common', color: 'green' },
        { name: 'Lure', rarity: 'uncommon', color: 'green' },
        { name: 'Natural Selection', rarity: 'rare', color: 'green' },
        { name: 'Regeneration', rarity: 'common', color: 'green' },
        { name: 'Regrowth', rarity: 'uncommon', color: 'green' },
        { name: 'Scryb Sprites', rarity: 'common', color: 'green' },
        { name: 'Shanodin Dryads', rarity: 'common', color: 'green' },
        { name: 'Stream of Life', rarity: 'common', color: 'green' },
        { name: 'Thicket Basilisk', rarity: 'uncommon', color: 'green' },
        { name: 'Timber Wolves', rarity: 'rare', color: 'green' },
        { name: 'Tranquility', rarity: 'common', color: 'green' },
        { name: 'Tsunami', rarity: 'uncommon', color: 'green' },
        { name: 'Verduran Enchantress', rarity: 'rare', color: 'green' },
        { name: 'Wall of Brambles', rarity: 'uncommon', color: 'green' },
        { name: 'Wall of Ice', rarity: 'uncommon', color: 'green' },
        { name: 'Wall of Wood', rarity: 'common', color: 'green' },
        { name: 'Wanderlust', rarity: 'uncommon', color: 'green' },
        { name: 'War Mammoth', rarity: 'uncommon', color: 'green' },
        { name: 'Web', rarity: 'rare', color: 'green' },
        { name: 'Wild Growth', rarity: 'uncommon', color: 'green' },
        { name: 'Ankh of Mishra', rarity: 'rare', color: 'artifact' },
        { name: 'Basalt Monolith', rarity: 'uncommon', color: 'artifact' },
        { name: 'Black Lotus', rarity: 'rare', color: 'artifact' },
        { name: 'Black Vise', rarity: 'uncommon', color: 'artifact' },
        { name: 'Celestial Prism', rarity: 'uncommon', color: 'artifact' },
        { name: 'Chaos Orb', rarity: 'rare', color: 'artifact' },
        { name: 'Clockwork Beast', rarity: 'rare', color: 'artifact' },
        { name: 'Conservator', rarity: 'uncommon', color: 'artifact' },
        { name: 'Copper Tablet', rarity: 'uncommon', color: 'artifact' },
        { name: 'Crystal Rod', rarity: 'uncommon', color: 'artifact' },
        { name: 'Cyclopean Tomb', rarity: 'rare', color: 'artifact' },
        { name: 'Dingus Egg', rarity: 'rare', color: 'artifact' },
        { name: 'Disrupting Scepter', rarity: 'rare', color: 'artifact' },
        { name: 'Forcefield', rarity: 'rare', color: 'artifact' },
        { name: 'Gauntlet of Might', rarity: 'rare', color: 'artifact' },
        { name: 'Glasses of Urza', rarity: 'uncommon', color: 'artifact' },
        { name: 'Helm of Chatzuk', rarity: 'rare', color: 'artifact' },
        { name: 'Howling Mine', rarity: 'rare', color: 'artifact' },
        { name: 'Icy Manipulator', rarity: 'uncommon', color: 'artifact' },
        { name: 'Illusionary Mask', rarity: 'rare', color: 'artifact' },
        { name: 'Iron Star', rarity: 'uncommon', color: 'artifact' },
        { name: 'Ivory Cup', rarity: 'uncommon', color: 'artifact' },
        { name: 'Jade Monolith', rarity: 'uncommon', color: 'artifact' },
        { name: 'Jade Statue', rarity: 'rare', color: 'artifact' },
        { name: 'Jayemdae Tome', rarity: 'rare', color: 'artifact' },
        { name: 'Juggernaut', rarity: 'uncommon', color: 'artifact' },
        { name: 'Kormus Bell', rarity: 'rare', color: 'artifact' },
        { name: 'Library of Leng', rarity: 'uncommon', color: 'artifact' },
        { name: 'Living Wall', rarity: 'uncommon', color: 'artifact' },
        { name: 'Mana Vault', rarity: 'rare', color: 'artifact' },
        { name: 'Meekstone', rarity: 'rare', color: 'artifact' },
        { name: 'Mox Emerald', rarity: 'rare', color: 'artifact' },
        { name: 'Mox Jet', rarity: 'rare', color: 'artifact' },
        { name: 'Mox Pearl', rarity: 'rare', color: 'artifact' },
        { name: 'Mox Ruby', rarity: 'rare', color: 'artifact' },
        { name: 'Mox Sapphire', rarity: 'rare', color: 'artifact' },
        { name: "Nevinyrral's Disk", rarity: 'rare', color: 'artifact' },
        { name: 'Obsianus Golem', rarity: 'uncommon', color: 'artifact' },
        { name: 'Rod of Ruin', rarity: 'uncommon', color: 'artifact' },
        { name: 'Sol Ring', rarity: 'uncommon', color: 'artifact' },
        { name: 'Soul Net', rarity: 'uncommon', color: 'artifact' },
        { name: 'Sunglasses of Urza', rarity: 'rare', color: 'artifact' },
        { name: 'The Hive', rarity: 'rare', color: 'artifact' },
        { name: 'Throne of Bone', rarity: 'uncommon', color: 'artifact' },
        { name: 'Time Vault', rarity: 'rare', color: 'artifact' },
        { name: 'Winter Orb', rarity: 'rare', color: 'artifact' },
        { name: 'Wooden Sphere', rarity: 'uncommon', color: 'artifact' },
        { name: 'Badlands', rarity: 'rare', color: 'land' },
        { name: 'Bayou', rarity: 'rare', color: 'land' },
        { name: 'Plateau', rarity: 'rare', color: 'land' },
        { name: 'Savannah', rarity: 'rare', color: 'land' },
        { name: 'Scrubland', rarity: 'rare', color: 'land' },
        { name: 'Taiga', rarity: 'rare', color: 'land' },
        { name: 'Tropical Island', rarity: 'rare', color: 'land' },
        { name: 'Tundra', rarity: 'rare', color: 'land' },
        { name: 'Underground Sea', rarity: 'rare', color: 'land' },
    ]
}
