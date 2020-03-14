<template lang="pug">
  el-form(
    :model="form"
    :rules="rules"
    ref="form"
    hide-required-asterisk
  )
    el-form-item(
      label="Name"
      prop="name"
    )
      el-input(
        name="name"
        type="name"
        v-model="form.name"
      )

    el-form-item(
      label="Email"
      prop="email"
    )
      el-input(
        name="email"
        type="email"
        v-model="form.email"
      )

    el-form-item(
      label="Password"
      prop="password"
    )
      el-input(
        name="password"
        type="password"
        v-model="form.password"
        autocomplete="off"
      )
    el-form-item
      el-button(
        type="primary"
        @click="submitForm"
      )
        | Submit
</template>

<script src="./main.js"></script>
