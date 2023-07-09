export default {
    methods:{
        /***
         * get name of type
         * @param type
         * @return {string}
         */
        getTypeName(type){
            if(type==1) return 'Weapon'
            if(type==2) return 'Shield'
            if(type==3) return 'Helmet'
            if(type==4) return 'Accessories'
        },

        /***
         * get name of rarity
         * @param rarity
         * @return {string}
         */
        getRarityName(rarity){
            if(rarity==1) return 'Common'
            if(rarity==2) return 'Fine'
            if(rarity==3) return 'Rare'
            if(rarity==4) return 'Epic'
        },

        /***
         * get all id & name type
         * @return {*}
         */
        getTypes(){
            return this.types
        },

        /***
         * get all id & name rarity
         * @return {*}
         */
        getRarity(){
            return this.rarity
        }
    }
}