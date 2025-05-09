import type { PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'


export const load: PageServerLoad = ({ cookies }) => {
	const session = cookies.get('session');
	if (!session) {
		throw redirect(303, '/login');
	}
	return {
		user: session
	};
};