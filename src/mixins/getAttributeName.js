import {reactive} from "vue";
import types from "../attributes/TypeItem.js";
import rarity from "../attributes/RarityItem.js";

export default function getAttributeName() {
    const state = reactive({
        types: types,
        rarity: rarity
    })

    /***
     * get name of type
     * @param type
     * @return {string}
     */
    const getTypeName = (type) => {
        if (type == 1) return 'Weapon'
        if (type == 2) return 'Shield'
        if (type == 3) return 'Helmet'
        if (type == 4) return 'Accessories'
    }

    /***
     * get name of rarity
     * @param rarity
     * @return {string}
     */
    const getRarityName = (rarity) => {
        if (rarity == 1) return 'Common'
        if (rarity == 2) return 'Fine'
        if (rarity == 3) return 'Rare'
        if (rarity == 4) return 'Epic'
    }

    /***
     * get all id & name type
     * @return {*}
     */
    const getTypes = () => {
        return state.types
    }

    /***
     * get all id & name rarity
     * @return {*}
     */
    const getRarity = () => {
        return state.rarity
    }

    return {
        getTypes, getTypeName, getRarity, getRarityName
    }
}