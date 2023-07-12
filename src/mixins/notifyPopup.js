import {inject} from "vue";
import Swal from 'sweetalert2'

export default function notifyPopup() {
    // const swal = inject('$swal')
    const notifyAPI = (icon, title) => {
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }).fire({
            icon: icon,
            title: title
        })
    }
    return {
        notifyAPI
    }
}