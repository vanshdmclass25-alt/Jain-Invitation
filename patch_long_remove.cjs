const { readFileSync, writeFileSync } = require('fs');
let content = readFileSync('src/components/LongInvitePreview.tsx', 'utf8');

const timelineStr = `<YearlyJourneyTimeline
          milestones={data.yearlyPhotos}
          template={template}
          language={activeLang}
        textColor={canvasTextColor} />`;

if (content.includes(timelineStr)) {
  content = content.replace(timelineStr, '');
  writeFileSync('src/components/LongInvitePreview.tsx', content);
  console.log("Removed YearlyJourneyTimeline from LongInvitePreview.tsx");
} else {
  console.log("Could not find YearlyJourneyTimeline in LongInvitePreview.tsx");
}
