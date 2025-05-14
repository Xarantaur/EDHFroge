<script lang="ts">
	export let data: {
		user: {
			id: string;
			email: string;
		};
	};
</script>

<p>Profile Management</p>
<ul>
    <li>
        Profile Management
✏️ “Edit profile” (change email, username, etc.)

🔐 Change password

📧 (Optional) Email preferences toggle
    </li>
    <p>security</p>
    <li>
       Security
🔍 Last login (or recent sessions)

📱 List of active sessions / devices (can log out of others)

🔄 Button to regenerate session (log out from everywhere)
    </li>
    <p>Personalization</p>
    <li>
        Personalization
🧙‍♂️ Avatar (Gravatar or uploaded)

🧾 Bio / About me

🎨 Theme or UI preferences (light/dark, card style, etc.)
    </li>
    <p>6. Danger Zone</p>
    <li>
        6. Danger Zone
❌ Delete account (with confirmation)

🚪 Log out of all sessions
    </li>
</ul>