<template>
  <div class="alerta rounded-md">
    <slot></slot>
  </div>
</template>

<style>
.alerta {
  text-align: center;
  margin-bottom: 0.5rem;
  color: #f1f1f1;
  background-color: #c04040;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.5rem;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
}
</style>
