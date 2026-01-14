<template>
  <div class="typing">
    <span></span><span></span><span></span>
  </div>
</template>

<style scoped>
.typing {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 14px;
  max-width: fit-content;
  background: #45375cdf;
}

.typing span {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  animation: bounce 1.2s infinite ease-in-out;
}

.typing span:nth-child(2) { animation-delay: 0.15s; }
.typing span:nth-child(3) { animation-delay: 0.30s; }

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
  40% { transform: translateY(-4px); opacity: 1; }
}
</style>
