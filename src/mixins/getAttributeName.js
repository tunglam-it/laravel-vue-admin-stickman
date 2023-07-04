export default {
    methods:{
        /***
         * get name of type
         * @param type
         * @return {string}
         */
        getTypeName(type){
            if(type==0) return 'Weapon'
            if(type==1) return 'Shield'
            if(type==2) return 'Helmet'
            if(type==3) return 'Accessories'
        },

        /***
         * get name of rarity
         * @param rarity
         * @return {string}
         */
        getRarityName(rarity){
            if(rarity==0) return 'Common'
            if(rarity==1) return 'Fine'
            if(rarity==2) return 'Rare'
            if(rarity==3) return 'Epic'
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