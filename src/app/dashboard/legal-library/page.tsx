import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookText, Shield, Briefcase, Gavel } from 'lucide-react';

const lawCategories = [
  {
    category: 'Indian Penal Code (IPC)',
    icon: <Gavel className="h-6 w-6 text-primary" />,
    laws: [
      { code: 'Section 420', title: 'Cheating and dishonestly inducing delivery of property', description: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security.' },
      { code: 'Section 506', title: 'Punishment for criminal intimidation', description: 'Threatening another with any injury to his person, reputation or property, or to the person or reputation of any one in whom that person is interested.' },
      { code: 'Section 378', title: 'Theft', description: 'Whoever, intending to take dishonestly any moveable property out of the possession of any person without that person’s consent, moves that property in order to such taking, is said to commit theft.' },
    ],
  },
  {
    category: 'Consumer Law',
    icon: <Shield className="h-6 w-6 text-primary" />,
    laws: [
      { code: 'Consumer Protection Act, 2019', title: 'Protection of consumer interests', description: 'An Act to provide for protection of the interests of consumers and for the said purpose, to establish authorities for timely and effective administration and settlement of consumers\' disputes.' },
      { code: 'Right to Safety', title: 'Right against hazardous goods', description: 'The right to be protected against the marketing of goods and services, which are hazardous to life and property.' },
    ],
  },
  {
    category: 'Cyber Law',
    icon: <BookText className="h-6 w-6 text-primary" />,
    laws: [
        { code: 'Section 66C (IT Act)', title: 'Punishment for identity theft', description: 'Whoever, fraudulently or dishonestly make use of the electronic signature, password or any other unique identification feature of any other person, shall be punished.'},
        { code: 'Section 67 (IT Act)', title: 'Punishment for publishing or transmitting obscene material in electronic form', description: 'Punishment for publishing or transmitting material which is lascivious or appeals to the prurient interest.' },
    ],
  },
  {
    category: 'Labor Law',
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    laws: [
        { code: 'Payment of Wages Act, 1936', title: 'Regulation of wage payment', description: 'An Act to regulate the payment of wages to certain classes of employed persons.' },
        { code: 'Industrial Disputes Act, 1947', title: 'Investigation and settlement of industrial disputes', description: 'An Act to make provision for the investigation and settlement of industrial disputes, and for certain other purposes.' },
    ],
  },
];

export default function LegalLibraryPage() {
  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Legal Library</h1>
            <p className="text-muted-foreground">Browse key laws and their simple explanations.</p>
        </div>
        <div className="space-y-8">
            {lawCategories.map((category) => (
                <Card key={category.category}>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            {category.icon}
                            <CardTitle className="text-2xl">{category.category}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {category.laws.map((law, index) => (
                                <AccordionItem value={`item-${category.category}-${index}`} key={index}>
                                    <AccordionTrigger>{law.code} - {law.title}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {law.description}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
