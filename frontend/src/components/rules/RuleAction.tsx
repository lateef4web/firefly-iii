'use client';
import React from 'react';

export interface RuleAction {
    type: string;
    value: string;
    stopProcessing: boolean;
}

interface Props {
    index: number;
    action: RuleAction;
    actionOptions: Record<string, string>;
    onChange: (index: number, action: RuleAction) => void;
    onRemove: (index: number) => void;
}

export default function RuleActionRow({index, action, actionOptions, onChange, onRemove}: Props) {
    const handle = (field: keyof RuleAction, value: string | boolean) => {
        onChange(index, {...action, [field]: value});
    };

    return (
        <tr>
            <td>
                <button
                    type="button"
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => onRemove(index)}
                >
                    🗑️
                </button>
            </td>
            <td>
                <select
                    className="border rounded px-2 py-1"
                    value={action.type}
                    onChange={e => handle('type', e.target.value)}
                >
                    {Object.entries(actionOptions).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </td>
            <td>
                <input
                    type="text"
                    className="border rounded px-2 py-1"
                    value={action.value}
                    onChange={e => handle('value', e.target.value)}
                />
            </td>
            <td>
                <input
                    type="checkbox"
                    checked={action.stopProcessing}
                    onChange={e => handle('stopProcessing', e.target.checked)}
                />
            </td>
        </tr>
    );
}
