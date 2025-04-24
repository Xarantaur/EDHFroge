import type { Actions } from './$types';
import { users } from '$lib/stores/userStore';




export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const email = form.get('email')?.toString();
		const password = form.get('password')?.toString();

		if (!email || !password) {
			return { error: 'All fields are required.' };
		}

		const user = users.find((u) => u.email === email && u.password === password);
		if (!user) {
			return { error: 'Invalid email or password.' };
		}
        console.log(users)
		return { success: true };
	}
};
