const { readFileSync, writeFileSync } = require('fs');
let content = readFileSync('src/components/InvitationCard.tsx', 'utf8');

const anchor = `{/* 9. Parna Vidhi & Rituals Guide */}`;
const injection = `
          {/* Scratchable Hidden Message */}
          {(data.scratchTitle || data.scratchMessage) && (
            <div className="relative z-10 w-full max-w-md my-4">
              <ScratchCard
                title={data.scratchTitle || t.scratchDefaultTitle}
                hiddenMessage={data.scratchMessage || t.scratchDefaultMessage}
                template={currentTemplate}
                language={activeLang}
              />
            </div>
          )}

          {/* 9. Parna Vidhi & Rituals Guide */}`;

if (content.includes(anchor)) {
  content = content.replace(anchor, injection);
  writeFileSync('src/components/InvitationCard.tsx', content);
  console.log("Injected ScratchCard into InvitationCard.tsx");
} else {
  console.log("Anchor not found in InvitationCard.tsx");
}
