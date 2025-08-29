<template>
  <footer class="footer-bar">
    <button class="footer-btn" @click="showTerms = true">Terms of Service</button>
    <button class="footer-btn" @click="showPrivacy = true">Privacy Policy</button>
    <span class="footer-disclaimer">All trademarks are property of Discord Inc.</span>
    <a class="footer-github" href="https://github.com/stmihan/ds-maker" target="_blank" rel="noopener">
      <img src="https://img.shields.io/badge/GitHub-ds--maker-181717?logo=github&style=for-the-badge" alt="GitHub repo" />
    </a>
  </footer>
  <div v-if="showTerms" class="footer-modal-bg" @click.self="showTerms = false">
    <div class="footer-modal">
      <h2>Terms of Service</h2>
      <div class="footer-modal-content">
        <p>This project is licensed under the MIT License. By using this site, you agree that:</p>
        <ul>
          <li>This project is not affiliated with, endorsed by, or associated with Discord Inc.</li>
          <li>All trademarks, service marks, and trade names are property of their respective owners, including Discord Inc.</li>
          <li>The software is provided "as is", without warranty of any kind.</li>
          <li>You may use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software under the MIT License.</li>
        </ul>
      </div>
      <button class="footer-modal-close" @click="showTerms = false">Close</button>
    </div>
  </div>
  <div v-if="showPrivacy" class="footer-modal-bg" @click.self="showPrivacy = false">
    <div class="footer-modal">
      <h2>Privacy Policy</h2>
      <div class="footer-modal-content">
        <p>This site does not collect, store, or share any personal data. All profile data is processed locally in your browser and is not transmitted to any server.</p>
        <ul>
          <li>This project is not affiliated with, endorsed by, or associated with Discord Inc.</li>
          <li>All trademarks, service marks, and trade names are property of their respective owners, including Discord Inc.</li>
          <li>This project is open source and licensed under the MIT License.</li>
        </ul>
      </div>
      <button class="footer-modal-close" @click="showPrivacy = false">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const showTerms = ref(false);
const showPrivacy = ref(false);
</script>

<style scoped>
.footer-bar {
  width: 100vw;
  max-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  background: #18191c;
  color: #aaa;
  font-size: 13px;
  padding: 18px 0 12px 0;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
}

.footer-disclaimer {
  margin-right: 18px;
  font-size: 13px;
  color: #aaa;
}

.footer-btn {
  background: #232428;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 13px;
  margin: 0 2px;
  cursor: pointer;
  transition: background 0.2s;
}

.footer-btn:hover {
  background: #5865f2;
}

.footer-github {
  margin-left: 18px;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.footer-github img {
  height: 28px;
}

.footer-modal-bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-modal {
  background: #232428;
  color: #fff;
  border-radius: 10px;
  padding: 28px 32px 22px 32px;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-modal h2 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 20px;
}

.footer-modal-content {
  font-size: 15px;
  margin-bottom: 18px;
}

.footer-modal-close {
  align-self: flex-end;
  background: #5865f2;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 18px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.footer-modal-close:hover {
  background: #4752c4;
}

@media (max-width: 600px) {
  .footer-bar {
    position: static;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    font-size: 12px;
    padding: 10px 0 8px 0;
  }

  .footer-disclaimer {
    margin: 0 0 4px 0;
    text-align: center;
    font-size: 12px;
  }

  .footer-btn {
    width: 100%;
    margin: 2px 0;
    font-size: 12px;
    padding: 7px 0;
  }

  .footer-github {
    margin: 8px auto 0 auto;
    justify-content: center;
  }

  .footer-github img {
    height: 22px;
  }
}
</style>