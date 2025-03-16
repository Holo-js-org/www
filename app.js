import { Holo, Router } from 'holo-js';
import 'beercss';
import 'material-dynamic-colors';
const app = Holo.init(false); // force debug mode, to try DevTools :)
app.setTitle("Holo.js - Effortlessly elegant web development");
app.registerComponent({
  name: 'nav-bar',
  render: () => `
<nav class="m l left">
  <div class="circle small">
    <a href="/" ${window.location.hash === "#/" ? "class='active'" : ""} data-router-link>
      <img src="https://avatars.githubusercontent.com/u/203007511?s=50" alt="Logo">
    </a>
  </div>
  <a href="/features" ${window.location.hash === "#/features" ? "class='active'" : ""} data-router-link>
    <i>star</i>
    <span>Features</span>
  </a>
  <a href="/examples" ${window.location.hash === "#/examples" ? "class='active'" : ""} data-router-link>
    <i>code</i>
    <span>Examples</span>
  </a>
  <a href="/get-started" ${window.location.hash === "#/get-started" ? "class='active'" : ""} data-router-link>
    <i>play_arrow</i>
    <span>Install</span>
  </a>
  <div onclick="${app.state.mode === "dark" ? "app.state.mode = 'light'" : "app.state.mode = 'dark'"}" class="circle small">
    <i>${app.state.mode === "dark" ? "light_mode" : "dark_mode"}</i>
  </div>
</nav>
<nav class="s bottom">
    <a href="/" ${window.location.hash === "#/" || window.location.hash === "" ? "class='active'" : ""} data-router-link>
      <i>home</i>
      <span>Home</span>
    </a>
  <a href="/features" ${window.location.hash === "#/features" ? "class='active'" : ""} data-router-link>
    <i>star</i>
    <span>Features</span>
  </a>
  <a href="/examples" ${window.location.hash === "#/examples" ? "class='active'" : ""} data-router-link>
    <i>code</i>
    <span>Examples</span>
  </a>
  <a href="/get-started" ${window.location.hash === "#/get-started" ? "class='active'" : ""} data-router-link>
    <i>play_arrow</i>
    <span>Install</span>
  </a>
<div onclick="${app.state.mode === "dark" ? "app.state.mode = 'light'" : "app.state.mode = 'dark'"}" class="circle small">
    <i>${app.state.mode === "dark" ? "light_mode" : "dark_mode"}</i>
  </div>
</nav>
  `
});

app.registerComponent({
  name: 'feature-card',
  render: (attributes, inner) => {
    const attrs = attributes ? attributes.match(/(\w+)="([^"]+)"/g) : [];
    let icon = '', title = '', description = '';
    
    attrs.forEach(attr => {
      const [key, value] = attr.replace(/"/g, '').split('=');
      if (key === 'icon') icon = value;
      if (key === 'title') title = value;
      if (key === 'description') description = value;
    });
    
    return `
      <article class="border round feature-card">
      <div class="idk">
      <div class="card">
      <div class="card-body">
      <div class="padding">
        <div class="feature-icon responsive">${icon}</div>
        <h5>${title}</div>
        <div class="feature-description">${description}</div>
        </div>
        </div>
        </div>
        </div>
      </article>
    `;
  }
});

app.registerComponent({
  name: 'code-block',
  render: (_, inner) => `
    <pre class="code-example">${inner}</pre>
  `
});

const router = new Router({ mode: "hash" });
router.setHoloInstance(app);
router.setContainer("#h-app");

router.add("/", `
  <nav-bar></nav-bar>
  
  <section id="hero">
    <img src="banner.png"></img>
    <p class="subtitle">A minimal, elegant framework for the modern web</p>
    <p class="tagline">Build beautiful reactive interfaces with just {codeSize} lines of JS</p>
    <div class="buttons">
      <a href="/get-started" class="button primary" data-router-link>Get Started</a>
      <a href="https://github.com/holo-js-org" class="button secondary">View on GitHub</a>
    </div>
  </section>
  
  <section id="features">
    <h2>Lightweight. Intuitive. Powerful.</h2>
    <div class="feature-grid">
      <feature-card icon="⚡" title="Lightning Fast" description="Minimal overhead with reactive updates only where needed"></feature-card>
      <feature-card icon="🧩" title="Component-Based" description="Build reusable components with elegant APIs"></feature-card>
      <feature-card icon="🔄" title="Reactive State" description="Simple state management that just works"></feature-card>
      <feature-card icon="🛣️" title="Built-in Router" description="Client-side routing with minimal configuration"></feature-card>
    </div>
  </section>
  
  <section id="examples">
    <h2>Elegant Simplicity</h2>
    <p class="tagline">Build an entire app in minutes, not hours</p>
    <code-block>
const app = Holo.init();
app.state.counter = 0;
app.registerComponent({
  name: 'counter-app',
  render: () => \`
    &lt;div&gt;
      &lt;h3&gt;Count: {counter}&lt;/h3&gt;
      &lt;button onclick="increment()"&gt;Increment&lt;/button&gt;
    &lt;/div&gt;
  \`
});

app.expose(function increment() {
  app.state.counter++;
});

app.render('&lt;counter-app&gt;&lt;/counter-app&gt;', '#app');
    </code-block>
  </section>
  
  <section id="get-started">
    <h2>Get Started</h2>
    <p class="tagline">Ready to build something amazing?</p>
    <code-block>npm install holo-js</code-block>
    <div class="buttons">
      <a href="https://github.com/holo-js-org/holo" class="button primary">GitHub Repo</a>
      <a href="https://github.com/holo-js-org/holo/tree/main/test" class="button secondary">Example</a>
    </div>
  </section>
  
  <footer>
    <p>Made with ❤️ by the community.</p>
  </footer>
`);

router.add("/features", `
  <nav-bar></nav-bar>
  <section>
    <h2>Features</h2>
    <div class="feature-grid">
      <feature-card icon="⚡" title="Lightning Fast" description="Minimal overhead with reactive updates only where needed"></feature-card>
      <feature-card icon="🧩" title="Component-Based" description="Build reusable components with elegant APIs"></feature-card>
      <feature-card icon="🔄" title="Reactive State" description="Simple state management that just works"></feature-card>
      <feature-card icon="🛣️" title="Built-in Router" description="Client-side routing with minimal configuration"></feature-card>
      <feature-card icon="💾" title="Storage Management" description="Easy local storage with the built-in saves API"></feature-card>
      <feature-card icon="🔧" title="No Build Step" description="Use directly in the browser without complex tooling"></feature-card>
    </div>
  </section>
`);

router.add("/examples", `
  <nav-bar></nav-bar>
  <section>
    <h2>Examples</h2>
    <p class="tagline">Explore what's possible with Holo.js</p>
    <code-block>
// Todo App Example
app.state.todos = [];
app.state.newTodo = '';

app.registerComponent({
  name: 'todo-app',
  render: () => \`
    &lt;div&gt;
      &lt;h3&gt;Todo List ({todos.length})&lt;/h3&gt;
      &lt;input 
        type="text" 
        value="{newTodo}" 
        onchange="updateNewTodo(event)"
        placeholder="What needs to be done?"&gt;
      &lt;button onclick="addTodo()"&gt;Add&lt;/button&gt;
      &lt;ul&gt;
        \${app.state.todos.map((todo, i) => \`
          &lt;li&gt;
            \${todo} 
            &lt;button onclick="removeTodo(\${i})"&gt;✓&lt;/button&gt;
          &lt;/li&gt;
        \`).join('')}
      &lt;/ul&gt;
    &lt;/div&gt;
  \`
});

app.expose(function updateNewTodo(event) {
  app.state.newTodo = event.target.value;
});

app.expose(function addTodo() {
  if (app.state.newTodo.trim()) {
    app.state.todos = [...app.state.todos, app.state.newTodo];
    app.state.newTodo = '';
  }
});

app.expose(function removeTodo(index) {
  app.state.todos = app.state.todos.filter((_, i) => i !== index);
});
    </code-block>
  </section>
`);

router.add("/get-started", `
  <nav-bar></nav-bar>
  <section>
    <h2>Get Started</h2>
    <p class="tagline">Three simple steps to building with Holo.js</p>
    <div class="feature-grid">
      <feature-card icon="1️⃣" title="Install" description="npm install holo-js"></feature-card>
      <feature-card icon="2️⃣" title="Import" description="import { Holo } from 'holo-js'"></feature-card>
      <feature-card icon="3️⃣" title="Create" description="const app = Holo.init()"></feature-card>
    </div>
    <div class="buttons" style="margin-top: 3rem;">
      <a href="https://github.com/holo-js-org/holo/tree/main/test" class="button primary">View a Test</a>
    </div>
  </section>
`);

app.state.codeSize = "~300";
app.state.mode = "dark";
router.init();
app.exposeAsApp();
app.subscribeToState('mode', (val) => {
  document.body.className = val;
});