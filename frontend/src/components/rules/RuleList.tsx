'use client';
import React from 'react';

export interface Rule {
    id: number;
    title: string;
    description?: string;
}

export interface RuleGroup {
    id: number;
    title: string;
    description?: string;
    rules: Rule[];
}

export default function RuleList({groups}: {groups: RuleGroup[]}) {
    return (
        <div className="space-y-6">
            {groups.map(group => (
                <div key={group.id} className="border p-4 rounded">
                    <h2 className="text-xl font-bold">{group.title}</h2>
                    {group.description && <p className="mb-2">{group.description}</p>}
                    {group.rules.length > 0 ? (
                        <ul className="list-disc ml-6">
                            {group.rules.map(rule => (
                                <li key={rule.id}>{rule.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p><em>No rules</em></p>
                    )}
                </div>
            ))}
        </div>
    );
}
