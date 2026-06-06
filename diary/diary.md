Dear diary, words cannot express the roller coaster of emotions I went through while working on this task...

Okay, all jokes aside, this task unfortunately took up a huge amount of my time.

It all started with the template we were given, which turned out to be for a client-side application. Then, once I finally implemented the tree structure, I realized it wasn't returning an array, and the example test failed.

After that, I discovered my build wasn't working at all, and `index.js` was completely empty. It turned out I had assumed `outDir` and `rootDir` were pre-configured in the template, but they weren't there at all!

Next up were the module issues, because the tests required the older CommonJS format.

Hooray! I finally got to the actual tests, but of course, case insensitivity wasn't working, so I had to spend quite a lot of time figuring out how to handle that. I ended up implementing a Breadth-First Search (BFS) traversal of the tree to collect all possible case variations of the prefix.

But wait, there's more! It turns out that order matters in our tests, and uppercase variants must come first.

And just when I thought I was at the finish line—nope! The final test expects duplicates in the output if they were present in the input. In an autocomplete tree, Karl! An autocomplete tree!

So, I had to track and store the word counts as well.

But finally, it's done.