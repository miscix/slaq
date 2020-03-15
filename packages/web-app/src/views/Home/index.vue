<template lang="pug">
  div
    the-greeting(:message="greeting")
    el-drawer(
      :visible="true"
      direction="rtl"
      :size="340"
    )
      div.content
        el-avatar(
          :size="300"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
        )

        h4 Nyx

        a(href="mailto:xxxx") nyx@gmail.com
</template>

<script src="./main.js"></script>

<style scoped></style>
