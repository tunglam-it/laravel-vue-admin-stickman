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
    },
    computed: {
        /***
         * check password confirm
         * @return {boolean}
         */
        passwordMatchError() {
            return this.info.password !== this.info.password_confirmation;
        }
    },
}