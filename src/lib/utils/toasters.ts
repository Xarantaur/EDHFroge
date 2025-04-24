import { toast } from '@zerodevx/svelte-toast';

export const successToast = (msg: string) =>
	toast.push(msg, {
		duration: 5000,
		theme: {
			'--toastBackground': '#d1fae5',
			'--toastColor': '#065f46',
			'--toastBarBackground': '#10b981'
		}
	});

export const errorToast = (msg: string) =>
	toast.push(msg, {
		duration: 5000,
		theme: {
			'--toastBackground': '#fee2e2',
			'--toastColor': '#7f1d1d',
			'--toastBarBackground': '#dc2626'
		}
	});
