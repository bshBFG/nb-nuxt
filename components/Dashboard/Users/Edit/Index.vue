<script setup lang="ts">
  import { User } from '.prisma/client'

  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

  interface Props {
    user: User
  }

  defineProps<Props>()
</script>

<template>
  <div class="w-full p-5 flex flex-col bg-white shadow-xl rounded-md">
    <TabGroup>
      <div class="flex justify-between">
        <TabList class="mb-6 flex">
          <Tab v-slot="{ selected }" as="template">
            <DashboardButton
              icon="i-tabler-user"
              size="large"
              :variant="selected ? 'primary' : 'poor-dark'"
              light
            >
              Аккаунт
            </DashboardButton>
          </Tab>

          <Tab v-slot="{ selected }" as="template">
            <DashboardButton
              icon="i-tabler-lock"
              size="large"
              :variant="selected ? 'primary' : 'poor-dark'"
              light
            >
              Безопасность
            </DashboardButton>
          </Tab>
        </TabList>

        <div>
          <DashboardButton
            icon="i-tabler-arrow-back-up"
            size="large"
            :variant="'outline-primary'"
            light
            to="/dashboard/users"
          >
            Назад
          </DashboardButton>
        </div>
      </div>

      <TabPanels>
        <TabPanel>
          <DashboardUsersEditMain :user="user" />
        </TabPanel>

        <TabPanel>
          <DashboardUsersEditSecurity :user="user" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
