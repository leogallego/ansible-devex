<!-- .slide: class="divider-dark" data-background-color="#292929" -->

<div class="slide-body">
<p class="section-marker">Deep Dive</p>

## AI-Assisted <!-- .element: style="font-size: 3.4em;" --> <br/>Development

<img src="assets/lightbulb-red.png" alt="" class="slide-decor slide-decor-right" style="opacity: 0.06; max-height: 65%;" />
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-white.png" alt="Red Hat" class="footer-logo" />
</div>

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module B — AI Deep Dive</p>

## MCP architecture

<div class="mermaid">
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#ee0000', 'primaryTextColor': '#fff'}}}%%
graph LR
    AI[AI Assistant] --> DT[Devtools MCP]
    AI --> AAP[AAP MCP]
    DT --> ADT[ADT Toolchain]
    AAP --> GW[AAP 2.6+ Gateway]
    style AI fill:#292929,stroke:#ee0000,color:#fff,stroke-width:2px
    style DT fill:#ee0000,stroke:#a60000,color:#fff
    style AAP fill:#ee0000,stroke:#a60000,color:#fff
    style ADT fill:#f0f0f0,stroke:#a3a3a3,color:#151515
    style GW fill:#f0f0f0,stroke:#a3a3a3,color:#151515
</div>

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module B — AI Deep Dive</p>

## Demo scenarios

- Scaffold a collection, lint it, fix violations — all via AI prompt
- Query AAP inventory, launch a job template, check status
- AI pair programming across the full content lifecycle

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>
