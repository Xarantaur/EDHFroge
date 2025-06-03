import { writable } from "svelte/store";

type Toast = {
    id: number;
    message: string;
    type: 'success' | 'error';
}

const toasts = writable<Toast[]>([]);

function push(message: string, type: Toast['type']) {
    const id = Date.now();
    toasts.update((all) => [...all, {id, message, type}]);
    setTimeout(() => {
        toasts.update((all) => all.filter((t) => t.id !== id ));

    }, 3000);
}

export const toastStore = {
    subscribe: toasts.subscribe,
    success: (msg: string) => push(msg, 'success'),
    error: (msg: string) => push(msg, 'error'),
    push
}