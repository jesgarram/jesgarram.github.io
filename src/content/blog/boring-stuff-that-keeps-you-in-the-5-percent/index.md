---
title: 'The Boring Stuff That Keeps You in the 5%'
description: '95% of GenAI pilots fail. What does it really take to take GenAI from POC to production?'
pubDate: 'Apr 11 2026'
image: './agents-are-products.png'
tags: ['GenAI', 'Engineering', 'Production']
---

95% of GenAI pilots fail to deliver measurable return. That's from an MIT study in 2025.

I am not surprised. Most companies are trying to run before they can even walk. Or they are trying to use GenAI to solve problems that are either not worth solving or solvable with simpler solutions.

Take Klarna. They reduced customer service staff and replaced them with agents. Soon after, they realized the quality was not there and started hiring people back. We have seen the same pattern everywhere lately: AI as a front to cut costs. But then... reality hits.

I have been working on an agentic solution for knowledge retrieval at a large company (+6k employees) for almost a year now. Here is what I have learnt.

## What Does It Actually Take?

There is a 5% that survives. I think we are one of them. But what does it actually take? Spoiler alert: it's not the latest LLM model or the MCP vs Skills debate.

It starts before you write a single line of code. Is the problem worth solving? Are agents the actual solution? Do you have solid foundations in place? Those are the right questions, and they could each be their own post. Since I am an engineer, I will focus on the two questions I can speak to best: What should we buy and what should we build? And then, what is the best way to build things right?

## What Should You Buy and What Should You Build?

When you open your LinkedIn, you think that building an agent is just plumbing: API here, MCP there, and pum! My first agentic solution. When you are in a large enterprise, that is not enough. Now you have to care about scale, security, user experience, all at once, for thousands of users with different profiles, expectations, and AI knowledge.

![Buy-vs-build](./enterprise-genai.png)
*An ecosystem of capabilities, not just the LLM.*

But don't worry. These issues are what make building in production actually much more fun, at least for me. At the same time, the space is evolving so fast that it's overwhelming. You can build everything! Combine that with your latest AI coding tool and the possibilities are really endless: MCPs, Skills, sub-agents, self-learning agents...

![You-can-build-everything](./everything-to-build.png)
*You can build Everything! Don't*

That's the first mistake to avoid. Please, breathe. Take a step back. Ask yourself: Who are my users? What do they really need? Then, start with the minimum viable and iterate.

![Something about being zen](./being-zen.png)
*This is Dobby. Dobby is chill. Be more like Dobby before building stuff*

In our case, we were working in the Azure ecosystem. The thing is, when you are in a big organization, you already have a lot of tools at your disposal. We used the Copilot frontend with our own custom orchestration behind it. Why would we spend time and money building a frontend for LLMs when there is already one that works properly? Buy the thing that is not your core value, build the thing that makes you unique.

And don't even think about training your own LLM. I mean, the organization is really big, you could think about it, but that's a lot of money to not get a good solution. We also thought about fine-tuning, but the thing is, you can have indirect knowledge leakage. Imagine a research institution where different teams work on confidential projects. If you fine-tune on all of that data, the LLM memorizes it, and suddenly someone from Team A can extract knowledge about Team B's work just by asking the right questions. So fine-tuning was out too.

So where is the value? If you think about the stack, you have the chat client, the orchestration, the LLM and the tools. The client? Buy it. The LLM? Buy it. But the orchestration and the tools? That's where you as an engineer can bring the most value. We built the custom tools using Skills + custom APIs, which allows us to plug and play into different agents and be more future proof. And for the orchestration we went with Agno, which gives us full control over the workflow, the reasoning loop, the tool calling. That control matters. An agent is basically an LLM in a loop: it can call the vector database multiple times, evaluate if the first result is good enough, and do the research again if it's not. If you don't own that loop, you can't tune how the agent reasons. That's the stuff that makes your solution unique.

![Buy-vs-build](./build-vs-buy.png)
*What we built vs what we bought.*

## Building Things Right

I have learnt quite a bit from taking a POC into production, and the majority of the things are not even GenAI related.

### Agentic AI Solutions Are Products

Agentic AI solutions are products. They are not a one-off thing. They are not demos that you do to impress your boss and get a promotion. If your solution is good, it's going to be used by a lot of people. A lot.

![The-dream](./agents-are-products.png)
*Us the first week at the job vs now.*

We started as a small POC team. We had two weeks to prove the system worked. If we didn't show value, the project was dead and the client was going with another company. We won that battle because we focused on making the retrieval accurate instead of going vanilla. The users said they would actually use it in their daily work. We won the buy versus build. Good.

But then the hype kicked in. The news reached the board of directors, one of them used the system for a presentation and was quite happy. And suddenly management said, drop everything, deliver by January instead of March. They were like, how hard can it be? Just put 20,000 documents in. They didn't understand the difficulty. And we couldn't really explain it to them either.

So we had to sit down, make a proper plan, define the non-negotiables and bring a structured message to leadership. If you want January, fine, but this is what we can deliver. Is it good enough?

That pressure taught us something important: don't fly blind, think of the user first. No matter how tight the timeline or how high the expectations, the only thing that matters is whether you are building what your users actually need.

What does that mean in practice? You need to build the solution together with your users. You need to build a good feedback loop where every major feature you introduce has to be tested by the actual users of your product.

We have learnt so much from our users. About things that we thought were important, and were not at all. About things that were not in our roadmap and were a must. For example, early user feedback told us the system was too slow, so we added streaming responses and progress updates. Users loved being able to download the source documents directly. These were not fancy features, but they made a real difference. The next feature you develop has to come from that kind of feedback, not because you saw a new cool skill and wanted to implement it.

### GenAI Is 80% Engineering

My favorite lesson. GenAI is 80% engineering. I call it the "boring work."

I have been on both sides of the coin. In the POC we were like two chickens without heads doing bash scripts and random things to deploy containers. That was a mess. But the moment that we sat down and said, let's put proper infra, let's put proper CI/CD, every time we make a change now it's so easy. I'm quite happy about that.

![The-boring-work](./the-boring-work.png)
*The boring work is invisible, but keeps you afloat.*

It took me and my team a couple of months building a good foundation before we could start playing with the fun stuff: private networking, JWT token validation, WAF protection, CI/CD, observability, scalability. None of that is GenAI. All of it is required.

Getting security right was the best example. The data is private IP, so the raw data cannot be publicly reachable on the Internet. We had to set up virtual networks, subnets, NSGs, an application gateway to allow the frontend to talk with the backend safely through the public internet. We have to handle proper role based access control, fine-grained permissions, entra IDs of the users, you name it. Tortuous process, believe me. But the happiness that you get when the first message flows through all the layers and you get back an answer, priceless.

But that happiness only lasts because you did the work upfront. Skip it, and you end up like McKinsey's AI platform: they were hacked, not because of prompt injection or jailbreaking per se, but because they had 20 APIs publicly available without even a static key protecting them. That's just an engineering issue. Not GenAI.

![The-hacking](./the-hacking.png)
*Imagine my first thought when I read this...*

I was a bit scared when I read that. Could that happen in the solution I had been building this year? Then I remembered those couple of months of boring work. And I went back to sleep like a baby.

### Context Is King

Finally, the trivial one in hindsight. We all know that context is king in GenAI, right? If you have not ingested some key data for your users into your system, it does not matter how much agentic magic you throw at the problem: the insights are just not going to be there.

We were quite humbled by our users at the beginning of our user testing sessions. We had been optimizing the retrieval for the difficult questions. The first data source was slides with complicated graphs, so text embeddings were a no-go. We chose a multimodal embedding model, combined semantic and keyword search, added query rewriting so the agent wouldn't lose context across turns. All of that worked quite well for the hard questions.

Then, our users said: "your system sucks."

Why? Because a user asked who they should contact in the company for a question about X, and the system hallucinated the names. The response was good, the knowledge was there, but we hadn't ingested the HR data just yet. We thought it was not a priority.

That gap, between what engineers think matters and what users actually need, is really the whole point. That's where the 95% fails. Not because the models are not good enough. Not because the tech is not there. But because shipping GenAI is not a tech problem. It's a product problem, an engineering problem, and a listening problem.

The boring stuff is what keeps you in the 5%.

PS: Thanks to the great Jonny Daenen for the inspiration for the drawings.