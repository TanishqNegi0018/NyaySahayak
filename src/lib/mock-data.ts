export type CaseStatus = 'Draft' | 'Analyzed' | 'Submitted' | 'Resolved';

export type LawExplanation = {
  law: string;
  explanation: string;
};

export type Case = {
  id: string;
  title: string;
  description: string;
  status: CaseStatus;
  lastUpdated: string;
  issue: string;
  relevantLaws?: LawExplanation[];
  guidance?: { title: string; description: string; completed: boolean }[];
};

export const mockCases: Case[] = [
  {
    id: '1',
    title: 'Dispute with Online Retailer',
    description: 'Received a defective product and the seller is refusing a refund or replacement.',
    status: 'Analyzed',
    lastUpdated: '2 days ago',
    issue: 'I bought a new smartphone online from a popular retailer. When it arrived, the screen was cracked. I contacted customer support immediately, but they are claiming it was damaged during shipping and are refusing to issue a refund or send a replacement. I have photos of the box and the phone as it arrived.',
    relevantLaws: [
        {
            law: 'Consumer Protection Act, 2019',
            explanation: 'Protects consumer interests against unfair trade practices such as selling defective goods or deficient services.',
        },
        {
            law: 'Indian Contract Act, 1872',
            explanation: 'The purchase of goods is a contract. If goods are defective, it is a breach of contract from the seller\'s side.'
        }
    ],
    guidance: [
        { title: 'Gather All Evidence', description: 'Collect all receipts, communication logs, and photos of the defective product.', completed: true },
        { title: 'Send a Formal Legal Notice', description: 'Draft and send a legal notice to the seller\'s registered office. You can use our draft generator for this.', completed: false },
        { title: 'File a Consumer Complaint', description: 'If the seller does not respond, file a complaint with the Consumer Dispute Redressal Commission.', completed: false },
        { title: 'Await Commission\'s Decision', description: 'Follow up on the proceedings with the commission.', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Unpaid Salary by Employer',
    description: 'My previous employer has not paid my final month\'s salary after I resigned.',
    status: 'Draft',
    lastUpdated: '5 days ago',
    issue: 'I worked for a tech startup for two years. I resigned last month following all company procedures and served my notice period. However, the company has not paid my salary for the final month of my employment. They are not responding to my emails or calls.',
  },
  {
    id: '3',
    title: 'Online Harassment',
    description: 'Facing cyberbullying and threats from an anonymous social media account.',
    status: 'Submitted',
    lastUpdated: '1 week ago',
    issue: 'An anonymous account on a social media platform has been posting defamatory content about me and sending me threatening messages. I have reported the account multiple times, but no action has been taken by the platform.',
    relevantLaws: [
        {
            law: 'Section 503 (IPC) - Criminal Intimidation',
            explanation: 'This section applies when someone threatens another person with injury to their person, reputation, or property.',
        },
        {
            law: 'Section 66A (IT Act)',
            explanation: 'Punishes sending offensive messages through communication services. Note: While this section was struck down by the Supreme Court, it is often still cited in initial complaints to law enforcement.',
        }
    ],
     guidance: [
        { title: 'Document Everything', description: 'Take screenshots of all harassing posts, comments, and messages.', completed: true },
        { title: 'Report to Cyber Crime Cell', description: 'File an FIR with the local Cyber Crime investigation cell. Use our FIR draft generator.', completed: true },
        { title: 'Inform the Platform', description: 'Send a formal complaint to the social media platform\'s grievance officer.', completed: false },
    ],
  },
];
