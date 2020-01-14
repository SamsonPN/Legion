module.exports = {
    classes: {
        "Aran": 8,
        "Blaster": 10,
        "Dark Knight": 5,
        "Dawn Warrior": 7,
        "Demon Avenger": 11,
        "Demon Slayer": 15,
        "Hayato": 12,
        "Hero": 0,
        "Kaiser": 0,
        "Mihile": 7,
        "Paladin": 0,
        "Zero": 20,
        "Archmage Fire/Poison": 6,
        "Archmage Ice/Lightning": 2,
        "Bishop": 2,
        "Battle Mage": 2,
        "Beast Tamer": 10,
        "Blaze Wizard": 2,
        "Evan": 9,
        "Illium": 2,
        "Kanna": 11,
        "Kinesis": 2,
        "Luminous": 2,
        "Bow Master": 1,
        "Marksman": 13,
        "Mercedes": 17,
        "Pathfinder": 1,
        "Wild Hunter": 18,
        "Wind Archer": 1,
        "Cadena": 3,
        "Dual Blade": 3,
        "Ho Young": 3,
        "Night Lord": 13,
        "Night Walker": 3,
        "Phantom": 14,
        "Shadower": 3,
        "Xenon": 4,
        "Angelic Buster": 1,
        "Ark": 0,
        "Buccaneer": 0,
        "Cannoneer": 0,
        "Corsair": 19,
        "Jett": 12,
        "Mechanic": 16,
        "Shade": 12,
        "Thunder Breaker": 0
    },
    effects: [
        {
            effect: "STR +value",
            type: "Flat Stat"
        },
        {
            effect: "DEX +value",
            type: "Flat Stat"
        },
        {
            effect: "INT +value",
            type: "Flat Stat"
        },
        {
            effect: "LUK +value",
            type: "Flat Stat"
        },        
        {
            effect: "STR, DEX, and LUK +value",
            type: "Hybrid Stats"
        },
        {
            effect: "HP +value%",
            type: "HP/MP/Skill CD"
        },
        {
            effect: "MP +value%",
            type: "HP/MP/Skill CD"
        },
        {
            effect: "HP +value",
            type: "Flat HP/MP"
        },
        {
            effect: "70% to Recover value% of HP",
            type: "HP/MP Recovery"
        },
        {
            effect: "70% to Recover value% of MP",
            type: "HP/MP Recovery"
        },
        {
            effect: "IED +value%",
            type: "IED/BD/CD"
        },
        {
            effect: "Boss Damage +value%",
            type: "IED/BD/CD"
        },
        {
            effect: "Critical Damage +value%",
            type: "IED/BD/CD"
        },
        {
            effect: "Critical Rate +value%",
            type: "Crit/Meso/Status"
        },
        {
            effect: "Meso Rate +value%",
            type: "Crit/Meso/Status"
        },
        {
            effect: "Status Resistance +value",
            type: "Crit/Meso/Status"
        },
        {
            effect: "Buff Duration +value%",
            type: "Buff Duration"
        },
        {
            effect: "Reduce Skill Cooldown +value%",
            type: "HP/MP/Skill CD"
        },
        {
            effect: "20% to Boost Damage +value%",
            type: "Boost Damage"
        },
        {
            effect: "Summon Duration +value%",
            type: "Summon/EXP"
        },
        {
            effect: "Experience Rate +value%",
            type: "Summon/EXP"
        }
    ],
    values: {
        "Flat Stat": {
            B: 10,
            A: 20,
            S: 40,
            SS: 80,
            SSS: 100
        },
        "HP/MP Recovery": {
            B: 2,
            A: 4,
            S: 6,
            SS: 8,
            SSS: 10
        },
        "IED/BD/CD": {
            B: 1,
            A: 2,
            S: 3,
            SS: 5,
            SSS: 6
        },
        "Summon/EXP": {
            B: 4,
            A: 6,
            S: 8,
            SS: 10,
            SSS: 12
        },
        "HP/MP/Skill CD": {
            B: 2,
            A: 3,
            S: 4,
            SS: 5,
            SSS: 6
        },
        "Flat HP/MP": {
            B: 250,
            A: 500,
            S: 1000,
            SS: 2000,
            SSS: 2500
        },
        "Crit/Meso/Status": {
            B: 1,
            A: 2,
            S: 3,
            SS: 4,
            SSS: 5
        },
        "Buff Duration": {
            B: 5,
            A: 10,
            S: 15,
            SS: 20,
            SSS: 25
        },
        "Boost Damage": {
            B: 4,
            A: 8,
            S: 12,
            SS: 16,
            SSS: 20
        },
        "Hybrid Stats": {
            B: 5,
            A: 10,
            S: 20,
            SS: 40,
            SSS: 50
        }
    }
}