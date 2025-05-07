<script lang="ts">
    export let form: any;
    export let data: { token: string };
  
    let password = '';
    let confirm = '';
    let token = data.token;

  </script>
  
  <div class="flex items-center justify-center min-h-screen bg-gray-50 pt-32">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Set a New Password</h1>
  
      <form method="POST" class="flex flex-col gap-4">
        <input type="hidden" name="token" value={token} />
  
        <input
          type="password"
          name="password"
          bind:value={password}
          placeholder="New Password"
          required
          class="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
  
        <input
          type="password"
          name="confirm"
          bind:value={confirm}
          placeholder="Confirm Password"
          required
          class="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
  
        <button
          type="submit"
          class="bg-orange-600 text-white p-3 rounded hover:bg-orange-700 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  </div>
  