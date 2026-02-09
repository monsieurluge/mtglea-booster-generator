window.addEventListener('DOMContentLoaded', generateBoosters)

const domElements = {
    boosters: document.getElementById('boosters'),
    boostersCount: document.getElementById('booster-count'),
}

const generator = BoosterGenerator({
    cardsList: set(),
    stats: {
        colorDistribution: {
            white: 1,
            blue: 1,
            black: 1,
            red: 1,
            green: 1,
            artifact: 0.8,
            land: 0.7,
        },
        rarityDistribution: {
            common: 11,
            uncommon: 3,
            rare: 1,
        },
    },
})

function BoosterGenerator({ cardsList, stats }) {
    const colors = ['white', 'blue', 'black', 'red', 'green', 'artifact', 'land']
    const colorWeights = Object.values(stats.colorDistribution)
    const totalWeight = colorWeights.reduce((a, b) => a + b, 0)
    const maxAttempts = 5

    function generate() {
        const commons = selectCards({
            pool: cardsList,
            targetRarity: 'common',
            total: stats.rarityDistribution.common,
        })
        const uncommons = selectCards({
            pool: cardsList,
            targetRarity: 'uncommon',
            total: stats.rarityDistribution.uncommon,
        })
        const rares = selectCards({
            pool: cardsList,
            targetRarity: 'rare',
            total: stats.rarityDistribution.rare,
        })
        return [...commons, ...uncommons, ...rares]
    }

    function selectCards({ pool, targetRarity, total }) {
        let cards = []
        for (let i = 0; i < total; i++) {
            const card = selectCard({
                pool,
                colorWeights,
                totalWeight,
                targetRarity,
            })
            cards.push(card)
        }
        return cards
    }

    function selectCard({ pool, targetRarity }) {
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
            const filteredCards = pool.filter(card => card.rarity === targetRarity && card.color === selectedColor)
            const selectedCard = filteredCards[Math.floor(Math.random() * filteredCards.length)]
            if (selectedCard) return selectedCard
        }
        throw new Error(`Failed to select a ${targetRarity} card after ${maxAttempts} attempts`)
    }

    return {
        generate,
    }
}

function generateBoosters() {
    const count = parseInt(domElements.boostersCount.value, 10) || 3
    const boosters = []
    for (let i = 0; i < count; i++) {
        boosters.push(generator.generate())
    }
    domElements.boosters.innerHTML = ''
    boosters.forEach(booster => {
        const element = createBoosterElement(booster)
        domElements.boosters.appendChild(element)
    })
}

function createBoosterElement(cards) {
    const listEl = document.createElement('ul')
    cards.forEach(card => {
        listEl.appendChild(createCardElement({ ...card }))
    })
    const boosterEl = document.createElement('div')
    boosterEl.classList.add('booster')
    boosterEl.appendChild(listEl)
    return boosterEl
}

function createCardElement({ color, cost, name }) {
    const template = document.querySelector('#card-template')
    const clone = document.importNode(template.content, true)
    const boxEl = clone.querySelector('.card-box')
    boxEl.classList.add(`color-${color}`)
    const costEl = clone.querySelector('.card-cost')
    createManaSymbolElements(cost).forEach(symbolEl => costEl.appendChild(symbolEl))
    const nameEl = clone.querySelector('.card-name')
    nameEl.textContent = name
    return clone
}

function createManaSymbolElements(cost) {
    const regex = /{([^}]+)}/g
    return [...cost.matchAll(regex)].map(match => createManaSymbolElement(match[1]))
}

function createManaSymbolElement(symbol) {
    const template = document.querySelector('#mana-symbol')
    const clone = document.importNode(template.content, true)
    const symbolEl = clone.querySelector('.mana-symbol')
    symbolEl.classList.add(`s${symbol.toLowerCase()}`)
    return symbolEl
}

function set() {
    return [
        { name: 'Animate Wall', type: 'enchantment', rarity: 'rare', color: 'white', cost: '{W}' },
        { name: 'Armageddon', type: 'sorcery', rarity: 'rare', color: 'white', cost: '{3}{W}' },
        { name: 'Balance', type: 'sorcery', rarity: 'rare', color: 'white', cost: '{1}{W}' },
        { name: 'Benalish Hero', type: 'creature', rarity: 'common', color: 'white', cost: '{W}' },
        { name: 'Black Ward', type: 'enchantment', rarity: 'uncommon', color: 'white', cost: '{W}' },
        { name: 'Blaze of Glory', type: 'instant', rarity: 'rare', color: 'white', cost: '{W}' },
        { name: 'Blessing', type: 'enchantment', rarity: 'rare', color: 'white', cost: '{W}{W}' },
        { name: 'Blue Ward', type: 'enchantment', rarity: 'uncommon', color: 'white', cost: '{W}' },
        { name: 'Castle', type: 'enchantment', rarity: 'uncommon', color: 'white', cost: '{3}{W}' },
        { name: 'Circle of Protection Blue', type: 'enchantment', rarity: 'common', color: 'white', cost: '{1}{W}' },
        { name: 'Circle of Protection Green', type: 'enchantment', rarity: 'common', color: 'white', cost: '{1}{W}' },
        { name: 'Circle of Protection Red', type: 'enchantment', rarity: 'common', color: 'white', cost: '{1}{W}' },
        { name: 'Circle of Protection White', type: 'enchantment', rarity: 'common', color: 'white', cost: '{1}{W}' },
        { name: 'Consecrate Land', type: 'enchantment', rarity: 'uncommon', color: 'white', cost: '{W}' },
        { name: 'Conversion', type: 'enchantment', rarity: 'uncommon', color: 'white', cost: '{2}{W}{W}' },
        { name: 'Crusade', type: 'enchantment', rarity: 'rare', color: 'white', cost: '{W}{W}' },
        { name: 'Death Ward', type: 'instant', rarity: 'common', color: 'white', cost: '{W}' },
        { name: 'Disenchant', type: 'instant', rarity: 'common', color: 'white', cost: '{1}{W}' },
        { name: 'Farmstead', type: 'enchantment', rarity: 'rare', color: 'white', cost: '{W}{W}{W}' },
        { name: 'Green Ward', type: 'enchantment', rarity: 'uncommon', color: 'white', cost: '{W}' },
        { name: 'Guardian Angel', type: 'instant', rarity: 'common', color: 'white', cost: '{X}{W}' },
        { name: 'Healing Salve', type: 'instant', rarity: 'common', color: 'white', cost: '{W}' },
        { name: 'Holy Armor', type: 'enchantment', rarity: 'common', color: 'white', cost: '{W}' },
        { name: 'Holy Strength', type: 'enchantment', rarity: 'common', color: 'white', cost: '{W}' },
        { name: 'Island Sanctuary', type: 'enchantment', rarity: 'rare', color: 'white', cost: '{1}{W}' },
        { name: 'Karma', type: 'enchantment', rarity: 'uncommon', color: 'white', cost: '{2}{W}{W}' },
        { name: 'Lance', type: 'enchantment', rarity: 'uncommon', color: 'white', cost: '{W}' },
        { name: 'Mesa Pegasus', type: 'creature', rarity: 'common', color: 'white', cost: '{1}{W}' },
        { name: 'Northern Paladin', type: 'creature', rarity: 'rare', color: 'white', cost: '{2}{W}{W}' },
        { name: 'Pearled Unicorn', type: 'creature', rarity: 'common', color: 'white', cost: '{2}{W}' },
        { name: 'Personal Incarnation', type: 'creature', rarity: 'rare', color: 'white', cost: '{3}{W}{W}{W}' },
        { name: 'Purelace', type: 'instant', rarity: 'rare', color: 'white', cost: '{W}' },
        { name: 'Red Ward', type: 'enchantment', rarity: 'uncommon', color: 'white', cost: '{W}' },
        { name: 'Resurrection', type: 'sorcery', rarity: 'uncommon', color: 'white', cost: '{2}{W}{W}' },
        { name: 'Reverse Damage', type: 'instant', rarity: 'rare', color: 'white', cost: '{1}{W}{W}' },
        { name: 'Righteousness', type: 'instant', rarity: 'rare', color: 'white', cost: '{W}' },
        { name: 'Samite Healer', type: 'creature', rarity: 'common', color: 'white', cost: '{1}{W}' },
        { name: 'Savannah Lions', type: 'creature', rarity: 'rare', color: 'white', cost: '{W}' },
        { name: 'Serra Angel', type: 'creature', rarity: 'uncommon', color: 'white', cost: '{3}{W}{W}' },
        { name: 'Swords to Plowshares', type: 'instant', rarity: 'uncommon', color: 'white', cost: '{W}' },
        { name: 'Veteran Bodyguard', type: 'creature', rarity: 'rare', color: 'white', cost: '{3}{W}{W}' },
        { name: 'Wall of Swords', type: 'creature', rarity: 'uncommon', color: 'white', cost: '{3}{W}' },
        { name: 'White Knight', type: 'creature', rarity: 'uncommon', color: 'white', cost: '{W}{W}' },
        { name: 'White Ward', type: 'enchantment', rarity: 'uncommon', color: 'white', cost: '{W}' },
        { name: 'Wrath of God', type: 'sorcery', rarity: 'rare', color: 'white', cost: '{2}{W}{W}' },
        { name: 'Air Elemental', type: 'creature', rarity: 'uncommon', color: 'blue', cost: '{3}{U}{U}' },
        { name: 'Ancestral Recall', type: 'instant', rarity: 'rare', color: 'blue', cost: '{U}' },
        { name: 'Animate Artifact', type: 'enchantment', rarity: 'uncommon', color: 'blue', cost: '{3}{U}' },
        { name: 'Blue Elemental Blast', type: 'instant', rarity: 'common', color: 'blue', cost: '{U}' },
        { name: 'Braingeyser', type: 'sorcery', rarity: 'rare', color: 'blue', cost: '{X}{U}{U}' },
        { name: 'Clone', type: 'creature', rarity: 'uncommon', color: 'blue', cost: '{3}{U}' },
        { name: 'Control Magic', type: 'enchantment', rarity: 'uncommon', color: 'blue', cost: '{2}{U}{U}' },
        { name: 'Copy Artifact', type: 'enchantment', rarity: 'rare', color: 'blue', cost: '{1}{U}' },
        { name: 'Counterspell', type: 'instant', rarity: 'uncommon', color: 'blue', cost: '{U}{U}' },
        { name: 'Creature Bond', type: 'enchantment', rarity: 'common', color: 'blue', cost: '{1}{U}' },
        { name: 'Drain Power', type: 'sorcery', rarity: 'rare', color: 'blue', cost: '{U}{U}' },
        { name: 'Feedback', type: 'enchantment', rarity: 'uncommon', color: 'blue', cost: '{2}{U}' },
        { name: 'Flight', type: 'enchantment', rarity: 'common', color: 'blue', cost: '{U}' },
        { name: 'Invisibility', type: 'enchantment', rarity: 'common', color: 'blue', cost: '{U}{U}' },
        { name: 'Jump', type: 'instant', rarity: 'common', color: 'blue', cost: '{U}' },
        { name: 'Lifetap', type: 'enchantment', rarity: 'uncommon', color: 'blue', cost: '{U}{U}' },
        { name: 'Lord of Atlantis', type: 'creature', rarity: 'rare', color: 'blue', cost: '{U}{U}' },
        { name: 'Magical Hack', type: 'instant', rarity: 'rare', color: 'blue', cost: '{U}' },
        { name: 'Mahamoti Djinn', type: 'creature', rarity: 'rare', color: 'blue', cost: '{4}{U}{U}' },
        { name: 'Mana Short', type: 'instant', rarity: 'rare', color: 'blue', cost: '{2}{U}' },
        { name: 'Merfolk of the Pearl Trident', type: 'creature', rarity: 'common', color: 'blue', cost: '{U}' },
        { name: 'Phantasmal Forces', type: 'creature', rarity: 'uncommon', color: 'blue', cost: '{3}{U}' },
        { name: 'Phantasmal Terrain', type: 'enchantment', rarity: 'common', color: 'blue', cost: '{U}{U}' },
        { name: 'Phantom Monster', type: 'creature', rarity: 'uncommon', color: 'blue', cost: '{3}{U}' },
        { name: 'Pirate Ship', type: 'creature', rarity: 'rare', color: 'blue', cost: '{4}{U}' },
        { name: 'Power Leak', type: 'enchantment', rarity: 'common', color: 'blue', cost: '{1}{U}' },
        { name: 'Power Sink', type: 'instant', rarity: 'common', color: 'blue', cost: '{X}{U}' },
        { name: 'Prodigal Sorcerer', type: 'creature', rarity: 'common', color: 'blue', cost: '{2}{U}' },
        { name: 'Psionic Blast', type: 'instant', rarity: 'uncommon', color: 'blue', cost: '{2}{U}' },
        { name: 'Psychic Venom', type: 'enchantment', rarity: 'common', color: 'blue', cost: '{1}{U}' },
        { name: 'Sea Serpent', type: 'creature', rarity: 'common', color: 'blue', cost: '{5}{U}' },
        { name: "Siren's Call", type: 'instant', rarity: 'uncommon', color: 'blue', cost: '{U}' },
        { name: 'Sleight of Mind', type: 'instant', rarity: 'rare', color: 'blue', cost: '{U}' },
        { name: 'Spell Blast', type: 'instant', rarity: 'common', color: 'blue', cost: '{X}{U}' },
        { name: 'Stasis', type: 'enchantment', rarity: 'rare', color: 'blue', cost: '{1}{U}' },
        { name: 'Steal Artifact', type: 'enchantment', rarity: 'uncommon', color: 'blue', cost: '{2}{U}{U}' },
        { name: 'Thoughtlace', type: 'instant', rarity: 'rare', color: 'blue', cost: '{U}' },
        { name: 'Time Walk', type: 'sorcery', rarity: 'rare', color: 'blue', cost: '{1}{U}' },
        { name: 'Timetwister', type: 'sorcery', rarity: 'rare', color: 'blue', cost: '{2}{U}' },
        { name: 'Twiddle', type: 'instant', rarity: 'common', color: 'blue', cost: '{U}' },
        { name: 'Unsummon', type: 'instant', rarity: 'common', color: 'blue', cost: '{U}' },
        { name: 'Vesuvan Doppleganger', type: 'creature', rarity: 'rare', color: 'blue', cost: '{3}{U}{U}' },
        { name: 'Volcanic Eruption', type: 'sorcery', rarity: 'rare', color: 'blue', cost: '{X}{U}{U}{U}' },
        { name: 'Wall of Air', type: 'creature', rarity: 'uncommon', color: 'blue', cost: '{1}{U}{U}' },
        { name: 'Wall of Water', type: 'creature', rarity: 'uncommon', color: 'blue', cost: '{1}{U}{U}' },
        { name: 'Water Elemental', type: 'creature', rarity: 'uncommon', color: 'blue', cost: '{3}{U}{U}' },
        { name: 'Animate Dead', type: 'enchantment', rarity: 'uncommon', color: 'black', cost: '{1}{B}' },
        { name: 'Bad Moon', type: 'enchantment', rarity: 'rare', color: 'black', cost: '{1}{B}' },
        { name: 'Black Knight', type: 'creature', rarity: 'uncommon', color: 'black', cost: '{B}{B}' },
        { name: 'Bog Wraith', type: 'creature', rarity: 'uncommon', color: 'black', cost: '{3}{B}' },
        { name: 'Cursed Land', type: 'enchantment', rarity: 'uncommon', color: 'black', cost: '{2}{B}{B}' },
        { name: 'Dark Ritual', type: 'instant', rarity: 'common', color: 'black', cost: '{B}' },
        { name: 'Deathgrip', type: 'enchantment', rarity: 'uncommon', color: 'black', cost: '{B}{B}' },
        { name: 'Deathlace', type: 'instant', rarity: 'rare', color: 'black', cost: '{B}' },
        { name: 'Demonic Hordes', type: 'creature', rarity: 'rare', color: 'black', cost: '{3}{B}{B}{B}' },
        { name: 'Demonic Tutor', type: 'sorcery', rarity: 'uncommon', color: 'black', cost: '{1}{B}' },
        { name: 'Drain Life', type: 'sorcery', rarity: 'common', color: 'black', cost: '{X}{1}{B}' },
        { name: 'Drudge Skeletons', type: 'creature', rarity: 'common', color: 'black', cost: '{1}{B}' },
        { name: 'Evil Presence', type: 'enchantment', rarity: 'uncommon', color: 'black', cost: '{B}' },
        { name: 'Fear', type: 'enchantment', rarity: 'common', color: 'black', cost: '{B}{B}' },
        { name: 'Frozen Shade', type: 'creature', rarity: 'common', color: 'black', cost: '{2}{B}' },
        { name: 'Gloom', type: 'enchantment', rarity: 'uncommon', color: 'black', cost: '{2}{B}' },
        { name: 'Howl From Beyond', type: 'instant', rarity: 'common', color: 'black', cost: '{X}{B}' },
        { name: 'Hypnotic Specter', type: 'creature', rarity: 'uncommon', color: 'black', cost: '{1}{B}{B}' },
        { name: 'Lich', type: 'creature', rarity: 'rare', color: 'black', cost: '{B}{B}{B}{B}' },
        { name: 'Lord of the Pit', type: 'creature', rarity: 'rare', color: 'black', cost: '{4}{B}{B}{B}' },
        { name: 'Mind Twist', type: 'sorcery', rarity: 'rare', color: 'black', cost: '{X}{B}' },
        { name: 'Nether Shadow', type: 'creature', rarity: 'rare', color: 'black', cost: '{B}{B}' },
        { name: 'Nettling Imp', type: 'creature', rarity: 'uncommon', color: 'black', cost: '{2}{B}' },
        { name: 'Nightmare', type: 'creature', rarity: 'rare', color: 'black', cost: '{5}{B}' },
        { name: 'Paralyze', type: 'enchantment', rarity: 'common', color: 'black', cost: '{B}' },
        { name: 'Pestilence', type: 'enchantment', rarity: 'common', color: 'black', cost: '{2}{B}{B}' },
        { name: 'Plague Rats', type: 'creature', rarity: 'common', color: 'black', cost: '{2}{B}' },
        { name: 'Raise Dead', type: 'sorcery', rarity: 'common', color: 'black', cost: '{B}' },
        { name: 'Royal Assassin', type: 'creature', rarity: 'rare', color: 'black', cost: '{1}{B}{B}' },
        { name: 'Sacrifice', type: 'insatnt', rarity: 'uncommon', color: 'black', cost: '{B}' },
        { name: 'Scathe Zombies', type: 'creature', rarity: 'common', color: 'black', cost: '{2}{B}' },
        { name: 'Scavenging Ghoul', type: 'creature', rarity: 'uncommon', color: 'black', cost: '{3}{B}' },
        { name: 'Sengir Vampire', type: 'creature', rarity: 'uncommon', color: 'black', cost: '{3}{B}{B}' },
        { name: 'Simulacrum', type: 'instant', rarity: 'uncommon', color: 'black', cost: '{1}{B}' },
        { name: 'Sinkhole', type: 'sorcery', rarity: 'common', color: 'black', cost: '{B}{B}' },
        { name: 'Terror', type: 'instant', rarity: 'common', color: 'black', cost: '{1}{B}' },
        { name: 'Unholy Strength', type: 'enchantment', rarity: 'common', color: 'black', cost: '{B}' },
        { name: 'Wall of Bone', type: 'creatyre', rarity: 'uncommon', color: 'black', cost: '{2}{B}' },
        { name: 'Warp Artifact', type: 'enchantment', rarity: 'rare', color: 'black', cost: '{B}{B}' },
        { name: 'Weakness', type: 'enchantment', rarity: 'common', color: 'black', cost: '{B}' },
        { name: 'Will-O-The-Wisp', type: 'creature', rarity: 'rare', color: 'black', cost: '{B}' },
        { name: 'Word of Command', type: 'instant', rarity: 'rare', color: 'black', cost: '{B}{B}' },
        { name: 'Zombie Master', type: 'creature', rarity: 'rare', color: 'black', cost: '{1}{B}{B}' },
        { name: 'Burrowing', type: 'enchantment', rarity: 'uncommon', color: 'red', cost: '{R}' },
        { name: 'Chaoslace', type: 'instant', rarity: 'rare', color: 'red', cost: '{R}' },
        { name: 'Disintegrate', type: 'sorcery', rarity: 'common', color: 'red', cost: '{X}{R}' },
        { name: 'Dragon Whelp', type: 'creature', rarity: 'uncommon', color: 'red', cost: '{2}{R}{R}' },
        { name: 'Dwarven Demolition Team', type: 'creature', rarity: 'uncommon', color: 'red', cost: '{2}{R}' },
        { name: 'Dwarven Warriors', type: 'creature', rarity: 'common', color: 'red', cost: '{2}{R}' },
        { name: 'Earth Elemental', type: 'creature', rarity: 'uncommon', color: 'red', cost: '{3}{R}{R}' },
        { name: 'Earthbind', type: 'enchantment', rarity: 'common', color: 'red', cost: '{R}' },
        { name: 'Earthquake', type: 'sorcery', rarity: 'rare', color: 'red', cost: '{X}{R}' },
        { name: 'False Orders', type: 'instant', rarity: 'common', color: 'red', cost: '{R}' },
        { name: 'Fire Elemental', type: 'creature', rarity: 'uncommon', color: 'red', cost: '{3}{R}{R}' },
        { name: 'Fireball', type: 'sorcery', rarity: 'common', color: 'red', cost: '{X}{R}' },
        { name: 'Firebreathing', type: 'enchantment', rarity: 'common', color: 'red', cost: '{R}' },
        { name: 'Flashfires', type: 'sorcery', rarity: 'uncommon', color: 'red', cost: '{3}{R}' },
        { name: 'Fork', type: 'instant', rarity: 'rare', color: 'red', cost: '{R}{R}' },
        { name: 'Goblin Balloon Brigade', type: 'creature', rarity: 'uncommon', color: 'red', cost: '{R}' },
        { name: 'Goblin King', type: 'creature', rarity: 'rare', color: 'red', cost: '{1}{R}{R}' },
        { name: 'Granite Gargoyle', type: 'creature', rarity: 'rare', color: 'red', cost: '{2}{R}' },
        { name: 'Gray Ogre', type: 'creature', rarity: 'common', color: 'red', cost: '{2}{R}' },
        { name: 'Hill Giant', type: 'creature', rarity: 'common', color: 'red', cost: '{3}{R}' },
        { name: 'Hurloon Minotaur', type: 'creature', rarity: 'common', color: 'red', cost: '{1}{R}{R}' },
        { name: 'Ironclaw Orcs', type: 'creature', rarity: 'common', color: 'red', cost: '{1}{R}' },
        { name: 'Keldon Warlord', type: 'creature', rarity: 'uncommon', color: 'red', cost: '{2}{R}{R}' },
        { name: 'Lightning Bolt', type: 'instant', rarity: 'common', color: 'red', cost: '{R}' },
        { name: 'Mana Flare', type: 'enchantment', rarity: 'rare', color: 'red', cost: '{2}{R}' },
        { name: 'Manabarbs', type: 'enchantment', rarity: 'rare', color: 'red', cost: '{3}{R}' },
        { name: "Mons's Goblin Raiders", type: 'creature', rarity: 'common', color: 'red', cost: '{R}' },
        { name: 'Orcish Artillery', type: 'creature', rarity: 'uncommon', color: 'red', cost: '{1}{R}{R}' },
        { name: 'Orcish Oriflamme', type: 'enchantment', rarity: 'uncommon', color: 'red', cost: '{3}{R}' },
        { name: 'Power Surge', type: 'enchantment', rarity: 'rare', color: 'red', cost: '{R}{R}' },
        { name: 'Raging River', type: 'enchantment', rarity: 'rare', color: 'red', cost: '{R}{R}' },
        { name: 'Red Elemental Blast', type: 'instant', rarity: 'common', color: 'red', cost: '{R}' },
        { name: 'Roc of Kher Ridges', type: 'creature', rarity: 'rare', color: 'red', cost: '{3}{R}' },
        { name: 'Rock Hydra', type: 'creature', rarity: 'rare', color: 'red', cost: '{X}{R}{R}' },
        { name: 'Sedge Troll', type: 'creature', rarity: 'rare', color: 'red', cost: '{2}{R}' },
        { name: 'Shatter', type: 'instant', rarity: 'common', color: 'red', cost: '{1}{R}' },
        { name: 'Shivan Dragon', type: 'creature', rarity: 'rare', color: 'red', cost: '{4}{R}{R}' },
        { name: 'Smoke', type: 'enchantment', rarity: 'rare', color: 'red', cost: '{R}{R}' },
        { name: 'Stone Giant', type: 'creature', rarity: 'uncommon', color: 'red', cost: '{2}{R}{R}' },
        { name: 'Stone Rain', type: 'sorcery', rarity: 'common', color: 'red', cost: '{2}{R}' },
        { name: 'Tunnel', type: 'creature', rarity: 'uncommon', color: 'red', cost: '{R}' },
        { name: 'Two-Headed Giant of Foriys', type: 'creature', rarity: 'rare', color: 'red', cost: '{4}{R}' },
        { name: 'Uthden Troll', type: 'creature', rarity: 'uncommon', color: 'red', cost: '{2}{R}' },
        { name: 'Wall of Fire', type: 'creature', rarity: 'uncommon', color: 'red', cost: '{1}{R}{R}' },
        { name: 'Wall of Stone', type: 'creature', rarity: 'uncommon', color: 'red', cost: '{1}{R}{R}' },
        { name: 'Wheel of Fortune', type: 'sorcery', rarity: 'rare', color: 'red', cost: '{2}{R}' },
        { name: 'Aspect of Wolf', type: 'enchantment', rarity: 'rare', color: 'green', cost: '{1}{G}' },
        { name: 'Berserk', type: 'instant', rarity: 'uncommon', color: 'green', cost: '{G}' },
        { name: 'Birds of Paradise', type: 'creature', rarity: 'rare', color: 'green', cost: '{G}' },
        { name: 'Camouflage', type: 'instant', rarity: 'uncommon', color: 'green', cost: '{G}' },
        { name: 'Channel', type: 'sorcery', rarity: 'uncommon', color: 'green', cost: '{G}{G}' },
        { name: 'Cockatrice', type: 'creature', rarity: 'rare', color: 'green', cost: '{3}{G}{G}' },
        { name: 'Craw Wurm', type: 'creature', rarity: 'common', color: 'green', cost: '{4}{G}{G}' },
        { name: 'Elvish Archers', type: 'creature', rarity: 'rare', color: 'green', cost: '{1}{G}' },
        { name: 'Fastbond', type: 'enchantment', rarity: 'rare', color: 'green', cost: '{G}' },
        { name: 'Fog', type: 'instant', rarity: 'common', color: 'green', cost: '{G}' },
        { name: 'Force of Nature', type: 'creature', rarity: 'rare', color: 'green', cost: '{2}{G}{G}{G}{G}' },
        { name: 'Fungusaur', type: 'creature', rarity: 'rare', color: 'green', cost: '{3}{G}' },
        { name: "Gaea's Liege", type: 'creature', rarity: 'rare', color: 'green', cost: '{3}{G}{G}{G}' },
        { name: 'Giant Growth', type: 'instant', rarity: 'common', color: 'green', cost: '{G}' },
        { name: 'Giant Spider', type: 'creature', rarity: 'common', color: 'green', cost: '{3}{G}' },
        { name: 'Grizzly Bears', type: 'creature', rarity: 'common', color: 'green', cost: '{1}{G}' },
        { name: 'Hurricane', type: 'sorcery', rarity: 'uncommon', color: 'green', cost: '{X}{G}' },
        { name: 'Ice Storm', type: 'sorcery', rarity: 'uncommon', color: 'green', cost: '{2}{G}' },
        { name: 'Instill Energy', type: 'enchantment', rarity: 'uncommon', color: 'green', cost: '{G}' },
        { name: 'Ironroot Treefolk', type: 'creature', rarity: 'common', color: 'green', cost: '{4}{G}' },
        { name: 'Kudzu', type: 'enchantment', rarity: 'rare', color: 'green', cost: '{1}{G}{G}' },
        { name: 'Ley Druid', type: 'creature', rarity: 'uncommon', color: 'green', cost: '{2}{G}' },
        { name: 'Lifeforce', type: 'enchantment', rarity: 'uncommon', color: 'green', cost: '{G}{G}' },
        { name: 'Lifelace', type: 'instant', rarity: 'rare', color: 'green', cost: '{G}' },
        { name: 'Living Artifact', type: 'enchantment', rarity: 'rare', color: 'green', cost: '{G}' },
        { name: 'Living Lands', type: 'enchantment', rarity: 'rare', color: 'green', cost: '{3}{G}' },
        { name: 'Llanowar Elves', type: 'creature', rarity: 'common', color: 'green', cost: '{G}' },
        { name: 'Lure', type: 'enchantment', rarity: 'uncommon', color: 'green', cost: '{1}{G}{G}' },
        { name: 'Natural Selection', type: 'instant', rarity: 'rare', color: 'green', cost: '{G}' },
        { name: 'Regeneration', type: 'enchantment', rarity: 'common', color: 'green', cost: '{1}{G}' },
        { name: 'Regrowth', type: 'sorcery', rarity: 'uncommon', color: 'green', cost: '{1}{G}' },
        { name: 'Scryb Sprites', type: 'creature', rarity: 'common', color: 'green', cost: '{G}' },
        { name: 'Shanodin Dryads', type: 'creature', rarity: 'common', color: 'green', cost: '{G}' },
        { name: 'Stream of Life', type: 'sorcery', rarity: 'common', color: 'green', cost: '{X}{G}' },
        { name: 'Thicket Basilisk', type: 'creature', rarity: 'uncommon', color: 'green', cost: '{3}{G}{G}' },
        { name: 'Timber Wolves', type: 'creature', rarity: 'rare', color: 'green', cost: '{G}' },
        { name: 'Tranquility', type: 'sorcery', rarity: 'common', color: 'green', cost: '{2}{G}' },
        { name: 'Tsunami', type: 'sorcery', rarity: 'uncommon', color: 'green', cost: '{3}{G}' },
        { name: 'Verduran Enchantress', type: 'creatyre', rarity: 'rare', color: 'green', cost: '{1}{G}{G}' },
        { name: 'Wall of Brambles', type: 'creature', rarity: 'uncommon', color: 'green', cost: '{2}{G}' },
        { name: 'Wall of Ice', type: 'creature', rarity: 'uncommon', color: 'green', cost: '{2}{G}' },
        { name: 'Wall of Wood', type: 'creature', rarity: 'common', color: 'green', cost: '{G}' },
        { name: 'Wanderlust', type: 'enchantment', rarity: 'uncommon', color: 'green', cost: '{2}{G}' },
        { name: 'War Mammoth', type: 'creature', rarity: 'uncommon', color: 'green', cost: '{3}{G}' },
        { name: 'Web', type: 'enchantment', rarity: 'rare', color: 'green', cost: '{G}' },
        { name: 'Wild Growth', type: 'enchantment', rarity: 'uncommon', color: 'green', cost: '{G}' },
        { name: 'Ankh of Mishra', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{2}' },
        { name: 'Basalt Monolith', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{3}' },
        { name: 'Black Lotus', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{0}' },
        { name: 'Black Vise', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{1}' },
        { name: 'Celestial Prism', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{3}' },
        { name: 'Chaos Orb', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{2}' },
        { name: 'Clockwork Beast', type: 'artifact creature', rarity: 'rare', color: 'artifact', cost: '{6}' },
        { name: 'Conservator', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{4}' },
        { name: 'Copper Tablet', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{2}' },
        { name: 'Crystal Rod', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{1}' },
        { name: 'Cyclopean Tomb', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{4}' },
        { name: 'Dingus Egg', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{4}' },
        { name: 'Disrupting Scepter', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{3}' },
        { name: 'Forcefield', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{3}' },
        { name: 'Gauntlet of Might', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{4}' },
        { name: 'Glasses of Urza', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{1}' },
        { name: 'Helm of Chatzuk', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{1}' },
        { name: 'Howling Mine', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{2}' },
        { name: 'Icy Manipulator', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{4}' },
        { name: 'Illusionary Mask', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{2}' },
        { name: 'Iron Star', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{1}' },
        { name: 'Ivory Cup', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{1}' },
        { name: 'Jade Monolith', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{4}' },
        { name: 'Jade Statue', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{4}' },
        { name: 'Jayemdae Tome', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{4}' },
        { name: 'Juggernaut', type: 'artifact creature', rarity: 'uncommon', color: 'artifact', cost: '{4}' },
        { name: 'Kormus Bell', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{4}' },
        { name: 'Library of Leng', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{1}' },
        { name: 'Living Wall', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{4}' },
        { name: 'Mana Vault', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{1}' },
        { name: 'Meekstone', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{1}' },
        { name: 'Mox Emerald', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{0}' },
        { name: 'Mox Jet', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{0}' },
        { name: 'Mox Pearl', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{0}' },
        { name: 'Mox Ruby', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{0}' },
        { name: 'Mox Sapphire', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{0}' },
        { name: "Nevinyrral's Disk", type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{4}' },
        { name: 'Obsianus Golem', type: 'artifact creature', rarity: 'uncommon', color: 'artifact', cost: '{6}' },
        { name: 'Rod of Ruin', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{4}' },
        { name: 'Sol Ring', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{1}' },
        { name: 'Soul Net', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{1}' },
        { name: 'Sunglasses of Urza', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{3}' },
        { name: 'The Hive', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{5}' },
        { name: 'Throne of Bone', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{1}' },
        { name: 'Time Vault', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{2}' },
        { name: 'Winter Orb', type: 'artifact', rarity: 'rare', color: 'artifact', cost: '{2}' },
        { name: 'Wooden Sphere', type: 'artifact', rarity: 'uncommon', color: 'artifact', cost: '{1}' },
        { name: 'Badlands', type: 'land', rarity: 'rare', color: '', cost: '' },
        { name: 'Bayou', type: 'land', rarity: 'rare', color: '', cost: '' },
        { name: 'Plateau', type: 'land', rarity: 'rare', color: '', cost: '' },
        { name: 'Savannah', type: 'land', rarity: 'rare', color: '', cost: '' },
        { name: 'Scrubland', type: 'land', rarity: 'rare', color: '', cost: '' },
        { name: 'Taiga', type: 'land', rarity: 'rare', color: '', cost: '' },
        { name: 'Tropical Island', type: 'land', rarity: 'rare', color: '', cost: '' },
        { name: 'Tundra', type: 'land', rarity: 'rare', color: '', cost: '' },
        { name: 'Underground Sea', type: 'land', rarity: 'rare', color: '', cost: '' },
    ]
}
