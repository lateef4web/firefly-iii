import { useState } from 'react';

interface Props {
    availableTags: string[];
    selected?: string[];
    onChange: (tags: string[]) => void;
}

export default function TagAssignment({ availableTags, selected = [], onChange }: Props) {
    const [current, setCurrent] = useState<string[]>(selected);

    const toggleTag = (tag: string) => {
        const next = current.includes(tag)
            ? current.filter((t) => t !== tag)
            : [...current, tag];
        setCurrent(next);
        onChange(next);
    };

    return (
        <div className="space-y-2">
            {availableTags.map((tag) => (
                <label key={tag} className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={current.includes(tag)}
                        onChange={() => toggleTag(tag)}
                    />
                    <span>{tag}</span>
                </label>
            ))}
        </div>
    );
}
