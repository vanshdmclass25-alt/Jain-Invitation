const fs = require('fs');
let code = fs.readFileSync('src/components/InvitationCard.tsx', 'utf8');

// The string we want to replace starts with:
//               language={activeLang}
//             />
//           </div>
// 
//           {/* Single Family Photo Section if user provided one */}
// and ends with:
//                     )}
//                   </div>
//                 </div>
//               );
//             })()
//           )}
// 
//           {/* Additional Information (No WhatsApp RSVP) */}

const lines = code.split('\n');
let startIdx = -1;
let endIdx = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('language={activeLang}') && lines[i+1]?.includes('/>') && lines[i+2]?.includes('</div>') && lines[i+4]?.includes('Single Family Photo Section if user provided one')) {
    startIdx = i;
  }
  if (startIdx !== -1 && lines[i].includes('{/* Additional Information (No WhatsApp RSVP) */}')) {
    endIdx = i;
    break;
  }
}

if (startIdx !== -1 && endIdx !== -1) {
  lines.splice(startIdx, endIdx - startIdx);
  fs.writeFileSync('src/components/InvitationCard.tsx', lines.join('\n'));
  console.log('Fixed syntax error');
} else {
  console.log('Could not find start or end index', startIdx, endIdx);
}
