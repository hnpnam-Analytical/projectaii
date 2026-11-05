<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Frontend architecture
- Keep all presentation in shared site components and semantic CSS tokens; content routes retain their original report text and data to avoid redesign-driven content changes.
- Define grouped navigation and route labels in the shared Navigation module; the site layout supplies breadcrumbs and sequential page navigation to keep all content pages consistent.
