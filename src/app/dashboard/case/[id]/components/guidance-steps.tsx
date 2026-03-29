'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import type { Case } from '@/lib/mock-data';
import { useState } from 'react';

type GuidanceStepsProps = {
    caseItem: Case;
};

export function GuidanceSteps({ caseItem }: GuidanceStepsProps) {
    const [guidance, setGuidance] = useState(caseItem.guidance || []);

    const toggleCompletion = (index: number) => {
        const newGuidance = [...guidance];
        newGuidance[index].completed = !newGuidance[index].completed;
        setGuidance(newGuidance);
    }

    if (!guidance || guidance.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Guidance is not yet available for this case. Complete the issue analysis first.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Action Plan</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {guidance.map((step, index) => (
                        <div key={index} className="flex items-start gap-4 relative">
                            {index < guidance.length - 1 && (
                                <div className="absolute left-[9px] top-6 h-full w-px bg-border" />
                            )}
                            <div className="flex flex-col items-center">
                                <div 
                                    className={`h-5 w-5 rounded-full flex items-center justify-center z-10 ${step.completed ? 'bg-primary' : 'bg-secondary border-2'}`}
                                >
                                    {step.completed && <div className="h-2 w-2 rounded-full bg-primary-foreground"/>}
                                </div>
                            </div>
                            <div className="flex-1 pb-6">
                                <label
                                    htmlFor={`step-${index}`}
                                    className={`font-semibold ${step.completed ? 'line-through text-muted-foreground' : ''}`}
                                >
                                    {step.title}
                                </label>
                                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                            </div>
                            <Checkbox 
                                id={`step-${index}`}
                                checked={step.completed}
                                onCheckedChange={() => toggleCompletion(index)}
                                className="mt-1"
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
