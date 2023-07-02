export default {
    methods: {
        /**
         * check validate required
         * @param value
         * @returns
         */
        validateInput(value) {
            if (!value) {
                return 'This field is required';
            }
            return true
        },
    }
}