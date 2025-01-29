<!-- src/components/WakeLockTester.vue -->
  
  <script setup>
  import { ref, onUnmounted } from 'vue';
  import { useWakeLock } from '../assets/wakeLock';
  
  const { requestWakeLock, releaseWakeLock } = useWakeLock();
  const status = ref('Kapalı');
  const isActive = ref(false);
  const minutes = ref(0);
  const seconds = ref(0);
  let timer = null;
  
  const startTimer = () => {
    timer = setInterval(() => {
      seconds.value++;
      if (seconds.value >= 60) {
        minutes.value++;
        seconds.value = 0;
      }
    }, 1000);
  };
  
  const stopTimer = () => {
    clearInterval(timer);
    minutes.value = 0;
    seconds.value = 0;
  };
  
  const activateWakeLock = async () => {
    try {
      await requestWakeLock();
      status.value = 'Aktif';
      isActive.value = true;
      startTimer();
    } catch (error) {
      status.value = 'Hata: ' + error.message;
    }
  };
  
  const deactivateWakeLock = async () => {
    await releaseWakeLock();
    status.value = 'Kapalı';
    isActive.value = false;
    stopTimer();
  };
  
  onUnmounted(() => {
    stopTimer();
    deactivateWakeLock();
  });
  </script>
  

  <template>
    <div class="wake-lock-tester">
      <h3>Wake Lock Test</h3>
      <div class="status">
        Durum: {{ status }}
      </div>
      <div class="buttons">
        <button @click="activateWakeLock">Wake Lock Aktif Et</button>
        <button @click="deactivateWakeLock">Wake Lock Kapat</button>
      </div>
      <div class="timer" v-if="isActive">
        Aktif Süre: {{ minutes }}:{{ seconds.toString().padStart(2, '0') }}
      </div>
    </div>
  </template>

  <style scoped>
  .wake-lock-tester {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 20px;
  }
  
  .status {
    margin: 10px 0;
    padding: 10px;
    background: #f0f0f0;
    border-radius: 4px;
  }
  
  .buttons {
    display: flex;
    gap: 10px;
    margin: 10px 0;
  }
  
  button {
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    background: #007bff;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background: #0056b3;
  }
  
  .timer {
    font-size: 1.2em;
    font-weight: bold;
    margin-top: 10px;
  }
  </style>
  