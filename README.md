# Personal Blog

I give talks. I don't write blog posts. That's the problem.

I can get on stage and talk about something for thirty minutes, no script, no issues. But the moment I sit down to write, the blank page wins. I'll rewrite the same opening four times and then close the tab. It's not that I don't have things to say. I just said them, on stage, in front of people. The ideas are there. They're just trapped in a recording.

So I built a pipeline. Record the talk, get a transcript, and turn it into a blog post that sounds like I sat down and wrote it myself. No AI slop. My voice, my opinions, my weird sentence fragments.

## The stack

[Astro](https://astro.build). Static site. Markdown blog posts with co-located images. Deployed to GitHub Pages on every push to `main`. That's it. No CMS, no database, no build steps I don't understand.

Blog posts live in `src/content/blog/{slug}/index.md`. Each post gets its own folder so images sit next to the content instead of in some random `public/images` directory.

## The pipeline

Transcripts go through three steps. Each one is a Claude Code skill that I can run independently or chain together with `/polish-pipeline`.

```
Raw Transcript → Structure → Polish → Refine → Blog Post
```

**Structure** cleans the transcript. Removes the ums, the false starts, the circular repetition where I said the same thing three times while finding my words. Finds the hook. Identifies sections. Tags the moments that make the post worth reading.

**Polish** turns the structured draft into something that reads like a blog post. The constraint is: it should sound like I wrote it, not like an AI wrote it for me. Same vocabulary, same rhythm, same willingness to say things like "that's not good enough." An editor, not a ghostwriter.

**Refine** is the adversarial step. A Critic (red team) reads the draft the way a real reader would. Does this paragraph earn its place? Is this section too long? Does the opening make you want to keep reading? Then an Editor (blue team) applies the fixes while protecting my voice. Up to two rounds, or until the Critic says it's ready.

## Why not just write?

Because I tried. For years. And the output was either nothing (perfectionism) or something that didn't sound like me (overwriting to compensate).

The talks already exist. The ideas are already structured in my head, that's why I can present them without a script. The pipeline just captures what I already said and makes it readable. I review every word. I cut things, I rewrite things, I add things I forgot to say on stage. But I start from my own words instead of a blank page.

That's the whole trick. Don't start from nothing. Start from something you already said.
