## SIH26063 — Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal
**Ministry of Earth Sciences (MoES)** · Space Technology · Software

**Verdict: Proceed with caution** — The corpus is real and the build is safe, but an archive with an AI post generator has a very low ceiling — take it only if you will make grounded, citation-locked generation and multimodal search the substance rather than shipping a CMS.
Acceptance potential 2/5 — A content repository with an AI caption generator is close to the lowest-ceiling software shape available — the archive half is a CMS and the generation half is an LLM call, so there is very little for a judge to reward beyond execution and the outreach framing does not create technical substance.

Decades of Indian Antarctic expedition reports, datasets, photographs and papers sit scattered across drives and old websites, and almost none of it reaches the public. The ask is one archive holding all of it properly, and a way to turn that material into things people actually read — website posts and social media content — without someone writing each one by hand.

**Build:** A repository plus publishing pipeline: an ingestion and cataloguing layer for the material types the statement lists — expedition reports, scientific datasets, publications, photographs, videos and institutional activity records — with metadata extraction, expedition-and-year organisation and full-text plus semantic search across the corpus; and a content generation layer that takes a selected item or theme and drafts website copy and social posts at a stated reading level with the source material cited, an editorial review queue so nothing publishes unreviewed, and a scheduling view for campaign planning.

**Minimum demo:** Search the archive for a specific expedition, open a report from it, and generate a short public-facing post that draws only on that document with the passages it used highlighted in the source.

**Scores:** Feasibility 4/5 · Innovation 4/5 · Clarity 2/5 · Effort Heavy · Demo Medium

**In its favour**
- Indian polar expedition material is genuinely published and downloadable, so unlike the neighbouring NCPOR statements your corpus is real rather than invented
- Grounding generated posts to specific passages in a source report is a real and demonstrable discipline, and a portal that refuses to write anything it cannot cite is a defensible differentiator over freeform generation
- Semantic search across photographs and video, not just text, is the harder and more interesting half and almost no competing team will attempt it
- The Space Technology theme label hides an archive and outreach portal from anyone browsing by subject

**Against it**
- An archive plus a text generator is among the least technically distinctive products you can build, and a panel will have seen several retrieval-and-generate submissions before yours
- Generated science communication that subtly misstates a finding is worse than no post at all, so the editorial review queue is a requirement rather than a nicety and should be visible in your demo
- Six media types is deceptively broad — video ingestion, transcription and indexing alone can consume the whole event if you let it
- There is no measure of good outreach in the statement, so any claim that your generated content is effective rests on your own judgement and a judge may simply disagree

**Stack:** hybrid keyword and dense retrieval over the corpus, Dublin Core / DataCite metadata cataloguing, grounded generation with source span citation, CLIP-based image and video semantic indexing, editorial review queue with approval states, Next.js public portal with scheduling view


SIH26063 — Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal

Roast rating: Brutal 🔥 (72/100)

The red flags:
1. An archive plus a text generator is among the least technically distinctive products you can build, and a panel will have seen several retrieval-and-generate submissions before yours
2. Generated science communication that subtly misstates a finding is worse than no post at all, so the editorial review queue is a requirement rather than a nicety and should be visible in your demo
3. Six media types is deceptively broad — video ingestion, transcription and indexing alone can consume the whole event if you let it
4. There is no measure of good outreach in the statement, so any claim that your generated content is effective rests on your own judgement and a judge may simply disagree

The damage report:
- Feasibility (4/5): Actually buildable, which on this slate is rarer than it sounds. Do not squander it on scope.
- Innovation scope (4/5): There is something genuinely new here. Do not bury it under another dashboard.
- Clarity (2/5): Nobody is sure what is being asked, quite possibly including the people who asked it.
- Acceptance potential (2/5): The numbers do not like you. Bring something the numbers cannot see.
- Effort (Heavy): Heavy. Somebody on this team is not sleeping in week three. Pick who, on purpose.
- Demo-ability (Medium): Demoable, if you rehearse it. Nobody rehearses it.
- Data (None supplied): No dataset comes with this one, so every accuracy figure you quote is a number about labels you invented.

via SIH Buddy — https://www.sihbuddy.in/roast/SIH26063