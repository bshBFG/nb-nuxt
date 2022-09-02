<template>
  <div class="w-80 flex flex-col items-center">
    <h1 class="text-2xl font-semibold text-slate-800">Sign up</h1>
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
      <div class="flex flex-col items-center gap-4">
        <div class="text-center text-sm text-slate-400">
          <span
            >Already have an account?
            <NuxtLink to="/dashboard/login" class="text-blue-500 underline">
              Log in
            </NuxtLink>
          </span>
        </div>
        <DashboardButton>Signup</DashboardButton>
      </div>
    </form>
  </div>
</template>
