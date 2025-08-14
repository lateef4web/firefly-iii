import RuleList, {RuleGroup} from '@/components/rules/RuleList';

const sample: RuleGroup[] = [
    {id: 1, title: 'Default group', description: 'Example rule group', rules: [
        {id: 1, title: 'Sample rule'},
    ]},
];

export default function RulesPage() {
    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Rules</h1>
            <RuleList groups={sample} />
        </div>
    );
}
