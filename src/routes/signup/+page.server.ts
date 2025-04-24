import type { Actions } from './$types';

let users: { email: string; password: string }[] = [];

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const email = form.get('email')?.toString();
		const password = form.get('password')?.toString();
		const confirm = form.get('confirm')?.toString();

		if (!email || !password || !confirm) {
			return { error: 'All fields are required.' };
		}

		if (password !== confirm) {
			return { error: 'Passwords do not match.' };
		}

		const existingUser = users.find((u) => u.email === email);
		if (existingUser) {
			return { error: 'User already exists.' };
		}

		users.push({ email, password });
		console.log(users)
		return { success: true };
	}
	
};
