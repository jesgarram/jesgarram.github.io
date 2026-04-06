---
title: 'The Annoying Senior Engineer I Built'
description: 'LLMs are great at giving answers but terrible at challenging your thinking. So I built a brainstorming agent that pokes holes in your decisions before you commit to them.'
pubDate: 'Apr 04 2026'
image: './cover.png'
tags: ['Agentic', 'Context Engineering', 'Claude Code']
talkUrl: 'https://www.youtube.com/watch?v=KExht8wZ2Ng'
---

LLMs are great at giving you answers. They're terrible at challenging what you're doing.

At some point I realized what I was actually missing: that annoying senior engineer who pokes holes in your decisions before you commit to them. The one who asks "what happens when this fails?" before you've even thought about failure. So I was like, I'm going to build one.

The plugin is called Arete. It's Greek for excellence through effort. It's a brainstorming agent, not the kind that gives you ten ideas in bullet points, but the kind that makes you defend your own thinking.

## Five phases

You start a conversation, say "I want to brainstorm about this problem," and it guides you through five phases.

**Ground.** Make sure the problem you're trying to fix actually exists. What is the pain? What happens if you don't fix it? This sounds obvious, but most people skip straight to solutions. When I brainstormed improving a code explanation skill, the first question was "who is the audience?" Because explaining code to a senior engineer is completely different from explaining it to someone who's onboarding. I hadn't thought about that yet.

**Explore.** The divergent phase. You don't tunnel-vision into one solution. You explore different directions, different ways of solving the same problem. The agent keeps shifting angles on you. "What tone should the output use?" "Where should generated files be saved?" "Should it accept no input at all?" These are small decisions you don't think about at the start, but they shape the whole design.

**Decide.** Every direction goes into a matrix with pros and cons. But the thing I really like is that it asks you to rank what matters most. Completeness, discoverability, simplicity. And then based on your priorities it fine-tunes the decisions that were not super clear.

**Stress.** This is the annoying senior engineer phase. You've made your decision? Fine. Now defend it.

It does catch real things. I was going to use C4 diagram syntax for Mermaid. The stress phase pushed on rendering compatibility. Standard Mermaid renders everywhere. C4 doesn't always look right in GitHub. If I hadn't thought about this, I would have built it, seen it break, and had to go back. The stress phase caught it before I wrote a single line.

**Ship.** You don't have to do anything here. The agent recapitulates what you've done and writes two things: an ADR with the decisions, context, and trade-offs, and a plan you can hand to a human or an agent to implement.

The ADR includes what was considered and cut, and why. There's also something I really like: positive consequences, negative consequences, and mitigations. There is no decision that is perfect.

> "The skill reads reference docs and ADRs. That's a lot of context. Are you willing to accept slower responses?"

Yes, I care about completeness, not speed.

> "What happens when the question is too vague?"

Claude is quite smart, it should be able to figure it out.

> "Someone uses this on a three-file hobby project. Should it still generate everything?"

No. If you wrote three files, you don't need a skill to explain your own code.


## Not just for code

I'm someone that also creates presentations and has difficult meetings and these kinds of things. Sometimes I need structured thinking for those too. So there's a conceptual track. The agent detects you're working on something non-technical and adjusts. Different questions, different stress points. Instead of an ADR and a plan, you get a record of the decisions you made.

## Being smart about context

Context windows are quite big. You can fit books in there. But LLMs are like humans. We have limited memory. If I asked you to store twenty numbers in your mind, you'd probably recall five or six. Same thing with LLMs. The more information, the more hallucinations and loss of information. So it's less about prompting and more about context engineering: what do you put in the context at every step so the agent has exactly what it needs and nothing more.

Arete uses three sub-agents that run outside the main conversation.

A **researcher** that looks things up, in your codebase or online, without polluting your brainstorm. You say "research how other people implement this" and it spawns off, does its work, reads a ton of tokens, and feeds back only the summary. All that research never touches your main context.

A **teacher** that explains concepts mid-brainstorm. I built this because sometimes a concept comes up that I'm unfamiliar with, and I don't want to derail the session to learn about it.

An **architect** that generates Mermaid diagrams for the ADR in parallel. Drawings don't need to happen inside the brainstorm.

The brainstorm phases run inside your conversation because I need to give input, see output, react. The sub-agents run in the background because they need to go outside. Go look something up, do it in parallel, don't give me the whole fifty pages. Give me a summary.


## A mentor, not autopilot

I am the one that says let's go here, let's go there. It's different from vibe coding, where you describe what you want and hope the output is right. Here, every decision is already stress-tested before you write a single line of code.

Of course it doesn't replace a really good senior engineer. I've had brainstorm sessions with colleagues at Dataminded who are way more senior than me. There is still a gap. But when you don't have that for the day to day, it catches things I would have found two days into implementation.

I actually use it with a colleague too. We treat Arete as a third person in our brainstorm. We sit down in the same room, discuss the problem, kick up the brainstorm, and then we both read the outputs, discuss our answers together.

## Make it yours

Because it's all just markdowns, every person can adjust it. Every person has a different workflow. So the idea is: make the workflow yours. Change the skills, add more context, add better questions, add a different sub-agent.

You can install [Arete](https://github.com/jesgarram/arete) as a plugin in Claude Code through the marketplace. It also works with OpenCode, GitHub Copilot, or Codex.

The tools are there. Build the annoying senior engineer that works for you.
