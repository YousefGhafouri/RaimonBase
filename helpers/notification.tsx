import { toast, ToastOptions } from 'react-toastify';

const options: ToastOptions = {
    position: 'top-center',
    autoClose: 5000,
    pauseOnHover: true,
    closeOnClick: true,
    hideProgressBar: false,
};

function RenderError({ msg }: { msg: string }) {
    return (
        <div>
            {msg.split('|').map((text) => (
                <div>{text}</div>
            ))}
        </div>
    );
}

export function $serverError(msg: string, userOptions?: ToastOptions) {
    toast.info(<RenderError msg={msg} />, { ...options, ...userOptions });
}
export function $error(msg: string, userOptions?: ToastOptions) {
    toast.error(msg, { ...options, ...userOptions });
}
export function $info(msg: string, userOptions?: ToastOptions) {
    toast.info(msg, { ...options, ...userOptions });
}
export function $success(msg: string, userOptions?: ToastOptions) {
    toast.success(msg, { ...options, ...userOptions });
}
export function $warning(msg: string, userOptions?: ToastOptions) {
    toast.warning(msg, { ...options, ...userOptions });
}
