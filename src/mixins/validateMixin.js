import {computed} from "vue";

export default function validateMixin() {
    /***
     * validate input
     * @param value
     * @return {string|boolean}
     */
    const validateInput = (value) => {
        if (!value) {
            return 'This field is required';
        }
        return true
    }

    /***
     * check password confirmation
     * @type {ComputedRef<boolean>}
     */
    const passwordMatchError = computed(() => {
        return info.password.value !== info.password_confirmation.value;
    })

    return {
        validateInput,
        passwordMatchError
    }
}