const { readFileSync, writeFileSync } = require('fs');

let content = readFileSync('src/components/InvitationCard.tsx', 'utf8');

// The rendering of YearlyJourneyTimeline usually looks like:
// <YearlyJourneyTimeline data={data} ... /> or just <YearlyJourneyTimeline
// Let's find exactly how it's used.
