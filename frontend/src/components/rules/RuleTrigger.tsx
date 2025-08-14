'use client';
import React from 'react';

export interface RuleTrigger {
    type: string;
    prohibited: boolean;
    value: string;
    stopProcessing: boolean;
}

interface Props {
    index: number;
    trigger: RuleTrigger;
    triggerOptions: Record<string, string>;
    onChange: (index: number, trigger: RuleTrigger) => void;
    onRemove: (index: number) => void;
}

export default function RuleTriggerRow({index, trigger, triggerOptions, onChange, onRemove}: Props) {
    const handle = (field: keyof RuleTrigger, value: string | boolean) => {
        onChange(index, {...trigger, [field]: value});
    };

    return (
        <tr>
            <td>
                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onRemove(index)}
                >
                    <span className="fa fa-trash" />
                </button>
            </td>
            <td>
                <select
                    className="form-control"
                    value={trigger.type}
                    onChange={e => handle('type', e.target.value)}
                >
                    {Object.entries(triggerOptions).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </td>
            <td>
                <input
                    type="checkbox"
                    checked={trigger.prohibited}
                    onChange={e => handle('prohibited', e.target.checked)}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="form-control"
                    value={trigger.value}
                    onChange={e => handle('value', e.target.value)}
                />
            </td>
            <td>
                <input
                    type="checkbox"
                    checked={trigger.stopProcessing}
                    onChange={e => handle('stopProcessing', e.target.checked)}
                />
            </td>
        </tr>
    );
}
