# Task Retrospective: Concurrency, Rate Limiting, and Error Handling

## Overview
This was undoubtedly the most challenging task I have encountered so far[cite: 1]. To tackle it effectively, I had to deeply study the technical fundamentals and underlying theory with the assistance of AI, as I initially struggled to understand how to approach each specific requirement[cite: 1].

## Key Challenges & Solutions

### 1. Concurrency Control (Request Pooling)
* **The Problem:** I started by spinning up the server and firing all requests simultaneously, which immediately overwhelmed the system and froze my computer[cite: 1].
* **The Solution:** This made it instantly clear that I needed to implement a request pool (concurrency limiting)[cite: 1]. However, I got stuck for a while trying to figure out how to structure and organize this correctly[cite: 1].

### 2. Request Cancellation vs. Execution Interruption
* **The Problem:** Next, I faced difficulties determining how to correctly halt the request flow[cite: 1].
* **The Solution:** Initially, I thought I needed to abruptly abort the entire execution rather than simply stopping the dispatch of new requests, which led to sub-optimal results[cite: 1]. After consulting AI again, I managed to clarify the distinction and implement proper flow control[cite: 1].

### 3. Refactoring the Retry Mechanism
* **The Problem:** The final piece was implementing a retry mechanism[cite: 1]. My first attempt was to hardcode the retry logic directly into the `sendRequest` method[cite: 1]. While functional, it made the code look messy and heavily compromised readability[cite: 1].
* **The Solution:** To improve code quality, I refactored the retry logic into its own dedicated method, keeping the codebase clean and modular[cite: 1].

## Open Questions & Next Steps
* **Data Mutability:** I still have an outstanding architectural question regarding whether it is appropriate to mutate the original array in this scenario, or if it would be better practice to treat it as immutable and return a new dataset instead[cite: 1].

---

> 🤖 **Note:** *This retrospective was originally drafted by the author and subsequently refined, translated, and structured into Markdown format by an AI assistant.*