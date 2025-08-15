'use client';
import React, {useState} from 'react';
import RuleTriggerRow, {RuleTrigger} from './RuleTrigger';
import RuleActionRow, {RuleAction} from './RuleAction';

export interface RuleData {
    title: string;
    description: string;
    triggers: RuleTrigger[];
    actions: RuleAction[];
}

const triggerOptions: Record<string, string> = {
    description_is: 'Description is',
    amount_gt: 'Amount greater than',
};

const actionOptions: Record<string, string> = {
    set_category: 'Set category',
    set_budget: 'Set budget',
};

export default function RuleForm({initial}: {initial?: RuleData}) {
    const [title, setTitle] = useState(initial?.title ?? '');
    const [description, setDescription] = useState(initial?.description ?? '');
    const [triggers, setTriggers] = useState<RuleTrigger[]>(initial?.triggers ?? [
        {type: 'description_is', prohibited: false, value: '', stopProcessing: false},
    ]);
    const [actions, setActions] = useState<RuleAction[]>(initial?.actions ?? [
        {type: 'set_category', value: '', stopProcessing: false},
    ]);

    const updateTrigger = (index: number, trigger: RuleTrigger) => {
        setTriggers(triggers.map((t, i) => (i === index ? trigger : t)));
    };
    const removeTrigger = (index: number) => {
        setTriggers(triggers.filter((_, i) => i !== index));
    };
    const addTrigger = () => {
        setTriggers([...triggers, {type: 'description_is', prohibited: false, value: '', stopProcessing: false}]);
    };

    const updateAction = (index: number, action: RuleAction) => {
        setActions(actions.map((a, i) => (i === index ? action : a)));
    };
    const removeAction = (index: number) => {
        setActions(actions.filter((_, i) => i !== index));
    };
    const addAction = () => {
        setActions([...actions, {type: 'set_category', value: '', stopProcessing: false}]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result: RuleData = {title, description, triggers, actions};
        // For now just log the result
        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block">Title</label>
                <input className="w-full border rounded px-2 py-1" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <label className="block">Description</label>
                <input className="w-full border rounded px-2 py-1" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
                <h3>Triggers</h3>
                <table className="w-full border-collapse">
                    <tbody>
                    {triggers.map((trigger, index) => (
                        <RuleTriggerRow
                            key={index}
                            index={index}
                            trigger={trigger}
                            triggerOptions={triggerOptions}
                            onChange={updateTrigger}
                            onRemove={removeTrigger}
                        />
                    ))}
                    </tbody>
                </table>
                <button type="button" className="bg-gray-200 text-gray-800 px-3 py-1 rounded" onClick={addTrigger}>
                    Add trigger
                </button>
            </div>
            <div>
                <h3>Actions</h3>
                <table className="w-full border-collapse">
                    <tbody>
                    {actions.map((action, index) => (
                        <RuleActionRow
                            key={index}
                            index={index}
                            action={action}
                            actionOptions={actionOptions}
                            onChange={updateAction}
                            onRemove={removeAction}
                        />
                    ))}
                    </tbody>
                </table>
                <button type="button" className="bg-gray-200 text-gray-800 px-3 py-1 rounded" onClick={addAction}>
                    Add action
                </button>
            </div>
            <div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save rule</button>
            </div>
        </form>
    );
}
