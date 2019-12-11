<template>
  <div>
    <h1>No id provided, return to home</h1>
    <nuxt-link
      :to="{ name: 'index' }"
    >
      <h1>
        Go
      </h1>
    </nuxt-link>
  </div>
</template>
