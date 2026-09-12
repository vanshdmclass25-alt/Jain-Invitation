const { readFileSync, writeFileSync } = require('fs');
let content = readFileSync('src/components/InvitationCard.tsx', 'utf8');

const timelineStr = `<YearlyJourneyTimeline
            milestones={data.yearlyPhotos}
            template={currentTemplate}
            language={activeLang}
            onPreviewPhoto={onPreviewPhoto}
          />`;

if (content.includes(timelineStr)) {
  content = content.replace(timelineStr, '');
  writeFileSync('src/components/InvitationCard.tsx', content);
  console.log("Removed YearlyJourneyTimeline from InvitationCard.tsx");
} else {
  console.log("Could not find YearlyJourneyTimeline in InvitationCard.tsx");
}
