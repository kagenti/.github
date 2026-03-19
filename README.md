# Kagenti Marketing Site
*Assisted-by: claude-sonnet-4-6*

## Purpose

This is the primary marketing site for Kagenti, an open-source platform for deploying, securing, and governing AI agents on Kubernetes. The site serves as the first stop for platform engineers, security teams, and AI infrastructure builders evaluating the project. Its job is to convert GitHub interest into engaged contributors, demo requests, and community members.

## Audience

**Primary:** Platform engineers and DevOps teams responsible for running AI agent workloads in production. They care about security, operational maturity, and not being locked into vendor runtimes.

**Secondary:** Security-focused engineers evaluating zero-trust identity and policy enforcement for agentic systems.

**Tertiary:** AI/ML engineers who have existing agents (LangGraph, CrewAI, AG2, etc.) and want a standard way to deploy and manage them without rewriting agent code.

## Positioning

Kagenti is positioned as the **infrastructure layer** beneath the agent, not a competing agent framework. The three-word positioning — *deploy, secure, govern* — anchors every section:

- **Deploy:** Kubernetes-native, Ansible-automated, framework-neutral. You bring the agent; Kagenti handles workload lifecycle.
- **Secure:** Zero-trust identity via SPIFFE/SPIRE and AuthBridge, injected at deploy time. No agent code changes required.
- **Govern:** Unified control plane, observability, and policy enforcement across all agents and tools.

The site leans hard into open-source credibility: Apache 2.0, auditable code, no feature gating, no proprietary runtime dependencies.

## Page Structure and Narrative Flow

The page tells a single story from top to bottom:

1. **Hero:** States the proposition clearly. Primary CTA is GitHub (credibility), secondary is demo request (pipeline).

2. **Platform Capabilities:** Maps six platform pillars (control plane, workload runtime, lifecycle, networking, security, observability) to the underlying open-source components. Signals technical depth and integration with the stack engineers already run.

3. **Getting Started:** Reduces time-to-value friction. Shows the install is four commands. Pairs with a real UI screenshot (light/dark variants served via `<picture>` and `prefers-color-scheme`) to make the platform tangible.

4. **Demo Carousel:** Three concrete use cases (MCP Gateway, AuthBridge zero-trust, Lifecycle via Dashboard) showing real code. The first slide pairs with a YouTube tutorial so visitors can see the platform in motion without committing to a full demo call.

5. **Community & Roadmap:** Social proof through contributor avatars and GitHub project board. Includes a "What's next" column covering the roadmap toward persistent, long-running agents — with memory, sandboxing, an Agent Development Kit, and improved developer experience as the core building blocks.

6. **Open Enterprise:** Addresses the enterprise buyer concern: no vendor lock-in, but professional support available. Gate to the demo request flow.

7. **Events:** Contextual credibility. KubeCon EU 2026 presence signals community legitimacy. Time-boxed; the section and its nav/banner links are marked for removal after the event (March 26, 2026).

## Calls to Action

There are two primary CTAs, used consistently throughout:

- **View on GitHub:** Top of funnel. For engineers who need to evaluate the code before engaging further.
- **Talk to Us:** Bottom of funnel. Links to `talk-to-us.html`, a minimal contact page that routes to email and Discord.

CTA links carry a `data-track` attributes wired to GA4 events in `script.js`.

## Analytics

Google Analytics 4 is implemented with Consent Mode v2. Analytics are off by default; the cookie consent bar prompts visitors to accept or decline. The stored preference (`kagenti-cookie-consent` in `localStorage`) is respected on subsequent visits and can be withdrawn via the "Cookie preferences" link in the footer.

**Events tracked:**

| Event | Trigger |
|-------|---------|
| `request_demo_click` | Click on any "Talk to Us" CTA |
| `github_click` | Click on "View on GitHub" or the star badge |
| `video_play` | Click on the YouTube tutorial card |
| `banner_dismiss` | Click the banner close button |
| `kubecon_link_click` | Click on any KubeCon session or schedule link |

Replace the `G-XXXXXXXXXX` placeholder in `index.html` (two instances) with the real GA4 Measurement ID before deploying.

## Event-Driven Content

The banner, nav highlight, and events section are tied to KubeCon EU 2026 (March 23–26, Amsterdam). HTML comments mark what to remove post-event (`<!-- Remove after March 26 -->`). After the event, these elements should be removed or replaced with the next event.

## Design System

The site uses the Red Hat Design System token palette and typefaces:

- **Red Hat Display** — hero headline
- **Red Hat Text** — body copy
- **Red Hat Mono** — code samples and labels
- Colors follow RHDS tokens; all text meets WCAG AA contrast (4.5:1 minimum)

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main marketing page |
| `talk-to-us.html` | Contact / demo request page |
| `privacy.html` | Privacy policy |
| `style.css` | All styles, using CSS custom property token system |
| `script.js` | Tab carousel, banner dismiss, GA4 consent logic, CTA tracking |
| `img/kagenti-ui-light.png` | Dashboard screenshot — light mode |
| `img/kagenti-ui-dark.png` | Dashboard screenshot — dark mode |
| `favicon.svg` | Kagenti logo mark |
