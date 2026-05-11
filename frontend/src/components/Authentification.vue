<template>
  <div class="auth-overlay">
    <div class="auth-modal">
      <button class="auth-close" type="button" @click="$emit('close')" aria-label="Fermer">&times;</button>

      <div class="auth-tabs">
        <button class="auth-tab" :class="{ active: tab === 'login' }" @click="tab = 'login'">Connexion</button>
        <button class="auth-tab" :class="{ active: tab === 'signup' }" @click="tab = 'signup'">Inscription</button>
      </div>

      <form v-show="tab === 'login'" class="auth-form" @submit.prevent>
        <div class="auth-header">
          <h2>Connectez-vous</h2>
          <p class="auth-subtitle">Accedez a votre espace personnel</p>
        </div>

        <label class="auth-field">
          <span>Email</span>
          <input type="email" placeholder="vous@exemple.com" required />
        </label>

        <label class="auth-field">
          <span>Mot de passe</span>
          <input type="password" placeholder="Votre mot de passe" required />
        </label>

        <button class="auth-submit" type="submit">Se connecter</button>

        <p class="auth-switch">
          Pas encore de compte ?
          <button class="auth-link" @click="tab = 'signup'">Inscrivez-vous</button>
        </p>
      </form>

      <form v-show="tab === 'signup'" class="auth-form" @submit.prevent>
        <div class="auth-header">
          <h2>Creez un compte</h2>
          <p class="auth-subtitle">Rejoignez la communaute Botola Pro</p>
        </div>

        <label class="auth-field">
          <span>Nom complet</span>
          <input type="text" placeholder="Votre nom" required />
        </label>

        <label class="auth-field">
          <span>Email</span>
          <input type="email" placeholder="vous@exemple.com" required />
        </label>

        <label class="auth-field">
          <span>Mot de passe</span>
          <input type="password" placeholder="Minimum 8 caracteres" required />
        </label>

        <label class="auth-field">
          <span>Confirmer le mot de passe</span>
          <input type="password" placeholder="Confirmez votre mot de passe" required />
        </label>

        <label class="auth-checkbox">
          <input type="checkbox" required />
          <span>J'accepte les conditions d'utilisation et la politique de confidentialite</span>
        </label>

        <button class="auth-submit" type="submit">S'inscrire</button>

        <p class="auth-switch">
          Deja un compte ?
          <button class="auth-link" @click="tab = 'login'">Connectez-vous</button>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 'login',
    }
  },
}
</script>

<style scoped>
.auth-overlay {
  display: grid;
  place-items: center;
  padding: 20px;
  width: 100%;
}

.auth-modal {
  position: relative;
  width: 100%;
  max-width: 420px;
  border: 1px solid var(--line, rgba(18, 32, 23, 0.1));
  border-radius: 16px;
  background: var(--surface, #ffffff);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: modal-in 0.25s ease-out;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.auth-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--muted, #647067);
  cursor: pointer;
  font: inherit;
  font-size: 1.4rem;
  line-height: 1;
  transition: background 0.2s, color 0.2s;
}

.auth-close:hover {
  background: color-mix(in srgb, var(--danger, #c92f45) 12%, transparent);
  color: var(--danger, #c92f45);
}

.auth-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--line, rgba(18, 32, 23, 0.1));
}

.auth-tab {
  display: block;
  padding: 18px 16px 16px;
  border: 0;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  background: transparent;
  color: var(--muted, #647067);
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 850;
  text-align: center;
  letter-spacing: 0.02em;
  transition: color 0.25s, border-color 0.25s;
}

.auth-tab.active {
  color: var(--primary, #0f7a49);
  border-bottom-color: var(--primary, #0f7a49);
}

.auth-tab:hover {
  color: var(--primary, #0f7a49);
}

.auth-form {
  display: grid;
  gap: 16px;
  padding: 24px 28px 32px;
}

.auth-header {
  display: grid;
  gap: 4px;
}

.auth-form h2 {
  margin: 0;
  font-size: 1.35rem;
  line-height: 1.2;
}

.auth-subtitle {
  margin: 0;
  color: var(--muted, #647067);
  font-size: 0.88rem;
  line-height: 1.5;
}

.auth-field {
  display: grid;
  gap: 5px;
}

.auth-field span {
  font-size: 0.8rem;
  font-weight: 850;
  color: var(--text, #122017);
  letter-spacing: 0.01em;
}

.auth-field input {
  padding: 11px 14px;
  border: 1.5px solid var(--line, rgba(18, 32, 23, 0.1));
  border-radius: 10px;
  background: var(--bg, #f3f6f4);
  color: var(--text, #122017);
  font: inherit;
  font-size: 0.9rem;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.auth-field input:focus {
  outline: none;
  border-color: var(--primary, #0f7a49);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary, #0f7a49) 15%, transparent);
  background: var(--surface, #ffffff);
}

.auth-field input::placeholder {
  color: var(--muted, #647067);
}

.auth-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.8rem;
  color: var(--muted, #647067);
  line-height: 1.5;
  cursor: pointer;
}

.auth-checkbox input {
  margin-top: 3px;
  accent-color: var(--primary, #0f7a49);
  cursor: pointer;
}

.auth-submit {
  padding: 13px;
  margin-top: 4px;
  border: 0;
  border-radius: 10px;
  background: var(--primary, #0f7a49);
  color: #ffffff;
  cursor: pointer;
  font: inherit;
  font-size: 0.93rem;
  font-weight: 950;
  letter-spacing: 0.02em;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}

.auth-submit:hover {
  background: var(--primary-strong, #075f37);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px color-mix(in srgb, var(--primary, #0f7a49) 30%, transparent);
}

.auth-submit:active {
  transform: translateY(0);
}

.auth-submit:focus-visible {
  outline: 2px solid var(--primary, #0f7a49);
  outline-offset: 2px;
}

.auth-switch {
  margin: 4px 0 0;
  text-align: center;
  font-size: 0.86rem;
  color: var(--muted, #647067);
  line-height: 1.5;
}

.auth-link {
  display: inline;
  padding: 0;
  border: 0;
  background: none;
  color: var(--primary, #0f7a49);
  font: inherit;
  font-size: inherit;
  font-weight: 850;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.auth-link:hover {
  opacity: 0.75;
  text-decoration: underline;
}
</style>
