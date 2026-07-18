# PostHog post-wizard report

The wizard added PostHog to this Expo and React Native application. The React Native SDK is initialized once at the root layout using environment-backed configuration, with lifecycle and touch autocapture left enabled. Expo Router screen views are tracked manually for React Navigation v7 compatibility. Authenticated Clerk sessions are identified using Clerk user IDs, and sign-out now flushes its event before resetting the PostHog identity.

The integration also adds targeted product events across onboarding, language selection, and the learner home screen. Event properties contain product context only; no email, name, or other user-entered personal data is attached to captured events.

| Event | Description | Added in |
| --- | --- | --- |
| `onboarding_started` | Captures when a visitor starts the account creation journey from onboarding. | `app/onboarding.tsx` |
| `language_selected` | Captures when an authenticated learner confirms a language to study. | `app/language-selection.tsx` |
| `learning_continued` | Captures when a learner opens the learning flow from the home dashboard. | `app/(tabs)/index.tsx` |
| `conversation_practice_started` | Captures when a learner starts AI conversation practice from the home dashboard. | `app/(tabs)/index.tsx` |
| `progress_reset` | Captures when a learner resets their local learning progress from developer settings. | `app/(tabs)/index.tsx` |
| `user_signed_out` | Captures when an authenticated learner signs out of the application. | `app/(tabs)/index.tsx` |

## Next steps

A dashboard and three insights were created for the newly instrumented journey:

- [Analytics basics (wizard) dashboard](https://us.posthog.com/project/518309/dashboard/1869065)
- [Onboarding to language selection (wizard)](https://us.posthog.com/project/518309/insights/3RK27kpt)
- [Learning and practice starts (wizard)](https://us.posthog.com/project/518309/insights/KuXfcuex)
- [Progress resets and sign-outs (wizard)](https://us.posthog.com/project/518309/insights/E50eacPr)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add the exact PostHog env var names added to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Confirm the returning-visitor path also calls `identify` — a handler that only identifies on fresh login can leave returning sessions on anonymous distinct IDs.

### Agent skill

An agent skill folder remains in `.claude/skills/integration-expo`. It can be used as current context for future agent development with Claude Code.
