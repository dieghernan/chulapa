# Beginner documentation review, October 13, 2026

The existing installation and starter context covers template publishing and
advanced settings. It did not provide a complete first-post example, browser
editing steps or a repository-safe image example. Added one selective basic
editing section to `ai-context.md` to cover those documented tasks. Existing
advanced configuration facts and source URLs remain available; editorial
simplification alone did not trigger a rewrite of the context.

Added `beginner-post-1`, `beginner-image-1` and `beginner-publishing-1` to the
manual evaluation corpus. Reviewed the existing installation, starter,
GoatCounter, include-cache, JavaScript, microformats and head-formatting cases
for retained advanced coverage. These cases are answer-quality expectations,
not automated assertions that the model has passed them.

`npm test` passes the local Worker, answer rendering and widget suites. This
checks context bundling and chatbot behavior, not inference accuracy. The new
context has not been deployed and no live inference evaluation was performed.
A deployed answer review remains necessary to assess both novice and advanced
answers against the updated source documentation.
