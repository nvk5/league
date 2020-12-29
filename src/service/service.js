export default class LeagueOfLegendsService {
    async getService(url) {
        const result = await fetch(url);
        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }
        return await result.json();
    }

    getAllChampions = async () => {
        const result = await this.getService('https://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion.json');

        const modifiedResult = Object.values(result.data).map(({ id, name, key, tags, title, info }) => {
            return {
                id, name, key, tags, title,
                difficulty: this._transformDifficulty(info),
                cardImage: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`,
                splashImage: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`
            }
        });

        return modifiedResult;
    }

    getChampionById = async id => {
        const result = await this.getService(`https://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/${id}.json`);

        const modifiedResult = Object.values(result.data).map(item => {
            const { blurb, lore, id, name, key, tags, skins, spells, passive, info, title } = item;

            return {
                blurb, lore, id, name, key, tags, title,
                skins: this._transfromSkins(skins, id, name),
                spells: this._transformSpells(spells, passive, key),
                difficulty: this._transformDifficulty(info),
                splashImage: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`
            }
        })

        return modifiedResult[0];
    }

    _transfromSkins = (champSkins, champId, champName) => {
        return champSkins.map(({ id: skinId, name: skinName, num: skinNum }) => {
            return {
                id: skinId,
                name: skinName === 'default' ? champName : skinName,
                num: skinNum,
                image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_${skinNum}.jpg`
            }
        })
    }

    _transformSpells = (champSpells, champPassive, champKey) => {
        const newSpellArr = [champPassive, ...champSpells];

        const transformSpellDescription = description => {
            const regExp = /<\/?.+?>/gi;
            return description.replace(regExp, '')
        }

        const transformSpellVideo = (key, label) => {
            const keyPattern = String(key).padStart(4, '0');
            const labelPattern = label === 'passive' ? 'P' : label;

            return [
                `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${keyPattern}/ability_${keyPattern}_${labelPattern}1.mp4`,
                `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${keyPattern}/ability_${keyPattern}_${labelPattern}1.webm`
            ]
        }

        const modifiedSpellArr = arr => {
            const hotKeys = ['passive', 'Q', 'W', 'E', 'R'];

            return arr.map(({ id, name, description, image: { full } }, i) => {
                const abilityClass = i === 0 ? 'passive' : 'spell';

                return {
                    id: id || name,
                    name,
                    description: transformSpellDescription(description),
                    image: `https://ddragon.leagueoflegends.com/cdn/10.25.1/img/${abilityClass}/${full}`,
                    activeKey: hotKeys[i],
                    video: transformSpellVideo(champKey, hotKeys[i])
                }
            })
        }

        return modifiedSpellArr(newSpellArr)
    }



    _transformDifficulty = ({ difficulty }) => {
        if (difficulty >= 1 && difficulty <= 3) {
            return 'low'
        }

        if (difficulty >= 4 && difficulty <= 7) {
            return 'moderate'
        }
        
        if (difficulty >= 8 && difficulty <= 10) {
            return 'high'
        }
    }
}


