<template>
  <div class="w-80 flex flex-col items-center">
    <h1 class="text-2xl font-semibold text-slate-800">Log in</h1>
    <form action="" class="mt-6 flex flex-col gap-4">
      <div class="flex flex-col">
        <div class="flex justify-between">
          <label for="email" class="block text-sm font-medium text-slate-700">
            Email address
          </label>
          <!-- <div class="text-sm text-red-700">invalid email</div> -->
        </div>
        <input
          id="email"
          name="email"
          type="email"
          class="mt-1 w-full h-10 px-4 rounded border border-slate-200 text-lg"
        />
      </div>

      <div class="flex flex-col">
        <div class="flex justify-between">
          <label
            for="password"
            class="block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <!-- <div class="text-sm text-red-700">invalid password</div> -->
        </div>
        <input
          id="password"
          name="password"
          type="password"
          class="mt-1 w-full h-10 px-4 rounded border border-slate-200 text-lg"
        />
      </div>

      <div class="flex items-center justify-center">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          class="h-4 w-4 rounded border-slate-200 text-blue-600 focus:ring-blue-500"
        />
        <label
          for="remember"
          class="ml-2 block text-sm text-slate-900 select-none"
        >
          Remember me
        </label>
      </div>

      <div class="flex flex-col items-center gap-4">
        <div class="text-center text-sm text-slate-400">
          <span
            >Don't have an account?
            <NuxtLink to="/dashboard/signup" class="text-blue-500 underline">
              Sign up
            </NuxtLink>
          </span>
        </div>
        <DashboardButton>Login</DashboardButton>
      </div>
    </form>
  </div>
</template>
